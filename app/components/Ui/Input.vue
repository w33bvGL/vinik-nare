<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  modelValue: string | number
  type?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value
  emit('update:modelValue', props.type === 'number' ? Number(raw) : raw)
}
</script>

<template>
  <input
    class="ui-input"
    v-bind="$attrs"
    :type="type ?? 'text'"
    :value="modelValue"
    @input="onInput"
  />
</template>

<style scoped>
.ui-input {
  width: 100%;
  padding: 10px 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-text);
  background: transparent;
  border: none;
  border-bottom: 0.5px solid var(--color-divider);
  outline: none;
  letter-spacing: var(--tracking-wide);
  transition: border-color var(--dur-default) var(--ease-gentle);
  -moz-appearance: textfield;
}
.ui-input::-webkit-inner-spin-button,
.ui-input::-webkit-outer-spin-button { -webkit-appearance: none; }
.ui-input::placeholder { color: var(--color-text-disabled); }
.ui-input:focus { border-bottom-color: var(--color-text-heading); }
.ui-input:focus::placeholder { opacity: 0; transition: opacity var(--dur-fast) ease; }
.ui-input:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
