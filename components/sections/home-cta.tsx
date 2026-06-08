import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { IMAGES } from '@/constants/images';

export default function HomeCta() {
  return (
    <section className="bg-secondary py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">

          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-muted-foreground mb-6">
              Let&apos;s Connect
            </p>
            <h2 className="text-[clamp(36px,6vw,60px)] font-sans font-semibold leading-none tracking-tight">
              Ready to accelerate<br />
              your next chapter?
            </h2>
            <p className="mt-6 mb-6 text-sm text-muted-foreground font-sans max-w-md leading-relaxed">
              I&apos;m selective about partnerships because I believe in deep impact. If you&apos;re
              building something meaningful and you&apos;ve got the right heart — let&apos;s talk.
            </p>

            <Link
              href="/connect"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'text-[10px] tracking-[0.2em] uppercase px-10 gap-2'
              )}
            >
              Start a Conversation <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="shrink-0">
            <Image
              src={IMAGES.connect}
              alt=""
              width={520}
              height={200}
              className="rounded-4xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
