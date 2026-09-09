import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { Button, SectionHeading } from "@/components/ui/primitives";
import { useBooking } from "@/components/booking-context";
import { cn } from "@/lib/utils";

const CONCERNS = ["Whitening", "Braces / Invisalign", "Implants", "Not sure yet"] as const;
const SEVERITY = ["Mild", "Moderate", "Severe"] as const;

const BASE: Record<string, [number, number]> = {
  Whitening: [450, 900],
  "Braces / Invisalign": [2800, 5600],
  Implants: [3200, 6400],
  "Not sure yet": [150, 1200],
};
const MULT: Record<string, number> = { Mild: 1, Moderate: 1.35, Severe: 1.8 };

export function SmileQuiz() {
  const [step, setStep] = useState(0);
  const [concern, setConcern] = useState<string | null>(null);
  const [severity, setSeverity] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", phone: "" });
  const { openBooking } = useBooking();

  const range =
    concern && severity
      ? ((BASE[concern] ?? [0, 0]).map((n) => Math.round((n * (MULT[severity] ?? 1)) / 10) * 10) as [
          number,
          number,
        ])
      : null;

  const reset = () => {
    setStep(0);
    setConcern(null);
    setSeverity(null);
    setContact({ name: "", phone: "" });
  };

  return (
    <section id="estimate" className="section-pad bg-surface">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Smile estimator"
          title="Get Your Instant Smile Estimate"
          subtitle="Three quick questions. An honest ballpark in under 30 seconds — no email wall."
        />

        <div className="mt-12 rounded-[2rem] border border-navy/8 bg-white p-6 shadow-soft md:p-10">
          <div className="mb-6 flex items-center gap-2">
            {[0, 1, 2, 3].map((s) => (
              <span
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  s <= step ? "bg-gradient-to-r from-navy to-cyan" : "bg-navy/10",
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.24 }}
            >
              {step === 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-navy">What's your main concern?</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {CONCERNS.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setConcern(c);
                          setStep(1);
                        }}
                        className={cn(
                          "rounded-2xl border p-5 text-left text-sm font-semibold text-navy transition",
                          concern === c
                            ? "border-cyan bg-cyan/10 shadow-glow"
                            : "border-navy/10 bg-surface hover:border-navy/25",
                        )}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div>
                  <h3 className="text-xl font-bold text-navy">How would you describe the issue?</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {SEVERITY.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSeverity(s);
                          setStep(2);
                        }}
                        className={cn(
                          "rounded-2xl border p-5 text-sm font-semibold text-navy transition",
                          severity === s
                            ? "border-cyan bg-cyan/10 shadow-glow"
                            : "border-navy/10 bg-surface hover:border-navy/25",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div>
                  <h3 className="text-xl font-bold text-navy">Where should we call you back?</h3>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <input
                      aria-label="Your name"
                      placeholder="Your name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      className="rounded-2xl border border-navy/12 bg-surface px-4 py-3 text-sm text-navy outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/40"
                    />
                    <input
                      aria-label="Your phone number"
                      placeholder="Phone number"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      className="rounded-2xl border border-navy/12 bg-surface px-4 py-3 text-sm text-navy outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/40"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="mt-5 w-full sm:w-auto"
                    disabled={contact.name.trim().length < 2 || contact.phone.trim().length < 7}
                    onClick={() => setStep(3)}
                  >
                    <Sparkles className="size-4" /> Reveal my estimate
                  </Button>
                </div>
              ) : null}

              {step === 3 && range ? (
                <div className="text-center">
                  <p className="text-sm font-semibold tracking-wider text-navy/50 uppercase">
                    {concern} · {severity}
                  </p>
                  <motion.p
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 16 }}
                    className="mt-3 font-display text-4xl font-extrabold text-navy md:text-6xl"
                  >
                    ${range[0].toLocaleString()} – ${range[1].toLocaleString()}
                  </motion.p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Final pricing confirmed after in-person consultation. Interest-free plans from $79/month.
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    <Button variant="cyan" size="lg" onClick={() => openBooking()}>
                      Book my free scan
                    </Button>
                    <Button variant="outline" size="lg" onClick={reset}>
                      <RotateCcw className="size-4" /> Start over
                    </Button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>

          {step > 0 && step < 3 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-navy/60 hover:text-navy"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
