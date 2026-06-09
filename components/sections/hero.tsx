'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { IMAGES } from '@/constants/images';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import gsap from 'gsap';

const stats = [
  { value: '12+',  end: 12,  suffix: '+', label: 'Years of\nExperience' },
  { value: '20+',  end: 20,  suffix: '+', label: 'Ventures\nEnabled' },
  { value: '100+', end: 100, suffix: '+', label: 'Entrepreneurs\nMentored' },
  { value: '4',    end: 4,   suffix: '',  label: 'Continents\nReached' },
];

// Title split into lines → words for mask-reveal animation.
// 'em' marks the styled word ("Today.").
const titleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: 'Building' }, { text: "Tomorrow's" }],
  [{ text: 'Winning' }, { text: 'Innovations' }],
  [{ text: 'Today.', em: true }],
];

// Description split for line-by-line reveal (approximates ~max-w-md wrapping at desktop).
const heroDescLines = [
  'With over 12 years forging strategic partnerships',
  'across Africa, the Middle-East and North America,',
  'I help visionary leaders harness business systems,',
  'technology, and ethical AI to drive sustainable',
  'venture growth.',
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
});

export default function Hero() {
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words      = titleRef.current?.querySelectorAll<HTMLElement>('.hero-word') ?? [];
    const lines      = descRef.current?.querySelectorAll<HTMLElement>('.hero-line') ?? [];
    const statEls    = statsRef.current?.querySelectorAll<HTMLElement>('.stat-number') ?? [];
    const buttonEls  = buttonsRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [];

    // Reset stat numbers to 0 before paint so there's no flash of the final value.
    statEls.forEach((el) => {
      el.textContent = '0' + (el.getAttribute('data-suffix') ?? '');
    });

    const ctx = gsap.context(() => {
      // 1 — title word reveal
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.07,
      });

      // 2 — description line reveal
      gsap.fromTo(lines, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.6,
      });

      // 3 — stats count up
      statEls.forEach((el, i) => {
        const end    = parseInt(el.getAttribute('data-end') ?? '0', 10);
        const suffix = el.getAttribute('data-suffix') ?? '';
        const obj    = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 2,
          ease: 'power2.out',
          delay: 1.0 + i * 0.08,
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      // 4 — buttons fade in
      gsap.fromTo(buttonEls, { opacity: 0 }, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
        delay: 1.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-[100svh] flex flex-col pt-24 ">
      {/* Headline area — grows to fill space */}
      <div
        className="flex-1 w-[calc(100%-2rem)] sm:w-full max-w-7xl mx-4 sm:mx-auto px-6 flex flex-col justify-center py-16 rounded-4xl bg-gray-900"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'soft-light',
        }}
      >
        <motion.p
          {...fade(0.8)}
          className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted mb-10"
        >
          Managing Partner · AI Governance Researcher · Canada
        </motion.p>

        {/* Split-text headline — each word slides up from behind its mask */}
        <h1
          ref={titleRef}
          className="text-[clamp(48px,8.5vw,70px)] leading-[0.95] font-black tracking-tight text-white/90"
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
                    <em className="hero-word not-italic text-muted-foreground inline-block">
                      {word.text}
                    </em>
                  ) : (
                    <span className="hero-word inline-block">{word.text}</span>
                  )}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      {/* Bottom bar — anchored to viewport bottom */}
      <motion.div
        {...fade(0.25)}
        className="max-w-7xl mt-8 mx-auto px-6 w-full border-t border-border py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Subheadline */}
          <div>
            <p ref={descRef} className="text-base text-muted-foreground font-sans leading-relaxed max-w-md self-center">
              {heroDescLines.map((line, i) => (
                <span key={i} className="overflow-hidden block">
                  <span className="hero-line block">{line}</span>
                </span>
              ))}
            </p>
          </div>

          {/* Stats + CTAs */}
          <div className="space-y-8">
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 gap-y-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className="stat-number text-2xl md:text-3xl font-semibold font-sans leading-none"
                    data-end={s.end}
                    data-suffix={s.suffix}
                  >
                    {s.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-2 font-sans whitespace-pre-line leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/expertise"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2 w-full sm:w-auto'
                )}
              >
                Book a Consultation <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 w-full sm:w-auto'
                )}
              >
                Discover My Journey
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
