"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  FlaskConical,
  Building2,
  Truck,
  HeartHandshake,
  Radio,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  Heart,
  Droplet,
  Sparkles,
  Award,
  Share2,
  Calendar,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Checkpoint {
  id: number;
  label: string;
  station: string;
  icon: React.ElementType;
  passedMessage: string;
  activeMessage: string;
  waitingMessage: string;
  timestamp: string;
  proofBadge: string;
  logDetails: string;
}

interface DonationUnit {
  id: string;
  unitCode: string;
  donationDate: string;
  bloodGroup: string;
  volume: string;
  location: string;
  defaultActiveStep: number;
  destinationHospital: string;
  patientImpact: string;
}

const DONATION_UNITS: DonationUnit[] = [
  {
    id: "unit-1",
    unitCode: "LL-8491-O+",
    donationDate: "Dec 12, 2025",
    bloodGroup: "O-Positive",
    volume: "350 ml",
    location: "LifeLink Mobile Camp • Connaught Place",
    defaultActiveStep: 4, // 0-indexed, meaning Step 5 is passed! Life Saved!
    destinationHospital: "AIIMS Apex Trauma Center • ICU Bed #12",
    patientImpact: "Emergency surgery for severe trauma survivor"
  },
  {
    id: "unit-2",
    unitCode: "LL-9402-A+",
    donationDate: "Today • Oct 24, 2026",
    bloodGroup: "A-Positive",
    volume: "350 ml",
    location: "South Delhi Blood Center • Saket",
    defaultActiveStep: 3, // Step 4 active (Dispatch)
    destinationHospital: "Apollo Hospital • Pediatric Oncology",
    patientImpact: "Platelets allocated for 8-year-old leukemia therapy"
  },
  {
    id: "unit-3",
    unitCode: "LL-9980-B+",
    donationDate: "Yesterday • Oct 23, 2026",
    bloodGroup: "B-Positive",
    volume: "350 ml",
    location: "Noida Tech Park Drive",
    defaultActiveStep: 1, // Step 2 active (Lab Testing)
    destinationHospital: "Max Super Speciality • Cardiac Surgery",
    patientImpact: "Scheduled coronary bypass reserve"
  }
];

const CHECKPOINTS_DATA: Checkpoint[] = [
  {
    id: 1,
    label: "Donation Collected",
    station: "Collection Bay",
    icon: HeartHandshake,
    passedMessage: "Bag collected, barcoded, sealed in sterile 22°C cold pack.",
    activeMessage: "Currently packaging blood bag into monitored donor container.",
    waitingMessage: "Awaiting donor phlebotomy completion.",
    timestamp: "10:15 AM",
    proofBadge: "Sterile Barcode Verified",
    logDetails: "Aseptic whole blood draw completed. Pre-screen hemoglobin: 14.2 g/dL. Unit barcoded on LifeLink national registry."
  },
  {
    id: 2,
    label: "Testing & Pathology Lab",
    station: "Central Diagnostics Hub",
    icon: FlaskConical,
    passedMessage: "All 5 serology tests passed (HIV, Hep B/C, Syphilis, Malaria). 100% Safe.",
    activeMessage: "Centrifuge separation & 5-tier disease screening in progress.",
    waitingMessage: "Waiting for transfer to diagnostic pathology laboratory.",
    timestamp: "02:30 PM",
    proofBadge: "5/5 Screenings Cleared",
    logDetails: "Unit separated into Red Cells, Plasma, and Platelets. Pathogen-free certification issued by Chief Pathologist."
  },
  {
    id: 3,
    label: "Cold-Chain Blood Bank",
    station: "Regional Cryo Vault #4",
    icon: Building2,
    passedMessage: "Stored in digital temperature vault at exactly 3.8°C.",
    activeMessage: "Scanning barcode into regional emergency blood bank reserve.",
    waitingMessage: "Waiting for lab clearance before entering temperature-controlled vault.",
    timestamp: "06:15 PM",
    proofBadge: "3.8°C IoT Monitored",
    logDetails: "Stored in calibrated vault. IoT sensors verify zero temperature variance for maximum cellular preservation."
  },
  {
    id: 4,
    label: "Emergency Dispatch",
    station: "Transit Van #DL-14-B",
    icon: Truck,
    passedMessage: "Delivered to emergency bay and received by hospital charge nurse.",
    activeMessage: "En route via green corridor with real-time GPS telemetry.",
    waitingMessage: "Waiting for hospital urgent requisition match.",
    timestamp: "08:45 PM",
    proofBadge: "GPS Route Verified",
    logDetails: "Urgent requisition match triggered. Blue light transit authorized. Cold-chain seal intact at handover."
  },
  {
    id: 5,
    label: "Life Saved (Transfused)",
    station: "Hospital Critical Care Ward",
    icon: Heart,
    passedMessage: "Transfusion complete! Your donation successfully saved a life today.",
    activeMessage: "Cross-matching with recipient patient sample at bedside.",
    waitingMessage: "Waiting for recipient surgical unit bedside verification.",
    timestamp: "09:30 PM",
    proofBadge: "Transfusion Certified",
    logDetails: "Cross-match verified 100% compatible. Transfusion safely administered without complications. A human life was preserved."
  }
];

export default function BloodJourneyPage() {
  const [selectedUnit, setSelectedUnit] = useState<DonationUnit>(DONATION_UNITS[0]);
  const [currentStep, setCurrentStep] = useState<number>(DONATION_UNITS[0].defaultActiveStep);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleSelectUnit = (unit: DonationUnit) => {
    setSelectedUnit(unit);
    setCurrentStep(unit.defaultActiveStep);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `I tracked my blood donation (#${selectedUnit.unitCode}) on LifeLink! It saved a life at ${selectedUnit.destinationHospital}. Check your journey on lifelink.org`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const totalSteps = CHECKPOINTS_DATA.length;
  const isLifeSaved = currentStep === 4;

  return (
    <div className="flex flex-col space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Truck className="w-6 h-6 text-red-600" />
              Blood Journey Tracker
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Verified ground-truth tracking for your blood donations
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
            <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            Live National Grid Connected
          </span>
        </div>
      </div>

      {/* Donation Unit Selector Strip */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Donation Bag</span>
            <h3 className="text-lg font-bold text-slate-900">Your Registered Donation Units</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {DONATION_UNITS.map((unit) => {
              const isSelected = selectedUnit.id === unit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                    isSelected
                      ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Droplet className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-red-500"}`} />
                  <span>{unit.unitCode}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${isSelected ? "bg-red-700 text-white" : "bg-slate-200 text-slate-600"}`}>
                    {unit.bloodGroup}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Unit Info Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Donation Date</span>
            <span className="font-bold text-slate-800">{selectedUnit.donationDate}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Volume &amp; Type</span>
            <span className="font-bold text-slate-800">{selectedUnit.volume} Whole Blood</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Collection Center</span>
            <span className="font-bold text-slate-800 truncate block">{selectedUnit.location}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Assigned Hospital</span>
            <span className="font-bold text-red-600 truncate block">{selectedUnit.destinationHospital.split("•")[0]}</span>
          </div>
        </div>
      </div>

      {/* ===================== THE INTERACTIVE CHECKPOINT TRACKER ===================== */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
        
        {/* Top Status & Sim Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Ground Verification Status
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
              {isLifeSaved ? (
                <span className="text-emerald-600 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Transfusion Complete • Life Saved!
                </span>
              ) : (
                <>
                  <span className="text-red-600">Stage 0{currentStep + 1} of 05:</span> {CHECKPOINTS_DATA[currentStep].label}
                </>
              )}
            </h2>
          </div>

          {/* Interactive Stage Scrubbers */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-bold px-2">Checkpoint:</span>
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setCurrentStep(stepNum - 1)}
                className={`w-7 h-7 rounded-xl text-xs font-bold transition-all ${
                  currentStep === stepNum - 1
                    ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
                title={`Step ${stepNum}: ${CHECKPOINTS_DATA[stepNum - 1].label}`}
              >
                {stepNum}
              </button>
            ))}
          </div>
        </div>

        {/* 5-Step Horizontal Timeline Track */}
        <div className="relative">
          {/* Horizontal Track Background */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1.5 bg-slate-100 -z-0 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-500 rounded-full"
              initial={false}
              animate={{
                width: `${(currentStep / (totalSteps - 1)) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {/* Checkpoints Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {CHECKPOINTS_DATA.map((cp, index) => {
              const Icon = cp.icon;
              const isPassed = index < currentStep;
              const isActive = index === currentStep;
              const isWaiting = index > currentStep;

              return (
                <div
                  key={cp.id}
                  onClick={() => setCurrentStep(index)}
                  className="flex flex-col cursor-pointer group"
                >
                  {/* Bubble Icon */}
                  <div className="flex items-center lg:justify-center mb-3">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                      }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all relative ${
                        isPassed
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                          : isActive
                          ? "bg-red-600 text-white shadow-xl shadow-red-600/30 ring-4 ring-red-100"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-7 h-7 text-white" />
                      ) : isActive ? (
                        <Icon className="w-7 h-7 text-white animate-pulse" />
                      ) : (
                        <Clock className="w-6 h-6 text-slate-400" />
                      )}

                      {/* Ping indicator if active */}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-400 rounded-full animate-ping" />
                      )}
                    </motion.div>
                  </div>

                  {/* Stage Titles */}
                  <div className="lg:text-center space-y-1">
                    <div className="flex items-center lg:justify-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        Stage 0{cp.id}
                      </span>
                      {isPassed && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                          Passed
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[9px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded animate-pulse">
                          Active
                        </span>
                      )}
                    </div>

                    <h4
                      className={`text-sm font-bold ${
                        isActive ? "text-slate-900" : isPassed ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {cp.label}
                    </h4>

                    <p className="text-[11px] text-slate-500 flex items-center lg:justify-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                      <span className="truncate">{cp.station}</span>
                    </p>
                  </div>

                  {/* 1-Line Status Message Under Each Checkpoint */}
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <div
                      className={`text-xs leading-relaxed rounded-xl p-2.5 transition-all ${
                        isPassed
                          ? "bg-emerald-50/70 text-emerald-900 border border-emerald-200/60 font-medium"
                          : isActive
                          ? "bg-red-50 text-red-900 border border-red-200 font-semibold shadow-inner"
                          : "bg-slate-50 text-slate-400 border border-slate-100"
                      }`}
                    >
                      <div className="flex items-start gap-1.5">
                        {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />}
                        {isActive && <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse flex-shrink-0 mt-0.5" />}
                        {isWaiting && <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />}
                        <span>
                          {isPassed
                            ? cp.passedMessage
                            : isActive
                            ? cp.activeMessage
                            : cp.waitingMessage}
                        </span>
                      </div>
                    </div>

                    {/* Timestamp if passed */}
                    {isPassed && (
                      <div className="text-[10px] text-slate-400 font-mono mt-1 text-right">
                        Logged at {cp.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspection Card for Active Step */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-50 rounded-2xl p-5 border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-red-100 text-red-600 border border-red-200">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      Ground Verification Record
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {CHECKPOINTS_DATA[currentStep].proofBadge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium mt-1">
                    {CHECKPOINTS_DATA[currentStep].logDetails}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Target Patient Case: <span className="font-bold text-slate-800">{selectedUnit.patientImpact}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                    className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-red-600/20"
                  >
                    Simulate Next Scan
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentStep(0)}
                    variant="outline"
                    className="w-full md:w-auto rounded-xl flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Flow
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ===================== LIFE SAVED CELEBRATION CERTIFICATE (STAGE 5) ===================== */}
      {isLifeSaved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Subtle watermark */}
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
            <Heart size={260} fill="currentColor" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Verified Transfusion Confirmation
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              Your Blood Saved A Life Today.
            </h2>

            <p className="text-red-100 text-base md:text-lg leading-relaxed font-medium">
              Unit <span className="font-mono font-bold text-white bg-black/20 px-2 py-0.5 rounded">#{selectedUnit.unitCode}</span> was transfused at <span className="font-bold text-white">{selectedUnit.destinationHospital}</span> to support an emergency trauma surgery. Because of your decision to donate, someone gets to go home to their family.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <span className="text-xs text-red-200 block">Recipient Ward</span>
                <span className="text-base font-bold text-white">Trauma ICU Bed #12</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <span className="text-xs text-red-200 block">Components Used</span>
                <span className="text-base font-bold text-white">Red Blood Cells &amp; Plasma</span>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <span className="text-xs text-red-200 block">Total Impact</span>
                <span className="text-base font-bold text-white">1 Critical Life Saved</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                onClick={handleShare}
                className="bg-white text-red-600 hover:bg-red-50 font-black rounded-xl px-6 flex items-center gap-2 shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                {copiedLink ? "Story Text Copied!" : "Share Life Saver Badge"}
              </Button>
              <Link href="/schedule">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold rounded-xl">
                  Book Next Milestone Donation
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Recipient Perspective Banner */}
      <div className="p-6 md:p-8 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-current" /> Hospital Medical Verification
          </div>
          <p className="text-sm md:text-base font-medium text-slate-300 italic">
            “When emergency cases arrive, doctors don’t produce blood—donors do. LifeLink’s transparency makes sure not a single drop is wasted.”
          </p>
          <p className="text-xs text-slate-400 font-bold">
            — Dr. S. Sharma, Chief of Critical Care &amp; Emergency Trauma
          </p>
        </div>

        <Link href="/schedule">
          <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl whitespace-nowrap shadow-lg shadow-red-600/30">
            Schedule Next Donation
          </Button>
        </Link>
      </div>

    </div>
  );
}
