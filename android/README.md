# FasTUBE for Android

The phone app and its shared modules, forked from BitChord.

- Upstream: https://github.com/kushagrasinghx/BitChord
- Imported: tag v1.10 (commit 7448b92e032af7e5666c93b0e04c6b9fa3abf898), GPL-3.0, see LICENSE.
  Not imported: tv/, web/, backend/, docs/, root images.
- Layout: this folder is the Gradle root (app, shared, sharedUi, native); the watch module
  lives in ../wear-os and is part of the same build.
- Porting upstream fixes: diff bitchord/v1.10..<newer tag>, apply to a scratch tree, run
  tools/upstream-rename.py on the result, merge by hand.
