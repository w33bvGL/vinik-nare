<script setup lang="ts">
const { t } = useI18n()
const { items } = useProgram()

const rootRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !rootRef.value) return

  $gsap.from(rootRef.value.querySelector('.program__label'), {
    opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: rootRef.value, start: 'top 82%', once: true },
  })

  // Line draws top→bottom as you scroll through the section
  if (lineRef.value) {
    $gsap.fromTo(lineRef.value,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: rootRef.value,
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: 0.8,
        },
      },
    )
  }

  // Per-card timeline
  rootRef.value.querySelectorAll<HTMLElement>('.program__item').forEach((item) => {
    const isA = item.classList.contains('program__item--a')

    const tl = $gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 80%', once: true },
    })

    // Photo from its side
    tl.from(item.querySelector('.program__visual'), {
      opacity: 0, x: isA ? -70 : 70, duration: 0.95, ease: 'power3.out',
    }, 0)

    const photo = item.querySelector('.program__photo')
    if (photo) {
      tl.from(photo, { scale: 1.12, duration: 1.3, ease: 'power2.out' }, 0)
    }

    // Content from the opposite side
    tl.from(item.querySelector('.program__text'), {
      opacity: 0, x: isA ? 70 : -70, duration: 0.95, ease: 'power3.out',
    }, 0)

    // Dot pops after card appears
    tl.from(item.querySelector('.program__dot'), {
      scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2.5)',
    }, 0.3)

    // Time slides down
    tl.from(item.querySelector('.program__time'), {
      opacity: 0, y: -18, duration: 0.55, ease: 'power3.out',
    }, 0.28)

    // Rule expands
    tl.from(item.querySelector('.program__rule'), {
      scaleX: 0, duration: 0.45, ease: 'power2.inOut',
      transformOrigin: isA ? 'left' : 'right',
    }, 0.42)

    // Content lines stagger
    tl.from(
      item.querySelectorAll('.program__title, .program__desc, .program__venue, .program__map'),
      { opacity: 0, y: 12, stagger: 0.09, duration: 0.5, ease: 'power2.out' },
      0.48,
    )
  })
})
</script>

<template>
  <section ref="rootRef" class="section program" aria-labelledby="program-heading">
    <div class="container">

      <p id="program-heading" class="program__label">
        {{ t('program.label') }}
      </p>

      <div class="timeline">
        <div ref="lineRef" class="timeline__line" aria-hidden="true" />

        <article
          v-for="(item, i) in items"
          :key="item.time"
          class="program__item"
          :class="i % 2 === 0 ? 'program__item--a' : 'program__item--b'"
        >
          <div class="program__visual">
            <div class="program__photo-wrap">
              <img
                v-if="item.photo"
                :src="item.photo"
                :alt="item.title"
                class="program__photo"
              />
              <div v-else class="program__photo-ph" />
            </div>
          </div>

          <div class="program__node" aria-hidden="true">
            <span class="program__dot" />
          </div>

          <div class="program__text">
            <time class="program__time" :datetime="item.time">{{ item.time }}</time>
            <span class="program__rule" aria-hidden="true" />
            <p class="program__title">{{ item.title }}</p>
            <p class="program__desc">{{ item.desc }}</p>
            <p class="program__venue">{{ item.venue }}</p>
            <a
              v-if="item.mapsUrl"
              :href="item.mapsUrl"
              target="_blank"
              rel="noopener"
              class="program__map"
            >
              {{ t('program.mapLink') }}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>

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
  margin-bottom: var(--space-10);
}

/* ── Timeline shell ── */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-14);
}

.timeline__line {
  display: none;
}

/* ── Item: mobile (stacked) ── */
.program__item {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.program__node { display: none; }

/* ── Item: desktop (roadmap) ── */
@media (min-width: 640px) {
  .timeline__line {
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 0.5px;
    background: var(--color-divider);
    transform: translateX(-0.25px);
  }

  .program__item {
    display: grid;
    grid-template-columns: 1fr 48px 1fr;
    align-items: center;
    gap: 0 var(--space-6);
  }

  /* --a: photo left | dot | text right */
  .program__item--a .program__visual { grid-column: 1; grid-row: 1; }
  .program__item--a .program__node   { grid-column: 2; grid-row: 1; }
  .program__item--a .program__text   { grid-column: 3; grid-row: 1; }

  /* --b: text left | dot | photo right */
  .program__item--b .program__text   { grid-column: 1; grid-row: 1; text-align: right; align-items: flex-end; }
  .program__item--b .program__node   { grid-column: 2; grid-row: 1; }
  .program__item--b .program__visual { grid-column: 3; grid-row: 1; }

  .program__node {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    height: 100%;
  }
}

/* ── Photo ── */
.program__photo-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 0.5px solid var(--color-divider);
  background: var(--color-hover-fill);
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
  background: var(--color-hover-fill);
}

/* ── Dot ── */
.program__dot {
  display: block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid var(--color-text-heading);
  background: var(--color-bg, #fff);
}

/* ── Text ── */
.program__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.program__item--b .program__text {
  align-items: flex-start; /* mobile: normal */
}

@media (min-width: 640px) {
  .program__item--b .program__text {
    align-items: flex-end;
  }
}

.program__time {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 5vw, var(--text-4xl));
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--color-text-heading);
  line-height: 1;
}

.program__rule {
  display: block;
  width: 28px;
  height: 0.5px;
  background: var(--color-divider);
  margin-block: var(--space-1);
}

.program__title {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: var(--text-base);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text);
}

.program__desc {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
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
  margin-top: var(--space-2);
  transition: opacity var(--dur-default) var(--ease-gentle);
}
.program__map:hover { opacity: 0.7; }
</style>
