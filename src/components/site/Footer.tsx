import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { brand, contact, footer } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="container-x mx-auto max-w-7xl py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2 max-w-md">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <span className="w-10 h-10 rounded-full bg-primary-foreground text-primary grid place-items-center font-display text-lg">
                {brand.logoMark}
              </span>
              <span className="font-display text-xl">{brand.name}</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {footer.about}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: Instagram, href: contact.social.instagram },
                { Icon: Facebook, href: contact.social.facebook },
                { Icon: Linkedin, href: contact.social.linkedin },
                { Icon: Youtube, href: contact.social.youtube },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-primary-foreground/20 grid place-items-center hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-base mb-4 text-primary-foreground">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-primary-foreground/15 grid md:grid-cols-3 gap-6 text-sm text-primary-foreground/70">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <div>
              {contact.address.line1}<br />
              {contact.address.line2}
            </div>
          </div>
          <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-primary-foreground">
            <Phone size={16} /> {contact.phone}
          </a>
          <a href={contact.emailHref} className="flex items-center gap-3 hover:text-primary-foreground">
            <Mail size={16} /> {contact.email}
          </a>
        </div>

        <div className="mt-10 text-xs text-primary-foreground/50 flex flex-col md:flex-row justify-between gap-3">
          <div>© {new Date().getFullYear()} {brand.name}. All rights reserved.</div>
          <div>{contact.hours}</div>
        </div>
      </div>
    </footer>
  );
}
