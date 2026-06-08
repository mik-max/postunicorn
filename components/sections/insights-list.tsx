'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { insights } from '@/data/insights';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(
    new Date(dateStr)
  );
}

export default function InsightsList() {
  return (
    <section className="py-24 md:py-32">
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
            01 / Articles &amp; Perspectives
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Articles */}
        <div className="divide-y divide-border">
          {insights.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={reveal}
              className="py-12 grid grid-cols-1 lg:grid-cols-[2fr_3fr_auto] gap-6 lg:gap-16 items-start"
            >
              {/* Left — index + meta */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-sans text-accent">0{i + 1}/</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground border border-border rounded-full px-3 py-1">
                    {insight.type}
                  </span>
                </div>
                <p className="text-[11px] font-sans text-muted-foreground tracking-wide">
                  {formatDate(insight.publishedAt)}
                </p>
              </div>

              {/* Centre — title + teaser */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl md:text-2xl font-sans font-semibold leading-tight tracking-tight">
                  {insight.title}
                </h3>
                <p className="text-[14px] text-muted-foreground font-sans leading-relaxed">
                  {insight.teaser}
                </p>
              </div>

              {/* Right — link */}
              <div className="flex items-start lg:pt-1">
                <Link
                  href={`/insights/${insight.slug}`}
                  className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase font-sans text-accent hover:text-foreground transition-colors"
                >
                  Read <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
