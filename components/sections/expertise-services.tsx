'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { services } from '@/data/expertise';
import { IMAGES } from '@/constants/images';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function ExpertiseServices() {
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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-center mb-16"
        >
          <div>
            <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-semibold leading-tight tracking-tight mb-4">
              Engagements designed<br />
              for <em className="not-italic text-accent">real outcomes</em>.
            </h2>
            <p className="text-[15px] text-muted-foreground font-sans leading-relaxed">
              Every service is tailored to your context — no templates, no filler.
            </p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden hidden lg:block">
            <Image
              src={IMAGES.expertiseEngagement}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border"
        >
          {services.map((service, i) => (
            <div key={service.title} className="bg-secondary p-10 flex flex-col gap-5">
              <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
              <h3 className="text-2xl font-sans font-semibold leading-tight tracking-tight">
                {service.title}
              </h3>
              <p className="text-[14px] text-muted-foreground font-sans leading-relaxed flex-1">
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
        </motion.div>

      </div>
    </section>
  );
}
