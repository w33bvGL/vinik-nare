<script setup lang="ts">
const { t } = useI18n()
const { items } = useProgram()

const sectionRef = ref<HTMLElement | null>(null)
const lineRef    = ref<HTMLElement | null>(null)
const dotRefs    = ref<HTMLElement[]>([])
const cardRefs   = ref<HTMLElement[]>([])
const photoRefs  = ref<HTMLElement[]>([])

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap) return

  $gsap.from(sectionRef.value?.querySelector('.program__label'), {
    opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true },
  })

  // Time strip — line draws on scroll
  $gsap.from(lineRef.value, {
    scaleX: 0,
    transformOrigin: 'left center',
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.value?.querySelector('.program__strip'),
      start: 'top 75%',
      end: 'bottom 60%',
      scrub: 1,
    },
  })

  if (dotRefs.value.length) {
    $gsap.from(dotRefs.value, {
      opacity: 0, scale: 0, transformOrigin: 'center',
      duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: sectionRef.value?.querySelector('.program__strip'),
        start: 'top 75%', once: true,
      },
    })
  }

  // Card reveal — alternating sides
  cardRefs.value.forEach((card, i) => {
    $gsap.from(card, {
      opacity: 0, x: i % 2 !== 0 ? 40 : -40, y: 30,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 82%', once: true },
    })
  })

  // Photo parallax
  photoRefs.value.forEach((photo) => {
    $gsap.fromTo(photo,
      { y: -16 },
      {
        y: 16, ease: 'none',
        scrollTrigger: {
          trigger: photo.closest('.program__card'),
          start: 'top bottom', end: 'bottom top', scrub: true,
        },
      },
    )
  })

  // Active dot highlight
  cardRefs.value.forEach((card, i) => {
    $ScrollTrigger.create({
      trigger: card,
      start: 'top 55%', end: 'bottom 55%',
      onEnter:     () => activateDot(i),
      onEnterBack: () => activateDot(i),
    })
  })
})

function activateDot(index: number) {
  dotRefs.value.forEach((dot, i) =>
    dot.classList.toggle('program__strip-dot--active', i === index),
  )
}

function setDot(el: HTMLElement | null, i: number)   { if (el) dotRefs.value[i]   = el }
function setCard(el: HTMLElement | null, i: number)  { if (el) cardRefs.value[i]  = el }
function setPhoto(el: HTMLElement | null, i: number) { if (el) photoRefs.value[i] = el }
</script>

<template>
  <section ref="sectionRef" class="section program" aria-labelledby="program-heading">
    <div class="container">

      <p id="program-heading" class="program__label">
        {{ t('program.label') }}
      </p>

      <!-- Time strip -->
      <div class="program__strip" aria-hidden="true">
        <div ref="lineRef" class="program__strip-line" />
        <div
          v-for="(item, i) in items"
          :key="item.time"
          class="program__strip-node"
        >
          <div
            :ref="(el) => setDot(el as HTMLElement, i)"
            class="program__strip-dot"
            :class="{ 'program__strip-dot--active': i === 0 }"
          />
          <span class="program__strip-time">{{ item.time }}</span>
        </div>
      </div>

      <!-- Cards -->
      <ol class="program__list" role="list">
        <li
          v-for="(item, i) in items"
          :key="item.time"
          :ref="(el) => setCard(el as HTMLElement, i)"
          class="program__card"
          :class="{ 'program__card--even': i % 2 !== 0 }"
        >
          <div class="program__photo-wrap">
            <img
              v-if="item.photo"
              :ref="(el) => setPhoto(el as HTMLElement, i)"
              :src="item.photo"
              :alt="item.title"
              class="program__photo photo"
              loading="lazy"
              decoding="async"
            />
            <div v-else :ref="(el) => setPhoto(el as HTMLElement, i)" class="program__photo-ph" />
            <time class="program__time-badge" :datetime="item.time">{{ item.time }}</time>
          </div>

          <div class="program__content">
            <p class="program__title">{{ item.title }}</p>
            <p class="program__desc">{{ item.desc }}</p>
            <p class="program__venue">{{ item.venue }}</p>
            <a
              :href="item.mapsUrl || undefined"
              target="_blank"
              rel="noopener"
              class="program__map"
              :class="{ 'program__map--pending': !item.mapsUrl }"
            >
              {{ t('program.mapLink') }} ↗
            </a>
          </div>
        </li>
      </ol>

    </div>
  </section>
</template>

<style scoped>
.program__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-8);
}

/* ── Time strip ── */
.program__strip {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-12);
  padding-inline: var(--space-2);
}

.program__strip-line {
  position: absolute;
  top: 8px;
  left: calc(var(--space-2) + 8px);
  right: calc(var(--space-2) + 8px);
  height: 0.5px;
  background: var(--color-divider);
  transform-origin: left center;
}

.program__strip-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  position: relative;
  z-index: 1;
}

.program__strip-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 1px solid var(--color-divider);
  transition:
    background var(--dur-default) var(--ease-gentle),
    border-color var(--dur-default) var(--ease-gentle);
}

.program__strip-dot--active {
  background: var(--squirrel-900);
  border-color: var(--squirrel-900);
}

.program__strip-time {
  font-family: var(--font-serif);
  font-size: var(--text-sm);
  font-weight: 300;
  font-variant-numeric: tabular-nums lining-nums;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
}

/* ── Card list ── */
.program__list {
  list-style: none;
  display: grid;
  gap: var(--space-12);
}

@media (min-width: 640px) {
  .program__list {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-8);
  }

  .program__card--even {
    margin-top: var(--space-8);
  }
}

.program__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ── Photo ── */
.program__photo-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  background: var(--color-surface);
}

.program__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.program__photo-ph {
  width: 100%;
  height: 100%;
  background: var(--color-surface);
}

.program__time-badge {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 300;
  color: rgba(251, 251, 248, 0.25);
  line-height: 1;
  font-variant-numeric: tabular-nums lining-nums;
  pointer-events: none;
  user-select: none;
}

/* ── Content ── */
.program__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.program__title {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-xl), 3vw, var(--text-2xl));
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
  line-height: var(--leading-snug);
}

.program__desc {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
}

.program__venue {
  font-family: var(--font-sc);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-top: var(--space-1);
}

.program__map {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  text-decoration: none;
  margin-top: var(--space-1);
  transition: opacity var(--dur-default) var(--ease-gentle);
}
.program__map:hover { opacity: 0.7; }
.program__map--pending { opacity: 0.35; pointer-events: none; }
</style>
