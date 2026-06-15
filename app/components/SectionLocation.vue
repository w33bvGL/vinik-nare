<script setup lang="ts">
const { t } = useI18n()
const config = useAppConfig()

const rootRef = ref<HTMLElement | null>(null)
const { revealGroup } = useGsapReveal()

onMounted(() => revealGroup(rootRef, '[data-gsap]', { stagger: 0.1 }))
</script>

<template>
  <section ref="rootRef" class="section location" aria-labelledby="location-heading">
    <div class="container location__inner">

      <UiTag data-gsap :label="t('location.label')" />

      <UiDivider data-gsap variant="short" />

      <h2 id="location-heading" data-gsap class="location__venue">
        {{ t('venues.name') }}
      </h2>

      <address data-gsap class="location__address">
        {{ t('venues.address') }}
      </address>

      <UiButton
        data-gsap
        as="a"
        :href="config.wedding.venue.mapsUrl"
        :external="true"
        variant="outline"
        class="location__cta"
      >
        {{ t('venues.openMap') }}
      </UiButton>

    </div>
  </section>
</template>

<style scoped>
.location__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
}

.location__venue {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-2xl), 5vw, var(--text-3xl));
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
  line-height: var(--leading-tight);
}

.location__address {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-style: normal;
  font-weight: 300;
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  letter-spacing: var(--tracking-wide);
}

.location__cta { margin-top: var(--space-2); }
</style>
