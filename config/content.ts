export interface ScheduleSlot {
  id: string;
  day: string; // e.g. "Monday", "Tuesday", etc.
  time: string; // e.g. "06:00 AM - 07:15 AM"
  period: "Morning" | "Afternoon" | "Evening";
  program: string;
  trainer: string;
  room: string;
  intensity: "Low" | "Medium" | "High" | "Peak";
}

export interface TransformationItem {
  id: string;
  name: string;
  age: number;
  duration: string;
  achievement: string;
  stats: {
    weightChange: string;
    bodyFatChange?: string;
    muscleGain?: string;
  };
  quote: string;
  trainer: string;
  program: string;
  imageBefore: string;
  imageAfter: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "weights" | "cardio" | "combat" | "studio" | "amenities";
  categoryLabel: string;
  image: string;
  description: string;
}

export const weeklySchedule: ScheduleSlot[] = [
  // Monday
  { id: "mon-1", day: "Monday", time: "06:00 AM - 07:15 AM", period: "Morning", program: "Bodybuilding & Barbell Basics", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "High" },
  { id: "mon-2", day: "Monday", time: "07:30 AM - 08:30 AM", period: "Morning", program: "Elite Mobility Yoga", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "mon-3", day: "Monday", time: "10:00 AM - 11:00 AM", period: "Morning", program: "Cardio Blast Intervals", trainer: "Vikram Rathore", room: "Zone 2 • Cardio Deck", intensity: "High" },
  { id: "mon-4", day: "Monday", time: "05:00 PM - 06:15 PM", period: "Evening", program: "CrossFit Metcon", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "Peak" },
  { id: "mon-5", day: "Monday", time: "06:30 PM - 07:30 PM", period: "Evening", program: "Combat Striking & Boxing", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "High" },
  { id: "mon-6", day: "Monday", time: "08:00 PM - 09:00 PM", period: "Evening", program: "Power Zumba Party", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "Medium" },

  // Tuesday
  { id: "tue-1", day: "Tuesday", time: "06:00 AM - 07:15 AM", period: "Morning", program: "Olympic Lifting & Deadlift Clinic", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "Peak" },
  { id: "tue-2", day: "Tuesday", time: "07:30 AM - 08:30 AM", period: "Morning", program: "Vinyasa Flow Yoga", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "tue-3", day: "Tuesday", time: "01:00 PM - 02:00 PM", period: "Afternoon", program: "Lunchtime Express Lift", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "Medium" },
  { id: "tue-4", day: "Tuesday", time: "05:30 PM - 06:45 PM", period: "Evening", program: "Kettlebell Conditioning", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "High" },
  { id: "tue-5", day: "Tuesday", time: "07:00 PM - 08:00 PM", period: "Evening", program: "Cardio Dance Zumba", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "Medium" },
  { id: "tue-6", day: "Tuesday", time: "08:15 PM - 09:15 PM", period: "Evening", program: "MMA Footwork & Sparring", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "Peak" },

  // Wednesday
  { id: "wed-1", day: "Wednesday", time: "06:00 AM - 07:15 AM", period: "Morning", program: "Hypertrophy Upper Body", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "High" },
  { id: "wed-2", day: "Wednesday", time: "07:30 AM - 08:30 AM", period: "Morning", program: "Postural Realignment Yoga", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "wed-3", day: "Wednesday", time: "10:30 AM - 11:30 AM", period: "Morning", program: "Assault Bike & Rower HIIT", trainer: "Vikram Rathore", room: "Zone 2 • Cardio Deck", intensity: "Peak" },
  { id: "wed-4", day: "Wednesday", time: "05:30 PM - 06:45 PM", period: "Evening", program: "CrossFit Team WOD", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "Peak" },
  { id: "wed-5", day: "Wednesday", time: "07:00 PM - 08:00 PM", period: "Evening", program: "Heavy Bag Conditioning", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "High" },
  { id: "wed-6", day: "Wednesday", time: "08:15 PM - 09:15 PM", period: "Evening", program: "Power Zumba Core Blast", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "Medium" },

  // Thursday
  { id: "thu-1", day: "Thursday", time: "06:00 AM - 07:15 AM", period: "Morning", program: "Squat Depth & Leg Hypertrophy", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "Peak" },
  { id: "thu-2", day: "Thursday", time: "07:30 AM - 08:30 AM", period: "Morning", program: "Hip & Spine Mobility Flow", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "thu-3", day: "Thursday", time: "02:00 PM - 03:00 PM", period: "Afternoon", program: "Open Gym Coach Consultations", trainer: "Floor Staff", room: "Main Gym Floor", intensity: "Low" },
  { id: "thu-4", day: "Thursday", time: "05:30 PM - 06:45 PM", period: "Evening", program: "Athletic Agility & Sled Drills", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "High" },
  { id: "thu-5", day: "Thursday", time: "07:00 PM - 08:00 PM", period: "Evening", program: "Latin Rhythm Zumba", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "Medium" },
  { id: "thu-6", day: "Thursday", time: "08:15 PM - 09:15 PM", period: "Evening", program: "Kickboxing Combos", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "High" },

  // Friday
  { id: "fri-1", day: "Friday", time: "06:00 AM - 07:15 AM", period: "Morning", program: "Full Body Functional Power", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "High" },
  { id: "fri-2", day: "Friday", time: "07:30 AM - 08:30 AM", period: "Morning", program: "Restorative Yin Yoga", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "fri-3", day: "Friday", time: "10:30 AM - 11:30 AM", period: "Morning", program: "Pyramid Cardio Intervals", trainer: "Vikram Rathore", room: "Zone 2 • Cardio Deck", intensity: "High" },
  { id: "fri-4", day: "Friday", time: "05:30 PM - 06:45 PM", period: "Evening", program: "Friday Night CrossFit Mashup", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "Peak" },
  { id: "fri-5", day: "Friday", time: "07:00 PM - 08:00 PM", period: "Evening", program: "Club Zumba Sweat Session", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "High" },
  { id: "fri-6", day: "Friday", time: "08:15 PM - 09:15 PM", period: "Evening", program: "Combat Defense Workshop", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "High" },

  // Saturday
  { id: "sat-1", day: "Saturday", time: "07:00 AM - 08:30 AM", period: "Morning", program: "Weekend Warrior Barbell Camp", trainer: "Rajesh Sharma", room: "Zone 1 • Free Weights", intensity: "Peak" },
  { id: "sat-2", day: "Saturday", time: "09:00 AM - 10:15 AM", period: "Morning", program: "Detox Vinyasa Yoga", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Medium" },
  { id: "sat-3", day: "Saturday", time: "11:00 AM - 12:30 PM", period: "Morning", program: "CrossFit Open Partner WOD", trainer: "Vikram Rathore", room: "Zone 3 • Functional Turf", intensity: "Peak" },
  { id: "sat-4", day: "Saturday", time: "05:00 PM - 06:15 PM", period: "Evening", program: "Mega Zumba Masterclass", trainer: "Neha Mehta", room: "Zone 6 • Aerobics Studio", intensity: "High" },
  { id: "sat-5", day: "Saturday", time: "06:30 PM - 07:45 PM", period: "Evening", program: "Fight Club Striking Spars", trainer: "Arjun Deshmukh", room: "Zone 4 • Combat Cage", intensity: "Peak" },

  // Sunday
  { id: "sun-1", day: "Sunday", time: "08:00 AM - 09:15 AM", period: "Morning", program: "Deep Stretch & Sound Healing", trainer: "Priya Patel", room: "Zone 5 • Yoga Studio", intensity: "Low" },
  { id: "sun-2", day: "Sunday", time: "09:30 AM - 11:00 AM", period: "Morning", program: "Open Floor Technique Walkthrough", trainer: "All Coaches", room: "Main Gym Floor", intensity: "Low" },
  { id: "sun-3", day: "Sunday", time: "05:00 PM - 06:30 PM", period: "Evening", program: "Cardio Recovery & Mobility Rolling", trainer: "Floor Staff", room: "Zone 3 • Functional Turf", intensity: "Low" },
];

export const transformations: TransformationItem[] = [
  {
    id: "trans-1",
    name: "Aditya Singh",
    age: 29,
    duration: "14 months",
    achievement: "Lost 14 kg fat & built lean athletic shape",
    stats: {
      weightChange: "-14 kg",
      bodyFatChange: "26% → 14%",
      muscleGain: "+4.2 kg",
    },
    quote: "With shifts from 8 AM to 9 PM, I thought a gym routine was impossible. The 24/7 access and Rajesh's barbell programming gave me structure. I have never felt this confident in my body.",
    trainer: "Rajesh Sharma",
    program: "Bodybuilding",
    imageBefore: "/images/transformation-1.jpg",
    imageAfter: "/images/trainer-1.jpg",
  },
  {
    id: "trans-2",
    name: "Sneha Desai",
    age: 34,
    duration: "8 months",
    achievement: "Eliminated chronic desk-job back pain & gained posture",
    stats: {
      weightChange: "-6 kg",
      bodyFatChange: "29% → 21%",
      muscleGain: "+3.0 kg",
    },
    quote: "Ten years of corporate sitting wrecked my lower back. Priya showed me how to activate my glutes and open tight hips. Now I can lift groceries and run around pain-free.",
    trainer: "Priya Patel",
    program: "Elite Yoga",
    imageBefore: "/images/transformation-2.jpg",
    imageAfter: "/images/trainer-2.jpg",
  },
  {
    id: "trans-3",
    name: "Ved Yadav",
    age: 26,
    duration: "2 years",
    achievement: "Added 45 kg to deadlift & 35 kg to back squat",
    stats: {
      weightChange: "+7 kg lean mass",
      bodyFatChange: "15% → 11%",
      muscleGain: "+8.5 kg",
    },
    quote: "Commercial gyms here had dumbbells stopping at 25kg and bent bars. FITNESSGYM has calibrated Olympic gear, robust power cages, and no platform ego. Pure progress.",
    trainer: "Rajesh Sharma",
    program: "Bodybuilding",
    imageBefore: "/images/transformation-3.jpg",
    imageAfter: "/images/program-bodybuilding.jpg",
  },
  {
    id: "trans-4",
    name: "Khushi Patel",
    age: 24,
    duration: "10 months",
    achievement: "Dropped 2 dress sizes & completed 10k run",
    stats: {
      weightChange: "-11 kg",
      bodyFatChange: "31% → 20%",
      muscleGain: "+2.1 kg",
    },
    quote: "Neha's Power Zumba classes are an explosion of joy. It was the first workout that made me smile while sweating. I lost 11 kg without ever feeling deprived or exhausted.",
    trainer: "Neha Mehta",
    program: "Power Zumba",
    imageBefore: "/images/about-1.jpg",
    imageAfter: "/images/program-zumba.jpg",
  },
  {
    id: "trans-5",
    name: "Rahul Verma",
    age: 38,
    duration: "18 months",
    achievement: "Reversed pre-diabetes & completed first Spartan race",
    stats: {
      weightChange: "-18 kg",
      bodyFatChange: "32% → 16%",
      muscleGain: "+5.0 kg",
    },
    quote: "My doctor told me to start exercising immediately. Vikram's metcons and kettlebell classes gave me my health back. My blood markers are normal for the first time in a decade.",
    trainer: "Vikram Rathore",
    program: "CrossFit",
    imageBefore: "/images/method-training.jpg",
    imageAfter: "/images/program-crossfit.jpg",
  },
  {
    id: "trans-6",
    name: "Ananya Mehta",
    age: 28,
    duration: "6 months",
    achievement: "Built self-defense reflexes & sculpted core",
    stats: {
      weightChange: "-5 kg",
      bodyFatChange: "25% → 17%",
      muscleGain: "+2.8 kg",
    },
    quote: "Arjun's combat striking class taught me practical boxing footwork and real striking power. It is empowering, exhilarating, and the best stress release after work.",
    trainer: "Arjun Deshmukh",
    program: "MMA Training",
    imageBefore: "/images/method-mindset.jpg",
    imageAfter: "/images/program-mma.jpg",
  },
];

export const galleryMedia: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Olympic Free Weights & Platforms",
    category: "weights",
    categoryLabel: "Free Weights",
    image: "/images/gym-1.jpg",
    description: "Competition-grade Eleiko barbells, calibrated steel plates, and Olympic drop platforms.",
  },
  {
    id: "gal-2",
    title: "Dumbbell Strength Bay (Up to 50kg)",
    category: "weights",
    categoryLabel: "Free Weights",
    image: "/images/about-2.jpg",
    description: "Pairs from 2.5kg to 50kg with knurled grips and ergonomic rubber urethane encasing.",
  },
  {
    id: "gal-3",
    title: "Cardio Endurance Deck",
    category: "cardio",
    categoryLabel: "Cardio Deck",
    image: "/images/gym-2.jpg",
    description: "Motorless curved treadmills, Concept2 rowers, and assault air bikes facing floor-to-ceiling glass.",
  },
  {
    id: "gal-4",
    title: "Sprint Turf Track & Functional Rig",
    category: "combat",
    categoryLabel: "Functional Turf",
    image: "/images/gym-3.jpg",
    description: "30-meter indoor sprint turf for sled pushes, tire flips, pull-up rigs, and gymnastics rings.",
  },
  {
    id: "gal-5",
    title: "Combat Striking Cage & Heavy Bags",
    category: "combat",
    categoryLabel: "Combat Zone",
    image: "/images/gym-4.jpg",
    description: "Shock-absorbing floor mats, teardrop leather bags, speed balls, and wall focus targets.",
  },
  {
    id: "gal-6",
    title: "Quiet Yoga & Mobility Sanctuary",
    category: "studio",
    categoryLabel: "Studio & Yoga",
    image: "/images/gym-5.jpg",
    description: "Sprung oak flooring, warm ambient recessed lighting, and medical-grade HEPA air purifiers.",
  },
  {
    id: "gal-7",
    title: "Aerobics & Power Zumba Arena",
    category: "studio",
    categoryLabel: "Studio & Yoga",
    image: "/images/program-zumba.jpg",
    description: "Studio sound system, full wall mirrors, and shock-resistant sprung flooring for group classes.",
  },
  {
    id: "gal-8",
    title: "Rainfall Showers & Grooming Bay",
    category: "amenities",
    categoryLabel: "Locker Rooms",
    image: "/images/gym-6.jpg",
    description: "High-pressure hot rainfall showers, vanity stations, hair dryers, and complimentary towel service.",
  },
];
