import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { brand, services } from "@/data/site";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Services — ${brand.name}` },
      { name: "description", content: services.hero.subtitle },
      { property: "og:title", content: `Services — ${brand.name}` },
      { property: "og:description", content: services.hero.subtitle },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              eyebrow={services.hero.eyebrow}
              title={services.hero.title}
              subtitle={services.hero.subtitle}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img src={services.hero.image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x mx-auto max-w-7xl space-y-24 md:space-y-32">
          {services.list.map((s, i) => (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="aspect-[5/4] overflow-hidden bg-secondary">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs tracking-[0.2em] uppercase text-accent">
                  0{i + 1} · Service
                </div>
                <h3 className="font-display text-3xl md:text-4xl mt-3 text-balance">{s.title}</h3>
                <p className="mt-5 text-muted-foreground leading-relaxed">{s.summary}</p>

                <div className="grid grid-cols-2 gap-6 mt-7 py-5 border-y border-border">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Starting From</div>
                    <div className="font-display text-base mt-1">{s.pricing}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Timeline</div>
                    <div className="font-display text-base mt-1">{s.timeline}</div>
                  </div>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-8 text-sm font-medium border-b border-foreground pb-1 hover:gap-4 transition-all"
                >
                  Book a Consultation <ArrowRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
