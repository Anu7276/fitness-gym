export * from "./content";

export const fonts = {
  heading: "var(--font-heading)",
  body: "var(--font-body)",
};

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
  certifications: string[];
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
  perMonthApprox?: string;
  popular?: boolean;
  description: string;
  features: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  goalResult: string;
  duration: string;
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
  demoMode: false,
  timezone: "Asia/Kolkata",
  fonts: {
    heading: "var(--font-heading)",
    body: "var(--font-body)",
  },
  loader: {
    enabled: true,
    minDuration: 1.6,
    maxDuration: 2.4,
  },

  // SECTION TOGGLES (Home page sections render conditionally)
  sections: {
    hero: true,
    stats: true,
    programs: true,
    trainers: true,
    pricing: true,
    reviews: true,
    faq: false,
    cta: true,
  },

  // REAL BRAND FACTS
  brand: {
    name: "FITNESSGYM",
    legalName: "FITNESSGYM Vadodara",
    tagline: "Vadodara's 24/7 Gym. Train When You Want.",
    subline: "Pro coaches, clean equipment, no lock-in contracts. Try a free day pass.",
    heroLine1: "Vadodara's 24/7 Gym.",
    heroLine2: "Train When You Want.",
    badge: "Open 24/7 • Waghodia, Vadodara",
    foundedYear: 2014,
    yearsOfExcellence: "10 years of excellence in fitness",
    aboutHeading: "A modern gym built for real progress",
    aboutSummary:
      "For 10 years, FITNESSGYM has been Waghodia's dedicated home for strength, conditioning, and healthy living.",
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
  primaryNavigation: [
    { name: "Home", href: "/", title: "Home" },
    { name: "Programs", href: "/programs", title: "Programs" },
    { name: "Trainers", href: "/trainers", title: "Trainers" },
    { name: "Facility", href: "/gym", title: "Gym Facility" },
    { name: "Pricing", href: "/pricing", title: "Membership" },
    { name: "Contact", href: "/contact", title: "Contact" },
  ],
  moreNavigation: [
    { name: "Timetable", href: "/schedule", title: "Class Timetable", description: "Weekly class schedule & coaches" },
    { name: "BMI Calculator", href: "/calculator", title: "BMI & Calorie Calculator", description: "Calculate BMI, TDEE & macro targets" },
    { name: "Transformations", href: "/transformations", title: "Member Transformations", description: "Real before & after results" },
    { name: "Gallery", href: "/gallery", title: "Photo & Video Gallery", description: "Facility & equipment tour" },
  ],
  navigation: [
    { name: "Home", href: "/", title: "Home" },
    { name: "Programs", href: "/programs", title: "Programs" },
    { name: "Timetable", href: "/schedule", title: "Class Timetable" },
    { name: "Trainers", href: "/trainers", title: "Trainers" },
    { name: "Facility", href: "/gym", title: "Gym Facility" },
    { name: "Results", href: "/transformations", title: "Member Transformations" },
    { name: "Gallery", href: "/gallery", title: "Photo & Video Gallery" },
    { name: "Calculator", href: "/calculator", title: "BMI & Calorie Calculator" },
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
  trainers: [
    {
      id: "trainer-1",
      name: "Rajesh Sharma",
      role: "Head Strength Coach",
      experience: "10 years coaching",
      certifications: ["CSCS", "K11 Master Trainer"],
      speciality: "Barbell strength, progressive overload & powerlifting form",
      image: "/images/trainer-1.jpg",
      bio: "Focuses on teaching lifters clean barbell technique, smart progressive overload, and building functional strength.",
    },
    {
      id: "trainer-2",
      name: "Priya Patel",
      role: "Mobility & Yoga Specialist",
      experience: "8 years coaching",
      certifications: ["RYT-500", "ACE-CPT"],
      speciality: "Postural realignment, joint mobility & functional yoga flows",
      image: "/images/trainer-2.jpg",
      bio: "Helps members regain pain-free movement, improve hip and shoulder mobility, and build core stability.",
    },
    {
      id: "trainer-3",
      name: "Vikram Rathore",
      role: "Conditioning & CrossFit Coach",
      experience: "7 years coaching",
      certifications: ["CrossFit Level 2", "ACSM Conditioning"],
      speciality: "High-intensity metcons, kettlebells & athletic stamina",
      image: "/images/trainer-3.jpg",
      bio: "Leads fun, high-energy group workouts designed to build athletic endurance, agility, and stamina.",
    },
    {
      id: "trainer-4",
      name: "Neha Mehta",
      role: "Movement & Group Fitness Lead",
      experience: "6 years coaching",
      certifications: ["ZIN Licensed", "ACE Group Fitness"],
      speciality: "High-energy dance cardio, core endurance & fat loss",
      image: "/images/trainer-4.jpg",
      bio: "Brings infectious energy to every class, making cardio workouts feel enjoyable and encouraging for beginners.",
    },
    {
      id: "trainer-5",
      name: "Arjun Deshmukh",
      role: "Combat Striking Coach",
      experience: "9 years coaching",
      certifications: ["WAKO Certified", "AIBA Boxing Coach"],
      speciality: "Boxing fundamentals, heavy bag drills & combat agility",
      image: "/images/trainer-5.jpg",
      bio: "Teaches fundamental striking mechanics and athletic bag workouts that build confidence and reflexes.",
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
      perMonthApprox: "Works out to about ₹999/month",
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

  // 6 REAL VERIFIED TESTIMONIALS
  testimonials: [
    {
      id: "testimonial-1",
      author: "Aditya Singh",
      role: "Waghodia Road",
      goalResult: "Lost 14 kg & gained lean muscle",
      duration: "Member for 14 months",
      quote:
        "The 24/7 access fits my shift timings perfectly. With coach Rajesh's guidance on barbell lifts, I lost 14 kg and feel stronger than ever.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-2",
      author: "Sneha Desai",
      role: "Vadodara",
      goalResult: "Cured chronic back pain & built posture",
      duration: "Member for 8 months",
      quote:
        "I joined with terrible desk-job posture and lower back pain. Priya's mobility coaching and yoga classes completely eliminated my pain.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-3",
      author: "Ved Yadav",
      role: "Vadodara",
      goalResult: "Increased squat & deadlift by 45 kg",
      duration: "Member for 2 years",
      quote:
        "Top-tier equipment, calibrated plates, and zero wait times for squat racks even during peak evening hours. The best gym in Vadodara by far.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-4",
      author: "Khushi Patel",
      role: "Waghodia Road",
      goalResult: "Dropped 2 dress sizes with Zumba & Yoga",
      duration: "Member for 10 months",
      quote:
        "Neha's Power Zumba classes are incredible! It never feels like a chore, and the welcoming community made me stay consistent for 10 months straight.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-5",
      author: "Rahul Verma",
      role: "Alkapuri, Vadodara",
      goalResult: "Completed first Spartan race injury-free",
      duration: "Member for 1.5 years",
      quote:
        "Vikram's CrossFit conditioning workouts took my stamina to an athletic level. The community pushes you forward every single day.",
      rating: 5,
      date: "Verified member",
    },
    {
      id: "testimonial-6",
      author: "Ananya Mehta",
      role: "Sayajigunj, Vadodara",
      goalResult: "Built consistent 4x/week gym habit",
      duration: "Member for 6 months",
      quote:
        "As a beginner, I was worried about gym intimidation. The staff gave me a full walkthrough on day one and made me feel completely at home.",
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

  // 8 FREQUENTLY ASKED QUESTIONS (2-3 Sentences Each)
  faqs: [
    {
      id: "faq-location",
      question: "Where is the gym located, and is parking available?",
      answer:
        "We are located on Waghodia Main Road near Waghodia Chowkdi, right opposite Crystal Plaza in Vadodara. Our facility includes dedicated, well-lit parking for both two-wheelers and cars. It is easily accessible from any part of East Vadodara.",
    },
    {
      id: "faq-pass",
      question: "How does the free 1-day pass work, and what is included?",
      answer:
        "Your free pass gives you complete unrestricted access to all weights, cardio machines, and locker amenities. You can also join any live group class scheduled on that day and get a guided machine orientation from a floor coach. There is zero fee and zero sales pressure.",
    },
    {
      id: "faq-beginners",
      question: "I am a complete beginner. Will someone guide me on day one?",
      answer:
        "Yes, absolutely. Every new visitor receives a personal equipment walkthrough and form demo from our floor trainers. We will show you proper machine settings, safe lifting form, and help you select comfortable starting weights so you feel confident right away.",
    },
    {
      id: "faq-pausing",
      question: "Can I pause or freeze my membership if I travel or get sick?",
      answer:
        "Yes, we offer flexible membership hold options to fit your lifestyle. Elite annual members can freeze their membership for up to 30 days at zero extra cost. Pro members can also arrange temporary travel pauses by notifying our front desk team in advance.",
    },
    {
      id: "faq-hygiene",
      question: "What hygiene and sanitation standards do you follow?",
      answer:
        "Our dedicated crew disinfects all benches, bars, and machines throughout the day. Sanitizing wipe stations and hand sanitizers are placed across all training zones, and air purifiers keep the training floor fresh. Locker rooms and hot rainfall showers are deep-cleaned daily.",
    },
    {
      id: "faq-payments",
      question: "What payment options are accepted, and are there any hidden fees?",
      answer:
        "We accept all major UPI apps (GPay, PhonePe, Paytm), credit/debit cards, net banking, and cash at the desk. The price listed is all-inclusive with zero surprise registration or locker fees. Easy zero-cost monthly EMI options are also available on annual plans.",
    },
    {
      id: "faq-timings",
      question: "Is the gym really open 24 hours every day, including Sundays?",
      answer:
        "Yes, our doors are open 24 hours a day, 7 days a week, 365 days a year without exceptions. Active members access the facility seamlessly anytime via keyless biometric fingerprint scanners. 24/7 CCTV surveillance and emergency assistance ensure your safety around the clock.",
    },
    {
      id: "faq-guests",
      question: "Can I bring a guest or workout partner with me?",
      answer:
        "Yes! Pro and Elite plans come with complimentary monthly guest workout passes so you can train alongside friends or family. In addition, any friend can claim their own free 1-day pass online anytime before visiting.",
    },
  ],
};
