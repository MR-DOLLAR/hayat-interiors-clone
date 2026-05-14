import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { brand as seedBrand, contact as seedContact, about as seedAbout } from "@/data/site";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [brand, setBrand] = useState<typeof seedBrand | null>(null);
  const [contact, setContact] = useState<typeof seedContact | null>(null);
  const [about, setAbout] = useState<typeof seedAbout | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("key,value").in("key", ["brand", "contact", "about"]);
      const map = Object.fromEntries((data ?? []).map((r: any) => [r.key, r.value]));
      setBrand(map.brand ?? seedBrand);
      setContact(map.contact ?? seedContact);
      setAbout(map.about ?? seedAbout);
    })();
  }, []);

  const save = async (key: string, value: unknown) => {
    setSaving(true); setMsg("");
    const { error } = await supabase.from("site_settings").upsert({ key, value } as never, { onConflict: "key" });
    setSaving(false);
    setMsg(error ? `Error: ${error.message}` : `Saved ${key}.`);
  };

  if (!brand || !contact || !about) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-8">
      {msg && <p className="text-sm text-accent">{msg}</p>}

      <Section title="Brand">
        <Row label="Name"><input className="input" value={brand.name} onChange={(e) => setBrand({ ...brand, name: e.target.value })} /></Row>
        <Row label="Short Name"><input className="input" value={brand.shortName} onChange={(e) => setBrand({ ...brand, shortName: e.target.value })} /></Row>
        <Row label="Tagline"><input className="input" value={brand.tagline} onChange={(e) => setBrand({ ...brand, tagline: e.target.value })} /></Row>
        <Row label="Logo Mark"><input className="input" value={brand.logoMark} onChange={(e) => setBrand({ ...brand, logoMark: e.target.value })} /></Row>
        <Row label="Description"><textarea rows={2} className="input" value={brand.description} onChange={(e) => setBrand({ ...brand, description: e.target.value })} /></Row>
        <SaveBtn onClick={() => save("brand", brand)} saving={saving} />
      </Section>

      <Section title="Contact">
        <Row label="Phone"><input className="input" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value, phoneHref: `tel:${e.target.value.replace(/\s/g, "")}` })} /></Row>
        <Row label="Email"><input className="input" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value, emailHref: `mailto:${e.target.value}` })} /></Row>
        <Row label="WhatsApp"><input className="input" value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value, whatsappHref: `https://wa.me/${e.target.value.replace(/\D/g, "")}` })} /></Row>
        <Row label="Address Line 1"><input className="input" value={contact.address.line1} onChange={(e) => setContact({ ...contact, address: { ...contact.address, line1: e.target.value } })} /></Row>
        <Row label="Address Line 2"><input className="input" value={contact.address.line2} onChange={(e) => setContact({ ...contact, address: { ...contact.address, line2: e.target.value } })} /></Row>
        <Row label="Hours"><input className="input" value={contact.hours} onChange={(e) => setContact({ ...contact, hours: e.target.value })} /></Row>
        <Row label="Instagram"><input className="input" value={contact.social.instagram} onChange={(e) => setContact({ ...contact, social: { ...contact.social, instagram: e.target.value } })} /></Row>
        <Row label="Facebook"><input className="input" value={contact.social.facebook} onChange={(e) => setContact({ ...contact, social: { ...contact.social, facebook: e.target.value } })} /></Row>
        <Row label="LinkedIn"><input className="input" value={contact.social.linkedin} onChange={(e) => setContact({ ...contact, social: { ...contact.social, linkedin: e.target.value } })} /></Row>
        <SaveBtn onClick={() => save("contact", contact)} saving={saving} />
      </Section>

      <Section title="About Page">
        <Row label="Hero Eyebrow"><input className="input" value={about.hero.eyebrow} onChange={(e) => setAbout({ ...about, hero: { ...about.hero, eyebrow: e.target.value } })} /></Row>
        <Row label="Hero Title"><input className="input" value={about.hero.title} onChange={(e) => setAbout({ ...about, hero: { ...about.hero, title: e.target.value } })} /></Row>
        <Row label="Hero Subtitle"><textarea rows={2} className="input" value={about.hero.subtitle} onChange={(e) => setAbout({ ...about, hero: { ...about.hero, subtitle: e.target.value } })} /></Row>
        <Row label="Story Title"><input className="input" value={about.story.title} onChange={(e) => setAbout({ ...about, story: { ...about.story, title: e.target.value } })} /></Row>
        <Row label="Story Paragraphs (one per blank line)">
          <textarea rows={10} className="input" value={about.story.paragraphs.join("\n\n")}
            onChange={(e) => setAbout({ ...about, story: { ...about.story, paragraphs: e.target.value.split(/\n\n+/) } })} />
        </Row>
        <SaveBtn onClick={() => save("about", about)} saving={saving} />
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h2 className="font-display text-xl mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
      <label className="text-sm text-muted-foreground pt-2">{label}</label>
      <div>{children}</div>
    </div>
  );
}
function SaveBtn({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <div className="flex justify-end pt-2">
      <button onClick={onClick} disabled={saving} className="px-5 py-2 text-sm rounded-full bg-primary text-primary-foreground disabled:opacity-60">
        {saving ? "Saving…" : "Save"}
      </button>
    </div>
  );
}
