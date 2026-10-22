# MOTION — inventory

**Rules**: transform and opacity only · 150–350ms · enter uses `--ease-enter`, exit uses
`--ease-exit` · fully opaque resting states · `prefers-reduced-motion` falls back to an
opacity-only or instant change.

| Element | Trigger | Duration | Easing | Properties |
|---|---|---|---|---|
| Control panel | `P` | `--motion-base` | enter | transform |

Intentional exceptions: <footnotes>
Reduced motion: verified in devtools on <date>.
