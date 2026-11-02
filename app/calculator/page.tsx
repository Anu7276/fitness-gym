"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Calculator, Flame, Scale, Target, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export default function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<"bmi" | "calorie">("bmi");

  // Common inputs
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<number>(26);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(72);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(158);

  // Calorie specific inputs
  const [activityLevel, setActivityLevel] = useState<number>(1.375); // Light active
  const [goal, setGoal] = useState<"cut" | "maintain" | "bulk">("cut");

  // Calculations
  const effectiveHeightMeters = unitSystem === "metric" 
    ? heightCm / 100 
    : ((heightFt * 12) + heightIn) * 0.0254;

  const effectiveWeightKg = unitSystem === "metric" 
    ? weightKg 
    : weightLbs * 0.453592;

  // 1. BMI Calculation
  const bmi = effectiveHeightMeters > 0 ? (effectiveWeightKg / (effectiveHeightMeters * effectiveHeightMeters)) : 0;
  const bmiFormatted = bmi.toFixed(1);

  let bmiCategory = "Normal Weight";
  let bmiColor = "text-[#25D366]";
  let bmiBg = "bg-[#25D366]/10 border-[#25D366]/30";
  let bmiAdvice = "You are in a healthy weight zone. Focus on strength training and maintaining lean muscle mass.";

  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiColor = "text-blue-400";
    bmiBg = "bg-blue-500/10 border-blue-500/30";
    bmiAdvice = "Focus on nutrient-dense meals, progressive resistance lifting, and a slight calorie surplus to build muscle safely.";
  } else if (bmi >= 25 && bmi < 29.9) {
    bmiCategory = "Overweight";
    bmiColor = "text-yellow-400";
    bmiBg = "bg-yellow-500/10 border-yellow-500/30";
    bmiAdvice = "A sensible calorie deficit combined with high-intensity interval training (HIIT) and barbell lifting will drop body fat fast.";
  } else if (bmi >= 30) {
    bmiCategory = "Obese";
    bmiColor = "text-[#F21B35]";
    bmiBg = "bg-[#F21B35]/10 border-[#F21B35]/30";
    bmiAdvice = "Our coaches can design a low-impact joint-friendly training and nutrition plan to kickstart your healthy transformation.";
  }

  // Healthy weight range (BMI 18.5 - 24.9)
  const minHealthyWeight = (18.5 * effectiveHeightMeters * effectiveHeightMeters).toFixed(1);
  const maxHealthyWeight = (24.9 * effectiveHeightMeters * effectiveHeightMeters).toFixed(1);

  // 2. BMR & TDEE (Mifflin-St Jeor)
  const bmr = gender === "male"
    ? 10 * effectiveWeightKg + 6.25 * (effectiveHeightMeters * 100) - 5 * age + 5
    : 10 * effectiveWeightKg + 6.25 * (effectiveHeightMeters * 100) - 5 * age - 161;

  const tdee = Math.round(bmr * activityLevel);

  let targetCalories = tdee;
  let goalLabel = "Maintain Current Weight";
  if (goal === "cut") {
    targetCalories = Math.round(tdee - 500);
    goalLabel = "Fat Loss (~0.5 kg/week)";
  } else if (goal === "bulk") {
    targetCalories = Math.round(tdee + 350);
    goalLabel = "Lean Muscle Gain (+0.25 kg/week)";
  }

  // Macro Splits (Protein ~2g/kg, Fat ~25%, Carbs balance)
  const proteinGrams = Math.round(effectiveWeightKg * 2.0);
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);
  const remainingCalories = targetCalories - (proteinGrams * 4 + fatCalories);
  const carbGrams = Math.max(0, Math.round(remainingCalories / 4));

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Health &amp; fitness tools
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            BMI &amp; Calorie Calculator
          </h1>
          <p className="font-body text-[17px] text-[#E5E5E5] max-w-xl leading-[1.6]">
            Get accurate science-backed estimates of your Body Mass Index, daily energy expenditure (TDEE), and personalized macronutrient splits.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#0F2329] border border-[#1E3840]">
            <button
              onClick={() => setActiveTab("bmi")}
              className={`px-6 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                activeTab === "bmi"
                  ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                  : "text-[#B7C4C8] hover:text-white"
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>BMI Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab("calorie")}
              className={`px-6 py-2.5 rounded-full text-xs font-heading uppercase tracking-wider font-semibold transition-all flex items-center gap-2 ${
                activeTab === "calorie"
                  ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                  : "text-[#B7C4C8] hover:text-white"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>TDEE &amp; Calories</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-5xl mx-auto items-start">
          {/* Left Column: Form Controls (6 cols) */}
          <div className="lg:col-span-6 bg-[#0F2329] border border-[#1E3840] rounded-card p-7 md:p-9 shadow-xl flex flex-col gap-6">
            {/* Unit System Switcher */}
            <div className="flex items-center justify-between border-b border-[#1E3840] pb-4">
              <span className="font-heading text-xs uppercase tracking-wider text-white font-semibold">
                Unit System
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`px-3 py-1 rounded-md text-xs font-body transition-colors ${
                    unitSystem === "metric" ? "bg-[#142D35] text-white border border-[#2A4B56]" : "text-[#7B8E94]"
                  }`}
                >
                  Metric (cm / kg)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-3 py-1 rounded-md text-xs font-body transition-colors ${
                    unitSystem === "imperial" ? "bg-[#142D35] text-white border border-[#2A4B56]" : "text-[#7B8E94]"
                  }`}
                >
                  Imperial (ft / lbs)
                </button>
              </div>
            </div>

            {/* Gender & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                  Gender
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-body border transition-colors ${
                      gender === "male" ? "bg-[#142D35] text-white border-[#F21B35]" : "bg-[#0A1A1F] text-[#B7C4C8] border-[#1E3840]"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-body border transition-colors ${
                      gender === "female" ? "bg-[#142D35] text-white border-[#F21B35]" : "bg-[#0A1A1F] text-[#B7C4C8] border-[#1E3840]"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white font-mono focus:outline-none focus:border-[#F21B35]"
                />
              </div>
            </div>

            {/* Height Input */}
            <div>
              <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                Height {unitSystem === "metric" ? "(cm)" : "(Feet & Inches)"}
              </label>
              {unitSystem === "metric" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="flex-1 accent-[#F21B35]"
                  />
                  <span className="w-16 text-right font-mono text-sm text-white bg-[#0A1A1F] border border-[#1E3840] py-1.5 px-2 rounded">
                    {heightCm} cm
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="4"
                    max="7"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    placeholder="Feet"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white font-mono"
                  />
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    placeholder="Inches"
                    className="w-full px-3 py-2 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white font-mono"
                  />
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                Weight {unitSystem === "metric" ? "(kg)" : "(lbs)"}
              </label>
              {unitSystem === "metric" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="flex-1 accent-[#F21B35]"
                  />
                  <span className="w-16 text-right font-mono text-sm text-white bg-[#0A1A1F] border border-[#1E3840] py-1.5 px-2 rounded">
                    {weightKg} kg
                  </span>
                </div>
              ) : (
                <input
                  type="number"
                  min="80"
                  max="350"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white font-mono"
                />
              )}
            </div>

            {/* Calorie Specific Inputs */}
            {activeTab === "calorie" && (
              <>
                <div>
                  <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white focus:outline-none focus:border-[#F21B35] cursor-pointer"
                  >
                    <option value={1.2}>Sedentary (Desk job, little exercise)</option>
                    <option value={1.375}>Light Active (1-3 gym workouts/week)</option>
                    <option value={1.55}>Moderate Active (3-5 intense sessions/week)</option>
                    <option value={1.725}>Very Active (6-7 hard lifting/sport days)</option>
                    <option value={1.9}>Extremely Active (Athletic training + physical job)</option>
                  </select>
                </div>

                <div>
                  <label className="font-heading text-xs uppercase tracking-wider text-white block mb-1.5 font-semibold">
                    Fitness Target
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setGoal("cut")}
                      className={`py-2 rounded-lg text-xs font-body border transition-colors ${
                        goal === "cut" ? "bg-[#142D35] text-white border-[#F21B35]" : "bg-[#0A1A1F] text-[#B7C4C8] border-[#1E3840]"
                      }`}
                    >
                      Fat Loss
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoal("maintain")}
                      className={`py-2 rounded-lg text-xs font-body border transition-colors ${
                        goal === "maintain" ? "bg-[#142D35] text-white border-[#F21B35]" : "bg-[#0A1A1F] text-[#B7C4C8] border-[#1E3840]"
                      }`}
                    >
                      Maintain
                    </button>
                    <button
                      type="button"
                      onClick={() => setGoal("bulk")}
                      className={`py-2 rounded-lg text-xs font-body border transition-colors ${
                        goal === "bulk" ? "bg-[#142D35] text-white border-[#F21B35]" : "bg-[#0A1A1F] text-[#B7C4C8] border-[#1E3840]"
                      }`}
                    >
                      Muscle Gain
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Calculated Results (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {activeTab === "bmi" ? (
              /* BMI Results Card */
              <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
                    Your BMI Result
                  </span>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-heading text-6xl md:text-7xl font-extrabold text-white leading-[1.05]">
                      {bmiFormatted}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-heading uppercase tracking-wider font-bold border ${bmiBg} ${bmiColor}`}>
                      {bmiCategory}
                    </span>
                  </div>

                  {/* Healthy Weight Benchmark */}
                  <div className="bg-[#0A1A1F] border border-[#1E3840] rounded-xl p-4 mb-6 text-xs font-body flex justify-between">
                    <span className="text-[#B7C4C8]">Ideal Weight for your height:</span>
                    <strong className="text-white font-mono">{minHealthyWeight} kg – {maxHealthyWeight} kg</strong>
                  </div>

                  <p className="font-body text-sm text-[#E5E5E5] leading-relaxed mb-6">
                    {bmiAdvice}
                  </p>

                  <div className="border-t border-[#1E3840] pt-4 flex flex-col gap-2 text-xs font-body text-[#B7C4C8]">
                    <div className="flex justify-between py-1 border-b border-[#1E3840]/60">
                      <span>Underweight</span>
                      <span className="font-mono text-white">&lt; 18.5</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1E3840]/60 text-[#25D366]">
                      <span>Normal weight</span>
                      <span className="font-mono">18.5 – 24.9</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1E3840]/60 text-yellow-400">
                      <span>Overweight</span>
                      <span className="font-mono">25.0 – 29.9</span>
                    </div>
                    <div className="flex justify-between py-1 text-[#F21B35]">
                      <span>Obese</span>
                      <span className="font-mono">&ge; 30.0</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1E3840]">
                  <TransitionLink
                    href={`/free-trial?goal=${encodeURIComponent(bmiCategory === "Normal Weight" ? "Strength & Muscle Building" : "Weight Loss & Fat Burn")}`}
                    title="Free Trial"
                    className="w-full py-4 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#d0142b] transition-all shadow-lg active:scale-95"
                  >
                    <span>Get Custom Workout Plan on Free Pass</span>
                    <ArrowRight className="w-4 h-4" />
                  </TransitionLink>
                </div>
              </div>
            ) : (
              /* Calorie & Macro Results Card */
              <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-2 block">
                    Daily Nutrition Targets
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-heading text-6xl md:text-7xl font-extrabold text-white leading-[1.05]">
                      {targetCalories.toLocaleString("en-IN")}
                    </span>
                    <span className="text-sm font-body text-[#7B8E94]">kcal / day</span>
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-heading uppercase tracking-wider font-bold bg-[#F21B35]/20 border border-[#F21B35] text-[#F21B35] mb-6">
                    Target: {goalLabel}
                  </span>

                  {/* Energy Breakdown */}
                  <div className="grid grid-cols-2 gap-3 bg-[#0A1A1F] border border-[#1E3840] rounded-xl p-4 mb-6 text-xs font-body">
                    <div>
                      <span className="text-[#7B8E94] block">Basal Metabolic (BMR):</span>
                      <strong className="text-white font-mono text-sm">{Math.round(bmr)} kcal</strong>
                    </div>
                    <div>
                      <span className="text-[#7B8E94] block">Maintenance (TDEE):</span>
                      <strong className="text-white font-mono text-sm">{tdee} kcal</strong>
                    </div>
                  </div>

                  {/* Macro Targets */}
                  <h4 className="font-heading text-xs uppercase tracking-wider text-white font-semibold mb-3">
                    Recommended Daily Macronutrients:
                  </h4>
                  <div className="grid grid-cols-3 gap-3 text-center mb-6">
                    <div className="p-3 bg-[#0A1A1F] border border-[#1E3840] rounded-xl">
                      <span className="text-[11px] text-[#7B8E94] block uppercase font-heading">Protein</span>
                      <strong className="font-heading text-xl text-[#25D366]">{proteinGrams}g</strong>
                      <span className="text-[10px] text-[#7B8E94] block mt-0.5">~{proteinGrams * 4} kcal</span>
                    </div>
                    <div className="p-3 bg-[#0A1A1F] border border-[#1E3840] rounded-xl">
                      <span className="text-[11px] text-[#7B8E94] block uppercase font-heading">Carbs</span>
                      <strong className="font-heading text-xl text-blue-400">{carbGrams}g</strong>
                      <span className="text-[10px] text-[#7B8E94] block mt-0.5">~{carbGrams * 4} kcal</span>
                    </div>
                    <div className="p-3 bg-[#0A1A1F] border border-[#1E3840] rounded-xl">
                      <span className="text-[11px] text-[#7B8E94] block uppercase font-heading">Healthy Fats</span>
                      <strong className="font-heading text-xl text-yellow-400">{fatGrams}g</strong>
                      <span className="text-[10px] text-[#7B8E94] block mt-0.5">~{fatGrams * 9} kcal</span>
                    </div>
                  </div>

                  <p className="font-body text-xs text-[#B7C4C8] leading-relaxed">
                    Our Pro and Elite memberships include personalized quarterly meal plans tailored to Indian vegetarian, eggetarian, and non-vegetarian preferences.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1E3840]">
                  <TransitionLink
                    href={`/free-trial?goal=${encodeURIComponent(goalLabel)}`}
                    title="Free Trial"
                    className="w-full py-4 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#d0142b] transition-all shadow-lg active:scale-95"
                  >
                    <span>Claim Free Pass &amp; Coach Guidance</span>
                    <ArrowRight className="w-4 h-4" />
                  </TransitionLink>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

