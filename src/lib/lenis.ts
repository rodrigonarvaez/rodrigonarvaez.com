import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null
let rafId: number | null = null

export function initLenis(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  lenis = new Lenis()

  lenis.on('scroll', () => ScrollTrigger.update())

  function raf(time: number): void {
    lenis!.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
}

export function destroyLenis(): void {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}
