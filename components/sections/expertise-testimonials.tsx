'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { IMAGES } from '@/constants/images';

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

export default function ExpertiseTestimonials() {
  const [active, setActive] = useState(0);

  function prev() {
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }
  function next() {
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  const current = testimonials[active];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered header */}
        <div className="text-center mb-16 flex flex-col items-center gap-5">
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
        </div>

        {/* Testimonial — image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — portrait image slot */}
          {/* Image placeholder: swap src for real testimonial portrait when available */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg max-w-sm mx-auto lg:mx-0 w-full">
            <Image
              key={current.id}
              src={current.image}
              alt={current.name}
              fill
              className="object-cover transition-opacity duration-500"
              sizes="(max-width: 1024px) 80vw, 40vw"
            />
          </div>

          {/* Right — quote + attribution + navigation */}
          <div className="flex flex-col gap-8">

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-[clamp(17px,2vw,22px)] font-sans text-foreground leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="border-l-2 border-accent pl-5">
              <p className="text-base font-sans font-semibold text-foreground">
                {current.name}
              </p>
              <p className="text-[13px] font-sans text-muted-foreground mt-0.5">
                {current.title}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === active
                        ? 'w-6 bg-foreground'
                        : 'w-1.5 bg-border hover:bg-muted-foreground'
                      }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
