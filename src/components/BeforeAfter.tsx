import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { MoveHorizontal } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";

type Case = { title: string; note: string; beforeClass: string; afterClass: string };

const CASES: Case[] = [
  {
    title: "Full-arch implant restoration",
    note: "8 months · Guided implants + ceramic bridge",
    beforeClass: "bg-[linear-gradient(135deg,#6b6257,#3f3a33)]",
    afterClass: "bg-[linear-gradient(135deg,#e8f7fb,#9fd9e8)]",
  },
  {
    title: "Invisalign crowding correction",
    note: "11 months · 24 clear aligner stages",
    beforeClass: "bg-[linear-gradient(135deg,#7c7266,#4a443c)]",
    afterClass: "bg-[linear-gradient(135deg,#f2fbfd,#b7e6f2)]",
  },
  {
    title: "Laser whitening + bonding",
    note: "1 visit · 7 shades brighter",
    beforeClass: "bg-[linear-gradient(135deg,#8a7c63,#544a3b)]",
    afterClass: "bg-[linear-gradient(135deg,#ffffff,#c9ecf6)]",
  },
];

function Slider({ item }: { item: Case }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && update(e.clientX);
    const touch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (dragging.current && t) update(t.clientX);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touch, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [update]);

  return (
    <div className="overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft">
      <div
        ref={ref}
        className="relative aspect-4/3 w-full touch-none select-none"
        onMouseDown={(e) => {
          dragging.current = true;
          update(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          const t = e.touches[0];
          if (t) update(t.clientX);
        }}
      >
        <div className={`absolute inset-0 ${item.afterClass}`}>
          <span className="absolute top-4 right-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-cyan">
            After
          </span>
        </div>
        <div
          className={`absolute inset-0 ${item.beforeClass}`}
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <span className="absolute top-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-navy">
            Before
          </span>
        </div>
        <div className="absolute inset-y-0 w-0.5 bg-cyan" style={{ left: `${pos}%` }} />
        <button
          type="button"
          role="slider"
          aria-label={`Reveal before and after for ${item.title}`}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 5));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 5));
          }}
          className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-navy shadow-glow"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal className="size-5" />
        </button>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-navy">{item.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <section id="results" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Real results"
          title="Drag to see the difference"
          subtitle="Illustrative demo cases. Every plan starts with a free 3D scan and a written estimate."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Slider item={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
