<script setup lang="ts">
const { t } = useI18n()
const { items } = useProgram()

const rootRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !rootRef.value) return

  $gsap.from(rootRef.value.querySelector('.program__label'), {
    opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: rootRef.value, start: 'top 82%', once: true },
  })

  rootRef.value.querySelectorAll('.program__card').forEach((card: Element) => {
    const tl = $gsap.timeline({
      scrollTrigger: { trigger: card, start: 'top 85%', once: true },
    })

    tl.from(card, { opacity: 0, y: 56, duration: 0.85, ease: 'power3.out' }, 0)

    const photo = card.querySelector('.program__photo')
    if (photo) {
      tl.from(photo, { scale: 1.12, duration: 1.3, ease: 'power2.out' }, 0)
    }

    tl.from(card.querySelector('.program__time'), {
      opacity: 0, x: -24, duration: 0.6, ease: 'power3.out',
    }, 0.2)

    tl.from(card.querySelector('.program__rule'), {
      scaleX: 0, duration: 0.5, ease: 'power2.inOut', transformOrigin: 'left',
    }, 0.35)

    tl.from(
      card.querySelectorAll('.program__title, .program__desc, .program__venue, .program__map'),
      { opacity: 0, y: 14, duration: 0.55, stagger: 0.09, ease: 'power2.out' },
      0.42,
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

      <div class="program__grid">
        <article
          v-for="item in items"
          :key="item.time"
          class="program__card"
        >
          <div class="program__photo-wrap">
            <img
              v-if="item.photo"
              :src="item.photo"
              :alt="item.title"
              class="program__photo"
            />
            <div v-else class="program__photo-placeholder" />
          </div>

          <div class="program__content">
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
              <span class="program__map-arrow" aria-hidden="true">↗</span>
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
  margin-bottom: var(--space-6);
}

.program__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 560px) {
  .program__grid { grid-template-columns: 1fr 1fr; }
}

/* Card */
.program__card {
  border: 0.5px solid var(--color-divider);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Photo */
.program__photo-wrap {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: var(--color-hover-fill);
}

.program__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.program__photo-placeholder {
  width: 100%;
  height: 100%;
  background: var(--color-hover-fill);
}

/* Content */
.program__content {
  padding: var(--space-5) var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.program__time {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 6vw, var(--text-4xl));
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
  margin-top: auto;
  padding-top: var(--space-2);
  transition: opacity var(--dur-default) var(--ease-gentle);
}
.program__map:hover { opacity: 0.7; }

.program__map-arrow {
  font-style: normal;
  font-size: var(--text-sm);
}
</style>
