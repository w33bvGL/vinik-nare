<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: () => t('meta.title'),
  meta: [{ name: 'description', content: () => t('meta.description') }],
})
</script>

<template>
  <NuxtLayout>
    <main>
      <SectionHero />
      <SectionGreeting />
      <SectionCountdown />
      <SectionStages />
      <SectionGallery />
      <SectionProgram />
      <SectionLocation />
      <SectionRsvp />
    </main>
  </NuxtLayout>
</template>
