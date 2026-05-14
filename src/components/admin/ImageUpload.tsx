import { useState } from "react";
import { uploadImage } from "@/lib/db";
import { Upload } from "lucide-react";

export function ImageUpload({
  value, onChange, folder = "uploads", label = "Image",
}: {
  value: string | null;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setUploading(true); setError("");
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider text-muted-foreground block">{label}</label>
      <div className="flex items-center gap-3">
        {value ? (
          <img src={value} alt="" className="w-20 h-20 object-cover rounded-md border border-border" />
        ) : (
          <div className="w-20 h-20 rounded-md border border-dashed border-border grid place-items-center text-muted-foreground text-xs">None</div>
        )}
        <label className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-md hover:bg-secondary cursor-pointer">
          <Upload size={14} />
          {uploading ? "Uploading…" : "Upload"}
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </label>
        <input type="text" value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="Or paste URL"
          className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-sm" />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
