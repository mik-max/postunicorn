'use client';

import { motion } from 'framer-motion';
import { expertiseAreas } from '@/data/expertise';

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-3 gap-6 mb-16 max-w-sm"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-sans font-semibold tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-muted-foreground font-sans tracking-wide mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Expertise area cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border"
        >
          {expertiseAreas.map((item, i) => (
            <div key={item.area} className="bg-background p-8 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
              <h3 className="text-lg font-sans font-semibold leading-snug tracking-tight">
                {item.area}
              </h3>
              <p className="text-[13px] text-muted-foreground font-sans leading-relaxed flex-1">
                {item.whatIBring}
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-1.5">
                  Outcomes
                </p>
                <p className="text-[13px] font-sans text-foreground leading-relaxed">
                  {item.outcomes}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
