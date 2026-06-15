<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const heroRef  = ref<HTMLElement | null>(null)
const dateRef  = ref<HTMLElement | null>(null)
const vruleRef = ref<HTMLElement | null>(null)
const namesRef = ref<HTMLElement | null>(null)
const ctaRef   = ref<HTMLElement | null>(null)

const heroBg = computed(() =>
  config.wedding.heroPhoto
    ? `url('${config.wedding.heroPhoto}')`
    : undefined,
)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap) return

  const tl = $gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from(dateRef.value, { opacity: 0, y: 28, duration: 1 }, 0.2)
    .from(vruleRef.value, { scaleY: 0, transformOrigin: 'top center', duration: 0.7, ease: 'power2.out' }, 0.75)
    .from(namesRef.value?.children ?? [], { opacity: 0, y: 28, duration: 0.9, stagger: 0.12 }, 0.9)
    .from(ctaRef.value?.children ?? [], { opacity: 0, y: 20, duration: 0.7, stagger: 0.1 }, 1.55)
})
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    :class="{ 'hero--photo': config.wedding.heroPhoto }"
    :style="heroBg ? { backgroundImage: heroBg } : undefined"
    aria-label="Invitation"
  >
    <div v-if="config.wedding.heroPhoto" class="hero__overlay" aria-hidden="true" />

    <div class="container hero__container">

      <div class="hero__layout">
        <!-- Date numerals -->
        <div ref="dateRef" class="hero__date" aria-label="Wedding date">
          <span class="hero__num">{{ config.wedding.dateDay }}</span>
          <span class="hero__num-dot" aria-hidden="true" />
          <span class="hero__num">{{ config.wedding.dateMonth }}</span>
          <span class="hero__num-dot" aria-hidden="true" />
          <span class="hero__num">{{ config.wedding.dateYear }}</span>
        </div>

        <!-- Vertical rule (desktop) -->
        <div ref="vruleRef" class="hero__vrule" aria-hidden="true" />

        <!-- Names -->
        <div ref="namesRef" class="hero__names">
          <span class="hero__name">{{ t('names.groom') }}</span>
          <span class="hero__amp" aria-hidden="true">&amp;</span>
          <span class="hero__name">{{ t('names.bride') }}</span>
        </div>
      </div>

      <!-- CTA -->
      <div ref="ctaRef" class="hero__cta">
        <UiDivider variant="short" />

        <div class="hero__actions">
          <UiButton as="a" href="#rsvp" variant="filled">
            {{ t('hero.rsvpCta') }}
          </UiButton>
          <UiButton as="a" href="#program" variant="outline">
            {{ t('hero.programCta') }}
          </UiButton>
        </div>

        <span class="hero__scroll-line" aria-hidden="true" />
      </div>

    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: var(--space-8);
  padding-top: max(var(--space-8), env(safe-area-inset-top, var(--space-8)));
  padding-bottom: max(var(--space-8), env(safe-area-inset-bottom, var(--space-8)));
}

.hero--photo {
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .hero { padding-block: var(--space-16); }
}

/* Overlay — keeps dark text legible over photo */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(251, 251, 248, 0.93) 0%,
    rgba(251, 251, 248, 0.78) 40%,
    rgba(251, 251, 248, 0.88) 100%
  );
  pointer-events: none;
}

.hero__container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

/* ── Layout ── */
.hero__layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

@media (min-width: 768px) {
  .hero__layout {
    flex-direction: row;
    align-items: stretch;
    justify-content: center;
    gap: var(--space-8);
  }
}

/* ── Date column ── */
.hero__date {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--space-2);
  order: 2;
}

@media (min-width: 768px) {
  .hero__date {
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
    order: 0;
  }
}

.hero__num {
  font-family: var(--font-serif);
  font-weight: 300;
  font-variant-numeric: lining-nums;
  line-height: var(--leading-tight);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(3.5rem, 12vw, 6.5rem);
}

.hero__num-dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-divider);
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .hero__num-dot { display: none; }
}

/* ── Vertical rule ── */
.hero__vrule {
  display: none;
}

@media (min-width: 768px) {
  .hero__vrule {
    display: block;
    width: 0.5px;
    background: var(--color-divider);
    align-self: stretch;
    flex-shrink: 0;
  }
}

/* ── Names ── */
.hero__names {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  order: 1;
}

@media (min-width: 768px) {
  .hero__names { justify-content: center; }
}

.hero__name {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  line-height: var(--leading-snug);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
  font-size: clamp(3.25rem, 10vw, 5.5rem);
}

.hero__amp {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--squirrel-500);
  line-height: var(--leading-loose);
  margin-block: -0.15em;
}

/* ── CTA ── */
.hero__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
}

/* ── Action buttons ── */
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: center;
}

@media (max-width: 480px) {
  .hero__actions { flex-direction: column; width: 100%; }
  .hero__actions :deep(.btn) { width: 100%; }
}

/* ── Scroll line ── */
.hero__scroll-line {
  display: block;
  width: 0.5px;
  height: 48px;
  background: linear-gradient(to bottom, var(--color-divider), transparent);
  animation: scroll-drop 2.4s var(--ease-lux) infinite;
  transform-origin: top center;
}

@keyframes scroll-drop {
  0%   { transform: scaleY(0); opacity: 0; }
  30%  { opacity: 1; }
  80%  { transform: scaleY(1); opacity: 0; }
  100% { transform: scaleY(1); opacity: 0; }
}
</style>
