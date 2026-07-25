"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const journeySteps = [
  {
    id: 1,
    headline: "Q: Why should I donate?",
    text: "One donation can save up to three lives. It’s the only medicine that cannot be manufactured. In just 15 minutes, you become a hero for someone fighting cancer or trauma.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    alt: "Diverse group of smiling students",
  },
  {
    id: 2,
    headline: "Q: Am I eligible to donate?",
    text: "If you are 18+, weigh 50kg+, and feel well, you are likely eligible! We provide a free mini-physical checkup on-site. Got a tattoo? Ask our AI assistant about wait times.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    alt: "Medical checkup or thumbs up gesture",
  },
  {
    id: 3,
    headline: "Q: Where does my blood go?",
    text: "It goes on a journey! We separate it into red cells and plasma. Use our Live Tracker to see exactly when your blood reaches a specific hospital.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800",
    alt: "Stylized map or route graphic",
  },
  {
    id: 4,
    headline: "Zero Wastage. Total Transparency.",
    text: "We believe you deserve to know where your donation goes. Our Live Tracker creates a transparent digital journey for your blood, proving it is tested, safe, and stored efficiently. By monitoring real-time inventory, we ensure your donation is prioritized and never wasted.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
    alt: "Inventory dashboard or safe storage",
  },
  {
    id: 5,
    headline: "The Ultimate Reward.",
    text: "It’s not just a donation; it’s a connection. See exactly which hospital receives your gift—whether it's the City General or the Children's Ward. The journey ends with the ultimate reward: a notification confirming 'Your blood was used to save a life today.'",
    image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=800",
    alt: "Smartphone notification bubble",
  },
];

const DonorJourney = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-24 lg:gap-32">
          {journeySteps.map((step, index) => {
            const isEven = (index + 1) % 2 === 0;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-600 text-white font-bold text-lg mb-2 shadow-lg shadow-red-200 dark:shadow-none">
                    {step.id}
                  </div>
                  <h2 className="text-3xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                    {step.headline}
                  </h2>
                  <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {step.text}
                  </p>
                  {step.id === 2 && (
                    <div className="pt-4">
                      <button className="px-8 py-4 bg-white dark:bg-slate-800 border-2 border-red-600 text-red-600 font-bold rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-all active:scale-95">
                        Ask our AI Assistant
                      </button>
                    </div>
                  )}
                </div>

                {/* Image Content */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-red-600 to-red-400 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DonorJourney;
