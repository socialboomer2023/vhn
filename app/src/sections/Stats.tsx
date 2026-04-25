import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 500, suffix: 'K+', label: 'Miles Driven Monthly' },
  { value: 98.5, suffix: '%', label: 'On-Time Delivery Rate', isDecimal: true },
  { value: 24, suffix: '/7', label: 'Dispatch & Tracking' },
  { value: 50, suffix: '+', label: 'Qualified Carrier Partners' },
]

function AnimatedCounter({ target, suffix, isDecimal, inView }: { target: number; suffix: string; isDecimal?: boolean; inView: boolean }) {
  const [count, setCount] = useState(0)
  const countRef = useRef({ val: 0 })

  useEffect(() => {
    if (!inView) return
    const obj = countRef.current
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(isDecimal ? parseFloat(obj.val.toFixed(1)) : Math.floor(obj.val))
      },
    })
  }, [inView, target, isDecimal])

  return (
    <span className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-white">
      {count}{suffix}
    </span>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => setInView(true),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-obsidian border-y border-graphite py-20 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
                inView={inView}
              />
              <p className="mt-3 font-body text-sm text-silver uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
