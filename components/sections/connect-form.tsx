'use client';

import { useState } from 'react';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
};

const interests = [
  'Strategic Consultation',
  'Innovation Workshop',
  'Project Advisory',
  'Speaking / Keynote',
  'Research Collaboration',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ConnectForm() {
  const [form, setForm] = useState({ name: '', email: '', interest: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
        setForm({ name: '', email: '', interest: '', message: '' });
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  }

  return (
    <section id="contact-form" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={reveal}
          className="flex items-center gap-6 mb-16"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-sans text-muted-foreground shrink-0">
            01 / Send a Message
          </span>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24">

          {/* Left — form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            {status === 'success' ? (
              <div className="flex flex-col gap-4 py-16">
                <span className="text-[10px] font-sans text-accent tracking-[0.2em] uppercase">
                  Message received
                </span>
                <h2 className="text-3xl md:text-4xl font-sans font-semibold tracking-tight">
                  Thank you, I&apos;ll be in touch.
                </h2>
                <p className="text-[15px] text-muted-foreground font-sans leading-relaxed max-w-md">
                  Your message has been sent. Expect a thoughtful reply within 2–3 business days.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-[10px] tracking-[0.2em] uppercase font-sans text-accent hover:text-foreground transition-colors self-start"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Israel Raphael"
                      className="border border-border rounded-lg px-4 py-3 text-sm font-sans bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent transition-shadow"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="border border-border rounded-lg px-4 py-3 text-sm font-sans bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent transition-shadow"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
                    I&apos;m Interested In
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="border border-border rounded-lg px-4 py-3 text-sm font-sans bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition-shadow appearance-none"
                  >
                    <option value="" disabled>Select a topic…</option>
                    {interests.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] tracking-[0.2em] uppercase font-sans text-muted-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me what you're working on and how I can help…"
                    className="border border-border rounded-lg px-4 py-3 text-sm font-sans bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-accent transition-shadow resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-sm font-sans text-red-500">{errorMsg}</p>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      buttonVariants({ size: 'lg' }),
                      'text-[10px] tracking-[0.2em] uppercase px-10 gap-2 disabled:opacity-60'
                    )}
                  >
                    {status === 'loading' ? 'Sending…' : (
                      <>Send Message <ArrowUpRight className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right — contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="flex flex-col gap-10 justify-start lg:pt-2"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-6">
                Other Ways to Reach Me
              </p>
              <div className="flex flex-col gap-5">
                <a
                  href="mailto:hello@postunicorn.com"
                  className="flex items-center gap-3 text-sm font-sans text-foreground hover:text-accent transition-colors group"
                >
                  <Mail className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                  hello@postunicorn.com
                </a>
                <div className="flex items-center gap-3 text-sm font-sans text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  Toronto &amp; Lagos · Global
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] font-sans text-muted-foreground mb-6">
                Follow Along
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'X (Twitter)', href: 'https://x.com' },
                  { label: 'LinkedIn', href: 'https://linkedin.com' },
                  { label: 'Medium', href: 'https://medium.com' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-sm font-sans text-foreground hover:text-accent transition-colors border-b border-border pb-4 last:border-0"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-[14px] font-sans text-muted-foreground leading-relaxed">
                I&apos;m selective about partnerships because I believe in deep impact.
                If you&apos;ve got the right vision — let&apos;s talk.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
