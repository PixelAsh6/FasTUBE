//! The Cloudflare relay's setup, drawn inside its General settings card: the
//! instructions, a pasted API token, and the deploy running itself. Ends collapsed,
//! with the relay's workers.dev address as the row's description.

use egui::{pos2, Align2, Color32, RichText, Ui};

use super::theme;
use super::widgets::{loader, pill, ui_text};
use crate::relay;

/// Where the setup stands.
pub enum Step {
    /// The token field, waiting for Deploy.
    Idle,
    /// Listing the accounts the token sees.
    Listing,
    /// The token sees several accounts: one picked, Deploy on the right.
    Picking,
    /// A deploy running.
    Deploying,
    /// A deploy finished: the relay's address (the card collapses on the next frame).
    Done,
    /// Something failed; the words the API answered with.
    Failed(String),
}

/// The expanded card's state, held by the app while it's open.
pub struct Setup {
    pub token: String,
    pub step: Step,
    pub accounts: Vec<relay::Account>,
    /// The account the deploy targets, when there are several to pick from.
    pub picked: usize,
    /// Answers from the backend task, pumped by the app's update loop.
    pub inbox: Option<std::sync::mpsc::Receiver<Result<Answer, String>>>,
}

impl Default for Setup {
    fn default() -> Self {
        Self { token: String::new(), step: Step::Idle, accounts: Vec::new(), picked: 0, inbox: None }
    }
}

/// The one question the token answers: whose account(s) to deploy into.
pub(crate) enum Answer {
    Accounts(Vec<relay::Account>),
    Live(String),
}

impl Setup {
    /// Ask for the accounts the token sees; the first step of every deploy.
    pub fn start(&mut self, backend: &crate::backend::Backend) {
        let (tx, rx) = std::sync::mpsc::channel::<Result<Answer, String>>();
        self.inbox = Some(rx);
        self.step = Step::Listing;
        let token = self.token.trim().to_owned();
        backend.spawn(async move {
            let _ = tx.send(relay::list_accounts(&token).await.map(Answer::Accounts));
        });
    }

    /// Deploy into the picked account; the last step.
    fn deploy(&mut self, backend: &crate::backend::Backend) {
        let Some(account) = self.accounts.get(self.picked.min(self.accounts.len().saturating_sub(1))) else { return };
        let (tx, rx) = std::sync::mpsc::channel::<Result<Answer, String>>();
        self.inbox = Some(rx);
        self.step = Step::Deploying;
        let token = self.token.trim().to_owned();
        let account = account.id.clone();
        backend.spawn(async move {
            let _ = tx.send(relay::deploy(&token, &account).await.map(Answer::Live));
        });
    }

    /// Consume the task's answer, if it came in this frame.
    fn answer(&mut self) -> Option<Answer> {
        match self.inbox.as_ref()?.try_recv() {
            Ok(Ok(a)) => Some(a),
            Ok(Err(e)) => {
                self.step = Step::Failed(e);
                None
            }
            Err(_) => None,
        }
    }
}

/// The blue the app's helper links render in.
fn link_color() -> Color32 {
    if theme::light() { Color32::from_rgb(0, 102, 204) } else { Color32::from_rgb(62, 166, 255) }
}

/// The expanded card, on the General page: the ListenBrainz anatomy - a row, a mini
/// label over a rounded field, a blue helper link, and the pills.
pub fn card(app: &mut super::App, setup: &mut Setup, ui: &mut Ui) {
    // An answer that came in settles the state before anything draws.
    match setup.answer() {
        Some(Answer::Accounts(accounts)) => {
            let alone = accounts.len() == 1;
            setup.accounts = accounts;
            setup.picked = 0;
            if alone {
                setup.deploy(&app.backend);
            } else {
                setup.step = Step::Picking;
            }
        }
        Some(Answer::Live(url)) => {
            app.relay_url = Some(url.clone());
            crate::jam::set_relay(Some(url.clone()));
            app.toast(crate::tr!("relay-live-toast", url = url.as_str()));
            setup.step = Step::Done;
        }
        None => {}
    }
    // Live collapses the card: the row above shows the address from here on.
    if matches!(setup.step, Step::Done) {
        app.relay_setup = None;
        return;
    }

    let mut start = false;
    let mut deploy = false;
    let mut cancel = false;

    ui.label(RichText::new(crate::tr!("relay-deploy-title")).font(theme::semibold(14.5)).color(theme::text()));
    ui.add_space(16.0);
    dim(ui, crate::tr!("relay-instructions-1"));
    dim(ui, crate::tr!("relay-instructions-2"));
    dim(ui, crate::tr!("relay-instructions-3"));
    ui.add_space(10.0);

    let resp = super::text_field(ui, crate::tr!("relay-token-label"), &mut setup.token, true, crate::tr!("relay-token-hint"));
    ui.horizontal(|ui| {
        ui.hyperlink_to(ui_text(crate::tr!("relay-token-link"), theme::regular(12.5), link_color()), "https://dash.cloudflare.com/profile/api-tokens");
    });
    ui.add_space(8.0);

    match &setup.step {
        Step::Failed(e) => {
            ui.label(RichText::new(e).font(theme::regular(13.0)).color(theme::RED));
            ui.add_space(8.0);
        }
        Step::Listing | Step::Deploying => {
            loader(ui);
            ui.add_space(6.0);
            let phrase = if matches!(setup.step, Step::Listing) { crate::tr!("relay-working-listing") } else { crate::tr!("relay-working-deploying") };
            dim(ui, phrase);
        }
        Step::Picking => {
            ui.add_space(6.0);
            dim(ui, crate::tr!("relay-pick-account"));
            let mut new_pick = setup.picked;
            for (i, name) in setup.accounts.iter().map(|a| &a.name).enumerate() {
                let (r, resp) = ui.allocate_exact_size(egui::vec2(ui.available_width(), 26.0), egui::Sense::click());
                let mark = if setup.picked == i { theme::icon::CHECK } else { ' ' };
                ui.painter().text(pos2(r.left() + 12.0, r.center().y), Align2::LEFT_CENTER, format!("{mark} {name}"), theme::regular(13.5), theme::text());
                if resp.clicked() {
                    new_pick = i;
                }
            }
            setup.picked = new_pick;
        }
        _ => {}
    }

    ui.horizontal(|ui| {
        ui.add_space(4.0);
        if matches!(setup.step, Step::Idle | Step::Failed(_) | Step::Picking) {
            deploy |= pill(ui, crate::tr!("relay-deploy"), Some(theme::icon::UPLOAD), true).clicked();
        }
        ui.add_space(10.0);
        cancel |= pill(ui, crate::tr!("relay-cancel"), None, false).clicked();
    });
    // Enter in the token field deploys too, like the ListenBrainz token's Enter.
    if resp.lost_focus() && ui.input(|i| i.key_pressed(egui::Key::Enter)) && !setup.token.trim().is_empty() && matches!(setup.step, Step::Idle | Step::Failed(_)) {
        start = true;
    }

    if start {
        setup.start(&app.backend);
    }
    if deploy {
        setup.deploy(&app.backend);
    }
    if cancel {
        app.relay_setup = None;
    }
}

fn dim(ui: &mut Ui, text: &str) {
    ui.label(RichText::new(text).font(theme::regular(13.5)).color(theme::text_dim()));
}
