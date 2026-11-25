//! Regenerates the app icon from geometry: a dark rounded square with an accent "F",
//! written as `assets/icon/icon.png` and a multi-size `assets/icon/icon.ico`.
//! Run: `cargo run --example gen_icon`

use image::{imageops::FilterType, Rgba, RgbaImage};

const SIZE: u32 = 256;
const BG: [u8; 3] = [23, 23, 30];
const ACCENT: [u8; 3] = [255, 78, 69];

fn main() -> anyhow::Result<()> {
    let img = draw(SIZE);
    img.save("assets/icon/icon.png")?;

    // The .ico: one PNG blob per size, in an ICO container (Vista+ reads PNG entries).
    let mut sizes = vec![SIZE];
    for s in [128u32, 64, 48, 32, 16] {
        sizes.push(s);
    }
    let mut blobs = Vec::new();
    for s in &sizes {
        let scaled = if *s == SIZE { img.clone() } else { image::imageops::resize(&img, *s, *s, FilterType::Lanczos3) };
        let mut png = std::io::Cursor::new(Vec::new());
        scaled.write_to(&mut png, image::ImageFormat::Png)?;
        blobs.push(png.into_inner());
    }
    let mut ico = Vec::new();
    ico.extend_from_slice(&0u16.to_le_bytes());
    ico.extend_from_slice(&1u16.to_le_bytes());
    ico.extend_from_slice(&(sizes.len() as u16).to_le_bytes());
    let mut offset = 6 + 16 * sizes.len();
    for (s, blob) in sizes.iter().zip(&blobs) {
        let byte = if *s >= 256 { 0u8 } else { *s as u8 };
        ico.extend_from_slice(&byte.to_le_bytes());
        ico.extend_from_slice(&byte.to_le_bytes());
        ico.push(0);
        ico.push(0);
        ico.extend_from_slice(&1u16.to_le_bytes());
        ico.extend_from_slice(&32u16.to_le_bytes());
        ico.extend_from_slice(&(blob.len() as u32).to_le_bytes());
        ico.extend_from_slice(&(offset as u32).to_le_bytes());
        offset += blob.len();
    }
    for blob in &blobs {
        ico.extend_from_slice(blob);
    }
    std::fs::write("assets/icon/icon.ico", ico)?;
    println!("wrote assets/icon/icon.png and assets/icon/icon.ico ({} sizes)", sizes.len());
    Ok(())
}

/// The rounded square with the accent "F", one opaque pixel at a time.
fn draw(size: u32) -> RgbaImage {
    let mut img = RgbaImage::new(size, size);
    let scale = |v: f32| v * size as f32 / 256.0;
    let bg_r = scale(56.0);
    let bar_r = scale(10.0);
    // The "F": its spine and its two arms, rounded rectangles.
    let bars = [
        (scale(92.0), scale(66.0), scale(124.0), scale(190.0)),
        (scale(92.0), scale(66.0), scale(176.0), scale(98.0)),
        (scale(92.0), scale(118.0), scale(156.0), scale(146.0)),
    ];
    for y in 0..size {
        for x in 0..size {
            let (fx, fy) = (x as f32 + 0.5, y as f32 + 0.5);
            let px = if in_rounded(fx, fy, scale(8.0), scale(8.0), size as f32 - scale(16.0), size as f32 - scale(16.0), bg_r) {
                let in_bar = bars.iter().any(|(x0, y0, x1, y1)| in_rounded(fx, fy, *x0, *y0, *x1, *y1, bar_r));
                if in_bar { rgba(ACCENT, 255) } else { rgba(BG, 255) }
            } else {
                Rgba([0, 0, 0, 0])
            };
            img.put_pixel(x, y, px);
        }
    }
    img
}

fn rgba(c: [u8; 3], a: u8) -> Rgba<u8> {
    Rgba([c[0], c[1], c[2], a])
}

/// Inside the rounded rectangle with corners at (`x0`,`y0`)-(`x1`,`y1`), radius `r`.
fn in_rounded(x: f32, y: f32, x0: f32, y0: f32, x1: f32, y1: f32, r: f32) -> bool {
    if x < x0 || x > x1 || y < y0 || y > y1 {
        return false;
    }
    let (cx, cy) = if x < x0 + r && y < y0 + r {
        (x0 + r, y0 + r)
    } else if x > x1 - r && y < y0 + r {
        (x1 - r, y0 + r)
    } else if x < x0 + r && y > y1 - r {
        (x0 + r, y1 - r)
    } else if x > x1 - r && y > y1 - r {
        (x1 - r, y1 - r)
    } else {
        return true;
    };
    (x - cx).powi(2) + (y - cy).powi(2) <= r * r
}
