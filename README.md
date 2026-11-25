# FasTUBE

A YouTube Music desktop experience for Windows, with group listening (any device can
steer the room), a lyrics view that sings along, and a fullscreen mode built for the
big screen. Built as its own app: a fork shaped to our own design, no upstream ties.

This README is a placeholder - the full one gets written when the platform set settles.

## Repository layout

| Folder | What lives there |
|---|---|
| `windows/` | The Windows desktop app (Rust + egui). Its own README will describe the build. |
| `android/` | The Android app. Planned; starts after the Windows app is done. |
| `wear-os/` | The Wear OS companion. Planned, together with Android. |
| `server/` | The group-listening relay (Cloudflare Worker) every platform speaks. |
| `docs/` + `site/` | The jam invite page and the website. |

## Group listening

Start a group from the player bar's device menu, share the link or QR, and every device
that joins sees the same queue and can steer the same playback. The relay runs at
`wss://fastube.thelightwolfro.workers.dev` (its source is `server/`).

## Status

Windows: usable and worked on. Android and Wear OS: not started.

## License

GPL-3.0, see [LICENSE](LICENSE).
