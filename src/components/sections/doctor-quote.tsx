"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, ShieldCheck, Stethoscope, HeartPulse } from "lucide-react";

export default function DoctorQuote() {
  return (
    <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
      {/* Background ambient medical glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/60 rounded-3xl p-8 md:p-14 shadow-2xl backdrop-blur-xl"
        >
          {/* Top tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" />
              Critical Care Perspective
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Hospital Partner
            </div>
          </div>

          {/* Decorative Quote Icon */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 text-slate-800/80 pointer-events-none">
            <Quote className="w-20 h-20 md:w-28 md:h-28 rotate-180 opacity-40 text-red-600/20" />
          </div>

          {/* Quote Body */}
          <blockquote className="relative z-10 mb-10">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] font-extrabold tracking-tight leading-snug md:leading-tight text-slate-100">
              “When emergency cases arrive, doctors don’t produce blood—
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-400 font-black">
                donors do
              </span>
              . LifeLink’s transparency makes sure not a single drop is wasted.”
            </p>
          </blockquote>

          {/* Doctor Info & Credibility Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-700/70">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/30">
                  DS
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Verified Practitioner">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">
                    Dr. S. Sharma
                  </h4>
                  <span className="text-[11px] font-bold text-red-400 bg-red-950/60 border border-red-800/40 px-2 py-0.5 rounded-md">
                    MD, FRCS
                  </span>
                </div>
                <p className="text-sm text-slate-400 font-medium">
                  Chief of Critical Care &amp; Emergency Trauma
                </p>
                <p className="text-xs text-slate-500">
                  AIIMS &amp; Apex Trauma Network Partner
                </p>
              </div>
            </div>

            {/* Micro metric badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-800/90 border border-slate-700/80">
              <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
                <HeartPulse className="w-5 h-5 text-red-400 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-slate-400">Avg. Trauma Response</p>
                <p className="text-sm font-bold text-white">&lt; 15 Mins Dispatch</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
