<script setup lang="ts">
const { t } = useI18n()

const rootRef = ref<HTMLElement | null>(null)
const { revealGroup } = useGsapReveal()

onMounted(() => revealGroup(rootRef, '[data-gsap]', { stagger: 0.12 }))
</script>

<template>
  <section ref="rootRef" class="section greeting" aria-labelledby="greeting-heading">
    <div class="container greeting__inner">

      <UiTag data-gsap :label="t('greeting.label')" />

      <h2 id="greeting-heading" data-gsap class="greeting__heading">
        {{ t('greeting.heading') }}
      </h2>

      <UiDivider data-gsap variant="short" />

      <p data-gsap class="greeting__body" v-html="t('greeting.body').replace(/\n/g, '<br>')" />

      <p data-gsap class="greeting__names">
        {{ t('names.groom') }} &amp; {{ t('names.bride') }}
      </p>

    </div>
  </section>
</template>

<style scoped>
.greeting__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--space-4);
  max-width: 480px;
  margin-inline: auto;
}

.greeting__heading {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: clamp(var(--text-3xl), 7vw, var(--text-4xl));
  line-height: var(--leading-tight);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
}

.greeting__body {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-lg);
  line-height: var(--leading-loose);
  color: var(--color-text);
}

.greeting__names {
  font-family: var(--font-serif);
  font-weight: 300;
  font-style: italic;
  font-size: var(--text-2xl);
  color: var(--color-text-heading);
  letter-spacing: var(--tracking-tighter);
}
</style>
