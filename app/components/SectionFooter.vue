<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">

      <div class="footer__content">
        <Botanical variant="branch" animate :scrub="0.8" class="footer__branch" />
        <p class="footer__names">
          {{ t('names.groom') }}<span class="footer__amp">&amp;</span>{{ t('names.bride') }}
        </p>
        <p class="footer__date">{{ t('footer.closingDate') }}</p>
        <UiLangSwitcher />
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer { padding-bottom: var(--space-8); }

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

.footer__branch {
  width: clamp(160px, 40vw, 240px);
  height: auto;
  color: var(--squirrel-400);
  opacity: 0.55;
  margin-bottom: var(--space-1);
}

.footer__names {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: var(--text-2xl);
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
}

.footer__amp {
  font-family: var(--font-script);
  font-style: normal;
  color: var(--color-accent);
  margin-inline: 0.4em;
  font-size: 1.1em;
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
