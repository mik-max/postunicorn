'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { IMAGES } from '@/constants/images';
import gsap from 'gsap';

const testimonials = [
  {
    id: 1,
    quote:
      "Israel's strategic guidance helped us navigate a complex market entry into West Africa. His depth of knowledge and ethical approach to business development is genuinely unmatched.",
    name: 'David Okonkwo',
    title: 'CEO · TechBridge Africa',
    image: IMAGES.aboutCta,
  },
  {
    id: 2,
    quote:
      'Working with Israel on our AI governance framework changed how we think about responsible tech deployment. His insight bridges the gap between policy and practice in a way I have not encountered elsewhere.',
    name: 'Sophia Reinholt',
    title: 'VP of Innovation · Nordic Ventures',
    image: IMAGES.expertise,
  },
  {
    id: 3,
    quote:
      "Israel's workshop on venture growth in emerging markets gave our team a completely new lens. Research-backed, deeply practical, and genuinely inspiring — we left with a real plan.",
    name: 'Marcus Adeyemi',
    title: 'Managing Director · Wennovation Hub',
    image: IMAGES.hero,
  },
];

const N = testimonials.length;

// Stack position styles indexed by deck position (0=front, 1=middle, 2=back)
const STACK = [
  { scale: 1,    opacity: 1,    y: 0  },
  { scale: 0.93, opacity: 0.65, y: 22 },
  { scale: 0.86, opacity: 0.35, y: 40 },
];

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

export default function ExpertiseTestimonials() {
  const [active, setActive] = useState(0);
  const cardRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const animating = useRef(false);
  // Capture active in a ref so GSAP closures always read the latest value
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    // Set initial stack positions: card i has deck position i (active=0)
    testimonials.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (el) gsap.set(el, { ...STACK[i], zIndex: N - i });
    });
  }, []);

  // --- helpers ---

  function posOf(cardIdx: number, currentActive: number) {
    return (cardIdx - currentActive + N) % N;
  }

  function handleNext() {
    if (animating.current) return;
    animating.current = true;

    const cur  = activeRef.current;
    const next = (cur + 1) % N;

    const frontEl = cardRefs.current[cur]!;
    const midEl   = cardRefs.current[(cur + 1) % N]!;
    const backEl  = cardRefs.current[(cur + 2) % N]!;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        // Correct z-indexes to match new active
        testimonials.forEach((_, i) => {
          const el = cardRefs.current[i];
          if (el) gsap.set(el, { zIndex: N - posOf(i, next) });
        });
        activeRef.current = next;
        animating.current = false;
        setActive(next);
      },
    });

    // Phase 1 (t=0): front exits UP; mid → front; back → mid
    tl.to(frontEl, { y: -110, opacity: 0.45, duration: 0.45, ease: 'power1.in' }, 0);
    tl.to(midEl,   { ...STACK[0], duration: 0.65 }, 0);
    tl.to(backEl,  { ...STACK[1], duration: 0.65 }, 0);

    // Phase 2 (t=0.40): old front drops behind and settles at back
    tl.set(frontEl,  { zIndex: 0 }, 0.40);
    tl.to(frontEl, { ...STACK[2], duration: 0.55 }, 0.40);
  }

  function handlePrev() {
    if (animating.current) return;
    animating.current = true;

    const cur  = activeRef.current;
    const prev = (cur - 1 + N) % N;

    const frontEl = cardRefs.current[cur]!;
    const midEl   = cardRefs.current[(cur + 1) % N]!;
    const backEl  = cardRefs.current[(cur + 2) % N]!;

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        testimonials.forEach((_, i) => {
          const el = cardRefs.current[i];
          if (el) gsap.set(el, { zIndex: N - posOf(i, prev) });
        });
        activeRef.current = prev;
        animating.current = false;
        setActive(prev);
      },
    });

    // Phase 1 (t=0): front exits DOWN; back → front (grows up); mid → back
    tl.to(frontEl, { y: 110, opacity: 0.45, duration: 0.45, ease: 'power1.in' }, 0);
    tl.set(backEl, { zIndex: N + 1 }, 0);
    tl.to(backEl,  { ...STACK[0], duration: 0.65 }, 0);
    tl.to(midEl,   { ...STACK[2], duration: 0.65 }, 0);

    // Phase 2 (t=0.40): old front rises back to middle position
    tl.set(frontEl, { zIndex: 2 }, 0.40);
    tl.to(frontEl,  { ...STACK[1], duration: 0.55 }, 0.40);
  }

  function goTo(target: number) {
    if (animating.current || target === activeRef.current) return;
    animating.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        activeRef.current = target;
        animating.current = false;
        setActive(target);
      },
    });

    testimonials.forEach((_, i) => {
      const pos = posOf(i, target);
      const el  = cardRefs.current[i];
      if (el) tl.to(el, { ...STACK[pos], zIndex: N - pos, duration: 0.6, ease: 'power2.out' }, 0);
    });
  }

  const current = testimonials[active];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="text-center mb-16 flex flex-col items-center gap-5"
        >
          <span className="inline-flex items-center border border-dashed border-accent/50 rounded-full px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase font-sans text-accent">
            Client Success Stories
          </span>
          <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-semibold leading-tight tracking-tight max-w-xl">
            What Clients Say
          </h2>
          <p className="text-[15px] text-muted-foreground font-sans leading-relaxed max-w-lg">
            Real outcomes from leaders and organisations who have worked with Israel across
            ventures, research, and strategic engagements.
          </p>
        </motion.div>

        {/* Testimonial — image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — GSAP-managed stacked card deck */}
          <div className="max-w-sm mx-auto lg:mx-0 w-full" style={{ paddingBottom: '3rem' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={reveal}
              className="relative w-full aspect-[3/4]"
            >
              {testimonials.map((t, i) => (
                <div
                  key={t.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — quote + attribution + navigation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ ...reveal, visible: { ...reveal.visible, transition: { duration: 0.8, ease: 'easeOut' as const, delay: 0.15 } } }}
            className="flex flex-col gap-8"
          >
            {/* Quote + attribution fade on active change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex flex-col gap-8"
              >
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[clamp(17px,2vw,22px)] font-sans text-foreground leading-relaxed">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <div className="border-l-2 border-accent pl-5">
                  <p className="text-base font-sans font-semibold text-foreground">{current.name}</p>
                  <p className="text-[13px] font-sans text-muted-foreground mt-0.5">{current.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-6 bg-foreground'
                        : 'w-1.5 bg-border hover:bg-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
