"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronRight, Droplet, User, LayoutDashboard } from 'lucide-react';
import { useSession } from '@/lib/auth-client';

/**
 * Header Component
 * * Clones the Life Link global navigation including:
 * - Utility navigation (top)
 * - Main navigation with dropdown capabilities
 * - Brand logo
 * - "Track Donation" widget (New)
 */
const Header = () => {
  const { data: session } = useSession();
  const isSignedIn = !!session;

  return (
    <header id="rcb-header" className="relative w-full z-[1000] bg-white">
      {/* Subtle top gradient shadow */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-b from-black/5 to-transparent"></div>

      {/* Utility Navigation Bar (Top) */}
      <div className="border-b border-[#e5e5e5] bg-[#f7f7f7] py-2 hidden lg:block">
        <div className="max-w-[1230px] mx-auto px-[15px] flex justify-end items-center text-[12px] font-semibold text-[#333333]">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
            </div>
            {isSignedIn && (
              <div className="flex items-center space-x-1.5 before:content-['•'] before:text-[#666] before:mr-1.5">
                <Link href="/dashboard" className="text-[#007da5] font-bold uppercase tracking-tight hover:underline">
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-[1230px] mx-auto px-[15px] flex items-stretch justify-between h-[80px]">
        {/* Logo Section */}
        <div className="flex items-center py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-[#ed1b2e] p-1.5 rounded-sm transform group-hover:scale-105 transition-transform duration-200">
              <Droplet className="w-8 h-8 text-white fill-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[24px] font-black text-[#333] tracking-tighter">LIFE LINK</span>
              <span className="text-[10px] font-bold text-[#ed1b2e] tracking-[0.2em] ml-0.5">BLOOD SERVICES</span>
            </div>
          </Link>
        </div>

        {/* Desktop Main Nav */}
        <nav className="hidden lg:flex flex-1 justify-center items-stretch">
          <ul className="flex items-stretch mx-8">
            <li className="group relative flex items-center px-6">
              <Link href="/schedule" className="text-[15px] font-bold text-[#333333] group-hover:text-[#ed1b2e] flex items-center h-full border-b-4 border-transparent group-hover:border-[#ed1b2e] transition-all">
                Donate Blood
              </Link>
              {/* Dropdown Overlay Placeholder */}
              <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white shadow-xl border-t border-[#e5e5e5] p-8 grid grid-cols-4 gap-6 opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                <div className="space-y-4">
                  <h4 className="font-bold text-[14px] text-[#333] border-b pb-2 uppercase">Manage My Donations</h4>
                  <ul className="text-[13px] space-y-2 font-semibold">
                    <li><Link href="/give.html" className="hover:text-[#ed1b2e]">Schedule an Appointment</Link></li>
                    <li><Link href="/give.html/my-account" className="hover:text-[#ed1b2e]">Manage Existing Appointment</Link></li>
                    <li><Link href="/donate-blood/rapidpass.html" className="hover:text-[#ed1b2e]">Start RapidPass®</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="group relative flex items-center px-6">
              <button className="text-[15px] font-bold text-[#333333] group-hover:text-[#ed1b2e] flex items-center h-full border-b-4 border-transparent group-hover:border-[#ed1b2e] transition-all">
                Hosting a Blood Drive
              </button>
            </li>

            <li className="group relative flex items-center px-6">
              <button className="text-[15px] font-bold text-[#333333] group-hover:text-[#ed1b2e] flex items-center h-full border-b-4 border-transparent group-hover:border-[#ed1b2e] transition-all">
                Biomedical Services
              </button>
            </li>
          </ul>
        </nav>

        {/* Right Side: Sign In + Tracking Widget */}
        <div className="hidden md:flex items-center ml-auto gap-4">

          {/* Sign In / Dashboard Button */}
          {!isSignedIn ? (
            <Link
              href="/login"
              prefetch={true}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-[#ed1b2e] hover:text-white hover:border-[#ed1b2e] px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="bg-[#ed1b2e] border border-[#ed1b2e] text-white hover:bg-[#d9192a] hover:border-[#d9192a] px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-colors shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              My Dashboard
            </Link>
          )}

          {/* TRACKING WIDGET */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden xl:block">
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Already a donor?</p>
              <p className="text-[12px] font-bold text-gray-900 leading-tight">Track your impact:</p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Donation ID (#BLD...)"
                  className="w-[180px] pl-3 pr-2 py-2 border-2 border-red-100 rounded-l-md focus:outline-none focus:border-red-600 focus:ring-0 transition-all text-sm text-gray-700 placeholder-gray-400 h-[45px]"
                />
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-bold h-[45px] px-4 rounded-r-md transition-colors flex items-center gap-2">
                <span>Track</span>
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Menu Icon (Only visible on small screens) */}
      <div className="lg:hidden absolute left-4 top-1/2 -translate-y-1/2 flex flex-col space-y-1 z-[1] cursor-pointer p-2">
        <span className="w-6 h-[2px] bg-[#333]"></span>
        <span className="w-6 h-[2px] bg-[#333]"></span>
        <span className="w-6 h-[2px] bg-[#333]"></span>
      </div>
    </header>
  );
};

export default Header;