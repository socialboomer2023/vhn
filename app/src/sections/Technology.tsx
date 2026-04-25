import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'Instant quoting and booking',
  'Real-time GPS tracking',
  'Automated document management',
  'API & EDI integrations',
  'Performance analytics',
]

export default function Technology() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.from(leftRef.current, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })
      }
      if (rightRef.current) {
        gsap.from(rightRef.current, {
          x: 50,
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="technology" ref={sectionRef} className="bg-charcoal py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div ref={leftRef} className="flex-1 lg:max-w-[55%]">
            <span className="font-mono text-xs tracking-[0.2em] text-industrial-amber uppercase">
              Technology
            </span>
            <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white uppercase mt-4 tracking-wide leading-tight">
              Ship Smarter With VHN 360
            </h2>
            <p className="mt-6 text-frost leading-relaxed max-w-lg">
              Our proprietary platform connects shippers and carriers in real-time. Quote, book, track, and manage every shipment from one dashboard. No middlemen. No guesswork.
            </p>

            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-industrial-amber/20 flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-industrial-amber" />
                  </div>
                  <span className="text-frost text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToContact}
              className="mt-8 bg-industrial-amber text-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-wider hover:glow-amber transition-all duration-300 inline-flex items-center gap-2"
            >
              Request Demo <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Image */}
          <div ref={rightRef} className="flex-1 w-full lg:max-w-[45%]">
            <div className="relative rounded-sm overflow-hidden border border-graphite">
              <img
                src="/dashboard-mockup.jpg"
                alt="VHN 360 Dashboard"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
