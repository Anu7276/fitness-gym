"use client";

import React, { useState, useMemo } from "react";
import { siteConfig, weeklySchedule, ScheduleSlot } from "@/config/site";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { Clock, MapPin, User, Flame, ArrowRight, Calendar, Sparkles } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;

export default function SchedulePage() {
  // Determine current day of week as initial default
  const todayName = useMemo(() => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()] || "Monday";
  }, []);

  const [activeDay, setActiveDay] = useState<string>(todayName);
  const [selectedPeriod, setSelectedPeriod] = useState<"All" | "Morning" | "Afternoon" | "Evening">("All");

  const filteredSlots = useMemo(() => {
    return weeklySchedule.filter((slot) => {
      const matchDay = slot.day.toLowerCase() === activeDay.toLowerCase();
      const matchPeriod = selectedPeriod === "All" || slot.period === selectedPeriod;
      return matchDay && matchPeriod;
    });
  }, [activeDay, selectedPeriod]);

  const getIntensityBadge = (intensity: ScheduleSlot["intensity"]) => {
    switch (intensity) {
      case "Peak":
        return <span className="px-2.5 py-0.5 rounded-full bg-[#F21B35]/20 border border-[#F21B35] text-[10px] font-mono uppercase text-[#F21B35] font-semibold">Peak Intensity</span>;
      case "High":
        return <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/50 text-[10px] font-mono uppercase text-orange-400 font-semibold">High Energy</span>;
      case "Medium":
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/50 text-[10px] font-mono uppercase text-blue-400 font-semibold">Medium Pace</span>;
      case "Low":
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 text-[10px] font-mono uppercase text-[#25D366] font-semibold">Recovery / Form</span>;
    }
  };

  return (
    <main className="w-full pt-28 pb-16 md:pb-28 bg-[#0A1A1F] text-white">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[12px] uppercase tracking-[0.15em] text-[#F21B35] font-semibold mb-3 block">
            Class schedule
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.05]">
            Weekly Timetable
          </h1>
          <p className="font-body text-[17px] text-[#E5E5E5] max-w-xl leading-[1.6]">
            Expert-led coaching sessions across our 6 training zones. Free weights and cardio areas remain open 24 hours every day for self-paced training.
          </p>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {DAYS.map((day) => {
            const isSelected = activeDay.toLowerCase() === day.toLowerCase();
            const isToday = todayName.toLowerCase() === day.toLowerCase();

            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-3 rounded-full text-xs font-heading uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#F21B35] text-white shadow-lg shadow-[#F21B35]/25"
                    : "bg-[#0F2329] border border-[#1E3840] text-[#B7C4C8] hover:text-white hover:border-[#7B8E94]"
                }`}
              >
                <span>{day}</span>
                {isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#F21B35]"}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Time of Day Filter */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8 pb-4 border-b border-[#1E3840]">
          <div className="flex items-center gap-2 text-xs font-body text-[#B7C4C8]">
            <Calendar className="w-4 h-4 text-[#F21B35]" />
            <span>Showing classes for <strong className="text-white">{activeDay}</strong></span>
          </div>

          <div className="flex gap-2">
            {(["All", "Morning", "Afternoon", "Evening"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-body transition-colors ${
                  selectedPeriod === period
                    ? "bg-[#142D35] text-white border border-[#2A4B56]"
                    : "bg-[#0F2329] text-[#7B8E94] hover:text-white border border-transparent"
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        {filteredSlots.length === 0 ? (
          <div className="bg-[#0F2329] border border-[#1E3840] rounded-card p-12 text-center">
            <Clock className="w-8 h-8 text-[#7B8E94] mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              No Group Classes Scheduled
            </h3>
            <p className="font-body text-xs text-[#B7C4C8] max-w-sm mx-auto">
              Open 24/7 gym floor access is available at all hours. Step in anytime for independent strength and cardio workouts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="bg-[#0F2329] border border-[#1E3840] rounded-card p-6 flex flex-col justify-between hover:border-[#F21B35]/70 transition-all duration-300 hover:-translate-y-1 group shadow-lg"
              >
                <div>
                  {/* Top Bar: Time & Intensity */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white bg-[#0A1A1F] border border-[#1E3840] px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-[#F21B35]" />
                      <span>{slot.time}</span>
                    </span>
                    {getIntensityBadge(slot.intensity)}
                  </div>

                  {/* Program Title */}
                  <h3 className="font-heading text-xl font-bold text-white mb-2 leading-[1.05] group-hover:text-[#F21B35] transition-colors">
                    {slot.program}
                  </h3>

                  {/* Coach & Room Details */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-[#1E3840] text-xs font-body text-[#B7C4C8]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#F21B35]" />
                      <span>Coach: <strong className="text-white">{slot.trainer}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#F21B35]" />
                      <span>{slot.room}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-[#1E3840] flex items-center justify-between">
                  <span className="text-[11px] font-body text-[#25D366] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Trial Pass Eligible
                  </span>
                  <TransitionLink
                    href={`/free-trial?program=${encodeURIComponent(slot.program)}`}
                    title="Free Trial"
                    className="inline-flex items-center gap-1 text-xs font-heading uppercase tracking-wider text-white hover:text-[#F21B35] font-semibold transition-colors"
                  >
                    <span>Try Class</span>
                    <ArrowRight className="w-3 h-3 text-[#F21B35]" />
                  </TransitionLink>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 24/7 Notice Banner */}
        <div className="mt-16 bg-[#0F2329]/90 border border-[#1E3840] rounded-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0A1A1F] border border-[#1E3840] flex items-center justify-center text-[#F21B35] shrink-0 font-heading font-bold text-sm">
              24/7
            </div>
            <div>
              <h4 className="font-heading text-lg font-bold text-white uppercase leading-[1.05]">
                Prefer Solo Training At Midnight or Dawn?
              </h4>
              <p className="font-body text-xs md:text-sm text-[#B7C4C8] mt-1 leading-relaxed max-w-xl">
                Our 10,000+ sq.ft gym floor, calibrated free weights, and cardio decks are open 24 hours a day, 365 days a year. Use keyless biometric fingerprint access to train anytime without waiting.
              </p>
            </div>
          </div>
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            className="w-full md:w-auto px-8 py-3.5 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-bold hover:bg-[#F21B35] hover:text-white transition-all text-center shrink-0 shadow-lg"
          >
            Claim 1-Day Pass
          </TransitionLink>
        </div>
      </div>
    </main>
  );
}

