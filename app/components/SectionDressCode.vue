<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <section class="section dresscode" aria-labelledby="dresscode-heading">
    <div class="container dresscode__inner">

      <p id="dresscode-heading" class="dresscode__label reveal" style="transition-delay: 0ms">
        Дресс-код
      </p>

      <AppDivider variant="short" />

      <p class="dresscode__text reveal" style="transition-delay: 80ms">
        {{ wedding.dressCode.text }}
      </p>

      <div class="dresscode__palette reveal" style="transition-delay: 160ms" aria-label="Рекомендованные цвета">
        <div
          v-for="color in wedding.dressCode.palette"
          :key="color.hex"
          class="dresscode__swatch"
          :title="color.label"
          role="img"
          :aria-label="color.label"
        >
          <span
            class="dresscode__dot"
            :style="{ background: color.hex }"
          />
          <span class="dresscode__swatch-label">{{ color.label }}</span>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.dresscode__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  max-width: 480px;
  margin-inline: auto;
}

.dresscode__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
}

.dresscode__text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  line-height: var(--leading-loose);
  color: var(--color-text);
  letter-spacing: var(--tracking-wide);
}

.dresscode__palette {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
  margin-top: var(--space-2);
}

.dresscode__swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.dresscode__dot {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 0.5px solid var(--color-divider);
  box-shadow: var(--shadow-sm);
}

.dresscode__swatch-label {
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-secondary);
}
</style>
