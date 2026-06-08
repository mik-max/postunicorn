import type { Metadata } from 'next';
import AboutHero from '@/components/sections/about-hero';
import AboutIntro from '@/components/sections/about-intro';
import AboutStory from '@/components/sections/about-story';
import AboutValues from '@/components/sections/about-values';
import AboutCta from '@/components/sections/about-cta';

export const metadata: Metadata = {
  title: 'About',
  description:
    "A Global Mindset, Grounded in Purpose. Learn about Israel Raphael — from Lagos innovation hubs to Canada's tech ecosystem.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutIntro />
      <AboutStory />
      <AboutValues />
      <AboutCta />
    </main>
  );
}
