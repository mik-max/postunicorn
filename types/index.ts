export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  results: string;
  insight?: string;
  period?: string;
}

export interface Insight {
  id: string;
  title: string;
  teaser: string;
  slug: string;
  type: 'article' | 'video';
  publishedAt: string;
}

export interface ExpertiseArea {
  area: string;
  whatIBring: string;
  outcomes: string;
}

export interface Service {
  title: string;
  description: string;
  format?: string;
}
