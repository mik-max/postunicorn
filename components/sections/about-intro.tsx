'use client';

import { motion } from 'framer-motion';

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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <p className="text-2xl md:text-2xl font-sans font-medium leading-snug mb-8">
              Hello, I&apos;m Israel Raphael. A follower of Christ, a lifelong learner,
              and a <span className="text-accent">bridge-builder</span> between ideas and impact.
            </p>
            <div className="space-y-4 text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p>
                With roots in Nigeria&apos;s vibrant innovation scene and a current base in
                Canada&apos;s dynamic tech ecosystem, I&apos;ve spent the past 12+ years enabling
                partnerships and venture growth across EMEA regions.
              </p>
              <p>
                Today, as Managing Partner and Head of Research &amp; Innovation at Black Unicorn
                &amp; Allied Partners, I lead teams that don&apos;t just follow trends — they shape them.
              </p>
              <p>
                My journey began with a passion for product development and has evolved into a
                focused expertise in AI governance and ethical business practices. My approach is
                simple: listen deeply, act decisively, and always prioritize integrity.
              </p>
            </div>
          </motion.div>

          {/* Right — at a glance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="flex flex-col justify-center"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
              At a Glance
            </p>
            <div className="divide-y divide-border">
              {details.map((d) => (
                <div key={d.label} className="py-5 grid grid-cols-2 gap-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-sans text-muted-foreground leading-snug">
                    {d.label}
                  </span>
                  <span className="text-sm font-sans text-foreground leading-snug">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
