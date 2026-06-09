'use client';

import { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Title split for mask-reveal
const titleLines: Array<Array<{ text: string }>> = [
  [{ text: 'Ready' }, { text: 'to' }, { text: 'accelerate' }],
  [{ text: 'your' }, { text: 'next' }, { text: 'chapter?' }],
];

// Description split for line-by-line reveal (approximates ~max-w-md wrapping at desktop).
const ctaDescLines = [
  "I'm selective about partnerships because I believe",
  "in deep impact. If you're building something",
  "meaningful and you've got the right heart —",
  "let's talk.",
];

export default function HomeCta() {
  const h2Ref   = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const words = h2Ref.current?.querySelectorAll<HTMLElement>('.cta-word') ?? [];
    const lines = descRef.current?.querySelectorAll<HTMLElement>('.cta-line') ?? [];
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
        stagger: 0.08,
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
    <section className="bg-secondary py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">

          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted-foreground mb-6">
              Let&apos;s Connect
            </p>
            <h2
              ref={h2Ref}
              className="text-[clamp(36px,6vw,60px)] font-sans font-semibold leading-none tracking-tight"
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
                      <span className="cta-word inline-block">{word.text}</span>
                    </span>
                  ))}
                </span>
              ))}
            </h2>
            <p ref={descRef} className="mt-6 mb-6 text-sm text-muted-foreground font-sans max-w-md leading-relaxed">
              {ctaDescLines.map((line, i) => (
                <span key={i} className="overflow-hidden block">
                  <span className="cta-line block">{line}</span>
                </span>
              ))}
            </p>

            <Link
              href="/connect"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'text-[10px] tracking-[0.2em] uppercase px-10 gap-2'
              )}
            >
              Start a Conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="shrink-0">
            <Image
              src={IMAGES.connect}
              alt=""
              width={520}
              height={200}
              className="rounded-4xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
