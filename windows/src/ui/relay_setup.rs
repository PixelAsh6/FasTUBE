//! The Cloudflare relay's setup screen: the instructions, a pasted API token, and the
//! deploy running itself. Ends with the relay's workers.dev address in the settings
//! row it was opened from.

use egui::{pos2, Align2, RichText, Ui};

use super::theme;
use super::widgets::pill;
use crate::relay;

/// Where the setup stands.
pub(crate) enum Step {
    /// The token field, waiting for Deploy.
    Idle,
    /// Listing the accounts the token sees.
    Listing,
    /// The token sees several accounts: one picked, Deploy on the right.
    Picking,
    /// A deploy running.
    Deploying,
    /// Live: the relay's address.
    Done(String),
    /// Something failed; the words the API answered with.
    Failed(String),
}

/// The screen's state, held by the app while the overlay is up.
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

/// What the card shows, copied out of the state so the drawing borrows nothing.
enum Card {
    Idleish { failed: Option<String>, deployable: bool },
    Listing,
    Picking { names: Vec<String>, picked: usize },
    Deploying,
    Done(String),
}

/// The overlay's drawing, on the full `rect`.
pub fn show(app: &mut super::App, setup: &mut Setup, ui: &mut Ui, rect: egui::Rect) {
    // The overlay owns its whole rect: no click falls through to the settings page.
    ui.interact(rect, ui.scope_id().with("relay-setup-sink"), egui::Sense::click());

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
            setup.step = Step::Done(url);
        }
        None => {}
    }

    let card = match &setup.step {
        Step::Idle | Step::Failed(_) => Card::Idleish {
            failed: if let Step::Failed(e) = &setup.step { Some(e.clone()) } else { None },
            deployable: !setup.token.trim().is_empty(),
        },
        Step::Listing => Card::Listing,
        Step::Picking => Card::Picking { names: setup.accounts.iter().map(|a| a.name.clone()).collect(), picked: setup.picked },
        Step::Deploying => Card::Deploying,
        Step::Done(url) => Card::Done(url.clone()),
    };

    let w = 640.0_f32.min(rect.width() - 48.0);
    let card_rect = egui::Rect::from_center_size(rect.center(), egui::vec2(w, rect.height() - 96.0));
    let mut card_ui = ui.new_child(egui::UiBuilder::new().max_rect(card_rect).layout(egui::Layout::top_down(egui::Align::Min)));
    card_ui.set_clip_rect(card_rect);
    let ui = &mut card_ui;
    ui.add_space(18.0);
    ui.label(RichText::new(crate::tr!("relay-setup-title")).font(theme::bold(19.0)).color(theme::text()));
    ui.add_space(12.0);

    let mut close = false;
    let mut start = false;
    let mut deploy = false;
    match card {
        Card::Done(url) => {
            dim(ui, crate::tr!("relay-done-lead"));
            ui.add_space(4.0);
            ui.label(RichText::new(url).font(theme::semibold(16.0)).color(theme::text()));
            ui.add_space(14.0);
            close |= pill(ui, crate::tr!("relay-close"), None, true).clicked();
        }
        Card::Deploying => {
            ui.add_space(20.0);
            super::widgets::loader(ui);
            ui.add_space(8.0);
            dim(ui, crate::tr!("relay-working-deploying"));
        }
        Card::Idleish { failed, deployable } => {
            // The instructions, the token and the buttons: the Idle and Failed states
            // show this same card.
            dim(ui, crate::tr!("relay-instructions-1"));
            ui.label(RichText::new(crate::tr!("relay-instructions-2")).font(theme::regular(13.5)).color(theme::text_dim()));
            dim(ui, crate::tr!("relay-instructions-3"));
            ui.add_space(12.0);
            let field = ui.available_rect_before_wrap();
            ui.put(
                field.shrink2(egui::vec2(0.0, 2.0)),
                egui::TextEdit::singleline(&mut setup.token)
                    .password(true)
                    .hint_text(RichText::new(crate::tr!("relay-token-hint")).color(theme::text_faint()))
                    .font(theme::regular(13.5))
                    .frame(egui::Frame::NONE)
                    .desired_width(field.width()),
            );
            ui.add_space(12.0);
            if let Some(e) = failed {
                ui.label(RichText::new(e).font(theme::regular(13.0)).color(theme::RED));
                ui.add_space(8.0);
            }
            ui.horizontal(|ui| {
                if deployable && pill(ui, crate::tr!("relay-deploy"), Some(theme::icon::UPLOAD), true).clicked() {
                    start = true;
                }
                ui.add_space(10.0);
                close |= pill(ui, crate::tr!("relay-close"), None, false).clicked();
            });
        }
        Card::Listing => {
            ui.add_space(12.0);
            super::widgets::loader(ui);
            ui.add_space(8.0);
            dim(ui, crate::tr!("relay-working-listing"));
        }
        Card::Picking { names, picked } => {
            ui.add_space(10.0);
            dim(ui, crate::tr!("relay-pick-account"));
            let mut new_pick = picked;
            for (i, name) in names.iter().enumerate() {
                let (r, resp) = ui.allocate_exact_size(egui::vec2(ui.available_width(), 26.0), egui::Sense::click());
                let mark = if picked == i { theme::icon::CHECK } else { ' ' };
                ui.painter().text(pos2(r.left() + 12.0, r.center().y), Align2::LEFT_CENTER, format!("{mark} {name}"), theme::regular(13.5), theme::text());
                if resp.clicked() {
                    new_pick = i;
                }
            }
            setup.picked = new_pick;
            ui.add_space(6.0);
            if pill(ui, crate::tr!("relay-deploy"), Some(theme::icon::UPLOAD), true).clicked() {
                deploy = true;
            }
        }
    }
    if start {
        setup.start(&app.backend);
    }
    if deploy {
        setup.deploy(&app.backend);
    }
    if close {
        app.relay_setup = None;
    }
}

/// The dim helper this screen shares with the rest of the jam UI.
fn dim(ui: &mut Ui, text: &str) {
    ui.label(RichText::new(text).font(theme::regular(13.5)).color(theme::text_dim()));
}
