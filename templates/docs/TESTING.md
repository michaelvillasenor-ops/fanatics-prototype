# TESTING — 5-minute unmoderated cold-user protocol

**Who**: <someone who hasn't seen it> · **Setup**: open the root URL only. No instructions, no
keyboard shortcuts, no URL edits.

## Tasks (read aloud, one at a time)
1. "<task>" (expected: <what success looks like>)
2. …

## Success bar
- All tasks within <N> minutes, unaided.
- Hesitation on task <n> means a <labeling vs control> failure; note which.

## Automated simulation
`scripts/verify-cold-user.mjs` replays these tasks using only visible, clickable affordances (no
test bridge, no URL params beyond the root). If it can't complete a task, neither can a person.
