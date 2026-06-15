<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <section class="section greeting" aria-labelledby="greeting-heading">
    <div class="container greeting__inner">

      <p class="greeting__label reveal" style="transition-delay: 0ms">
        Дорогой гость
      </p>

      <h2 id="greeting-heading" class="greeting__heading reveal" style="transition-delay: 80ms">
        Мы женимся!
      </h2>

      <AppDivider variant="short" />

      <p class="greeting__body reveal" style="transition-delay: 160ms">
        Приглашаем вас разделить с нами<br>
        первые мгновения нашего семейного счастья.
      </p>

      <p class="greeting__names reveal" style="transition-delay: 240ms">
        {{ wedding.groom }} &amp; {{ wedding.bride }}
      </p>

    </div>
  </section>
</template>

<style scoped>
.greeting__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
  max-width: 480px;
  margin-inline: auto;
}

.greeting__label {
  font-family: var(--font-sc);
  font-weight: 300;
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
}

.greeting__heading {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 7vw, var(--text-4xl));
  line-height: var(--leading-tight);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
}

.greeting__body {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-lg);
  line-height: var(--leading-loose);
  color: var(--color-text);
  letter-spacing: var(--tracking-wide);
}

.greeting__names {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: var(--text-2xl);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
}
</style>
