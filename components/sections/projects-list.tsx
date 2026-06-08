'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function ProjectsList() {
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
            01 / Selected Projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Projects */}
        <div className="divide-y divide-border">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={reveal}
              className="py-14 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20"
            >
              {/* Left — index, title, role */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
                <h3 className="text-2xl md:text-3xl font-sans font-semibold leading-tight tracking-tight">
                  {project.title}
                </h3>
                <span className="inline-flex self-start text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground border border-border rounded-full px-3 py-1">
                  {project.role}
                </span>
                {project.period && (
                  <p className="text-[11px] font-sans text-muted-foreground tracking-wide">
                    {project.period}
                  </p>
                )}
              </div>

              {/* Right — description, results, insight */}
              <div className="flex flex-col gap-6 justify-center">
                <p className="text-[15px] text-muted-foreground font-sans leading-relaxed">
                  {project.description}
                </p>

                <div className="border-l-2 border-accent pl-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-1.5">
                    Results
                  </p>
                  <p className="text-[14px] font-sans text-foreground leading-relaxed">
                    {project.results}
                  </p>
                </div>

                {project.insight && (
                  <p className="text-[14px] font-sans text-muted-foreground italic leading-relaxed">
                    &ldquo;{project.insight}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
