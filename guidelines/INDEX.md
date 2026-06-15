# Design Guidelines — Виник & Нарэ Wedding Invitation

**Stack:** Nuxt 3 · Squirrel palette · Cormorant Garamond + Inter

---

## Files

| File | What's inside |
|---|---|
| [00-concept.md](./00-concept.md) | Design philosophy, brand voice, reference hierarchy |
| [01-color.md](./01-color.md) | Full Squirrel palette, semantic tokens, contrast rules, don'ts |
| [02-typography.md](./02-typography.md) | Font stack, type scale, line-height, letter-spacing, usage rules |
| [03-spacing-layout.md](./03-spacing-layout.md) | Spacing scale (8px base), container, grid, breakpoints, negative space |
| [04-components.md](./04-components.md) | Wax seal, dividers, buttons, form inputs, cards, countdown, photo filter |
| [05-motion.md](./05-motion.md) | Animation principles, timing tokens, scroll fade-in, hero entrance sequence |
| [06-imagery.md](./06-imagery.md) | Photo treatment CSS, botanical ornaments, wax seal SVG, icons |
| [07-sections.md](./07-sections.md) | All 8 page sections: layout, type specs, behavior |
| [08-tokens.css](./08-tokens.css) | All CSS custom properties — import this first |

---

## Build Order

Start here when building the site:

1. **08-tokens.css** → copy into `app/assets/css/tokens.css`, import globally in `nuxt.config.ts`
2. **Hero section** (07-sections §01) → blocked on: fonts loading, wax seal SVG
3. **Countdown** (07-sections §03) → simple composable, no external deps needed
4. **Program/Schedule** (07-sections §04) → static content, blocked on copy from couple
5. **RSVP form** (07-sections §07) → blocked on backend decision (email / Telegram / Google Sheets)
6. **Footer** (07-sections §08) → 20 minutes of work, do it last

---

## Quick Reference

```
Font import:  Cormorant Garamond (300, 400, 300i, 400i) + Cormorant SC (300, 400) + Inter (300, 400)
Page bg:      #fbfbf8  (--squirrel-50)
Primary text: #201913  (--squirrel-900)
Accent:       #5e5547  (--squirrel-600)
Divider:      #dad3cd  (--squirrel-300), 0.5px
Container:    max-width 680px, centered
Spacing base: 8px multiples
Radius:       0 (no border-radius anywhere)
Shadows:      rgba(14,10,7,...) only
```

---

## Decisions Still Open

- [ ] Couple's names confirmed (Виник & Нарэ assumed from project name)
- [ ] Wedding date confirmed
- [ ] Venue address / restaurant name
- [ ] RSVP backend (Telegram bot / Formspree / custom API)
- [ ] Whether to use the wax seal as a full-page reveal gate or decorative element only
- [ ] Need photos from couple for treatment
- [ ] Botanical monogram design (initials В & Н for the seal)
