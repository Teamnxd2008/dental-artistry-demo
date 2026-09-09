import { motion } from "motion/react";
import { Cpu, Moon, ScanLine, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: ScanLine,
    title: "3D CBCT Digital Scanning",
    body: "A single 20-second scan maps bone, nerve and root in full 3D — so every implant is planned to the tenth of a millimetre before we ever begin.",
    stat: "0.1mm planning accuracy",
  },
  {
    icon: Zap,
    title: "Painless Laser Dentistry",
    body: "Soft-tissue lasers replace the scalpel for most gum work. Less bleeding, fewer stitches, and most patients skip anaesthetic entirely.",
    stat: "92% need no injection",
  },
  {
    icon: Cpu,
    title: "Same-Day Crown Technology",
    body: "Our in-house milling unit designs and cuts your ceramic crown while you wait. One appointment, no temporaries, no second trip.",
    stat: "Fitted in 90 minutes",
  },
  {
    icon: Moon,
    title: "Sedation & Comfort Options",
    body: "From nitrous oxide to full IV sedation with an anaesthetist on site, nervous patients get a treatment plan built around their comfort.",
    stat: "4 sedation levels",
  },
];

export function Technology() {
  return (
    <section id="technology" className="section-pad bg-surface">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Why choose us"
          title="Clinical technology you can actually feel"
          subtitle="The equipment isn't the point — the calmer, faster, more predictable visit is."
        />
        <div className="mt-16 space-y-16 md:space-y-24">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const flip = i % 2 === 1;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                <div className={cn("relative", flip && "md:order-2")}>
                  <div className="gradient-hero relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-3xl shadow-soft">
                    <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_25%,rgba(0,242,254,0.45),transparent_60%)]" />
                    <motion.div
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="relative flex size-28 items-center justify-center rounded-full border border-cyan/40 bg-white/10 backdrop-blur"
                    >
                      <Icon className="size-12 text-cyan" />
                    </motion.div>
                    <span className="absolute bottom-5 left-5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
                      {f.stat}
                    </span>
                  </div>
                </div>
                <div className={cn(flip && "md:order-1")}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1.5 text-xs font-semibold tracking-wider text-navy/60 uppercase">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold text-navy md:text-3xl">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
