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

// Sparse plexus constellation — 18 nodes across a 1440×700 viewBox
type PlexusNode = { cx: number; cy: number; r: number; o: number };
const NODES: PlexusNode[] = [
  { cx:   80, cy: 120, r: 2.5, o: 0.14 },
  { cx:  200, cy:  60, r: 3.0, o: 0.16 },
  { cx:  340, cy: 160, r: 4.5, o: 0.30 }, // accent
  { cx:  180, cy: 300, r: 2.5, o: 0.14 },
  { cx:  420, cy:  80, r: 2.5, o: 0.13 },
  { cx:  500, cy: 240, r: 3.0, o: 0.16 },
  { cx:  640, cy: 140, r: 2.5, o: 0.14 },
  { cx:  720, cy: 360, r: 4.5, o: 0.28 }, // accent
  { cx:  860, cy: 200, r: 3.0, o: 0.16 },
  { cx:  960, cy:  80, r: 2.5, o: 0.13 },
  { cx: 1040, cy: 320, r: 3.0, o: 0.16 },
  { cx: 1160, cy: 160, r: 4.5, o: 0.30 }, // accent
  { cx: 1280, cy: 260, r: 2.5, o: 0.14 },
  { cx: 1380, cy: 100, r: 2.5, o: 0.13 },
  { cx: 1400, cy: 380, r: 3.0, o: 0.15 },
  { cx:   60, cy: 480, r: 2.5, o: 0.12 },
  { cx:  580, cy: 520, r: 2.5, o: 0.13 },
  { cx: 1100, cy: 560, r: 3.0, o: 0.15 },
];

const LINES: [number, number][] = [
  [0, 1], [0, 3],
  [1, 2], [1, 4],
  [2, 3], [2, 5],
  [3, 5], [3, 15],
  [4, 5], [4, 6],
  [5, 6], [5, 7],
  [6, 7], [6, 8],
  [7, 8], [7, 10], [7, 16],
  [8, 9], [8, 10],
  [9, 10], [9, 11],
  [10, 11], [10, 17],
  [11, 12], [11, 13],
  [12, 13], [12, 14],
  [13, 14],
];

const DOTS = [
  { cx:  130, cy: 220, r: 1.5 },
  { cx:  460, cy: 460, r: 2.0 },
  { cx:  800, cy:  50, r: 1.5 },
  { cx: 1050, cy: 480, r: 2.0 },
  { cx: 1320, cy: 580, r: 1.5 },
];

const ctaTitleLines: Array<Array<{ text: string }>> = [
  [{ text: "Let's" }, { text: 'Build' }, { text: 'Something' }],
  [{ text: 'Extraordinary.' }],
];

export default function AboutCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const h2Ref      = useRef<HTMLHeadingElement>(null);
  const desc1Ref   = useRef<HTMLParagraphElement>(null);
  const desc2Ref   = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section  = sectionRef.current;
    const glowEl   = glowRef.current;
    const words    = h2Ref.current?.querySelectorAll<HTMLElement>('.acta-word') ?? [];
    const desc1El  = desc1Ref.current;
    const desc2El  = desc2Ref.current;
    const buttonEl = buttonsRef.current;
    const imgEl    = imgRef.current;

    // Park glow at section center before any mouse interaction
    if (section && glowEl) {
      gsap.set(glowEl, {
        xPercent: -50,
        yPercent: -50,
        x: section.offsetWidth / 2,
        y: section.offsetHeight / 2,
      });
    }

    if (desc1El)  gsap.set(desc1El,  { opacity: 0, y: 24 });
    if (desc2El)  gsap.set(desc2El,  { opacity: 0, y: 24 });
    if (buttonEl) gsap.set(buttonEl, { opacity: 0 });
    if (imgEl)    gsap.set(imgEl,    { opacity: 0, y: 100 });

    const onMove = (e: MouseEvent) => {
      if (!section || !glowEl) return;
      const r = section.getBoundingClientRect();
      gsap.to(glowEl, {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        duration: 1.4,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };
    section?.addEventListener('mousemove', onMove);

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

      if (desc1El) {
        gsap.to(desc1El, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: desc1El, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
      if (desc2El) {
        gsap.to(desc2El, {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: desc2El, start: 'top 88%', toggleActions: 'play none none none' },
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
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity="0.08"
          />
        ))}
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.cx} cy={n.cy} r={n.r}
            fill="white"
            fillOpacity={n.o}
          />
        ))}
        {DOTS.map((d, i) => (
          <circle
            key={i}
            cx={d.cx} cy={d.cy} r={d.r}
            fill="white"
            fillOpacity="0.09"
          />
        ))}
      </svg>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none w-[300px] h-[300px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.65 0.14 260 / 0.11) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left — content */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-6">
              04 / Personal Touch
            </p>

            <p
              ref={desc1Ref}
              className="text-base text-primary-foreground/60 font-sans leading-relaxed mb-14"
            >
              When I&apos;m not strategizing the future, you&apos;ll find me authoring reflections on X,
              composing music, or exploring the intersections of faith, innovation, and profit.
              I&apos;m committed to lifelong growth — actively pursuing advanced degrees to deepen
              my research in AI &times; Business Ethics.
            </p>

            <h2
              ref={h2Ref}
              className="text-[clamp(36px,4vw,65px)] font-sans font-semibold leading-[1.0] tracking-tight mb-8"
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
                      <span className="acta-word inline-block">{word.text}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p
              ref={desc2Ref}
              className="text-base text-primary-foreground/60 font-sans leading-relaxed mb-10"
            >
              Whether you&apos;re a founder seeking venture traction, an organization exploring AI
              adoption, or an admissions committee valuing proven innovators — I&apos;m here to
              contribute meaningfully.
            </p>

            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <Link
                href="/connect"
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'text-[10px] tracking-[0.2em] uppercase px-10 gap-2'
                )}
              >
                Start a Conversation <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about/resume"
                className="text-[10px] tracking-[0.2em] uppercase font-sans text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                View Resume <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div ref={imgRef} className="relative aspect-4/5 rounded-2xl overflow-hidden">
            <Image
              src={IMAGES.aboutCta}
              alt="Israel Raphael"
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
