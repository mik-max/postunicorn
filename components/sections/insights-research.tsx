'use client';

import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const researchAreas = [
  {
    number: '01',
    title: 'AI Governance & Ethics',
    description:
      'Frameworks for responsible AI deployment — balancing innovation velocity with accountability, transparency, and societal protection in enterprise contexts.',
  },
  {
    number: '02',
    title: 'Venture Economics in Emerging Markets',
    description:
      'Capital formation, market dynamics, and the untapped potential of Africa and EMEA — how agency and infrastructure unlock trillion-dollar opportunity.',
  },
  {
    number: '03',
    title: 'AI × Business Ethics',
    description:
      'The intersection of ethical philosophy and commercial decision-making — exploring how values-driven leadership produces durable competitive advantage.',
  },
];

export default function InsightsResearch() {
  return (
    <section className="bg-secondary py-24 md:py-32">
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
            02 / Research &amp; Academic Pursuits
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-bold leading-tight tracking-tight mb-6">
              Rigorous inquiry <br />
              at the edge of <em className="not-italic text-accent">what&apos;s possible</em>.
            </h2>
            <p className="text-[15px] text-muted-foreground font-sans leading-relaxed">
              My academic and independent research sits at the intersection of technology,
              ethics, and economic systems. The goal: translate complexity into clarity —
              and clarity into action.
            </p>
          </motion.div>

          {/* Education callout */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="flex flex-col justify-center"
          >
            <div className="border-l-2 border-accent pl-6 py-1 mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-muted-foreground mb-2">
                Current Academic Pursuit
              </p>
              <p className="text-base font-sans text-foreground font-semibold">
                Advanced Degree — AI for Business
              </p>
              <p className="text-[13px] font-sans text-muted-foreground mt-1">
                Ontario Tech University · Targeting Ivy League institutions
              </p>
            </div>
            <p className="text-[14px] text-muted-foreground font-sans leading-relaxed">
              Combining formal graduate study with field experience to develop research that
              is both theoretically grounded and practically deployable.
            </p>
          </motion.div>
        </div>

        {/* Research areas — gap-px hairline grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border"
        >
          {researchAreas.map((area) => (
            <div key={area.title} className="bg-secondary p-8 md:p-10 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">{area.number}/</span>
              <h3 className="text-lg font-sans font-semibold leading-snug tracking-tight">
                {area.title}
              </h3>
              <p className="text-[13px] text-muted-foreground font-sans leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
