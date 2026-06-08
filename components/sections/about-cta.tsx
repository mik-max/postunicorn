import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';

export default function AboutCta() {
  return (
    <section className="bg-primary text-primary-foreground py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left — content */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-6">
              04 / Personal Touch
            </p>

            <p className="text-base text-primary-foreground/60 font-sans leading-relaxed mb-14">
              When I&apos;m not strategizing the future, you&apos;ll find me authoring reflections on X,
              composing music, or exploring the intersections of faith, innovation, and profit.
              I&apos;m committed to lifelong growth — actively pursuing advanced degrees to deepen
              my research in AI × Business Ethics.
            </p>

            <h2 className="text-[clamp(36px,4vw,65px)] font-sans font-semibold leading-[1.0] tracking-tight mb-8">
              Let&apos;s Build Something<br />
              Extraordinary.
            </h2>

            <p className="text-base text-primary-foreground/60 font-sans leading-relaxed mb-10">
              Whether you&apos;re a founder seeking venture traction, an organization exploring AI
              adoption, or an admissions committee valuing proven innovators — I&apos;m here to
              contribute meaningfully.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/connect"
                className={cn(
                  buttonVariants({ variant: 'secondary' }),
                  'text-[10px] tracking-[0.2em] uppercase px-10 gap-2'
                )}
              >
                Start a Conversation <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about/resume"
                className="text-[10px] tracking-[0.2em] uppercase font-sans text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                View Resume <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden">
            <Image
              src={IMAGES.aboutCta}
              alt="Israel Raphael"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
