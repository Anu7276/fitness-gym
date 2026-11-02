"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { MapPin, Phone, Mail, Clock, Check, Loader2, Navigation } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Inquiry",
    message: "",
    company_website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          goal: `Message: ${formData.message}`,
          program: formData.subject,
          source: "Contact Page",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full pt-32 pb-24 md:pb-32 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
            <span className="font-heading text-xs uppercase tracking-widest text-[#B7C4C8]">
              Get In Touch
            </span>
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white uppercase mb-6">
            Contact Us
          </h1>
          <p className="font-body text-base md:text-xl text-[#B7C4C8] max-w-2xl leading-relaxed">
            Have questions about memberships, equipment, or training? Visit us in Vadodara, call
            our front desk, or drop us a line below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Gym Address
                  </h3>
                  <p className="font-body text-sm text-[#B7C4C8] mt-1 leading-relaxed">
                    {siteConfig.contact.address}
                  </p>
                  <p className="font-body text-xs text-[#B7C4C8]/70 mt-0.5">
                    Landmark: {siteConfig.contact.landmark}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#1E3840]">
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Phone & WhatsApp
                  </h3>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="font-body text-sm text-[#B7C4C8] mt-1 hover:text-white block"
                  >
                    {siteConfig.contact.phoneFormatted}
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xs uppercase tracking-wider text-[#25D366] hover:underline mt-1 block"
                  >
                    Open WhatsApp Chat →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#1E3840]">
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Email
                  </h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-body text-sm text-[#B7C4C8] mt-1 hover:text-white block"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6 border-t border-[#1E3840]">
                <div className="w-10 h-10 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-wider text-white font-semibold">
                    Opening Hours
                  </h3>
                  <p className="font-body text-sm text-[#B7C4C8] mt-1 leading-relaxed">
                    {siteConfig.contact.hours}
                  </p>
                  <p className="font-body text-xs text-[#B7C4C8]/70 mt-0.5">
                    Front Desk: 6:00 AM – 10:00 PM Daily
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Embed & Get Directions */}
            <div className="bg-[#0F2329] border border-[#1E3840] rounded-card overflow-hidden shadow-2xl flex flex-col">
              <div className="relative w-full h-[280px] bg-[#0A1A1F]">
                <iframe
                  title="FITNESSGYM Waghodia Road Google Map"
                  src="https://maps.google.com/maps?q=Waghodia+Road,+Near+Waghodia+Chowkdi,+Vadodara,+Gujarat+390019&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(95%)" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#0A1A1F]/90 border border-[#1E3840] text-xs font-body text-white rounded-md backdrop-blur-sm flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-[#F21B35]" />
                  <span>Waghodia Chowkdi, Vadodara</span>
                </div>
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1E3840]">
                <div>
                  <h4 className="font-heading text-base font-bold text-white uppercase leading-[1.05]">
                    On-Site Member Parking
                  </h4>
                  <p className="font-body text-xs text-[#B7C4C8] mt-1">
                    Spacious, well-lit parking for cars &amp; two-wheelers.
                  </p>
                </div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Plot+42+Waghodia+Main+Road+Near+Waghodia+Chowkdi+Vadodara+Gujarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#F21B35] text-white text-xs font-heading uppercase tracking-widest font-bold hover:bg-[#d0142b] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 shadow-lg shadow-[#F21B35]/20"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#F21B35]/20 border border-[#F21B35] flex items-center justify-center text-[#F21B35] mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-2">
                  Message Sent
                </h3>
                <p className="font-body text-sm text-[#B7C4C8] max-w-md mb-6 leading-relaxed">
                  Thank you for contacting FITNESSGYM. Our front desk team has received your message
                  and will get back to you promptly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-[#0F2329] border border-[#1E3840] rounded-card p-8 md:p-10 flex flex-col gap-6"
              >
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="company_website"
                    value={formData.company_website}
                    onChange={handleChange}
                    tabIndex={-1}
                  />
                </div>

                <div>
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-tight text-white mb-1">
                    Send Us a Message
                  </h3>
                  <p className="font-body text-sm text-[#B7C4C8]">
                    Questions regarding rates, equipment, or trainer availability? Send us a note below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs uppercase tracking-wider text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs uppercase tracking-wider text-white">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs uppercase tracking-wider text-white">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-heading text-xs uppercase tracking-wider text-white">
                      Inquiry Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Membership Rates">Membership Rates</option>
                      <option value="Personal Training Coaching">Personal Training Coaching</option>
                      <option value="Corporate / Group Rates">Corporate / Group Rates</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-heading text-xs uppercase tracking-wider text-white">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you are looking for..."
                    className="w-full px-4 py-3 rounded-lg bg-[#0A1A1F] border border-[#1E3840] text-white text-sm focus:border-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-[#F21B35] hover:text-white transition-all duration-300 shadow-xl disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
