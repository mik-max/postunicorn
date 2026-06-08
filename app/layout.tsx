import type { Metadata } from 'next';
import { Cormorant_Garamond, Geist } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/layout/footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: {
    default: 'Israel Raphael | Ethical AI & Venture Growth',
    template: '%s | Israel Raphael',
  },
  description: 'Pioneering Ethical AI and Venture Growth for a Connected World.',
  keywords: [
    'AI ethics consultant',
    'venture growth expert EMEA',
    'ethical AI researcher',
    'AI governance',
    'business development Africa',
  ],
  openGraph: {
    title: 'Israel Raphael | Ethical AI & Venture Growth',
    description: 'Pioneering Ethical AI and Venture Growth for a Connected World.',
    url: 'https://postunicorn.com',
    siteName: 'postunicorn',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(cormorant.variable, geist.variable)}>
      <body className="bg-background text-foreground antialiased font-sans">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
