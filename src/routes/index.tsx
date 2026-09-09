import { createFileRoute } from "@tanstack/react-router";
import { BookingProvider } from "@/components/booking-context";
import { BookingModal } from "@/components/BookingModal";
import { Header, MobileDock } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Technology } from "@/components/Technology";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Testimonials } from "@/components/Testimonials";
import { SmileQuiz } from "@/components/SmileQuiz";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const title = "Demo Dental Clinics — Advanced Digital Dentistry in New York";
const description =
  "Same-day crowns, guided implants, Invisalign and painless laser dentistry in Midtown Manhattan. Book a free 3D scan consultation today.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <Technology />
        <BeforeAfter />
        <Testimonials />
        <SmileQuiz />
        <FAQ />
      </main>
      <Footer />
      <MobileDock />
      <BookingModal />
    </BookingProvider>
  );
}
