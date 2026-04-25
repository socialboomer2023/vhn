import { ArrowUp, Truck } from 'lucide-react'

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Technology', href: '#technology' },
  { label: 'Why VHN', href: '#why-vhn' },
  { label: 'Contact', href: '#contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-obsidian border-t border-graphite">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-industrial-amber flex items-center justify-center rounded-sm">
                <Truck size={20} className="text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-xl tracking-wide">VHN SERVICES</span>
                <span className="block font-mono text-[10px] text-silver tracking-widest -mt-1">LOGISTICS LLC</span>
              </div>
            </div>
            <p className="text-silver text-sm leading-relaxed max-w-xs">
              Nationwide logistics excellence. From intermodal to final mile, we deliver with precision and reliability.
            </p>
            <p className="mt-6 text-silver text-xs">
              © 2025 VHN Services LLC. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs text-silver uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-silver text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-mono text-xs text-silver uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-silver text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="font-mono text-xs text-silver">DOT Certified Carrier</p>
              <p className="font-mono text-xs text-silver mt-1">MC Authority: Active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-graphite">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
          <span className="text-silver text-xs">Designed for performance.</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-silver hover:text-white transition-colors text-xs"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
