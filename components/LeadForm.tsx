"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Check, Loader2, ArrowRight } from "lucide-react";

interface LeadFormProps {
  source?: string;
  defaultProgram?: string;
}

export function LeadForm({ source = "Website", defaultProgram }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    goal: "Strength & Muscle Hypertrophy",
    program: defaultProgram || siteConfig.programs[0].name,
    timeSlot: "Morning (6 AM - 10 AM)",
    company_website: "", // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Indian phone number validation
    const cleanedPhone = formData.phone.replace(/[\s\-\(\)]/g, "");
    const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: cleanedPhone,
          source,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to submit request.");
      }

      setSubmitted(true);

      // Open WhatsApp with prefilled message
      const text = `Hi ${siteConfig.brand.name}! I just registered for a 1-Day VIP Pass.\n\nName: ${formData.name}\nPhone: ${cleanedPhone}\nGoal: ${formData.goal}\nPreferred Program: ${formData.program}\nPreferred Time: ${formData.timeSlot}`;
      const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-[#F21B35]/20 border border-[#F21B35] flex items-center justify-center text-[#F21B35] mb-6">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mb-3">
          VIP Pass Activated
        </h3>
        <p className="font-body text-sm text-[#B7C4C8] max-w-md leading-relaxed mb-6">
          Thank you, <strong className="text-white">{formData.name}</strong>. Your pass for{" "}
          <strong className="text-white">{formData.program}</strong> has been logged. Our concierge
          is opening WhatsApp now to confirm your facility timing.
        </p>
        <div className="text-xs font-heading uppercase tracking-widest text-[#B7C4C8]/70">
          Facility: {siteConfig.brand.badge}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 flex flex-col gap-6"
    >
      {/* Honeypot anti-spam field (hidden from view) */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="company_website"
          value={formData.company_website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-heading text-xs uppercase tracking-widest text-[#F21B35] font-semibold">
          Complimentary Access
        </span>
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white">
          Claim Your 1-Day VIP Pass
        </h3>
        <p className="font-body text-xs text-[#B7C4C8]">
          Experience full facility access, equipment induction, and class entry with zero commitment.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-[#F21B35]/10 border border-[#F21B35] text-xs text-[#F21B35]">
          {errorMsg}
        </div>
      )}

      {/* Name Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="font-heading text-xs uppercase tracking-wider text-white">
          Full Name *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Aditya Singh"
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm placeholder:text-[#B7C4C8]/40 focus:border-white focus:outline-none transition-colors"
        />
      </div>

      {/* Phone Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="font-heading text-xs uppercase tracking-wider text-white">
          Phone Number (WhatsApp Active) *
        </label>
        <input
          id="phone"
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm placeholder:text-[#B7C4C8]/40 focus:border-white focus:outline-none transition-colors"
        />
      </div>

      {/* Fitness Goal */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="goal" className="font-heading text-xs uppercase tracking-wider text-white">
          Primary Athletic Goal
        </label>
        <select
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none transition-colors"
        >
          <option value="Strength & Muscle Hypertrophy">Strength & Muscle Hypertrophy</option>
          <option value="Cardio Conditioning & Fat Loss">Cardio Conditioning & Fat Loss</option>
          <option value="Functional CrossFit & Agility">Functional CrossFit & Agility</option>
          <option value="Mobility, Flexibility & Yoga">Mobility, Flexibility & Yoga</option>
          <option value="Martial Arts & MMA Striking">Martial Arts & MMA Striking</option>
        </select>
      </div>

      {/* Preferred Program */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="program" className="font-heading text-xs uppercase tracking-wider text-white">
          Preferred Program to Test
        </label>
        <select
          id="program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none transition-colors"
        >
          {siteConfig.programs.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} ({p.category})
            </option>
          ))}
        </select>
      </div>

      {/* Preferred Time Slot */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="timeSlot" className="font-heading text-xs uppercase tracking-wider text-white">
          Preferred Visiting Hours
        </label>
        <select
          id="timeSlot"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none transition-colors"
        >
          <option value="Early Morning (4 AM - 7 AM)">Early Morning (4 AM - 7 AM)</option>
          <option value="Morning (7 AM - 11 AM)">Morning (7 AM - 11 AM)</option>
          <option value="Midday (11 AM - 4 PM)">Midday (11 AM - 4 PM)</option>
          <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
          <option value="Night Owls (8 PM - Midnight)">Night Owls (8 PM - Midnight)</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#F21B35] hover:text-white transition-all duration-300 shadow-xl active:scale-95 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Registering VIP Pass...</span>
          </>
        ) : (
          <>
            <span>Submit & Connect on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <span className="text-center font-body text-[11px] text-[#B7C4C8]/60">
        By submitting, you agree to receive facility timing updates via WhatsApp. Zero spam.
      </span>
    </form>
  );
}

