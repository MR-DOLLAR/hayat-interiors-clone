import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brand, about } from "@/data/site";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about-hayat-interiors")({
  head: () => ({
    meta: [
      { title: `About — ${brand.name}` },
      { name: "description", content: about.hero.subtitle },
      { property: "og:title", content: `About — ${brand.name}` },
      { property: "og:description", content: about.hero.subtitle },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative h-[80svh] min-h-[520px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          src={about.hero.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
        <div className="relative h-full flex items-end pb-20 md:pb-28">
          <div className="container-x mx-auto max-w-7xl text-primary-foreground">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[var(--gold)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[var(--gold)]">
                  {about.hero.eyebrow}
                </span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-balance">
                {about.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-white/85 leading-relaxed">{about.hero.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] overflow-hidden lg:sticky lg:top-28"
          >
            <img src={about.story.image} alt="" loading="lazy" className="w-full h-full object-cover" />
          </motion.div>
          <div>
            <SectionHeading eyebrow={about.story.eyebrow} title={about.story.title} />
            <div className="space-y-5 mt-8 text-foreground/80 leading-relaxed">
              {about.story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-secondary">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={about.principles.eyebrow}
            title={about.principles.title}
            subtitle={about.principles.subtitle}
            align="center"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-16">
            {about.principles.items.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="border-t border-border pt-6"
              >
                <div className="text-xs tracking-[0.2em] uppercase text-accent mb-3">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-primary text-primary-foreground">
        <div className="container-x mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {about.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <div className="font-display text-4xl md:text-5xl text-[var(--gold)]">{s.value}</div>
              <div className="text-sm text-primary-foreground/70 mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl text-balance">
            Ready to begin a home that's truly yours?
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 mt-8 text-sm font-medium hover:bg-primary/90"
          >
            Start a Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
