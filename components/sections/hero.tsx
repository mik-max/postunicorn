'use client';

import Link from 'next/link';
import { IMAGES } from '@/constants/images';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const stats = [
  { value: '12+', label: 'Years of\nExperience' },
  { value: '20+', label: 'Ventures\nEnabled' },
  { value: '100+', label: 'Entrepreneurs\nMentored' },
  { value: '4', label: 'Continents\nReached' },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' as const, delay },
});

export default function Hero() {
  return (
    <section className="min-h-[100svh] flex flex-col pt-24 ">
      {/* Headline area — grows to fill space */}
      <div className="flex-1 max-w-7xl mx-auto px-6 w-full flex flex-col justify-center py-16 rounded-4xl bg-gray-900"
        style={{
          backgroundImage: `url(${IMAGES.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "soft-light"
        }}
      >
        <motion.p
          {...fade(0)}
          className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted mb-10"
        >
          Managing Partner · AI Governance Researcher · Canada
        </motion.p>

        <motion.h1
          {...fade(0.1)}
          className="text-[clamp(48px,8.5vw,70px)] leading-[0.95] font-black tracking-tight font- text-white/90"
        >
          Building Tomorrow&apos;s<br />
          Winning Innovations<br />
          <em className="not-italic text-muted-foreground">Today.</em>
        </motion.h1>
      </div>

      {/* Bottom bar — anchored to viewport bottom */}
      <motion.div
        {...fade(0.25)}
        className="max-w-7xl mt-8 mx-auto px-6 w-full border-t border-border py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24"
        >
          {/* Subheadline */}
          <div className="">
            <p className="text-base text-muted-foreground font-sans leading-relaxed max-w-md self-center">
              With over 12 years forging strategic partnerships across Africa, the Middle-East
              and North America, I help visionary leaders harness business systems, technology,
              and ethical AI to drive sustainable venture growth.
            </p>
          </div>


          {/* Stats + CTAs */}
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-semibold font-sans leading-none">
                    {s.value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground mt-2 font-sans whitespace-pre-line leading-snug">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/expertise"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                Book a Consultation <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8'
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
