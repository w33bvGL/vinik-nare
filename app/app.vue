<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('meta.title'),
  meta: [{ name: 'description', content: () => t('meta.description') }],
})
</script>

<template>
  <main class="page-rail">
    <SectionHero />
    <SectionGreeting />
    <SectionCountdown />
    <SectionStages />
    <SectionProgram />
    <SectionLocation />
    <SectionRsvp />
    <SectionFooter />
  </main>
</template>

<style scoped>
.page-rail {
  max-width: var(--container-max);
  margin-inline: auto;
  border-left: 0.5px solid var(--color-divider);
  border-right: 0.5px solid var(--color-divider);
  min-height: 100dvh;
}
</style>
