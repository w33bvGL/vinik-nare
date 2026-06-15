<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <section class="section program" aria-labelledby="program-heading">
    <div class="container">

      <p id="program-heading" class="program__label reveal" style="transition-delay: 0ms">
        Программа дня
      </p>

      <ol class="program__list" role="list">
        <li
          v-for="(item, i) in wedding.program"
          :key="item.time"
          class="program__item reveal"
          :style="`transition-delay: ${80 + i * 100}ms`"
        >
          <time class="program__time" :datetime="item.time">{{ item.time }}</time>
          <div class="program__content">
            <p class="program__title">{{ item.title }}</p>
            <p class="program__venue">{{ item.venue }}</p>
          </div>
        </li>
      </ol>

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

.program__list {
  list-style: none;
}

.program__item {
  display: grid;
  grid-template-columns: 64px 1fr;
  gap: var(--space-4);
  align-items: start;
  padding-block: var(--space-4);
  border-top: 0.5px solid var(--color-divider);
}

.program__item:last-child {
  border-bottom: 0.5px solid var(--color-divider);
}

.program__time {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--text-xl);
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--color-text-heading);
  padding-top: 2px;
}

.program__title {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: var(--text-base);
  color: var(--color-text);
  letter-spacing: var(--tracking-wide);
}

.program__venue {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  margin-top: var(--space-1);
}
</style>
