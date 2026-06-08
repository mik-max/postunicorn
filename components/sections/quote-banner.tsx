export default function QuoteBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.35em] uppercase font-sans text-primary-foreground/40 mb-12">
          On Innovation
        </p>

        <blockquote className="font-display font-medium italic leading-[1.1] text-[clamp(32px,5vw,64px)]">
          &ldquo;Innovation isn&apos;t just about tech.<br />
          It&apos;s about trust, ethics, and the<br />
          courage to build lasting solutions.&rdquo;
        </blockquote>

        <cite className="block mt-10 text-[10px] font-sans tracking-[0.3em] uppercase text-primary-foreground/50 not-italic">
          — Israel Raphael
        </cite>
      </div>
    </section>
  );
}
