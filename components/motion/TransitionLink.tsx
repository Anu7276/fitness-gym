"use client";

import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { usePageTransition } from "./PageTransitionProvider";

export interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  (
    {
      href,
      title,
      children,
      className,
      onClick,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const router = useRouter();
    const { navigateTo, isTransitioning } = usePageTransition();

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Prefetch destination route
      if (href.startsWith("/")) {
        router.prefetch(href);
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // If it's an internal route starting with '/', intercept with page transition
      if (href.startsWith("/") && !href.startsWith("/#") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        if (!isTransitioning) {
          navigateTo(href, title);
        }
      }
      if (onClick) onClick(e);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
);

TransitionLink.displayName = "TransitionLink";
