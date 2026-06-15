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

  rootRef.value.querySelectorAll<HTMLElement>('.program__item').forEach((item) => {
    const isA = item.classList.contains('program__item--a')

    const tl = $gsap.timeline({
      scrollTrigger: { trigger: item, start: 'top 80%', once: true },
    })

    tl.from(item.querySelector('.program__visual'), {
      opacity: 0, x: isA ? -70 : 70, duration: 0.95, ease: 'power3.out',
    }, 0)

    const photo = item.querySelector('.program__photo')
    if (photo) {
      tl.from(photo, { scale: 1.1, duration: 1.3, ease: 'power2.out' }, 0)
    }

    tl.from(item.querySelector('.program__text'), {
      opacity: 0, x: isA ? 70 : -70, duration: 0.95, ease: 'power3.out',
    }, 0)

    tl.from(item.querySelector('.program__time'), {
      opacity: 0, y: -18, duration: 0.55, ease: 'power3.out',
    }, 0.28)

    tl.from(item.querySelector('.program__rule'), {
      scaleX: 0, duration: 0.45, ease: 'power2.inOut',
      transformOrigin: isA ? 'left' : 'right',
    }, 0.42)

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

      <div class="program__list">
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

          <div class="program__text">
            <time class="program__time" :datetime="item.time">{{ item.time }}</time>
            <span class="program__rule" aria-hidden="true" />
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

/* ── List ── */
.program__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* ── Item: mobile ── */
.program__item {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 0.5px solid var(--color-divider);
  overflow: hidden;
}

/* ── Item: desktop alternating ── */
@media (min-width: 640px) {
  .program__item {
    flex-direction: row;
    min-height: 420px;
  }

  /* --a: photo left, text right */
  .program__item--a .program__visual { order: 1; }
  .program__item--a .program__text   { order: 2; }

  /* --b: text left, photo right */
  .program__item--b .program__text   { order: 1; }
  .program__item--b .program__visual { order: 2; }

  .program__item--b .program__text {
    text-align: right;
    align-items: flex-end;
  }

  .program__item--b .program__rule {
    align-self: flex-end;
  }
}

/* ── Photo ── */
.program__visual {
  flex: 0 0 55%;
}

@media (min-width: 640px) {
  .program__visual { flex: 0 0 55%; }
}

.program__photo-wrap {
  height: 260px;
  overflow: hidden;
  background: var(--color-hover-fill);
}

@media (min-width: 640px) {
  .program__photo-wrap {
    height: 100%;
  }
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

/* ── Text ── */
.program__text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-6) var(--space-5);
  justify-content: center;
}

.program__time {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 4vw, var(--text-4xl));
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--color-text-heading);
  line-height: 1;
}

.program__rule {
  display: block;
  width: 28px;
  height: 0.5px;
  background: var(--color-divider);
  margin-block: var(--space-2);
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
  margin-top: var(--space-2);
}

.program__map {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  text-decoration: none;
  margin-top: var(--space-3);
  transition: opacity var(--dur-default) var(--ease-gentle);
}
.program__map:hover { opacity: 0.7; }
.program__map--pending {
  opacity: 0.35;
  pointer-events: none;
}
</style>
