import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { uploadImage, type DbProject, type DbProjectImage } from "@/lib/db";
import { ArrowLeft, Trash2, Upload, ArrowUp, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/admin/projects/$id")({
  component: ProjectGallery,
});

function ProjectGallery() {
  const { id } = Route.useParams();
  const [project, setProject] = useState<DbProject | null>(null);
  const [images, setImages] = useState<DbProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: p } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
    setProject(p as DbProject);
    const { data: imgs } = await supabase.from("project_images").select("*").eq("project_id", id).order("sort_order");
    setImages((imgs as DbProjectImage[]) ?? []);
    setLoading(false);
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const onUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      const start = images.length;
      for (let i = 0; i < files.length; i++) {
        const url = await uploadImage(files[i], "projects");
        await supabase.from("project_images").insert({ project_id: id, image_url: url, sort_order: start + i });
      }
      await load();
    } catch (e) { alert((e as Error).message); }
    finally { setUploading(false); }
  };

  const remove = async (imgId: string) => {
    if (!confirm("Remove this image?")) return;
    await supabase.from("project_images").delete().eq("id", imgId);
    load();
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const j = idx + dir;
    if (j < 0 || j >= images.length) return;
    const a = images[idx]; const b = images[j];
    await supabase.from("project_images").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("project_images").update({ sort_order: a.sort_order }).eq("id", b.id);
    load();
  };

  const updateCaption = async (imgId: string, caption: string) => {
    await supabase.from("project_images").update({ caption }).eq("id", imgId);
  };

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <div>
      <Link to="/admin/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft size={14} /> Back to projects
      </Link>
      <h2 className="font-display text-2xl mb-1">{project.title}</h2>
      <p className="text-sm text-muted-foreground mb-6">Manage gallery images. Minimum 3 recommended.</p>

      <label className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm border border-border rounded-full hover:bg-secondary cursor-pointer bg-card">
        <Upload size={14} /> {uploading ? "Uploading…" : "Upload images"}
        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={img.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <img src={img.image_url} alt="" className="w-full aspect-[4/3] object-cover" />
            <div className="p-3 space-y-2">
              <input defaultValue={img.caption ?? ""} placeholder="Caption" onBlur={(e) => updateCaption(img.id, e.target.value)}
                className="w-full text-sm bg-background border border-border rounded px-2 py-1.5" />
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 border border-border rounded disabled:opacity-30"><ArrowUp size={14} /></button>
                  <button onClick={() => move(i, 1)} disabled={i === images.length - 1} className="p-1.5 border border-border rounded disabled:opacity-30"><ArrowDown size={14} /></button>
                </div>
                <button onClick={() => remove(img.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && <p className="text-sm text-muted-foreground col-span-full">No images yet.</p>}
      </div>
    </div>
  );
}
