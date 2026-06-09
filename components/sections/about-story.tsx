'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyTitleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: 'Born' }, { text: 'curious.' }],
  [{ text: 'Built' }, { text: 'for' }, { text: 'impact.', em: true }],
];

const para1Lines = [
  'Born with an innate curiosity for how people,',
  'technologies, and economic systems connect to',
  'form profit. Early on, as Business Development',
  'Manager at Wennovation Hub in Lagos, I cultivated',
  "lifelong partnerships that fueled Africa's",
  'entrepreneurial boom.',
];

const para2Lines = [
  'Transitioning to Canada, I amplified that',
  'foundation — contributing to ventures that blend',
  'cutting-edge AI with human-centered design.',
  "The move wasn't just geographical; it was a",
  'deepening of purpose.',
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function AboutStory() {
  const h2Ref   = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words = h2Ref.current?.querySelectorAll<HTMLElement>('.story-word') ?? [];
    const lines = descRef.current?.querySelectorAll<HTMLElement>('.story-line') ?? [];

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: h2Ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.fromTo(lines, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

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
          <div>
            <h2
              ref={h2Ref}
              className="text-4xl md:text-5xl font-sans font-semibold leading-tight tracking-tight mb-8"
            >
              {storyTitleLines.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className={cn(
                        'overflow-hidden inline-block',
                        wIdx < line.length - 1 && 'mr-[0.25em]'
                      )}
                    >
                      {word.em ? (
                        <em className="story-word not-italic text-accent inline-block">
                          {word.text}
                        </em>
                      ) : (
                        <span className="story-word inline-block">{word.text}</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <div ref={descRef} className="space-y-4 text-[15px] text-muted-foreground font-sans leading-relaxed">
              <p>
                {para1Lines.map((line, i) => (
                  <span key={i} className="overflow-hidden block">
                    <span className="story-line block">{line}</span>
                  </span>
                ))}
              </p>
              <p>
                {para2Lines.map((line, i) => (
                  <span key={i} className="overflow-hidden block">
                    <span className="story-line block">{line}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>

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
