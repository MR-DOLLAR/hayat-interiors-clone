import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Send } from "lucide-react";
import { brand, contactPage, contact } from "@/data/site";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${brand.name}` },
      { name: "description", content: contactPage.hero.subtitle },
      { property: "og:title", content: `Contact — ${brand.name}` },
      { property: "og:description", content: contactPage.hero.subtitle },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <SectionHeading
            eyebrow={contactPage.hero.eyebrow}
            title={contactPage.hero.title}
            subtitle={contactPage.hero.subtitle}
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img src={contactPage.hero.image} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </section>

      <section id="contact-form" className="py-16 md:py-24 scroll-mt-24">
        <div className="container-x mx-auto max-w-7xl grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl md:text-4xl">{contactPage.form.title}</h2>
            <p className="text-muted-foreground mt-3">{contactPage.form.subtitle}</p>
            <ContactForm />
          </div>

          <aside className="space-y-6">
            <h3 className="font-display text-2xl">Get In Touch</h3>
            {contactPage.channels.map((c, i) => {
              const Icon = i === 0 ? Phone : i === 1 ? Mail : MessageCircle;
              return (
                <a
                  key={c.title}
                  href={c.href}
                  className="block border border-border rounded-sm p-5 hover:border-accent hover:bg-secondary/40 transition group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-secondary grid place-items-center group-hover:bg-accent group-hover:text-accent-foreground transition">
                      <Icon size={16} />
                    </span>
                    <div className="font-display text-lg">{c.title}</div>
                  </div>
                  <div className="mt-3 font-medium">{c.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.meta}</div>
                  <div className="text-xs text-muted-foreground">{c.sub}</div>
                </a>
              );
            })}
            <div className="border border-border rounded-sm p-5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary grid place-items-center">
                  <MapPin size={16} />
                </span>
                <div className="font-display text-lg">Visit Us</div>
              </div>
              <div className="mt-3 text-sm">
                {contact.address.line1}<br />{contact.address.line2}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 border border-accent/40 bg-accent/5 p-10 text-center rounded-sm"
      >
        <h3 className="font-display text-2xl">Thank you!</h3>
        <p className="mt-2 text-muted-foreground">
          We've received your enquiry. Our team will reach out within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="mt-10 space-y-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full Name" required><input required type="text" className={inputCls} /></Field>
        <Field label="Email Address" required><input required type="email" className={inputCls} /></Field>
        <Field label="Phone Number" required><input required type="tel" className={inputCls} /></Field>
        <Field label="Location" required><input required type="text" placeholder="City" className={inputCls} /></Field>
        <SelectField label="Project Type" options={contactPage.form.projectTypes} />
        <SelectField label="Property Type" options={contactPage.form.propertyTypes} />
        <SelectField label="Estimated Budget" options={contactPage.form.budgets} />
        <SelectField label="Timeline" options={contactPage.form.timelines} />
      </div>

      <Field label="Tell Us About Your Vision">
        <textarea rows={4} className={inputCls} />
      </Field>

      <div className="grid md:grid-cols-2 gap-6">
        <SelectField label="Preferred Contact Method" options={contactPage.form.contactMethods} />
        <SelectField label="How Did You Hear About Us?" options={contactPage.form.sources} />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium hover:bg-primary/90 transition"
      >
        Schedule Consultation <Send size={15} />
      </button>
      <p className="text-xs text-muted-foreground">
        By submitting this form, you agree to our privacy policy. We'll never share your information with third parties.
      </p>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-border focus:border-accent focus:outline-none py-2.5 text-foreground placeholder:text-muted-foreground/60";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <Field label={label}>
      <select className={inputCls + " cursor-pointer"}>
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}
