<script setup lang="ts">
defineProps<{
  padded?: boolean
}>()
</script>

<template>
  <div class="card" :class="{ 'card--padded': padded }">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-divider);
}
.card--padded { padding: var(--space-4); }
</style>
