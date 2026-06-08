import type { Metadata } from 'next';
import ProjectsHero from '@/components/sections/projects-hero';
import ProjectsList from '@/components/sections/projects-list';
import ProjectsCta from '@/components/sections/projects-cta';

export const metadata: Metadata = {
  title: 'Projects & Impact',
  description:
    'Selected projects and collaborations — where ideas meet impact across EMEA and North America.',
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsList />
      <ProjectsCta />
    </main>
  );
}
