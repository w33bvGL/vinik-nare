<script setup lang="ts">
defineProps<{
  variant?: 'full' | 'short' | 'ornament'
}>()
</script>

<template>
  <div
    v-if="variant === 'ornament'"
    class="divider divider--ornament"
    role="separator"
    aria-hidden="true"
  >
    <span class="divider__line" />
    <span class="divider__gem">◇</span>
    <span class="divider__line" />
  </div>
  <hr
    v-else
    class="divider"
    :class="`divider--${variant ?? 'full'}`"
    aria-hidden="true"
  />
</template>

<style scoped>
.divider {
  border: none;
  background: var(--color-divider);
  height: 1px;
  display: block;
}
.divider--full  { width: 100%; }
.divider--short { width: 48px; margin-inline: auto; }

.divider--ornament {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  border: none;
}
.divider__line {
  flex: 1;
  height: 0.5px;
  background: var(--color-divider);
}
.divider__gem {
  font-size: 0.5rem;
  color: var(--color-text-secondary);
  opacity: 0.55;
  line-height: 1;
  user-select: none;
}
</style>
