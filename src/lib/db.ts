import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type DbService = {
  id: string;
  slug: string;
  title: string;
  image_url: string | null;
  summary: string | null;
  pricing: string | null;
  timeline: string | null;
  features: string[];
  sort_order: number;
};

export type DbProject = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  type: string | null;
  location: string | null;
  year: number | null;
  area: string | null;
  style: string | null;
  budget: string | null;
  tagline: string | null;
  description: string | null;
  details: string | null;
  sort_order: number;
};

export type DbProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
};

export function useServices() {
  const [data, setData] = useState<DbService[] | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    setData((rows as DbService[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return { data, loading, reload };
}

export function useProjects() {
  const [data, setData] = useState<DbProject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });
    setData((rows as DbProject[]) ?? []);
    setLoading(false);
  }, []);
  useEffect(() => { reload(); }, [reload]);
  return { data, loading, reload };
}

export function useProjectBySlug(slug: string) {
  const [project, setProject] = useState<DbProject | null>(null);
  const [images, setImages] = useState<DbProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancel = false;
    (async () => {
      setLoading(true);
      const { data: p } = await supabase.from("projects").select("*").eq("slug", slug).maybeSingle();
      if (cancel) return;
      setProject((p as DbProject) ?? null);
      if (p) {
        const { data: imgs } = await supabase
          .from("project_images")
          .select("*")
          .eq("project_id", (p as DbProject).id)
          .order("sort_order", { ascending: true });
        if (!cancel) setImages((imgs as DbProjectImage[]) ?? []);
      }
      if (!cancel) setLoading(false);
    })();
    return () => { cancel = true; };
  }, [slug]);
  return { project, images, loading };
}

export function useSetting<T = unknown>(key: string) {
  const [value, setValue] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
    setValue((data?.value as T) ?? null);
    setLoading(false);
  }, [key]);
  useEffect(() => { reload(); }, [reload]);
  return { value, loading, reload, setValue };
}

export async function uploadImage(file: File, folder = "uploads"): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
