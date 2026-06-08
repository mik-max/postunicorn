import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';

export default function ConnectHero() {
  return (
    <section className="overflow-hidden pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — content */}
          <div className="py-16">
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted-foreground mb-8">
              Connect
            </p>
            <h1 className="text-[clamp(44px,7vw,60px)] leading-[0.95] font-black tracking-tight mb-8">
              Let&apos;s Build<br />
              Something{' '}
              <em className="not-italic text-accent">Meaningful</em>.
            </h1>
            <p className="text-base text-muted-foreground font-sans leading-relaxed max-w-md mb-10">
              Whether it&apos;s a consultation, a collaboration, a speaking engagement, or simply
              a conversation — reach out. The right connections create lasting impact.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#contact-form"
                className={cn(
                  buttonVariants(),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                Send a Message <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-[10px] tracking-[0.2em] uppercase px-8 gap-2'
                )}
              >
                Learn About Me <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — staggered mosaic (desktop only) */}
          <div className="hidden lg:flex gap-3">
            {/* Column 1 — pulls up to bleed above section */}
            <div className="flex-1 flex flex-col gap-3 -mt-24">
              <div className="relative rounded-2xl overflow-hidden h-[300px]">
                <Image
                  src={IMAGES.connect}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                  priority
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[200px]">
                <Image
                  src={IMAGES.aboutCta}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[180px]">
                <Image
                  src={IMAGES.expertise}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
            </div>

            {/* Column 2 — offset downward */}
            <div className="flex-1 flex flex-col gap-3 mt-16">
              <div className="relative rounded-2xl overflow-hidden h-[360px]">
                <Image
                  src={IMAGES.hero}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="22vw"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden h-[220px]">
                <Image
                  src={IMAGES.aboutCta}
                  alt=""
                  fill
                  className="object-cover object-bottom"
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
