<script setup lang="ts">
const { t, locale } = useI18n()

const ogLocale = computed(() =>
  ({ hy: 'hy_AM', ru: 'ru_RU', en: 'en_US' }[locale.value] ?? 'hy_AM'),
)

useHead({
  title: () => t('meta.title'),
  meta: [
    { name: 'description', content: () => t('meta.description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: () => t('meta.title') },
    { property: 'og:description', content: () => t('meta.description') },
    { property: 'og:locale', content: ogLocale },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: () => t('meta.title') },
    { name: 'twitter:description', content: () => t('meta.description') },
  ],
})

useSchemaOrg([
  defineWebSite({
    name: 'Vinik & Nare',
    inLanguage: ['hy', 'ru', 'en'],
    creator: {
      '@type': 'Person',
      name: 'Vahe Sargsyan',
      url: 'https://w33bvgl.com',
      sameAs: [
        'https://github.com/w33bvgl',
        'https://www.facebook.com/profile.php?id=61551120939139',
        'https://www.linkedin.com/in/vahe-sargsyan-ba5028271',
        'https://t.me/w33bvgl'
      ],
    },
  }),
  defineWebPage({
    name: () => t('meta.title'),
    description: () => t('meta.description'),
  }),
  defineEvent({
    name: 'Vinik & Nare Wedding',
    startDate: '2026-10-18T11:00:00+04:00',
    endDate: '2026-10-18T23:59:00+04:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: [
      {
        '@type': 'Place',
        name: 'Surb Hovhannes Avetaranich Church',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Artashat',
          addressCountry: 'AM',
        },
      },
      {
        '@type': 'Place',
        name: 'Vahagn Hall',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Aygavan',
          addressRegion: 'Ararat',
          addressCountry: 'AM',
        },
      },
    ],
    organizer: [
      { '@type': 'Person', name: 'Vinik' },
      { '@type': 'Person', name: 'Nare' },
    ],
  }),
])
</script>

<template>
  <NuxtLayout>
    <main>
      <SectionHero />
      <SectionGreeting />
      <SectionCountdown />
      <SectionStages />
      <SectionProgram />
      <SectionRsvp />
    </main>
  </NuxtLayout>
</template>
