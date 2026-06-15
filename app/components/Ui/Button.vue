<script setup lang="ts">
defineProps<{
  variant?: 'outline' | 'filled'
  as?: 'button' | 'a'
  href?: string
  external?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'default' | 'lg'
}>()

defineEmits<{ click: [e: MouseEvent] }>()
</script>

<template>
  <component
    :is="as ?? 'button'"
    class="btn"
    :class="[
      `btn--${variant ?? 'outline'}`,
      `btn--${size ?? 'default'}`,
      { 'btn--loading': loading, 'btn--disabled': disabled },
    ]"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :disabled="as !== 'a' ? (disabled || loading) : undefined"
    :aria-disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="btn__spinner" aria-hidden="true" />
    <slot v-else />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition:
    background var(--dur-default) var(--ease-gentle),
    color var(--dur-default) var(--ease-gentle),
    border-color var(--dur-default) var(--ease-gentle),
    opacity var(--dur-default) ease;
}

/* Sizes */
.btn--default { padding: 12px 32px; font-size: var(--text-sm); }
.btn--lg      { padding: 16px 48px; font-size: var(--text-base); }

/* Outline */
.btn--outline {
  color: var(--color-accent);
  background: transparent;
  border: 1px solid var(--color-accent);
}
.btn--outline:hover:not(.btn--disabled) {
  background: var(--color-hover-fill);
  color: var(--color-accent-hover);
}
.btn--outline:active:not(.btn--disabled) { background: var(--squirrel-300); }

/* Filled */
.btn--filled {
  color: var(--squirrel-50);
  background: var(--squirrel-900);
  border: 1px solid var(--squirrel-900);
}
.btn--filled:hover:not(.btn--disabled) {
  background: var(--squirrel-800);
  border-color: var(--squirrel-800);
}

/* States */
.btn--disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }
.btn--loading  { opacity: 0.6; cursor: wait; pointer-events: none; }

.btn:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

/* Spinner */
.btn__spinner {
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid rgba(251, 251, 248, 0.35);
  border-top-color: var(--squirrel-50);
  border-radius: 50%;
  animation: btn-spin 600ms linear infinite;
}
.btn--outline .btn__spinner {
  border-color: rgba(94, 85, 71, 0.25);
  border-top-color: var(--color-accent);
}

@keyframes btn-spin { to { transform: rotate(360deg); } }
</style>
