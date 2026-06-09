'use client';

import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const researchTitleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: 'Rigorous' }, { text: 'inquiry' }],
  [{ text: 'at' }, { text: 'the' }, { text: 'edge' }, { text: 'of' }],
  [{ text: "what's", em: true }, { text: 'possible.', em: true }],
];

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
  const h2Ref        = useRef<HTMLHeadingElement>(null);
  const introDescRef = useRef<HTMLParagraphElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words     = h2Ref.current?.querySelectorAll<HTMLElement>('.ir-word') ?? [];
    const introDesc = introDescRef.current;
    const educEl    = educationRef.current;
    const titles    = gridRef.current?.querySelectorAll<HTMLElement>('.ir-title') ?? [];
    const descs     = gridRef.current?.querySelectorAll<HTMLElement>('.ir-desc')  ?? [];

    if (introDesc) gsap.set(introDesc, { opacity: 0, y: 24 });
    if (educEl)    gsap.set(educEl,    { opacity: 0, y: 24 });
    gsap.set(titles, { opacity: 0, y: 20 });
    gsap.set(descs,  { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: h2Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      if (introDesc) {
        gsap.to(introDesc, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: introDesc, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (educEl) {
        gsap.to(educEl, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: educEl, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      gsap.to(titles, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.to(descs, {
        opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.35,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' },
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
            02 / Research &amp; Academic Pursuits
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Intro grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-16">
          <div>
            <h2
              ref={h2Ref}
              className="text-[clamp(32px,4vw,56px)] font-sans font-bold leading-tight tracking-tight mb-6"
            >
              {researchTitleLines.map((line, lineIdx) => (
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
                        <em className="ir-word not-italic text-accent inline-block">{word.text}</em>
                      ) : (
                        <span className="ir-word inline-block">{word.text}</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <p
              ref={introDescRef}
              className="text-[15px] text-muted-foreground font-sans leading-relaxed"
            >
              My academic and independent research sits at the intersection of technology,
              ethics, and economic systems. The goal: translate complexity into clarity —
              and clarity into action.
            </p>
          </div>

          {/* Education callout */}
          <div ref={educationRef} className="flex flex-col justify-center">
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
          </div>
        </div>

        {/* Research areas — gap-px hairline grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {researchAreas.map((area) => (
            <div key={area.title} className="bg-secondary p-8 md:p-10 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">{area.number}/</span>
              <h3 className="ir-title text-lg font-sans font-semibold leading-snug tracking-tight">
                {area.title}
              </h3>
              <p className="ir-desc text-[13px] text-muted-foreground font-sans leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
