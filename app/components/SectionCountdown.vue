<script setup lang="ts">
import { wedding } from '~/data/wedding'

const { days, hours, minutes, seconds, isPast, ticking } = useCountdown()

const units = computed(() => [
  { value: days,    label: 'дней' },
  { value: hours,   label: 'часов' },
  { value: minutes, label: 'минут' },
  { value: seconds, label: 'секунд', ticking: ticking },
])
</script>

<template>
  <section class="section countdown" aria-labelledby="countdown-heading">
    <div class="container">

      <AppDivider variant="full" />

      <div class="countdown__inner">

        <p
          id="countdown-heading"
          class="countdown__date reveal"
          style="transition-delay: 0ms"
        >
          {{ wedding.dateFormatted }}
        </p>

        <template v-if="!isPast">
          <p class="countdown__sub reveal" style="transition-delay: 80ms">
            До свадьбы осталось
          </p>

          <div class="countdown__grid reveal" style="transition-delay: 160ms" aria-live="polite">
            <div
              v-for="unit in units"
              :key="unit.label"
              class="countdown__unit"
            >
              <span
                class="countdown__num"
                :class="{ 'countdown__num--tick': unit.ticking?.value }"
              >
                {{ String(unit.value.value).padStart(2, '0') }}
              </span>
              <span class="countdown__label">{{ unit.label }}</span>
            </div>
          </div>
        </template>

        <template v-else>
          <p class="countdown__past reveal" style="transition-delay: 80ms">
            Сегодня наш день
          </p>
        </template>

      </div>

      <AppDivider variant="full" />

    </div>
  </section>
</template>

<style scoped>
.countdown__inner {
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

.countdown__num--tick {
  opacity: 0.5;
}

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
