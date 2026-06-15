# Spacing & Layout

## Spacing Scale

Base unit: `8px` (0.5rem). All spacing must be multiples of this unit.

| Token | px | rem | Use |
|---|---|---|---|
| `space-1` | 8px | 0.5rem | Internal component padding (tight) |
| `space-2` | 16px | 1rem | Default internal padding, gap between related elements |
| `space-3` | 24px | 1.5rem | Gap between a label and its content |
| `space-4` | 32px | 2rem | Gap between elements within a section |
| `space-6` | 48px | 3rem | Gap between subsections |
| `space-8` | 64px | 4rem | Section internal padding-top / padding-bottom |
| `space-12` | 96px | 6rem | Between major page sections (desktop) |
| `space-16` | 128px | 8rem | Hero padding, breathing room at page extremes |
| `space-24` | 192px | 12rem | Above-the-fold breathing (hero only) |

**Between major sections on mobile:** `space-12` (96px) → `space-8` (64px).

---

## Page Layout

### Container
```css
.container {
  width: 100%;
  max-width: 680px;       /* Invitation card proportion — narrow on purpose */
  margin-inline: auto;
  padding-inline: 24px;   /* space-3 on mobile */
}

@media (min-width: 768px) {
  .container {
    padding-inline: 48px; /* space-6 on tablet+ */
  }
}
```

**Why 680px max-width?** A physical A5 invitation card is ~148×210mm. At 96dpi web baseline,
that's roughly 560px wide. We use 680px to give the web version more breathing room while
preserving the narrow, tall, paper-like proportions.

### Grid
There is no complex grid. The layout is a **single-column centered stack**.
The only exception is the hero section date layout (see `07-sections.md`).

Use CSS Grid only when two elements need to sit side-by-side:
```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}
/* Collapses to single column below 480px */
@media (max-width: 480px) {
  .two-col { grid-template-columns: 1fr; }
}
```

---

## Vertical Rhythm

Every vertical spacing decision must answer: "does this gap communicate the relationship between these elements?"

- **Tight (space-1 / space-2):** elements that belong to the same unit (label + value, time + venue)
- **Medium (space-4 / space-6):** elements that are related but distinct (two schedule items)
- **Wide (space-8 / space-12):** section boundaries
- **Very wide (space-16+):** page-level breathing, hero

**The most common error:** not enough space between sections. Default to *more* space, not less. Luxury communicates through generosity.

---

## Breakpoints

| Name | Min-width | Notes |
|---|---|---|
| `xs` | 0px | Default, mobile-first |
| `sm` | 480px | Wider phones, landscape |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop — layout changes minimal |
| `xl` | 1280px | Not needed for this project |

This project is **primarily mobile**. Guests open on phones at the venue or at home.
Desktop must work beautifully but mobile is the priority viewport.

---

## Negative Space Rules

1. **Never center two elements symmetrically if they have different visual weights.** Adjust optically.
2. **Section padding-block minimum is `space-8` (64px).** Never compress sections to fill perceived gaps.
3. **The hero section has no bottom border/divider.** The space itself communicates the transition.
4. **Do not place any element within 24px of the viewport edge** on mobile.
5. **Wax seal ornament must have at least `space-6` (48px) clearance** from surrounding text.

---

## Z-index Scale

| Layer | z-index | Use |
|---|---|---|
| `z-base` | 0 | Normal document flow |
| `z-above` | 10 | Floating decorative elements |
| `z-overlay` | 50 | Reveal overlay on hero |
| `z-modal` | 100 | Any modal/drawer (RSVP confirmation) |
| `z-toast` | 200 | Success/error toasts |

---

## Scrollbar

Hide the native scrollbar. The page is a single vertical scroll — no horizontal scroll ever.

```css
html {
  scrollbar-width: none; /* Firefox */
}
html::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
```

Use `scroll-behavior: smooth` on `html`. Do not use JS scroll libraries.
