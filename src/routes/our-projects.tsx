import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { brand, projects } from "@/data/site";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/our-projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${brand.name}` },
      { name: "description", content: projects.hero.subtitle },
      { property: "og:title", content: `Projects — ${brand.name}` },
      { property: "og:description", content: projects.hero.subtitle },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [type, setType] = useState("All Types");
  const [style, setStyle] = useState("All Styles");

  const filtered = useMemo(
    () =>
      projects.list.filter(
        (p) =>
          (type === "All Types" || p.type === type) &&
          (style === "All Styles" || p.style === style)
      ),
    [type, style]
  );

  return (
    <>
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-x mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={projects.hero.eyebrow}
            title={projects.hero.title}
            subtitle={projects.hero.subtitle}
          />
        </div>
      </section>

      <section className="pb-8">
        <div className="container-x mx-auto max-w-7xl flex flex-wrap items-center gap-4 py-6 border-y border-border">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground mr-2">
            Filter
          </span>
          <Select label="Type" value={type} onChange={setType} options={projects.filters.type} />
          <Select label="Style" value={style} onChange={setStyle} options={projects.filters.style} />
          <span className="ml-auto text-xs text-muted-foreground">
            Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06 }}
                className={i % 4 === 0 || i % 4 === 3 ? "md:mt-0" : "md:mt-16"}
              >
                <Link to="/our-projects/$slug" params={{ slug: p.slug }} className="block group">
                  <div className="aspect-[4/3] overflow-hidden bg-secondary relative">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-background/90 backdrop-blur px-3 py-1.5">
                      {p.year}
                    </span>
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
                      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-xs text-muted-foreground">
                        <span>{p.style}</span>
                        <span>{p.area}</span>
                        <span>₹{p.budget}</span>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="mt-2 opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition"
                    />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none px-2 py-1 text-foreground cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
