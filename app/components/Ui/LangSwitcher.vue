<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const { t } = useI18n()
</script>

<template>
  <div class="lang" role="navigation" aria-label="Language">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="lang__btn"
      :class="{ 'lang__btn--active': locale === loc.code }"
      @click="setLocale(loc.code as 'hy' | 'ru' | 'en')"
    >
      {{ t(`lang.${loc.code}`) }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  justify-content: center;
}

.lang__btn {
  font-family: var(--font-sc), sans-serif;
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-caps);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-1);
  transition: color var(--dur-fast) var(--ease-gentle);
}

.lang__btn:hover { color: var(--color-text); }

.lang__btn--active {
  color: var(--color-accent);
  border-bottom: 0.5px solid var(--color-accent);
}
</style>
