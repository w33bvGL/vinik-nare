<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

interface Shot { src: string; span: string }
const shots = computed<Shot[]>(() => config.wedding.gallery ?? [])

const sectionRef = ref<HTMLElement | null>(null)
const itemRefs   = ref<HTMLElement[]>([])
const imgRefs    = ref<HTMLElement[]>([])
function setItem(el: HTMLElement | null, i: number) { if (el) itemRefs.value[i] = el }
function setImg(el: HTMLElement | null, i: number)  { if (el) imgRefs.value[i] = el }

/* ── Lightbox ───────────────────────────────────────────────── */
const lightboxOpen = ref(false)
const activeIndex  = ref(0)
const figureRef    = ref<HTMLElement | null>(null)
const overlayRef   = ref<HTMLElement | null>(null)

let draggable: any = null
let lastFocused: HTMLElement | null = null

function open(i: number) {
  lastFocused = document.activeElement as HTMLElement
  activeIndex.value = i
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden' // also pauses Lenis (see lenis plugin)
}

function close() {
  const { $gsap } = useNuxtApp() as any
  const done = () => {
    lightboxOpen.value = false
    document.body.style.overflow = ''
    lastFocused?.focus?.()
  }
  if ($gsap && overlayRef.value) {
    $gsap.to(overlayRef.value, { autoAlpha: 0, duration: 0.32, ease: 'power2.in', onComplete: done })
  } else { done() }
}

function go(dir: number) {
  const n = shots.value.length
  if (!n) return
  activeIndex.value = (activeIndex.value + dir + n) % n
  const { $gsap } = useNuxtApp() as any
  if ($gsap && figureRef.value) {
    $gsap.fromTo(figureRef.value,
      { autoAlpha: 0, x: dir * 36 },
      { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' },
    )
  }
}

function onKey(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') go(1)
  else if (e.key === 'ArrowLeft') go(-1)
}

// Animate the lightbox in + wire drag-to-navigate once it has mounted.
watch(lightboxOpen, async (isOpen) => {
  if (!isOpen) { draggable?.kill(); draggable = null; return }
  await nextTick()
  const { $gsap, $Draggable } = useNuxtApp() as any
  if ($gsap && overlayRef.value && figureRef.value) {
    $gsap.set(overlayRef.value, { autoAlpha: 0 })
    $gsap.to(overlayRef.value, { autoAlpha: 1, duration: 0.32, ease: 'power2.out' })
    $gsap.fromTo(figureRef.value,
      { autoAlpha: 0, scale: 0.92, y: 16 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 },
    )
  }
  overlayRef.value?.focus()

  // Drag / swipe between photos (touch + pointer) via GSAP Draggable.
  if ($Draggable && figureRef.value) {
    draggable = $Draggable.create(figureRef.value, {
      type: 'x',
      inertia: false,
      cursor: 'grab',
      activeCursor: 'grabbing',
      onDragEnd(this: any) {
        const dx = this.x
        if (dx < -60) go(1)
        else if (dx > 60) go(-1)
        $gsap?.to(figureRef.value, { x: 0, duration: 0.4, ease: 'power3.out' })
      },
    })[0]
  }
})

const active = computed<Shot | undefined>(() => shots.value[activeIndex.value])

/* ── Scroll choreography ────────────────────────────────────── */
onMounted(() => {
  window.addEventListener('keydown', onKey)

  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !sectionRef.value) return

  $gsap.from(sectionRef.value.querySelectorAll('[data-gsap-head]'), {
    opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: sectionRef.value, start: 'top 80%', once: true },
  })

  itemRefs.value.forEach((item, i) => {
    const img = imgRefs.value[i]
    // Reveal: a clip-path wipe with the inner image easing out of an overscan.
    $gsap.fromTo(item,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      },
    )
    if (img) {
      $gsap.from(img, {
        scale: 1.18, duration: 1.4, ease: 'power2.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      })
      // Gentle parallax drift while scrolling through.
      $gsap.fromTo(img,
        { yPercent: -6 },
        {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      )
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  draggable?.kill()
  document.body.style.overflow = ''
})
</script>

<template>
  <section ref="sectionRef" class="section gallery" aria-labelledby="gallery-heading">
    <div class="container gallery__head">
      <UiTag data-gsap-head :label="t('gallery.label')" />
      <h2 id="gallery-heading" data-gsap-head class="gallery__heading">{{ t('gallery.heading') }}</h2>
      <Botanical data-gsap-head variant="branch" class="gallery__sprig" />
    </div>

    <div class="container">
      <ul class="gallery__grid" role="list">
        <li
          v-for="(shot, i) in shots"
          :key="shot.src"
          :ref="(el) => setItem(el as HTMLElement, i)"
          class="gallery__item"
          :class="`gallery__item--${shot.span}`"
        >
          <button
            type="button"
            class="gallery__btn"
            :aria-label="t('gallery.hint')"
            @click="open(i)"
          >
            <img
              :ref="(el) => setImg(el as HTMLElement, i)"
              :src="shot.src"
              alt=""
              class="gallery__img photo"
              loading="lazy"
              decoding="async"
            />
            <span class="gallery__veil" aria-hidden="true" />
            <span class="gallery__plus" aria-hidden="true">＋</span>
          </button>
        </li>
      </ul>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <div
        v-if="lightboxOpen"
        ref="overlayRef"
        class="lb"
        role="dialog"
        aria-modal="true"
        :aria-label="t('gallery.heading')"
        tabindex="-1"
        @click.self="close"
      >
        <button class="lb__close" type="button" :aria-label="t('gallery.close')" @click="close">✕</button>

        <button class="lb__nav lb__nav--prev" type="button" :aria-label="t('gallery.prev')" @click="go(-1)">‹</button>

        <figure ref="figureRef" class="lb__figure">
          <img :src="active?.src" alt="" class="lb__img" draggable="false" />
        </figure>

        <button class="lb__nav lb__nav--next" type="button" :aria-label="t('gallery.next')" @click="go(1)">›</button>

        <div class="lb__counter">{{ activeIndex + 1 }} / {{ shots.length }}</div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.gallery { background-color: var(--color-bg); }

.gallery__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  text-align: center;
  margin-bottom: var(--space-8);
}

.gallery__heading {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-2xl), 6vw, var(--text-4xl));
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
  line-height: var(--leading-tight);
}

.gallery__sprig {
  width: clamp(140px, 30vw, 220px);
  height: auto;
  color: var(--squirrel-400);
  margin-top: var(--space-1);
}

/* ── Grid ── */
.gallery__grid {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-2);
}

@media (min-width: 640px) {
  .gallery__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3);
  }
  .gallery__item--wide { grid-column: 1 / -1; }
}

.gallery__item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--color-surface);
  will-change: clip-path;
}
.gallery__item--tall { aspect-ratio: 4 / 5; }
.gallery__item--wide { aspect-ratio: 3 / 2; }

@media (min-width: 640px) {
  .gallery__item--tall { aspect-ratio: 3 / 4; }
  .gallery__item--wide { aspect-ratio: 21 / 9; }
}

.gallery__btn {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.gallery__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--dur-lux) var(--ease-lux);
}
.gallery__btn:hover .gallery__img,
.gallery__btn:focus-visible .gallery__img { transform: scale(1.05); }

.gallery__veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(14,10,7,0) 55%, rgba(14,10,7,0.32) 100%);
  opacity: 0;
  transition: opacity var(--dur-default) var(--ease-gentle);
}
.gallery__btn:hover .gallery__veil,
.gallery__btn:focus-visible .gallery__veil { opacity: 1; }

.gallery__plus {
  position: absolute;
  right: var(--space-2);
  bottom: var(--space-2);
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  color: var(--squirrel-50);
  font-size: var(--text-lg);
  font-weight: 300;
  border: 0.5px solid rgba(251, 251, 248, 0.6);
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity var(--dur-default) var(--ease-gentle), transform var(--dur-default) var(--ease-spring);
}
.gallery__btn:hover .gallery__plus,
.gallery__btn:focus-visible .gallery__plus { opacity: 1; transform: scale(1); }

.gallery__btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: -2px;
}

/* ── Lightbox ── */
.lb {
  position: fixed;
  inset: 0;
  z-index: var(--z-modal);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: rgba(14, 10, 7, 0.92);
  backdrop-filter: blur(4px);
}

.lb__figure {
  grid-column: 2;
  justify-self: center;
  max-width: min(92vw, 900px);
  max-height: 86vh;
  margin: 0;
  cursor: grab;
  touch-action: pan-y;
}
.lb__figure:active { cursor: grabbing; }

.lb__img {
  display: block;
  max-width: 100%;
  max-height: 86vh;
  object-fit: contain;
  box-shadow: var(--shadow-md);
  user-select: none;
  -webkit-user-drag: none;
}

.lb__close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  font-size: var(--text-lg);
  color: var(--squirrel-200);
  background: none;
  border: 0.5px solid rgba(251, 251, 248, 0.25);
  border-radius: 50%;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-gentle), color var(--dur-fast) var(--ease-gentle);
  z-index: 1;
}
.lb__close:hover { background: rgba(251, 251, 248, 0.1); color: var(--squirrel-50); }

.lb__nav {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  line-height: 1;
  color: var(--squirrel-200);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-gentle), transform var(--dur-fast) var(--ease-gentle);
  align-self: center;
}
.lb__nav--prev { grid-column: 1; }
.lb__nav--next { grid-column: 3; }
.lb__nav:hover { color: var(--squirrel-50); transform: scale(1.15); }

.lb__counter {
  position: absolute;
  bottom: var(--space-3);
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-widest);
  color: var(--squirrel-300);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 560px) {
  .lb { grid-template-columns: 1fr; padding: var(--space-2); }
  .lb__figure { grid-column: 1; }
  .lb__nav { display: none; } /* swipe instead */
}
</style>
