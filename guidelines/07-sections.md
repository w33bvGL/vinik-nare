# Page Sections — Anatomy

The page is a single scrollable document. Think of it as an unrolling scroll.
Each section is a chapter. The order below is the canonical order.

---

## Section 01 — Hero (Cover)

**Purpose:** Establish the couple, the date, and the emotional register immediately.
**Reference:** photo_1 (date numerals + vertical rule + names layout).

### Layout (Desktop, ≥768px)
```
┌─────────────────────────────────────────────────────┐
│                                                       │
│              [space-24 top padding]                   │
│                                                       │
│   27          │    Виник                              │
│   ─           │      &                                │
│   09          │    Нарэ                               │
│   ─           │                                       │
│   26          │                                       │
│                                                       │
│           ────────────                                │
│                                                       │
│           [wax seal / open CTA]                       │
│                                                       │
│              [space-16 bottom padding]                │
│                                                       │
└─────────────────────────────────────────────────────┘
```

### Layout (Mobile, <768px)
```
┌──────────────────────────┐
│                           │
│  [space-16 top padding]   │
│                           │
│  Виник                    │
│    &                      │
│  Нарэ                     │
│                           │
│  ─────────                │
│                           │
│  27 · 09 · 2026           │
│                           │
│  [wax seal]               │
│                           │
│  [space-12 bottom]        │
└──────────────────────────┘
```

### Type specs
- Date numerals: Cormorant Garamond 300, `clamp(4rem, 15vw, 8rem)`, line-height 0.9
- Names: Cormorant Garamond 300 italic, `clamp(2.5rem, 8vw, 5.656rem)`, line-height 1.1
- Ampersand: same as names at 65% size, color squirrel-500
- Vertical rule: 0.5px, squirrel-300, height = full height of date block
- Below names: 48px short divider centered, squirrel-300
- Below divider: wax seal (80px) or text CTA button

### No hero background image. Clean squirrel-50 only.

---

## Section 02 — Greeting

**Purpose:** Personal address to the guest. Intimate, warm.

### Layout
Centered, narrow (max 480px within the 680px container).

```
[space-12 top]

  ДОРОГОЙ(ИЕ) [ИМЯ ГОСТЯ]

  Приглашаем вас разделить с нами
  этот важный день нашей жизни.

[space-12 bottom]
```

### Type specs
- "ДОРОГОЙ(ИЕ)": Cormorant SC weight 300, text-xl, letter-spacing +0.15em, squirrel-400
- Guest name: Cormorant Garamond weight 400, text-2xl, squirrel-900 (personalized via URL param or static)
- Body text: Inter weight 300, text-lg, line-height 1.8, squirrel-900, centered
- Max 3–4 lines of body. No more.

---

## Section 03 — Date & Countdown

**Purpose:** Anchor the date. Build anticipation with the live countdown.

### Layout
```
[divider top]
[space-8]

  17 СЕНТЯБРЯ 2026

  [12]   [04]   [37]   [55]
  ДНЕЙ  ЧАСОВ МИНУТ  СЕКУНД

[space-8]
[divider bottom]
```

### Type specs
- Full date: Cormorant Garamond 300, text-3xl, letter-spacing +0.02em, squirrel-800
- Countdown numbers: Cormorant Garamond 300, text-4xl (64px), squirrel-900
- Countdown labels: Inter 300, text-xs, letter-spacing +0.12em, squirrel-400, ALL CAPS
- Countdown layout: `display: flex; gap: var(--space-6); justify-content: center`

---

## Section 04 — Program / Schedule

**Purpose:** Time and flow of the day. Scannable, precise.

### Layout
```
[space-12]

ПРОГРАММА ДНЯ

────────────────────

17:00  Сбор гостей
       Ресторан «Название»
       ул. Пушкина, 1

────────────────────

17:30  Торжественная церемония
       ЗАГС Центрального района

────────────────────

19:00  Праздничный банкет
       Тот же ресторан

[space-12]
```

### Type specs
- Section title "ПРОГРАММА ДНЯ": Cormorant SC 300, text-xl, letter-spacing +0.15em, squirrel-400
- Time: Cormorant Garamond 400, text-xl, `font-variant-numeric: tabular-nums`, squirrel-900
- Event name: Inter 400, text-base, squirrel-900
- Venue/address: Inter 300, text-sm, letter-spacing +0.03em, squirrel-400
- Divider between items: 0.5px squirrel-300
- Time and event name on same row: time is fixed-width left (80px), event name fills remaining

---

## Section 05 — Location / Map

**Purpose:** Venue address + optional map embed or link.

### Layout
```
[space-12]

МЕСТО ПРОВЕДЕНИЯ

Ресторан «Название»
г. Москва, ул. Пушкина, д. 1

[ Открыть на карте ]    ← outline button

[space-12]
```

### Type specs
- Section title: Cormorant SC 300, text-xl, letter-spacing +0.15em, squirrel-400
- Restaurant name: Cormorant Garamond 400, text-2xl, squirrel-900
- Address: Inter 300, text-base, squirrel-400, line-height 1.7
- Button: outline style, standard size

### Map embed (optional)
If embedding a map, use a static image (not interactive iframe) for performance.
Apply the photo filter: `filter: saturate(0.15) sepia(0.2)`.
The map should feel like an antique illustration, not Google Maps.
Tap to open native maps app.

---

## Section 06 — Dress Code (Optional)

**Purpose:** Guest guidance. Should feel like a suggestion, not a command.

```
[space-8]

ДРЕСС-КОД

Просим вас придерживаться
палитры тёплых натуральных тонов.
Никаких ярких цветов.

[palette swatches: 3–4 color dots]
squirrel-200 · squirrel-400 · squirrel-600 · squirrel-900

[space-8]
```

The palette swatches are circular dots, 24px diameter, with 0.5px squirrel-300 stroke.
This doubles as a visual example for guests and reinforces the brand identity.

---

## Section 07 — RSVP Form

**Purpose:** Confirm attendance. The one truly functional section.

### Layout
```
[space-12]

ПОДТВЕРЖДЕНИЕ ПРИСУТСТВИЯ

До [дата - 2 недели] пожалуйста
сообщите о вашем решении.

[ Буду ]   [ Не смогу ]        ← pill radio

Ваше имя
_______________________________

Количество гостей (если + гость)
_______________________________

Пожелание паре (необязательно)
_______________________________


            [ Отправить ]       ← filled primary button

[space-12]
```

### Behavior
- Radio selection animates from outline → filled (200ms)
- Input fields animate border-bottom from squirrel-300 → squirrel-600 on focus
- Submit button shows a loading spinner (simple 1px spinning ring, squirrel-50 on dark bg)
- On success: form fades out, wax seal animates in with text "Ответ принят" below
- On error: a single line in squirrel-600 appears below the field (not a modal)

### Validation
- Name: required, min 2 chars
- Guest count: optional, number input, 0–5
- Wish: optional, textarea, 400 char max
- No email required — this is an intimate invitation, not a signup form

---

## Section 08 — Footer

**Purpose:** Close the scroll. No links, no navigation, no social. Just the couple and the date.

```
[space-16]

────────────────────────────────

  Виник & Нарэ
  17 · 09 · 2026

  [small wax seal ornament, 32px]

[space-8]
```

### Type specs
- Names: Cormorant Garamond 300 italic, text-2xl, squirrel-900, centered
- Date: Cormorant Garamond 300, text-sm, letter-spacing +0.1em, squirrel-400, centered
- Divider: full-width 0.5px squirrel-300
- Small wax seal: 32px, decorative only, no interaction

No "made with" credits. No links. No copyright line. The invitation ends with the names and date.
