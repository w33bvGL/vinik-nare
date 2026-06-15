<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const sectionRef  = ref<HTMLElement | null>(null)
const mapLineRef  = ref<HTMLElement | null>(null)
const mapDotsRef  = ref<HTMLElement[]>([])
const cardRefs    = ref<HTMLElement[]>([])
const photoRefs   = ref<HTMLElement[]>([])

const stages = computed(() =>
  config.wedding.stages.map((s: { key: string; year: string; photo: string }) => ({
    ...s,
    title: t(`stages.${s.key}.title`),
    description: t(`stages.${s.key}.description`),
  })),
)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap) return

  // Reveal section label
  $gsap.from(sectionRef.value?.querySelector('.stages__label'), {
    opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true },
  })

  // Stage map — line draws on scroll
  $gsap.from(mapLineRef.value, {
    scaleX: 0,
    transformOrigin: 'left center',
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value?.querySelector('.stages__map'),
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: 1,
    },
  })

  // Stage map dots pop in with stagger
  if (mapDotsRef.value.length) {
    $gsap.from(mapDotsRef.value, {
      opacity: 0,
      scale: 0,
      transformOrigin: 'center',
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef.value?.querySelector('.stages__map'),
        start: 'top 75%',
        once: true,
      },
    })
  }

  // Stage cards reveal with stagger
  if (cardRefs.value.length) {
    cardRefs.value.forEach((card, i) => {
      const isEven = i % 2 !== 0
      $gsap.from(card, {
        opacity: 0,
        x: isEven ? 40 : -40,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          once: true,
        },
      })
    })
  }

  // Photo parallax
  if (photoRefs.value.length) {
    photoRefs.value.forEach((photo) => {
      $gsap.fromTo(
        photo,
        { y: -16 },
        {
          y: 16,
          ease: 'none',
          scrollTrigger: {
            trigger: photo.closest('.stages__card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })
  }

  // Active dot highlight on scroll
  cardRefs.value.forEach((card, i) => {
    $ScrollTrigger.create({
      trigger: card,
      start: 'top 55%',
      end: 'bottom 55%',
      onEnter: () => activateMapDot(i),
      onEnterBack: () => activateMapDot(i),
    })
  })
})

function activateMapDot(index: number) {
  mapDotsRef.value.forEach((dot, i) => {
    dot.classList.toggle('stages__map-dot--active', i === index)
  })
}

function setMapDot(el: HTMLElement | null, i: number) {
  if (el) mapDotsRef.value[i] = el
}

function setCard(el: HTMLElement | null, i: number) {
  if (el) cardRefs.value[i] = el
}

function setPhoto(el: HTMLElement | null, i: number) {
  if (el) photoRefs.value[i] = el
}
</script>

<template>
  <section ref="sectionRef" class="section stages" aria-labelledby="stages-heading">
    <div class="container">

      <h2 id="stages-heading" class="stages__label">
        {{ t('stages.label') }}
      </h2>

      <!-- Stage map (overview) -->
      <div class="stages__map" aria-hidden="true">
        <div ref="mapLineRef" class="stages__map-line" />
        <div
          v-for="(stage, i) in stages"
          :key="stage.key"
          class="stages__map-node"
        >
          <div
            :ref="(el) => setMapDot(el as HTMLElement, i)"
            class="stages__map-dot"
            :class="{ 'stages__map-dot--active': i === 0 }"
          />
          <span class="stages__map-year">{{ stage.year }}</span>
        </div>
      </div>

      <!-- Stage cards -->
      <ol class="stages__list" role="list">
        <li
          v-for="(stage, i) in stages"
          :key="stage.key"
          :ref="(el) => setCard(el as HTMLElement, i)"
          class="stages__card"
          :class="{ 'stages__card--even': i % 2 !== 0 }"
        >

          <!-- Photo -->
          <div class="stages__photo-wrap">
            <img
              :ref="(el) => setPhoto(el as HTMLElement, i)"
              :src="stage.photo"
              :alt="stage.title"
              class="stages__photo photo"
              loading="lazy"
              decoding="async"
            />
            <span class="stages__num">{{ String(i + 1).padStart(2, '0') }}</span>
          </div>

          <!-- Content -->
          <div class="stages__content">
            <span class="stages__year-badge">{{ stage.year }}</span>
            <h3 class="stages__title">{{ stage.title }}</h3>
            <p class="stages__desc">{{ stage.description }}</p>
          </div>

        </li>
      </ol>

    </div>
  </section>
</template>

<style scoped>
/* ── Section label ── */
.stages__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-8);
}

/* ── Map (overview strip) ── */
.stages__map {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  padding-inline: var(--space-2);
}

.stages__map-line {
  position: absolute;
  top: 8px; /* align with dot center */
  left: calc(var(--space-2) + 8px);
  right: calc(var(--space-2) + 8px);
  height: 0.5px;
  background: var(--color-divider);
  transform-origin: left center;
}

.stages__map-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  position: relative;
  z-index: 1;
}

.stages__map-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1px solid var(--color-divider);
  transition:
    background var(--dur-default) var(--ease-gentle),
    border-color var(--dur-default) var(--ease-gentle);
}

.stages__map-dot--active {
  background: var(--squirrel-900);
  border-color: var(--squirrel-900);
}

.stages__map-year {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
}

/* ── Card list ── */
.stages__list {
  list-style: none;
  display: grid;
  gap: var(--space-12);
}

@media (min-width: 768px) {
  .stages__list {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8) var(--space-8);
  }
}

.stages__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Even cards shift down on desktop for stagger effect */
@media (min-width: 768px) {
  .stages__card--even {
    margin-top: var(--space-8);
  }
}

/* ── Photo ── */
.stages__photo-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--color-surface);
}

.stages__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* photo class from main.css applies the desaturate filter */
}

.stages__num {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 300;
  color: rgba(251, 251, 248, 0.25);
  line-height: 1;
  font-variant-numeric: lining-nums;
  pointer-events: none;
  user-select: none;
}

/* ── Content ── */
.stages__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.stages__year-badge {
  font-family: var(--font-sc);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.stages__title {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-xl), 3vw, var(--text-2xl));
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
  line-height: var(--leading-snug);
}

.stages__desc {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
}
</style>
