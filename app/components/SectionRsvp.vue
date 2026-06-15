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
  <section ref="rootRef" class="section rsvp" aria-labelledby="rsvp-heading">
    <div class="container">

      <UiDivider variant="full" />

      <div class="rsvp__body">
        <Transition name="fade" mode="out-in">

          <!-- Success -->
          <div v-if="isSuccess" class="rsvp__success" aria-live="polite">
            <WaxSeal :size="64" class="rsvp__seal" />
            <p class="rsvp__success-heading">{{ t('rsvp.successHeading') }}</p>
            <p class="rsvp__success-text">{{ t('rsvp.successText') }}</p>
          </div>

          <!-- Form -->
          <form v-else class="rsvp__form" novalidate @submit.prevent="submit">

            <div class="rsvp__header" data-gsap>
              <p id="rsvp-heading" class="rsvp__label">
                {{ t('rsvp.label') }}
              </p>
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
              <input
                id="rsvp-name"
                v-model="name"
                class="rsvp__input"
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
                <input
                  id="rsvp-guests"
                  v-model.number="guests"
                  class="rsvp__input"
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
              <textarea
                id="rsvp-wish"
                v-model="wish"
                class="rsvp__input rsvp__textarea"
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

      <UiDivider variant="full" />

    </div>
  </section>
</template>

<style scoped>
.rsvp__body {
  margin-inline: auto;
  margin-block: var(--space-8);
  border: 0.5px solid var(--color-divider);
  padding: var(--space-6) var(--space-4);
}

@media (min-width: 480px) {
  .rsvp__body { padding: var(--space-6); }
}

/* Header block */
.rsvp__header { text-align: center; margin-bottom: var(--space-6); }

.rsvp__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

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

/* Native inputs (used via slot in UiFormField) */
.rsvp__input {
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
  resize: none;
  transition: border-color var(--dur-default) var(--ease-gentle);
  -moz-appearance: textfield;
}
.rsvp__input::-webkit-inner-spin-button,
.rsvp__input::-webkit-outer-spin-button { -webkit-appearance: none; }
.rsvp__input::placeholder { color: var(--color-text-disabled); }
.rsvp__input:focus { border-bottom-color: var(--color-text-heading); }
.rsvp__input:focus::placeholder { opacity: 0; transition: opacity var(--dur-fast) ease; }
.rsvp__input:disabled { opacity: 0.5; cursor: not-allowed; }
.rsvp__textarea { line-height: var(--leading-relaxed); }

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

/* Success */
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

/* Transitions */
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
