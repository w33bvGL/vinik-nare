<script setup lang="ts">
defineProps<{
  id?: string
  as?: string
}>()
</script>

<template>
  <component :is="as ?? 'h2'" :id class="section-label">
    <slot />
  </component>
</template>

<style>
.section-label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-8);
}
</style>
