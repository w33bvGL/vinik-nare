<script setup lang="ts">
const { t } = useI18n()

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const state      = ref<FormState>('idle')
const attendance = ref<'yes' | 'no' | null>(null)
const side       = ref<'bride' | 'groom' | null>(null)
const name       = ref('')
const guests     = ref(1)
const wish       = ref('')
const errorMsg   = ref('')

const isSubmitting = computed(() => state.value === 'submitting')
const isSuccess    = computed(() => state.value === 'success')
const canSubmit    = computed(() =>
  attendance.value !== null &&
  side.value !== null &&
  name.value.trim().length >= 2,
)

const attendanceOptions = computed(() => [
  { value: 'yes', label: t('rsvp.yes') },
  { value: 'no',  label: t('rsvp.no') },
])

const sideOptions = computed(() => [
  { value: 'bride', label: t('rsvp.sideBride') },
  { value: 'groom', label: t('rsvp.sideGroom') },
])

async function submit() {
  if (!canSubmit.value) return
  state.value = 'submitting'
  errorMsg.value = ''

  try {
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        attendance: attendance.value,
        name: name.value.trim(),
        guests: guests.value,
        wish: wish.value.trim(),
        side: side.value,
      }),
    })
    if (!res.ok) throw new Error()
    state.value = 'success'
  } catch {
    state.value = 'error'
    errorMsg.value = t('rsvp.error')
  }
}

const rootRef = ref<HTMLElement | null>(null)
onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { $gsap } = useNuxtApp() as any
  if (!$gsap || !rootRef.value) return

  $gsap.from(rootRef.value.querySelectorAll('[data-gsap]'), {
    opacity: 0, y: 28,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
  })
})
</script>

<template>
  <section id="rsvp" ref="rootRef" class="section rsvp" aria-labelledby="rsvp-heading">
    <div class="container">

      <div class="rsvp__body">
        <Botanical variant="spray" animate :scrub="1" class="rsvp__corner rsvp__corner--tl" />
        <Botanical variant="spray" animate :scrub="1" :delay="0.15" class="rsvp__corner rsvp__corner--br" />
        <Transition name="fade" mode="out-in">

          <div v-if="isSuccess" class="rsvp__success" aria-live="polite">
            <p class="rsvp__success-heading">{{ t('rsvp.successHeading') }}</p>
            <p class="rsvp__success-text">{{ t('rsvp.successText') }}</p>
          </div>

          <form v-else class="rsvp__form" novalidate @submit.prevent="submit">

            <div class="rsvp__header" data-gsap>
              <UiSectionLabel id="rsvp-heading">
                {{ t('rsvp.label') }}
              </UiSectionLabel>
              <span class="rsvp__ornament" aria-hidden="true" />
              <p class="rsvp__meta">
                {{ t('rsvp.meta', { deadline: t('date.rsvpDeadline') }) }}
              </p>
            </div>

            <UiRadioGroup
              v-model="attendance"
              name="attendance"
              :legend="t('rsvp.attendLabel')"
              :options="attendanceOptions"
              :disabled="isSubmitting"
              data-gsap
            />

            <UiRadioGroup
              v-model="side"
              name="side"
              :legend="t('rsvp.sideLabel')"
              :options="sideOptions"
              :disabled="isSubmitting"
              data-gsap
            />

            <UiFormField
              :label="t('rsvp.nameLabel')"
              input-id="rsvp-name"
              data-gsap
            >
              <UiInput
                id="rsvp-name"
                v-model="name"
                type="text"
                :placeholder="t('rsvp.namePlaceholder')"
                autocomplete="name"
                required
                minlength="2"
                :disabled="isSubmitting"
              />
            </UiFormField>

            <Transition name="slide">
              <UiFormField
                v-if="attendance === 'yes'"
                :label="t('rsvp.guestsLabel')"
                input-id="rsvp-guests"
              >
                <UiInput
                  id="rsvp-guests"
                  v-model="guests"
                  type="number"
                  :placeholder="t('rsvp.guestsPlaceholder')"
                  min="1"
                  max="20"
                  :disabled="isSubmitting"
                />
              </UiFormField>
            </Transition>

            <UiFormField
              :label="t('rsvp.wishLabel')"
              input-id="rsvp-wish"
              data-gsap
            >
              <UiTextarea
                id="rsvp-wish"
                v-model="wish"
                :placeholder="t('rsvp.wishPlaceholder')"
                rows="3"
                maxlength="400"
                :disabled="isSubmitting"
              />
            </UiFormField>

            <p v-if="state === 'error'" class="rsvp__error" role="alert">
              {{ errorMsg }}
            </p>

            <div data-gsap class="rsvp__actions">
              <UiButton
                type="submit"
                variant="filled"
                size="lg"
                :loading="isSubmitting"
                :disabled="!canSubmit"
              >
                {{ t('rsvp.submit') }}
              </UiButton>
            </div>

          </form>
        </Transition>
      </div>

    </div>
  </section>
</template>

<style scoped>
.rsvp { background-color: var(--color-surface); }

.rsvp__body {
  position: relative;
  margin-inline: auto;
  margin-block: var(--space-4);
  border: 0.5px solid var(--color-divider);
  padding: var(--space-6) var(--space-4);
  overflow: hidden;
}

@media (min-width: 480px) {
  .rsvp__body { padding: var(--space-6); }
}

.rsvp__corner {
  position: absolute;
  width: clamp(90px, 18vw, 140px);
  height: auto;
  color: var(--squirrel-400);
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}
.rsvp__corner--tl { top: 0; left: 0; transform: scaleY(-1); }
.rsvp__corner--br { bottom: 0; right: 0; transform: scaleX(-1); }

.rsvp__body > :not(.rsvp__corner) { position: relative; z-index: 1; }

.rsvp__header { text-align: center; margin-bottom: var(--space-4); }

.rsvp__header :deep(.section-label) { margin-bottom: var(--space-2); }

.rsvp__ornament {
  display: block;
  width: 32px;
  height: 0.5px;
  background: var(--color-divider);
  margin: var(--space-2) auto;
}

.rsvp__meta {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
}

.rsvp__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.rsvp__error {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-accent);
  letter-spacing: var(--tracking-wide);
}

.rsvp__actions {
  display: flex;
  margin-top: var(--space-2);
}
.rsvp__actions :deep(.btn) { flex: 1; }

.rsvp__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding-block: var(--space-4);
}

.rsvp__seal { animation: sealIn 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }

@keyframes sealIn {
  from { opacity: 0; transform: scale(0.4) rotate(-10deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}

.rsvp__success-heading {
  font-family: var(--font-serif);
  font-weight: 300;
  font-size: var(--text-3xl);
  letter-spacing: var(--tracking-tighter);
  color: var(--color-text-heading);
}

.rsvp__success-text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
}

.fade-enter-active, .fade-leave-active { transition: opacity var(--dur-slow) var(--ease-gentle); }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active {
  transition: opacity var(--dur-default) var(--ease-gentle),
              transform var(--dur-default) var(--ease-gentle),
              max-height var(--dur-default) var(--ease-gentle);
  overflow: hidden;
  max-height: 80px;
}
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); max-height: 0; }
</style>
