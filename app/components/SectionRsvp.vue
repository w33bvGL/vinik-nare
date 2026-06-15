<script setup lang="ts">
import { wedding } from '~/data/wedding'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const state = ref<FormState>('idle')
const attendance = ref<'yes' | 'no' | null>(null)
const name = ref('')
const guests = ref(1)
const wish = ref('')
const errorMsg = ref('')

const isSubmitting = computed(() => state.value === 'submitting')
const isSuccess    = computed(() => state.value === 'success')

function canSubmit() {
  return attendance.value !== null && name.value.trim().length >= 2
}

async function submit() {
  if (!canSubmit()) return
  state.value = 'submitting'
  errorMsg.value = ''

  try {
    const body = {
      attendance: attendance.value,
      name: name.value.trim(),
      guests: guests.value,
      wish: wish.value.trim(),
    }

    if (wedding.rsvpEndpoint) {
      const res = await fetch(wedding.rsvpEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Ошибка сети')
    } else {
      // No endpoint configured yet — simulate success after delay
      await new Promise((r) => setTimeout(r, 1200))
    }

    state.value = 'success'
  } catch {
    state.value = 'error'
    errorMsg.value = 'Что-то пошло не так. Попробуйте ещё раз.'
  }
}
</script>

<template>
  <section class="section rsvp" aria-labelledby="rsvp-heading">
    <div class="container">

      <AppDivider variant="full" />

      <div class="rsvp__inner">

        <!-- Success state -->
        <Transition name="fade" mode="out-in">
          <div v-if="isSuccess" class="rsvp__success" aria-live="polite">
            <WaxSeal :size="64" class="rsvp__success-seal" />
            <p class="rsvp__success-heading">Ответ принят</p>
            <p class="rsvp__success-text">
              Спасибо! Мы рады, что вы будете рядом.
            </p>
          </div>

          <!-- Form state -->
          <form v-else class="rsvp__form" @submit.prevent="submit" novalidate>

            <p id="rsvp-heading" class="rsvp__label reveal" style="transition-delay: 0ms">
              Подтверждение присутствия
            </p>

            <p class="rsvp__meta reveal" style="transition-delay: 60ms">
              Пожалуйста, дайте знать до {{ wedding.rsvpDeadline }}
            </p>

            <!-- Attendance radio -->
            <div class="rsvp__attendance reveal" style="transition-delay: 120ms" role="group" aria-label="Присутствие">
              <button
                type="button"
                class="rsvp__pill"
                :class="{ 'rsvp__pill--selected': attendance === 'yes' }"
                @click="attendance = 'yes'"
              >
                Буду
              </button>
              <button
                type="button"
                class="rsvp__pill"
                :class="{ 'rsvp__pill--selected': attendance === 'no' }"
                @click="attendance = 'no'"
              >
                Не смогу
              </button>
            </div>

            <!-- Name -->
            <div class="rsvp__field reveal" style="transition-delay: 180ms">
              <input
                v-model="name"
                class="rsvp__input"
                type="text"
                placeholder="Ваше имя"
                autocomplete="name"
                required
                minlength="2"
                :disabled="isSubmitting"
              />
            </div>

            <!-- Guests (show only if attending) -->
            <Transition name="slide">
              <div v-if="attendance === 'yes'" class="rsvp__field">
                <input
                  v-model.number="guests"
                  class="rsvp__input"
                  type="number"
                  placeholder="Количество гостей"
                  min="1"
                  max="5"
                  :disabled="isSubmitting"
                />
              </div>
            </Transition>

            <!-- Wish -->
            <div class="rsvp__field reveal" style="transition-delay: 240ms">
              <textarea
                v-model="wish"
                class="rsvp__input rsvp__textarea"
                placeholder="Пожелание паре (необязательно)"
                rows="3"
                maxlength="400"
                :disabled="isSubmitting"
              />
            </div>

            <!-- Error -->
            <p v-if="state === 'error'" class="rsvp__error" role="alert">
              {{ errorMsg }}
            </p>

            <!-- Submit -->
            <div class="rsvp__actions reveal" style="transition-delay: 300ms">
              <button
                type="submit"
                class="rsvp__submit"
                :disabled="isSubmitting || !canSubmit()"
              >
                <span v-if="!isSubmitting">Отправить</span>
                <span v-else class="rsvp__spinner" aria-label="Отправка..." />
              </button>
            </div>

          </form>
        </Transition>

      </div>

      <AppDivider variant="full" />

    </div>
  </section>
</template>

<style scoped>
.rsvp__inner {
  padding-block: var(--space-8);
  max-width: 440px;
  margin-inline: auto;
}

/* ── Labels / meta ── */
.rsvp__label {
  font-family: var(--font-sc);
  font-size: var(--text-xl);
  font-weight: 300;
  letter-spacing: var(--tracking-widest);
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--space-2);
}

.rsvp__meta {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-align: center;
  margin-bottom: var(--space-6);
}

/* ── Form layout ── */
.rsvp__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ── Attendance pills ── */
.rsvp__attendance {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
}

.rsvp__pill {
  flex: 1;
  max-width: 160px;
  padding: 10px 20px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--color-accent);
  background: transparent;
  border: 1px solid var(--color-accent);
  cursor: pointer;
  transition:
    background var(--dur-default) var(--ease-gentle),
    color var(--dur-default) var(--ease-gentle);
}

.rsvp__pill:hover {
  background: var(--color-hover-fill);
}

.rsvp__pill--selected {
  background: var(--squirrel-900);
  color: var(--squirrel-50);
  border-color: var(--squirrel-900);
}

.rsvp__pill:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

/* ── Underline inputs ── */
.rsvp__field {
  display: flex;
  flex-direction: column;
}

.rsvp__input {
  width: 100%;
  padding: 12px 0;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 300;
  color: var(--color-text);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-divider);
  outline: none;
  letter-spacing: var(--tracking-wide);
  resize: none;
  transition: border-color var(--dur-default) var(--ease-gentle);
  -moz-appearance: textfield;
}

.rsvp__input::-webkit-inner-spin-button,
.rsvp__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.rsvp__input::placeholder {
  color: var(--color-text-secondary);
}

.rsvp__input:focus {
  border-bottom-color: var(--color-accent);
}

.rsvp__input:focus::placeholder {
  opacity: 0;
  transition: opacity var(--dur-fast) ease;
}

.rsvp__input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.rsvp__textarea {
  line-height: var(--leading-relaxed);
}

/* ── Error ── */
.rsvp__error {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--color-accent);
  letter-spacing: var(--tracking-wide);
}

/* ── Submit button ── */
.rsvp__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-2);
}

.rsvp__submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  padding: 14px 40px;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  color: var(--squirrel-50);
  background: var(--squirrel-900);
  border: 1px solid var(--squirrel-900);
  cursor: pointer;
  transition:
    background var(--dur-default) var(--ease-gentle),
    opacity var(--dur-default) ease;
}

.rsvp__submit:hover:not(:disabled) {
  background: var(--squirrel-800);
  border-color: var(--squirrel-800);
}

.rsvp__submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.rsvp__submit:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}

/* Loading spinner */
.rsvp__spinner {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid rgba(251, 251, 248, 0.3);
  border-top-color: var(--squirrel-50);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Success state ── */
.rsvp__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding-block: var(--space-4);
}

.rsvp__success-seal {
  animation: sealReveal 700ms var(--ease-spring) both;
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

@keyframes sealReveal {
  from { opacity: 0; transform: scale(0.5) rotate(-8deg); }
  to   { opacity: 1; transform: scale(1) rotate(0deg); }
}

/* ── Transitions ── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--dur-slow) var(--ease-gentle);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition:
    opacity var(--dur-default) var(--ease-gentle),
    transform var(--dur-default) var(--ease-gentle),
    max-height var(--dur-default) var(--ease-gentle);
  overflow: hidden;
  max-height: 80px;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
}
</style>
