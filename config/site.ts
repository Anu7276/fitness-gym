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
  isSample?: boolean;
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
  hour: number;
  minute: number;
  period: "AM" | "PM";
  program: string;
  slug: string;
  description: string;
  image: string;
  ambientColor: string;
}

export const siteConfig = {
  // SETTINGS
  demoMode: true, // Shows subtle "Sample content" tag on unverified client items
  timezone: "Asia/Kolkata",
  loader: {
    enabled: true,
    minDuration: 1.6,
    maxDuration: 2.4,
  },

  // REAL BRAND FACTS (Preserved exactly from source)
  brand: {
    name: "FITNESSGYM",
    legalName: "FITNESSGYM Vadodara",
    tagline: "Build your stronger self",
    subline: "Train with purpose. Build strength. Become the best version of yourself.",
    badge: "Open 24/7 • Waghodia, Vadodara",
    foundedYear: 2014,
    yearsOfExcellence: "10 years of excellence in fitness",
    aboutHeading: "A modern gym built for real progress",
    aboutSummary:
      "For 10 years, FITNESSGYM has been Waghodia's dedicated home for strength, conditioning, and healthy living. We combine clean modern equipment, round-the-clock access, and experienced personal coaching in an welcoming environment focused on your personal best.",
    facilityArea: "10,000+ sq.ft training floor",
    accessType: "24/7 keyless access",
  },

  // CONTACT & LOCATION
  // SAMPLE: replace before delivery with client's exact details
  contact: {
    address: "Plot 42, Waghodia Main Road, Near Waghodia Chowkdi, Vadodara, Gujarat 390019",
    landmark: "Opposite Crystal Plaza, Waghodia Road",
    phone: "+91 98250 12345",
    phoneFormatted: "+91 98250 12345",
    whatsappNumber: "919825012345",
    email: "hello@fitnessgymvadodara.com",
    mapUrl: "https://maps.google.com/?q=Waghodia+Road+Vadodara+Gujarat",
    hours: "Open 24 hours, 7 days a week, 365 days a year",
  },

  // SOCIAL LINKS
  // SAMPLE: replace before delivery
  social: {
    instagram: "https://instagram.com/fitnessgym_vadodara",
    facebook: "https://facebook.com/fitnessgym_vadodara",
    youtube: "https://youtube.com/@fitnessgym_vadodara",
  },

  // NAVIGATION & PAGE TITLES
  navigation: [
    { name: "Home", href: "/", title: "Home" },
    { name: "Programs", href: "/programs", title: "Programs" },
    { name: "Trainers", href: "/trainers", title: "Trainers" },
    { name: "Gym", href: "/gym", title: "Facility" },
    { name: "Pricing", href: "/pricing", title: "Membership" },
    { name: "Contact", href: "/contact", title: "Contact" },
  ],

  // PRELOADER QUOTES (Rotated dynamically during loading)
  preloaderQuotes: [
    "Your only competition is who you were yesterday.",
    "Discipline builds what motivation starts.",
    "Pain is temporary. Pride is forever.",
    "No shortcuts. Just relentless consistency.",
    "The body achieves what the mind believes.",
    "Stronger than yesterday. Ready for tomorrow.",
    "Every rep counts. Make every second matter.",
    "Fall in love with the grind and results will follow.",
    "Sweat today. Dominate tomorrow.",
    "Champions are forged in the silence of hard work.",
    "Push past your limits — that is where growth lives.",
    "Consistency is the true superpower.",
    "Excuses don't build strength. Action does.",
    "Show up for yourself, especially when it's hard.",
    "Greatness is built rep by rep, day by day.",
  ],

  // 6 REAL PRESERVED PROGRAMS
  programs: [
    {
      id: "bodybuilding",
      slug: "bodybuilding",
      name: "Bodybuilding",
      category: "Strength",
      tagline: "Structured progressive overload for lean muscle development.",
      description:
        "Focused lifting routines targeting hypertrophy, form precision, and balanced strength. Uses Olympic barbells, calibrated dumbbells, and plate-loaded leverage machines.",
      image: "/images/program-bodybuilding.jpg",
      intensity: "High Strength",
      duration: "60-75 min",
      zone: "Zone 1 — Free Weights",
      equipment: "Olympic barbells, custom dumbbell racks, power cages",
      timeSlot: "4:00 AM - 6:30 AM", // SAMPLE: replace before delivery
    },
    {
      id: "cardio-blast",
      slug: "cardio-blast",
      name: "Cardio Blast",
      category: "Endurance",
      tagline: "High-energy interval conditioning to build stamina and heart health.",
      description:
        "Varied interval cardio training designed to improve cardiovascular endurance, burn calories, and build all-day energy through rowers, air bikes, and sprint drills.",
      image: "/images/program-cardio.jpg",
      intensity: "High Aerobic",
      duration: "45-50 min",
      zone: "Zone 2 — Cardio Floor",
      equipment: "Curved treadmills, Concept2 rowers, assault bikes",
      timeSlot: "6:30 AM - 8:30 AM", // SAMPLE: replace before delivery
    },
    {
      id: "elite-yoga",
      slug: "elite-yoga",
      name: "Elite Yoga",
      category: "Mobility",
      tagline: "Restorative mobility, core stability, and breathing.",
      description:
        "Calm, disciplined movement sessions that improve joint flexibility, relieve back and shoulder tension, and support muscular recovery in a quiet timber-floored studio.",
      image: "/images/program-yoga.jpg",
      intensity: "Moderate / Restorative",
      duration: "60 min",
      zone: "Zone 5 — Yoga Studio",
      equipment: "Natural mats, cork blocks, resistance straps",
      timeSlot: "9:00 AM - 10:30 AM", // SAMPLE: replace before delivery
    },
    {
      id: "crossfit",
      slug: "crossfit",
      name: "CrossFit",
      category: "Conditioning",
      tagline: "Functional multi-joint movements for full-body power and agility.",
      description:
        "Varied functional training combining kettlebells, bodyweight gymnastics, and barbell lifts in our open rig and turf area.",
      image: "/images/program-crossfit.jpg",
      intensity: "Maximum Effort",
      duration: "60 min",
      zone: "Zone 3 — Functional Rig",
      equipment: "Rig racks, kettlebells, wall balls, plyo boxes",
      timeSlot: "11:00 AM - 1:00 PM", // SAMPLE: replace before delivery
    },
    {
      id: "mma-training",
      slug: "mma-training",
      name: "MMA Training",
      category: "Combat",
      tagline: "Striking footwork, bag drills, and martial arts conditioning.",
      description:
        "Practical boxing, kickboxing, and defensive movement drills that sharpen hand-eye coordination, reaction time, and core endurance.",
      image: "/images/program-mma.jpg",
      intensity: "High Combat",
      duration: "60-75 min",
      zone: "Zone 4 — Combat Zone",
      equipment: "Heavy teardrop bags, speed balls, floor mats",
      timeSlot: "5:00 PM - 7:00 PM", // SAMPLE: replace before delivery
    },
    {
      id: "power-zumba",
      slug: "power-zumba",
      name: "Power Zumba",
      category: "Rhythm",
      tagline: "Upbeat music-driven cardio dance that makes working out fun.",
      description:
        "Dynamic rhythmic dance and bodyweight movement set to energetic soundtracks. Great for cardio endurance, agility, and burning calories in an encouraging group class.",
      image: "/images/program-zumba.jpg",
      intensity: "High Aerobic Dance",
      duration: "50 min",
      zone: "Zone 6 — Aerobics Studio",
      equipment: "Sprung oak floor, studio sound system, light hand weights",
      timeSlot: "7:30 PM - 9:00 PM", // SAMPLE: replace before delivery
    },
  ],

  // 4 METHOD PILLARS
  pillars: [
    {
      id: "training",
      title: "Training",
      subtitle: "Proper Form First",
      description:
        "We teach clean movement patterns and steady progressive overload so you build strength safely without injury.",
      image: "/images/method-training.jpg",
      quote: "Quality movement leads to lasting strength.",
    },
    {
      id: "nutrition",
      title: "Nutrition",
      subtitle: "Sensible Fueling",
      description:
        "Practical guidance on wholesome food, adequate protein, and hydration that fits your daily routine without extreme diets.",
      image: "/images/method-nutrition.jpg",
      quote: "Eat for energy, recovery, and daily performance.",
    },
    {
      id: "recovery",
      title: "Recovery",
      subtitle: "Rest & Repair",
      description:
        "Muscles grow when you rest. We provide foam rollers, mobility tools, and warm rainfall showers so you bounce back fresh.",
      image: "/images/method-recovery.jpg",
      quote: "Consistency requires intentional recovery.",
    },
    {
      id: "mindset",
      title: "Mindset",
      subtitle: "Daily Habits",
      description:
        "Motivation comes and goes; steady habits remain. Our welcoming community helps you stay accountable year-round.",
      image: "/images/method-mindset.jpg",
      quote: "Show up today. The results will take care of themselves.",
    },
  ],

  // 24-HOUR CLOCK SCHEDULE
  // SAMPLE: confirm with owner
  daySchedule: [
    {
      time: "04:00 AM",
      hour: 4,
      minute: 0,
      period: "AM" as const,
      program: "Bodybuilding",
      slug: "bodybuilding",
      image: "/images/program-bodybuilding.jpg",
      description: "Dedicated compound barbell training and hypertrophy on an uncrowded floor built for pure focus.",
      ambientColor: "#061318",
    },
    {
      time: "07:00 AM",
      hour: 7,
      minute: 0,
      period: "AM" as const,
      program: "Elite Yoga",
      slug: "elite-yoga",
      image: "/images/program-yoga.jpg",
      description: "Guided morning mobility, flexibility flows, and breathwork to start your workday centered and energized.",
      ambientColor: "#0E2F38",
    },
    {
      time: "10:00 AM",
      hour: 10,
      minute: 0,
      period: "AM" as const,
      program: "Cardio Blast",
      slug: "cardio-blast",
      image: "/images/program-cardio.jpg",
      description: "High-intensity cardio intervals, rowers, and assault bikes to elevate endurance and conditioning.",
      ambientColor: "#14424D",
    },
    {
      time: "02:00 PM",
      hour: 14,
      minute: 0,
      period: "PM" as const,
      program: "CrossFit",
      slug: "crossfit",
      image: "/images/program-crossfit.jpg",
      description: "Olympic lifting, gymnastics, and high-intensity metcons with zero platform wait time during the afternoon lull.",
      ambientColor: "#174D5A",
    },
    {
      time: "06:00 PM",
      hour: 18,
      minute: 0,
      period: "PM" as const,
      program: "MMA Training",
      slug: "mma-training",
      image: "/images/program-mma.jpg",
      description: "Striking technique, heavy bag combinations, and coached martial arts conditioning for functional power.",
      ambientColor: "#1E3745",
    },
    {
      time: "11:00 PM",
      hour: 23,
      minute: 0,
      period: "PM" as const,
      program: "Power Zumba",
      slug: "power-zumba",
      image: "/images/program-zumba.jpg",
      description: "High-energy dance cardio and rhythm conditioning for late-evening workouts in a welcoming environment.",
      ambientColor: "#081016",
    },
  ] satisfies TimeSlotItem[],

  // TRAINER FACULTY
  // SAMPLE: replace before delivery with real trainer profiles
  trainers: [
    {
      id: "trainer-1",
      name: "Rajesh Sharma",
      role: "Head Strength Coach",
      experience: "10 years coaching",
      speciality: "Strength training & barbell technique",
      image: "/images/trainer-1.jpg",
      bio: "Focuses on teaching lifters clean barbell technique, smart progressive overload, and building functional strength.",
      isSample: true,
    },
    {
      id: "trainer-2",
      name: "Priya Patel",
      role: "Mobility & Yoga Specialist",
      experience: "8 years coaching",
      speciality: "Joint mobility, posture & yoga",
      image: "/images/trainer-2.jpg",
      bio: "Helps members regain pain-free movement, improve hip and shoulder mobility, and build core stability.",
      isSample: true,
    },
    {
      id: "trainer-3",
      name: "Vikram Rathore",
      role: "Conditioning & CrossFit Coach",
      experience: "7 years coaching",
      speciality: "Aerobic fitness & kettlebell training",
      image: "/images/trainer-3.jpg",
      bio: "Leads fun, high-energy group workouts designed to build athletic endurance, agility, and stamina.",
      isSample: true,
    },
    {
      id: "trainer-4",
      name: "Neha Mehta",
      role: "Movement & Group Fitness Lead",
      experience: "6 years coaching",
      speciality: "Zumba, dance fitness & weight loss",
      image: "/images/trainer-4.jpg",
      bio: "Brings infectious energy to every class, making cardio workouts feel enjoyable and encouraging for beginners.",
      isSample: true,
    },
    {
      id: "trainer-5",
      name: "Arjun Deshmukh",
      role: "Combat Striking Coach",
      experience: "9 years coaching",
      speciality: "Boxing footwork & martial conditioning",
      image: "/images/trainer-5.jpg",
      bio: "Teaches fundamental striking mechanics and athletic bag workouts that build confidence and reflexes.",
      isSample: true,
    },
  ],

  // 3 REAL PRESERVED PRICING TIERS
  pricing: [
    {
      id: "basic",
      name: "Basic",
      price: 1999,
      period: "month",
      periodLabel: "Per month",
      popular: false,
      description: "Full access for self-directed lifters who want high-quality equipment.",
      features: [
        "Full gym floor & free weights access",
        "Open 24/7 with biometric keyless entry",
        "Clean locker rooms and rainfall showers",
        "Free equipment onboarding session",
        "Filtered water and towel service",
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
      description: "Our most chosen plan for members wanting group classes and regular coach guidance.",
      features: [
        "Everything in Basic plan",
        "Unlimited access to all 6 group classes",
        "1 Personal trainer check-in per month",
        "Bi-weekly body composition measurements",
        "Priority locker and changing area access",
        "1 Free guest workout pass per month",
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
      description: "Complete annual membership with personalized nutrition guidance and VIP perks.",
      features: [
        "Everything in Pro plan for a full year",
        "Quarterly personalized nutrition advice",
        "Assigned VIP locker",
        "Complimentary gym training shirt",
        "Freeze your membership up to 30 days free",
        "Unlimited weekend guest passes",
      ],
    },
  ],

  // 3 REAL PRESERVED TESTIMONIALS
  testimonials: [
    {
      id: "testimonial-1",
      author: "Aditya Singh",
      role: "Member since 2022 • Waghodia",
      quote:
        "FITNESSGYM has completely changed my perspective on fitness. The 24/7 access fits my irregular schedule perfectly, and the trainers are genuinely knowledgeable without being pushy.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-2",
      author: "Ved Yadav",
      role: "Member since 2021 • Vadodara",
      quote:
        "The best gym facility in Waghodia without question. Top-tier equipment, pristine cleanliness, and an environment that makes you want to push your limits every single day.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-3",
      author: "Khushi Yadav",
      role: "Member since 2023 • Waghodia",
      quote:
        "The group classes—especially Elite Yoga and Power Zumba—are incredible. The community is welcoming and the facility feels upscale, secure, and thoughtfully designed.",
      rating: 5,
      date: "Verified member",
    },
  ],

  // FACILITY / GYM ZONES
  gymZones: [
    {
      id: "zone-1",
      name: "Free Weights & Dumbbells",
      area: "3,000 sq.ft",
      description: "Calibrated Olympic barbells, dumbbell sets from 2.5kg to 50kg, flat & incline benches, and heavy-duty squat cages.",
      image: "/images/gym-1.jpg",
    },
    {
      id: "zone-2",
      name: "Cardio Zone",
      area: "2,000 sq.ft",
      description: "Curved motorless treadmills, Concept2 rowing machines, assault air bikes, and stair climbers.",
      image: "/images/gym-2.jpg",
    },
    {
      id: "zone-3",
      name: "Functional Rig & Turf Track",
      area: "2,500 sq.ft",
      description: "Turf sprint track for sled pushes, pull-up rigs, gymnastics rings, kettlebells, and plyo boxes.",
      image: "/images/gym-3.jpg",
    },
    {
      id: "zone-4",
      name: "Combat Striking Area",
      area: "1,500 sq.ft",
      description: "Shock-absorbing floor mats, teardrop punching bags, wall striking pads, and speed bags.",
      image: "/images/gym-4.jpg",
    },
    {
      id: "zone-5",
      name: "Quiet Yoga & Mobility Studio",
      area: "1,000 sq.ft",
      description: "Dedicated studio with natural timber flooring, warm indirect lighting, and clean air filtration.",
      image: "/images/gym-5.jpg",
    },
    {
      id: "zone-6",
      name: "Clean Locker Rooms & Showers",
      area: "Spacious & Clean",
      description: "Secure biometric lockers, hot rainfall showers, clean grooming mirrors, and towel service.",
      image: "/images/gym-6.jpg",
    },
  ],

  // FREQUENTLY ASKED QUESTIONS
  faqs: [
    {
      id: "faq-1",
      question: "Is FITNESSGYM really open 24 hours every day?",
      answer:
        "Yes. Members receive secure biometric fingerprint access to train at any time of the day or night, 365 days a year.",
    },
    {
      id: "faq-2",
      question: "Where are you located in Vadodara?",
      answer:
        "We are located on Waghodia Main Road, near Waghodia Chowkdi in Vadodara, with dedicated parking for cars and two-wheelers.",
    },
    {
      id: "faq-3",
      question: "What is included in the Free 1-Day Pass?",
      answer:
        "You get full access to the gym floor, cardio equipment, and any group fitness class on that day, plus a guided tour from our staff.",
    },
    {
      id: "faq-4",
      question: "Are personal trainers available for beginners?",
      answer:
        "Yes. Every new member receives a free equipment walkthrough. Pro and Elite memberships include regular personal coach consultations.",
    },
    {
      id: "faq-5",
      question: "Can I pause my membership if I travel?",
      answer:
        "Elite members can pause their membership for up to 30 days at no cost. Pro members can arrange pauses with front desk staff.",
    },
    {
      id: "faq-6",
      question: "What hygiene and safety measures do you have?",
      answer:
        "The facility is monitored by 24/7 security cameras, sanitized regularly throughout the day, and equipped with first aid and emergency alerts.",
    },
  ],
};
