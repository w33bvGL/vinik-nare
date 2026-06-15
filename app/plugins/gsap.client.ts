import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin({
  name: 'gsap',
  dependsOn: ['lenis'],
  setup(nuxtApp) {
    gsap.registerPlugin(ScrollTrigger)

    nuxtApp.hook('app:mounted', () => {
      const lenis = (nuxtApp as any).$lenis

      if (lenis) {
        lenis.on('scroll', () => ScrollTrigger.update())

        ScrollTrigger.addEventListener('refreshInit', () => lenis.resize())
      }

      ScrollTrigger.refresh()
    })

    return {
      provide: { gsap, ScrollTrigger },
    }
  },
})
