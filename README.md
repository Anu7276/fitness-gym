# FITNESSGYM — Boutique Athletic Sanctuary & White-Label Gym Platform

A high-performance, dark editorial gym website and white-label web application built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

Preserves 100% of the real verified business data from the original Waghodia, Vadodara facility while introducing a quiet, luxury athletic design language inspired by architectural boutique training spaces.

---

## 1. Quick Start: How to Run on a Laptop

### Prerequisites
- Node.js 18.17+ or newer (Node v20+ recommended)
- npm, yarn, or pnpm

### Installation & Launch
```bash
# Navigate to project directory
cd fitness-gym

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:
```bash
npm run build
npm run start
```

---

## 2. White-Label System: How to Rebrand in 10 Minutes

Every client-specific piece of information—brand identity, contact information, hours, programs, trainers, pricing plans, testimonials, and FAQs—lives in **one single typed configuration file**:

📁 [`config/site.ts`](file:///c:/Users/anura/OneDrive/Desktop/Agency_project1/fitness-gym/config/site.ts)

**No hardcoded client strings exist in UI components.**

### To rebrand for a new gym client in India:
1. Open `config/site.ts`.
2. Update **Brand Identity**:
   - `name`: Change from `"FITNESSGYM"` to your client's gym name.
   - `badge`: e.g. `"Open 24/7 • Bandra West, Mumbai"`
   - `tagline` & `subline`: Custom slogan.
3. Update **Contact Details**:
   - `phone` & `whatsappNumber`: For Indian WhatsApp integration (e.g., `919876543210`).
   - `address`, `landmark`, and Google Maps embed link.
4. Update **Programs & Pricing**:
   - Swap or adjust the 6 program titles, descriptions, and schedule slots.
   - Set monthly, quarterly, and annual plan prices and feature lists.
5. Update **Trainers & Reviews**:
   - Replace placeholders with actual coach profiles and verified Google reviews.

---

## 3. How to Replace Placeholder Images

All site photography is managed locally in:
📁 [`public/images/`](file:///c:/Users/anura/OneDrive/Desktop/Agency_project1/fitness-gym/public/images/)

Placeholder images have been pre-generated with exact dimensions and labels so you know exactly which file to drop in:

| Filename | Dimensions | Recommended Content |
|---|---|---|
| `hero.jpg` | 1920 × 1080 | Wide atmospheric shot of the gym floor at night |
| `intro-1.jpg` | 1200 × 800 | Olympic plate racks / free weights area |
| `intro-2.jpg` | 800 × 600 | Architectural dumbbell rack close-up |
| `program-bodybuilding.jpg` | 800 × 600 | Hypertrophy lifting action shot |
| `program-cardio.jpg` | 800 × 600 | Curved treadmill or sprint interval |
| `program-yoga.jpg` | 800 × 600 | Mobility / yoga studio with warm lighting |
| `program-crossfit.jpg` | 800 × 600 | Rig, kettlebells, or Olympic barbell snatch |
| `program-mma.jpg` | 800 × 600 | Heavy teardrop bag or striking drill |
| `program-zumba.jpg` | 800 × 600 | Dynamic movement / rhythm studio |
| `trainer-1.jpg` to `trainer-5.jpg` | 600 × 800 | Tall portrait of coach against dark background |
| `gym-1.jpg` to `gym-6.jpg` | 1000 × 700 | Facility zone photos (Free weights, Cardio, Rig, Combat, Studio, Showers) |

> **Note:** Drop your client's real JPEG files with these exact names directly into `/public/images/` and Next.js will automatically optimize and render them in AVIF/WebP formats.

---

## 4. How to Deploy to Vercel

1. Commit your changes to Git:
   ```bash
   git add .
   git commit -m "feat: complete Phase 2 Next.js redesign"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New Project** and import the GitHub repository `https://github.com/Anu7276/fitness-gym`.
4. Framework Preset: **Next.js** (Auto-detected).
5. Click **Deploy**. Vercel will build and assign an instant production URL with automatic HTTPS and edge caching.

---

## 5. Animation & Motion Architecture

1. **Preloader**: Centered logo mark on `#0A1A1F`, dumbbell progress fill synced to real page load (1.6s–2.2s), rotating quotes, circular clip-path reveal into the hero. Runs once per session via `sessionStorage`.
2. **Hero Intro**: Background scale (1.15 to 1.0 over 1.6s), headline line-by-line mask reveal (`translateY(110%)` to `0`), soft-pulsing 24/7 dot, circular scroll indicator, and subtle background parallax.
3. **Smooth Scroll**: Lenis smooth scroll engine synced with GSAP ScrollTrigger ticker. Disabled automatically on touch devices and for users with `prefers-reduced-motion`.
4. **Navigation**: Auto-hides on scroll down, reappears on scroll up, solid background after 40px scroll, hover underline slide-in, desktop magnetic pill button, and staggered mobile drawer.
5. **Page Transition**: Custom `TransitionLink` and `PageTransitionProvider`. A full-screen Surface (`#0F2329`) curtain wipes up (`0.6s cubic-bezier(0.76, 0, 0.24, 1)`), reveals destination page name in bold Outfit type, triggers route change, and lifts off-screen.
6. **24-Hour Dial**: Pinned scroll section with interactive clock dial scrubbed from 4:00 AM to 11:00 PM, changing active program slots and ambient lighting.
7. **Interactive Components**: Draggable trainer carousel with desktop drag bubble cursor, 4-pillar method timeline with rotating SVG text badge, height-animated FAQ accordion, and WhatsApp lead dispatch.

---

## 6. Information Checklist for Gym Owner

To replace all placeholders with 100% verified production data, confirm the following with the owner:
- [ ] **Real facility photos**: 1 hero, 2 intro shots, 6 program photos, 5 coach portraits, 6 zone photos.
- [ ] **Contact details**: Official gym WhatsApp number, primary phone number, and official inquiry email address.
- [ ] **Exact location**: Exact street address and verified Google Maps pin link on Waghodia Road.
- [ ] **Trainer details**: Real names, certified credentials, and bio blurbs for the 5 coaches.
- [ ] **24-Hour schedule mapping**: Confirm the proposed time slots for the 6 programs (currently marked `[CONFIRM WITH OWNER]`).

---

## 7. Documented Deviations from Stitch Screens

1. **Local Asset Architecture**: Converted external placeholder images to clean local JPEG assets in `/public/images/` with fallback dimensions to ensure 100% reliability offline and eliminate external CDN latency.
2. **Accessible Form Handling**: Enhanced the 1-Day Trial Pass and Contact forms with Indian mobile number regex validation and a silent anti-spam honeypot field.
3. **Scroll Dial Controls**: In addition to scroll scrubbing, added clickable time slot pills to the 24-Hour clock dial section to allow instant inspection on touch devices and small viewports.

