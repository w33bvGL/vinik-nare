<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <section class="hero" aria-label="Приглашение">
    <div class="container">

      <!-- Desktop: [date | rule | names], Mobile: [names / date] -->
      <div class="hero__layout">

        <!-- Date column (desktop left, mobile below names) -->
        <div class="hero__date" aria-label="Дата свадьбы">
          <span class="hero__num hero__num--day">{{ wedding.dateDay }}</span>
          <span class="hero__num-sep" aria-hidden="true" />
          <span class="hero__num hero__num--month">{{ wedding.dateMonth }}</span>
          <span class="hero__num-sep" aria-hidden="true" />
          <span class="hero__num hero__num--year">{{ wedding.dateYear }}</span>
        </div>

        <!-- Vertical rule (desktop only) -->
        <div class="hero__vrule" aria-hidden="true" />

        <!-- Names column -->
        <div class="hero__names">
          <span class="hero__name hero__name--groom">{{ wedding.groom }}</span>
          <span class="hero__amp" aria-hidden="true">&amp;</span>
          <span class="hero__name hero__name--bride">{{ wedding.bride }}</span>
        </div>
      </div>

      <!-- CTA area -->
      <div class="hero__cta">
        <AppDivider variant="short" />
        <WaxSeal :size="80" interactive />
        <p class="hero__hint">Пролистайте вниз</p>
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: var(--space-16);
}

/* ── Layout ── */
.hero__layout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  flex-direction: column; /* mobile: stacked */
}

@media (min-width: 768px) {
  .hero__layout {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: var(--space-6);
  }
}

/* ── Date column ── */
.hero__date {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
  order: 2; /* mobile: below names */
}

@media (min-width: 768px) {
  .hero__date {
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
    order: 0;
  }
}

.hero__num {
  font-family: var(--font-serif);
  font-weight: 300;
  font-variant-numeric: lining-nums;
  line-height: var(--leading-tight);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
}

/* Mobile: inline date, smaller */
.hero__num {
  font-size: clamp(2.5rem, 10vw, 4rem);
}

@media (min-width: 768px) {
  .hero__num {
    font-size: clamp(4rem, 8vw, 7rem);
  }
}

.hero__num-sep {
  display: none;
}

@media (max-width: 767px) {
  .hero__num-sep {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-divider);
    flex-shrink: 0;
  }
}

/* ── Vertical rule (desktop only) ── */
.hero__vrule {
  display: none;
}

@media (min-width: 768px) {
  .hero__vrule {
    display: block;
    width: 0.5px;
    background: var(--color-divider);
    align-self: stretch;
    flex-shrink: 0;
  }
}

/* ── Names column ── */
.hero__names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  order: 1;
}

@media (min-width: 768px) {
  .hero__names {
    align-items: flex-start;
    justify-content: center;
  }
}

.hero__name {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  line-height: var(--leading-snug);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(2.5rem, 8vw, 5rem);
}

.hero__amp {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: var(--squirrel-500);
  line-height: var(--leading-relaxed);
  margin-block: -0.2em;
}

/* ── CTA ── */
.hero__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.hero__hint {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

/* ── Entrance animations (fires once on page load) ── */
.hero__date {
  animation: heroFadeUp var(--dur-lux) var(--ease-lux) 200ms both;
}
.hero__vrule {
  animation: heroDraw 600ms var(--ease-out-soft) 700ms both;
}
.hero__names {
  animation: heroFadeUp var(--dur-lux) var(--ease-lux) 900ms both;
}
.hero__cta {
  animation: heroFadeUp var(--dur-slow) var(--ease-out-soft) 1500ms both;
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes heroDraw {
  from { transform: scaleY(0); transform-origin: top; }
  to   { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .hero__date,
  .hero__vrule,
  .hero__names,
  .hero__cta {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
