import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const flashRef    = useRef<HTMLDivElement>(null);
  const subtextRef  = useRef<HTMLParagraphElement>(null);
  const buttonsRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line1   = line1Ref.current;
    const line2   = line2Ref.current;
    const flash   = flashRef.current;
    const subtext = subtextRef.current;
    const buttons = buttonsRef.current;

    if (!line1 || !line2 || !flash || !subtext || !buttons) return;

    // ── Initial states ───────────────────────────────────────────────────
    gsap.set(line1, {
      x: '-160vw',
      scale: 3,
      opacity: 0,
      filter: 'blur(50px)',
      willChange: 'transform, filter, opacity',
    });
    gsap.set(line2, {
      x: '160vw',
      scale: 3,
      opacity: 0,
      filter: 'blur(50px)',
      willChange: 'transform, filter, opacity',
    });
    gsap.set(flash,   { opacity: 0, scale: 0.5 });
    gsap.set(subtext, { opacity: 0, y: 30, filter: 'blur(8px)' });
    gsap.set(buttons, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ delay: 0.15 });

    // ── Phase 1: Rush inward (motion-blur trails) ────────────────────────
    tl.to(line1, {
      x: '0vw',
      scale: 1.06,
      opacity: 1,
      filter: 'blur(10px)',
      duration: 0.9,
      ease: 'power4.out',
    })
    .to(line2, {
      x: '0vw',
      scale: 1.06,
      opacity: 1,
      filter: 'blur(10px)',
      duration: 0.9,
      ease: 'power4.out',
    }, '<') // run simultaneously

    // ── Phase 2: Collision flash ─────────────────────────────────────────
    .to(flash, {
      opacity: 0.85,
      scale: 1.2,
      duration: 0.1,
      ease: 'power3.in',
    })
    .to(flash, {
      opacity: 0,
      scale: 2.8,
      duration: 0.45,
      ease: 'power2.out',
    })

    // ── Phase 3: Elastic settle into final clean form ────────────────────
    .to([line1, line2], {
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      ease: 'elastic.out(1, 0.3)',
      stagger: 0,
    }, '-=0.42')

    // ── Phase 4: Subtext fade up ─────────────────────────────────────────
    .to(subtext, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      ease: 'power3.out',
    }, '-=0.5')

    // ── Phase 5: Buttons ─────────────────────────────────────────────────
    .to(buttons, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.45');

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ overflow: 'hidden' }}
    >
      <div className="max-w-6xl w-full mx-auto text-center">
        <div
          className="glass-panel-dark p-8 sm:p-16 lg:p-20 pointer-events-auto"
          style={{ position: 'relative' }}
        >
          {/* ── Collision flash overlay ──────────────────────────────── */}
          <div
            ref={flashRef}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(139,92,246,0.35) 35%, rgba(59,130,246,0.15) 60%, transparent 80%)',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />

          {/* ── Headline ─────────────────────────────────────────────── */}
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tighter"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Left entry: "Pitch Your Startup to" */}
            <span
              ref={line1Ref}
              style={{ display: 'block' }}
            >
              Pitch Your Startup to
            </span>

            {/* Right entry: "India's Top Investors." */}
            <span
              ref={line2Ref}
              className="text-white"
              style={{ display: 'block' }}
            >
              India's Top Investors.
            </span>
          </h1>

          {/* ── Subtext ──────────────────────────────────────────────── */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg lg:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            style={{ position: 'relative', zIndex: 1 }}
          >
            Karo Pitch is an exclusive platform where early-stage founders from
            across Bharat can pitch their businesses directly to top-tier
            investors and raise funding.
          </p>

          {/* ── CTA Buttons ──────────────────────────────────────────── */}
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <button className="px-10 py-4 bg-white text-black rounded-full font-semibold text-base hover:scale-105 transition-transform shadow-lg duration-300">
              Apply to Pitch
            </button>
            <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-base hover:bg-white/20 transition-all border border-white/20 duration-300">
              Explore Startups
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
