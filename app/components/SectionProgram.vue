<script setup lang="ts">
const { t } = useI18n()
const { items } = useProgram()

const sectionRef = ref<HTMLElement | null>(null)
const cardRefs   = ref<HTMLElement[]>([])
const photoRefs  = ref<HTMLElement[]>([])

let mm: gsap.MatchMedia | null = null

onMounted(() => {
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !sectionRef.value) return

  // matchMedia keeps every tween + ScrollTrigger scoped, so reduced-motion users
  // get the static layout and mm.revert() cleans everything up on unmount.
  mm = $gsap.matchMedia()

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const section = sectionRef.value!

    $gsap.from(section.querySelector('.section-label'), {
      opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: section, start: 'top 80%', once: true },
    })

    cardRefs.value.forEach((card, i) => {
      const photo = photoRefs.value[i]

      // The photo rests slightly zoomed so the scrub parallax never exposes the
      // frame edges; the intro settles it in from a deeper zoom + vertical wipe.
      if (photo) $gsap.set(photo, { scale: 1.18, transformOrigin: 'center center' })

      const tl = $gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: card, start: 'top 78%', once: true },
      })

      tl.from(card, { opacity: 0, y: 48, duration: 0.9 }, 0)

      if (photo) {
        tl.from(photo, {
          scale: 1.34,
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.2, ease: 'power2.out',
        }, 0)
      }

      tl.from(card.querySelector('.program__time'), {
        opacity: 0, y: -20, duration: 0.6,
      }, 0.2)

      tl.from(card.querySelector('.program__rule'), {
        scaleX: 0, duration: 0.4, ease: 'power2.inOut', transformOrigin: 'left',
      }, 0.35)

      tl.from(
        card.querySelectorAll('.program__title, .program__desc, .program__venue, .program__map-hint'),
        { opacity: 0, y: 10, stagger: 0.08, duration: 0.5, ease: 'power2.out' },
        0.4,
      )
    })

    // Gap-safe parallax: scale 1.18 leaves 9% of slack each side, so a ±6% drift
    // stays covered. scrub ties it straight to Lenis' smooth-scroll position.
    photoRefs.value.forEach((photo, i) => {
      $gsap.fromTo(photo,
        { yPercent: -6 },
        {
          yPercent: 6, ease: 'none',
          scrollTrigger: {
            trigger: cardRefs.value[i],
            start: 'top bottom', end: 'bottom top',
            scrub: true, invalidateOnRefresh: true,
          },
        },
      )
    })
  })
})

onUnmounted(() => mm?.revert())

function setCard(el: HTMLElement | null, i: number)  { if (el) cardRefs.value[i]  = el }
function setPhoto(el: HTMLElement | null, i: number) { if (el) photoRefs.value[i] = el }
</script>

<template>
  <section id="program" ref="sectionRef" class="section program" aria-labelledby="program-heading">
    <div class="container">
      <UiSectionLabel id="program-heading">
        {{ t('program.label') }}
      </UiSectionLabel>
    </div>

    <div class="program__list">
      <a
        v-for="(item, i) in items"
        :key="item.time"
        :ref="(el) => setCard(el as HTMLElement, i)"
        :href="item.mapsUrl || undefined"
        target="_blank"
        rel="noopener"
        class="program__card"
        :class="{ 'program__card--flip': i % 2 !== 0 }"
        :aria-label="`${item.title} — ${item.venue}`"
      >
        <div class="program__photo-wrap">
          <div :ref="(el) => setPhoto(el as HTMLElement, i)" class="program__photo-inner">
            <img
              v-if="item.photo"
              :src="item.photo"
              :alt="item.title"
              class="program__photo photo"
              loading="lazy"
              decoding="async"
            />
            <div v-else class="program__photo-ph" />
          </div>
        </div>

        <div class="program__content">
          <time class="program__time" :datetime="item.time">{{ item.time }}</time>
          <span class="program__rule" aria-hidden="true" />
          <p class="program__title">{{ item.title }}</p>
          <p class="program__desc">{{ item.desc }}</p>
          <p class="program__venue">{{ item.venue }}</p>
          <span v-if="item.mapsUrl" class="program__map-hint">
            {{ t('program.mapLink') }} ↗
          </span>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped>
/* ── Cards list ── */
.program__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

/* ── Card ── */
.program__card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  transition: background var(--dur-default) var(--ease-gentle);
}
.program__card:hover { background: var(--color-surface); }

@media (min-width: 560px) {
  .program__card {
    flex-direction: row;
    min-height: 400px;
  }

  .program__card--flip {
    flex-direction: row-reverse;
  }
}

/* ── Photo ── */
.program__photo-wrap {
  flex: 0 0 58%;
  /* min-width:0 stops a wide <img> from inflating its flex basis past 58% —
     that mismatch is what made cards with different photos look uneven. */
  min-width: 0;
  overflow: hidden;
  background: var(--color-surface);
  min-height: 280px;
}

@media (min-width: 560px) {
  .program__photo-wrap { min-height: unset; }
}

/* Dedicated layer for the GSAP zoom/parallax, kept separate from the <img> so
   the CSS hover zoom and the scroll transform never fight over `transform`. */
.program__photo-inner {
  width: 100%;
  height: 100%;
}

.program__photo,
.program__photo-ph {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--dur-lux) var(--ease-lux);
}
.program__card:hover .program__photo { transform: scale(1.03); }

/* ── Content ── */
.program__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-6) var(--space-4);
  gap: var(--space-1);
}

@media (min-width: 560px) {
  .program__content { padding: var(--space-6); }
}

.program__card--flip .program__content {
  align-items: flex-start;
}

.program__time {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-2xl), 4.2vw, var(--text-3xl));
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
  margin-top: var(--space-1);
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

.program__map-hint {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  margin-top: var(--space-2);
}
</style>
