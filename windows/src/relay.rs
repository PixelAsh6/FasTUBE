//! The user's own relay worker, deployed from inside the app: the built bundle rides
//! along as assets, and a pasted Cloudflare API token is everything the deploy needs.
//!
//! The flow, over Cloudflare's REST API (no wrangler, no Node):
//! 1. `GET /accounts` - the token's accounts,
//! 2. `PUT /accounts/{a}/workers/scripts/fastube-relay` - the bundle as a multipart
//!    upload whose metadata declares the two SQLite Durable Object migrations,
//! 3. `POST .../scripts/fastube-relay/subdomain` and `GET .../workers/subdomain` -
//!    to turn `fastube-relay.<their-subdomain>.workers.dev` on and learn its address.

/// The worker's name: per account, so every account gets its own address.
pub const WORKER_NAME: &str = "fastube-relay";
/// The compat date `server/wrangler.jsonc` ships with.
const COMPAT_DATE: &str = "2026-09-01";

/// The bundled worker: the entry module and its wasm, names the entry refers to.
pub const BUNDLE: [(&str, &[u8]); 2] = [
    ("relay.js", include_bytes!("../assets/relay/relay.js")),
    ("relay_bg.wasm", include_bytes!("../assets/relay/relay_bg.wasm")),
];
const MAIN_MODULE: &str = "relay.js";

/// The API root every call hangs off.
fn api() -> String {
    "https://api.cloudflare.com/client/v4".to_owned()
}

/// One account the token can see: its id (what the calls need) and its name (what the
/// user picks by).
#[derive(Clone, PartialEq)]
pub struct Account {
    pub id: String,
    pub name: String,
}

/// What went wrong, in words the setup screen can show as is.
pub type Error = String;

fn err_of(body: &str) -> Error {
    // Cloudflare answers { "errors": [ { "code": .., "message": .. } ], .. }.
    let v: serde_json::Value = serde_json::from_str(body).unwrap_or_default();
    let msg = v["errors"][0]["message"].as_str().unwrap_or_default().to_owned();
    if msg.is_empty() { format!("the API answered: {}", body.chars().take(180).collect::<String>()) } else { msg }
}

/// The accounts a token can deploy into. Needs `Account:Read` alongside the Workers
/// edit permission - the token template has both.
pub async fn list_accounts(token: &str) -> Result<Vec<Account>, Error> {
    let client = reqwest::Client::new();
    let r = client.get(format!("{}/accounts", api())).bearer_auth(token).send().await.map_err(|e| format!("the call to Cloudflare failed: {e}"))?;
    let status = r.status();
    let body = r.text().await.map_err(|e| e.to_string())?;
    log::info!("relay: listing accounts answered {} {}", status, body.chars().take(200).collect::<String>());
    let v: serde_json::Value = serde_json::from_str(&body).map_err(|_| err_of(&body))?;
    if !v["success"].as_bool().unwrap_or(false) {
        return Err(err_of(&body));
    }
    let out = v["result"]
        .as_array()
        .map(|a| {
            a.iter()
                .map(|acc| Account { id: acc["id"].as_str().unwrap_or_default().to_owned(), name: acc["name"].as_str().unwrap_or_default().to_owned() })
                .filter(|acc| !acc.id.is_empty())
                .collect::<Vec<_>>()
        })
        .unwrap_or_default();
    if out.is_empty() {
        return Err("the token sees no accounts: make sure it has Account:Read as well as the Workers edit permission".to_owned());
    }
    Ok(out)
}

/// The script-upload metadata: modules, the compat date, and the two SQLite Durable
/// Object migrations (`Room` at v1, `Stats` at v2 - `new_tag: v2` creates both on a
/// fresh script, and is a no-op on an update that already has them).
fn metadata(migrate: bool) -> String {
    serde_json::json!({
        "main_module": MAIN_MODULE,
        "compatibility_date": COMPAT_DATE,
        "bindings": [
            { "type": "durable_object_namespace", "name": "ROOMS", "class_name": "Room" },
            { "type": "durable_object_namespace", "name": "STATS", "class_name": "Stats" },
        ],
        "migrations": migrate.then(|| serde_json::json!({ "new_tag": "v2" })),
    })
    .to_string()
}

/// A multipart body by hand: the metadata as the first part, then each bundle file with
/// the module content types the script upload expects. Returns (body, content type).
fn multipart(metadata: &str) -> (Vec<u8>, String) {
    let boundary = format!("fastube{}{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).map(|d| d.subsec_nanos()).unwrap_or(0));
    let mut body = Vec::new();
    for (name, content, content_type) in [("_metadata", metadata.as_bytes(), "application/json")]
        .into_iter()
        .chain(BUNDLE.iter().map(|(name, bytes)| {
            (*name, *bytes, if name.ends_with(".wasm") { "application/wasm" } else { "application/javascript+module" })
        }))
    {
        body.extend_from_slice(format!("--{boundary}\r\ncontent-disposition: form-data; name=\"{name}\"; filename=\"{name}\"\r\ncontent-type: {content_type}\r\n\r\n").as_bytes());
        body.extend_from_slice(content);
        body.extend_from_slice(b"\r\n");
    }
    body.extend_from_slice(format!("--{boundary}--\r\n").as_bytes());
    (body, format!("multipart/form-data; boundary={boundary}"))
}

/// The workers.dev address once the script's own subdomain is on:
/// `https://fastube-relay.<account subdomain>.workers.dev`.
async fn workers_dev_url(token: &str, account: &str) -> Result<String, Error> {
    let client = reqwest::Client::new();
    // Turn the subdomain on for this script (its account-level subdomain must exist,
    // which a first visit to the dashboard creates; the API makes one on demand too).
    let r = client
        .post(format!("{}/accounts/{account}/workers/scripts/{WORKER_NAME}/subdomain", api()))
        .bearer_auth(token)
        .json(&serde_json::json!({ "enabled": true }))
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let body = r.text().await.map_err(|e| e.to_string())?;
    let v: serde_json::Value = serde_json::from_str(&body).unwrap_or_default();
    if !v["success"].as_bool().unwrap_or(false) {
        return Err(err_of(&body));
    }
    let r = client.get(format!("{}/accounts/{account}/workers/subdomain", api())).bearer_auth(token).send().await.map_err(|e| e.to_string())?;
    let body = r.text().await.map_err(|e| e.to_string())?;
    let v: serde_json::Value = serde_json::from_str(&body).map_err(|_| err_of(&body))?;
    let sub = v["result"]["subdomain"].as_str().filter(|s| !s.is_empty()).ok_or_else(|| err_of(&body))?;
    Ok(format!("https://{WORKER_NAME}.{sub}.workers.dev"))
}

/// Deploy the bundled worker into `account`, then return its workers.dev address.
pub async fn deploy(token: &str, account: &str) -> Result<String, Error> {
    let client = reqwest::Client::new();
    let (body, content_type) = multipart(&metadata(true));
    let r = client
        .put(format!("{}/accounts/{account}/workers/scripts/{WORKER_NAME}", api()))
        .bearer_auth(token)
        .header(reqwest::header::CONTENT_TYPE, content_type)
        .body(body)
        .send()
        .await
        .map_err(|e| e.to_string())?;
    let upload_body = r.text().await.map_err(|e| e.to_string())?;
    let ok = serde_json::from_str::<serde_json::Value>(&upload_body).map(|v| v["success"].as_bool().unwrap_or(false)).unwrap_or(false);
    if !ok {
        // A script that already has its migration tags refuses a second v2: upload
        // again without them. Anything else is a real error.
        let (body, content_type) = multipart(&metadata(false));
        let r = client
            .put(format!("{}/accounts/{account}/workers/scripts/{WORKER_NAME}", api()))
            .bearer_auth(token)
            .header(reqwest::header::CONTENT_TYPE, content_type)
            .body(body)
            .send()
            .await
            .map_err(|e| e.to_string())?;
        let body = r.text().await.map_err(|e| e.to_string())?;
        let ok = serde_json::from_str::<serde_json::Value>(&body).map(|v| v["success"].as_bool().unwrap_or(false)).unwrap_or(false);
        if !ok {
            return Err(err_of(&body));
        }
    }
    workers_dev_url(token, account).await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn metadata_declares_modules_and_migrations() {
        let m = serde_json::from_str::<serde_json::Value>(&metadata(true)).unwrap();
        assert_eq!(m["main_module"], MAIN_MODULE);
        assert_eq!(m["compatibility_date"], COMPAT_DATE);
        assert_eq!(m["migrations"]["new_tag"], "v2");
        let names: Vec<&str> = m["bindings"].as_array().unwrap().iter().map(|b| b["name"].as_str().unwrap()).collect();
        assert_eq!(names, ["ROOMS", "STATS"]);
        assert!(serde_json::from_str::<serde_json::Value>(&metadata(false)).unwrap()["migrations"].is_null());
    }

    #[test]
    fn multipart_carries_every_part() {
        let (body, content_type) = multipart(&metadata(true));
        assert!(content_type.starts_with("multipart/form-data; boundary=fastube"));
        let text = String::from_utf8_lossy(&body);
        for name in ["_metadata", MAIN_MODULE, "relay_bg.wasm"] {
            assert!(text.contains(&format!("filename=\"{name}\"")), "missing {name}");
        }
        assert!(text.ends_with("--\r\n"));
        let boundary = content_type.rsplit('=').next().unwrap();
        assert_eq!(text.matches(&format!("--{boundary}")).count(), 4, "three parts plus the close");
    }

    #[test]
    fn bundle_is_whole() {
        assert!(BUNDLE.iter().all(|(_, b)| !b.is_empty()));
        let js = String::from_utf8_lossy(BUNDLE.iter().find(|(n, _)| *n == MAIN_MODULE).unwrap().1);
        assert!(js.contains("relay_bg.wasm"), "the entry module must reference the wasm by its embedded name");
        assert!(BUNDLE.iter().any(|(n, b)| *n == "relay_bg.wasm" && b.starts_with(b"\0asm")), "the wasm part starts with its magic");
    }
}

#[cfg(test)]
mod debug_tests {
    use super::*;

    /// Debug: exercise the deploy path against the real API with a dead token, so the
    /// panic (if there is one) shows locally with a backtrace. Not a real test.
    #[tokio::test(flavor = "multi_thread")]
    async fn deploy_with_dead_token_errs_or_lives() {
        let out = deploy("cfut_deadtoken_deadtoken_deadtoken_dead", "730b13098fc4500e5c1d39aadab816ff").await;
        println!("deploy outcome: {out:?}");
    }
}
