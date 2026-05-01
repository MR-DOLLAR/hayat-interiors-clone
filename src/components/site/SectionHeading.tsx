import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-medium">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-balance leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
