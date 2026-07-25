"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  X,
  CheckCircle2,
  Phone,
  User,
  Mail,
  Heart,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Building2,
  Printer,
  Smartphone,
  Check,
  Eye
} from "lucide-react";
import { CampDataType } from "@/app/schedule/page";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  camp: CampDataType | null;
  onBookingSuccess?: (campId: string | number) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  camp,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [donorName, setDonorName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("Male");
  const [slotTime, setSlotTime] = useState("09:00 AM - 11:00 AM");
  const [healthAgreed, setHealthAgreed] = useState(true);

  // Result State
  const [bookingResult, setBookingResult] = useState<any>(null);

  if (!isOpen || !camp) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !mobile.trim()) {
      alert("Please fill in your Full Name and Mobile Number.");
      return;
    }

    if (!healthAgreed) {
      alert("Please confirm the health declaration to proceed.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          mobile,
          email,
          bloodGroup,
          age: parseInt(age) || 24,
          gender,
          slotTime,
          campId: camp.id,
          campName: camp.name,
          campLocation: camp.location,
          campDate: camp.date,
          organizer: camp.organizer,
        }),
      });

      const data = await res.json();
      if (data.success && data.data) {
        setBookingResult(data.data);
        setStep("success");
        if (onBookingSuccess) {
          onBookingSuccess(camp.id);
        }
      } else {
        alert(data.error || "Failed to complete registration.");
      }
    } catch (err) {
      console.error("Booking submission error:", err);
      alert("Something went wrong connecting to the booking service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setStep("form");
    setBookingResult(null);
    onClose();
  };

  const handlePrintPass = () => {
    window.print();
  };

  const previewUrl = bookingResult?.emailConfirmation?.previewUrl;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-red-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/10 text-white border border-white/20">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white leading-tight">
                  {step === "form" ? "Book Blood Donation Slot" : "Appointment Confirmed"}
                </h3>
                <p className="text-xs text-red-100 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Synced with eRaktKosh National Portal 🇮🇳
                </p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Camp Details Badge Header */}
          <div className="bg-slate-50 dark:bg-slate-950 p-4 px-6 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
              <Building2 className="w-4 h-4 text-red-600 shrink-0" />
              <span className="truncate max-w-xs">{camp.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-red-500" />
                {camp.date}
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {camp.location}
              </span>
            </div>
          </div>

          {/* STEP 1: FORM */}
          {step === "form" && (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Donor Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-red-600" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    Email Address (Receive Confirmation Pass)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. pratikkumawat114@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                {/* Blood Group Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-red-600" />
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer"
                  >
                    {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Age</label>
                  <input
                    type="number"
                    min={18}
                    max={65}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Time Slot Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-red-600" />
                  Select Preferred Time Slot <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "09:00 AM - 11:00 AM",
                    "11:00 AM - 01:00 PM",
                    "01:00 PM - 03:00 PM",
                    "03:00 PM - 05:00 PM",
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSlotTime(slot)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                        slotTime === slot
                          ? "bg-red-600 border-red-600 text-white shadow-md shadow-red-600/30"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Health Declaration */}
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="healthCheck"
                  checked={healthAgreed}
                  onChange={(e) => setHealthAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                />
                <label htmlFor="healthCheck" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer leading-relaxed">
                  I confirm that I am feeling well, weigh over 45 kg, have no active symptoms, and have not donated blood in the last 90 days.
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <a
                  href="https://eraktkosh.mohfw.gov.in/BLDAHIMS/bloodbank/campSchedule.cnt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View official eRaktKosh National Camp Portal
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-xl shadow-red-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Dispatching Email Pass & Syncing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Send Email Pass
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: SUCCESS PASS */}
          {step === "success" && bookingResult && (
            <div className="p-6 md:p-8 space-y-6 bg-slate-50 dark:bg-slate-950">
              {/* Clean Email Confirmation Status Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 text-xs font-bold shadow-sm">
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Email Pass Registered for <span className="underline">{bookingResult.email}</span>
                </span>

                {previewUrl ? (
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Open Live Email Pass Preview
                  </a>
                ) : (
                  <span className="font-mono text-[11px] text-blue-700 dark:text-blue-300">
                    Ref: {bookingResult.referenceId}
                  </span>
                )}
              </div>

              {/* Printable Official eRaktKosh Digital Donor Pass */}
              <div id="eraktkosh-pass" className="bg-white dark:bg-slate-900 border-2 border-red-600 rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-6">
                {/* Top Badge Stamp */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                      eRK
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-white leading-none">
                        eRaktKosh Digital Donor Pass
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium pt-0.5">
                        Ministry of Health & Family Welfare • Govt. of India 🇮🇳
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-extrabold bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    VERIFIED REF
                  </span>
                </div>

                {/* Reference Code Box */}
                <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                      eRaktKosh Booking Reference ID
                    </span>
                    <span className="text-xl font-black text-red-600 tracking-wider font-mono">
                      {bookingResult.referenceId}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-12 h-12 text-slate-800 dark:text-white" />
                  </div>
                </div>

                {/* Key Pass Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Donor Name</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{bookingResult.donorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Blood Group</span>
                    <span className="font-extrabold text-red-600 text-sm bg-red-100 dark:bg-red-950 px-2 py-0.5 rounded-md inline-block">
                      {bookingResult.bloodGroup}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Mobile Number</span>
                    <span className="font-bold text-slate-900 dark:text-white">{bookingResult.mobile}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Appointment Date</span>
                    <span className="font-bold text-slate-900 dark:text-white">{bookingResult.campDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Time Slot</span>
                    <span className="font-bold text-slate-900 dark:text-white">{bookingResult.slotTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block mb-0.5">Registered Email</span>
                    <span className="font-bold text-slate-900 dark:text-white truncate block">{bookingResult.email}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>Show this Digital Pass or Email at the registration desk upon arrival.</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Status: Active</span>
                </div>
              </div>

              {/* Action Options */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={handlePrintPass}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-900 dark:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save Pass
                </button>

                <a
                  href={bookingResult.eraktkoshPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on eRaktKosh Portal
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Done
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookAppointmentModal;
