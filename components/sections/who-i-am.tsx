'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { expertiseAreas } from '@/data/expertise';
import { IMAGES } from '@/constants/images';

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
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-sans font-semibold leading-[1.05] tracking-tight mb-8">
              I&apos;m Israel Raphael,<br />
              <em className="not-italic text-accent">a bridge-builder</em><br />
              between ideas and impact.
            </h2>
            <div className="space-y-4 text-muted-foreground font-sans leading-relaxed text-[15px]">
              <p>
                From leading innovation teams at Black Unicorn &amp; Allied Partners to scaling
                opportunities at Nigeria&apos;s Wennovation Hub, I&apos;ve dedicated my career
                to turning bold ideas and market gaps into profit realities.
              </p>
              <p>
                Whether it&apos;s navigating complex EMEA markets or advising on business ethics,
                my work is rooted in integrity, curiosity, and a youthful drive to solve
                real-world challenges.
              </p>
            </div>

            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'mt-10 text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
              )}
            >
              Full Story <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          {/* Right — Why Partner With Me */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="flex flex-col justify-center"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
              Why Partner With Me?
            </p>

            <div className="divide-y divide-border">
              {valueProps.map((prop, i) => (
                <div key={prop.title} className="py-7 flex gap-6">
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
          </motion.div>
        </div>

        {/* Expertise snapshot */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="border-t border-border pt-12"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-8">
            Expertise Snapshot
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 2×2 card grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertiseAreas.map((item, i) => (
                <div
                  key={item.area}
                  className="flex flex-col justify-between p-6 rounded-2xl border border-dashed border-border bg-card min-h-[200px]"
                >
                  <div>
                    <span className="text-xs font-sans text-accent mb-3 block">
                      0{i + 1}/
                    </span>
                    <h4 className="text-sm font-semibold font-sans text-foreground leading-snug">
                      {item.area}
                    </h4>
                  </div>
                  <p className="text-[13px] text-muted-foreground font-sans leading-relaxed mt-4">
                    {item.whatIBring}
                  </p>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden hidden lg:block">
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
        </motion.div>

      </div>
    </section>
  );
}
