<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <section class="section location" aria-labelledby="location-heading">
    <div class="container location__inner">

      <p class="location__label reveal" style="transition-delay: 0ms">
        Место проведения
      </p>

      <AppDivider variant="short" />

      <h2 id="location-heading" class="location__venue reveal" style="transition-delay: 80ms">
        {{ wedding.venue.name }}
      </h2>

      <address class="location__address reveal" style="transition-delay: 160ms">
        {{ wedding.venue.address }}
      </address>

      <a
        class="btn reveal"
        :href="wedding.venue.mapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        style="transition-delay: 240ms"
      >
        Открыть на карте
      </a>

    </div>
  </section>
</template>

<style scoped>
.location__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

.location__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
}

.location__venue {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-2xl), 5vw, var(--text-3xl));
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
  line-height: var(--leading-tight);
}

.location__address {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-style: normal;
  font-weight: 300;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-wide);
}

/* Outline button — shared pattern */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  background: transparent;
  border: 1px solid var(--color-accent);
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--dur-default) var(--ease-gentle),
    color var(--dur-default) var(--ease-gentle);
  margin-top: var(--space-2);
}

.btn:hover {
  background: var(--color-hover-fill);
  color: var(--color-accent-hover);
}

.btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.btn:active {
  background: var(--squirrel-300);
}
</style>
