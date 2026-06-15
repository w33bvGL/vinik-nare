# Typography

## Font Stack

### Display / Headings — Serif
**Primary:** Cormorant Garamond  
**Fallback:** Playfair Display, Georgia, serif

```html
<!-- Google Fonts import -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cormorant+SC:wght@300;400&display=swap" rel="stylesheet">
```

- Use **Cormorant Garamond** for all headings, names, dates, display text
- Use **Cormorant SC** (small caps variant) for all-caps labels, section identifiers
- Never use Cormorant at weight 700+ — heaviness destroys the elegance
- Italic variant (`font-style: italic`) is permitted for names only

### Body / UI — Humanist Sans
**Primary:** Inter  
**Fallback:** system-ui, -apple-system, sans-serif

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400&display=swap" rel="stylesheet">
```

- Weight 300 for body paragraphs, captions
- Weight 400 for UI labels, form elements, small interactive text
- Never use Inter above weight 400 in this project
- Never use Inter for headings

---

## Type Scale

Base: `16px` (1rem). Scale ratio: 1.414 (√2 — classic print ratio).

| Token | rem | px | Use |
|---|---|---|---|
| `text-xs` | 0.707rem | ~11px | Legal footnotes, metadata only |
| `text-sm` | 0.875rem | 14px | Captions, secondary labels |
| `text-base` | 1rem | 16px | Body copy |
| `text-lg` | 1.125rem | 18px | Lead paragraph, intro text |
| `text-xl` | 1.414rem | ~22px | Section subheadings (Inter) |
| `text-2xl` | 2rem | 32px | Section headings (Cormorant) |
| `text-3xl` | 2.828rem | ~45px | Hero subtext, names |
| `text-4xl` | 4rem | 64px | Hero names, large display |
| `text-5xl` | 5.656rem | ~90px | Date numerals hero |
| `text-display` | 8rem | 128px | Maximum scale — date on hero mobile |

---

## Line Height

| Context | line-height |
|---|---|
| Display/headings (Cormorant) | 1.1 – 1.2 |
| Subheadings | 1.3 |
| Body copy | 1.7 |
| Captions / labels | 1.4 |
| Buttons / UI elements | 1 (controlled by padding) |

---

## Letter Spacing

| Context | letter-spacing |
|---|---|
| Cormorant display (≥ text-3xl) | −0.02em (slight tightening) |
| Cormorant heading (text-2xl) | 0 |
| Cormorant SC labels | +0.15em (small caps must breathe) |
| Inter body | +0.01em |
| Inter captions / metadata | +0.05em |
| Inter ALL CAPS labels | +0.1em (never use Inter in all-caps without spacing) |

---

## Usage Rules

### Headings hierarchy
```
H1 — Cormorant Garamond, weight 300, italic, text-5xl
     → The couple's names: "Виник & Нарэ"

H2 — Cormorant Garamond, weight 400, text-3xl
     → Section title: "Церемония", "Программа", "RSVP"

H3 — Cormorant SC, weight 300, text-xl, letter-spacing +0.15em
     → Subsection label: "МЕСТО", "ВРЕМЯ", "ДРЕСС-КОД"

H4 — Inter, weight 400, text-base, ALL CAPS, letter-spacing +0.1em
     → UI labels, form field labels
```

### Dates & numerals
- Large date numerals (hero): Cormorant Garamond weight 300, text-5xl, lining numerals (`font-variant-numeric: lining-nums`)
- Inline dates: Cormorant Garamond weight 400, text-2xl, `font-variant-numeric: lining-nums tabular-nums`
- Time: same as inline dates

### The ampersand (&)
- Always use the italic ampersand (`&` in italic Cormorant) between names
- Scale: 60–70% of the surrounding name size
- Color: squirrel-500 (#917e6e) — it recedes, names dominate

### Do not mix
- Never set body copy in Cormorant
- Never set headings in Inter
- Never use bold (700+) anywhere
- Never use underline for decoration — only for links, and even then, prefer color change

---

## Responsive Typography

Use `clamp()` for fluid scaling. Do not use fixed px at breakpoints.

```css
/* Example: Couple names */
font-size: clamp(2.5rem, 8vw, 5.656rem);

/* Example: Date numerals */
font-size: clamp(4rem, 15vw, 8rem);

/* Example: Section heading */
font-size: clamp(1.75rem, 4vw, 2.828rem);
```

**Mobile rule from README:** Body text on mobile should be slightly larger than default to preserve premium feel.  
Minimum body font-size on mobile: `17px` (not 16px).

---

## Optical Alignment

- Heading text aligned to left on mobile (390px and below)
- Heading text centered on desktop when in a contained hero/section block
- Body text always left-aligned (center-aligned body copy is hard to read and feels cheap)
- Exception: A single line of 2–4 words may be centered (ceremony time, venue name)
