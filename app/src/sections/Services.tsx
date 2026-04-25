import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container, Truck, Boxes, MapPin, Globe, BarChart3, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Container,
    title: 'Intermodal',
    description: 'Cost-effective, sustainable rail-truck solutions. Reduce your carbon footprint while maximizing capacity.',
  },
  {
    icon: Truck,
    title: 'Truckload (FTL)',
    description: 'Full truckload shipping with flexible scheduling, dedicated lanes, and real-time visibility.',
  },
  {
    icon: Boxes,
    title: 'Less-Than-Truckload (LTL)',
    description: 'Economical partial shipments with nationwide coverage and streamlined consolidation.',
  },
  {
    icon: MapPin,
    title: 'Dedicated Contract Services',
    description: 'Private fleet outsourcing with guaranteed capacity, optimized routes, and professional drivers.',
  },
  {
    icon: Globe,
    title: 'Final Mile Delivery',
    description: 'White-glove home and jobsite delivery. Installation, assembly, and debris removal available.',
  },
  {
    icon: BarChart3,
    title: 'Freight Brokerage',
    description: 'Access thousands of qualified carriers through our managed capacity network.',
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="bg-charcoal py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] text-industrial-amber uppercase">
            What We Move
          </span>
          <h2 className="font-display font-medium text-4xl md:text-5xl text-white uppercase mt-4 tracking-wide">
            Multimodal Solutions
          </h2>
          <p className="mt-4 text-frost max-w-2xl mx-auto leading-relaxed">
            From the first mile to the final mile, we architect the right solution for every shipment.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group bg-obsidian border border-graphite p-8 rounded-sm hover:border-industrial-amber hover:-translate-y-1 transition-all duration-300"
              >
                <Icon
                  size={48}
                  strokeWidth={1.5}
                  className="text-industrial-amber mb-6 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="font-body font-semibold text-xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-industrial-amber text-sm font-medium group-hover:underline">
                  Learn More <ArrowRight size={14} />
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
