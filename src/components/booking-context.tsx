import { createContext, useContext, useState, type ReactNode } from "react";

type BookingContextValue = {
  open: boolean;
  openBooking: (treatment?: string) => void;
  closeBooking: () => void;
  presetTreatment: string | null;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetTreatment, setPresetTreatment] = useState<string | null>(null);

  return (
    <BookingContext.Provider
      value={{
        open,
        presetTreatment,
        openBooking: (treatment?: string) => {
          setPresetTreatment(treatment ?? null);
          setOpen(true);
        },
        closeBooking: () => setOpen(false),
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}

export const CLINIC = {
  name: "Demo Dental Clinics",
  phone: "+1 (212) 555-0184",
  phoneHref: "tel:+12125550184",
  smsHref: "sms:+12125550184",
  whatsapp: "12125550184",
  address: "480 Park Avenue, New York, NY 10022",
};
