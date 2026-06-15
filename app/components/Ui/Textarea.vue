<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{ modelValue: string }>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <textarea
    class="ui-textarea"
    v-bind="$attrs"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
.ui-textarea {
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
  line-height: var(--leading-relaxed);
  resize: none;
  transition: border-color var(--dur-default) var(--ease-gentle);
}
.ui-textarea::placeholder { color: var(--color-text-disabled); }
.ui-textarea:focus { border-bottom-color: var(--color-text-heading); }
.ui-textarea:focus::placeholder { opacity: 0; transition: opacity var(--dur-fast) ease; }
.ui-textarea:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
