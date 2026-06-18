
import type { Ref } from 'vue'

export interface BotanicalMotionOptions {
  draw?: boolean
  reveal?: boolean
  sway?: boolean
  scrub?: boolean | number
  parallax?: number
  trigger?: HTMLElement | null
  start?: string
  delay?: number
}

export function useBotanicalMotion(
  target: Ref<SVGSVGElement | null>,
  options: BotanicalMotionOptions = {},
) {
  if (import.meta.server) return

  let ctx: gsap.core.Context | null = null

  onMounted(() => {
    const svg = target.value
    if (!svg) return

    const { $gsap } = useNuxtApp() as any
    if (!$gsap) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const {
      draw = true,
      reveal = true,
      sway = true,
      scrub = false,
      parallax = 0,
      trigger = svg,
      start = 'top 88%',
      delay = 0,
    } = options

    ctx = $gsap.context(() => {
      const stems = svg.querySelectorAll<SVGPathElement>('.botanical__stem')
      const leaves = svg.querySelectorAll<SVGGElement>('.botanical__leaf')
      const accents = svg.querySelectorAll<SVGElement>('.botanical__berry, .botanical__vein')

      if (reduce) {
        $gsap.set([...stems, ...leaves, ...accents], { opacity: 1, scale: 1, clearProps: 'strokeDashoffset' })
        return
      }

      const intro = $gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay,
        scrollTrigger: { trigger, start, once: true },
      })

      if (draw && stems.length) {
        $gsap.set(stems, { strokeDasharray: 1, strokeDashoffset: 1 })
        intro.to(stems, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          stagger: 0.18,
        }, 0)
      }

      if (reveal && leaves.length) {
        $gsap.set(leaves, { opacity: 0, scale: 0, transformOrigin: 'center center' })
        intro.to(leaves, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: { each: 0.05, from: 'start' },
        }, draw ? 0.35 : 0)
      }

      if (reveal && accents.length) {
        $gsap.set(accents, { opacity: 0 })
        intro.to(accents, { opacity: 1, duration: 0.6, stagger: 0.04 }, '>-0.3')
      }

      if (sway && leaves.length) {
        leaves.forEach((leaf, i) => {
          const amp = 1.6 + (i % 3) * 0.9
          const dur = 2.6 + (i % 5) * 0.4
          $gsap.to(leaf, {
            rotation: i % 2 ? amp : -amp,
            transformOrigin: 'center center',
            duration: dur,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: (i % 7) * 0.18,
          })
        })
      }

      if (scrub && leaves.length) {
        const lag = typeof scrub === 'number' ? scrub : 1
        leaves.forEach((leaf, i) => {
          const dir = i % 2 ? 1 : -1
          $gsap.to(leaf, {
            rotation: `+=${dir * (6 + (i % 4) * 3)}`,
            ease: 'none',
            scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: lag },
          })
        })
      }

      if (parallax) {
        $gsap.to(svg, {
          yPercent: parallax,
          ease: 'none',
          scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      }
    }, svg)
  })

  onUnmounted(() => ctx?.revert())
}
