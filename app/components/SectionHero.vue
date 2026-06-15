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

    <div class="hero__content">

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
        <div class="hero_description">
          <p>ոդպոյդօպոյ ոդյոպօդյոպօ օպոյդպօոյդօպոյոօդօ ոօդյոօդյ</p>
        </div>
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
/* ── Base Hero ── */
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  width: 100%;
  background-color: var(--color-bg); /* Всегда белый/светлый фон */
  overflow: hidden;
}

/* ── Photo (Right 50%) ── */
.hero__photo-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 50%; /* Строго 50% ширины */
  z-index: 0;
  overflow: hidden;
}

/* На мобилке фото занимает верхнюю часть */
@media (max-width: 767px) {
  .hero__photo-wrap {
    width: 100%;
    height: 45vh;
    bottom: auto;
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

/* ── Content Container (Left 50%) ── */
.hero__content {
  position: relative;
  z-index: 1;
  width: 50%; /* Текст ограничен левой половиной */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-8) var(--space-6);
}

@media (max-width: 767px) {
  .hero__content {
    width: 100%;
    margin-top: 45vh; /* Отступ вниз, чтобы не перекрывать фото */
    padding: var(--space-6) var(--space-3);
  }
}

/* ── Layout (Date + Names) ── */
.hero__layout {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-6);
  width: 100%;
  margin-bottom: var(--space-6);
}

/* ── Date (Huge Numbers) ── */
.hero__date {
  display: flex;
  flex-direction: column; /* Вертикально, чтобы огромные цифры влезли */
  align-items: flex-start;
  gap: 0;
}

@media (max-width: 767px) {
  .hero__date {
    flex-direction: row; /* Горизонтально на мобилке */
    align-items: center;
    gap: var(--space-2);
  }
}

.hero__num {
  font-family: var(--font-serif);
  font-weight: 300;
  font-variant-numeric: lining-nums;
  line-height: 0.85; /* Сужаем межстрочный интервал для огромного шрифта */
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(4rem, 12vw, 14rem); /* Огромные цифры, занимающие много места */
}

@media (max-width: 767px) {
  .hero__num { font-size: clamp(3.5rem, 12vw, 5.5rem); }
}

/* Скрываем точки на десктопе, так как цифры идут столбиком */
.hero__num-dot { display: none; }

@media (max-width: 767px) {
  .hero__num-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-divider);
  }
}

/* Скрываем линию, но оставляем элемент для GSAP ref */
.hero__vrule { display: none; }

/* ── Names ── */
.hero__names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero__name {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  line-height: var(--leading-snug);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(3.25rem, 6vw, 5rem);
}

.hero__amp {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2rem, 3vw, 2.5rem);
  color: var(--squirrel-500);
  line-height: var(--leading-loose);
  margin-block: -0.2em;
}

/* ── CTA / Description ── */
.hero__cta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-4);
  width: 100%;
  max-width: 480px; /* Чтобы текст легко читался */
}

.hero_description {
  color: var(--color-text);
  font-size: var(--text-lg);
  line-height: var(--leading-relaxed);
}

.hero__actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* ── Scroll Line ── */
.hero__scroll-line {
  display: block;
  width: 0.5px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-divider), transparent);
  animation: scroll-drop 2.4s var(--ease-lux) infinite;
  transform-origin: top center;
  margin-top: var(--space-4);
}

@keyframes scroll-drop {
  0%   { transform: scaleY(0); opacity: 0; }
  30%  { opacity: 1; }
  80%  { transform: scaleY(1); opacity: 0; }
  100% { transform: scaleY(1); opacity: 0; }
}
</style>