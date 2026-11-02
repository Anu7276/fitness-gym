"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "./motion/TransitionLink";
import { Menu, X, ChevronDown } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solid background after 40px
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide when scrolling down, return when scrolling up
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Magnetic cursor pull on desktop "Join now" button
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    buttonRef.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-[#0A1A1F]/95 backdrop-blur-md border-b border-[#1E3840]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <TransitionLink
            href="/"
            title="Home"
            className="flex items-center gap-2 font-heading text-xl md:text-2xl font-bold tracking-tight text-white uppercase group"
          >
            <svg
              width="32"
              height="16"
              viewBox="0 0 48 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 transition-transform group-hover:scale-105"
            >
              <rect x="2" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
              <rect x="8" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
              <rect x="12" y="10" width="24" height="4" rx="2" fill="#F21B35" />
              <rect x="36" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
              <rect x="42" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
            </svg>
            <span>{siteConfig.brand.name}</span>
          </TransitionLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 font-heading text-xs xl:text-sm tracking-wider uppercase font-semibold">
            {(siteConfig.primaryNavigation || siteConfig.navigation.slice(0, 6)).map((item) => {
              const isActive = pathname === item.href;
              return (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className={`relative py-1 transition-colors duration-200 group ${
                    isActive ? "text-white" : "text-[#B7C4C8] hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
                  )}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full ${
                      isActive ? "hidden" : ""
                    }`}
                  />
                </TransitionLink>
              );
            })}

            {/* "More" Dropdown Menu */}
            <div ref={dropdownRef} className="relative">
              {(() => {
                const moreItems = siteConfig.moreNavigation || [];
                const isAnyMoreActive = moreItems.some((item) => pathname === item.href);
                return (
                  <>
                    <button
                      onClick={() => setMoreDropdownOpen((prev) => !prev)}
                      className={`inline-flex items-center gap-1.5 py-1 tracking-wider uppercase transition-colors duration-200 ${
                        isAnyMoreActive || moreDropdownOpen
                          ? "text-white"
                          : "text-[#B7C4C8] hover:text-white"
                      }`}
                      aria-expanded={moreDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>More</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          moreDropdownOpen ? "rotate-180 text-[#F21B35]" : ""
                        }`}
                      />
                      {isAnyMoreActive && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
                      )}
                    </button>

                    {/* Dropdown Menu Popover */}
                    {moreDropdownOpen && (
                      <div className="absolute top-full right-0 mt-3 w-64 bg-[#0F2329]/95 backdrop-blur-xl border border-[#1E3840] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {moreItems.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                            <TransitionLink
                              key={item.href}
                              href={item.href}
                              title={item.title}
                              onClick={() => setMoreDropdownOpen(false)}
                              className={`flex flex-col p-3 rounded-lg transition-all ${
                                isActive
                                  ? "bg-[#1E3840] text-white"
                                  : "hover:bg-[#1E3840]/60 text-[#B7C4C8] hover:text-white"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-heading text-xs tracking-wider uppercase font-bold">
                                  {item.name}
                                </span>
                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#F21B35]" />
                                )}
                              </div>
                              {item.description && (
                                <span className="font-body text-[11px] normal-case tracking-normal text-[#7B8E94] mt-0.5">
                                  {item.description}
                                </span>
                              )}
                            </TransitionLink>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </nav>

          {/* Join Now Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <TransitionLink
              ref={buttonRef}
              href="/free-trial"
              title="Free Trial"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative hidden sm:inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-[#0A1A1F] font-heading text-xs uppercase tracking-widest font-semibold overflow-hidden group transition-transform duration-200 active:scale-95 shadow-md"
            >
              {/* Bottom slide-in fill effect */}
              <span className="absolute inset-0 w-full h-full bg-[#F21B35] transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Join now
              </span>
            </TransitionLink>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-[#0F2329] focus:outline-none focus-visible:ring-2 focus-visible:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[9995] bg-[#0A1A1F] flex flex-col justify-between p-6 sm:p-8 transition-all duration-500 lg:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "opacity-0 pointer-events-none translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-white uppercase">
            <svg
              width="28"
              height="14"
              viewBox="0 0 48 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
              <rect x="8" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
              <rect x="12" y="10" width="24" height="4" rx="2" fill="#F21B35" />
              <rect x="36" y="1" width="4" height="22" rx="1" fill="#FFFFFF" />
              <rect x="42" y="4" width="4" height="16" rx="1" fill="#FFFFFF" />
            </svg>
            <span>{siteConfig.brand.name}</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2.5 rounded-full border border-[#1E3840] text-white hover:bg-[#0F2329] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close Navigation Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Links Staggered */}
        <div className="flex flex-col gap-4 my-auto overflow-y-auto max-h-[65vh] py-4 pr-2">
          {/* Primary Links */}
          {(siteConfig.primaryNavigation || siteConfig.navigation.slice(0, 6)).map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div
                key={item.href}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 60}ms` : "0ms",
                }}
                className={`transform transition-all duration-400 ${
                  mobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <TransitionLink
                  href={item.href}
                  title={item.title}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-heading text-2xl sm:text-3xl font-medium tracking-tight uppercase flex items-center justify-between ${
                    isActive ? "text-white font-bold" : "text-[#B7C4C8]"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F21B35]" />
                  )}
                </TransitionLink>
              </div>
            );
          })}

          {/* More Subpages Section */}
          {siteConfig.moreNavigation && siteConfig.moreNavigation.length > 0 && (
            <div className="pt-4 mt-2 border-t border-[#1E3840]/60">
              <span className="text-[11px] font-heading uppercase tracking-[0.15em] text-[#F21B35] font-semibold block mb-3">
                More Features & Tools
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {siteConfig.moreNavigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <TransitionLink
                      key={item.href}
                      href={item.href}
                      title={item.title}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isActive
                          ? "bg-[#1E3840] border-[#F21B35] text-white"
                          : "bg-[#0F2329] border-[#1E3840] text-[#B7C4C8] hover:text-white"
                      }`}
                    >
                      <div className="font-heading text-xs uppercase tracking-wider font-bold">
                        {item.name}
                      </div>
                      <div className="font-body text-[10px] text-[#7B8E94] truncate mt-0.5">
                        {item.title}
                      </div>
                    </TransitionLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="pt-6 border-t border-[#1E3840] flex flex-col gap-4">
          <TransitionLink
            href="/free-trial"
            title="Free Trial"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-4 text-center rounded-full bg-white text-[#0A1A1F] font-heading text-sm uppercase tracking-widest font-semibold"
          >
            Claim 1-Day Pass
          </TransitionLink>
          <div className="text-center font-body text-xs text-[#B7C4C8]/70">
            {siteConfig.brand.badge}
          </div>
        </div>
      </div>
    </>
  );
}
