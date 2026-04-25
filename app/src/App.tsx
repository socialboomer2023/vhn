import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import ScrollText from './sections/ScrollText'
import Services from './sections/Services'
import Stats from './sections/Stats'
import Technology from './sections/Technology'
import WhyVHN from './sections/WhyVHN'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <div className="bg-obsidian min-h-screen text-white">
      <Navigation />
      <main>
        <Hero />
        <ScrollText />
        <Services />
        <Stats />
        <Technology />
        <WhyVHN />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
