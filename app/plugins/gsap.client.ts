import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin({
  name: 'gsap',
  dependsOn: ['lenis'],
  setup(nuxtApp) {
    gsap.registerPlugin(ScrollTrigger)

    nuxtApp.hook('app:mounted', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const lenis = (nuxtApp as any).$lenis

      if (lenis) {
        // Keep ScrollTrigger in sync with Lenis virtual scroll position
        lenis.on('scroll', () => ScrollTrigger.update())

        // Ensure resize events propagate to ScrollTrigger
        ScrollTrigger.addEventListener('refreshInit', () => lenis.resize())
      }

      ScrollTrigger.refresh()
    })

    return {
      provide: { gsap, ScrollTrigger },
    }
  },
})
