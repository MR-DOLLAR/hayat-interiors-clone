import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProjects, type DbProject } from "@/lib/db";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Modal, Field } from "./admin.services";
import { Plus, Trash2, Images } from "lucide-react";

export const Route = createFileRoute("/admin/projects")({
  component: AdminProjects,
});

const empty = (): Partial<DbProject> => ({
  slug: "", title: "", cover_image_url: "", type: "Apartment", location: "", year: new Date().getFullYear(),
  area: "", style: "Contemporary", budget: "20-40L", tagline: "", description: "", details: "",
});

function AdminProjects() {
  const { data, loading, reload } = useProjects();
  const [editing, setEditing] = useState<Partial<DbProject> | null>(null);

  const save = async () => {
    if (!editing?.slug || !editing?.title) { alert("Slug and title required"); return; }
    const payload = {
      slug: editing.slug, title: editing.title, cover_image_url: editing.cover_image_url || null,
      type: editing.type || null, location: editing.location || null, year: editing.year || null,
      area: editing.area || null, style: editing.style || null, budget: editing.budget || null,
      tagline: editing.tagline || null, description: editing.description || null, details: editing.details || null,
      sort_order: editing.sort_order ?? (data?.length ?? 0),
    };
    if (editing.id) await supabase.from("projects").update(payload).eq("id", editing.id);
    else await supabase.from("projects").insert(payload);
    setEditing(null); reload();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project and its gallery?")) return;
    await supabase.from("projects").delete().eq("id", id);
    reload();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-2xl">Projects ({data?.length ?? 0})</h2>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm">
          <Plus size={16} /> New
        </button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="grid gap-3">
        {data?.map((p) => (
          <div key={p.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
            {p.cover_image_url && <img src={p.cover_image_url} alt="" className="w-20 h-16 object-cover rounded" />}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{p.title}</div>
              <div className="text-xs text-muted-foreground truncate">{p.type} · {p.location} · {p.year}</div>
            </div>
            <Link to="/admin/projects/$id" params={{ id: p.id }} className="text-sm px-3 py-1.5 border border-border rounded inline-flex items-center gap-1">
              <Images size={14} /> Gallery
            </Link>
            <button onClick={() => setEditing(p)} className="text-sm px-3 py-1.5 border border-border rounded">Edit</button>
            <button onClick={() => remove(p.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
          </div>
        ))}
        {data && data.length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit Project" : "New Project"}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Slug"><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" /></Field>
              <Field label="Title"><input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></Field>
            </div>
            <ImageUpload value={editing.cover_image_url ?? null} onChange={(url) => setEditing({ ...editing, cover_image_url: url })} folder="projects" label="Cover Image" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type"><input value={editing.type ?? ""} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="input" /></Field>
              <Field label="Location"><input value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="input" /></Field>
              <Field label="Year"><input type="number" value={editing.year ?? ""} onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) })} className="input" /></Field>
              <Field label="Area"><input value={editing.area ?? ""} onChange={(e) => setEditing({ ...editing, area: e.target.value })} className="input" /></Field>
              <Field label="Style"><input value={editing.style ?? ""} onChange={(e) => setEditing({ ...editing, style: e.target.value })} className="input" /></Field>
              <Field label="Budget"><input value={editing.budget ?? ""} onChange={(e) => setEditing({ ...editing, budget: e.target.value })} className="input" /></Field>
            </div>
            <Field label="Tagline"><textarea rows={2} value={editing.tagline ?? ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className="input" /></Field>
            <Field label="Description"><textarea rows={3} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="input" /></Field>
            <Field label="Detailed content (markdown/plain)"><textarea rows={6} value={editing.details ?? ""} onChange={(e) => setEditing({ ...editing, details: e.target.value })} className="input" /></Field>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm border border-border rounded-full">Cancel</button>
              <button onClick={save} className="px-5 py-2 text-sm rounded-full bg-primary text-primary-foreground">Save</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
