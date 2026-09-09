import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Baby, Bone, ChevronRight, Smile, Sparkles, Syringe } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { useBooking } from "@/components/booking-context";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    id: "Dental Implants",
    icon: Bone,
    desc: "Permanent, natural-feeling replacements placed with guided precision.",
    points: ["Guided 3D surgical planning", "Titanium & zirconia options", "Fixed teeth in a single day"],
  },
  {
    id: "Invisalign",
    icon: Smile,
    desc: "Invisible aligners that straighten discreetly in as little as 6 months.",
    points: ["Digital smile simulation first", "No metal, no diet changes", "Remote progress check-ins"],
  },
  {
    id: "Laser Whitening",
    icon: Sparkles,
    desc: "Up to 8 shades brighter in one 45-minute clinical session.",
    points: ["Enamel-safe LED protocol", "Low-sensitivity formula", "Take-home top-up kit included"],
  },
  {
    id: "Root Canal Therapy",
    icon: Syringe,
    desc: "Microscope-assisted therapy that saves the tooth and ends the pain.",
    points: ["Single-visit endodontics", "Rotary, near-silent tooling", "97% long-term success rate"],
  },
  {
    id: "Pediatric Dentistry",
    icon: Baby,
    desc: "Gentle, playful visits that build lifelong confidence in the chair.",
    points: ["Kid-first calming approach", "Sealants & fluoride care", "Parents stay in the room"],
  },
];

export function Services() {
  const [active, setActive] = useState<string | null>(null);
  const { openBooking } = useBooking();

  return (
    <section id="services" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Treatments"
          title="Care built around the result you want"
          subtitle="Five core specialties, one calm clinic. Hover or tap a card to see what's included."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const open = active === service.id;
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                onMouseEnter={() => setActive(service.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(open ? null : service.id)}
                className={cn(
                  "group cursor-pointer rounded-3xl border p-7 transition-all duration-300",
                  open ? "border-cyan/60 bg-white shadow-glow" : "border-navy/8 bg-surface hover:border-navy/20",
                )}
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-2xl transition-colors",
                    open ? "bg-cyan text-navy" : "bg-navy text-cyan",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy">{service.id}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-4 space-y-2 border-t border-navy/8 pt-4">
                        {service.points.map((p) => (
                          <li key={p} className="flex gap-2 text-sm text-navy/80">
                            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-cyan" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBooking(service.id === "Root Canal Therapy" ? "Root Canal" : service.id);
                        }}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy underline-offset-4 hover:underline"
                      >
                        Learn more & book <ChevronRight className="size-4" />
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
