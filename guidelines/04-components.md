# Components

## 1. Wax Seal

The signature element of the entire design. One seal exists per page — in the hero, as the "open invitation" trigger or visual anchor.

### Anatomy
```
┌──────────────────┐
│    ┌────────┐    │
│   /  relief  \   │   ← SVG path: botanical monogram or initials
│  │  engraved  │  │
│   \    art   /   │
│    └────────┘    │
│                  │
│  shadow below    │
└──────────────────┘
```

### Specifications
- **Shape:** Circle, diameter 80px (desktop) / 64px (mobile)
- **Color base:** squirrel-950 (#0e0a07)
- **Relief (engraved art):** squirrel-700 (#4a4136) at opacity 0.7 — subtle, not stark white
- **Shadow:** `box-shadow: 0 4px 16px rgba(14,10,7,0.25), 0 1px 4px rgba(14,10,7,0.15)`
- **Border:** none — the depth comes from shadow, not outline

### Content
Prefer a **botanical monogram** (olive branch, wheat, or simple leaf encircling initials).
Reference: photo_4 twine+seal, photo_5 leaf seal, photo_6 botanical seal.
If using initials only: Cormorant Garamond italic weight 300, sized to 40% of seal diameter.

### Interaction — "Press" Animation
```css
.wax-seal {
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 150ms ease;
  will-change: transform;
}
.wax-seal:hover {
  transform: scale(1.04);
  box-shadow: 0 6px 20px rgba(14,10,7,0.30), 0 2px 6px rgba(14,10,7,0.15);
}
.wax-seal:active {
  transform: scale(0.96);
  box-shadow: 0 2px 8px rgba(14,10,7,0.20), 0 1px 2px rgba(14,10,7,0.10);
  transition-duration: 80ms;
}
```
The spring easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) gives the brief "press then release" tactile feel.

### States
- **Default:** resting, shadow visible
- **Hover:** very slight scale up + shadow grows
- **Active (pressed):** quick scale down, shadow flattens (as if pressing real wax)
- **Opened:** can animate a "melt" drip with SVG clip-path, but only if performant on mobile

---

## 2. Divider / Rule Line

### Standard horizontal rule
```css
.divider {
  width: 100%;
  height: 0.5px;         /* sub-pixel on retina = hairline */
  background: #dad3cd;   /* squirrel-300 */
  border: none;
  margin-block: var(--space-8);
}
```

### Short ornamental rule (between names and date)
```css
.divider--short {
  width: 48px;
  height: 0.5px;
  background: #dad3cd;
  margin-inline: auto;
  margin-block: var(--space-3);
}
```

### Vertical rule (hero layout only)
```css
.divider--vertical {
  width: 0.5px;
  height: 100%;
  background: #dad3cd;
}
```
Reference: photo_1 shows a vertical 1px rule separating date numerals from names.

---

## 3. Buttons

Two variants only. No filled color buttons except the primary CTA.

### Outline (default)
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;      /* text-sm */
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5e5547;           /* squirrel-600 */
  background: transparent;
  border: 1px solid #5e5547;
  cursor: pointer;
  transition: background 200ms ease, color 200ms ease;
}
.btn:hover {
  background: #e9e5e2;      /* squirrel-200 */
  color: #4a4136;           /* squirrel-700 */
}
.btn:focus-visible {
  outline: 2px solid #917e6e; /* squirrel-500 */
  outline-offset: 3px;
}
.btn:active {
  background: #dad3cd;      /* squirrel-300 */
}
```

### Filled (primary CTA — RSVP submit only)
```css
.btn--primary {
  background: #201913;      /* squirrel-900 */
  color: #fbfbf8;           /* squirrel-50 */
  border-color: #201913;
}
.btn--primary:hover {
  background: #2d2320;      /* squirrel-800 */
  border-color: #2d2320;
  color: #fbfbf8;
}
```

### Sizing
- Default: `padding: 12px 32px`
- Large (hero CTA): `padding: 16px 48px; font-size: 1rem`
- No small button variant

### No rounded corners
`border-radius: 0` — sharp corners communicate luxury stationery, not app UI.

---

## 4. Form Inputs (RSVP)

```css
.input {
  width: 100%;
  padding: 12px 0;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #201913;           /* squirrel-900 */
  background: transparent;
  border: none;
  border-bottom: 1px solid #dad3cd; /* squirrel-300 — underline style */
  outline: none;
  transition: border-color 200ms ease;
}
.input::placeholder {
  color: #b0a196;           /* squirrel-400 */
  letter-spacing: 0.03em;
}
.input:focus {
  border-bottom-color: #5e5547; /* squirrel-600 */
}
.input:focus::placeholder {
  opacity: 0;               /* placeholder fades on focus */
  transition: opacity 150ms ease;
}
```

**Use underline inputs, not boxed inputs.** Boxed inputs feel like a form; underline inputs feel like signing a register.

### Select / Radio (attendance)
Use a custom radio — two pill-options side by side:
```
[ Буду ]   [ Не смогу ]
```
- Unselected: outline style (same as btn outline)
- Selected: filled style with squirrel-900 background
- No native radio circle visible

---

## 5. Cards / Info Blocks

For schedule items, location, dress code:

```css
.info-card {
  padding: var(--space-4) 0;
  border-top: 0.5px solid #dad3cd; /* squirrel-300 */
}
.info-card:last-child {
  border-bottom: 0.5px solid #dad3cd;
}
```

No `background`, no `box-shadow`. Cards are defined by their border-top only.
This preserves the "flat paper" aesthetic.

---

## 6. Countdown Timer

Four blocks: days, hours, minutes, seconds.

```
   12          04          37          55
ДНЕЙ        ЧАСОВ      МИНУТ       СЕКУНД
```

- Numbers: Cormorant Garamond weight 300, text-4xl (64px)
- Labels: Inter weight 300, text-xs (11px), letter-spacing +0.12em, squirrel-400
- Separator between blocks: none (use whitespace only)
- No box/card around digits — pure type on background
- Seconds counter: update smoothly with `transition: opacity 80ms ease` cross-fade, not a jump

---

## 7. Photo Treatment

Reference photos should appear desaturated to integrate with the warm Squirrel palette.

```css
.photo {
  filter: saturate(0.3) sepia(0.1);  /* desaturate + slight warm tint */
  mix-blend-mode: multiply;           /* blends with squirrel-100 bg */
}
```

On hover (if photo is interactive):
```css
.photo:hover {
  filter: saturate(0.5) sepia(0.05);
  transition: filter 400ms ease;
}
```

**Never show a fully color photo** — it competes with the palette and breaks the mood.
