<div align="center">

# Vinik & Nare — Wedding Invitation

An elegant, trilingual, single-page wedding invitation built with **Nuxt 4**.
Fine line‑art botanicals, a wax‑seal motif, GSAP scroll choreography and a smooth
Lenis scroll — designed to feel like a printed invitation that came to life.

**🌐 Live:** [vinik-nare.vahe-sargsyan.com](https://vinik-nare.vahe-sargsyan.com)

`Nuxt 4` · `Vue 3` · `GSAP` · `Lenis` · `@nuxtjs/i18n` · `TypeScript`

</div>

---

## ✨ Features

- **Trilingual** — Armenian (default), Russian and English, via `@nuxtjs/i18n` with lazy‑loaded messages.
- **Cinematic motion** — GSAP + ScrollTrigger reveals, parallax and a clip‑path hero, smoothed by [Lenis](https://github.com/darkroomengineering/lenis). Fully honours `prefers-reduced-motion`.
- **Interactive gallery** — an editorial photo grid with scroll‑driven wipes, hover zoom and a keyboard/swipe‑navigable lightbox (GSAP `Draggable`).
- **Hand‑grown botanicals** — a single `<Botanical>` SVG component generates organic eucalyptus sprigs, sprays and a line‑drawn rose by sampling Bézier curves (no image assets, scales infinitely, recolours via `currentColor`).
- **Living countdown** to the big day, plus a wax‑seal RSVP form that delivers responses to Telegram.
- **Design‑token driven** — one palette, type scale and motion system in `tokens.css`; every component reads from it.
- **Static‑first** — pre‑rendered with `nuxt generate` and deployed to GitHub Pages via Actions.

## 🛠 Tech stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | [Nuxt 4](https://nuxt.com) (`app/` directory structure) |
| UI             | Vue 3 `<script setup>` + TypeScript |
| Animation      | [GSAP 3](https://gsap.com) — ScrollTrigger, Draggable, Inertia, Flip |
| Smooth scroll  | [Lenis](https://github.com/darkroomengineering/lenis) |
| i18n           | [`@nuxtjs/i18n`](https://i18n.nuxtjs.org) |
| RSVP backend   | Nitro server route → Telegram Bot API |
| Hosting        | GitHub Pages (static) |

## 🚀 Quick start

```bash
pnpm install      # install dependencies
pnpm dev          # dev server → http://localhost:3000
pnpm generate     # build the static site into .output/public
pnpm preview      # preview the production build
```

> Requires **Node 22+** and **pnpm 9+**.

## 🗂 Project structure

```
app/
├─ app.vue                 # section order for the page
├─ app.config.ts           # wedding data: date, venues, story, gallery, program
├─ components/
│  ├─ Section*.vue         # Hero, Greeting, Countdown, Stages, Gallery, Program, Location, Rsvp, Footer
│  ├─ Botanical.vue        # procedural SVG sprigs / sprays / rose
│  ├─ WaxSeal.vue          # the В&Н wax seal
│  ├─ GrainOverlay.vue     # subtle film grain
│  └─ Ui/                  # Button, Input, RadioGroup, Divider, Tag … design-system primitives
├─ composables/            # useCountdown, useProgram, useGsapReveal
├─ plugins/                # gsap.client.ts, lenis.client.ts
└─ assets/css/             # tokens.css (design tokens) + main.css
i18n/locales/              # hy.json · ru.json · en.json
server/api/rsvp.post.ts    # RSVP → Telegram
public/                    # fonts, images, favicon, CNAME
IMAGE_GUIDELINES.md        # how to generate on-brand photos & florals
```

## ⚙️ Configuration

### Wedding content

Almost everything editable lives in **`app/app.config.ts`** — the date (used by the
countdown), venue map links, the love‑story timeline, the gallery list and the day
programme. All human‑readable text is in **`i18n/locales/*.json`**, keyed identically
across the three languages.

```ts
// app/app.config.ts
wedding: {
  dateISO: '2026-10-18T00:00:00',
  gallery: [
    { src: '/images/gallery/1.webp', span: 'tall' }, // span: 'normal' | 'tall' | 'wide'
    // …
  ],
}
```

### RSVP → Telegram

The RSVP form posts to `server/api/rsvp.post.ts`, which forwards submissions to a
Telegram chat. Provide credentials via `.env` (read through `runtimeConfig`):

```dotenv
NUXT_TELEGRAM_BOT_TOKEN=123456:abc...
NUXT_TELEGRAM_CHAT_ID=-1001234567890
```

> **Note:** the RSVP endpoint is a server route, so it runs on Node/edge hosts
> (Vercel, Netlify, Cloudflare, a VPS …). On a purely static GitHub Pages deploy
> the form needs an external endpoint instead — point the `fetch` in
> `SectionRsvp.vue` at a form service, or host the site on a hybrid platform.

### Imagery

Photos and florals follow a deliberate look (desaturated, warm, white‑rose + eucalyptus
palette). See **[IMAGE_GUIDELINES.md](./IMAGE_GUIDELINES.md)** for aspect ratios, slots
and ready‑to‑use AI generation prompts.

## 🌍 Deployment

Pushing to `main` triggers **`.github/workflows/deploy.yml`**, which runs
`pnpm generate` and publishes `.output/public` to GitHub Pages. The custom domain is
configured in `public/CNAME`.

To deploy elsewhere, run `pnpm generate` and serve `.output/public` from any static
host (or `pnpm build` for a Node server build if you want the RSVP route live).

## ♿ Accessibility & performance

- All decorative SVG/canvas is `aria-hidden`; the lightbox is a focus‑managed `role="dialog"`.
- Every animation collapses to near‑zero duration under `prefers-reduced-motion`.
- Images are lazy‑loaded; the botanical art is vector (zero raster weight).

## 🔤 Fonts

This project uses two bespoke display faces — **Victory** (serif) and **Sosbanff**
(script) — shipped from `public/fonts/`. They fall back to Cormorant/Playfair and a
generic cursive. If you fork this project, replace them with fonts you are licensed to
use.

## 📄 License

Released under the [MIT License](./LICENSE). The couple's names, photographs and the
custom fonts are **not** covered — swap in your own before reusing.

<div align="center"><sub>Made with love, GSAP and a lot of white roses 🤍</sub></div>
