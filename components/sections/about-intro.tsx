'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const details = [
  { label: 'Current Role', value: 'Managing Partner & Head of Research, Black Unicorn & Allied Partners' },
  { label: 'Based In', value: 'Ontario, Canada' },
  { label: 'Origin', value: 'Nigeria' },
  { label: 'Focus', value: 'AI Governance · Venture Growth · Business Ethics' },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function AboutIntro() {
  const leftRef    = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const lead  = leftRef.current?.querySelector<HTMLElement>('.intro-lead');
    const paras = leftRef.current?.querySelectorAll<HTMLElement>('.intro-para') ?? [];
    const label = detailsRef.current?.querySelector<HTMLElement>('.detail-label');
    const rows  = detailsRef.current?.querySelectorAll<HTMLElement>('.detail-row') ?? [];

    if (lead)  gsap.set(lead,  { opacity: 0, y: 32 });
    gsap.set(paras, { opacity: 0, y: 24 });
    if (label) gsap.set(label, { opacity: 0, y: 12 });
    gsap.set(rows, { opacity: 0, y: 16 });

    const ctx = gsap.context(() => {
      if (lead) {
        gsap.to(lead, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: lead, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
      paras.forEach((p) => {
        gsap.to(p, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
      if (label) {
        gsap.to(label, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
      rows.forEach((row) => {
        gsap.to(row, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
        });
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
            01 / Introduction
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — opening statement + bio */}
          <div ref={leftRef}>
            <p className="intro-lead text-2xl md:text-2xl font-sans font-medium leading-snug mb-8">
              Hello, I&apos;m Israel Raphael. A follower of Christ, a lifelong learner,
              and a <span className="text-accent">bridge-builder</span> between ideas and impact.
            </p>
            <div className="space-y-4 text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p className="intro-para">
                With roots in Nigeria&apos;s vibrant innovation scene and a current base in
                Canada&apos;s dynamic tech ecosystem, I&apos;ve spent the past 12+ years enabling
                partnerships and venture growth across EMEA regions.
              </p>
              <p className="intro-para">
                Today, as Managing Partner and Head of Research &amp; Innovation at Black Unicorn
                &amp; Allied Partners, I lead teams that don&apos;t just follow trends — they shape them.
              </p>
              <p className="intro-para">
                My journey began with a passion for product development and has evolved into a
                focused expertise in AI governance and ethical business practices. My approach is
                simple: listen deeply, act decisively, and always prioritize integrity.
              </p>
            </div>
          </div>

          {/* Right — at a glance */}
          <div ref={detailsRef} className="flex flex-col justify-center">
            <p className="detail-label text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
              At a Glance
            </p>
            <div className="divide-y divide-border">
              {details.map((d) => (
                <div key={d.label} className="detail-row py-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-sans text-muted-foreground leading-snug">
                    {d.label}
                  </span>
                  <span className="text-sm font-sans text-foreground leading-snug">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
