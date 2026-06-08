You are an expert Next.js / React engineer helping build fast, production-ready websites and web apps.Write clean, simple, maintainable code. Prioritize clarity over unnecessary abstraction.
Think like a senior full-stack web developer.
---

## Project Overview (Customize per project)

We are building postunicorn.com, the official personal website for Israel Raphael — Scientist, Business Development Expert, Venture Growth Strategist, and AI Governance Researcher. This is a multi-page marketing and portfolio website, not a web application. There is no authentication, database, or complex client state.

## Pages

| Route | Page |
|---|---|
| `/` | Home (Hero + Who I Am) |
| `/about` | About (Bio, Story, Values) |
| `/about/resume` | Resume |
| `/expertise` | Expertise & Services |
| `/projects` | Projects & Impact |
| `/insights` | Insights (Articles) |
| `/research` | Research & Academic Pursuits |
| `/speaking` | Speaking & Media |
| `/connect` | Connect / Contact |

## Key features:

- Responsive UI with modern design (dark, deep-navy + cyan accent)
- Static content with Server Components by default
- SEO metadata on every page (title template, OpenGraph)
- Framer Motion for animations; GSAP if complex scroll effects are needed
- Contact form via API route (no external auth required)

Keep the implementation simple and readable.

## Tech Stack (Recommended for Speed with AI)

- Next.js 15+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui + Radix primitives (for fast, accessible components)
- GSAP for super slick animations
- Framer for simple animations/micro-interactions
- Vercel for deployment

Do not introduce new major libraries unless there is a strong reason. Ask before adding anything new.
Alternative stacks (if project requires): Pure React + Vite, or Astro for content-heavy sites.

## Development Philosophy

Build feature by feature.

For every feature:

- Read this file first.
- Keep the implementation simple.
- Avoid overengineering.
- Prefer readable code over clever code.
- Build the smallest useful version first (MVP).
- Refactor only when repetition appears.

Use Antigravity agents and Claude to plan, generate, review, and iterate. Always verify output.

## Decision Making

If something is unclear or could be improved, suggest a better approach.
If a new library/tool would significantly help, recommend it, explain why, and ask for approval.
Do not add libraries without confirmation.

## Architecture & Folder Structure

Use this folder structure (Next.js App Router):

app/
  about/
    resume/
  expertise/
  projects/
  insights/
  research/
  speaking/
  connect/
  api/         # API routes (e.g. contact form)
components/
  ui/          # shadcn / base-ui primitives
  layout/      # Navigation, Footer, shared wrappers
  sections/    # Page-specific section components
constants/     # navigation links, site config
data/          # typed static content (projects, insights, expertise)
hooks/         # custom React hooks (only when truly reusable)
lib/           # utils, cn.ts, api helpers
types/         # shared TypeScript interfaces
public/
  images/      # all image assets

- app/ → routes and page-level components only. Pages import section components.
- components/sections/ → one file per section (e.g. hero.tsx, who-i-am.tsx). Keep page-specific.
- components/layout/ → Navigation and Footer are already here.
- data/ → typed static content. Source of truth for content until a CMS is introduced.
- lib/ → helpers only. Never expose secrets. No Clerk or auth utilities needed.
- No store/ — this site has no global client state requiring Zustand.

## UI & Styling Rules

- Replicate provided designs exactly (layout, spacing, colors, typography, shadows, etc.).
- Use Tailwind CSS classes primarily.
- Use Shadcn/ui for consistent, accessible components.
- cn() utility from lib/utils.ts for conditional classes.
- Responsive by default (mobile-first).
- Dark mode support where relevant.

## Exceptions (use inline styles or CSS modules only when necessary):

- Complex animations (GSAP)
- Micro-interactions / simple animations (Framer Motion)
- Dynamic runtime styles
- Third-party library overrides

## Image & Asset Rules

Centralize assets:

- Place images in public/images/ or import via next/image.
- Create/use constants/images.ts for any imported assets.
- Always optimize images and use next/image for performance.

## State Management

- Prefer Server Components by default (no `'use client'` unless needed).
- Local useState for temporary UI state (e.g., mobile nav toggle, form fields).
- No Zustand or global state management required for this project.
- Section components that use Framer Motion or browser APIs must be Client Components.

## TypeScript

- Strict mode.
- No any.
- Keep types simple, colocated, and readable.

## Feature Implementation

When building a feature:

- Read this file first.
- Identify files to change.
- Keep changes focused.
- Do not rewrite unrelated code.
- Follow existing patterns.
- Make sure it works end-to-end (test locally + build).
- Fix lint/type errors.

## Secrets & Security

- Never expose secret keys in client code.
- Use environment variables (.env.local).
- Server Actions / API routes for AI calls, external APIs, tokens.

## Authentication

- Not required. This is a public-facing marketing website with no login or protected routes.

## Performance & SEO

- Use Server Components by default.
- Optimize images, fonts, and bundles.
- Proper metadata, Open Graph, etc.
- Lighthouse scores in mind.

## Communication with AI (Claude / Antigravity)

- Be concise.
- Explain what changed and how to test.
- Provide context from this file + relevant code snippets.
- Ask agents to plan first, then implement incrementally.

## Final Reminder

Before every feature or task:

- Read this file.
- Follow it strictly.
- Build clean, simple, fast code.
- Replicate UI exactly when designs are provided.
- Leverage Antigravity agents for planning/execution/verification.

