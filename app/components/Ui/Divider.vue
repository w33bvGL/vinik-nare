<script setup lang="ts">
defineProps<{
  variant?: 'full' | 'short' | 'ornament' | 'botanical'
}>()
</script>

<template>
  <div
    v-if="variant === 'botanical'"
    class="divider divider--botanical"
    role="separator"
    aria-hidden="true"
  >
    <span class="divider__line" />
    <Botanical variant="sprig" class="divider__leaf divider__leaf--l" />
    <span class="divider__seed">✦</span>
    <Botanical variant="sprig" class="divider__leaf divider__leaf--r" />
    <span class="divider__line" />
  </div>
  <div
    v-else-if="variant === 'ornament'"
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

/* Botanical divider — twin sprigs around a small seed */
.divider--botanical {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  width: 100%;
  max-width: 240px;
  margin-inline: auto;
  border: none;
}
.divider--botanical .divider__line {
  flex: 1;
  max-width: 56px;
  height: 0.5px;
  background: var(--color-divider);
}
.divider__leaf {
  width: 30px;
  height: 30px;
  color: var(--squirrel-400);
  transform: rotate(90deg);
  flex-shrink: 0;
}
.divider__leaf--r { transform: rotate(-90deg); }
.divider__seed {
  font-size: 0.55rem;
  color: var(--color-accent);
  opacity: 0.6;
  line-height: 1;
  user-select: none;
}
</style>
