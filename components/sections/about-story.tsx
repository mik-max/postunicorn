'use client';

import { motion } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function AboutStory() {
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
            02 / My Story
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — narrative */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <h2 className="text-4xl md:text-5xl font-sans font-semibold leading-tight tracking-tight mb-8">
              Born curious.<br />
              Built for <em className="not-italic text-accent">impact</em>.
            </h2>
            <div className="space-y-4 text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p>
                Born with an innate curiosity for how people, technologies, and economic systems
                connect to form profit. Early on, as Business Development Manager at Wennovation
                Hub in Lagos, I cultivated lifelong partnerships that fueled Africa&apos;s
                entrepreneurial boom.
              </p>
              <p>
                Transitioning to Canada, I amplified that foundation — contributing to ventures
                that blend cutting-edge AI with human-centered design. The move wasn&apos;t just
                geographical; it was a deepening of purpose.
              </p>
            </div>
          </motion.div>

          {/* Right — education + continuation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="flex flex-col justify-center gap-8"
          >
            <div className="space-y-4 text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p>
                Education has been my compass. A foundation from Ontario Tech University,
                enriched by advanced studies and self-directed research into AI ethics. This
                blend of formal learning and real-world application equips me to tackle
                tomorrow&apos;s challenges with clarity and confidence.
              </p>
            </div>

            {/* Education callout */}
            <div className="border-l-2 border-accent pl-6 py-1">
              <p className="text-[10px] uppercase tracking-[0.25em] font-sans text-muted-foreground mb-2">
                Education
              </p>
              <p className="text-sm font-sans text-foreground font-medium">
                Ontario Tech University
              </p>
              <p className="text-[13px] font-sans text-muted-foreground mt-1">
                Pursuing Advanced Degree — AI for Business (Ivy League)
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
