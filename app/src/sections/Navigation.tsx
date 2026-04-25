import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Why VHN', href: '#why-vhn' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-obsidian/95 backdrop-blur-md border-b border-graphite'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div className="w-10 h-10 bg-industrial-amber flex items-center justify-center rounded-sm">
              <span className="font-display font-bold text-white text-lg">VHN</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-white text-xl tracking-wide">VHN SERVICES</span>
              <span className="block font-mono text-[10px] text-silver tracking-widest -mt-1">LOGISTICS LLC</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-body text-sm text-silver hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-industrial-amber transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:9519610982"
              className="flex items-center gap-2 text-silver hover:text-white transition-colors"
            >
              <Phone size={16} />
              <span className="font-mono text-sm">951-961-0982</span>
            </a>
            <button
              onClick={() => scrollTo('#contact')}
              className="bg-industrial-amber text-white px-6 py-2.5 font-body text-sm font-semibold uppercase tracking-wider hover:glow-amber transition-all duration-300"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-display text-3xl text-white uppercase tracking-wider hover:text-industrial-amber transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <a
            href="tel:9519610982"
            className="mt-4 flex items-center gap-3 text-industrial-amber"
          >
            <Phone size={20} />
            <span className="font-mono text-lg">951-961-0982</span>
          </a>
        </div>
      </div>
    </>
  )
}
