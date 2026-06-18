<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const heroRef      = ref<HTMLElement | null>(null)
const contentRef   = ref<HTMLElement | null>(null)
const dateRef      = ref<HTMLElement | null>(null)
const namesRef     = ref<HTMLElement | null>(null)
const photoWrapRef = ref<HTMLElement | null>(null)
const photoImgRef  = ref<HTMLImageElement | null>(null)
const ctaRef       = ref<HTMLElement | null>(null)

let ctx: gsap.core.Context | null = null

onMounted(() => {
  const { $gsap } = useNuxtApp() as any
  if (!$gsap) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = $gsap.context(() => {
    const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })

    if (photoWrapRef.value && photoImgRef.value) {
      tl.fromTo(
        photoWrapRef.value,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out' },
        0.0,
      )
        .from(photoImgRef.value, { scale: 1.12, duration: 2.2, ease: 'power2.out' }, 0.0)
    }

    tl.from(dateRef.value,  { opacity: 0, x: -40, duration: 0.9 }, 0.75)
      .from(namesRef.value, { opacity: 0, y: 30,  duration: 1.0 }, 1.0)
      .from(ctaRef.value?.children ?? [], { opacity: 0, y: 18, duration: 0.7, stagger: 0.12 }, 1.35)

    if (reduce) return

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

    if (contentRef.value && window.innerWidth > 768) {
      const bgTarget = getComputedStyle(document.body).backgroundColor
      $gsap.to(contentRef.value, {
        backgroundColor: bgTarget,
        xPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }
  }, heroRef.value!)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="heroRef" class="hero">

    <div ref="contentRef" class="hero__content">
      <div ref="dateRef" class="hero__date">
        <span class="hero__num">{{ config.wedding.dateDay }}</span>
        <span class="hero__num">{{ config.wedding.dateMonth }}</span>
        <span class="hero__num">{{ config.wedding.dateYear }}</span>
      </div>

      <div class="hero__foliage">
        <Botanical
            variant="vine" animate :delay="0.8" :density="1.5" :scrub="1.2"
            class="hero__branch"
        />
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


    </div>

    <div ref="namesRef" class="hero__names-overlay">
      <span class="hero__name--white">{{ t('names.groom') }}</span>
      <span class="hero__amp--white">&amp;</span>
      <span class="hero__name--white">{{ t('names.bride') }}</span>
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
  padding: var(--space-8) var(--space-6);
  gap: var(--space-8);
  background-color: var(--color-surface);
  position: relative;
  z-index: 1;
  will-change: transform;
}

@media (min-width: 769px) {
  .hero__content {
    border-right: 1px solid var(--color-divider);
  }
}

.hero__date {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.hero__num {
  font-family: var(--font-serif);
  font-size: clamp(4rem, 10vw, 9rem);
  line-height: 0.82;
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
}

.hero__cta {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  z-index: 1;
}

.hero__description {
  max-width: 380px;
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.hero__photo-wrap {
  position: relative;
  width: 50%;
  height: 100svh;
  overflow: hidden;
}

.hero__photo {
  width: 100%;
  height: 115%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  filter: saturate(0.28) sepia(0.10) brightness(0.97);
}

.hero__overlay-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    155deg,
    rgba(14, 10, 7, 0.04) 0%,
    rgba(14, 10, 7, 0.4) 100%
  );
  z-index: 1;
}

.hero__foliage {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.hero__branch {
  position: absolute;
  left: -150px;
  color: var(--squirrel-300);
  width: clamp(240px, 38vw, 540px);
  height: auto;
}

.hero__names-overlay {
  position: absolute;
  top: var(--space-8);
  left: 50%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  pointer-events: none;
}

.hero__name--white {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 4vw, 5rem);
  font-style: italic;
  color: #ffffff;
  line-height: 0.9;
  text-shadow: 0 2px 24px rgba(14, 10, 7, 0.42);
}

.hero__amp--white {
  font-family: var(--font-script);
  font-size: clamp(1.6rem, 2.4vw, 2.6rem);
  color: rgba(255, 255, 255, 0.82);
  margin-block: var(--space-1);
  text-shadow: 0 1px 12px rgba(14, 10, 7, 0.30);
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    background-color: var(--squirrel-900);
  }

  .hero__photo-wrap {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .hero__photo {
    height: 100%;
    object-position: center center;
  }

  .hero__overlay-dark {
    background: linear-gradient(
      180deg,
      rgba(14, 10, 7, 0.16) 0%,
      rgba(14, 10, 7, 0.02) 24%,
      rgba(14, 10, 7, 0.50) 60%,
      rgba(14, 10, 7, 0.90) 100%
    );
  }

  .hero__content {
    position: relative;
    z-index: 2;
    width: 100%;
    flex: 1;
    min-height: 100svh;
    background: transparent;
    padding: var(--space-6) var(--space-4) max(var(--space-6), env(safe-area-inset-bottom, var(--space-6)));
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    gap: var(--space-3);
  }

  .hero__date {
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    gap: var(--space-2);
    z-index: 3;
  }

  .hero__num {
    color: rgba(255, 255, 255, 0.93);
    font-size: clamp(2.2rem, 10vw, 3.2rem);
    line-height: 1;
  }

  .hero__description {
    color: rgba(255, 255, 255, 0.70);
    max-width: 100%;
    font-size: var(--text-base);
  }

  .hero__actions {
    justify-content: center;
  }

  :deep(.btn--filled) {
    background: rgba(255, 255, 255, 0.95);
    border-color: transparent;
    color: var(--squirrel-900);
  }
  :deep(.btn--outline) {
    color: rgba(255, 255, 255, 0.88);
    border-color: rgba(255, 255, 255, 0.45);
    background: transparent;
  }

  .hero__foliage {
    display: none;
  }

  .hero__names-overlay {
    left: 0;
    top: var(--space-6);
  }

  .hero__name--white {
    font-size: clamp(3.4rem, 17vw, 6rem);
  }

  .hero__amp--white {
    font-size: clamp(1.8rem, 7vw, 2.8rem);
  }
}
</style>
