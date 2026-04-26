"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Droplets, FlaskConical, Warehouse, Truck, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

const stages = [
  { id: 'collected', label: 'Collected', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-500', desc: 'Successfully processed' },
  { id: 'testing', label: 'Testing', icon: FlaskConical, color: 'text-purple-500', bg: 'bg-purple-500', desc: 'Successfully processed' },
  { id: 'storage', label: 'Storage', icon: Warehouse, color: 'text-orange-500', bg: 'bg-orange-500', desc: 'Successfully processed' },
  { id: 'dispatched', label: 'Dispatched', icon: Truck, color: 'text-red-600', bg: 'bg-red-600', pulse: true, desc: 'In transit to City General Hospital' },
  { id: 'saved', label: 'Life Saved', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-600', desc: 'Transfusion successful. Patient recovering.' },
];

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-50 dark:bg-slate-950 py-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-500/5 skew-x-12 transform origin-top-right -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-500/5 -skew-x-12 transform origin-bottom-left -z-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-sm uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Next Gen Donation
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
              Donate.<br />
              <span className="text-red-600">Track.</span><br />
              Save.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg font-medium">
              The first platform that lets you track your blood donation like a package.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-red-500/20 group"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border-2 border-slate-200 dark:border-slate-800 hover:border-red-600 dark:hover:border-red-600 text-slate-900 dark:text-white rounded-2xl font-bold text-lg transition-all">
                Learn More
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-500">
                Joined by <span className="text-slate-900 dark:text-white">10,000+</span> young heroes this month
              </p>
            </div>
          </motion.div>

          {/* Right Visual Column - Status Timeline */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12"
          >
            <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Package className="text-red-600 w-6 h-6" />
                    Live Tracking
                  </h3>
                  <p className="text-slate-500 font-medium">Donation ID: #BLD-8829-X</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
                  ACTIVE
                </div>
              </div>

                {/* Vertical Timeline */}
                <div className="relative space-y-12">
                  {/* Connecting Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-slate-100 dark:bg-slate-800" />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute left-6 top-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 via-red-600 to-pink-600"
                  />

                  {stages.map((stage, index) => {
                    const Icon = stage.icon;
                    return (
                      <motion.div 
                        key={stage.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className="relative flex items-center gap-6"
                      >
                        <div className={`relative z-10 w-12 h-12 rounded-2xl ${stage.bg} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                          {stage.pulse && (
                            <div className="absolute inset-0 rounded-2xl bg-red-600 animate-ping opacity-25" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-slate-900 dark:text-white leading-none mb-1">
                            {stage.label}
                          </h4>
                          <p className="text-slate-500 text-sm font-medium">
                            {stage.desc}
                          </p>
                        </div>
                        {index < stages.length - 1 && (
                          <div className="text-green-500">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;