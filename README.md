# FITNESSGYM — Vadodara's 24/7 Gym Platform

A high-performance, dark editorial gym web application and white-label platform built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP ScrollTrigger**, **Three.js**, and **Lenis Smooth Scroll**.

Designed for 24/7 fitness facilities, boutique athletic clubs, and strength gyms. Features real verified business data from Waghodia Road, Vadodara, biometric 24-hour schedules, interactive class timetables, health calculators, transformation showcases, and a multi-channel lead capture pipeline (WhatsApp + Resend email + Google Sheets).

---

## 🚀 Step-by-Step Setup Guide

### 1. Local Development Setup
```bash
# Clone the repository
git clone https://github.com/Anu7276/fitness-gym.git
cd fitness-gym

# Install project dependencies
npm install

# Start the Next.js local development server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

To test an optimized production build locally:
```bash
npm run build
npm run start
```

---

### 2. How to Rebrand & Customize Content

Every single piece of copy, pricing, trainer profile, schedule slot, and business parameter is cleanly separated from UI components in two typed configuration files:

#### A. Edit `site.config.ts` (or `config/site.ts`)
This is the single source of truth for core business details:
- **Brand Info**: Name, tagline, subline, founded year, floor area (10,000+ sq.ft).
- **Contact Details**: Phone, WhatsApp number, address, landmark, Google Maps coordinates, operating hours.
- **Typography & Tokens**: `--font-heading` (Barlow Condensed), `--font-body` (Manrope).
- **Trainers**: Names, roles, certifications (`CSCS`, `ACE`, `RYT-500`, `CrossFit L2`), one-line specialties, and bios.
- **Pricing Plans**: Basic (₹1,999/mo), Pro (₹5,999/quarter), and Elite (₹11,999/yr with approx ₹999/mo value highlight).
- **FAQs**: 8 questions covering location, 1-day pass, beginners, pausing, hygiene, payments, timings, and guests.

#### B. Edit `content.ts` (or `config/content.ts`)
Contains specialized dynamic modules:
- **`weeklySchedule`**: 7-day class timetable with time slots, intensities (Low, Medium, High, Peak), coaches, and zones.
- **`transformations`**: Before/after member case studies with weight changes, body fat %, muscle gain, and testimonials.
- **`galleryMedia`**: Categorized photography and video links (Free Weights, Cardio, Combat & Turf, Yoga Studio, Lockers).

---

### 3. How to Replace Images

All local photography is placed in:
📁 `public/images/`

Simply replace the files with matching dimensions:

| Filename | Dimensions | Recommended Visual |
|---|---|---|
| `hero.jpg` | 1920 × 1080 | Wide atmospheric shot of the gym floor at night |
| `about-1.jpg` | 1200 × 800 | Olympic free weights / plate racks |
| `about-2.jpg` | 800 × 600 | Architectural dumbbell rack close-up |
| `gym-1.jpg` to `gym-6.jpg` | 1200 × 800 | Photos of the 6 individual gym training zones |
| `program-bodybuilding.jpg` | 800 × 600 | Heavy barbell deadlift / squat training |
| `program-cardio.jpg` | 800 × 600 | Curved treadmills and Concept2 rowers |
| `program-yoga.jpg` | 800 × 600 | Warm ambient wood-floor yoga sanctuary |
| `program-crossfit.jpg` | 800 × 600 | Functional turf, kettlebells, and rig |
| `program-mma.jpg` | 800 × 600 | Heavy teardrop striking bags and combat cage |
| `program-zumba.jpg` | 800 × 600 | Studio dance fitness with dynamic lighting |
| `trainer-1.jpg` to `trainer-5.jpg` | 600 × 800 | High-contrast vertical coach portraits |
| `cta.jpg` | 1920 × 1080 | Ambient training background for final banner |

---

### 4. Setting Environment Variables

Create a `.env.local` file in the project root:

```env
# Base site URL for canonical SEO and OpenGraph
NEXT_PUBLIC_SITE_URL=https://fitness-gym-zgzy.vercel.app

# Optional Resend API Key for immediate email notifications upon lead submission
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=leads@yourdomain.com
NOTIFICATION_EMAIL=hello@fitnessgymvadodara.com

# Optional Google Sheet Webhook URL (e.g. Google Apps Script or Make.com / Zapier)
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/your_script_id/exec
```

*Note: If `RESEND_API_KEY` or `GOOGLE_SHEET_WEBHOOK_URL` are omitted, the lead form will still log leads to the console and immediately redirect users to WhatsApp with their prefilled trial pass request.*

---

### 5. Deploying to Vercel

#### Method A: Via Git (Recommended)
1. Push your changes to GitHub:
   ```bash
   git add -A
   git commit -m "feat: customize gym site"
   git push origin main
   ```
2. Import the repository in [Vercel](https://vercel.com/new).
3. Under **Environment Variables**, add the keys from your `.env.local`.
4. Click **Deploy**. Vercel will build and assign an SSL-enabled `.vercel.app` URL.

#### Method B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

### 6. Connecting a Custom Domain

1. In your Vercel Dashboard, navigate to **Project Settings → Domains**.
2. Enter your domain (e.g., `fitnessgym.in` or `www.fitnessgym.in`).
3. Add the DNS records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **Apex domain (`fitnessgym.in`)**: `A` record pointing to `76.76.21.21`
   - **Subdomain (`www.fitnessgym.in`)**: `CNAME` record pointing to `cname.vercel-dns.com`
4. SSL certificates are provisioned automatically within minutes.

---

## 🌟 Key Application Features

1. **Preloader & 3D Interactive Dumbbell**:
   - Custom Three.js 3D knurled dumbbell model with metallic shaders and dynamic gyroscopic 3D rotation.
   - Dynamic quote cycler rotating inspiring fitness discipline quotes.
2. **Hero Section**:
   - Barlow Condensed display typography with `clamp(3rem, 8vw, 7rem)` and `leading-[1.05]`.
   - Cinematic zoom-out background scrub driven by GSAP ScrollTrigger.
   - Frosted glass "Explore Programs" CTA with `border: 1px solid rgba(255,255,255,.5)`.
3. **24/7 Clock Rhythm Dial**:
   - Interactive SVG dial mapping the 24-hour cycle of gym activity.
   - Pinned scrub animation smoothly transitioning ambient floor colors as you scroll.
4. **Trainers Marquee**:
   - Infinite continuous loop carousel featuring coach certifications (`CSCS`, `K11`, `ACE`, `RYT-500`) and one-line specialties. Hover-to-pause supported.
5. **Class Timetable (`/schedule`)**:
   - Daily and time-of-day filterable class schedule across 6 zones with intensity tags and direct trial booking.
6. **BMI & Calorie Calculator (`/calculator`)**:
   - Body Mass Index and Mifflin-St Jeor TDEE energy expenditure calculator with custom macro targets (protein, carbs, healthy fats).
7. **Transformations Showcase (`/transformations`)**:
   - Dual before/after case studies with verifiable body fat %, weight changes, and member testimonials.
8. **Photo/Video Gallery (`/gallery`)**:
   - Categorized high-resolution photo gallery with lightbox modal viewer and YouTube tour embed.
9. **Multi-Channel Lead Capture (`/api/lead`)**:
   - Phone regex validation for 10-digit Indian mobile numbers.
   - Automated WhatsApp dispatch with prefilled trial pass message.
   - Resend HTML email notifications & Google Sheets webhook integration.
10. **Compliance & Legal Pages**:
    - Comprehensive `/privacy`, `/terms`, and `/refund-policy` (featuring the 30-day membership freeze rules).
11. **SEO & Performance Standards**:
    - Per-page `Metadata` with canonical URLs, OpenGraph, and Twitter tags.
    - Full JSON-LD `HealthClub` schema with geocoordinates, address, telephone, and amenities.
    - Dynamic vector favicon generated via `app/icon.tsx`.
    - Fully compliant with `prefers-reduced-motion`, visible 2px focus rings, and minimum 44px tap targets.

---

## 📄 License
© 2024 FITNESSGYM Vadodara. All rights reserved. Built for production commercial use.
