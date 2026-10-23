"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronRight, X } from "lucide-react";
import { ACTIVE_SHORTAGE_ALERTS } from "@/lib/shortage-alerts";

export default function MovingShortageTicker() {
  const [dismissed, setDismissed] = useState(false);

  // If hospitals haven't posted any shortage, don't show the bar at all
  if (dismissed || !ACTIVE_SHORTAGE_ALERTS || ACTIVE_SHORTAGE_ALERTS.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-full bg-red-600 text-white z-40 border-b border-red-700 shadow-md overflow-hidden">
      <div className="flex items-center h-11 w-full overflow-hidden relative">
        {/* Left SOS Label */}
        <div className="flex-shrink-0 z-20 bg-red-700/95 px-4 h-full flex items-center gap-2 font-black text-xs uppercase tracking-wider shadow-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-90"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="hidden sm:inline">HOSPITAL SHORTAGE ALERT</span>
          <span className="sm:hidden">SOS ALERT</span>
        </div>

        {/* Moving Marquee Headline Track */}
        <div className="relative flex-1 overflow-hidden flex items-center h-full">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-12 text-sm font-semibold hover:[animation-play-state:paused]">
            {/* Repeated twice to ensure continuous smooth infinite scrolling loop */}
            {[...ACTIVE_SHORTAGE_ALERTS, ...ACTIVE_SHORTAGE_ALERTS].map((alert, index) => (
              <Link
                key={`${alert.id}-${index}`}
                href={`/schedule?bloodGroup=${encodeURIComponent(alert.bloodGroup)}&hospital=${encodeURIComponent(alert.hospitalName)}`}
                className="inline-flex items-center gap-3 group hover:underline cursor-pointer"
                title="Click to directly schedule emergency donation"
              >
                <span className="bg-white text-red-600 text-xs font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  {alert.bloodGroup} INSUFFICIENT
                </span>

                <span className="text-white font-medium text-xs sm:text-sm">
                  {alert.message}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold bg-black/25 px-2.5 py-0.5 rounded-full text-red-100 group-hover:bg-white group-hover:text-red-600 transition-colors">
                  Directly Book Appointment <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 z-20 px-3 h-full flex items-center justify-center text-red-200 hover:text-white hover:bg-red-700/50 transition-colors"
          title="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
