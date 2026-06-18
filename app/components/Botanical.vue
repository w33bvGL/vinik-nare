<script setup lang="ts">
import { computed } from 'vue'

/**
 * Botanical — hand-grown line-art sprigs & blooms.
 *
 * Decorative only (aria-hidden). Draws in `currentColor`, so colour and
 * opacity are controlled entirely from the parent via CSS. Leaves are sampled
 * along a cubic Bézier so every sprig reads as organic rather than tiled.
 *
 * Variants:
 * sprig  — a slender single stem (dividers, inline accents)
 * spray  — a fuller corner spray (section corners)
 * branch — a long, gentle horizontal branch (full-width dividers)
 * rose   — a single line-drawn bloom with a leaf or two
 */
type Variant = 'sprig' | 'spray' | 'branch' | 'rose'

const props = withDefaults(defineProps<{
  variant?: Variant
  /** Mirror horizontally — handy for opposing corners. */
  flip?: boolean
  /** Leaf density multiplier (1 = default). */
  density?: number
}>(), {
  variant: 'sprig',
  flip: false,
  density: 1,
})

interface Curve { p0: [number, number]; p1: [number, number]; p2: [number, number]; p3: [number, number] }
interface Leaf { cx: number; cy: number; rx: number; ry: number; angle: number; vein: string }

const VIEW = 200

function cubic(c: Curve, t: number): [number, number] {
  const mt = 1 - t
  const a = mt * mt * mt, b = 3 * mt * mt * t, d = 3 * mt * t * t, e = t * t * t
  return [
    a * c.p0[0] + b * c.p1[0] + d * c.p2[0] + e * c.p3[0],
    a * c.p0[1] + b * c.p1[1] + d * c.p2[1] + e * c.p3[1],
  ]
}

function tangentAngle(c: Curve, t: number): number {
  const mt = 1 - t
  const dx = 3 * mt * mt * (c.p1[0] - c.p0[0]) + 6 * mt * t * (c.p2[0] - c.p1[0]) + 3 * t * t * (c.p3[0] - c.p2[0])
  const dy = 3 * mt * mt * (c.p1[1] - c.p0[1]) + 6 * mt * t * (c.p2[1] - c.p1[1]) + 3 * t * t * (c.p3[1] - c.p2[1])
  return Math.atan2(dy, dx) * (180 / Math.PI)
}

function stemPath(c: Curve): string {
  return `M ${c.p0[0]} ${c.p0[1]} C ${c.p1[0]} ${c.p1[1]}, ${c.p2[0]} ${c.p2[1]}, ${c.p3[0]} ${c.p3[1]}`
}

function growLeaves(c: Curve, opts: { count: number; rx: number; ry: number; spread: number; tStart?: number; tEnd?: number }): Leaf[] {
  const { count, rx, ry, spread } = opts
  const tStart = opts.tStart ?? 0.16
  const tEnd = opts.tEnd ?? 0.96
  const leaves: Leaf[] = []
  for (let i = 0; i < count; i++) {
    const t = tStart + (tEnd - tStart) * (count === 1 ? 0.5 : i / (count - 1))
    const [px, py] = cubic(c, t)
    const ang = tangentAngle(c, t)
    const side = i % 2 === 0 ? 1 : -1
    const rad = (ang + 90 * side) * (Math.PI / 180)
    // taper: leaves shrink toward the growing tip
    const scale = 0.55 + 0.45 * (1 - t)
    const lrx = rx * scale, lry = ry * scale
    const off = (lry + 2) * 0.92
    const cx = px + Math.cos(rad) * off
    const cy = py + Math.sin(rad) * off
    const leafAngle = ang + spread * side
    // central vein along the leaf's long axis
    const veinHalf = lrx * 0.82
    const vr = leafAngle * (Math.PI / 180)
    const vx = Math.cos(vr) * veinHalf, vy = Math.sin(vr) * veinHalf
    leaves.push({
      cx, cy, rx: lrx, ry: lry, angle: leafAngle,
      vein: `M ${(cx - vx).toFixed(1)} ${(cy - vy).toFixed(1)} L ${(cx + vx).toFixed(1)} ${(cy + vy).toFixed(1)}`,
    })
  }
  return leaves
}

const sprigs = computed<{ stem: string; leaves: Leaf[]; berries?: [number, number, number][] }[]>(() => {
  const d = props.density
  const n = (base: number) => Math.max(2, Math.round(base * d))

  switch (props.variant) {
    case 'spray': {
      // Корректный стык: p0 обеих веток жестко сидит в углу [0, 200]
      // Концы веток (p3) доходят ровно до правого [200, 35] и верхнего [105, 0] краев.
      const main: Curve = { p0: [0, 200], p1: [50, 150], p2: [140, 110], p3: [200, 35] }
      const second: Curve = { p0: [0, 200], p1: [35, 120], p2: [70, 65], p3: [105, 0] }
      // Смещение ягод под новые крайние точки веток
      const berries: [number, number, number][] = [
        [196, 39, 3.4], [188, 53, 2.6], [204, 27, 2.4],
        [105, 2, 3], [97, 14, 2.3]
      ]
      return [
        { stem: stemPath(main), leaves: growLeaves(main, { count: n(7), rx: 16, ry: 6.4, spread: 26 }) },
        { stem: stemPath(second), leaves: growLeaves(second, { count: n(5), rx: 13, ry: 5.2, spread: 30 }) },
        { stem: '', leaves: [], berries },
      ]
    }
    case 'branch': {
      // Для горизонтального разделителя: растягиваем строго от X=0 до X=200
      const c: Curve = { p0: [0, 112], p1: [70, 78], p2: [130, 78], p3: [200, 112] }
      return [{ stem: stemPath(c), leaves: growLeaves(c, { count: n(9), rx: 14, ry: 5.6, spread: 24, tStart: 0.08, tEnd: 0.92 }) }]
    }
    case 'rose':
      return [] // роза рисуется из статики ниже
    case 'sprig':
    default: {
      // Одиночная ветка: от самого низа Y=200 до самого верха Y=0
      const c: Curve = { p0: [100, 200], p1: [96, 132], p2: [104, 78], p3: [100, 0] }
      return [{ stem: stemPath(c), leaves: growLeaves(c, { count: n(8), rx: 15, ry: 6, spread: 24 }) }]
    }
  }
})
</script>

<template>
  <svg
      class="botanical"
      :class="{ 'botanical--flip': flip }"
      :viewBox="`0 0 ${VIEW} ${VIEW}`"
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
  >
    <template v-if="variant !== 'rose'">
      <g v-for="(s, si) in sprigs" :key="si">
        <path v-if="s.stem" :d="s.stem" class="botanical__stem" />
        <g v-for="(leaf, li) in s.leaves" :key="li" class="botanical__leaf">
          <ellipse
              :cx="leaf.cx.toFixed(1)"
              :cy="leaf.cy.toFixed(1)"
              :rx="leaf.rx.toFixed(1)"
              :ry="leaf.ry.toFixed(1)"
              :transform="`rotate(${leaf.angle.toFixed(1)} ${leaf.cx.toFixed(1)} ${leaf.cy.toFixed(1)})`"
          />
          <path :d="leaf.vein" class="botanical__vein" />
        </g>
        <circle
            v-for="(b, bi) in s.berries ?? []"
            :key="`b${bi}`"
            :cx="b[0]" :cy="b[1]" :r="b[2]"
            class="botanical__berry"
        />
      </g>
    </template>

    <g v-else class="botanical__rose">
      <path d="M100 108 C92 108 86 102 86 94 C86 86 92 80 100 80 C108 80 114 86 114 94 C114 103 107 110 98 110" class="botanical__stem" />
      <path d="M100 120 C84 120 74 108 74 92 C74 75 87 64 102 64 C118 64 130 77 130 93 C130 112 115 124 96 124" class="botanical__stem" />
      <path d="M100 134 C76 134 60 117 60 92 C60 67 80 50 104 50 C129 50 146 71 146 94 C146 122 122 138 94 138" class="botanical__stem" />
      <path d="M95 96 C97 92 102 91 105 94" class="botanical__vein" />
      <ellipse cx="58" cy="120" rx="15" ry="6" transform="rotate(38 58 120)" />
      <ellipse cx="146" cy="118" rx="15" ry="6" transform="rotate(-38 146 118)" />
      <path d="M100 138 L100 176" class="botanical__stem" />
    </g>
  </svg>
</template>

<style scoped>
.botanical {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible; /* Листья у краев не будут обрезаться самим SVG */
}
.botanical--flip { transform: scaleX(-1); }

.botanical__stem { stroke-width: 1.1; }
.botanical__leaf ellipse {
  stroke-width: 1;
  fill: none;
}
.botanical__vein {
  stroke-width: 0.7;
  opacity: 0.7;
}
.botanical__berry {
  fill: currentColor;
  stroke: none;
  opacity: 0.85;
}
.botanical__rose ellipse {
  stroke-width: 1;
  fill: none;
}
</style>