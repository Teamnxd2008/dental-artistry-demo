# Luxury Dental Demo

You are a Principal UI/UX Architect and Senior Full-Stack Developer specializing in ultra-premium, high-conversion healthcare websites for elite global brands. Build a complete, production-ready demo website for a luxury dental clinic called "DEMO DENTAL CLINICS."

═══════════════════════════════

TECH STACK

═══════════════════════════════

- React 18 (functional components + hooks only)

- Tailwind CSS (fully configured, no inline styles unless dynamic)

- Framer Motion for all animations/transitions

- Lucide React for icons

- React Three Fiber + drei (only if performance allows; otherwise fall back to a beautifully animated CSS 3D / SVG hero — see fallback note below)

- Modular file structure: separate component files per section under /src/components/, shared UI primitives under /src/components/ui/

- No broken imports, no unused state, no console errors. Every interactive element must be fully functional with real local state (no dead buttons).

═══════════════════════════════

DESIGN SYSTEM

═══════════════════════════════

Colors (define as Tailwind theme extensions in tailwind.config):

- Primary: Deep Sapphire Navy #0A192F

- Base: Crisp White #FFFFFF

- Accent: Medical Cyan/Teal #00F2FE (use sparingly — glows, highlights, active states, gradients)

- Surface: Soft Slate Gray #F8FAFC

Typography: 'Plus Jakarta Sans' for headings (bold, tight tracking), 'Inter' for body text. Import both via Google Fonts in index.html.

Visual language:

- Glassmorphism cards: backdrop-blur-xl, bg-white/70 or bg-navy/40, subtle 1px border in white/10 or navy/10, soft layered shadows (avoid harsh drop-shadows — use multi-layer soft shadows for depth)

- Generous whitespace, large border-radius (rounded-2xl/3xl) throughout

- Gradient accents: subtle navy-to-cyan gradients on buttons, badges, and section backgrounds (never full-saturation — keep it clinical and restrained)

- High contrast, accessible text (WCAG AA minimum)

═══════════════════════════════

GLOBAL INTERACTIVE ELEMENTS

═══════════════════════════════

1. FLOATING SMART CONVERSION DOCK

   - Desktop: sticky top header with logo, nav links (Services, Technology, Testimonials, FAQ), phone number CTA, and a primary "Book Free Consultation" button

   - Mobile: fixed bottom bar with two large tap targets — "📞 Emergency Call" (tel: link, pulsing icon animation) and "Book Free Scan" (opens booking modal)

   - Header shrinks/adds shadow on scroll (use Framer Motion + scroll listener)

2. MULTI-STEP BOOKING MODAL (must be fully functional with real state machine)

   - Step 1: Treatment Selection — grid of clickable cards (Implants, Invisalign, Whitening, Root Canal, Pediatric, General Checkup), selected state highlighted with cyan glow

   - Step 2: Date & Time Picker — simple custom calendar grid (current month, disable past dates) + time slot buttons (morning/afternoon/evening), show "🟢 3 slots left today" style urgency indicators

   - Step 3: Contact Info — name, phone, email fields with inline validation (required, phone format, email format), show real-time error states

   - Step 4: Confirmation screen — animated checkmark, summary of selections, two buttons: "Confirm via WhatsApp" (wa.me link prefilled with a text summary of their selections) and "Confirm via SMS" (sms: link)

   - Progress bar/stepper at top of modal showing current step (animated fill)

   - Modal must trap focus, close on backdrop click or ESC, and animate in/out with Framer Motion (scale + fade)

3. AI SMILE QUIZ / COST ESTIMATOR WIDGET

   - Standalone card/section, 3-question flow: (1) "What's your main concern?" Whitening/Braces/Implants/Not Sure (2) "How would you describe the issue?" Mild/Moderate/Severe (3) Contact info for callback

   - On completion, show an animated estimated cost RANGE (e.g., "$450 – $900") with disclaimer text: "Final pricing confirmed after in-person consultation"

   - Store answers in local state, animate between questions with slide/fade transitions

4. BEFORE & AFTER SLIDER

   - Custom draggable slider component (mouse + touch support) over two stacked placeholder images (use styled colored divs or placeholder.com images labeled "Before"/"After")

   - Draggable handle with cyan accent, smooth clip-path reveal

═══════════════════════════════

PAGE SECTIONS (in order)

═══════════════════════════════

1. HEADER — as described above, plus a small location/language indicator (e.g., "📍 New York, NY | EN")

2. HERO SECTION

   - Headline: "World-Class Smiles. Advanced Digital Dentistry." (large, bold, gradient text on key words)

   - Subheadline: one line on precision, comfort, and technology

   - Dual CTAs: "Book Free Consultation" (primary, opens modal) and "Call Now" (secondary, outline style)

   - Trust badge row: "⭐ 4.9 Google Rating (2,300+ Reviews)", "10,000+ Happy Smiles", "🏆 Award-Winning Care" — animate counters counting up on scroll-into-view

   - Interactive 3D/visual showcase on the right: 

     — PRIMARY: attempt a React Three Fiber scene with a simple abstract rotating tooth/molar model (use primitive geometries — sphere/torus compositions — with a glowing cyan rim light and slow auto-rotation, mouse-parallax tilt)

     — FALLBACK (use this if R3F setup risks instability): a large glassmorphic floating card stack with layered CSS 3D transforms (rotateX/Y on mouse move), an animated SVG tooth/smile illustration with glowing cyan outline, and floating badge chips ("Live Appointment Slots Available Today" with pulsing green dot) orbiting or floating with subtle Framer Motion loops

   - Choose whichever approach you can implement with zero errors — a flawless CSS/SVG fallback is strongly preferred over a broken 3D scene

3. INTERACTIVE SERVICES SECTION

   - Section title + subtitle

   - Grid/tab layout: Dental Implants, Invisalign/Braces, Laser Whitening, Root Canal Therapy, Pediatric Dentistry (5 cards)

   - Each card: icon (Lucide), title, one-line description; on hover (desktop) or tap (mobile), expands to reveal 2-3 bullet feature details + "Learn More" micro-link, smooth height/opacity animation

4. WHY CHOOSE US / TECHNOLOGY SHOWCASE

   - 3-4 feature blocks: "3D CBCT Digital Scanning", "Painless Laser Dentistry", "Same-Day Crown Technology", "Sedation & Comfort Options"

   - Alternating image-left/text-right layout (use styled placeholder blocks), icon badges, scroll-reveal animations (fade+slide up, staggered)

5. BEFORE & AFTER SHOWCASE — the interactive slider component from above, in a dedicated section with 2-3 example slides (carousel or grid)

6. TESTIMONIALS & VIDEO WALL

   - Horizontal scroll or grid of testimonial cards: star rating, quote, patient name + "Verified Patient" badge, small avatar placeholder

   - 2-3 "video thumbnail" cards with a play-button overlay (clicking toggles a mock "playing" state — no real video needed, just believable interaction)

7. AI SMILE QUIZ SECTION — the cost estimator widget, presented as its own visually distinct section with a compelling headline ("Get Your Instant Smile Estimate")

8. INTERACTIVE FAQ ACCORDION

   - Search/filter input at top (real-time filtering of FAQ list by keyword)

   - 8-10 FAQs covering insurance, pain management, financing, appointment policy, technology

   - Smooth accordion expand/collapse (Framer Motion height animation), only one open at a time

9. FOOTER

   - 4-column layout: Clinic info + logo, Quick Links, Services, Contact

   - Live "🟢 Open Now" / "🔴 Closed" status badge computed from actual current time vs. mock business hours (real JS Date logic, not hardcoded)

   - Emergency hotline number, embedded map placeholder (styled div with map pin icon, labeled "Map Integration Placeholder")

   - Compliance disclaimer text (small, muted): "This is a demonstration website. Not intended to provide medical advice. [Clinic Name] is HIPAA-compliant (demo placeholder)."

   - Social icons (Lucide), copyright line

═══════════════════════════════

QUALITY BAR (non-negotiable)

═══════════════════════════════

- Every button either performs a real action (opens modal, scrolls to section, toggles state, fires a tel:/sms:/wa.me link) or is clearly a static demo label — nothing dead or misleading

- Fully responsive: test mental breakpoints at 375px, 768px, 1440px — mobile nav/dock must never overlap content

- Scroll-reveal animations use Intersection Observer or Framer Motion's `whileInView`, triggered once, performant (no jank)

- Use semantic HTML (nav, section, header, footer) and accessible labels (aria-label on icon-only buttons, alt text on images)

- No placeholder Lorem Ipsum in headlines — write real, persuasive, benefit-driven marketing copy throughout

- Build incrementally: get the layout and static content working first, then layer in animations and interactivity, testing after each major section to avoid compounding errors

Begin by scaffolding the project structure and Tailwind config, then build section by section in the order listed above. After each section, briefly confirm it renders without errors before moving to the next.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://dental-artistry-demo.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0d4d839-ebc5-42cb-b435-35dea2555b38).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
