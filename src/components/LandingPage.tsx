import { useEffect, useRef } from 'react';
import { Rocket, FileText, Users, TrendingUp, CheckCircle, Building2, ShoppingBag, Code, Factory, MapPin } from 'lucide-react';
import gsap from 'gsap';
import HeroSection from './HeroSection';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface LandingPageProps {
  activeCategory: number;
  setActiveCategory: (index: number) => void;
}

const CATEGORIES = [
  { icon: ShoppingBag, label: 'D2C Brands' },
  { icon: Users,       label: 'Consumer Startups' },
  { icon: Building2,   label: 'MSMEs' },
  { icon: Code,        label: 'SaaS Startups' },
  { icon: Factory,     label: 'Manufacturing Businesses' },
  { icon: MapPin,      label: 'Bharat-focused Startups' },
];

const CATEGORY_ACCENT = [
  '#7c3aed', // Purple  – D2C
  '#2563eb', // Blue    – Consumer
  '#059669', // Emerald – MSMEs
  '#db2777', // Pink    – SaaS
  '#ea580c', // Orange  – Manufacturing
  '#d97706', // Gold    – Bharat
];

export default function LandingPage({ activeCategory, setActiveCategory }: LandingPageProps) {
  const heroRef        = useRef<HTMLDivElement>(null);
  const aboutRef       = useRef<HTMLDivElement>(null);
  const howItWorksRef  = useRef<HTMLDivElement>(null);
  const whoCanApplyRef = useRef<HTMLDivElement>(null);
  const investorsRef   = useRef<HTMLDivElement>(null);
  const startupsRef    = useRef<HTMLDivElement>(null);
  const aboutKaroRef   = useRef<HTMLDivElement>(null);
  const ctaRef         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      heroRef.current,
      aboutRef.current,
      howItWorksRef.current,
      whoCanApplyRef.current,
      investorsRef.current,
      startupsRef.current,
      aboutKaroRef.current,
      ctaRef.current,
    ].filter(Boolean);

    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative z-10 pointer-events-none">
      <div className="min-h-screen w-full overflow-x-hidden bg-black">
        {/* ── Hero (animated collision headline) ── */}
        <div ref={heroRef} className="pointer-events-auto">
          <HeroSection />
        </div>

        {/* ── About ───────────────────────────────────────────────────── */}
        <div ref={aboutRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel-dark p-8 sm:p-16 pointer-events-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                About Karo Pitch
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                Karo Pitch is a startup pitch platform created by KaroStartup that connects early-stage founders with investors. It allows startups from across India, especially Tier-2 and Tier-3 cities, to showcase their ideas and raise funding through curated pitch opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* ── How It Works ─────────────────────────────────────────────── */}
        <div ref={howItWorksRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16 text-center tracking-tight">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: FileText,     title: 'Step 1', desc: 'Apply with your pitch deck' },
                { icon: CheckCircle,  title: 'Step 2', desc: 'Get shortlisted by KaroStartup' },
                { icon: Users,        title: 'Step 3', desc: 'Pitch live to investors' },
                { icon: TrendingUp,   title: 'Step 4', desc: 'Raise funding and scale' },
              ].map((step, index) => (
                <div
                  key={index}
                  className="glass-panel-dark p-8 pointer-events-auto hover:bg-white/8 transition-all duration-300"
                >
                  <step.icon className="w-10 h-10 text-white mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-base font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Who Can Apply ────────────────────────────────────────────── */}
        <div ref={whoCanApplyRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-center tracking-tight">
              Who Can Apply
            </h2>
            <p className="text-center text-gray-500 mb-12 text-sm tracking-widest uppercase">
              Click any category
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {CATEGORIES.map((item, index) => {
                const isActive = index === activeCategory;
                const accent   = CATEGORY_ACCENT[index];
                return (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className="pointer-events-auto flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 focus:outline-none"
                    style={{
                      backgroundColor: isActive ? accent : 'rgba(255,255,255,0.05)',
                      border: `1.5px solid ${isActive ? accent : 'rgba(255,255,255,0.12)'}`,
                      color: isActive ? '#fff' : '#fff',
                      boxShadow: isActive ? `0 0 18px 2px ${accent}55` : 'none',
                      transform: isActive ? 'scale(1.07)' : 'scale(1)',
                    }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.7)' }}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Investors ────────────────────────────────────────────────── */}
        <div ref={investorsRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16 text-center tracking-tight">
              Meet Investors Looking for the Next Big Startup
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                'Sequoia Capital', 'Accel Partners', 'Lightspeed Ventures',
                'Nexus Venture Partners', 'Blume Ventures', 'Matrix Partners',
                'Elevation Capital', 'Chiratae Ventures', 'Kalaari Capital', '3one4 Capital',
              ].map((investor, index) => (
                <div
                  key={index}
                  className="glass-panel-dark p-6 flex items-center justify-center hover:bg-white/10 transition-all duration-300 pointer-events-auto"
                >
                  <p className="text-white font-semibold text-center text-sm">{investor}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured Startups ────────────────────────────────────────── */}
        <div ref={startupsRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16 text-center tracking-tight">
              Featured Startups
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'FreshBharat',  category: 'D2C Food & Beverage',       desc: 'Farm-to-table organic products delivered fresh across Tier-2 cities.' },
                { name: 'SkillVerse',   category: 'EdTech SaaS',               desc: 'Upskilling platform connecting rural youth with digital career opportunities.' },
                { name: 'CraftIndia',   category: 'Manufacturing & Export',    desc: 'Empowering local artisans to reach global markets with handcrafted products.' },
              ].map((startup, index) => (
                <div
                  key={index}
                  className="glass-panel-dark p-8 pointer-events-auto hover:bg-white/10 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">{startup.name}</h3>
                  <p className="text-white/60 text-sm font-medium mb-4">{startup.category}</p>
                  <p className="text-gray-400 text-base font-light">{startup.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── About KaroStartup ────────────────────────────────────────── */}
        <div ref={aboutKaroRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel-dark p-8 sm:p-16 pointer-events-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
                About KaroStartup
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed font-light">
                Backed by KaroStartup, India's premier startup media platform. We've published thousands of founder stories and built a massive community of entrepreneurs.
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <div ref={ctaRef} className="py-24 px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel-dark p-8 sm:p-16 lg:p-20 text-center pointer-events-auto">
              <Rocket className="w-14 h-14 text-white mx-auto mb-8" />
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                Ready to Pitch Your Startup?
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-10 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-105 transition-transform shadow-lg duration-300">
                  Apply Now
                </button>
                <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base hover:bg-white/20 transition-all border border-white/20 duration-300">
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
