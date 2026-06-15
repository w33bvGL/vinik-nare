<script setup lang="ts">
defineProps<{
  label: string
  inputId: string
}>()
</script>

<template>
  <div class="ff">
    <label class="ff__label" :for="inputId">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.ff {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ff__label {
  font-family: var(--font-sc);
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-transform: uppercase;
}
</style>
