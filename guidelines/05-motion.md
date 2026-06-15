# Motion & Animation

## Principles

1. **Motion communicates meaning, not decoration.** Every animation must answer: what does this tell the user?
2. **Slow is luxurious. Jerky is cheap.** Duration on the long side, easing always smooth.
3. **Subtlety over drama.** Elements should seem to *arrive* rather than *perform*.
4. **Respect `prefers-reduced-motion`.** All animations must wrap or fall back.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Timing Functions

| Name | CSS Value | Use |
|---|---|---|
| `ease-gentle` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default: most transitions |
| `ease-out-soft` | `cubic-bezier(0, 0, 0.2, 1)` | Element arriving into view |
| `ease-in-soft` | `cubic-bezier(0.4, 0, 1, 1)` | Element leaving |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Wax seal press only |
| `ease-lux` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero reveal, large entrance |

**Never use `ease-in-out` with long durations** — it feels mechanical. `ease-lux` achieves the same graceful S-curve but with a more natural acceleration.

---

## Duration Scale

| Token | Duration | Use |
|---|---|---|
| `duration-instant` | 80ms | Active/pressed states |
| `duration-fast` | 150ms | Hover state changes |
| `duration-default` | 200ms | Most UI transitions |
| `duration-medium` | 350ms | Input focus, small reveals |
| `duration-slow` | 600ms | Section fade-in on scroll |
| `duration-lux` | 900ms | Hero entrance, wax seal open |
| `duration-ceremony` | 1400ms | Page-level reveal (very first load) |

---

## Scroll-Triggered Fade-In

The primary animation pattern. Elements fade up as they enter the viewport.

```css
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity var(--duration-slow) var(--ease-out-soft),
    transform var(--duration-slow) var(--ease-out-soft);
}
.fade-in-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
// Intersection Observer implementation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target) // fire once only
      }
    })
  },
  { threshold: 0.15 }
)

document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el))
```

**Stagger:** When multiple elements in a group fade in, stagger by `80ms` per element.
Use `transition-delay` inline:
```html
<p class="fade-in-up" style="transition-delay: 0ms">Виник</p>
<p class="fade-in-up" style="transition-delay: 80ms">&</p>
<p class="fade-in-up" style="transition-delay: 160ms">Нарэ</p>
```

---

## Hero Entrance (Page Load)

Sequence on first load — no auto-play video, no splash screen. Just a timed text reveal:

```
0ms       Background appears (squirrel-50 — instant, it's just the page bg)
200ms     Date numerals fade in (duration-lux, ease-lux)
700ms     Vertical divider draws in (height animates 0 → 100%, duration-slow)
900ms     Names fade in with translateY (duration-lux, ease-lux)
1300ms    Ampersand fades in (duration-slow)
1600ms    CTA / wax seal fades in (duration-slow)
```

Use CSS `animation-delay` for this sequence, not JS timers.

```css
.hero-date    { animation: fadeUp 900ms var(--ease-lux) 200ms both; }
.hero-divider { animation: drawDown 600ms var(--ease-out-soft) 700ms both; }
.hero-names   { animation: fadeUp 900ms var(--ease-lux) 900ms both; }
.hero-seal    { animation: fadeIn 600ms var(--ease-out-soft) 1600ms both; }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes drawDown {
  from { transform: scaleY(0); transform-origin: top; }
  to   { transform: scaleY(1); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

---

## Countdown Seconds Tick

```css
.countdown-seconds {
  transition: opacity 80ms ease;
}
.countdown-seconds.ticking {
  opacity: 0.6;
}
```

Toggle the `ticking` class for 80ms on each second update. Do not use a `scale` transform — motion must be near-zero for the non-seconds digits. Only seconds visually acknowledge time passing.

---

## Wax Seal Reveal Animation (Optional — "Open Invitation")

If using the seal as a full-page reveal gate (before showing the invitation content):

```css
@keyframes sealBreak {
  0%   { transform: scale(1) rotate(0deg); opacity: 1; }
  40%  { transform: scale(1.08) rotate(-3deg); opacity: 1; }
  100% { transform: scale(0) rotate(8deg); opacity: 0; }
}
```

After the seal animates out, the invitation content slides up:
```css
@keyframes invitationReveal {
  from { transform: translateY(40px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}
```

**Only use this pattern if it doesn't gate critical information on mobile.** If guests must see the date immediately, skip the reveal gate.

---

## What Is Forbidden

- `animation: bounce` or any spring on text
- Scale transitions on section containers (only on isolated UI elements)
- Parallax scrolling effects
- Any animation that causes layout shift (CLS)
- Looping background animations
- Auto-playing video or animated backgrounds
- CSS transitions on `width`, `height`, or `padding` (triggers layout — use `transform` instead)
