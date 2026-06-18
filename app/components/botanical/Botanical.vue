<script setup lang="ts">
import { buildSprigs, VIEW, type BotanicalVariant } from './geometry'
import { useBotanicalMotion, type BotanicalMotionOptions } from '~/composables/useBotanicalMotion'

const props = withDefaults(defineProps<{
  variant?: BotanicalVariant
  flip?: boolean
  density?: number
  animate?: boolean
  draw?: boolean
  reveal?: boolean
  sway?: boolean
  /** Scroll-linked leaf drift (`true` ≈ scrub 1, or a number for the lag). */
  scrub?: boolean | number
  /** Whole-SVG vertical parallax in px across the scroll range. */
  parallax?: number
  /** Hold before the draw/reveal intro begins (seconds). */
  delay?: number
}>(), {
  variant: 'sprig',
  flip: false,
  density: 1,
  animate: false,
  draw: true,
  reveal: true,
  sway: true,
  scrub: false,
  parallax: 0,
  delay: 0,
})

const svgRef = ref<SVGSVGElement | null>(null)
const sprigs = computed(() => buildSprigs(props.variant, props.density))

if (props.animate) {
  const motion: BotanicalMotionOptions = {
    draw: props.draw,
    reveal: props.reveal,
    sway: props.sway,
    scrub: props.scrub,
    parallax: props.parallax,
    delay: props.delay,
  }
  useBotanicalMotion(svgRef, motion)
}
</script>

<template>
  <svg
      ref="svgRef"
      class="botanical"
      :class="{ 'botanical--flip': flip, 'botanical--animated': animate }"
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
        <path v-if="s.stem" :d="s.stem" pathLength="1" class="botanical__stem" />
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
      <path d="M100 108 C92 108 86 102 86 94 C86 86 92 80 100 80 C108 80 114 86 114 94 C114 103 107 110 98 110" pathLength="1" class="botanical__stem" />
      <path d="M100 120 C84 120 74 108 74 92 C74 75 87 64 102 64 C118 64 130 77 130 93 C130 112 115 124 96 124" pathLength="1" class="botanical__stem" />
      <path d="M100 134 C76 134 60 117 60 92 C60 67 80 50 104 50 C129 50 146 71 146 94 C146 122 122 138 94 138" pathLength="1" class="botanical__stem" />
      <path d="M95 96 C97 92 102 91 105 94" class="botanical__vein" />
      <g class="botanical__leaf">
        <ellipse cx="58" cy="120" rx="15" ry="6" transform="rotate(38 58 120)" />
      </g>
      <g class="botanical__leaf">
        <ellipse cx="146" cy="118" rx="15" ry="6" transform="rotate(-38 146 118)" />
      </g>
      <path d="M100 138 L100 176" pathLength="1" class="botanical__stem" />
    </g>
  </svg>
</template>

<style scoped>
.botanical {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible; /* leaves at the edges aren't clipped by the SVG box */
}
.botanical--flip { transform: scaleX(-1); }

.botanical__stem { stroke-width: 1.1; }
.botanical__leaf {
  /* rotate / scale each leaf around its own centre for GSAP sway & pop-in */
  transform-box: fill-box;
  transform-origin: center;
}
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
