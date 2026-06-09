'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type PlexusNode = { cx: number; cy: number; r: number; o: number };
const NODES: PlexusNode[] = [
  { cx:  120, cy: 100, r: 2.5, o: 0.13 },
  { cx:  260, cy:  55, r: 3.0, o: 0.16 },
  { cx:  400, cy: 180, r: 4.5, o: 0.28 },
  { cx:  200, cy: 320, r: 2.5, o: 0.13 },
  { cx:  500, cy:  90, r: 2.5, o: 0.13 },
  { cx:  580, cy: 260, r: 3.0, o: 0.16 },
  { cx:  700, cy: 140, r: 4.5, o: 0.30 },
  { cx:  760, cy: 360, r: 2.5, o: 0.13 },
  { cx:  880, cy: 220, r: 3.0, o: 0.16 },
  { cx:  960, cy:  70, r: 2.5, o: 0.13 },
  { cx: 1060, cy: 310, r: 4.5, o: 0.28 },
  { cx: 1160, cy: 170, r: 3.0, o: 0.16 },
  { cx: 1280, cy:  90, r: 2.5, o: 0.13 },
  { cx: 1360, cy: 270, r: 3.0, o: 0.15 },
  { cx: 1420, cy: 130, r: 2.5, o: 0.13 },
  { cx:   60, cy: 480, r: 2.5, o: 0.11 },
  { cx:  640, cy: 520, r: 2.5, o: 0.12 },
  { cx: 1120, cy: 560, r: 3.0, o: 0.14 },
];

const LINES: [number, number][] = [
  [0, 1], [0, 3],
  [1, 2], [1, 4],
  [2, 3], [2, 5],
  [3, 5], [3, 15],
  [4, 5], [4, 6],
  [5, 6], [5, 7],
  [6, 7], [6, 8], [6, 9],
  [7, 8], [7, 10], [7, 16],
  [8, 9], [8, 10],
  [9, 11],
  [10, 11], [10, 17],
  [11, 12], [11, 13],
  [12, 13], [12, 14],
  [13, 14],
];

const DOTS = [
  { cx:  170, cy: 220, r: 1.5 },
  { cx:  460, cy: 440, r: 2.0 },
  { cx:  820, cy:  40, r: 1.5 },
  { cx: 1040, cy: 480, r: 2.0 },
  { cx: 1340, cy: 460, r: 1.5 },
];

const ctaTitleLines: Array<Array<{ text: string }>> = [
  [{ text: 'Have' }, { text: 'a' }, { text: 'Vision' }, { text: 'Worth' }],
  [{ text: 'Building' }, { text: 'Together?' }],
];

export default function ProjectsCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section  = sectionRef.current;
    const glowEl   = glowRef.current;
    const words    = h2Ref.current?.querySelectorAll<HTMLElement>('.pc-word') ?? [];
    const descEl   = descRef.current;
    const buttonEl = buttonsRef.current;
    const imgEl    = imgRef.current;

    if (section && glowEl) {
      gsap.set(glowEl, {
        xPercent: -50, yPercent: -50,
        x: section.offsetWidth / 2,
        y: section.offsetHeight / 2,
      });
    }

    if (descEl)   gsap.set(descEl,   { opacity: 0, y: 24 });
    if (buttonEl) gsap.set(buttonEl, { opacity: 0 });
    if (imgEl)    gsap.set(imgEl,    { opacity: 0, y: 100 });

    const onMove = (e: MouseEvent) => {
      if (!section || !glowEl) return;
      const r = section.getBoundingClientRect();
      gsap.to(glowEl, {
        x: e.clientX - r.left, y: e.clientY - r.top,
        duration: 1.4, ease: 'power1.out', overwrite: 'auto',
      });
    };
    section?.addEventListener('mousemove', onMove);

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: h2Ref.current, start: 'top 85%', toggleActions: 'play none none none' },
      });

      if (descEl) {
        gsap.to(descEl, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: descEl, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }

      if (buttonEl) {
        gsap.to(buttonEl, {
          opacity: 1, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: buttonEl, start: 'top 75%', toggleActions: 'play none none none' },
        });
      }

      if (imgEl) {
        gsap.to(imgEl, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: imgEl, start: 'top 70%', toggleActions: 'play none none none' },
        });
      }
    });

    return () => {
      ctx.revert();
      section?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary text-primary-foreground py-24 md:py-32"
    >
      {/* Plexus node-network pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {LINES.map(([i, j], k) => (
          <line
            key={k}
            x1={NODES[i].cx} y1={NODES[i].cy}
            x2={NODES[j].cx} y2={NODES[j].cy}
            stroke="white" strokeWidth="0.6" strokeOpacity="0.08"
          />
        ))}
        {NODES.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="white" fillOpacity={n.o} />
        ))}
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="white" fillOpacity="0.09" />
        ))}
      </svg>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none w-[300px] h-[300px] rounded-full"
        style={{ background: 'radial-gradient(circle, oklch(0.65 0.14 260 / 0.11) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left — content */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-6">
              02 / Next Steps
            </p>
            <h2
              ref={h2Ref}
              className="text-[clamp(36px,4vw,65px)] font-sans font-semibold leading-none tracking-tight mb-6"
            >
              {ctaTitleLines.map((line, lineIdx) => (
                <span key={lineIdx} className="block">
                  {line.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className={cn(
                        'overflow-hidden inline-block',
                        wIdx < line.length - 1 && 'mr-[0.25em]'
                      )}
                    >
                      <span className="pc-word inline-block">{word.text}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <p
              ref={descRef}
              className="text-base text-primary-foreground/60 font-sans leading-relaxed max-w-md mb-10"
            >
              I&apos;m always open to meaningful collaborations — whether you&apos;re launching a
              venture, scaling an existing one, or exploring how AI can transform your
              organisation responsibly.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <Link
                href="/connect"
                className={cn(buttonVariants({ variant: 'secondary' }), 'text-[10px] tracking-[0.2em] uppercase px-10 gap-2')}
              >
                Start a Conversation <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/expertise"
                className="text-[10px] tracking-[0.2em] uppercase font-sans text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                View Expertise <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div ref={imgRef} className="relative aspect-4/5 rounded-2xl overflow-hidden hidden lg:block">
            <Image
              src={IMAGES.connect}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
