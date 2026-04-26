import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const leftWords = ['POWER', 'INNOVATION', 'RELIABILITY', 'CAPACITY', 'EXCELLENCE']
const rightWords = ['CAPACITY', 'TECHNOLOGY', 'SAFETY', 'SCALE', 'TRUST']

export default function ScrollText() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const rightRefs = useRef<(HTMLHeadingElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([...leftRefs.current, ...rightRefs.current], {
        opacity: 0,
        rotationX: -90,
        y: '100%',
        z: '-200px',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      })

      // Animate left words
      leftRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          opacity: 1,
          rotationX: 0,
          y: '0%',
          z: '0px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          },
        })
      })

      // Animate right words
      rightRefs.current.forEach((el) => {
        if (!el) return
        gsap.to(el, {
          opacity: 1,
          rotationX: 0,
          y: '0%',
          z: '0px',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 35%',
            scrub: 1,
          },
        })
      })

      // Image crossfade based on scroll progress
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          const activeIndex = Math.min(Math.floor(progress * 3), 2)
          imageRefs.current.forEach((img, i) => {
            if (img) {
              img.style.opacity = i === activeIndex ? '1' : '0'
            }
          })
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-obsidian py-20 lg:py-0 lg:h-[300vh]">
      <div className="lg:sticky lg:top-0 lg:h-screen w-full max-w-[100vw] flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0 px-4 overflow-hidden">
        {/* Left Words */}
        <div className="flex-1 flex flex-col items-center lg:items-end lg:pr-8 z-10" style={{ perspective: 1000 }}>
          {leftWords.map((word, i) => (
            <h2
              key={`left-${i}`}
              ref={(el) => { leftRefs.current[i] = el }}
              className="font-display font-bold text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5vw] text-white uppercase leading-tight break-words mb-[6vh] lg:mb-[10vh] text-center lg:text-right px-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </h2>
          ))}
        </div>

        {/* Center Images */}
        <div className="hidden lg:block w-[20vw] max-w-[280px] aspect-[3/4] relative overflow-hidden rounded-sm mx-8">
          <img
            ref={(el) => { imageRefs.current[0] = el }}
            src="/truck-detail-1.jpg"
            alt="Truck detail"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          />
          <img
            ref={(el) => { imageRefs.current[1] = el }}
            src="/truck-detail-2.jpg"
            alt="Driver perspective"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
          />
          <img
            ref={(el) => { imageRefs.current[2] = el }}
            src="/truck-detail-3.jpg"
            alt="Trailer coupling"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0"
          />
        </div>

        {/* Right Words */}
        <div className="flex-1 flex flex-col items-center lg:items-start lg:pl-8 z-10" style={{ perspective: 1000 }}>
          {rightWords.map((word, i) => (
            <h2
              key={`right-${i}`}
              ref={(el) => { rightRefs.current[i] = el }}
              className="font-display font-bold text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5vw] text-white uppercase leading-tight break-words mb-[6vh] lg:mb-[10vh] text-center lg:text-left px-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {word}
            </h2>
          ))}
        </div>
      </div>
    </section>
  )
}
