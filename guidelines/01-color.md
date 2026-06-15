# Color System — Squirrel Palette

## Full Palette

| Token          | Step | Hex       | RGB         | Usage                                         |
|----------------|------|-----------|-------------|-----------------------------------------------|
| `squirrel-50`  | 50   | `#fbfbf8` | 251 251 248 | Page background (main)                        |
| `squirrel-100` | 100  | `#f6f6f3` | 246 246 243 | Card / surface background                     |
| `squirrel-200` | 200  | `#e9e5e2` | 233 229 226 | Hover fill on buttons, subtle surfaces        |
| `squirrel-300` | 300  | `#dad3cd` | 218 211 205 | Dividers, rule lines                          |
| `squirrel-400` | 400  | `#b0a196` | 176 161 150 | Secondary text, captions, metadata            |
| `squirrel-500` | 500  | `#917e6e` | 145 126 110 | Mid-weight accent, icon strokes               |
| `squirrel-600` | 600  | `#5e5547` | 94 85 71    | Primary accent: button borders, links, labels |
| `squirrel-700` | 700  | `#4a4136` | 74 65 54    | Deep accent, active states                    |
| `squirrel-800` | 800  | `#2d2320` | 45 35 32    | Heavy text, strong headings                   |
| `squirrel-900` | 900  | `#201913` | 32 25 19    | Primary text color                            |
| `squirrel-950` | 950  | `#0e0a07` | 14 10 7     | Darkest detail, wax seal base                 |

---

## Semantic Color Assignments

### Backgrounds
```
page-bg:        squirrel-50   (#fbfbf8)
card-bg:        squirrel-100  (#f6f6f3)
hover-fill:     squirrel-200  (#e9e5e2)
```

### Text
```
text-primary:   squirrel-900  (#201913)  — body, paragraphs
text-heading:   squirrel-800  (#2d2320)  — display headings
text-secondary: squirrel-400  (#b0a196)  — captions, dates in metadata, labels
text-disabled:  squirrel-300  (#dad3cd)
```

### Borders & Lines
```
divider:        squirrel-300  (#dad3cd)  — 0.5px–1px horizontal rules
border-default: squirrel-300  (#dad3cd)  — card outlines (when needed)
border-accent:  squirrel-600  (#5e5547)  — button outlines, active inputs
```

### Interactive
```
btn-outline-border:   squirrel-600  (#5e5547)
btn-outline-text:     squirrel-600  (#5e5547)
btn-outline-hover-bg: squirrel-200  (#e9e5e2)
btn-filled-bg:        squirrel-900  (#201913)
btn-filled-text:      squirrel-50   (#fbfbf8)
link-color:           squirrel-600  (#5e5547)
link-hover:           squirrel-700  (#4a4136)
focus-ring:           squirrel-500  (#917e6e)
```

### Wax Seal
```
seal-base:      squirrel-950  (#0e0a07)
seal-relief:    squirrel-700  (#4a4136)  — emboss highlight
seal-shadow:    rgba(14,10,7,0.25)
```

---

## Contrast Ratios (WCAG)

| Foreground | Background | Ratio | Compliant |
|---|---|---|---|
| squirrel-900 on squirrel-50 | #201913 / #fbfbf8 | ~15:1 | AAA |
| squirrel-800 on squirrel-50 | #2d2320 / #fbfbf8 | ~12:1 | AAA |
| squirrel-600 on squirrel-50 | #5e5547 / #fbfbf8 | ~6.5:1 | AA |
| squirrel-400 on squirrel-50 | #b0a196 / #fbfbf8 | ~2.8:1 | Fail — use only for non-critical text ≥18px |

**Rule:** Never use squirrel-400 or lighter for body copy. Reserve it for captions/metadata only.

---

## Color Don'ts

- Do not introduce any color outside this palette without explicit exception
- Do not use pure `#000000` or `#ffffff` — always use palette endpoints
- Do not use `squirrel-500` as a text color (contrast too low at body size)
- Do not combine two warm mid-tones (e.g. squirrel-400 text on squirrel-200 bg) — no contrast
- No color gradients. Flat fills only.
- No drop shadows with color — use `rgba(14,10,7,...)` only (squirrel-950 base)

---

## Dark Mode

**Not in scope for v1.** The palette is intentionally light. Do not add `@media (prefers-color-scheme: dark)` unless explicitly requested.

---

## CSS Custom Properties

Defined in `guidelines/08-tokens.css`. All code must reference tokens, never raw hex values.
