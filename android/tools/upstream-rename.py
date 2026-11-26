#!/usr/bin/env python3
"""Port an upstream BitChord change into the FasTUBE rename, and audit the tree.

Two modes:
  --apply  FILE...   rename upstream identifiers in the given files in place
                     (the way an upstream patch lands here)
  --audit            scan the tracked tree for identifiers that must not exist,
                     printing every hit outside the allowlist

The replacement table mirrors .claude/bitchord-surgery-map.md (section "Rename").
Order matters: longest / most specific token first. Vendored third-party packages
(androidx.media3.decoder.ffmpeg, org.schabi.newpipe, com.metrolist, com.my.kizzy's
successors...) are deliberately NOT rewritten: JNI bindings and keep rules bind to
those exact class paths.
"""

import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent  # FasTUBE root

# (from, to) applied in order, longest first.
REPLACEMENTS = [
    ("com.music.bitchord.shared", "io.github.pixelash6.fastube.shared"),
    ("com.music.bitchord.sharedui", "io.github.pixelash6.fastube.sharedui"),
    ("com.music.bitchord.wear", "io.github.pixelash6.fastube.wear"),
    ("com.dev.bitchord", "io.github.pixelash6.fastube.dev"),
    ("com.music.bitchord", "io.github.pixelash6.fastube"),
    ("com/music/bitchord", "io/github/pixelash6/fastube"),
    ("bitchord-wear://", "fastube-wear://"),
    ("bitchord://", "fastube://"),
    ('"/bitchord/', '"/fastube/'),
    ("bitchord_phone", "fastube_phone"),
    ("bitchord_watch", "fastube_watch"),
    ("BitChordWear.apk", "FasTUBEWear.apk"),
    ("BitChordWear.sha256", "FasTUBEWear.sha256"),
    ("BitChordWear", "FasTUBEWear"),
    ("bitchordVersionCode", "fastubeVersionCode"),
    ("bitchordVersionName", "fastubeVersionName"),
    ("bitchordBetaSuffix", "fastubeBetaSuffix"),
    ("bitchord.bundleWear", "fastube.bundleWear"),
    ("bitchord.wearDebuggable", "fastube.wearDebuggable"),
    ("bitchord_", "fastube_"),
    ("Theme.BitChordWear", "Theme.FasTUBEWear"),
    ("Theme.BitChord", "Theme.FasTUBE"),
    ("BitChordApplication", "FasTubeApplication"),
    ("BitChordWearTheme", "FasTubeWearTheme"),
    ("BitChordTheme", "FasTubeTheme"),
    ("BitChordTypography", "FasTubeTypography"),
    ("BitChordIcons", "FasTubeIcons"),
    ("BitChord", "FasTUBE"),
    ("bitchord", "fastube"),
]

# Files allowed to mention BitChord: the license, this tool, and the attribution
# lines in the two READMEs.
ALLOWLIST_PARTS = ("LICENSE", "upstream-rename.py", "README.md")

# Anything these touch is binary: never rewritten, never audited as text.
BINARY_SUFFIXES = (".png", ".webp", ".jpg", ".otf", ".ttf", ".so", ".aar", ".onnx", ".jar", ".ico")


def rename_text(text: str) -> tuple[str, int]:
    hits = 0
    for old, new in REPLACEMENTS:
        n = text.count(old)
        if n:
            text = text.replace(old, new)
            hits += n
    return text, hits


def apply(files: list[Path]) -> int:
    total = 0
    for f in files:
        raw = f.read_bytes()
        if raw.startswith(b"\xef\xbb\xbf"):
            bom, body = raw[:3], raw[3:]
        else:
            bom, body = b"", raw
        try:
            text = body.decode("utf-8")
        except UnicodeDecodeError:
            print(f"skip (not utf-8): {f}")
            continue
        new_text, hits = rename_text(text)
        if hits:
            f.write_bytes(bom + new_text.encode("utf-8"))
            print(f"{hits:4d}  {f}")
            total += hits
    print(f"total replacements: {total}")
    return total


def audit() -> int:
    bad = 0
    for f in sorted(REPO.rglob("*")):
        if not f.is_file() or f.suffix.lower() in BINARY_SUFFIXES:
            continue
        rel = str(f.relative_to(REPO)).replace("\\", "/")
        if any(part in rel for part in ALLOWLIST_PARTS):
            continue
        if rel.startswith(("windows/", "server/", "site/", "docs/", ".claude/", ".git/", "node_modules")):
            continue
        if ".git" in f.parts or "build" in f.parts or ".gradle" in f.parts or ".cxx" in f.parts:
            continue
        try:
            text = f.read_text("utf-8")
        except (UnicodeDecodeError, PermissionError):
            continue
        for needle in ("bitchord", "BitChord"):
            for line_no, line in enumerate(text.splitlines(), 1):
                if needle in line:
                    print(f"{rel}:{line_no}: {line.strip()[:160]}")
                    bad += 1
    print(f"hits outside the allowlist: {bad}")
    return bad


def main() -> int:
    args = sys.argv[1:]
    if args and args[0] == "--apply":
        return 0 if apply([Path(a) for a in args[1:]]) >= 0 else 1
    if not args or args[0] == "--audit":
        return 1 if audit() else 0
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main())
