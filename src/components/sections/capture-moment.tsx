"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Sparkles, Heart, Award, Share2, CheckCircle2, Download, Image as ImageIcon } from "lucide-react";
import CameraModal from "@/components/ui/camera-modal";

const sampleMoments = [
  {
    id: 1,
    name: "Ananya Sharma",
    location: "Mumbai Donor Center",
    badge: "BLOOD DONOR HERO",
    donationsCount: "5th Donation",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
    quote: "Giving blood today at LifeLink! Super easy, fast, and feels amazing to know a life is saved.",
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    name: "Rahul Verma",
    location: "Delhi City Camp",
    badge: "LIFE SAVER CHAMPION",
    donationsCount: "12th Donation",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600",
    quote: "Tracked my blood donation all the way to City General Hospital. 100% transparent!",
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    name: "Priya Nair",
    location: "Bangalore Tech Park",
    badge: "DONOR LEGEND 2026",
    donationsCount: "8th Donation",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    quote: "First time donor here! The team was super gentle and the live tracking app is incredible.",
    timeAgo: "Yesterday",
  },
];

export default function CaptureMomentSection() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userSavedPhotos, setUserSavedPhotos] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const handlePhotoSaved = (photoUrl: string) => {
    setUserSavedPhotos((prev) => [photoUrl, ...prev]);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-red-500" />
            Share The Inspiration
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Capture The <span className="text-red-500">Moment</span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
            Take a selfie during or after your donation, add custom LifeLink hero badges, and inspire others to save lives!
          </p>

          {/* CTA Camera Trigger Button */}
          <div className="pt-4 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCameraOpen(true)}
              className="relative inline-flex items-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-lg shadow-2xl shadow-red-600/30 group transition-all"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <Camera className="w-6 h-6" />
              Open Camera & Capture Moment
            </motion.button>
          </div>
        </div>

        {/* User Saved Photos Row (If user captured photos in this session) */}
        {userSavedPhotos.length > 0 && (
          <div className="mb-16 bg-slate-950/60 border border-red-500/30 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Your Captured Donor Moments</h3>
                <p className="text-xs text-slate-400">Captured in this session with LifeLink Hero Badges</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userSavedPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl"
                >
                  <img
                    src={photo}
                    alt={`User moment ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                    <span className="text-xs font-bold text-white bg-red-600 px-3 py-1 rounded-lg shadow-md">
                      Verified Hero
                    </span>
                    <a
                      href={photo}
                      download={`lifelink-moment-${idx + 1}.jpg`}
                      className="p-2 rounded-xl bg-slate-900/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                      title="Download Photo"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Community Hero Moments Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleMoments.map((moment) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: moment.id * 0.1 }}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo Container with Badge */}
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={moment.image}
                  alt={moment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Badge Overlay Pill */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white shadow-lg shadow-red-600/40 uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5" />
                    {moment.badge}
                  </span>
                </div>

                {/* Time Ago Tag */}
                <div className="absolute bottom-4 right-4 text-xs font-semibold text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
                  {moment.timeAgo}
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-slate-300 text-sm font-medium italic leading-relaxed">
                  "{moment.quote}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                  <img
                    src={moment.avatar}
                    alt={moment.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-red-500"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm leading-tight">{moment.name}</h4>
                    <p className="text-xs text-slate-400">{moment.location} • {moment.donationsCount}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Camera Modal Popup */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onSavePhoto={handlePhotoSaved}
      />

      {/* Toast Notification when Photo Saved */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-400"
        >
          <Heart className="w-5 h-5 fill-current animate-bounce" />
          <div>
            <h5 className="font-bold text-sm">Moment Saved!</h5>
            <p className="text-xs text-red-100">Your hero photo has been saved to your session gallery.</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
