'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function ProjectsList() {
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const titles   = listRef.current?.querySelectorAll<HTMLElement>('.pj-title')   ?? [];
    const roles    = listRef.current?.querySelectorAll<HTMLElement>('.pj-role')    ?? [];
    const descs    = listRef.current?.querySelectorAll<HTMLElement>('.pj-desc')    ?? [];
    const results  = listRef.current?.querySelectorAll<HTMLElement>('.pj-results') ?? [];
    const insights = listRef.current?.querySelectorAll<HTMLElement>('.pj-insight') ?? [];

    gsap.set(titles,   { opacity: 0, y: 24 });
    gsap.set(roles,    { opacity: 0 });
    gsap.set(descs,    { opacity: 0, y: 16 });
    gsap.set(results,  { opacity: 0 });
    gsap.set(insights, { opacity: 0 });

    const ctx = gsap.context(() => {
      titles.forEach((el) => gsap.to(el, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }));

      roles.forEach((el) => gsap.to(el, {
        opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }));

      descs.forEach((el) => gsap.to(el, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }));

      results.forEach((el) => gsap.to(el, {
        opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }));

      insights.forEach((el) => gsap.to(el, {
        opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      }));
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
            01 / Selected Projects
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Projects */}
        <div ref={listRef} className="divide-y divide-border">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="py-14 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20"
            >
              {/* Left — index, title, role */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
                <h3 className="pj-title text-2xl md:text-3xl font-sans font-semibold leading-tight tracking-tight">
                  {project.title}
                </h3>
                <span className="pj-role inline-flex self-start text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground border border-border rounded-full px-3 py-1">
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
                <p className="pj-desc text-[15px] text-muted-foreground font-sans leading-relaxed">
                  {project.description}
                </p>

                <div className="pj-results border-l-2 border-accent pl-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-1.5">
                    Results
                  </p>
                  <p className="text-[14px] font-sans text-foreground leading-relaxed">
                    {project.results}
                  </p>
                </div>

                {project.insight && (
                  <p className="pj-insight text-[14px] font-sans text-muted-foreground italic leading-relaxed">
                    &ldquo;{project.insight}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
