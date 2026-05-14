import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useProjectBySlug } from "@/lib/db";
import { brand, projects as seedProjects } from "@/data/site";

export const Route = createFileRoute("/our-projects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — ${brand.name}` },
      { name: "description", content: `Project details — ${brand.name}` },
    ],
  }),
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useParams();
  const { project, images, loading } = useProjectBySlug(slug);

  // Fallback to static
  const fallback = seedProjects.list.find((p) => p.slug === slug);

  if (loading && !fallback) {
    return <div className="min-h-screen pt-32 grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  }

  if (!project && !fallback) {
    return <Navigate to="/our-projects" />;
  }

  const data = project ?? {
    title: fallback!.title, cover_image_url: fallback!.image, type: fallback!.type,
    location: fallback!.location, year: fallback!.year, area: fallback!.area,
    style: fallback!.style, budget: fallback!.budget, tagline: fallback!.tagline,
    description: fallback!.tagline, details: "",
  };
  const gallery = images.length ? images : (fallback ? [{ id: "f1", image_url: fallback.image, caption: null }, { id: "f2", image_url: fallback.image, caption: null }, { id: "f3", image_url: fallback.image, caption: null }] : []);

  return (
    <>
      <section className="pt-28 md:pt-36 pb-10">
        <div className="container-x mx-auto max-w-6xl">
          <Link to="/our-projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft size={14} /> All projects
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{data.type} · {data.location}</p>
            <h1 className="font-display text-4xl md:text-6xl mt-3">{data.title}</h1>
            {data.tagline && <p className="text-lg text-muted-foreground mt-4 max-w-2xl">{data.tagline}</p>}
          </motion.div>
        </div>
      </section>

      {data.cover_image_url && (
        <section className="pb-12">
          <div className="container-x mx-auto max-w-6xl">
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <img src={data.cover_image_url} alt={data.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      <section className="pb-12">
        <div className="container-x mx-auto max-w-6xl grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            {data.description && <p className="text-base md:text-lg leading-relaxed text-foreground/90">{data.description}</p>}
            {data.details && <div className="mt-6 text-foreground/80 whitespace-pre-line leading-relaxed">{data.details}</div>}
          </div>
          <aside className="bg-secondary/40 border border-border rounded-xl p-6 h-fit space-y-3 text-sm">
            <Detail label="Year" value={data.year?.toString()} />
            <Detail label="Area" value={data.area} />
            <Detail label="Style" value={data.style} />
            <Detail label="Budget" value={data.budget ? `₹${data.budget}` : null} />
            <Detail label="Type" value={data.type} />
            <Detail label="Location" value={data.location} />
          </aside>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x mx-auto max-w-6xl">
          <h2 className="font-display text-2xl md:text-3xl mb-6">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gallery.map((img, i) => (
              <motion.figure key={img.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
                className={i === 0 ? "md:col-span-2" : ""}>
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={img.image_url} alt={img.caption ?? ""} loading="lazy" className="w-full h-full object-cover" />
                </div>
                {img.caption && <figcaption className="mt-2 text-xs text-muted-foreground">{img.caption}</figcaption>}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3 border-b border-border/60 pb-2 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}
