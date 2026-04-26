"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Users, Heart, Hospital } from 'lucide-react';

interface CounterProps {
  value: number;
}

const Counter = ({ value }: CounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
    </span>
  );
};

const stats = [
  {
    label: 'Lives Impacted',
    value: 1240,
    icon: Heart,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    label: 'Active Donors',
    value: 450,
    icon: Users,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    label: 'Hospitals Served',
    value: 12,
    icon: Hospital,
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
];

const LiveImpact = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-950 relative overflow-hidden border-y border-slate-100 dark:border-slate-800/50">
      {/* Subtle Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group flex items-center gap-6 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-xl transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-20 h-20 rounded-full ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                  <Icon className={`w-10 h-10 ${stat.iconColor}`} />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                    <Counter value={stat.value} />
                  </span>
                  <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LiveImpact;
