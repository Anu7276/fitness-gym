"use client";

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

interface TransitionContextType {
  isTransitioning: boolean;
  navigateTo: (href: string, title?: string) => void;
  activePath: string;
}

const PageTransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  navigateTo: () => {},
  activePath: "/",
});

export const usePageTransition = () => useContext(PageTransitionContext);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [destinationTitle, setDestinationTitle] = useState("");
  const [curtainStyle, setCurtainStyle] = useState<React.CSSProperties>({
    transform: "translateY(100%)",
  });
  const [textOpacity, setTextOpacity] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  const navigateTo = useCallback(
    (href: string, title?: string) => {
      // Don't transition to identical path
      if (href === pathname || isTransitioning) return;

      // Find title from config if not provided
      const resolvedTitle =
        title ||
        siteConfig.navigation.find((n) => n.href === href)?.title ||
        (href === "/free-trial" ? "Free Trial" : "FITNESSGYM");

      setDestinationTitle(resolvedTitle);
      setIsTransitioning(true);

      if (reducedMotion) {
        // Quick 200ms crossfade
        setTextOpacity(1);
        setTimeout(() => {
          router.push(href);
          window.scrollTo(0, 0);
          setTimeout(() => {
            setTextOpacity(0);
            setIsTransitioning(false);
          }, 200);
        }, 200);
        return;
      }

      // Step a: Curtain slides up from bottom to cover screen (0.6s, cubic-bezier(0.76, 0, 0.24, 1))
      setCurtainStyle({
        transform: "translateY(0%)",
        transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
      });

      // Step b: Text fades up while covered (0.4s)
      setTimeout(() => {
        setTextOpacity(1);
      }, 300);

      // Step c: router.push after covered (600ms)
      setTimeout(() => {
        router.push(href);
        window.scrollTo(0, 0);

        // Step d: Wait briefly for route render, then curtain continues upward and off-screen
        setTimeout(() => {
          setTextOpacity(0);
          setCurtainStyle({
            transform: "translateY(-100%)",
            transition: "transform 0.6s cubic-bezier(0.76, 0, 0.24, 1)",
          });

          // Step e: Reset after curtain clears
          setTimeout(() => {
            setIsTransitioning(false);
            setCurtainStyle({
              transform: "translateY(100%)",
              transition: "none",
            });

            // Focus management: focus first h1 if available
            const h1 = document.querySelector("h1");
            if (h1) {
              h1.setAttribute("tabindex", "-1");
              h1.focus({ preventScroll: true });
            }
          }, 600);
        }, 300);
      }, 600);
    },
    [pathname, isTransitioning, reducedMotion, router]
  );

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        navigateTo,
        activePath: pathname,
      }}
    >
      {children}

      {/* Full-Screen Transition Curtain */}
      <div
        className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#0F2329] pointer-events-none"
        style={curtainStyle}
        aria-hidden={!isTransitioning}
      >
        <div
          className="flex flex-col items-center justify-center text-center transition-opacity duration-300 px-6"
          style={{ opacity: textOpacity }}
        >
          {/* Logo Mark */}
          <div className="flex items-center gap-2 mb-4">
            <svg
              width="36"
              height="18"
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
            <span className="font-heading text-sm uppercase tracking-widest text-[#B7C4C8]">
              {siteConfig.brand.name}
            </span>
          </div>

          {/* Large Destination Title in Outfit */}
          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white uppercase">
            {destinationTitle}
          </h2>
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}

