<script setup lang="ts">
defineProps<{
  size?: number
  interactive?: boolean
}>()
</script>

<template>
  <div
    class="seal"
    :class="{ 'seal--interactive': interactive }"
    :style="{ width: `${size ?? 80}px`, height: `${size ?? 80}px` }"
    role="img"
    aria-label="Сургучная печать В & Н"
  >
    <svg
      :viewBox="`0 0 80 80`"
      :width="size ?? 80"
      :height="size ?? 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <!-- Base circle -->
      <circle cx="40" cy="40" r="38" fill="#0e0a07" />

      <!-- Outer embossed ring -->
      <circle cx="40" cy="40" r="35" fill="none" stroke="#4a4136" stroke-width="0.6" opacity="0.5" />

      <!-- Inner ring -->
      <circle cx="40" cy="40" r="28" fill="none" stroke="#4a4136" stroke-width="0.3" opacity="0.35" />

      <!-- Left botanical sprig -->
      <g opacity="0.55" stroke="#4a4136" stroke-linecap="round" fill="none">
        <path d="M 22 50 C 21 43 22 36 26 30" stroke-width="0.8" />
        <path d="M 24.5 43 C 20 41 17 38 18 34" stroke-width="0.6" />
        <path d="M 23.5 36.5 C 19 35 17 31 19 27" stroke-width="0.6" />
        <path d="M 25 30 C 21 28 20 24 22 21" stroke-width="0.5" />
      </g>

      <!-- Right botanical sprig (mirrored) -->
      <g opacity="0.55" stroke="#4a4136" stroke-linecap="round" fill="none">
        <path d="M 58 50 C 59 43 58 36 54 30" stroke-width="0.8" />
        <path d="M 55.5 43 C 60 41 63 38 62 34" stroke-width="0.6" />
        <path d="M 56.5 36.5 C 61 35 63 31 61 27" stroke-width="0.6" />
        <path d="M 55 30 C 59 28 60 24 58 21" stroke-width="0.5" />
      </g>

      <!-- Initials -->
      <text
        x="40"
        y="47"
        text-anchor="middle"
        font-family="'Cormorant Garamond', Georgia, serif"
        font-style="italic"
        font-weight="300"
        font-size="15"
        fill="#4a4136"
        opacity="0.80"
        letter-spacing="1"
      >В &amp; Н</text>

      <!-- Top-left highlight (3D emboss) -->
      <path
        d="M 14 30 A 28 28 0 0 1 40 13"
        stroke="#917e6e"
        stroke-width="0.5"
        fill="none"
        opacity="0.28"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.seal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: var(--shadow-seal);
  flex-shrink: 0;
}

.seal--interactive {
  cursor: pointer;
  transition:
    transform var(--dur-fast) var(--ease-spring),
    box-shadow var(--dur-fast) var(--ease-gentle);
  will-change: transform;
}

.seal--interactive:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(14, 10, 7, 0.30), 0 2px 6px rgba(14, 10, 7, 0.15);
}

.seal--interactive:active {
  transform: scale(0.95);
  box-shadow: 0 2px 8px rgba(14, 10, 7, 0.18), 0 1px 2px rgba(14, 10, 7, 0.10);
  transition-duration: var(--dur-instant);
}
</style>
