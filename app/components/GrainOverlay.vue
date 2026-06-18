<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const SIZE = 256
  canvas.width = canvas.height = SIZE

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const img = ctx.createImageData(SIZE, SIZE)
  const d   = img.data

  for (let i = 0; i < d.length; i += 4) {
    const v = (Math.random() * 255) | 0
    d[i] = d[i + 1] = d[i + 2] = v
    d[i + 3] = 255
  }

  ctx.putImageData(img, 0, 0)
})
</script>

<template>
  <canvas ref="canvasRef" class="grain" aria-hidden="true" />
</template>

<style scoped>
.grain {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.11;
  mix-blend-mode: soft-light;
}
</style>
