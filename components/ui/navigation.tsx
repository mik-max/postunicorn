'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/constants/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter font-sans">
          post<span className="text-accent">unicorn</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-xs uppercase tracking-[0.2em] font-sans text-foreground/60 hover:text-accent transition-colors',
                pathname === link.href && 'text-accent'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/connect" className={cn(buttonVariants({ size: 'sm' }), 'text-xs tracking-wider uppercase px-5')}>
            Book Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-8 flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-sm uppercase tracking-widest font-sans text-foreground/60 hover:text-accent transition-colors',
                  pathname === link.href && 'text-accent'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/connect"
              onClick={() => setIsOpen(false)}
              className={cn(buttonVariants(), 'mt-2 w-full justify-center text-xs tracking-wider uppercase')}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
