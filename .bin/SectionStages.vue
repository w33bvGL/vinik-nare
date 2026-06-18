<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const sectionRef   = ref<HTMLElement | null>(null)
const timelineRef  = ref<HTMLElement | null>(null)
const spineFillRef = ref<HTMLElement | null>(null)
const cardRefs     = ref<HTMLElement[]>([])
const photoRefs    = ref<HTMLElement[]>([])
const dotRefs      = ref<HTMLElement[]>([])

const stages = computed(() =>
    config.wedding.stages.map((s: { key: string; year: string; yearBadge?: string; photo: string }) => ({
      ...s,
      title: t(`stages.${s.key}.title`),
      description: t(`stages.${s.key}.description`),
    })),
)

let mm: gsap.MatchMedia | null = null

onMounted(() => {
  const { $gsap, $ScrollTrigger } = useNuxtApp() as any
  if (!$gsap || !sectionRef.value) return

  // matchMedia scopes every tween + ScrollTrigger, gives reduced-motion users a
  // static layout and lets mm.revert() tear it all down on unmount.
  mm = $gsap.matchMedia()

  mm.add(
      {
        motion:  '(prefers-reduced-motion: no-preference)',
        desktop: '(min-width: 768px)',
      },
      (ctx: gsap.Context) => {
        const { motion, desktop } = ctx.conditions as Record<string, boolean>
        const section = sectionRef.value!

        $gsap.from(section.querySelector('.section-label'), {
          opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true },
        })

        // The spine fill grows from the first node to the last as the section
        // scrolls — the visual "thread" that stitches the whole story together.
        if (spineFillRef.value) {
          if (motion) {
            $gsap.fromTo(spineFillRef.value,
                { scaleY: 0 },
                {
                  scaleY: 1, transformOrigin: 'top center', ease: 'none',
                  scrollTrigger: {
                    trigger: timelineRef.value,
                    start: 'top 60%', end: 'bottom 60%', scrub: 1,
                  },
                },
            )
          } else {
            $gsap.set(spineFillRef.value, { scaleY: 1, transformOrigin: 'top center' })
          }
        }

        cardRefs.value.forEach((item, i) => {
          const card  = item.querySelector('.stages__card')
          const photo = photoRefs.value[i]
          const dot   = dotRefs.value[i]
          // Cards drift in from their own side of the spine; mobile slides up only.
          const fromX = desktop ? (i % 2 ? 56 : -56) : 0

          // Resting zoom keeps the scrub parallax from ever exposing the frame edge.
          if (photo && motion) $gsap.set(photo, { scale: 1.15, transformOrigin: 'center center' })

          const tl = $gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: { trigger: item, start: 'top 82%', once: true },
          })

          tl.from(card, { opacity: 0, x: fromX, y: 36, duration: 0.9 }, 0)

          if (photo && motion) {
            tl.from(photo, {
              scale: 1.32,
              clipPath: 'inset(0% 0% 100% 0%)',
              duration: 1.1, ease: 'power2.out',
            }, 0.1)
          }

          if (dot) tl.from(dot, { scale: 0, duration: 0.5, ease: 'back.out(2.2)' }, 0.2)

          tl.from(item.querySelector('.stages__num'),
              { opacity: 0, y: 24, duration: 0.6 }, 0.3)

          tl.from(
              item.querySelectorAll('.stages__year-badge, .stages__title, .stages__desc'),
              { opacity: 0, y: 14, stagger: 0.09, duration: 0.5, ease: 'power2.out' }, 0.32,
          )

          // Gap-safe parallax: scale 1.15 leaves ~7.5% slack each side vs a ±6% drift.
          if (photo && motion) {
            $gsap.fromTo(photo,
                { yPercent: -6 },
                {
                  yPercent: 6, ease: 'none',
                  scrollTrigger: {
                    trigger: item,
                    start: 'top bottom', end: 'bottom top',
                    scrub: true, invalidateOnRefresh: true,
                  },
                },
            )
          }

          // Progressive node activation — lights up as the spine reaches each step.
          if (dot) {
            $ScrollTrigger.create({
              trigger: item,
              start: 'top 60%',
              onEnter:     () => dot.classList.add('stages__dot--active'),
              onLeaveBack: () => dot.classList.remove('stages__dot--active'),
            })
          }
        })
      },
  )
})

onUnmounted(() => mm?.revert())

function setCard(el: HTMLElement | null, i: number)  { if (el) cardRefs.value[i]  = el }
function setPhoto(el: HTMLElement | null, i: number) { if (el) photoRefs.value[i] = el }
function setDot(el: HTMLElement | null, i: number)   { if (el) dotRefs.value[i]   = el }
</script>

<template>
  <section ref="sectionRef" class="section stages" aria-labelledby="stages-heading">
    <div class="container">

      <UiSectionLabel id="stages-heading">
        {{ t('stages.label') }}
      </UiSectionLabel>

      <ol ref="timelineRef" class="stages__timeline" role="list">
        <li
            v-for="(stage, i) in stages"
            :key="stage.key"
            :ref="(el) => setCard(el as HTMLElement, i)"
            class="stages__item"
            :class="{ 'stages__item--right': i % 2 !== 0 }"
        >
          <div class="stages__node" aria-hidden="true">
            <span
                :ref="(el) => setDot(el as HTMLElement, i)"
                class="stages__dot"
                :class="{ 'stages__dot--active': i === 0 }"
            />
            <span class="stages__node-year">{{ stage.year }}</span>
          </div>

          <article class="stages__card">
            <div class="stages__photo-wrap">
              <div :ref="(el) => setPhoto(el as HTMLElement, i)" class="stages__photo-inner">
                <img
                    :src="stage.photo"
                    :alt="stage.title"
                    class="stages__photo photo"
                    loading="lazy"
                    decoding="async"
                />
              </div>
              <span class="stages__num">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>

            <div class="stages__content">
              <span class="stages__year-badge">{{ stage.yearBadge ?? stage.year }}</span>
              <h3 class="stages__title">{{ stage.title }}</h3>
              <p class="stages__desc">{{ stage.description }}</p>
            </div>
          </article>
        </li>

        <div ref="spineFillRef" class="stages__spine-fill" aria-hidden="true" />
      </ol>

    </div>
  </section>
</template>

<style scoped>
.stages { background-color: var(--color-surface); }

/* ── Timeline ── */
.stages__timeline {
  --spine: 11px;                 /* x-anchor of the spine (mobile rail) */
  list-style: none;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: clamp(var(--space-4), 5vw, var(--space-8));
  margin-top: var(--space-6);
}

/* base spine track + the scroll-driven fill share the same geometry */
.stages__timeline::before,
.stages__spine-fill {
  content: '';
  position: absolute;
  top: 7px;
  bottom: 7px;
  left: var(--spine);
  width: 1px;
  transform: translateX(-50%);
}
.stages__timeline::before { background: var(--color-divider); }
.stages__spine-fill {
  transform: translateX(-50%) scaleY(0);
  transform-origin: top center;
  background: linear-gradient(var(--squirrel-800), var(--squirrel-400));
  z-index: 1;
}

/* ── Item ── */
.stages__item {
  position: relative;
  padding-left: calc(var(--spine) + var(--space-4));
}

/* ── Node on the spine ── */
.stages__node {
  position: absolute;
  top: 0;
  left: var(--spine);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  z-index: 2;
}

.stages__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
  transition:
      background var(--dur-default) var(--ease-gentle),
      border-color var(--dur-default) var(--ease-gentle),
      box-shadow var(--dur-default) var(--ease-gentle);
}
.stages__dot--active {
  background: var(--squirrel-800);
  border-color: var(--squirrel-800);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--squirrel-800) 12%, transparent);
}

.stages__node-year {
  display: none;                 /* surfaced on desktop, where there's room */
  font-family: var(--font-sc);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  font-variant-numeric: lining-nums;
}

/* ── Card ── */
.stages__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* ── Photo ── */
.stages__photo-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--color-bg);
}
/* Dedicated layer for the GSAP zoom/parallax so the CSS hover zoom on the <img>
   never fights the scroll transform. */
.stages__photo-inner { width: 100%; height: 100%; }
.stages__photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--dur-lux) var(--ease-lux);
}
.stages__card:hover .stages__photo { transform: scale(1.04); }

.stages__num {
  position: absolute;
  bottom: var(--space-1);
  right: var(--space-2);
  font-family: var(--font-serif);
  font-size: clamp(var(--text-4xl), 12vw, var(--text-5xl));
  font-weight: 300;
  color: rgba(251, 251, 248, 0.26);
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

/* ── Desktop: centred spine + alternating zigzag ── */
@media (min-width: 768px) {
  .stages__timeline { --spine: 50%; }

  .stages__item { padding-left: 0; }

  .stages__node { top: 6px; }
  .stages__node-year { display: block; }

  /* Each card claims one half, leaving a centred gutter for the node. */
  .stages__card { width: calc(50% - var(--space-6)); }
  .stages__item--right .stages__card { margin-left: auto; }
}
</style>
