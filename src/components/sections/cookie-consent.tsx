"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

/**
 * CookieConsent Component
 * 
 * A pixel-perfect clone of the Life Link sticky cookie consent banner.
 * Features:
 * - Sticky bottom positioning
 * - Light theme consistent with the high-level design
 * - "Accept all Cookies" primary action
 * - "Manage Preferences" secondary link
 * - Close button with SVG asset
 * - Responsive text layout
 */
const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the banner after a short delay for better UX (typical for consent managers)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user already dismissed it
      const dismissed = localStorage.getItem("cookie-consent-dismissed");
      if (!dismissed) {
        setIsVisible(true);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-consent-dismissed", "true");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 w-full z-[9999] bg-white border-t border-[#e5e5e5] shadow-[0_-2px_10px_rgba(0,0,0,0.05)] px-4 py-4 md:py-6"
      role="dialog"
      aria-labelledby="cookie-consent-title"
    >
      <div className="max-w-[1200px] mx-auto relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute -top-2 right-0 md:top-0 md:-right-4 p-2 hover:opacity-70 transition-opacity"
          aria-label="Close cookie consent"
        >
          <img 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/97b90385-8109-40fe-958d-b72a3833b6a8-redcrossblood-org/assets/images/ot_close-12.svg" 
            alt="Close" 
            className="w-3 h-3 md:w-4 md:h-4"
          />
        </button>

        {/* Text Content */}
        <div className="flex-1 text-left">
          <p className="text-[13px] md:text-[14px] leading-[1.6] text-[#333333] font-sans">
            Life Link uses cookies and other online technologies to enhance and personalize your browsing experience. 
            Click &lsquo;Accept all Cookies&rsquo; to agree to our use of cookies or click &lsquo;Manage Preferences&rsquo; to view our Preference Center 
            and choose which cookies we may use. For more information, please see our{" "}
            <a 
              href="https://www.lifelink.org/privacy-policy.html" 
              className="text-[#007da5] underline hover:no-underline font-semibold"
            >
              Privacy Policy.
            </a>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-3 min-w-fit">
          <button
            onClick={handleAccept}
            className="bg-[#ed1b2e] hover:bg-[#c41222] text-white text-[14px] md:text-[15px] font-bold py-[10px] px-8 rounded-[4px] transition-colors whitespace-nowrap"
          >
            Accept all Cookies
          </button>
          <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                // Logic for preference center would go here
            }}
            className="text-[#007da5] text-[13px] md:text-[14px] font-semibold underline hover:no-underline transition-all"
          >
            Manage Preferences
          </a>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;