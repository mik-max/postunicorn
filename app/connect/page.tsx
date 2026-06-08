import type { Metadata } from 'next';
import ConnectHero from '@/components/sections/connect-hero';
import ConnectForm from '@/components/sections/connect-form';

export const metadata: Metadata = {
  title: 'Connect',
  description:
    'Start a conversation — consultations, collaborations, speaking engagements, and research partnerships.',
};

export default function ConnectPage() {
  return (
    <main>
      <ConnectHero />
      <ConnectForm />
    </main>
  );
}
