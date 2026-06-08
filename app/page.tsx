import Hero from '@/components/sections/hero';
import WhoIAm from '@/components/sections/who-i-am';
import QuoteBanner from '@/components/sections/quote-banner';
import HomeCta from '@/components/sections/home-cta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhoIAm />
      <QuoteBanner />
      <HomeCta />
    </main>
  );
}
