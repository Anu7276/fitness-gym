"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Check, Loader2, ArrowRight, Sparkles, Clock, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface LeadFormProps {
  source?: string;
  defaultProgram?: string;
}

export function LeadForm({ source = "Website", defaultProgram }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "Strength & Muscle Building",
    program: defaultProgram || siteConfig.programs[0].name,
    timeSlot: "Morning (6 AM - 10 AM)",
    company_website: "", // Honeypot field
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
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
      setErrorMsg("Please enter a valid 10-digit Indian mobile number (e.g. 98250 12345).");
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

      const wa = json.whatsappUrl || `https://wa.me/${siteConfig.contact.whatsappNumber}`;
      setWhatsappUrl(wa);
      setSubmitted(true);

      // Open WhatsApp automatically after a short delay
      setTimeout(() => {
        try {
          window.open(wa, "_blank");
        } catch (e) {
          // Popup blocker fallback
        }
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#0F2329] border border-[#25D366]/40 rounded-card p-8 md:p-10 text-center flex flex-col items-center shadow-2xl animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#25D366]/15 border border-[#25D366] flex items-center justify-center text-[#25D366] mb-5 shadow-lg">
          <Check className="w-8 h-8" />
        </div>
        <span className="text-[12px] uppercase tracking-[0.15em] text-[#25D366] font-semibold mb-2 block">
          Pass Confirmed
        </span>
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2 leading-[1.05]">
          Your 1-Day Pass is Ready!
        </h3>
        <p className="font-body text-sm text-[#E5E5E5] max-w-md leading-relaxed mb-6">
          Thank you, <strong className="text-white">{formData.name}</strong>. Your complimentary pass has been registered in our system. Opening WhatsApp to connect you directly with our front desk team.
        </p>

        {/* Lead Summary Card */}
        <div className="w-full bg-[#0A1A1F] border border-[#1E3840] rounded-xl p-4 text-left text-xs font-body mb-6 flex flex-col gap-2">
          <div className="flex justify-between text-[#B7C4C8] border-b border-[#1E3840] pb-2">
            <span>Pass Holder:</span>
            <strong className="text-white">{formData.name}</strong>
          </div>
          <div className="flex justify-between text-[#B7C4C8] border-b border-[#1E3840] pb-2">
            <span>Mobile:</span>
            <strong className="text-[#25D366]">{formData.phone}</strong>
          </div>
          <div className="flex justify-between text-[#B7C4C8] border-b border-[#1E3840] pb-2">
            <span>Selected Program:</span>
            <strong className="text-white">{formData.program}</strong>
          </div>
          <div className="flex justify-between text-[#B7C4C8]">
            <span>Preferred Timing:</span>
            <strong className="text-white">{formData.timeSlot}</strong>
          </div>
        </div>

        {/* WhatsApp Action Button */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl mb-4"
          >
            <WhatsAppIcon className="w-4 h-4 fill-white" />
            <span>Open WhatsApp to Confirm Visit</span>
          </a>
        )}

        <div className="flex items-center gap-2 text-xs font-body text-[#B7C4C8]/80">
          <ShieldCheck className="w-4 h-4 text-[#25D366]" />
          <span>Zero spam • Show up with clean indoor shoes &amp; government ID</span>
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
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold">
            Complimentary access
          </span>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white leading-[1.05]">
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
          placeholder="e.g. Rahul Sharma"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white placeholder-[#7B8E94] focus:outline-none focus:border-[#F21B35] transition-colors"
        />
      </div>

      {/* Phone Field (WhatsApp Active) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-phone" className="font-heading text-xs uppercase tracking-wider text-white flex justify-between">
          <span>Phone Number (WhatsApp Active) *</span>
          <span className="text-[11px] text-[#7B8E94] normal-case">10 digits</span>
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7B8E94]">
            +91
          </span>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            required
            placeholder="98250 12345"
            value={formData.phone}
            onChange={handleChange}
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white placeholder-[#7B8E94] focus:outline-none focus:border-[#F21B35] transition-colors font-mono"
          />
        </div>
      </div>

      {/* Email Field (Optional) */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-email" className="font-heading text-xs uppercase tracking-wider text-white flex justify-between">
          <span>Email Address</span>
          <span className="text-[11px] text-[#7B8E94] normal-case">Optional</span>
        </label>
        <input
          id="lead-email"
          type="email"
          name="email"
          placeholder="rahul@example.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white placeholder-[#7B8E94] focus:outline-none focus:border-[#F21B35] transition-colors"
        />
      </div>

      {/* Primary Goal Selector */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-goal" className="font-heading text-xs uppercase tracking-wider text-white">
          Primary Fitness Goal
        </label>
        <select
          id="lead-goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white focus:outline-none focus:border-[#F21B35] transition-colors cursor-pointer"
        >
          <option value="Strength & Muscle Building">Strength &amp; Muscle Building</option>
          <option value="Weight Loss & Fat Burn">Weight Loss &amp; Fat Burn</option>
          <option value="Cardio & Endurance">Cardio &amp; Athletic Endurance</option>
          <option value="Mobility & Pain Relief">Mobility &amp; Posture Restoration</option>
          <option value="Combat & Self Defense">Boxing &amp; MMA Conditioning</option>
          <option value="General Health & Wellness">General Health &amp; Daily Routine</option>
        </select>
      </div>

      {/* Preferred Program */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-program" className="font-heading text-xs uppercase tracking-wider text-white">
          Interested Program
        </label>
        <select
          id="lead-program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white focus:outline-none focus:border-[#F21B35] transition-colors cursor-pointer"
        >
          {siteConfig.programs.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name} ({p.category})
            </option>
          ))}
          <option value="General Gym Access">General Gym Floor &amp; Free Weights</option>
        </select>
      </div>

      {/* Preferred Time Slot */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="lead-time" className="font-heading text-xs uppercase tracking-wider text-white">
          Preferred Visit Timing
        </label>
        <select
          id="lead-time"
          name="timeSlot"
          value={formData.timeSlot}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-sm text-white focus:outline-none focus:border-[#F21B35] transition-colors cursor-pointer"
        >
          <option value="Early Morning (4 AM - 6:30 AM)">Early Morning (4:00 AM – 6:30 AM)</option>
          <option value="Morning (6:30 AM - 10:00 AM)">Morning (6:30 AM – 10:00 AM)</option>
          <option value="Midday (11:00 AM - 3:00 PM)">Midday Quiet Hours (11:00 AM – 3:00 PM)</option>
          <option value="Evening (5:00 PM - 8:30 PM)">Evening Peak (5:00 PM – 8:30 PM)</option>
          <option value="Night (8:30 PM - 11:30 PM)">Late Evening (8:30 PM – 11:30 PM)</option>
          <option value="Late Night / Overnight (12 AM - 4 AM)">Overnight Keyless (12:00 AM – 4:00 AM)</option>
        </select>
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-4 rounded-full bg-[#F21B35] text-white font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#d0142b] transition-all duration-300 shadow-lg shadow-[#F21B35]/25 disabled:opacity-50 active:scale-95"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Reserving your pass...</span>
          </>
        ) : (
          <>
            <span>Claim pass on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] font-body text-center text-[#B7C4C8]/70">
        By submitting, you agree to receive visit details via WhatsApp. Zero spam.
      </p>
    </form>
  );
}
