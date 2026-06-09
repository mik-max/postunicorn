'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// “/” = curly double quotes, ’ = curly apostrophe
const quoteLines = [
  '“Innovation isn’t just about tech.',
  'It’s about trust, ethics, and the',
  'courage to build lasting solutions.”',
];

// Plexus network data — coordinates in a 1440x480 viewBox.
// SVG uses preserveAspectRatio="xMidYMid slice" to fill the section.
type PlexusNode = { cx: number; cy: number; r: number; o: number };
const NODES: PlexusNode[] = [
  { cx:  150, cy:  70, r: 2.5, o: 0.15 },
  { cx:  260, cy: 130, r: 3.5, o: 0.18 },
  { cx:  380, cy:  60, r: 2.5, o: 0.15 },
  { cx:  310, cy: 240, r: 5.0, o: 0.36 }, // accent node
  { cx:  460, cy: 170, r: 3.0, o: 0.18 },
  { cx:  520, cy:  80, r: 2.5, o: 0.14 },
  { cx:  200, cy: 350, r: 2.5, o: 0.14 },
  { cx:  100, cy: 260, r: 3.5, o: 0.18 },
  { cx:  420, cy: 320, r: 3.0, o: 0.16 },
  { cx:  560, cy: 280, r: 5.5, o: 0.36 }, // accent node
  { cx:  680, cy: 140, r: 3.5, o: 0.18 },
  { cx:  750, cy:  80, r: 2.5, o: 0.14 },
  { cx:  720, cy: 260, r: 4.0, o: 0.22 },
  { cx:  840, cy: 180, r: 3.0, o: 0.16 },
  { cx:  920, cy: 300, r: 5.5, o: 0.36 }, // accent node
  { cx: 1000, cy: 200, r: 4.0, o: 0.22 },
  { cx: 1080, cy: 120, r: 3.0, o: 0.16 },
  { cx: 1050, cy: 350, r: 3.0, o: 0.16 },
  { cx: 1160, cy: 260, r: 4.0, o: 0.22 },
  { cx: 1240, cy: 180, r: 3.0, o: 0.16 },
  { cx: 1320, cy: 280, r: 2.5, o: 0.14 },
  { cx: 1380, cy: 140, r: 2.5, o: 0.14 },
  { cx:  870, cy: 400, r: 2.5, o: 0.14 },
  { cx:  640, cy: 400, r: 3.0, o: 0.16 },
  { cx:  300, cy: 440, r: 2.5, o: 0.14 },
];

// Index pairs — only connect nodes within ~220px of each other.
const LINES: [number, number][] = [
  [0,1],[0,7],
  [1,2],[1,3],[1,7],
  [2,4],[2,5],
  [3,4],[3,6],[3,8],
  [4,5],[4,9],
  [5,10],
  [6,7],
  [8,9],
  [9,10],[9,12],[9,23],
  [10,11],[10,12],[10,13],
  [11,13],
  [12,13],[12,14],[12,23],
  [13,14],[13,15],
  [14,15],[14,17],[14,22],
  [15,16],[15,17],[15,18],
  [16,18],[16,19],
  [17,18],[17,22],
  [18,19],[18,20],
  [19,20],[19,21],
  [20,21],
  [6,24],[8,24],
];

// Isolated scatter dots for texture.
const DOTS = [
  { cx:   60, cy: 150, r: 1.5 },
  { cx:  180, cy: 160, r: 1.5 },
  { cx:  450, cy: 420, r: 2.0 },
  { cx:  580, cy:  55, r: 2.0 },
  { cx:  800, cy: 465, r: 1.5 },
  { cx: 1120, cy: 420, r: 2.0 },
  { cx: 1350, cy: 400, r: 1.5 },
  { cx: 1400, cy: 340, r: 1.5 },
];

export default function QuoteBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef   = useRef<HTMLQuoteElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const glowEl  = glowRef.current;
    const lines   = quoteRef.current?.querySelectorAll<HTMLElement>('.quote-line') ?? [];

    // Park glow at section center before any mouse interaction.
    if (section && glowEl) {
      gsap.set(glowEl, {
        xPercent: -50,
        yPercent: -50,
        x: section.offsetWidth / 2,
        y: section.offsetHeight / 2,
      });
    }

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
      gsap.fromTo(
        lines,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ctx.revert();
      section?.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary text-primary-foreground py-20 md:py-28"
    >
      {/* Plexus node-network pattern */}
      <svg
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 480"
        preserveAspectRatio="xMidYMid slice"
      >
        {LINES.map(([i, j], k) => (
          <line
            key={k}
            x1={NODES[i].cx} y1={NODES[i].cy}
            x2={NODES[j].cx} y2={NODES[j].cy}
            stroke="white"
            strokeWidth="0.6"
            strokeOpacity="0.09"
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
            fillOpacity="0.10"
          />
        ))}
      </svg>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute top-0 left-0 pointer-events-none w-[340px] h-[340px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, oklch(0.65 0.14 260 / 0.11) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-12">
          On Innovation
        </p>

        <blockquote
          ref={quoteRef}
          className="font-display font-medium italic leading-[1.1] text-[clamp(32px,5vw,64px)]"
        >
          {quoteLines.map((line, i) => (
            <span key={i} className="overflow-hidden block">
              <span className="quote-line block">{line}</span>
            </span>
          ))}
        </blockquote>

        <cite className="block mt-10 text-[10px] font-sans tracking-[0.3em] uppercase text-primary-foreground/50 not-italic">
          &mdash; Israel Raphael
        </cite>
      </div>
    </section>
  );
}
