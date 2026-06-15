<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const heroRef      = ref<HTMLElement | null>(null)
const dateRef      = ref<HTMLElement | null>(null)
const namesRef     = ref<HTMLElement | null>(null)
const photoWrapRef = ref<HTMLElement | null>(null)
const photoImgRef  = ref<HTMLImageElement | null>(null)
const ctaRef       = ref<HTMLElement | null>(null)

onMounted(() => {
  const { $gsap } = useNuxtApp() as any
  if (!$gsap) return

  const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })

  // Анимация появления фото
  if (photoWrapRef.value && photoImgRef.value) {
    tl.fromTo(
        photoWrapRef.value,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut' },
        0.0,
    )
        .from(photoImgRef.value, { scale: 1.1, duration: 2.6, ease: 'power2.out' }, 0.0)
  }

  // Анимации текста
  tl.from(dateRef.value,  { opacity: 0, x: -40, duration: 0.9 }, 0.5)
      .from(namesRef.value, { opacity: 0, y: 30, duration: 1.1 }, 0.8)
      .from(ctaRef.value?.children ?? [], { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, 1.2)

  // Параллакс фото
  if (photoImgRef.value) {
    $gsap.to(photoImgRef.value, {
      yPercent: -10,
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
  <section ref="heroRef" class="hero">

    <div class="hero__content">
      <div ref="dateRef" class="hero__date">
        <span class="hero__num">{{ config.wedding.dateDay }}</span>
        <span class="hero__num">{{ config.wedding.dateMonth }}</span>
        <span class="hero__num">{{ config.wedding.dateYear }}</span>
      </div>

      <div ref="ctaRef" class="hero__cta">
        <UiDivider variant="short" />
        <p class="hero__description">ոդպոյդօպոյ ոդյոպօդյոպօ օպոյդպօոյդօպոյոօդօ ոօդյոօդյ</p>
        <div class="hero__actions">
          <UiButton as="a" href="#rsvp" variant="filled">{{ t('hero.rsvpCta') }}</UiButton>
          <UiButton as="a" href="#program" variant="outline">{{ t('hero.programCta') }}</UiButton>
        </div>
      </div>
    </div>

    <div ref="photoWrapRef" class="hero__photo-wrap">
      <img
          ref="photoImgRef"
          :src="config.wedding.heroPhoto"
          alt="Wedding Hero"
          class="hero__photo"
      />
      <div ref="namesRef" class="hero__names-overlay">
        <span class="hero__name--white">{{ t('names.groom') }}</span>
        <span class="hero__amp--white">&amp;</span>
        <span class="hero__name--white">{{ t('names.bride') }}</span>
      </div>
    </div>

  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  background-color: var(--color-bg);
  overflow: hidden;
}

/* Левая колонка (Текст) */
.hero__content {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-8);
  gap: var(--space-12);
}

/* Правая колонка (Фото + Имена) */
.hero__photo-wrap {
  position: relative;
  width: 50%;
  height: 100vh;
  overflow: hidden;
}

.hero__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Имена поверх фото */
/* ── Имена поверх фото (Правая сторона) ── */
.hero__names-overlay {
  position: absolute;
  top: var(--space-8); /* Изменено с bottom на top */
  left: var(--space-8);
  z-index: 2;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* На мобильных устройствах можно немного уменьшить отступ сверху */
@media (max-width: 768px) {
  .hero__names-overlay {
    top: var(--space-4);
    left: var(--space-4);
  }
}

.hero__name--white {
  display: block;
  font-family: var(--font-serif);
  font-size: clamp(3rem, 6vw, 6rem);
  font-style: italic;
  color: #ffffff;
  line-height: 0.9;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.hero__amp--white {
  display: block;
  font-family: var(--font-serif);
  font-size: 3rem;
  color: rgba(255,255,255,0.8);
  margin: var(--space-2) 0;
}

/* Дата (Увеличенные цифры) */
.hero__date {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.hero__num {
  font-family: var(--font-serif);
  font-size: clamp(5rem, 15vw, 10rem);
  line-height: 0.8;
  color: var(--color-text-heading);
}

.hero__description {
  max-width: 400px;
  font-size: var(--text-lg);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
}

/* Адаптив для мобильных */
@media (max-width: 768px) {
  .hero { flex-direction: column; }
  .hero__content, .hero__photo-wrap { width: 100%; height: 50vh; }
}
</style>