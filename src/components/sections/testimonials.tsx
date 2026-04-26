"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "This is a beautifully designed app with simple controls, fluid responsiveness, and low-user memory load.",
    author: "Reid C.",
  },
  {
    text: "The app is informative, helpful, and easy to use! The Rapid Pass also helps speed up the process.",
    author: "Kristil W.",
  },
  {
    text: "I love this app. So far this app has been wonderful.",
    author: "Leischen",
  },
  {
    text: "Excellent app design. Easy to schedule appointments and make changes if necessary.",
    author: "LAJJP",
  },
  {
    text: "Great for scheduling. Great for Rapid Pass. Enjoy seeing where the blood goes.",
    author: "HTL ROCK",
  },
  {
    text: "The fact I can see where my donations have gone and data collected about my blood pressure is satisfying.",
    author: "teehee214",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  // Responsive adjustments for visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else if (window.innerWidth < 1280) setVisibleCount(3);
      else setVisibleCount(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= testimonials.length ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  // Display subset based on carousel logic
  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-[15px] max-w-[1200px]">
        <h2 className="text-[32px] font-bold text-[#333333] text-center mb-[40px] font-sans">
          What Real App Users Are Saying
        </h2>

        <div className="relative flex items-center group">
          {/* Navigation Left */}
          <button
            onClick={prevSlide}
            className="absolute left-[-10px] z-10 p-2 text-[#666666] hover:text-[#ed1b2e] transition-colors bg-white rounded-full shadow-sm sm:static sm:mr-4"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>

          {/* Testimonial Cards Container */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] overflow-hidden">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <div
                key={`${currentIndex}-${idx}`}
                className="bg-[#707070] aspect-square flex flex-col items-center justify-center p-[25px] text-center animate-in fade-in duration-500"
              >
                <p className="text-white text-[18px] leading-[1.6] font-serif italic mb-[20px] font-testimonial">
                  "{testimonial.text}"
                </p>
                <span className="text-white text-[14px] font-sans opacity-90 uppercase tracking-wide">
                  - {testimonial.author}
                </span>
              </div>
            ))}
          </div>

          {/* Navigation Right */}
          <button
            onClick={nextSlide}
            className="absolute right-[-10px] z-10 p-2 text-[#666666] hover:text-[#ed1b2e] transition-colors bg-white rounded-full shadow-sm sm:static sm:ml-4"
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .font-testimonial {
          font-family: Georgia, serif;
          font-style: italic;
        }
      `}</style>
    </section>
  );
}