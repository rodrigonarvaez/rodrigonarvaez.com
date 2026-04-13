import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function heroReveal(container: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline()
  const children = Array.from(container.children) as HTMLElement[]

  if (prefersReducedMotion()) {
    gsap.set(children, { opacity: 1, y: 0 })
    return tl
  }

  tl.from(children, {
    opacity: 0,
    y: 40,
    duration: 1.0,
    stagger: 0.1,
    ease: 'power3.out',
  })

  return tl
}

export function revealOnScroll(
  elements: HTMLElement | HTMLElement[],
): gsap.core.Tween {
  const targets = Array.isArray(elements) ? elements : [elements]

  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 })
  }

  return gsap.from(targets, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: targets[0],
      start: 'top 80%',
    },
  })
}

export function staggerChildren(container: HTMLElement): gsap.core.Tween {
  const children = Array.from(container.children) as HTMLElement[]

  if (prefersReducedMotion()) {
    return gsap.set(children, { opacity: 1, y: 0 })
  }

  return gsap.from(children, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  })
}
