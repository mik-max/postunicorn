'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expertiseAreas } from '@/data/expertise';

gsap.registerPlugin(ScrollTrigger);

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const stats = [
  { value: '12+', label: 'Years Experience' },
  { value: '20+', label: 'Ventures Supported' },
  { value: '100+', label: 'Workshops Delivered' },
];

export default function ExpertiseAreas() {
  const statsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const statEls      = statsRef.current?.querySelectorAll<HTMLElement>('.ea-stat') ?? [];
    const statValueEls = statsRef.current?.querySelectorAll<HTMLElement>('.ea-stat-value') ?? [];
    const titles       = cardsRef.current?.querySelectorAll<HTMLElement>('.ea-title') ?? [];
    const descs        = cardsRef.current?.querySelectorAll<HTMLElement>('.ea-desc') ?? [];
    const outcomes     = cardsRef.current?.querySelectorAll<HTMLElement>('.ea-outcome') ?? [];

    gsap.set(statEls,  { opacity: 0, y: 20 });
    gsap.set(titles,   { opacity: 0, y: 20 });
    gsap.set(descs,    { opacity: 0 });
    gsap.set(outcomes, { opacity: 0 });

    // Initialise count-up values to '0+' before scroll fires
    statValueEls.forEach((el, idx) => {
      const raw    = stats[idx].value;
      const num    = parseInt(raw, 10);
      const suffix = raw.slice(String(num).length);
      el.textContent = '0' + suffix;
    });

    const ctx = gsap.context(() => {
      // Slide stats up
      gsap.to(statEls, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      // Count up each stat value
      statValueEls.forEach((el, idx) => {
        const raw    = stats[idx].value;
        const num    = parseInt(raw, 10);
        const suffix = raw.slice(String(num).length);
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      });

      gsap.to(titles, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.to(descs, {
        opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.to(outcomes, {
        opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.55,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-muted-foreground shrink-0">
            01 / Core Expertise
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Stats row */}
        <div ref={statsRef} className="grid grid-cols-3 gap-6 mb-16 max-w-sm">
          {stats.map((stat) => (
            <div key={stat.label} className="ea-stat">
              <p className="ea-stat-value text-3xl font-sans font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground font-sans tracking-wide mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Expertise area cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {expertiseAreas.map((item, i) => (
            <div key={item.area} className="bg-background p-8 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
              <h3 className="ea-title text-lg font-sans font-semibold leading-snug tracking-tight">
                {item.area}
              </h3>
              <p className="ea-desc text-[13px] text-muted-foreground font-sans leading-relaxed flex-1">
                {item.whatIBring}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-1.5">
                  Outcomes
                </p>
                <p className="ea-outcome text-[13px] font-sans text-foreground leading-relaxed">
                  {item.outcomes}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
