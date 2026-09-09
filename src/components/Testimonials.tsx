import { useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, Pause, Play, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";

const REVIEWS = [
  {
    name: "Amara Whitfield",
    quote:
      "I put off implants for four years out of fear. The scan took a minute, the surgery was painless, and I ate dinner normally that night.",
    initials: "AW",
  },
  {
    name: "Daniel Okafor",
    quote:
      "Same-day crown, genuinely done in one lunch break. It matches my other teeth so well my dentist friend couldn't spot it.",
    initials: "DO",
  },
  {
    name: "Priya Raghunathan",
    quote:
      "My daughter now asks when her next dentist visit is. That alone is worth five stars from a very tired parent.",
    initials: "PR",
  },
  {
    name: "Marcus Feldman",
    quote:
      "Transparent pricing before anything started, and the finance plan meant no surprise bill at the end. Rare and appreciated.",
    initials: "MF",
  },
];

const VIDEOS = [
  { name: "Sofia's implant journey", length: "2:14" },
  { name: "Inside our CBCT suite", length: "1:38" },
  { name: "Invisalign in 11 months", length: "3:02" },
];

export function Testimonials() {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <section id="testimonials" className="section-pad gradient-hero relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 size-96 rounded-full bg-cyan/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          invert
          eyebrow="Patient stories"
          title="2,300+ reviews. Here's a fair sample."
          subtitle="Verified patients, in their own words. Demo content for illustration."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-dark flex flex-col rounded-3xl p-6"
            >
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-cyan text-cyan" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80">"{r.quote}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-cyan/20 text-sm font-bold text-cyan">
                  {r.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{r.name}</span>
                  <span className="flex items-center gap-1 text-xs text-cyan">
                    <BadgeCheck className="size-3.5" /> Verified patient
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {VIDEOS.map((v) => {
            const isPlaying = playing === v.name;
            return (
              <button
                key={v.name}
                onClick={() => setPlaying(isPlaying ? null : v.name)}
                aria-label={`${isPlaying ? "Pause" : "Play"} ${v.name}`}
                className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur transition hover:border-cyan/50"
              >
                <span className="absolute inset-0 opacity-60 [background:radial-gradient(circle_at_50%_40%,rgba(0,242,254,0.25),transparent_65%)]" />
                <span className="relative flex size-14 items-center justify-center rounded-full bg-cyan text-navy shadow-glow transition group-hover:scale-105">
                  {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 translate-x-0.5" />}
                </span>
                <span className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-xs text-white/75">
                  <span className="font-medium">{v.name}</span>
                  <span>{isPlaying ? "Playing…" : v.length}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
