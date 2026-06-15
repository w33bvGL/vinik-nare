# Imagery & Visual Assets

## Photo Treatment

All photographs must be processed to integrate with the Squirrel palette.
A full-color photo in this design is a mistake — it will fight the warm earthy tones.

### CSS filter (always applied)
```css
.photo {
  filter: saturate(0.25) sepia(0.12) brightness(0.97);
}
```

This produces a near-monochrome image with a faint warm brown cast — aligns with squirrel-900's temperature.

### When overlaying text on a photo
Add a gradient overlay to ensure legibility:
```css
.photo-overlay {
  background: linear-gradient(
    to bottom,
    rgba(251,251,248,0) 0%,
    rgba(251,251,248,0.7) 60%,
    rgba(251,251,248,0.95) 100%
  );
}
```

Never use a solid color overlay — it looks like a band-aid. Use the gradient to let the photo dissolve into the page background color.

---

## Photo Placement Rules

### Do
- Full-width photo as a section background (couple portrait, ceremony venue)
- Square or portrait-crop photo inset within a narrow column (photo_1 style — card + envelope)
- Black and white or near-B&W for couple portraits

### Don't
- Never show a photo with green/blue tones dominant — it clashes with Squirrel
- Never use a photo as a hero background — the date and names must breathe on clean paper
- Never crop to a landscape ratio (16:9) — use portrait (3:4) or square (1:1) only
- Never place two photos next to each other

---

## Botanical Ornaments

Inspired by references photo_3, photo_4, photo_6, photo_7.

### Usage
- Botanical SVG elements are permitted as *accent ornaments* only
- Maximum one botanical ornament per section
- Preferred positions: top-right corner of the page, or as a divider element
- Must be rendered in squirrel-300 (#dad3cd) — not photographic

### Specification
```css
.botanical-ornament {
  color: #dad3cd;       /* squirrel-300 */
  opacity: 0.8;
  width: 80px;          /* max on desktop */
  pointer-events: none;
  user-select: none;
}
```

**Preferred botanical forms:**
- Olive branch (2–3 leaves on a curved stem)
- Single wheat stalk
- Minimal eucalyptus sprig (photo_8 reference for shape only)

Avoid roses, peonies, or complex florals — too ornate for this palette.

---

## Wax Seal SVG

The seal is a custom SVG, not an emoji or stock image.

### Recommended SVG structure
```svg
<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
  <!-- Base circle -->
  <circle cx="40" cy="40" r="38" fill="#0e0a07"/>

  <!-- Botanical relief (olive branch or initials) -->
  <!-- Use strokes at opacity 0.45–0.65 over the dark base -->
  <path d="..." stroke="#4a4136" stroke-width="1.2"
        fill="none" opacity="0.6"/>

  <!-- Highlight arc (top-left rim catch) -->
  <path d="M 16 20 A 28 28 0 0 1 40 12"
        stroke="#917e6e" stroke-width="0.5"
        fill="none" opacity="0.3"/>
</svg>
```

The highlight arc gives the seal a three-dimensional, embossed quality.

---

## Texture (Optional)

If the design needs a subtle paper texture:
- Use a very light SVG noise filter (`feTurbulence`) at `opacity: 0.025`
- Or a CSS `background-image` with a base64-encoded subtle grain PNG
- Apply only to the `body` background, not to individual components

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url('data:image/svg+xml,...'); /* grain SVG */
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
}
```

**Only add texture if the design feels sterile without it.** Test without texture first.

---

## Icons

No icon libraries (Heroicons, Lucide, FontAwesome). 

If icons are needed (map pin for venue, clock for time):
- Use inline SVG, hand-crafted or from Phosphor Icons (thin weight only)
- Stroke-based, never filled
- Size: 16px (inline with text) or 20px (standalone)
- Color: squirrel-500 (#917e6e)
- Stroke-width: 1px to 1.5px

```css
.icon {
  width: 16px;
  height: 16px;
  stroke: #917e6e;
  stroke-width: 1.2;
  fill: none;
  flex-shrink: 0;
}
```
