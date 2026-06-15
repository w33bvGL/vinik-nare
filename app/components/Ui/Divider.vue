<script setup lang="ts">
defineProps<{
  variant?: 'full' | 'short'
}>()
</script>

<template>
  <hr class="divider" :class="`divider--${variant ?? 'full'}`" aria-hidden="true" />
</template>

<style scoped>
.divider {
  border: none;
  background: var(--color-divider);
  height: 0.5px;
  display: block;
}
.divider--full  { width: 100%; }
.divider--short { width: 48px; margin-inline: auto; }
</style>
