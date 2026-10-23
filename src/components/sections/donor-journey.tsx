"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
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
  Search,
  Sparkles
} from "lucide-react";

interface Checkpoint {
  id: number;
  label: string;
  location: string;
  icon: React.ElementType;
  passedMessage: string;
  waitingMessage: string;
  activeMessage: string;
  timestamp: string;
  details: string;
  proofBadge: string;
}

const CHECKPOINTS: Checkpoint[] = [
  {
    id: 1,
    label: "Donation Collected",
    location: "LifeLink Drive • Connaught Place",
    icon: HeartHandshake,
    passedMessage: "Bag collected, barcoded (#LL-9402-A+), sealed in sterile pack.",
    activeMessage: "Currently being packaged into cold-chain donor container.",
    waitingMessage: "Awaiting donor check-in at collection counter.",
    timestamp: "Oct 24, 09:15 AM",
    details: "350ml whole blood drawn under standard aseptic protocol. Barcode LL-9402 registered on national grid.",
    proofBadge: "Sterile Pack Verified"
  },
  {
    id: 2,
    label: "Testing & Pathology Lab",
    location: "Central Diagnostics Hub • Okhla Lab",
    icon: FlaskConical,
    passedMessage: "All 5 safety tests passed (HIV, Hep B/C, Syphilis, Malaria). 100% Safe.",
    activeMessage: "Centrifuge separation & 5-tier serology screening in progress.",
    waitingMessage: "Bag is in transit to central diagnostic lab.",
    timestamp: "Oct 24, 01:30 PM",
    details: "Blood separated into Red Blood Cells, Plasma, and Platelets. Zero pathogen detection confirmed.",
    proofBadge: "5/5 Tests Cleared"
  },
  {
    id: 3,
    label: "Cold-Chain Blood Bank",
    location: "LifeLink Regional Hub • Vault #4",
    icon: Building2,
    passedMessage: "Stored in digital temperature-controlled cryo-vault at exactly 3.8°C.",
    activeMessage: "Barcode scanned into regional reserve inventory.",
    waitingMessage: "Waiting for lab clearance to enter temperature vault.",
    timestamp: "Oct 24, 05:45 PM",
    details: "Monitored 24/7 with digital IoT temperature sensors. Ready for immediate hospital allocation.",
    proofBadge: "3.8°C Certified"
  },
  {
    id: 4,
    label: "Emergency Dispatch",
    location: "Refrigerated Transit Van #DL-14-B",
    icon: Truck,
    passedMessage: "Delivered to emergency bay at AIIMS Trauma Center. Received by duty staff.",
    activeMessage: "En route via green corridor with real-time GPS telemetry.",
    waitingMessage: "Waiting for hospital urgent requisition match.",
    timestamp: "Oct 24, 08:10 PM",
    details: "Urgent call received from Trauma Ward for emergency abdominal surgery. Blue light corridor active.",
    proofBadge: "GPS Route Verified"
  },
  {
    id: 5,
    label: "Life Saved (Transfusion)",
    location: "AIIMS Trauma ICU • Bed #12",
    icon: HeartHandshake,
    passedMessage: "Transfused successfully to save an emergency trauma patient. Mission complete!",
    activeMessage: "Cross-matching with patient blood sample at bedside.",
    waitingMessage: "Waiting for surgical unit pre-transfusion verification.",
    timestamp: "Oct 24, 09:40 PM",
    details: "Transfusion completed without complications. 1 donation touched and preserved a living human being.",
    proofBadge: "Life Saved Verified"
  }
];

export default function DonorJourney() {
  // Current active checkpoint index: 0 = Step 1 active, 3 = Step 4 active, 4 = Step 5 passed
  const [currentStep, setCurrentStep] = useState<number>(3); // default showing in-transit
  const [searchUnitId] = useState("LL-9402-A+");

  const totalSteps = CHECKPOINTS.length;

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-red-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(#ef4444 1px, transparent 1px)", backgroundSize: "36px 36px" }} 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            Live Checkpoint Verification
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            The Real-Time <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Blood Journey</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl font-medium">
            Zero guessing. Each checkpoint only unlocks when the physical blood bag barcode is scanned and verified on the ground.
          </p>

          {/* Interactive Unit Status Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-sm">
              <Search className="w-4 h-4 text-slate-400" />
              <span className="text-slate-400">Tracking Unit:</span>
              <span className="font-mono font-bold text-red-400">{searchUnitId}</span>
            </div>

            {/* Stage simulation controls */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-slate-800">
              <span className="text-xs text-slate-400 px-2 font-medium">Simulate Stage:</span>
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setCurrentStep(s - 1)}
                  className={`w-7 h-7 rounded-xl text-xs font-bold transition-all ${
                    currentStep === s - 1
                      ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  title={`Simulate Step ${s}`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => setCurrentStep(4)}
                className="px-2 py-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/30 rounded-lg transition-colors flex items-center gap-1"
                title="Mark fully saved"
              >
                <Sparkles className="w-3 h-3" /> Full
              </button>
            </div>
          </div>
        </div>

        {/* ==================== INTERACTIVE TIMELINE TRACKER ==================== */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative">
            
            {/* Top Bar with Current Live Status Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Bag Status</div>
                  <div className="text-xl font-bold text-white flex items-center gap-2">
                    {currentStep === 4 ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Transfusion Complete • Life Saved
                      </span>
                    ) : (
                      <>
                        <span className="text-red-400">Step {currentStep + 1} of 5:</span> {CHECKPOINTS[currentStep].label}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-slate-300">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>{CHECKPOINTS[currentStep].location}</span>
              </div>
            </div>

            {/* Checkpoints Step Track */}
            <div className="relative">
              {/* Connecting Track Line */}
              <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-1 bg-slate-800 -z-0">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-emerald-500"
                  initial={false}
                  animate={{ 
                    width: `${(currentStep / (totalSteps - 1)) * 100}%` 
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>

              {/* 5 Checkpoints Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
                {CHECKPOINTS.map((checkpoint, index) => {
                  const Icon = checkpoint.icon;
                  const isPassed = index < currentStep;
                  const isActive = index === currentStep;
                  const isWaiting = index > currentStep;

                  return (
                    <div 
                      key={checkpoint.id} 
                      className={`flex flex-col transition-all cursor-pointer group`}
                      onClick={() => setCurrentStep(index)}
                    >
                      {/* Checkpoint Node Bubble */}
                      <div className="flex items-center lg:justify-center mb-4">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.15 : 1,
                          }}
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold transition-all relative ${
                            isPassed
                              ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                              : isActive
                              ? "bg-red-600 text-white shadow-xl shadow-red-600/40 ring-4 ring-red-500/30"
                              : "bg-slate-800 text-slate-500 border border-slate-700/60"
                          }`}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-7 h-7 text-white" />
                          ) : isActive ? (
                            <Icon className="w-7 h-7 text-white animate-pulse" />
                          ) : (
                            <Clock className="w-6 h-6 text-slate-500" />
                          )}

                          {/* Ping ring if actively processing */}
                          {isActive && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-400 rounded-full animate-ping" />
                          )}
                        </motion.div>
                      </div>

                      {/* Title & Stage Name */}
                      <div className="lg:text-center space-y-1">
                        <div className="flex items-center lg:justify-center gap-1.5">
                          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                            Stage 0{checkpoint.id}
                          </span>
                          {isPassed && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                              Passed
                            </span>
                          )}
                          {isActive && (
                            <span className="text-[10px] font-bold text-red-300 bg-red-950/60 border border-red-700/50 px-1.5 py-0.5 rounded animate-pulse">
                              Active
                            </span>
                          )}
                        </div>

                        <h4 className={`text-base font-bold ${isActive ? "text-white" : isPassed ? "text-slate-200" : "text-slate-500"}`}>
                          {checkpoint.label}
                        </h4>

                        <p className="text-xs text-slate-400 flex items-center lg:justify-center gap-1">
                          <MapPin className="w-3 h-3 text-red-400 flex-shrink-0" />
                          <span className="truncate">{checkpoint.location.split("•")[0]}</span>
                        </p>
                      </div>

                      {/* Dynamic 1-Line Message Below Each Checkpoint */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80">
                        <div
                          className={`text-xs leading-relaxed rounded-xl p-2.5 transition-all ${
                            isPassed
                              ? "bg-emerald-950/30 text-emerald-300 border border-emerald-800/40 font-medium"
                              : isActive
                              ? "bg-red-950/40 text-red-200 border border-red-800/50 font-semibold shadow-inner"
                              : "bg-slate-950/50 text-slate-500 border border-slate-800/60"
                          }`}
                        >
                          <div className="flex items-start gap-1.5">
                            {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />}
                            {isActive && <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse flex-shrink-0 mt-0.5" />}
                            {isWaiting && <Clock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />}
                            <span>
                              {isPassed
                                ? checkpoint.passedMessage
                                : isActive
                                ? checkpoint.activeMessage
                                : checkpoint.waitingMessage}
                            </span>
                          </div>
                        </div>

                        {/* Timestamp tag if passed */}
                        {isPassed && (
                          <div className="text-[10px] text-slate-500 font-mono mt-1.5 text-right">
                            Verified at {checkpoint.timestamp.split(",")[1]}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Highlight Card for Active Checkpoint */}
            <div className="mt-10 pt-8 border-t border-slate-800/80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-slate-950/90 rounded-2xl p-5 border border-slate-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                          Checkpoint Verification Details
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800/40 px-2 py-0.5 rounded-full">
                          {CHECKPOINTS[currentStep].proofBadge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 font-medium mt-1">
                        {CHECKPOINTS[currentStep].details}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Log timestamp: {CHECKPOINTS[currentStep].timestamp} • Unit Barcode #{searchUnitId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {currentStep < 4 ? (
                      <button
                        onClick={() => setCurrentStep((prev) => Math.min(prev + 1, 4))}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-lg shadow-red-600/30"
                      >
                        Scan &amp; Advance Next Checkpoint
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStep(0)}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700"
                      >
                        <RotateCcw className="w-4 h-4" /> Reset Simulation
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* ==================== EDUCATIONAL FAQ CARDS BELOW ==================== */}
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white">Why Ground-Truth Checkpoints Matter</h3>
            <p className="text-slate-400 text-sm mt-1">
              Every drop is monitored by cold-chain telemetry and hospital bedside confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-red-500 font-black text-xl mb-2">01</div>
              <h4 className="font-bold text-white text-base mb-1">Zero Blind Spots</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traditional donation leaves you guessing. LifeLink verifies arrival at every stage with digital logging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-red-500 font-black text-xl mb-2">02</div>
              <h4 className="font-bold text-white text-base mb-1">Cold-Chain Assurance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Blood is spoiled if it exceeds 6°C. Our sensors ensure temperature integrity throughout transport.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-red-500 font-black text-xl mb-2">03</div>
              <h4 className="font-bold text-white text-base mb-1">The Transfusion Ping</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The ultimate reward: receiving an instant confirmation when your unit is successfully transfused.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
