import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { Award, Phone, ShieldCheck, Star } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/primitives";
import { CLINIC, useBooking } from "@/components/booking-context";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function ToothVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 18 });

  return (
    <div
      ref={wrap}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto w-full max-w-lg [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="glass-dark relative rounded-[2rem] p-8"
      >
        <div className="absolute -inset-8 -z-10 rounded-full bg-cyan/20 blur-3xl" aria-hidden="true" />
        <svg viewBox="0 0 200 220" role="img" aria-label="Illustration of a healthy tooth" className="mx-auto w-56">
          <defs>
            <linearGradient id="toothFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#bfe9f5" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100 18c22-14 62-12 74 16 12 28-2 52-8 78-6 26-8 60-22 84-12 20-28 10-32-12-3-18-4-34-12-34s-9 16-12 34c-4 22-20 32-32 12-14-24-16-58-22-84-6-26-20-50-8-78 12-28 52-30 74-16z"
            fill="url(#toothFill)"
            stroke="#00F2FE"
            strokeWidth="2.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.circle
            cx="70"
            cy="70"
            r="10"
            fill="#00F2FE"
            animate={{ opacity: [0.25, 0.7, 0.25], r: [8, 12, 8] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </svg>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute -top-5 -left-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-xs font-semibold text-navy shadow-soft"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
            <span className="relative inline-flex size-2.5 rounded-full bg-success" />
          </span>
          Live slots available today
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.6 }}
          className="absolute -right-3 -bottom-4 rounded-2xl bg-cyan px-4 py-2.5 text-xs font-bold text-navy shadow-glow"
        >
          3D CBCT scan in 60 seconds
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 text-center">
          {[
            ["98%", "Painless rating"],
            ["Same day", "Crowns fitted"],
          ].map(([a, b]) => (
            <div key={b} className="rounded-2xl bg-white/10 px-3 py-4">
              <p className="font-display text-lg font-bold text-cyan">{a}</p>
              <p className="text-xs text-white/65">{b}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const { openBooking } = useBooking();

  return (
    <section id="top" className="gradient-hero relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="pointer-events-none absolute -top-32 -right-24 size-[32rem] rounded-full bg-cyan/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 size-[30rem] rounded-full bg-cyan/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 md:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan backdrop-blur">
            <ShieldCheck className="size-3.5" /> Manhattan's digital dentistry studio
          </span>
          <h1 className="mt-6 font-display text-4xl leading-[1.05] font-extrabold text-balance text-white md:text-6xl">
            World-Class Smiles. <span className="text-gradient-cyan">Advanced Digital Dentistry.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Precision-guided treatment, genuinely comfortable care, and clinical technology that gets you
            back to your day with a smile you'll want to show off.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="cyan" size="lg" onClick={() => openBooking()}>
              Book Free Consultation
            </Button>
            <LinkButton
              href={CLINIC.phoneHref}
              size="lg"
              variant="outline"
              className="border-white/25 bg-white/5 text-white hover:bg-white/10"
            >
              <Phone className="size-4" /> Call Now
            </LinkButton>
          </div>

          <dl className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: Star,
                value: <Counter to={4.9} decimals={1} />,
                label: "Google rating · 2,300+ reviews",
              },
              {
                icon: ShieldCheck,
                value: <Counter to={10000} suffix="+" />,
                label: "Happy smiles delivered",
              },
              { icon: Award, value: <Counter to={12} suffix="x" />, label: "Award-winning care" },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <Icon className="size-4 text-cyan" />
                <dt className="mt-2 font-display text-2xl font-extrabold text-white">{value}</dt>
                <dd className="mt-1 text-xs text-white/60">{label}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <ToothVisual />
        </motion.div>
      </div>
    </section>
  );
}
