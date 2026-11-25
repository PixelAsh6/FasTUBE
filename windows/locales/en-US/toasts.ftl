### The short notices at the bottom of the window.

# After unliking several songs at once; Undo sits beside it.
likes-removed = { $count ->
    [one] Removed { $count } like
   *[other] Removed { $count } likes
}

## Recognize song: the card by the player bar while it listens to what the computer
## plays, and with what Shazam heard.

# The card's window title. Experimental: it uses an unofficial Shazam service.
recognize-overline = Recognize song · Experimental
# The command: in the tray menu, the shortcuts, the palette, and on the search box.
recognize-song = Recognize song
recognize-experimental = Experimental
recognize-waiting = Waiting for sound…
recognize-waiting-line = Play the song in another app
recognize-listening = Listening…
recognize-listening-line = Hearing it, keep it playing
recognize-identifying = Identifying…
recognize-identifying-line = Asking Shazam
recognize-no-match = No match
recognize-no-match-line = Shazam doesn't know this one
recognize-failed = Couldn't recognize it
recognize-unsupported = This computer can't record what it plays
recognize-headset-output = It can't listen to a headset. Switch the sound output to your speakers and try again.
recognize-no-device = There's no sound output to listen to
recognize-nothing-playing = Nothing is playing
recognize-device-changed = The sound output changed. Try again.
recognize-offline = Couldn't reach Shazam. Check your connection.
recognize-no-answer = Shazam didn't answer. Try again in a moment.
recognize-rate-limited = { $secs ->
    [one] Shazam needs a break. Try again in { $secs } second.
   *[other] Shazam needs a break. Try again in { $secs } seconds.
}
# Buttons on the card.
recognize-playing = Now playing
recognize-play = Play
recognize-playlist = Add to playlist
recognize-cancel = Cancel
recognize-dismiss = Dismiss
