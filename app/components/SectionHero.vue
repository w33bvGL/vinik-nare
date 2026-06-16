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

  if (photoWrapRef.value && photoImgRef.value) {
    tl.fromTo(
        photoWrapRef.value,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.6, ease: 'expo.inOut' },
        0.0,
    )
        .from(photoImgRef.value, { scale: 1.1, duration: 2.6, ease: 'power2.out' }, 0.0)
  }

  tl.from(dateRef.value,  { opacity: 0, x: -40, duration: 0.9 }, 0.5)
      .from(namesRef.value, { opacity: 0, y: 30, duration: 1.1 }, 0.8)
      .from(ctaRef.value?.children ?? [], { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, 1.2)

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
        <p class="hero__description">{{ t('hero.description') }}</p>
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
      <div class="hero__overlay-dark"></div>

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

.hero__content {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-8);
  gap: var(--space-8);
}

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

.hero__overlay-dark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1;
}

.hero__names-overlay {
  position: absolute;
  top: var(--space-8);
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  pointer-events: none;
}

.hero__name--white {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-style: italic;
  color: #ffffff;
  line-height: 0.9;
}

.hero__amp--white {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin: var(--space-2) 0;
}

.hero__date {
  display: flex;
  flex-direction: column;
}

.hero__num {
  font-family: var(--font-serif);
  font-size: clamp(4rem, 12vw, 8rem);
  line-height: 0.8;
  color: var(--color-text-heading);
}

.hero__description {
  max-width: 400px;
  font-size: var(--text-lg);
  margin-bottom: var(--space-4);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

@media (max-width: 768px) {
  .hero { flex-direction: column; }
  .hero__content {
    width: 100%;
    padding: var(--space-4);
    align-items: center;
    text-align: center;
  }
  .hero__photo-wrap { width: 100%; height: 50vh; }
  .hero__actions { justify-content: center; }
  .hero__names-overlay { top: var(--space-4); }
}
</style>