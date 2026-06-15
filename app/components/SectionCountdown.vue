<script setup lang="ts">
const { t } = useI18n()
const { days, hours, minutes, seconds, isPast, ticking } = useCountdown()

const rootRef = ref<HTMLElement | null>(null)
const { revealGroup } = useGsapReveal()

onMounted(() => revealGroup(rootRef, '[data-gsap]', { stagger: 0.1 }))

const units = computed(() => [
  { value: days,    key: 'days' },
  { value: hours,   key: 'hours' },
  { value: minutes, key: 'minutes' },
  { value: seconds, key: 'seconds', tick: ticking },
])
</script>

<template>
  <section ref="rootRef" class="section countdown" aria-labelledby="countdown-heading">
    <div class="container">

      <UiDivider variant="full" />

      <div class="countdown__body">
        <p id="countdown-heading" data-gsap class="countdown__date">
          {{ t('date.formatted') }}
        </p>

        <template v-if="!isPast">
          <p data-gsap class="countdown__sub">{{ t('countdown.until') }}</p>

          <div data-gsap class="countdown__grid" aria-live="polite">
            <div
              v-for="unit in units"
              :key="unit.key"
              class="countdown__unit"
            >
              <span
                class="countdown__num"
                :class="{ 'countdown__num--tick': unit.tick?.value }"
              >
                {{ String(unit.value.value).padStart(2, '0') }}
              </span>
              <span class="countdown__label">{{ t(`countdown.${unit.key}`) }}</span>
            </div>
          </div>
        </template>

        <p v-else data-gsap class="countdown__past">{{ t('countdown.past') }}</p>
      </div>

      <UiDivider variant="full" />

    </div>
  </section>
</template>

<style scoped>
.countdown__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding-block: var(--space-8);
  text-align: center;
}

.countdown__date {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-2xl), 5vw, var(--text-3xl));
  letter-spacing: 0.04em;
  color: var(--color-text-heading);
  font-variant-numeric: lining-nums;
}

.countdown__sub {
  font-family: var(--font-sc);
  font-size: var(--text-sm);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}

.countdown__grid {
  display: flex;
  gap: var(--space-6);
  justify-content: center;
  flex-wrap: wrap;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  min-width: 56px;
}

.countdown__num {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 8vw, var(--text-4xl));
  line-height: 1;
  color: var(--color-text-heading);
  font-variant-numeric: tabular-nums lining-nums;
  transition: opacity var(--dur-instant) ease;
}
.countdown__num--tick { opacity: 0.45; }

.countdown__label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--color-text-secondary);
}

.countdown__past {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: var(--text-3xl);
  color: var(--color-text-heading);
}
</style>
