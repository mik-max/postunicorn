import type { Metadata } from 'next';
import InsightsHero from '@/components/sections/insights-hero';
import InsightsList from '@/components/sections/insights-list';
import InsightsResearch from '@/components/sections/insights-research';
import InsightsCta from '@/components/sections/insights-cta';

export const metadata: Metadata = {
  title: 'Insights & Research',
  description:
    'Fresh perspectives on leadership, innovation, AI, and the human side of progress — alongside academic research on AI governance and emerging markets.',
};

export default function InsightsPage() {
  return (
    <main>
      <InsightsHero />
      <InsightsList />
      <InsightsResearch />
      <InsightsCta />
    </main>
  );
}
