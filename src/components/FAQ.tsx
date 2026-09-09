import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/primitives";

const FAQS = [
  {
    q: "Do you accept my dental insurance?",
    a: "We're in-network with most major PPO plans including Delta Dental, Cigna, Aetna and MetLife. Our team verifies your benefits before treatment and files the claim for you, so you always know your out-of-pocket cost in advance.",
  },
  {
    q: "Will treatment hurt?",
    a: "Comfort is planned, not hoped for. Most procedures use topical numbing before any injection, and 92% of our soft-tissue laser work needs no anaesthetic at all. Nitrous oxide, oral sedation and IV sedation are all available.",
  },
  {
    q: "What financing options do you offer?",
    a: "Interest-free plans start at $79 per month over 12 months, with longer terms through CareCredit and Sunbit. Approval is usually instant and there's no penalty for paying early.",
  },
  {
    q: "How far in advance should I book?",
    a: "New patient consultations are usually available within 48 hours, and we hold emergency slots open every weekday morning. Cosmetic planning appointments typically book about a week out.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Reschedule or cancel free of charge up to 24 hours before your visit. Inside 24 hours a $50 chair fee applies, which we waive for genuine emergencies — just call us.",
  },
  {
    q: "How does the 3D CBCT scan work?",
    a: "You stand still for about 20 seconds while the scanner rotates once around your head. It produces a full 3D model of bone, nerve and sinus at a fraction of the radiation of a medical CT.",
  },
  {
    q: "Can you really make a crown in one visit?",
    a: "Yes. We scan the prepared tooth digitally, design the crown chairside, and mill it from a ceramic block in our own lab. Typical total time from arrival to fitted crown is 90 minutes.",
  },
  {
    q: "Do you treat children?",
    a: "We do. Our pediatric team sees patients from their first tooth onward, with shorter appointments, sealants and fluoride care, and parents welcome in the room throughout.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call our 24/7 emergency hotline immediately. For a knocked-out tooth, keep it in milk and get to us within the hour — we reserve same-day slots for trauma and severe pain.",
  },
  {
    q: "Is Invisalign as effective as braces?",
    a: "For the majority of crowding, spacing and mild bite cases, yes — and it's removable. For complex bite corrections we'll tell you honestly if fixed braces will give the better result.",
  },
];

export function FAQ() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <section id="faq" className="section-pad bg-white">
      <div className="mx-auto max-w-3xl px-4 md:px-8">
        <SectionHeading
          eyebrow="Answers"
          title="Everything patients ask us first"
          subtitle="Search below, or call and a real person will answer in under three rings."
        />

        <div className="relative mt-10">
          <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-navy/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insurance, pain, financing…"
            aria-label="Search frequently asked questions"
            className="w-full rounded-full border border-navy/12 bg-surface py-3.5 pr-4 pl-11 text-sm text-navy outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/40"
          />
        </div>

        <div className="mt-6 divide-y divide-navy/8 overflow-hidden rounded-3xl border border-navy/8">
          {filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No answers matched "{query}". Call us on the number below and we'll help.
            </p>
          ) : null}
          {filtered.map((f) => {
            const index = FAQS.indexOf(f);
            const isOpen = open === index;
            return (
              <div key={f.q} className="bg-white">
                <button
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-surface"
                >
                  <span className="text-sm font-semibold text-navy md:text-base">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="shrink-0 text-navy/50">
                    <ChevronDown className="size-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
