export interface ProgramItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  intensity: string;
  duration: string;
  zone: string;
  equipment: string;
  timeSlot: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  speciality: string;
  image: string;
  bio: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: number;
  period: string;
  periodLabel: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  quote: string;
  rating: number;
  date?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface PillarItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  quote: string;
}

export interface TimeSlotItem {
  time: string;
  program: string;
  description: string;
  ambientColor: string;
}

export const siteConfig = {
  // BRAND IDENTITY
  brand: {
    name: "FITNESSGYM",
    legalName: "FITNESSGYM Performance Centre",
    tagline: "BUILD YOUR STRONGER SELF.",
    subline: "Train with purpose. Build strength. Become the best version of yourself.",
    badge: "Open 24/7 • Waghodia, Vadodara",
    foundedYear: 2014,
    yearsOfExcellence: "10 years of excellence in fitness",
    introSummary:
      "Rooted in Waghodia, Vadodara, FITNESSGYM stands as an uncompromised center for deliberate physical architecture. We reject chaotic commercial tropes in favor of quiet athletic discipline, providing an atmosphere where precision training meets bespoke wellness.",
    facilityArea: "10,000+ sq.ft",
    accessType: "Biometric Keyless Access",
  },

  // CONTACT & LOCATION (Sample production-ready details)
  contact: {
    address: "Plot 42, Waghodia Main Road, Near Waghodia Chowkdi, Vadodara, Gujarat 390019",
    landmark: "Opposite Crystal Plaza, Waghodia Road",
    phone: "+91 98250 12345",
    phoneFormatted: "+91 98250 12345",
    whatsappNumber: "919825012345",
    email: "concierge@fitnessgymvadodara.com",
    mapUrl: "https://maps.google.com/?q=Waghodia+Road+Vadodara+Gujarat",
    hours: "Open 24 Hours • 7 Days a Week • 365 Days a Year",
  },

  // SOCIAL LINKS
  social: {
    instagram: "https://instagram.com/fitnessgym_vadodara",
    facebook: "https://facebook.com/fitnessgym_vadodara",
    youtube: "https://youtube.com/@fitnessgym_vadodara",
  },

  // NAVIGATION & PAGE TITLES
  navigation: [
    { name: "Home", href: "/", title: "Sanctuary" },
    { name: "Programs", href: "/programs", title: "Programs" },
    { name: "Trainers", href: "/trainers", title: "Trainers" },
    { name: "Gym", href: "/gym", title: "Facility" },
    { name: "Pricing", href: "/pricing", title: "Membership" },
    { name: "Contact", href: "/contact", title: "Contact" },
  ],

  // PRELOADER MOTIVATIONAL QUOTES (cycle every 1.2s)
  preloaderQuotes: [
    "Disciplined movement yields enduring strength.",
    "Bespoke athletic architecture in Vadodara.",
    "Precision equipment calibrated for human potential.",
    "Round-the-clock training sanctuary.",
  ],

  // 6 REAL VERIFIED PROGRAMS
  programs: [
    {
      id: "bodybuilding",
      slug: "bodybuilding",
      name: "Bodybuilding",
      category: "Hypertrophy",
      tagline: "Structured progressive overload and hypertrophy systems for definitive muscle development.",
      description:
        "Scientific biomechanical targeting designed to construct proportional muscle mass, structural symmetry, and maximum peak force production. Utilizes custom Olympic plate-loaded machinery and precision free weights.",
      image: "/images/program-bodybuilding.jpg",
      intensity: "High / Hypertrophy",
      duration: "60-75 min",
      zone: "Zone 01 — Free Weights & Plate-Loaded",
      equipment: "Calibrated Olympic barbells, custom dumbbell runs, iso-lateral leverage racks",
      timeSlot: "4:00 AM - 6:30 AM",
    },
    {
      id: "cardio-blast",
      slug: "cardio-blast",
      name: "Cardio Blast",
      category: "Endurance",
      tagline: "High-intensity metabolic conditioning engineered to elevate stamina and cardiovascular output.",
      description:
        "Metabolic conditioning protocols built to optimize VO2 max, accelerate lactate clearance, and bolster mitochondrial capacity through dynamic interval sessions.",
      image: "/images/program-cardio.jpg",
      intensity: "Very High / Aerobic",
      duration: "45-50 min",
      zone: "Zone 02 — Cardio Theater",
      equipment: "Curved manual treadmills, Concept2 rowers, SkiErgs, assault air bikes",
      timeSlot: "6:30 AM - 8:30 AM",
    },
    {
      id: "elite-yoga",
      slug: "elite-yoga",
      name: "Elite Yoga",
      category: "Mobility",
      tagline: "Calm restorative mobility, breathwork, and structural alignment for holistic resilience.",
      description:
        "A mindful athletic integration of somatic mobility, deep fascial decompression, and diaphragmatic breathing designed to rebuild joint range of motion and accelerate systemic recovery.",
      image: "/images/program-yoga.jpg",
      intensity: "Moderate / Restorative",
      duration: "60 min",
      zone: "Zone 05 — Acoustic Yoga Studio",
      equipment: "Natural cork mats, cedar blocks, resistance straps, bolster cushions",
      timeSlot: "9:00 AM - 10:30 AM",
    },
    {
      id: "crossfit",
      slug: "crossfit",
      name: "CrossFit",
      category: "Conditioning",
      tagline: "Functional multi-planar strength work combining Olympic lifting and raw work capacity.",
      description:
        "Constantly varied functional movements executed at tailored high intensities. Merges gymnastics, Olympic weightlifting, and metabolic conditioning in our dedicated rig zone.",
      image: "/images/program-crossfit.jpg",
      intensity: "Maximum / Functional",
      duration: "60 min",
      zone: "Zone 03 — Functional Rig & Turf",
      equipment: "Custom power rigs, kettlebells, medicine balls, plyometric boxes, climbing ropes",
      timeSlot: "11:00 AM - 1:00 PM",
    },
    {
      id: "mma-training",
      slug: "mma-training",
      name: "MMA Training",
      category: "Combat",
      tagline: "Striking mechanics, grappling fundamentals, and martial combat conditioning.",
      description:
        "Multi-disciplinary martial arts discipline encompassing boxing footwork, Muay Thai striking, and wrestling ground transitions for peak agility and mental toughness.",
      image: "/images/program-mma.jpg",
      intensity: "High / Combat",
      duration: "60-75 min",
      zone: "Zone 04 — Combat Octagon & Bags",
      equipment: "Heavy leather teardrop bags, speed bags, floor tatami mats, sparring gear",
      timeSlot: "5:00 PM - 7:00 PM",
    },
    {
      id: "power-zumba",
      slug: "power-zumba",
      name: "Power Zumba",
      category: "Rhythm",
      tagline: "High-energy rhythmic cardiovascular movement merging tempo choreography with caloric burn.",
      description:
        "Dynamic rhythmic movement sets synchronized to high-bpm acoustics to stimulate endorphin release, agility, coordination, and athletic fat oxidation in an empowering atmosphere.",
      image: "/images/program-zumba.jpg",
      intensity: "High / Aerobic Dance",
      duration: "50 min",
      zone: "Zone 06 — Aerobics & Movement Hall",
      equipment: "Acoustic sprung oak hardwood floor, studio sound system, light hand weights",
      timeSlot: "7:30 PM - 9:00 PM",
    },
  ],

  // 4 METHOD PILLARS
  pillars: [
    {
      id: "training",
      title: "Training",
      subtitle: "Biomechanical Precision",
      description:
        "Every session follows verified biomechanical principles. We eliminate wasted repetition in favor of progressive overload, optimal trajectory, and muscle recruitment calibrated to each body's mechanics.",
      image: "/images/intro-1.jpg",
      quote: "Form is non-negotiable. Strength is the inevitable result.",
    },
    {
      id: "nutrition",
      title: "Nutrition",
      subtitle: "Metabolic Fueling",
      description:
        "Nutrition tailored to your physiology and performance goals. We emphasize nutrient density, timing, and hydration protocols without dogma or unsustainable restrictions.",
      image: "/images/intro-2.jpg",
      quote: "Feed the machine what it needs to perform, recover, and adapt.",
    },
    {
      id: "recovery",
      title: "Recovery",
      subtitle: "Cellular Adaptation",
      description:
        "Real adaptation occurs between sessions. Our recovery protocols incorporate thermal contrast, active fascial release, sleep optimization, and mobility work to sustain peak outputs.",
      image: "/images/gym-5.jpg",
      quote: "Growth occurs in the quiet hours of disciplined restoration.",
    },
    {
      id: "mindset",
      title: "Mindset",
      subtitle: "Uncompromising Consistency",
      description:
        "Physical capacity reflects mental resolve. We foster an environment of quiet focus, where consistency replaces fleeting motivation and athletic habits become permanent.",
      image: "/images/gym-1.jpg",
      quote: "Show up daily. The quiet repetitions accumulate into mastery.",
    },
  ],

  // SIGNATURE 24-HOUR CLOCK DIAL MOMENT (4 AM to 11 PM)
  daySchedule: [
    {
      time: "04:00 AM",
      program: "Dawn Hypertrophy",
      description: "Quiet uninterrupted sessions for early risers seeking absolute focus on heavy iron.",
      ambientColor: "#0A1A1F",
    },
    {
      time: "07:00 AM",
      program: "Cardio Blast & Conditioning",
      description: "High-cadence metabolic conditioning to fire cardiovascular systems before the workday begins.",
      ambientColor: "#0D252E",
    },
    {
      time: "10:00 AM",
      program: "Elite Mobility & Yoga",
      description: "Restorative deep-stretch alignment and spinal mobilization under soft morning natural light.",
      ambientColor: "#112F3B",
    },
    {
      time: "02:00 PM",
      program: "Targeted Strength & Functional Rig",
      description: "Midday power sessions utilizing our Olympic lifting platforms with zero wait times.",
      ambientColor: "#153A47",
    },
    {
      time: "06:00 PM",
      program: "MMA Combat & Striking Labs",
      description: "High-intensity bag drills, footwork, and martial conditioning in our combat zone.",
      ambientColor: "#1E2A32",
    },
    {
      time: "11:00 PM",
      program: "Night Owls & Autonomous Recovery",
      description: "Biometric keyless facility access for late-night dedicated athletes and recovery sessions.",
      ambientColor: "#171217",
    },
  ],

  // TRAINERS ROSTER (Complete realistic faculty sample details)
  trainers: [
    {
      id: "trainer-1",
      name: "Rajesh Sharma",
      role: "Head Strength & Olympic Coach",
      experience: "10+ Years Certified (CSCS, ACE)",
      speciality: "Olympic Weightlifting, Hypertrophy & Biomechanics",
      image: "/images/trainer-1.jpg",
      bio: "Master strength specialist guiding progressive overload, spinal stabilization, and advanced hypertrophy architectures.",
    },
    {
      id: "trainer-2",
      name: "Vikram Rathore",
      role: "Metabolic Conditioning & CrossFit Specialist",
      experience: "7+ Years Certified (CrossFit L2)",
      speciality: "Functional Aerobic Capacity, Agility & Rig Drills",
      image: "/images/trainer-2.jpg",
      bio: "High-performance conditioning coach specialized in lactate threshold protocols, athletic speed, and multi-planar movements.",
    },
    {
      id: "trainer-3",
      name: "Priya Patel",
      role: "Somatic Mobility & Yoga Lead",
      experience: "8+ Years Certified (RYT-500)",
      speciality: "Fascial Release, Postural Alignment & Breathwork",
      image: "/images/trainer-3.jpg",
      bio: "Integrates athletic joint mobility with restorative breathwork to expand functional range of motion and speed muscular recovery.",
    },
    {
      id: "trainer-4",
      name: "Arjun Deshmukh",
      role: "Combat Striking & MMA Coach",
      experience: "9+ Years Certified (National Medallist)",
      speciality: "Boxing Mechanics, Muay Thai & Core Explosiveness",
      image: "/images/trainer-4.jpg",
      bio: "Former competitive kickboxer coaching precision footwork, reactive striking speed, and martial conditioning.",
    },
    {
      id: "trainer-5",
      name: "Neha Mehta",
      role: "Movement & Group Performance Director",
      experience: "6+ Years Certified (ZIN Lead)",
      speciality: "High-Cadence Rhythm, Coordination & Caloric Burn",
      image: "/images/trainer-5.jpg",
      bio: "Dynamic movement architect leading high-energy rhythm conditioning classes that merge tempo with athletic endurance.",
    },
  ],

  // REAL MEMBERSHIP PLANS (Preserved exact names, prices & benefits)
  pricing: [
    {
      id: "basic",
      name: "Basic",
      price: 1999,
      period: "month",
      periodLabel: "Per month",
      popular: false,
      description: "Essential access for independent lifters seeking uncompromised equipment.",
      features: [
        "Full access to gym floor and free weights",
        "Open 24/7 keyless biometric facility entry",
        "Locker and shower room amenities",
        "Free fitness orientation & machine onboarding",
        "Water station & towel service",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      badge: "Most popular",
      price: 5999,
      period: "quarter",
      periodLabel: "Per quarter (3 months)",
      popular: true,
      description: "Our premier tier for dedicated athletes committed to structured quarterly gains.",
      features: [
        "All Basic Tier benefits included",
        "Unlimited access to all 6 specialized group classes",
        "1 Personal Trainer consultation per month",
        "Bi-weekly body composition & caliper check",
        "Priority locker access and lounge entry",
        "Free guest pass (1 per month)",
      ],
    },
    {
      id: "elite",
      name: "Elite",
      badge: "Best value",
      price: 11999,
      period: "year",
      periodLabel: "Per year (12 months)",
      popular: false,
      description: "The complete annual commitment for holistic athletic transformation.",
      features: [
        "All Pro Tier benefits included for 12 months",
        "Quarterly personalized nutrition & meal macro plan",
        "Dedicated VIP locker assignment",
        "Free official FITNESSGYM performance apparel kit",
        "Freeze membership for up to 30 days penalty-free",
        "Unlimited guest passes (accompanied)",
      ],
    },
  ],

  // 3 REAL VERIFIED TESTIMONIALS (Preserved quotes with realistic roles)
  testimonials: [
    {
      id: "testimonial-1",
      author: "Aditya Singh",
      role: "Entrepreneur, Waghodia Road",
      quote:
        "FITNESSGYM has completely changed my perspective on fitness. The 24/7 access fits my irregular schedule perfectly, and the trainers are genuinely knowledgeable without being pushy.",
      rating: 5,
      date: "Verified Member since 2022",
    },
    {
      id: "testimonial-2",
      author: "Ved Yadav",
      role: "Senior Software Architect, Vadodara",
      quote:
        "The best gym facility in Waghodia without question. Top-tier equipment, pristine cleanliness, and an environment that makes you want to push your limits every single day.",
      rating: 5,
      date: "Verified Member since 2021",
    },
    {
      id: "testimonial-3",
      author: "Khushi Yadav",
      role: "Interior Designer & Yoga Practitioner",
      quote:
        "The group classes—especially Elite Yoga and Power Zumba—are incredible. The community is welcoming and the facility feels upscale, secure, and thoughtfully designed.",
      rating: 5,
      date: "Verified Member since 2023",
    },
  ],

  // FACILITY / GYM ZONES
  gymZones: [
    {
      id: "zone-1",
      name: "Free Weights & Heavy Iron",
      area: "3,000 sq.ft",
      description: "Calibrated Olympic barbells, dumbbell sets up to 60kg, flat & incline benches, and heavy-duty squat cages.",
      image: "/images/gym-1.jpg",
    },
    {
      id: "zone-2",
      name: "Cardio Performance Theater",
      area: "2,000 sq.ft",
      description: "Curved motorless treadmills, Concept2 rowing ergometers, assault bikes, and individual heart-rate monitors.",
      image: "/images/gym-2.jpg",
    },
    {
      id: "zone-3",
      name: "Functional Rig & Turf Track",
      area: "2,500 sq.ft",
      description: "High-density turf strip for prowler sleds, gymnastics rings, climbing ropes, kettlebells, and plyo platforms.",
      image: "/images/gym-3.jpg",
    },
    {
      id: "zone-4",
      name: "Combat Octagon & Striking Area",
      area: "1,500 sq.ft",
      description: "Professional shock-absorbing tatami mats, custom teardrop bags, wall pads, and speed bags for MMA striking.",
      image: "/images/gym-4.jpg",
    },
    {
      id: "zone-5",
      name: "Acoustic Mind & Yoga Sanctuary",
      area: "1,000 sq.ft",
      description: "Sound-isolated studio with natural oak flooring, indirect cove lighting, and temperature-controlled air ventilation.",
      image: "/images/gym-5.jpg",
    },
    {
      id: "zone-6",
      name: "Locker Rooms & Recovery Showers",
      area: "Spacious & Secure",
      description: "Private biometric lockers, high-pressure hot rainfall showers, and clean grooming stations maintained continuously.",
      image: "/images/gym-6.jpg",
    },
  ],

  // FREQUENTLY ASKED QUESTIONS
  faqs: [
    {
      id: "faq-1",
      question: "Is FITNESSGYM really open 24 hours every day?",
      answer:
        "Yes. Our facility is accessible 24 hours a day, 7 days a week, 365 days a year through secure biometric fingerprint entry. Members can train at whatever hour aligns with their life rhythm.",
    },
    {
      id: "faq-2",
      question: "Where are you located in Vadodara?",
      answer:
        "We are located on Waghodia Road in Vadodara, Gujarat (Plot 42, Near Waghodia Chowkdi), conveniently accessible with ample dedicated parking for two-wheelers and four-wheelers.",
    },
    {
      id: "faq-3",
      question: "What is included in the Free 1-Day Trial Pass?",
      answer:
        "The 1-Day Trial Pass grants full access to the gym floor, cardio zone, and any group fitness class scheduled on that day. You'll also receive a complimentary facility tour and fitness consultation.",
    },
    {
      id: "faq-4",
      question: "Are personal trainers available for beginners?",
      answer:
        "Yes, all certified coaches provide comprehensive onboarding on equipment mechanics. Pro and Elite members receive included personal training consultations, and private coaching packages are available.",
    },
    {
      id: "faq-5",
      question: "Can I freeze or pause my membership if I travel?",
      answer:
        "Yes. Elite members can freeze their membership for up to 30 days without any administrative penalty. For Pro and Basic tiers, short freezes can be arranged with management.",
    },
    {
      id: "faq-6",
      question: "What safety and hygiene measures are in place?",
      answer:
        "Our facility is monitored 24/7 by CCTV security. All equipment is sanitized on continuous rotational cycles, and medical emergency panic buttons are situated throughout the gym floor.",
    },
  ],
};
