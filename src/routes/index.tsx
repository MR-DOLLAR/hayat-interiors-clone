import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { brand, home, services, projects } from "@/data/site";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${brand.name} — ${brand.tagline}` },
      { name: "description", content: brand.description },
      { property: "og:title", content: `${brand.name} — ${brand.tagline}` },
      { property: "og:description", content: brand.description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <Process />
      <ProjectsPreview />
      <StatsBand />
      <CtaBand />
    </>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  const slides = home.hero.slides;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[idx];

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
        <div className="container-x mx-auto max-w-7xl text-primary-foreground">
          <motion.div
            key={`text-${idx}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-[var(--gold)]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">
                {home.hero.eyebrow}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-balance">
              {slide.title}
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
              {slide.caption}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to={home.hero.primaryCta.to}
                className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
              >
                {home.hero.primaryCta.label} <ArrowRight size={16} />
              </Link>
              <Link
                to={home.hero.secondaryCta.to}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                {home.hero.secondaryCta.label}
              </Link>
            </div>
          </motion.div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-px transition-all duration-500 ${
                    i === idx ? "w-12 bg-[var(--gold)]" : "w-6 bg-white/40"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <div className="text-xs tracking-[0.3em] text-white/70">
              {String(idx + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={home.services.eyebrow}
          title={home.services.title}
          subtitle={home.services.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {services.list.slice(0, 6).map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group"
            >
              <Link to="/services" className="block">
                <div className="aspect-[4/5] overflow-hidden bg-secondary rounded-sm">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="pt-5">
                  <h3 className="font-display text-xl flex items-center justify-between gap-2 group-hover:text-accent transition-colors">
                    {s.title}
                    <ArrowUpRight size={18} className="opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition" />
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {s.summary}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to={home.services.cta.to}
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-foreground pb-1 hover:gap-4 transition-all"
          >
            {home.services.cta.label} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="py-24 md:py-32 bg-secondary">
      <div className="container-x mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={home.process.eyebrow}
          title={home.process.title}
          subtitle={home.process.subtitle}
          align="center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {home.process.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative pt-8 border-t border-border"
            >
              <span className="absolute -top-4 left-0 text-xs font-medium tracking-[0.2em] text-accent bg-secondary pr-3">
                {s.n}
              </span>
              <h3 className="font-display text-2xl mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            eyebrow={home.projects.eyebrow}
            title={home.projects.title}
            subtitle={home.projects.subtitle}
          />
          <Link
            to={home.projects.cta.to}
            className="hidden md:inline-flex items-center gap-2 text-sm border-b border-foreground pb-1 hover:gap-4 transition-all"
          >
            {home.projects.cta.label} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          {projects.list.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className={i % 3 === 0 ? "md:row-span-1" : ""}
            >
              <Link to="/our-projects" className="block group">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs tracking-[0.18em] uppercase text-accent">
                      {p.type} · {p.location}
                    </div>
                    <h3 className="font-display text-2xl mt-2 group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1.5 max-w-md">{p.tagline}</p>
                  </div>
                  <ArrowUpRight size={20} className="mt-2 opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-2xl md:text-3xl leading-snug text-balance"
        >
          {home.stats.intro}
        </motion.p>
        <div className="grid grid-cols-2 gap-y-10 gap-x-6">
          {home.stats.items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="font-display text-4xl md:text-5xl text-[var(--gold)]">{s.value}</div>
              <div className="text-sm text-primary-foreground/70 mt-2 tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs uppercase tracking-[0.25em] text-accent">Let's begin</span>
          <h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight text-balance">
            Designs that feel like home — start yours today.
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 mt-9 text-sm font-medium hover:bg-primary/90"
          >
            Book a Consultation <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
