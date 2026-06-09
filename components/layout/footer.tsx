import Link from 'next/link';
import { NAV_LINKS, FOOTER_LINKS } from '@/constants/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="text-xl font-bold tracking-tighter font-sans mb-4 block">
              post<span className="text-accent">unicorn</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-sans">
              Pioneering Ethical AI and Venture Growth for a Connected World.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5 font-sans">
              Navigation
            </p>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5 font-sans">
              More
            </p>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sans text-foreground/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              <a
                href="mailto:ir@postunicorn.com"
                className="text-sm font-sans text-foreground/70 hover:text-accent transition-colors block"
              >
                ir@postunicorn.com
              </a>
              <a
                href="https://x.com/israelraphael_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans text-foreground/70 hover:text-accent transition-colors block"
              >
                X @israelraphael_
              </a>
            </div>
          </div>
        </div>

        {/* Large background wordmark */}
        <div className="relative overflow-hidden border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs font-sans text-muted-foreground">
              © {new Date().getFullYear()} Israel Raphael. All rights reserved.
            </p>
            <p className="text-xs font-sans text-muted-foreground">Ontario, Canada</p>
          </div>
          <p
            aria-hidden
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[50px] md:text-[80px] xl:text-[120px] font-bold font-sans tracking-tighter text-foreground/12 leading-none select-none pointer-events-none uppercase"
          >
            Postunicorn
          </p>
        </div>
      </div>
    </footer>
  );
}
