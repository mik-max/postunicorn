import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';

export default function ProjectsCta() {
  return (
    <section className="bg-primary text-primary-foreground py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">

          {/* Left — content */}
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-6">
              02 / Next Steps
            </p>
            <h2 className="text-[clamp(36px,4vw,65px)] font-sans font-semibold leading-[1.0] tracking-tight mb-6">
              Have a Vision Worth<br />
              Building Together?
            </h2>
            <p className="text-base text-primary-foreground/60 font-sans leading-relaxed max-w-md mb-10">
              I&apos;m always open to meaningful collaborations — whether you&apos;re launching a
              venture, scaling an existing one, or exploring how AI can transform your
              organisation responsibly.
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
                href="/expertise"
                className="text-[10px] tracking-[0.2em] uppercase font-sans text-primary-foreground/50 hover:text-primary-foreground transition-colors flex items-center gap-2"
              >
                View Expertise <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative aspect-4/5 rounded-2xl overflow-hidden hidden lg:block">
            <Image
              src={IMAGES.connect}
              alt=""
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
