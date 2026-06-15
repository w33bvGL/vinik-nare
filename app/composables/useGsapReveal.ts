import type { Ref } from 'vue'

interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  delay?: number
}

export function useGsapReveal() {
  if (import.meta.server) {
    return {
      reveal: (_el: unknown, _opts?: RevealOptions) => {},
      revealGroup: (_parent: unknown, _selector: string, _opts?: RevealOptions) => {},
    }
  }

  const { $gsap } = useNuxtApp() as any
  const tweens: gsap.core.Tween[] = []

  function reveal(el: HTMLElement | Ref<HTMLElement | null> | null, opts: RevealOptions = {}) {
    const target = el && 'value' in (el as Ref) ? (el as Ref<HTMLElement | null>).value : el
    if (!target) return

    const tween = $gsap.from(target, {
      opacity: 0,
      y: opts.y ?? 32,
      duration: opts.duration ?? 0.85,
      delay: opts.delay ?? 0,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: target,
        start: opts.start ?? 'top 82%',
        once: true,
      },
    }) as gsap.core.Tween

    tweens.push(tween)
  }

  function revealGroup(
    parent: HTMLElement | Ref<HTMLElement | null> | null,
    selector: string,
    opts: RevealOptions = {},
  ) {
    const el = parent && 'value' in (parent as Ref) ? (parent as Ref<HTMLElement | null>).value : parent
    if (!el) return

    const tween = $gsap.from(el.querySelectorAll(selector), {
      opacity: 0,
      y: opts.y ?? 32,
      duration: opts.duration ?? 0.85,
      stagger: opts.stagger ?? 0.1,
      ease: 'power3.out',
      clearProps: 'all',
      scrollTrigger: {
        trigger: el,
        start: opts.start ?? 'top 78%',
        once: true,
      },
    }) as gsap.core.Tween

    tweens.push(tween)
  }

  onUnmounted(() => {
    tweens.forEach((t) => {
      t.scrollTrigger?.kill()
      t.kill()
    })
  })

  return { reveal, revealGroup }
}
