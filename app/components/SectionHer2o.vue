<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const heroRef      = ref<HTMLElement | null>(null)
const dateRef      = ref<HTMLElement | null>(null)
const vruleRef     = ref<HTMLElement | null>(null)
const namesRef     = ref<HTMLElement | null>(null)
const photoWrapRef = ref<HTMLElement | null>(null)
const photoImgRef  = ref<HTMLImageElement | null>(null)
const ctaRef       = ref<HTMLElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap) return

  const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (photoWrapRef.value && photoImgRef.value) {
    tl.fromTo(
        photoWrapRef.value,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut' },
        0.0,
      )
      .from(photoImgRef.value, { scale: 1.1, duration: 2.6, ease: 'power2.out' }, 0.0)
  }

  tl.from(dateRef.value,  { opacity: 0, x: -28, duration: 0.9 }, 0.5)
    .from(vruleRef.value, { scaleY: 0, transformOrigin: 'top center', duration: 0.7, ease: 'power2.inOut' }, 0.85)
    .from(namesRef.value?.children ?? [], { opacity: 0, y: 40, duration: 1.1, stagger: 0.16, ease: 'power4.out' }, 0.9)
    .from(ctaRef.value?.children ?? [], { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, 1.6)

  if (photoImgRef.value) {
    $gsap.to(photoImgRef.value, {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })
  }
})
</script>

<template>
  <section ref="heroRef" class="hero" aria-label="Invitation">

    <!-- Absolute photo — decorative, right side, not touching container edges -->
    <div
      v-if="config.wedding.heroPhoto"
      ref="photoWrapRef"
      class="hero__photo-wrap"
      aria-hidden="true"
    >
      <img
        ref="photoImgRef"
        :src="config.wedding.heroPhoto"
        alt=""
        class="hero__photo photo"
        loading="eager"
        decoding="async"
        fetchpriority="high"
      />
    </div>

    <div class="container hero__container">

      <div class="hero__layout">
        <div ref="dateRef" class="hero__date" aria-label="Wedding date">
          <span class="hero__num">{{ config.wedding.dateDay }}</span>
          <span class="hero__num-dot" aria-hidden="true" />
          <span class="hero__num">{{ config.wedding.dateMonth }}</span>
          <span class="hero__num-dot" aria-hidden="true" />
          <span class="hero__num">{{ config.wedding.dateYear }}</span>
        </div>

        <div ref="vruleRef" class="hero__vrule" aria-hidden="true" />

        <div ref="namesRef" class="hero__names">
          <span class="hero__name">{{ t('names.groom') }}</span>
          <span class="hero__amp" aria-hidden="true">&amp;</span>
          <span class="hero__name">{{ t('names.bride') }}</span>
        </div>
      </div>

      <div ref="ctaRef" class="hero__cta">
        <UiDivider variant="short" />
        <div class="hero__actions">
          <UiButton as="a" href="#rsvp" variant="filled">{{ t('hero.rsvpCta') }}</UiButton>
          <UiButton as="a" href="#program" variant="outline">{{ t('hero.programCta') }}</UiButton>
        </div>
        <span class="hero__scroll-line" aria-hidden="true" />
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Section ── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  padding-top: max(var(--space-8), env(safe-area-inset-top, var(--space-8)));
  padding-bottom: max(var(--space-8), env(safe-area-inset-bottom, var(--space-8)));
  overflow: hidden;
}

/* ── Photo — absolute, decorative, right-side, inset from all edges ── */
.hero__photo-wrap {
  position: absolute;
  /* Inset so it never touches any edge of the section */
  top: var(--space-6);
  bottom: var(--space-6);
  /* Right side, not centered.
     On wide screens: align with the container's right edge minus a gap.
     On narrow screens: just keep var(--space-3) from the viewport edge. */
  right: max(var(--space-3), calc((100% - 780px) / 2 + var(--space-3)));
  /* Width: enough to be decorative, not so much it overwhelms the text */
  width: clamp(160px, 28vw, 280px);
  overflow: hidden;
  z-index: 0;
  /* Subtle: photo slightly transparent so cream bg shows through on edges */
}

@media (max-width: 767px) {
  .hero__photo-wrap {
    /* On mobile move to bottom-right corner, more compact */
    top: auto;
    bottom: var(--space-6);
    right: var(--space-3);
    width: clamp(120px, 38vw, 200px);
    height: 48vw;
    max-height: 280px;
  }
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  will-change: transform;
}

.hero__container {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

/* ── Title row ── */
.hero__layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

@media (min-width: 768px) {
  .hero__layout {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: var(--space-8);
  }
}

/* ── Date ── */
.hero__date {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
  order: 2;
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
  font-size: clamp(3.5rem, 12vw, 5.5rem);
}

@media (min-width: 768px) {
  .hero__num { font-size: clamp(2.5rem, 5.5vw, 4.5rem); }
}

.hero__num-dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-divider);
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .hero__num-dot { display: none; }
}

/* ── Vrule ── */
.hero__vrule { display: none; }

@media (min-width: 768px) {
  .hero__vrule {
    display: block;
    width: 0.5px;
    background: var(--color-divider);
    align-self: stretch;
    flex-shrink: 0;
  }
}

/* ── Names ── */
.hero__names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  order: 1;
}

@media (min-width: 768px) {
  .hero__names { justify-content: center; }
}

.hero__name {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  line-height: var(--leading-snug);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(3.25rem, 10vw, 5rem);
}

@media (min-width: 768px) {
  .hero__name { font-size: clamp(3rem, 5vw, 4.5rem); }
}

.hero__amp {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--squirrel-500);
  line-height: var(--leading-loose);
  margin-block: -0.15em;
}

/* ── CTA ── */
.hero__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

.hero__actions {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: start;
}

/* ── Scroll line ── */
.hero__scroll-line {
  display: block;
  width: 0.5px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-divider), transparent);
  animation: scroll-drop 2.4s var(--ease-lux) infinite;
  transform-origin: top center;
}

@keyframes scroll-drop {
  0%   { transform: scaleY(0); opacity: 0; }
  30%  { opacity: 1; }
  80%  { transform: scaleY(1); opacity: 0; }
  100% { transform: scaleY(1); opacity: 0; }
}
</style>
