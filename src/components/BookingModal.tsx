import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  Check,
  MessageCircle,
  Smartphone,
  Sparkles,
  Stethoscope,
  Syringe,
  Wrench,
  X,
} from "lucide-react";
import { Button, LinkButton } from "@/components/ui/primitives";
import { CLINIC, useBooking } from "@/components/booking-context";
import { cn } from "@/lib/utils";

const TREATMENTS = [
  { id: "Dental Implants", icon: Wrench },
  { id: "Invisalign", icon: Sparkles },
  { id: "Laser Whitening", icon: Sparkles },
  { id: "Root Canal", icon: Syringe },
  { id: "Pediatric", icon: Baby },
  { id: "General Checkup", icon: Stethoscope },
];

const TIME_SLOTS = [
  { label: "Morning", slots: ["09:00", "10:30", "11:15"], left: 3 },
  { label: "Afternoon", slots: ["13:00", "14:30", "16:00"], left: 2 },
  { label: "Evening", slots: ["17:30", "18:15"], left: 1 },
];

const STEPS = ["Treatment", "Date & Time", "Your details", "Confirm"];

function useCalendar() {
  return useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const first = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lead = (first.getDay() + 6) % 7; // Monday-first
    const cells: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return {
      cells,
      label: first.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      today,
    };
  }, []);
}

export function BookingModal() {
  const { open, closeBooking, presetTreatment } = useBooking();
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const { cells, label, today } = useCalendar();

  useEffect(() => {
    if (open) {
      setStep(0);
      setTreatment(presetTreatment);
      setDate(null);
      setTime(null);
      setForm({ name: "", phone: "", email: "" });
      setTouched({});
    }
  }, [open, presetTreatment]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
      if (e.key === "Tab" && dialogRef.current) {
        const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
        );
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, [open, closeBooking]);

  const errors = {
    name: form.name.trim().length < 2 ? "Please enter your full name" : "",
    phone: !/^[+()\-\s\d]{8,}$/.test(form.phone.trim()) ? "Enter a valid phone number" : "",
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ? "Enter a valid email address" : "",
  };
  const formValid = !errors.name && !errors.phone && !errors.email;

  const canContinue = step === 0 ? !!treatment : step === 1 ? !!date && !!time : step === 2 ? formValid : true;

  const summary = `Hi ${CLINIC.name}! I'd like to book: ${treatment ?? "-"} on ${
    date ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) : "-"
  } at ${time ?? "-"}. Name: ${form.name}, Phone: ${form.phone}, Email: ${form.email}`;

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBooking}
            className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Book an appointment"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-soft sm:rounded-3xl"
          >
            <header className="border-b border-navy/8 px-6 pt-6 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-navy">Book your free consultation</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Step {step + 1} of 4 · {STEPS[step]}
                  </p>
                </div>
                <button
                  onClick={closeBooking}
                  aria-label="Close booking dialog"
                  className="rounded-full p-2 text-navy/60 transition hover:bg-navy/5 hover:text-navy"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-navy/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-navy to-cyan"
                  animate={{ width: `${((step + 1) / 4) * 100}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.22 }}
                >
                  {step === 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {TREATMENTS.map(({ id, icon: Icon }) => {
                        const active = treatment === id;
                        return (
                          <button
                            key={id}
                            onClick={() => setTreatment(id)}
                            aria-pressed={active}
                            className={cn(
                              "flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                              active
                                ? "border-cyan bg-cyan/10 shadow-glow"
                                : "border-navy/10 bg-surface hover:border-navy/25",
                            )}
                          >
                            <Icon className={cn("size-5", active ? "text-navy" : "text-navy/50")} />
                            <span className="text-sm font-semibold text-navy">{id}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div className="space-y-6">
                      <div>
                        <p className="mb-3 text-sm font-semibold text-navy">{label}</p>
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                            <span key={i} className="py-1 text-xs font-medium text-muted-foreground">
                              {d}
                            </span>
                          ))}
                          {cells.map((cell, i) => {
                            if (!cell) return <span key={`e${i}`} />;
                            const past =
                              cell < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            const active = date?.toDateString() === cell.toDateString();
                            return (
                              <button
                                key={cell.toISOString()}
                                disabled={past}
                                onClick={() => setDate(cell)}
                                className={cn(
                                  "aspect-square rounded-xl text-sm transition",
                                  past && "cursor-not-allowed text-navy/25",
                                  !past && !active && "text-navy hover:bg-navy/5",
                                  active && "bg-navy font-semibold text-white shadow-glow",
                                )}
                              >
                                {cell.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="space-y-4">
                        {TIME_SLOTS.map((group) => (
                          <div key={group.label}>
                            <div className="mb-2 flex items-center gap-3">
                              <p className="text-sm font-semibold text-navy">{group.label}</p>
                              <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                                🟢 {group.left} slots left
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {group.slots.map((slot) => (
                                <button
                                  key={slot}
                                  onClick={() => setTime(slot)}
                                  className={cn(
                                    "rounded-full border px-4 py-2 text-sm transition",
                                    time === slot
                                      ? "border-cyan bg-cyan/15 font-semibold text-navy shadow-glow"
                                      : "border-navy/12 text-navy/80 hover:border-navy/30",
                                  )}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-4">
                      {(
                        [
                          { key: "name", label: "Full name", type: "text", ph: "Jane Doe" },
                          { key: "phone", label: "Phone number", type: "tel", ph: "+1 212 555 0184" },
                          { key: "email", label: "Email address", type: "email", ph: "jane@email.com" },
                        ] as const
                      ).map((field) => {
                        const err = errors[field.key];
                        const show = touched[field.key] && err;
                        return (
                          <div key={field.key}>
                            <label
                              htmlFor={`booking-${field.key}`}
                              className="mb-1.5 block text-sm font-medium text-navy"
                            >
                              {field.label}
                            </label>
                            <input
                              id={`booking-${field.key}`}
                              type={field.type}
                              value={form[field.key]}
                              placeholder={field.ph}
                              onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                              onBlur={() => setTouched({ ...touched, [field.key]: true })}
                              aria-invalid={!!show}
                              className={cn(
                                "w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-navy outline-none transition placeholder:text-navy/35 focus:ring-2",
                                show
                                  ? "border-destructive focus:ring-destructive/30"
                                  : "border-navy/12 focus:border-cyan focus:ring-cyan/40",
                              )}
                            />
                            {show ? <p className="mt-1.5 text-xs text-destructive">{err}</p> : null}
                          </div>
                        );
                      })}
                      <p className="text-xs text-muted-foreground">
                        We only use your details to confirm this appointment. Demo site — nothing is stored.
                      </p>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 240, damping: 14 }}
                        className="mx-auto flex size-20 items-center justify-center rounded-full bg-cyan/15 text-navy shadow-glow"
                      >
                        <Check className="size-10" strokeWidth={3} />
                      </motion.div>
                      <h4 className="mt-5 text-2xl font-bold text-navy">You're all set, {form.name.split(" ")[0]}</h4>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Send your request through and our care team replies within 15 minutes.
                      </p>
                      <dl className="mt-6 space-y-2 rounded-2xl bg-surface p-5 text-left text-sm">
                        {[
                          ["Treatment", treatment],
                          [
                            "Date",
                            date?.toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                            }),
                          ],
                          ["Time", time],
                          ["Contact", `${form.phone} · ${form.email}`],
                        ].map(([k, v]) => (
                          <div key={k as string} className="flex justify-between gap-4">
                            <dt className="text-muted-foreground">{k}</dt>
                            <dd className="text-right font-semibold text-navy">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <LinkButton
                          variant="cyan"
                          size="lg"
                          className="flex-1"
                          target="_blank"
                          rel="noreferrer"
                          href={`https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(summary)}`}
                        >
                          <MessageCircle className="size-4" /> Confirm via WhatsApp
                        </LinkButton>
                        <LinkButton
                          variant="outline"
                          size="lg"
                          className="flex-1"
                          href={`${CLINIC.smsHref}?&body=${encodeURIComponent(summary)}`}
                        >
                          <Smartphone className="size-4" /> Confirm via SMS
                        </LinkButton>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {step < 3 ? (
              <footer className="flex items-center justify-between gap-3 border-t border-navy/8 bg-surface px-6 py-4">
                <Button
                  variant="ghost"
                  onClick={() => (step === 0 ? closeBooking() : setStep(step - 1))}
                >
                  <ArrowLeft className="size-4" /> {step === 0 ? "Cancel" : "Back"}
                </Button>
                <Button
                  onClick={() => {
                    if (step === 2) setTouched({ name: true, phone: true, email: true });
                    if (canContinue) setStep(step + 1);
                  }}
                  disabled={step !== 2 && !canContinue}
                >
                  Continue <ArrowRight className="size-4" />
                </Button>
              </footer>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
