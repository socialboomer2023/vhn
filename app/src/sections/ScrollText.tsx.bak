import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const leftWords = ['POWER', 'INNOVATION', 'RELIABILITY', 'CAPACITY', 'EXCELLENCE']
const rightWords = ['CAPACITY', 'TECHNOLOGY', 'SAFETY', 'SCALE', 'TRUST']

export default function ScrollText() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRefs = useRef<(HTMLDivElement | null)[]>([])
  const rightRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const leftEl = leftRefs.current[0]
      const rightEl = rightRefs.current[0]

      // 🔥 NEW horizontal scroll animation
      if (leftEl && rightEl) {
        gsap.to(leftEl, {
          xPercent: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(rightEl, {
          xPercent: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // ✅ Image crossfade (unchanged)
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
    <section ref={sectionRef} className="relative bg-obsidian h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        {/* LEFT SCROLL */}
        <div className="w-1/2 overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap"
            ref={(el) => (leftRefs.current[0] = el)}
          >
            {leftWords.concat(leftWords).map((word, i) => (
              <h2
                key={`left-${i}`}
                className="font-display font-bold text-[12vw] md:text-[8vw] lg:text-[5vw] text-white uppercase"
              >
                {word}
              </h2>
            ))}
          </div>
        </div>

        {/* RIGHT SCROLL */}
        <div className="w-1/2 overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap"
            ref={(el) => (rightRefs.current[0] = el)}
          >
            {rightWords.concat(rightWords).map((word, i) => (
              <h2
                key={`right-${i}`}
                className="font-display font-bold text-[12vw] md:text-[8vw] lg:text-[5vw] text-white uppercase"
              >
                {word}
              </h2>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}