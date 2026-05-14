import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServices, type DbService } from "@/lib/db";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Trash2, X } from "lucide-react";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

const empty = (): Partial<DbService> => ({
  slug: "", title: "", image_url: "", summary: "", pricing: "", timeline: "", features: [],
});

function AdminServices() {
  const { data, loading, reload } = useServices();
  const [editing, setEditing] = useState<Partial<DbService> | null>(null);

  const save = async () => {
    if (!editing?.slug || !editing?.title) { alert("Slug and title required"); return; }
    const payload = {
      slug: editing.slug, title: editing.title, image_url: editing.image_url || null,
      summary: editing.summary || null, pricing: editing.pricing || null, timeline: editing.timeline || null,
      features: editing.features ?? [], sort_order: editing.sort_order ?? (data?.length ?? 0),
    };
    if (editing.id) {
      await supabase.from("services").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload);
    }
    setEditing(null); reload();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await supabase.from("services").delete().eq("id", id);
    reload();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-display text-2xl">Services ({data?.length ?? 0})</h2>
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm">
          <Plus size={16} /> New
        </button>
      </div>

      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="grid gap-3">
        {data?.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
            {s.image_url && <img src={s.image_url} alt="" className="w-16 h-16 object-cover rounded" />}
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{s.title}</div>
              <div className="text-xs text-muted-foreground truncate">{s.slug} · {s.pricing}</div>
            </div>
            <button onClick={() => setEditing(s)} className="text-sm px-3 py-1.5 border border-border rounded">Edit</button>
            <button onClick={() => remove(s.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={16} /></button>
          </div>
        ))}
        {data && data.length === 0 && <p className="text-sm text-muted-foreground">No services yet. Use "Seed initial content" on the dashboard or click "New".</p>}
      </div>

      {editing && (
        <Modal onClose={() => setEditing(null)} title={editing.id ? "Edit Service" : "New Service"}>
          <div className="space-y-4">
            <Field label="Slug"><input value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="input" /></Field>
            <Field label="Title"><input value={editing.title ?? ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input" /></Field>
            <ImageUpload value={editing.image_url ?? null} onChange={(url) => setEditing({ ...editing, image_url: url })} folder="services" />
            <Field label="Summary"><textarea rows={3} value={editing.summary ?? ""} onChange={(e) => setEditing({ ...editing, summary: e.target.value })} className="input" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Pricing"><input value={editing.pricing ?? ""} onChange={(e) => setEditing({ ...editing, pricing: e.target.value })} className="input" /></Field>
              <Field label="Timeline"><input value={editing.timeline ?? ""} onChange={(e) => setEditing({ ...editing, timeline: e.target.value })} className="input" /></Field>
            </div>
            <Field label="Features (one per line)">
              <textarea rows={5} value={(editing.features ?? []).join("\n")}
                onChange={(e) => setEditing({ ...editing, features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                className="input" />
            </Field>
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

export function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm grid place-items-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl p-6 my-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-display text-xl">{title}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">{label}</label>
      {children}
    </div>
  );
}
