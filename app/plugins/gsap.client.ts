import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'
import { Flip } from 'gsap/Flip'

export default defineNuxtPlugin({
  name: 'gsap',
  dependsOn: ['lenis'],
  setup(nuxtApp) {
    gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin, Flip)

    // Honour the OS "reduce motion" preference globally.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.defaults({ duration: 0.001 })
    }

    nuxtApp.hook('app:mounted', () => {
      const lenis = (nuxtApp as any).$lenis

      if (lenis) {
        lenis.on('scroll', () => ScrollTrigger.update())

        ScrollTrigger.addEventListener('refreshInit', () => lenis.resize())
      }

      ScrollTrigger.refresh()
    })

    return {
      provide: { gsap, ScrollTrigger, Draggable, Flip },
    }
  },
})
