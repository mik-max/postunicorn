import type { Metadata } from 'next';
import ExpertiseHero from '@/components/sections/expertise-hero';
import ExpertiseAreas from '@/components/sections/expertise-areas';
import ExpertiseServices from '@/components/sections/expertise-services';
import ExpertiseTestimonials from '@/components/sections/expertise-testimonials';
import ExpertiseCta from '@/components/sections/expertise-cta';

export const metadata: Metadata = {
  title: 'Expertise & Services',
  description:
    'Services blending technical depth with strategic foresight — AI governance, venture growth, business development, and innovation consulting.',
};

export default function ExpertisePage() {
  return (
    <main>
      <ExpertiseHero />
      <ExpertiseAreas />
      <ExpertiseServices />
      <ExpertiseTestimonials />
      <ExpertiseCta />
    </main>
  );
}
