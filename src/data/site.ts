// =============================================================================
// CENTRAL DATA FILE
// All site content (brand, contact, navigation, page-wise & section-wise data)
// Edit this file to update content across the entire site.
// =============================================================================

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import sResidential from "@/assets/service-residential.jpg";
import sModular from "@/assets/service-modular.jpg";
import sLuxury from "@/assets/service-luxury.jpg";
import sRenovation from "@/assets/service-renovation.jpg";
import sTurnkey from "@/assets/service-turnkey.jpg";
import sConsultation from "@/assets/service-consultation.jpg";
import sFlooring from "@/assets/service-flooring.jpg";
import sLighting from "@/assets/service-lighting.jpg";
import sAutomation from "@/assets/service-automation.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import aboutHero from "@/assets/about-hero.jpg";
import aboutPortrait from "@/assets/about-portrait.jpg";
import contactHero from "@/assets/contact-hero.jpg";

// -----------------------------------------------------------------------------
// BRAND
// -----------------------------------------------------------------------------
export const brand = {
  name: "Hayat Interiors",
  shortName: "Hayat",
  tagline: "Designs That Feel Like Home",
  logoMark: "H",
  description:
    "Crafting timeless interiors where modern minimalism meets the warmth of Indian heritage.",
};

// -----------------------------------------------------------------------------
// CONTACT
// -----------------------------------------------------------------------------
export const contact = {
  phone: "+91 98862 76722",
  phoneHref: "tel:+919886276722",
  whatsapp: "+91 98862 76722",
  whatsappHref: "https://wa.me/919886276722",
  email: "hello@hayatinteriors.com",
  emailHref: "mailto:hello@hayatinteriors.com",
  address: {
    line1: "Studio 14, Indira Nagar",
    line2: "Bangalore, Karnataka 560038",
    city: "Bangalore",
    country: "India",
  },
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },
};

// -----------------------------------------------------------------------------
// NAVIGATION
// -----------------------------------------------------------------------------
export const navigation = [
  { label: "Home", to: "/" as const },
  { label: "Services", to: "/services" as const },
  { label: "Projects", to: "/our-projects" as const },
  { label: "About", to: "/about-hayat-interiors" as const },
  { label: "Contact", to: "/contact" as const },
];

// -----------------------------------------------------------------------------
// HOME PAGE — section-wise
// -----------------------------------------------------------------------------
export const home = {
  hero: {
    eyebrow: "Interior Studio · Bangalore",
    slides: [
      {
        image: hero1,
        title: "Designs That Feel Like Home",
        caption:
          "A traditional villa reimagined into a sleek, light-filled modern home.",
      },
      {
        image: hero2,
        title: "Timeless Spaces. Considered Details.",
        caption:
          "Transforming homes into experiences through meticulous craft and intent.",
      },
      {
        image: hero3,
        title: "Where Heritage Meets Contemporary",
        caption:
          "Marble, brass and quiet luxury — the new vocabulary of the Indian home.",
      },
    ],
    primaryCta: { label: "Begin Your Project", to: "/contact" as const },
    secondaryCta: { label: "View Portfolio", to: "/our-projects" as const },
  },

  services: {
    eyebrow: "Our Services",
    title: "What We Create",
    subtitle:
      "Comprehensive design solutions tailored to your vision and lifestyle.",
    cta: { label: "Explore All Services", to: "/services" as const },
  },

  process: {
    eyebrow: "How It Works",
    title: "Our Easy Process",
    subtitle:
      "From the first conversation to the final reveal — clarity at every step.",
    steps: [
      { n: "01", title: "Discovery", text: "We listen to your story, lifestyle and the way you want each room to feel." },
      { n: "02", title: "Design", text: "Mood boards, 3D layouts and material palettes — refined until every detail is right." },
      { n: "03", title: "Develop", text: "Tendering, sourcing and on-site coordination managed end-to-end by our team." },
      { n: "04", title: "Deliver", text: "Styled, photographed and handed over — a home ready to be lived in." },
    ],
  },

  projects: {
    eyebrow: "Our Portfolio",
    title: "Featured Projects",
    subtitle: "Curated residential transformations across Bangalore.",
    cta: { label: "View All Projects", to: "/our-projects" as const },
  },

  stats: {
    intro:
      "Our vision is to deliver thoughtfully designed, luxury interiors at accessible price points — without compromising on quality, integrity or value.",
    items: [
      { value: "10+", label: "Years Experience" },
      { value: "100+", label: "Projects Completed" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "15+", label: "Team Members" },
    ],
  },
};

// -----------------------------------------------------------------------------
// SERVICES PAGE
// -----------------------------------------------------------------------------
export const services = {
  hero: {
    eyebrow: "What We Offer",
    title: "Our Services",
    subtitle:
      "Comprehensive interior design solutions that honour Indian heritage while embracing contemporary luxury.",
    image: sResidential,
  },
  list: [
    {
      slug: "residential",
      title: "Residential Interior Design",
      image: sResidential,
      summary:
        "Complete home transformations that blend modern aesthetics with Indian cultural elements, creating spaces that reflect your family's unique story.",
      pricing: "₹18,00,000 – ₹35,00,000",
      timeline: "3 – 6 months",
      features: [
        "Space planning and layout optimization",
        "Custom furniture with local artisan collaboration",
        "Traditional Indian textile and material integration",
        "Climate-appropriate material selection",
      ],
    },
    {
      slug: "modular",
      title: "Modular Solutions",
      image: sModular,
      summary:
        "Intelligent modular kitchens, wardrobes and storage systems designed specifically for Indian cooking styles and family storage needs.",
      pricing: "₹2,50,000 – ₹8,00,000",
      timeline: "6 – 10 weeks",
      features: [
        "Indian cooking-optimised kitchen layouts",
        "Specialised masala and spice storage",
        "Pressure-cooker and heavy utensil organisation",
        "Moisture-resistant materials for Indian climate",
      ],
    },
    {
      slug: "luxury-styling",
      title: "Luxury Styling",
      image: sLuxury,
      summary:
        "Curated furniture selection and textile styling that brings together global luxury with Indian craftsmanship and cultural authenticity.",
      pricing: "₹5,00,000 – ₹15,00,000",
      timeline: "4 – 8 weeks",
      features: [
        "Curated furniture from Indian master craftspeople",
        "Traditional textiles — Banarasi, Kanjivaram, Ikat",
        "Handcrafted brass and copper accent pieces",
        "Contemporary interpretation of traditional motifs",
      ],
    },
    {
      slug: "renovation",
      title: "Renovation & Restoration",
      image: sRenovation,
      summary:
        "Heritage home modernisation that preserves architectural character while upgrading functionality for contemporary Indian family living.",
      pricing: "₹8,00,000 – ₹25,00,000",
      timeline: "4 – 8 months",
      features: [
        "Heritage architecture preservation",
        "Carved wood and jali work restoration",
        "Modern amenity integration without character loss",
        "Structural assessment and reinforcement",
      ],
    },
    {
      slug: "turnkey",
      title: "Turnkey Projects",
      image: sTurnkey,
      summary:
        "End-to-end project management from concept to completion — perfect for NRI families and busy professionals seeking a hassle-free home.",
      pricing: "Custom Quotation",
      timeline: "Project dependent",
      features: [
        "Single-point contact for the entire project",
        "Vendor and contractor management",
        "Weekly progress reports with photos and videos",
        "Quality control at every project stage",
      ],
    },
    {
      slug: "consultation",
      title: "Consultation Services",
      image: sConsultation,
      summary:
        "Expert design guidance for homeowners who want clarity and direction while managing their own projects.",
      pricing: "₹25,000 – ₹1,50,000",
      timeline: "2 – 6 weeks",
      features: [
        "Comprehensive design plan and layout drawings",
        "Material selection and sourcing support",
        "Vendor and contractor recommendations",
        "Budget planning and cost optimisation",
      ],
    },
    {
      slug: "flooring-ceiling",
      title: "False Ceiling & Epoxy Flooring",
      image: sFlooring,
      summary:
        "Elegant false ceilings and seamless epoxy flooring that elevate everyday living with modern character.",
      pricing: "₹350 – ₹1,200 / sq.ft",
      timeline: "2 – 4 weeks",
      features: [
        "3D epoxy floor finishes",
        "Seamless, low-maintenance surfaces",
        "POP and gypsum false ceilings",
        "Integrated concealed lighting and ducts",
      ],
    },
    {
      slug: "lighting",
      title: "Lighting & Smart Lights",
      image: sLighting,
      summary:
        "Thoughtfully layered lighting — ambient, accent and smart — designed to shape mood, comfort and function.",
      pricing: "₹1,50,000 – ₹6,00,000",
      timeline: "2 – 5 weeks",
      features: [
        "Ambient, task and accent lighting design",
        "Smart lighting automation and scenes",
        "Energy-efficient LED solutions",
        "Fixture selection and placement",
      ],
    },
    {
      slug: "automation",
      title: "Home Automation",
      image: sAutomation,
      summary:
        "Intelligent home automation powered by Alexa — your lighting, climate and comfort responding effortlessly to you.",
      pricing: "₹2,00,000 – ₹10,00,000",
      timeline: "3 – 6 weeks",
      features: [
        "Alexa & voice assistant integration",
        "Smart switches and central hubs",
        "Automations and scheduling",
        "Mobile app control and monitoring",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// PROJECTS PAGE
// -----------------------------------------------------------------------------
export const projects = {
  hero: {
    eyebrow: "Our Portfolio",
    title: "Our Projects",
    subtitle:
      "Explore our portfolio of thoughtfully designed spaces that blend modern minimalism with timeless Indian craftsmanship.",
  },
  filters: {
    type: ["All Types", "Apartment", "Villa", "Penthouse", "Bungalow"],
    location: ["All Locations", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune"],
    style: ["All Styles", "Contemporary", "Traditional", "Minimalist", "Fusion", "Luxury"],
    budget: ["All Budgets", "10-20L", "20-40L", "40-60L", "60+L"],
  },
  list: [
    {
      slug: "modern-minimalist-apartment",
      title: "Modern Minimalist Apartment",
      image: p1,
      type: "Apartment",
      location: "Hebbal · Bangalore",
      year: 2025,
      area: "2,100 sq.ft",
      style: "Contemporary",
      budget: "20-40L",
      tagline:
        "A tech professional's apartment with smart-home integration, modular furniture and a focus on work-life balance.",
    },
    {
      slug: "eco-conscious-apartment",
      title: "Eco-Conscious Apartment",
      image: p2,
      type: "Apartment",
      location: "Sarjapur · Bangalore",
      year: 2025,
      area: "1,650 sq.ft",
      style: "Minimalist",
      budget: "10-20L",
      tagline:
        "A sustainable living space using recycled materials, biophilic touches and natural light at its core.",
    },
    {
      slug: "serene-sanctuary-villa",
      title: "Serene Sanctuary Villa",
      image: p3,
      type: "Villa",
      location: "Whitefield · Bangalore",
      year: 2024,
      area: "4,800 sq.ft",
      style: "Fusion",
      budget: "60+L",
      tagline:
        "A contemporary villa blending modern architectural lines with traditional Indian craftsmanship.",
    },
    {
      slug: "the-alabaster-home",
      title: "The Alabaster Home",
      image: p4,
      type: "Apartment",
      location: "Purva Atmosphere · Bangalore",
      year: 2025,
      area: "2,400 sq.ft",
      style: "Luxury",
      budget: "40-60L",
      tagline:
        "A soft alabaster palette, layered textures and curated art define this contemporary apartment.",
    },
    {
      slug: "warm-suite-residence",
      title: "Warm Suite Residence",
      image: p5,
      type: "Apartment",
      location: "Indiranagar · Bangalore",
      year: 2024,
      area: "1,900 sq.ft",
      style: "Contemporary",
      budget: "20-40L",
      tagline:
        "A master suite anchored by a tufted upholstered headboard, walnut accents and warm ambient light.",
    },
    {
      slug: "skyline-penthouse",
      title: "Skyline Penthouse",
      image: p6,
      type: "Penthouse",
      location: "MG Road · Bangalore",
      year: 2024,
      area: "3,600 sq.ft",
      style: "Luxury",
      budget: "60+L",
      tagline:
        "A statement chandelier, marble dining and panoramic city views — entertaining, elevated.",
    },
  ],
};

// -----------------------------------------------------------------------------
// ABOUT PAGE
// -----------------------------------------------------------------------------
export const about = {
  hero: {
    eyebrow: "Our Story",
    title: "Where Modern Minimalism Meets Timeless Indian Soul",
    subtitle:
      "Creating homes that honour both contemporary living and Indian heritage through exceptional craftsmanship and thoughtful design.",
    image: aboutHero,
  },
  story: {
    eyebrow: "Our Story",
    title: "Hayat: Life in Every Space",
    image: aboutPortrait,
    paragraphs: [
      "Founded in 2025, Hayat Interiors is guided by founders with over a decade of expertise in interior design and project execution. This depth of experience ensures clarity in design, precision in delivery and consistent quality across every engagement.",
      "Our design philosophy blends contemporary minimalism with culturally rooted sensibilities, resulting in interiors that are both elegant and highly functional. From modular kitchens and wardrobes to complete home interiors, we deliver end-to-end solutions defined by refined detailing, premium materials and disciplined execution.",
      "Driven by a commitment to excellence, we believe impactful design is understated, intentional and enduring.",
      "Because we don't just design homes; we design how life feels inside them.",
    ],
  },
  principles: {
    eyebrow: "Our Philosophy",
    title: "Design Principles That Guide Us",
    subtitle:
      "Our approach to interior design is rooted in six core principles that shape every project we undertake.",
    items: [
      { title: "Cultural Authenticity", text: "We celebrate Indian heritage through materials, motifs and craft — reinterpreted for modern life." },
      { title: "Intentional Minimalism", text: "Every object earns its place. Calm interiors that prioritise space, light and air." },
      { title: "Material Honesty", text: "Natural stone, solid wood, brass and linen — finishes that age beautifully over time." },
      { title: "Functional Elegance", text: "Beauty without compromise on how a home actually lives, day after day." },
      { title: "Personal Storytelling", text: "Spaces shaped around your family, rituals and memories — not generic templates." },
      { title: "Disciplined Execution", text: "On-time delivery, transparent budgeting and quality control at every stage." },
    ],
  },
  stats: home.stats.items,
};

// -----------------------------------------------------------------------------
// CONTACT PAGE
// -----------------------------------------------------------------------------
export const contactPage = {
  hero: {
    eyebrow: "Get In Touch",
    title: "Let's Create Your Dream Home Together",
    subtitle:
      "Begin your journey to a beautifully designed space that reflects your unique style and cultural heritage. Our team is ready to bring your vision to life.",
    image: contactHero,
  },
  form: {
    title: "Start Your Project",
    subtitle: "Fill out the form below and we'll schedule a consultation within 24 hours.",
    projectTypes: [
      "Complete Home Interior",
      "Modular Kitchen",
      "Bedroom Design",
      "Living Room Design",
      "Home Office",
      "Renovation & Restoration",
      "Consultation Only",
    ],
    propertyTypes: [
      "1 BHK Apartment",
      "2 BHK Apartment",
      "3 BHK Apartment",
      "4+ BHK Apartment",
      "Villa / Independent House",
      "Duplex / Penthouse",
      "Commercial Space",
    ],
    budgets: [
      "Under ₹5,00,000",
      "₹5,00,000 – ₹10,00,000",
      "₹10,00,000 – ₹20,00,000",
      "₹20,00,000 – ₹50,00,000",
      "Above ₹50,00,000",
      "Not sure yet",
    ],
    timelines: [
      "Immediate (within 1 month)",
      "1 – 3 months",
      "3 – 6 months",
      "6 – 12 months",
      "Just planning",
    ],
    contactMethods: ["Email", "Phone", "WhatsApp"],
    sources: ["Google Search", "Instagram", "Facebook", "LinkedIn", "Referral", "Magazine", "Other"],
  },
  channels: [
    {
      title: "Call Us",
      value: contact.phone,
      href: contact.phoneHref,
      meta: contact.hours,
      sub: "Available for immediate queries",
    },
    {
      title: "Email Us",
      value: contact.email,
      href: contact.emailHref,
      meta: "Response within 24 hours",
      sub: "Project briefs welcome",
    },
    {
      title: "WhatsApp",
      value: contact.whatsapp,
      href: contact.whatsappHref,
      meta: "Quick chat",
      sub: "We reply during business hours",
    },
  ],
};

// -----------------------------------------------------------------------------
// FOOTER
// -----------------------------------------------------------------------------
export const footer = {
  about:
    "Hayat Interiors is a Bangalore-based studio crafting timeless, livable homes that balance modern minimalism with Indian heritage.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "About", to: "/about-hayat-interiors" as const },
        { label: "Services", to: "/services" as const },
        { label: "Projects", to: "/our-projects" as const },
        { label: "Contact", to: "/contact" as const },
      ],
    },
    {
      title: "Services",
      links: services.list.slice(0, 5).map((s) => ({
        label: s.title,
        to: "/services" as const,
      })),
    },
  ],
};
