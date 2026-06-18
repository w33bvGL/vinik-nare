<script setup lang="ts">
const { t } = useI18n()

const rootRef = ref<HTMLElement | null>(null)
const roseRef = ref<HTMLElement | null>(null)
const { revealGroup } = useGsapReveal()

onMounted(() => {
  revealGroup(rootRef, '[data-gsap]', { stagger: 0.12 })

  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !roseRef.value) return
  // Soft "bloom" of the rose watermark as the section enters.
  $gsap.from(roseRef.value, {
    opacity: 0, scale: 0.82, rotate: -6, duration: 1.6, ease: 'power2.out',
    transformOrigin: 'center',
    scrollTrigger: { trigger: rootRef.value, start: 'top 75%', once: true },
  })
})
</script>

<template>
  <section ref="rootRef" class="section greeting" aria-labelledby="greeting-heading">

    <Botanical ref="roseRef" variant="rose" class="greeting__rose" />
    <Botanical variant="spray" class="greeting__spray greeting__spray--tl" />
    <Botanical variant="spray" class="greeting__spray greeting__spray--br" />

    <div class="container greeting__inner">

      <UiTag data-gsap :label="t('greeting.label')" />

      <h2 id="greeting-heading" data-gsap class="greeting__heading">
        {{ t('greeting.heading') }}
      </h2>

      <UiDivider data-gsap variant="botanical" />

      <p data-gsap class="greeting__body" v-html="t('greeting.body').replace(/\n/g, '<br>')" />

      <p data-gsap class="greeting__names">
        {{ t('names.groom') }}<span class="greeting__amp">&amp;</span>{{ t('names.bride') }}
      </p>

    </div>
  </section>
</template>

<style scoped>
.greeting {
  background-color: var(--color-surface);
  position: relative;
  overflow: hidden;
}

/* Line-drawn rose — the central watermark */
.greeting__rose {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(280px, 60vw, 520px);
  height: auto;
  transform: translate(-50%, -50%);
  color: var(--squirrel-300);
  opacity: 0.5;
  pointer-events: none;
}

/* Corner sprays frame the message, echoing the printed invitation */
.greeting__spray {
  position: absolute;
  width: clamp(120px, 24vw, 220px);
  height: auto;
  color: var(--squirrel-400);
  opacity: 0.45;
  pointer-events: none;
}
/* base of each spray sits in its corner, foliage fanning toward the centre */
.greeting__spray--tl { top: 0; left: 0; transform: scaleY(-1); }
.greeting__spray--br { bottom: 0; right: 0; transform: scaleX(-1); }

@media (max-width: 560px) {
  .greeting__spray { width: 110px; opacity: 0.35; }
}

.greeting__inner {
  position: relative;
  z-index: 1;
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

.greeting__amp {
  font-family: var(--font-script);
  font-style: normal;
  color: var(--color-accent);
  margin-inline: 0.4em;
  font-size: 1.1em;
  vertical-align: -0.05em;
}
</style>
