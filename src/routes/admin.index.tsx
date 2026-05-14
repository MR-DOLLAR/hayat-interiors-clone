import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { services as seedServices, projects as seedProjects, brand as seedBrand, contact as seedContact, about as seedAbout, home as seedHome, footer as seedFooter } from "@/data/site";
import { Briefcase, Folder, Settings, Sparkles } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [seeding, setSeeding] = useState(false);
  const [msg, setMsg] = useState<string>("");

  const seed = async () => {
    if (!confirm("Seed the database with the current site content? Existing rows will not be duplicated.")) return;
    setSeeding(true); setMsg("");
    try {
      // Services
      for (let i = 0; i < seedServices.list.length; i++) {
        const s = seedServices.list[i];
        await supabase.from("services").upsert({
          slug: s.slug, title: s.title, image_url: s.image, summary: s.summary,
          pricing: s.pricing, timeline: s.timeline, features: s.features, sort_order: i,
        }, { onConflict: "slug" });
      }
      // Projects
      for (let i = 0; i < seedProjects.list.length; i++) {
        const p = seedProjects.list[i];
        const { data } = await supabase.from("projects").upsert({
          slug: p.slug, title: p.title, cover_image_url: p.image, type: p.type,
          location: p.location, year: p.year, area: p.area, style: p.style,
          budget: p.budget, tagline: p.tagline,
          description: p.tagline,
          details: "Project completed with attention to materials, light, and craft. Update this description from the admin panel.",
          sort_order: i,
        }, { onConflict: "slug" }).select("id").single();
        // Seed gallery: 3 images using the cover repeated as placeholder
        if (data) {
          const { count } = await supabase.from("project_images").select("*", { count: "exact", head: true }).eq("project_id", data.id);
          if (!count) {
            for (let g = 0; g < 3; g++) {
              await supabase.from("project_images").insert({
                project_id: data.id, image_url: p.image, caption: `View ${g + 1}`, sort_order: g,
              });
            }
          }
        }
      }
      // Settings
      const settingsRows: Array<{ key: string; value: unknown }> = [
        { key: "brand", value: seedBrand },
        { key: "contact", value: seedContact },
        { key: "about", value: seedAbout },
        { key: "home", value: seedHome },
        { key: "footer", value: seedFooter },
      ];
      for (const r of settingsRows) {
        await supabase.from("site_settings").upsert(r as never, { onConflict: "key" });
      }
      setMsg("Seeded successfully.");
    } catch (e) {
      setMsg(`Error: ${(e as Error).message}`);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { to: "/admin/services", label: "Services", icon: Briefcase, desc: "Add, edit, and remove services." },
    { to: "/admin/projects", label: "Projects", icon: Folder, desc: "Manage portfolio entries and galleries." },
    { to: "/admin/settings", label: "Brand & Contact", icon: Settings, desc: "Update brand, about, and contact info." },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="text-accent mt-1" size={20} />
          <div className="flex-1">
            <h2 className="font-display text-xl">Seed initial content</h2>
            <p className="text-sm text-muted-foreground mt-1">
              One-time: copy the existing site content (services, projects with 3-image galleries, brand, contact, about) into the database so you can edit it.
            </p>
            {msg && <p className="text-sm mt-2">{msg}</p>}
          </div>
          <button onClick={seed} disabled={seeding}
            className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium disabled:opacity-60">
            {seeding ? "Seeding…" : "Seed now"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="bg-card border border-border rounded-xl p-6 hover:border-accent transition-colors">
            <c.icon size={20} className="text-accent" />
            <h3 className="font-display text-xl mt-3">{c.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
