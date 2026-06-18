# Image & Florals Guidelines

Art‑direction for every visual on the invitation — photographs **and** the botanical
illustrations (twigs, leaves, white roses). Follow this so anything you add — shot or
AI‑generated — sits inside the same world.

> **TL;DR** — Warm ivory paper, desaturated film‑toned photos, white roses + soft
> sage **eucalyptus**, fine taupe line work. Quiet, elegant, never saturated.

---

## 1. The palette

The whole site is one warm, low‑chroma "squirrel" scale. Match it.

| Token            | Hex       | Role |
| ---------------- | --------- | ---- |
| `squirrel-50`    | `#fbfbf8` | paper / background |
| `squirrel-100`   | `#f6f6f3` | surfaces |
| `squirrel-200`   | `#e9e5e2` | soft fills |
| `squirrel-300`   | `#dad3cd` | dividers, faint florals |
| `squirrel-400`   | `#b0a196` | botanical line work |
| `squirrel-500`   | `#917e6e` | mid taupe |
| `squirrel-600`   | `#5e5547` | accents |
| `squirrel-700`   | `#4a4136` | wax‑seal engraving |
| `squirrel-900`   | `#201913` | primary text |
| `squirrel-950`   | `#0e0a07` | wax seal / deepest shadow |

**Greenery accent** (eucalyptus, used in florals only): soft, dusty sage — roughly
`#9aa489` → `#c2c7b4`, always muted, never emerald.

> ⚠️ **Photos are filtered in‑app.** A global CSS filter desaturates and warms every
> photo (`saturate(0.25) sepia(0.12) brightness(0.97)`). So **deliver naturally‑lit,
> neutral‑to‑warm images** — don't pre‑apply heavy filters, or the result will be
> muddy. Test by viewing on the site, not the raw file.

---

## 2. Two kinds of artwork

### A. Line‑art botanicals (match the built‑in `<Botanical>` component)

Single‑colour, thin, elegant eucalyptus sprigs — the same language as the SVG sprigs
already drawn on the page. Use these when you need a decorative accent that recolours
cleanly.

- **Colour:** single flat taupe (`#b0a196`), no fill, ~1px strokes.
- **Background:** transparent PNG/SVG.
- **Style:** continuous‑line, botanical, minimal, lots of negative space.

> In most cases you don't need to generate these — the `<Botanical>` Vue component
> produces them procedurally. Generate raster florals only for the richer corner
> sprays (below).

### B. Watercolor white‑rose sprays (the "printed invitation" look)

Soft watercolour clusters of **ivory/white garden roses + eucalyptus + gypsophila**,
exactly like the reference cards. Use for corner decorations or section backdrops.

- **Background:** transparent PNG.
- **Mood:** airy, pale, botanical‑illustration, gentle shadows.
- **Composition:** corner sprays (so the centre stays clear for text), or a single
  horizontal sprig for dividers.

---

## 3. Where each image goes

| Slot | File(s) | Aspect (deliver) | Orientation | Notes |
| ---- | ------- | ---------------- | ----------- | ----- |
| Hero | `public/images/hero.webp` | `4:5` (min 1600×2000) | Portrait | Subject in the **upper third** (`object-position` is high). Calm, airy. |
| Story / Stages | `public/images/stages/1–4.webp` | `3:4` | Portrait | Four candid milestones (meeting → wedding). |
| Gallery — `tall` | `gallery/1.webp`, `gallery/5.webp` | `3:4` | Portrait | |
| Gallery — `wide` | `gallery/2.webp`, `gallery/6.webp` | `21:9` (min 2200×940) | Panoramic landscape | Wide, banner‑like; keep subjects centred. |
| Gallery — `normal` | `gallery/3.webp`, `gallery/4.webp` | `4:5` | Portrait | |
| Programme | `public/images/program/1–2.webp` | `4:5` (min 1400×1750) | Portrait | Venue / ceremony mood; shown large. |

All slots crop with `object-fit: cover`, so **leave breathing room** around the subject —
don't compose to the very edge.

### Export

- Format **WebP**, quality **78–85**.
- sRGB, strip metadata.
- Keep each file roughly **under ~250 KB** (the gallery loads several).

```bash
# example: convert + resize to WebP
cwebp -q 82 -resize 1600 0 source.jpg -o public/images/gallery/1.webp
```

---

## 4. Ready‑to‑use generation prompts

Tune for your tool (Midjourney `--ar`, SD width/height, etc.). Keep **saturation low**.

### Photography style (couple shots, venue mood)

```
A candid fine-art wedding photograph, soft natural window light, warm neutral tones,
shallow depth of field, muted desaturated film palette (ivory, taupe, warm grey),
gentle grain, elegant and timeless, airy negative space, Kodak Portra 400 look.
--ar 4:5 --style raw
```

Wide / panoramic variant: swap `--ar 21:9`, add `expansive composition, subjects centred`.

> **Negative / avoid:** `oversaturated, neon, HDR, harsh flash, heavy vignette, blue
> cast, busy background, modern UI, text, watermark`.

### Watercolor white‑rose corner spray (transparent PNG)

```
Delicate watercolor botanical illustration, cluster of ivory and white garden roses
with soft sage-green eucalyptus leaves and tiny gypsophila buds, arranged as a corner
spray, pale and airy, fine detail, muted dusty palette, soft shadows, hand-painted,
transparent background, lots of empty space in the centre.
--ar 1:1
```

> **Negative / avoid:** `bright colours, red roses, dark green, cartoon, heavy outline,
> photograph, rectangle frame, background colour`.

### Single‑colour line‑art sprig (divider / accent)

```
Minimal single continuous line drawing of a eucalyptus sprig, thin elegant strokes,
flat taupe colour #b0a196, no fill, botanical, lots of negative space,
transparent background, vector style.
--ar 1:1
```

---

## 5. Quick checklist before committing an image

- [ ] Right **slot aspect ratio**, subject not cropped at the site's crop.
- [ ] **Low saturation**, warm‑neutral — looks right *on the site*, not just raw.
- [ ] White roses are **ivory/white**, greenery is **dusty sage** (never emerald/red).
- [ ] Florals exported as **transparent PNG**; photos as **WebP < ~250 KB**.
- [ ] No text, watermark, logo or border baked in.
- [ ] Filename matches the slot in `app/app.config.ts`.
