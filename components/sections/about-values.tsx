'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    number: '01',
    title: 'Integrity First',
    description:
      'Every decision is guided by ethical AI principles — transparency, fairness, and societal good.',
  },
  {
    number: '02',
    title: 'Collaborative Spirit',
    description:
      'Youthful energy meets seasoned wisdom. I thrive in cross-cultural teams where diverse perspectives shape better outcomes.',
  },
  {
    number: '03',
    title: 'Impact-Driven',
    description:
      'From post-COVID enterprise pivots to AI-driven process innovations, I measure success by the lives and businesses transformed.',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function AboutValues() {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const titles = gridRef.current?.querySelectorAll<HTMLElement>('.value-title') ?? [];
    const descs  = gridRef.current?.querySelectorAll<HTMLElement>('.value-desc')  ?? [];

    gsap.set(titles, { opacity: 0, y: 20 });
    gsap.set(descs,  { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(titles, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
      gsap.to(descs, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.35,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
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
            03 / Core Values
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Values grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {values.map((v) => (
            <div key={v.title} className="bg-background p-8 md:p-10 flex flex-col gap-6">
              <span className="text-[10px] font-sans text-accent">
                {v.number}/
              </span>
              <h3 className="value-title text-2xl md:text-3xl font-sans font-semibold leading-tight">
                {v.title}
              </h3>
              <p className="value-desc text-sm text-muted-foreground font-sans leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
