'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { services } from '@/data/expertise';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const introTitleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: 'Engagements' }, { text: 'designed' }],
  [{ text: 'for' }, { text: 'real', em: true }, { text: 'outcomes.', em: true }],
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function ExpertiseServices() {
  const introH2Ref  = useRef<HTMLHeadingElement>(null);
  const introDescRef = useRef<HTMLParagraphElement>(null);
  const introImgRef  = useRef<HTMLDivElement>(null);
  const servicesRef  = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words    = introH2Ref.current?.querySelectorAll<HTMLElement>('.sv-word') ?? [];
    const descEl   = introDescRef.current;
    const imgEl    = introImgRef.current;
    const titles   = servicesRef.current?.querySelectorAll<HTMLElement>('.sv-title') ?? [];
    const descs    = servicesRef.current?.querySelectorAll<HTMLElement>('.sv-desc') ?? [];

    if (descEl) gsap.set(descEl, { opacity: 0, y: 24 });
    if (imgEl)  gsap.set(imgEl,  { opacity: 0, y: 80 });
    gsap.set(titles, { opacity: 0, y: 20 });
    gsap.set(descs,  { opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: introH2Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      if (descEl) {
        gsap.to(descEl, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: descEl, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (imgEl) {
        gsap.to(imgEl, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imgEl, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }

      gsap.to(titles, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: servicesRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.to(descs, {
        opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.15, delay: 0.35,
        scrollTrigger: { trigger: servicesRef.current, start: 'top 80%', toggleActions: 'play none none none' },
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
            02 / Services Offered
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Intro — heading left, image right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center mb-16">
          <div>
            <h2
              ref={introH2Ref}
              className="text-[clamp(32px,4vw,56px)] font-sans font-semibold leading-tight tracking-tight mb-4"
            >
              {introTitleLines.map((line, lineIdx) => (
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
                        <em className="sv-word not-italic text-accent inline-block">
                          {word.text}
                        </em>
                      ) : (
                        <span className="sv-word inline-block">{word.text}</span>
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
              Every service is tailored to your context — no templates, no filler.
            </p>
          </div>

          <div ref={introImgRef} className="relative aspect-video rounded-2xl overflow-hidden hidden lg:block">
            <Image
              src={IMAGES.expertiseEngagement}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </div>

        {/* Services grid */}
        <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, i) => (
            <div key={service.title} className="bg-secondary p-6 md:p-10 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
              <h3 className="sv-title text-2xl font-sans font-semibold leading-tight tracking-tight">
                {service.title}
              </h3>
              <p className="sv-desc text-[14px] text-muted-foreground font-sans leading-relaxed flex-1">
                {service.description}
              </p>
              {service.format && (
                <div className="border-t border-border pt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-muted-foreground mb-1.5">
                    Format
                  </p>
                  <p className="text-[13px] font-sans text-foreground leading-relaxed">
                    {service.format}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
