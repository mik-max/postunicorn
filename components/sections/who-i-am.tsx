'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { expertiseAreas } from '@/data/expertise';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Title split for mask-reveal. Words with em:true render as text-accent.
const titleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: "I'm" }, { text: 'Israel' }, { text: 'Raphael,' }],
  [{ text: 'a', em: true }, { text: 'bridge-builder', em: true }],
  [{ text: 'between' }, { text: 'ideas' }, { text: 'and' }, { text: 'impact.' }],
];

// Bio paragraphs split for line-by-line reveal (approximates ~560px column at desktop).
const para1Lines = [
  "From leading innovation teams at Black Unicorn",
  "& Allied Partners to scaling opportunities at",
  "Nigeria's Wennovation Hub, I've dedicated my career",
  "to turning bold ideas and market gaps into profit",
  "realities.",
];
const para2Lines = [
  "Whether it's navigating complex EMEA markets or",
  "advising on business ethics, my work is rooted in",
  "integrity, curiosity, and a youthful drive to solve",
  "real-world challenges.",
];

const valueProps = [
  {
    title: 'Proven Track Record',
    description:
      'Enabled high-stakes partnerships that accelerated venture growth for startups and established firms alike.',
  },
  {
    title: 'AI at the Core',
    description:
      'Deep expertise in AI development, governance, and ethical integration — ensuring technology serves humanity.',
  },
  {
    title: 'Global Perspective',
    description:
      'Bridging continents with hands-on experience in innovation hubs from Lagos to Toronto.',
  },
];


const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function WhoIAm() {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const valuePropsRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words = h2Ref.current?.querySelectorAll<HTMLElement>('.who-word') ?? [];
    const lines = descRef.current?.querySelectorAll<HTMLElement>('.who-line') ?? [];
    const buttonEl = buttonRef.current;
    const valueLabel = valuePropsRef.current?.querySelector<HTMLElement>('.value-label');
    const valueItems = valuePropsRef.current?.querySelectorAll<HTMLElement>('.value-item') ?? [];
    const cards = snapshotRef.current?.querySelectorAll<HTMLElement>('.snapshot-card') ?? [];
    const cardTexts = snapshotRef.current?.querySelectorAll<HTMLElement>('.snapshot-card h4, .snapshot-card .card-desc') ?? [];
    const imgWrapperEl = imgWrapperRef.current;

    // Set initial state before paint to prevent flash.
    if (buttonEl) gsap.set(buttonEl, { opacity: 0 });
    if (valueLabel) gsap.set(valueLabel, { opacity: 0, y: 12 });
    gsap.set(valueItems, { opacity: 0, y: 16 });
    // Keep hidden until onEnter positions it at center — prevents column-flash while scrolling in.
    if (imgWrapperEl) gsap.set(imgWrapperEl, { scale: 1.35, opacity: 0 });
    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.set(cardTexts, { opacity: 0 });

    const ctx = gsap.context(() => {
      // 1 — title word reveal
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

      // 2 — bio line reveal
      gsap.fromTo(lines, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });

      // 3 — "Full Story" button fade in
      if (buttonEl) {
        gsap.to(buttonEl, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonEl,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        });
      }

      // 4 — "Why Partner With Me" label + each value prop row, triggered individually
      if (valueLabel) {
        gsap.to(valueLabel, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: valueLabel, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
      valueItems.forEach((item) => {
        gsap.to(item, {
          opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });

      // 5/6/7 — Expertise Snapshot: image first, cards at 95% of image, text 0.35s into cards
      {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: snapshotRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
            onEnter: () => {
              // getBoundingClientRect() is called here — at scroll time — so the layout is
              // always fully settled whether the user navigated from another page or loaded directly.
              // Guard against re-entry after the animation has already played.
              if (!snapshotRef.current || !imgWrapperEl || tl.progress() > 0) return;
              const sR = snapshotRef.current.getBoundingClientRect();
              const iR = imgWrapperEl.getBoundingClientRect();
              gsap.set(imgWrapperEl, {
                x: (sR.left + sR.width / 2) - (iR.left + iR.width / 2),
                opacity: 1,
              });
            },
          },
        });

        // 5 — Image travels from section center to its column and scales down
        if (imgWrapperEl) {
          tl.to(imgWrapperEl, { x: 0, scale: 1, duration: 1.5, ease: 'power3.inOut' });
        }

        // 6 — Cards slide up at 95% through the image animation (1.5s × 0.70 = 1.05s)
        if (cards.length) {
          tl.to(cards, {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          }, imgWrapperEl ? '-=0.45' : 0);
        }

        // 7 — Card text fades in 0.35s after cards start moving
        if (cardTexts.length) {
          tl.to(cardTexts, {
            opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12,
          }, '<+0.35');
        }
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="flex items-center gap-6 mb-20"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-muted-foreground shrink-0">
            01 / Who I Am
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Main grid: bio left, value props right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-20">

          {/* Left — Bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <h2
              ref={h2Ref}
              className="text-4xl md:text-5xl lg:text-[56px] font-sans font-semibold leading-[1.05] tracking-tight mb-8"
            >
              {titleLines.map((line, lineIdx) => (
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
                        <em className="who-word not-italic text-accent inline-block">
                          {word.text}
                        </em>
                      ) : (
                        <span className="who-word inline-block">{word.text}</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <div ref={descRef} className="space-y-4 text-muted-foreground font-sans leading-relaxed text-[15px]">
              <p>
                {para1Lines.map((line, i) => (
                  <span key={i} className="overflow-hidden block">
                    <span className="who-line block">{line}</span>
                  </span>
                ))}
              </p>
              <p>
                {para2Lines.map((line, i) => (
                  <span key={i} className="overflow-hidden block">
                    <span className="who-line block">{line}</span>
                  </span>
                ))}
              </p>
            </div>

            <div ref={buttonRef} className="inline-flex mt-10">
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                Full Story <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right — Why Partner With Me */}
          <div ref={valuePropsRef} className="flex flex-col justify-center">
            <p className="value-label text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
              Why Partner With Me?
            </p>

            <div className="divide-y divide-border">
              {valueProps.map((prop, i) => (
                <div key={prop.title} className="value-item py-7 flex gap-6">
                  <span className="text-[10px] font-sans text-muted-foreground mt-0.5 shrink-0 w-4">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold font-sans mb-1.5 tracking-wide">
                      {prop.title}
                    </h4>
                    <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise snapshot */}
        <div ref={snapshotRef} className="border-t border-border pt-12">
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
            Expertise Snapshot
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 2×2 card grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertiseAreas.map((item, i) => (
                <div
                  key={item.area}
                  className="snapshot-card flex flex-col justify-between p-6 rounded-2xl border border-dashed border-border bg-card min-h-[200px]"
                >
                  <div>
                    <span className="text-xs font-sans text-accent mb-3 block">
                      0{i + 1}/
                    </span>
                    <h4 className="text-sm font-semibold font-sans text-foreground leading-snug">
                      {item.area}
                    </h4>
                  </div>
                  <p className="card-desc text-[13px] text-muted-foreground font-sans leading-relaxed mt-4">
                    {item.whatIBring}
                  </p>
                </div>
              ))}
            </div>

            {/* Image — scales and travels from section center to this column on scroll */}
            <div
              ref={imgWrapperRef}
              className="relative rounded-2xl overflow-hidden hidden lg:block z-10"
            >
              <Image
                src={IMAGES.expertise}
                alt="Expertise"
                fill
                className="object-cover"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
