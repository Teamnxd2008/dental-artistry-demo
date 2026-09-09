import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Sparkles, Youtube } from "lucide-react";
import { CLINIC, useBooking } from "@/components/booking-context";

// Mon-Fri 08:00-19:00, Sat 09:00-16:00, Sun closed
const HOURS: Record<number, [number, number] | null> = {
  0: null,
  1: [8, 19],
  2: [8, 19],
  3: [8, 19],
  4: [8, 19],
  5: [8, 19],
  6: [9, 16],
};

function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const window = HOURS[now.getDay()];
      const hour = now.getHours() + now.getMinutes() / 60;
      if (window && hour >= window[0] && hour < window[1]) {
        setStatus({ open: true, text: `Open now · closes ${window[1]}:00` });
      } else {
        setStatus({ open: false, text: window ? `Closed · opens ${window[0]}:00` : "Closed today · opens Monday" });
      }
    };
    compute();
    const id = window.setInterval(compute, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return status;
}

const LINKS = [
  { label: "Services", id: "services" },
  { label: "Technology", id: "technology" },
  { label: "Results", id: "results" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

const SERVICES = ["Dental Implants", "Invisalign", "Laser Whitening", "Root Canal Therapy", "Pediatric Dentistry"];

export function Footer() {
  const status = useOpenStatus();
  const { openBooking } = useBooking();

  return (
    <footer className="gradient-hero pb-28 text-white/70 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-white/10 text-cyan">
                <Sparkles className="size-5" />
              </span>
              <span className="font-display text-sm font-extrabold tracking-tight text-white">
                DEMO DENTAL CLINICS
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              Digital-first dentistry in Midtown Manhattan. Same-day crowns, guided implants, and genuinely
              comfortable care.
            </p>
            <span
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white"
              aria-live="polite"
            >
              {status ? (status.open ? "🟢" : "🔴") : "⚪"} {status?.text ?? "Checking hours…"}
            </span>
          </div>

          <nav aria-label="Quick links">
            <h3 className="text-sm font-bold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                    className="transition hover:text-cyan"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => openBooking()} className="transition hover:text-cyan">
                  Book a consultation
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => openBooking(s === "Root Canal Therapy" ? "Root Canal" : s)}
                    className="text-left transition hover:text-cyan"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" /> {CLINIC.address}
              </li>
              <li>
                <a href={CLINIC.phoneHref} className="flex gap-2 transition hover:text-cyan">
                  <Phone className="mt-0.5 size-4 shrink-0 text-cyan" /> {CLINIC.phone}
                </a>
              </li>
              <li className="text-cyan">24/7 emergency hotline: {CLINIC.phone}</li>
            </ul>
            <div className="mt-4 flex h-28 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 text-xs">
              <MapPin className="size-4 text-cyan" /> Map Integration Placeholder
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2">
            {[
              { Icon: Instagram, label: "Instagram" },
              { Icon: Facebook, label: "Facebook" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={`${label} (demo link)`}
                className="rounded-full border border-white/10 bg-white/5 p-2.5 transition hover:border-cyan/50 hover:text-cyan"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Demo Dental Clinics. All rights reserved.</p>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-white/40">
          This is a demonstration website. Not intended to provide medical advice. Demo Dental Clinics is
          HIPAA-compliant (demo placeholder). Pricing, reviews, and case results shown are illustrative.
        </p>
      </div>
    </footer>
  );
}
