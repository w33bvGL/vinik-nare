<script setup lang="ts">
defineProps<{
  modelValue: string | null
  options: { value: string; label: string }[]
  name: string
  legend: string
  disabled?: boolean
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <fieldset class="rg">
    <legend class="rg__legend">{{ legend }}</legend>
    <div class="rg__pills">
      <label
        v-for="opt in options"
        :key="opt.value"
        class="rg__pill"
        :class="{ 'rg__pill--on': modelValue === opt.value }"
      >
        <input
          class="rg__input"
          type="radio"
          :name="name"
          :value="opt.value"
          :checked="modelValue === opt.value"
          :disabled="disabled"
          @change="$emit('update:modelValue', opt.value)"
        />
        <span class="rg__dot" aria-hidden="true" />
        {{ opt.label }}
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
.rg {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rg__legend {
  font-family: var(--font-sc), sans-serif;
  font-size: var(--text-xs);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  padding: 0;
  margin-bottom: 10px;
}

.rg__pills {
  display: flex;
  gap: var(--space-2);
}

.rg__input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.rg__pill {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: 14px 20px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  background: transparent;
  border: 0.5px solid var(--color-divider);
  cursor: pointer;
  transition:
    background var(--dur-default) var(--ease-gentle),
    color var(--dur-default) var(--ease-gentle),
    border-color var(--dur-default) var(--ease-gentle);
}
.rg__pill:hover { background: var(--color-hover-fill); }
.rg__pill--on {
  background: var(--squirrel-900);
  color: var(--squirrel-50);
  border-color: var(--squirrel-900);
}
.rg__pill:has(.rg__input:focus-visible) {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

.rg__dot {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0;
  transition: opacity var(--dur-default) var(--ease-gentle);
  flex-shrink: 0;
}
.rg__pill--on .rg__dot { opacity: 1; }
</style>
