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
    goal: "Strength & Muscle Building",
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

    // Indian phone number validation (10 digits)
    const cleanedPhone = formData.phone.replace(/[\s\-\(\)]/g, "");
    const indianPhoneRegex = /^(?:\+91|91)?[6789]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
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
      const text = `Hi ${siteConfig.brand.name}! I would like to claim a 1-Day Trial Pass.\n\nName: ${formData.name}\nPhone: ${cleanedPhone}\nGoal: ${formData.goal}\nPreferred Program: ${formData.program}\nPreferred Time: ${formData.timeSlot}`;
      const waUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-full bg-[#F21B35]/20 border border-[#F21B35] flex items-center justify-center text-[#F21B35] mb-5">
          <Check className="w-7 h-7" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-white mb-2">
          Pass Request Received
        </h3>
        <p className="font-body text-[14px] text-[#B7C4C8] max-w-sm leading-relaxed mb-6">
          Thank you, <strong className="text-white">{formData.name}</strong>. We are opening WhatsApp
          now to confirm your visit time at our Waghodia gym.
        </p>
        <div className="text-xs font-body text-[#B7C4C8]/80">
          Location: {siteConfig.brand.badge}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-9 flex flex-col gap-5 shadow-2xl"
    >
      {/* Honeypot field (hidden) */}
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

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-heading text-xs font-semibold uppercase tracking-wider text-[#B7C4C8]">
            Complimentary access
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white">
          Claim your 1-day pass
        </h3>
        <p className="font-body text-xs text-[#B7C4C8] mt-1">
          Full gym floor access, locker amenities, and class entry with zero commitment.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-[#F21B35]/10 border border-[#F21B35] text-xs text-[#F21B35]">
          {errorMsg}
        </div>
      )}

      {/* Name Field */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-name" className="font-heading text-xs uppercase tracking-wider text-white">
          Full Name *
        </label>
        <input
          id="lead-name"
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
        <label htmlFor="lead-phone" className="font-heading text-xs uppercase tracking-wider text-white">
          Phone Number (WhatsApp Active) *
        </label>
        <input
          id="lead-phone"
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+91 98250 12345"
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm placeholder:text-[#B7C4C8]/40 focus:border-white focus:outline-none transition-colors"
        />
      </div>

      {/* Fitness Goal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lead-goal" className="font-heading text-xs uppercase tracking-wider text-white">
            Primary Goal
          </label>
          <select
            id="lead-goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-xs focus:border-white focus:outline-none transition-colors"
          >
            <option value="Strength & Muscle Building">Strength & Muscle</option>
            <option value="Cardio Fitness & Fat Loss">Cardio & Fat Loss</option>
            <option value="Functional Rig & Agility">CrossFit & Agility</option>
            <option value="Mobility & Yoga">Mobility & Yoga</option>
            <option value="Boxing & MMA Striking">Boxing & MMA</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lead-time" className="font-heading text-xs uppercase tracking-wider text-white">
            Visiting Time
          </label>
          <select
            id="lead-time"
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full px-3 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-xs focus:border-white focus:outline-none transition-colors"
          >
            <option value="Morning (6 AM - 10 AM)">Morning (6 AM - 10 AM)</option>
            <option value="Midday (11 AM - 4 PM)">Midday (11 AM - 4 PM)</option>
            <option value="Evening (4 PM - 9 PM)">Evening (4 PM - 9 PM)</option>
            <option value="Night (9 PM - Midnight)">Night (9 PM - Midnight)</option>
          </select>
        </div>
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
            <span>Submitting pass...</span>
          </>
        ) : (
          <>
            <span>Claim pass on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <span className="text-center font-body text-[11px] text-[#B7C4C8]/60">
        By submitting, you agree to receive visit details via WhatsApp. Zero spam.
      </span>
    </form>
  );
}
