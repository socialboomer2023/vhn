import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Clock, Headphones } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Particle {
  x: number
  y: number
  originX: number
  originY: number
  size: number
  color: string
  angle: number
  ringX: number
  ringY: number
}

export default function WhyVHN() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const isRingModeRef = useRef(false)
  const ringAngleOffsetRef = useRef(0)
  const animFrameRef = useRef(0)
  const isVisibleRef = useRef(false)

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height
    const gap = 14
    const cols = Math.floor(width / gap)
    const rows = Math.floor(height / gap)
    const centerX = width / 2
    const centerY = height / 2
    const ringRadius = Math.min(width, height) * 0.35

    const particles: Particle[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * gap + gap / 2
        const y = r * gap + gap / 2
        const angle = Math.atan2(y - centerY, x - centerX)
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * 1.5 + 1,
          color: Math.random() > 0.9 ? 'rgba(255,107,0,0.9)' : 'rgba(255,255,255,0.7)',
          angle,
          ringX: centerX + Math.cos(angle) * ringRadius,
          ringY: centerY + Math.sin(angle) * ringRadius,
        })
      }
    }
    particlesRef.current = particles
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouse = mouseRef.current
    const mouseRadius = 100
    const mouseForce = 50

    ctx.clearRect(0, 0, width, height)

    if (isRingModeRef.current) {
      ringAngleOffsetRef.current += 0.001
    }

    const particles = particlesRef.current
    const centerX = width / 2
    const centerY = height / 2
    const ringRadius = Math.min(width, height) * 0.35

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      let tx = isRingModeRef.current
        ? centerX + Math.cos(p.angle + ringAngleOffsetRef.current) * ringRadius
        : p.originX
      let ty = isRingModeRef.current
        ? centerY + Math.sin(p.angle + ringAngleOffsetRef.current) * ringRadius
        : p.originY

      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouseRadius && dist > 0) {
        const force = ((mouseRadius - dist) / mouseRadius) * mouseForce
        p.x += (dx / dist) * force
        p.y += (dy / dist) * force
      }

      p.x += (tx - p.x) * 0.08
      p.y += (ty - p.y) * 0.08

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.fill()

      // Draw faint connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const cdx = p.x - p2.x
        const cdy = p.y - p2.y
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy)
        if (cdist < 30) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - cdist / 30)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    if (isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(animate)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    initParticles()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    const handleClick = () => {
      isRingModeRef.current = !isRingModeRef.current
    }

    const handleResize = () => {
      initParticles()
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    // Intersection observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          animFrameRef.current = requestAnimationFrame(animate)
        } else {
          cancelAnimationFrame(animFrameRef.current)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    // GSAP content animation
    const ctx2 = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        })
      }
    }, sectionRef)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animFrameRef.current)
      observer.disconnect()
      ctx2.revert()
    }
  }, [initParticles, animate])

  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Safety First',
      desc: 'DOT compliant, fully insured, rigorous maintenance protocols.',
    },
    {
      icon: Clock,
      title: 'Always On Time',
      desc: '98.5% OTP rating. Real-time rerouting when conditions change.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: 'Talk to a real person, any time. No phone trees.',
    },
  ]

  return (
    <section
      id="why-vhn"
      ref={sectionRef}
      className="bg-obsidian py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Canvas */}
          <div className="flex-1 w-full h-[400px] lg:h-[600px] relative order-2 lg:order-1">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-pointer"
              style={{ touchAction: 'none' }}
            />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-silver">
              Click to morph • Move mouse to interact
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex-1 order-1 lg:order-2">
            <span className="font-mono text-xs tracking-[0.2em] text-industrial-amber uppercase">
              Why Partners Choose Us
            </span>
            <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white uppercase mt-4 tracking-wide leading-tight">
              Built Different. Built Better.
            </h2>
            <p className="mt-6 text-frost leading-relaxed">
              We're not just another trucking company. We're a technology-first logistics partner that treats your freight like our own.
            </p>
            <p className="mt-4 text-frost leading-relaxed">
              Every driver is vetted. Every route is optimized. Every delivery is tracked. From pickup to proof-of-delivery, you have complete visibility.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon
                return (
                  <div
                    key={pillar.title}
                    className="bg-charcoal border border-graphite p-5 rounded-sm hover:border-industrial-amber transition-colors duration-300"
                  >
                    <Icon size={28} className="text-industrial-amber mb-3" />
                    <h4 className="font-body font-semibold text-white text-sm mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-silver text-xs leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
