import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, Linkedin, Facebook, Clock, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.animate-in')
      els?.forEach((el, i) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch('https://formspree.io/f/mnjlyqgw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setSubmitted(true)
        form.reset()
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert('Something went wrong. Please try again or call us directly.')
      }
    } catch {
      alert('Network error. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="bg-charcoal py-24 md:py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Left: Contact Info */}
          <div className="flex-1">
            <span className="font-mono text-xs tracking-[0.2em] text-industrial-amber uppercase animate-in block">
              Let's Connect
            </span>
            <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl text-white uppercase mt-4 tracking-wide leading-tight animate-in">
              Ready To Move Your Freight?
            </h2>

            <div className="mt-10 space-y-6 animate-in">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-graphite flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-industrial-amber" />
                </div>
                <div>
                  <p className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:9519610982" className="text-white text-lg hover:text-industrial-amber transition-colors">
                    951-961-0982
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-graphite flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-industrial-amber" />
                </div>
                <div>
                  <p className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:info@vhnservices.com" className="text-white text-lg hover:text-industrial-amber transition-colors">
                    info@vhnservices.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-graphite flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-industrial-amber" />
                </div>
                <div>
                  <p className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Company</p>
                  <p className="text-white text-lg">VHN Services LLC</p>
                  <p className="text-silver text-sm mt-1">Contact Person: Raj</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-graphite flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-industrial-amber" />
                </div>
                <div>
                  <p className="font-mono text-xs text-silver uppercase tracking-wider mb-1">Hours</p>
                  <p className="text-white text-lg">Dispatch Available 24/7/365</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4 animate-in">
              <a
                href="#"
                className="w-10 h-10 bg-graphite flex items-center justify-center text-silver hover:text-white hover:bg-industrial-amber transition-all duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-graphite flex items-center justify-center text-silver hover:text-white hover:bg-industrial-amber transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="flex-1 animate-in">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-obsidian border border-graphite p-8 md:p-10 rounded-sm"
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-industrial-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight size={32} className="text-industrial-amber" />
                  </div>
                  <h3 className="font-display text-2xl text-white uppercase">Quote Request Sent</h3>
                  <p className="text-silver mt-2">Raj will contact you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors"
                        placeholder="(555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Service Type</label>
                    <select
                      name="service"
                      className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="intermodal">Intermodal</option>
                      <option value="ftl">Full Truckload (FTL)</option>
                      <option value="ltl">Less-Than-Truckload (LTL)</option>
                      <option value="dedicated">Dedicated Contract</option>
                      <option value="final-mile">Final Mile Delivery</option>
                      <option value="brokerage">Freight Brokerage</option>
                    </select>
                  </div>

                  <div className="mt-5">
                    <label className="font-mono text-xs text-silver uppercase tracking-wider block mb-2">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full bg-graphite border border-graphite text-white px-4 py-3 text-sm focus:border-industrial-amber focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your freight needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 bg-industrial-amber text-white py-4 font-body text-sm font-semibold uppercase tracking-wider hover:glow-amber transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Request Quote'}
                  </button>

                  <p className="mt-4 text-center text-silver text-xs">
                    Your information is secure and never shared.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
