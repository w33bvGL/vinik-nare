<script setup lang="ts">
import { wedding } from '~/data/wedding'
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">

      <AppDivider variant="full" />

      <div class="footer__content">
        <p class="footer__names">
          {{ wedding.groom }} &amp; {{ wedding.bride }}
        </p>
        <p class="footer__date">{{ wedding.dateFormatted }}</p>
        <WaxSeal :size="32" />
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-bottom: var(--space-8);
}

.footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.footer__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-6);
}

.footer__names {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
}

.footer__date {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-caps);
  color: var(--color-text-secondary);
  font-variant-numeric: lining-nums;
}
</style>
