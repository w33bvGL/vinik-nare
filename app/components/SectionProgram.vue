<script setup lang="ts">
const { t } = useI18n()
const { items } = useProgram()

const rootRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !rootRef.value) return

  $gsap.from(rootRef.value.querySelector('.program__label'), {
    opacity: 0, y: 24, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: rootRef.value, start: 'top 80%', once: true },
  })

  $gsap.from(rootRef.value.querySelectorAll('.program__card'), {
    opacity: 0,
    x: 20,
    duration: 0.75,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
  })
})
</script>

<template>
  <section ref="rootRef" class="section program" aria-labelledby="program-heading">
    <div class="container">

      <p id="program-heading" class="program__label">
        {{ t('program.label') }}
      </p>

      <div class="program__scroll">
        <ol class="program__track" role="list">
          <li
            v-for="item in items"
            :key="item.time"
            class="program__card"
          >
            <time class="program__time" :datetime="item.time">{{ item.time }}</time>
            <span class="program__rule" aria-hidden="true" />
            <p class="program__title">{{ item.title }}</p>
            <p class="program__venue">{{ item.venue }}</p>
          </li>
        </ol>
      </div>

    </div>
  </section>
</template>

<style scoped>
.program__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-6);
}

.program__scroll {
  border: 0.5px solid var(--color-divider);
  overflow-x: auto;
  scrollbar-width: none;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}
.program__scroll::-webkit-scrollbar { display: none; }

.program__track {
  list-style: none;
  display: flex;
}

.program__card {
  flex: 1 0 190px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-6) var(--space-4);
  border-right: 0.5px solid var(--color-divider);
}
.program__card:last-child { border-right: none; }

.program__time {
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: var(--text-3xl);
  font-variant-numeric: tabular-nums lining-nums;
  color: var(--color-text-heading);
  line-height: 1;
  margin-bottom: var(--space-3);
}

.program__rule {
  display: block;
  width: 24px;
  height: 0.5px;
  background: var(--color-divider);
  margin-bottom: var(--space-3);
}

.program__title {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: var(--text-base);
  color: var(--color-text);
  letter-spacing: var(--tracking-wide);
}

.program__venue {
  font-family: var(--font-sans);
  font-weight: 300;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  margin-top: var(--space-1);
}
</style>
