import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    tl.from(labelRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      .from(headlineRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .from(subRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    return () => { tl.kill() }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-obsidian">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/70 to-obsidian/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <span
          ref={labelRef}
          className="font-mono text-xs tracking-[0.2em] text-silver uppercase mb-6"
        >
          Nationwide Logistics & Transportation
        </span>

        <h1
          ref={headlineRef}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white uppercase tracking-wide max-w-5xl leading-[0.95]"
        >
          Driving American Business Forward
        </h1>

        <p
          ref={subRef}
          className="mt-6 text-frost text-base md:text-lg max-w-xl leading-relaxed"
        >
          End-to-end freight solutions. From intermodal to final mile, we deliver with precision, safety, and relentless reliability.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-industrial-amber text-white px-8 py-4 font-body text-sm font-semibold uppercase tracking-wider hover:glow-amber transition-all duration-300"
          >
            Get a Quote
          </button>
          <button
            onClick={() => scrollTo('#services')}
            className="border border-industrial-amber text-industrial-amber px-8 py-4 font-body text-sm font-semibold uppercase tracking-wider hover:bg-industrial-amber hover:text-white transition-all duration-300"
          >
            Explore Services
          </button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 left-6 right-6 z-10 flex justify-between items-end">
        <span className="font-mono text-xs text-silver tracking-wider">
          VHN SERVICES LLC | DOT Certified
        </span>
        <button
          onClick={() => scrollTo('#services')}
          className="text-silver hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </div>
    </section>
  )
}
