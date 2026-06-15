<script setup lang="ts">
defineProps<{
  href: string
  external?: boolean
}>()
</script>

<template>
  <a
    class="link"
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>
</template>

<style scoped>
.link {
  font-family: inherit;
  font-size: inherit;
  color: var(--color-accent);
  text-decoration: none;
  letter-spacing: inherit;
  transition: color var(--dur-fast) var(--ease-gentle);
}
.link:hover  { color: var(--color-accent-hover); }
.link:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
