import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, Phone, Sparkles, X } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/primitives";
import { CLINIC, useBooking } from "@/components/booking-context";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Services", id: "services" },
  { label: "Technology", id: "technology" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        animate={{ paddingTop: scrolled ? 8 : 16, paddingBottom: scrolled ? 8 : 16 }}
        className={cn(
          "transition-colors duration-300",
          scrolled ? "glass-light border-b border-navy/8" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 md:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Demo Dental Clinics home">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-soft text-cyan shadow-soft">
              <Sparkles className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-sm font-extrabold tracking-tight text-navy">
                DEMO DENTAL
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.24em] text-navy/50">CLINICS</span>
            </span>
          </a>

          <nav aria-label="Main" className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-navy/75 transition hover:bg-navy/5 hover:text-navy"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden rounded-full bg-navy/5 px-3 py-1.5 text-xs font-medium text-navy/60 xl:inline">
              📍 New York, NY | EN
            </span>
            <LinkButton href={CLINIC.phoneHref} variant="ghost" className="hidden md:inline-flex">
              <Phone className="size-4" /> {CLINIC.phone}
            </LinkButton>
            <Button onClick={() => openBooking()} className="hidden sm:inline-flex">
              Book Free Consultation
            </Button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="rounded-full border border-navy/10 bg-white/70 p-2.5 text-navy lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mt-3 space-y-1 rounded-3xl border border-navy/8 bg-white p-3 shadow-soft">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-navy hover:bg-navy/5"
                >
                  {item.label}
                </button>
              ))}
              <a
                href={CLINIC.phoneHref}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-navy hover:bg-navy/5"
              >
                {CLINIC.phone}
              </a>
            </div>
          </motion.nav>
        ) : null}
      </motion.div>
    </motion.header>
  );
}

export function MobileDock() {
  const { openBooking } = useBooking();
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/8 bg-white/85 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="flex gap-2.5">
        <a
          href={CLINIC.phoneHref}
          className="flex h-13 flex-1 items-center justify-center gap-2 rounded-full border border-navy/15 text-sm font-semibold text-navy"
        >
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="inline-flex"
          >
            <Phone className="size-4" />
          </motion.span>
          Emergency Call
        </a>
        <button
          onClick={() => openBooking()}
          className="h-13 flex-1 rounded-full bg-gradient-to-r from-navy to-navy-soft text-sm font-semibold text-white shadow-soft"
        >
          Book Free Scan
        </button>
      </div>
    </div>
  );
}
