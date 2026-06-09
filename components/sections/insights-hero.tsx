'use client';

import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';

const titleLines: Array<Array<{ text: string; em?: true }>> = [
  [{ text: 'Perspectives' }, { text: 'That' }],
  [{ text: 'Challenge,' }, { text: 'Ideas' }],
  [{ text: 'That' }, { text: 'Endure.', em: true }],
];

export default function InsightsHero() {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mosaicRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const words = h1Ref.current?.querySelectorAll<HTMLElement>('.ih-word') ?? [];
    const descEl = descRef.current;
    const buttonEls = buttonsRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [];
    const imgs = mosaicRef.current?.querySelectorAll<HTMLElement>('.mosaic-img') ?? [];

    if (descEl) gsap.set(descEl, { opacity: 0, y: 24 });
    gsap.set(buttonEls, { opacity: 0 });
    gsap.set(imgs, { opacity: 0, scale: 0 });

    const ctx = gsap.context(() => {
      gsap.fromTo(words, { yPercent: 110 }, {
        yPercent: 0, duration: 1, ease: 'power3.out', stagger: 0.07,
      });

      if (descEl) {
        gsap.to(descEl, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.55 });
      }

      gsap.to(buttonEls, {
        opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 1.0,
      });

      gsap.to(imgs, {
        opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)',
        stagger: { each: 0.12, from: 'random' }, delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — content */}
          <div className="py-16">
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted-foreground mb-8">
              Insights &amp; Research
            </p>
            <h1
              ref={h1Ref}
              className="text-[clamp(44px,7vw,60px)] leading-[0.95] font-black tracking-tight mb-8"
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
                        <em className="ih-word not-italic text-accent inline-block">{word.text}</em>
                      ) : (
                        <span className="ih-word inline-block">{word.text}</span>
                      )}
                    </span>
                  ))}
                </span>
              ))}
            </h1>
            <p
              ref={descRef}
              className="text-base text-muted-foreground font-sans leading-relaxed max-w-md mb-10"
            >
              Writing, research, and reflections on AI governance, venture growth, leadership,
              and what it means to build with purpose in a rapidly shifting world.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-3">
              <Link
                href="/connect"
                className={cn(
                  buttonVariants(),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                Get In Touch <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/expertise"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                View Expertise <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — staggered mosaic (desktop only) */}
          <div ref={mosaicRef} className="hidden lg:flex gap-3">
            <div className="flex-1 flex flex-col gap-3 -mt-24">
              <div className="mosaic-img relative rounded-2xl overflow-hidden h-[300px]">
                <Image
                  src={IMAGES.expertise}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                  priority
                />
              </div>
              <div className="mosaic-img relative rounded-2xl overflow-hidden h-[200px]">
                <Image
                  src={IMAGES.connect}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
              <div className="mosaic-img relative rounded-2xl overflow-hidden h-[180px]">
                <Image
                  src={IMAGES.hero}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-3 mt-16">
              <div className="mosaic-img relative rounded-2xl overflow-hidden h-[360px]">
                <Image
                  src={IMAGES.aboutCta}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
              <div className="mosaic-img relative rounded-2xl overflow-hidden h-[220px]">
                <Image
                  src={IMAGES.connect}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="22vw"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
