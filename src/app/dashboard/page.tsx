"use client";

import React, { useState } from "react";
import {
  CalendarPlus,
  IdCard,
  Truck,
  History,
  CalendarRange,
  FileText,
  Info,
  Camera,
  Phone,
  Settings,
  Bell,
  Search,
  User,
  Heart
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import CameraModal from "@/components/ui/camera-modal";

const featureCards = [
  {
    id: "schedule",
    title: "Schedule New Appointment",
    description: "Choose time, location, and donation type.",
    icon: CalendarPlus,
    color: "bg-red-50 text-red-600",
    href: "/schedule",
  },
  {
    id: "donor-card",
    title: "Donor Card",
    description: "A digital view of your donor ID card.",
    icon: IdCard,
    color: "bg-blue-50 text-blue-600",
    href: "#",
  },
  {
    id: "journey",
    title: "Blood Journey",
    description: "A tracker to see where your donation is going.",
    icon: Truck,
    color: "bg-green-50 text-green-600",
    href: "#",
  },
  {
    id: "history",
    title: "Donation History",
    description: "A list of past donations and health records.",
    icon: History,
    color: "bg-purple-50 text-purple-600",
    href: "#",
  },
  {
    id: "manage",
    title: "Manage Appointments",
    description: "Options to reschedule or cancel.",
    icon: CalendarRange,
    color: "bg-orange-50 text-orange-600",
    href: "#",
  },
  {
    id: "notes",
    title: "Notes",
    description: "A place to add info about medications or donations.",
    icon: FileText,
    color: "bg-yellow-50 text-yellow-600",
    href: "#",
  },
  {
    id: "about",
    title: "About Donating",
    description: "Information on eligibility and process.",
    icon: Info,
    color: "bg-cyan-50 text-cyan-600",
    href: "#",
  },
  {
    id: "camera",
    title: "Capture the Moment",
    description: "Take or upload a photo with LifeLink hero badges.",
    icon: Camera,
    color: "bg-pink-50 text-pink-600",
    isAction: true,
  },
  {
    id: "contact",
    title: "Contact Us",
    description: "Support contact details.",
    icon: Phone,
    color: "bg-slate-50 text-slate-600",
    href: "#",
  },
  {
    id: "settings",
    title: "Settings",
    description: "App preferences.",
    icon: Settings,
    color: "bg-gray-50 text-gray-600",
    href: "#",
  },
];

export default function DashboardPage() {
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [dashboardMoments, setDashboardMoments] = useState<string[]>([]);

  const handleSavePhoto = (photoUrl: string) => {
    setDashboardMoments((prev) => [photoUrl, ...prev]);
  };

  return (
    <div className="flex flex-col flex-1 bg-muted/30 min-h-screen">
      {/* Dashboard Top Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between px-6 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="text-xl font-bold tracking-tight">Donor Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search features..."
              className="pl-8 h-9 rounded-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-muted/50">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Welcome back, Donor!</h2>
            <p className="text-muted-foreground">Ready to make a difference today? Your contributions save lives.</p>
          </div>
          <Button
            onClick={() => setIsCameraModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/20 flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Capture Donation Moment
          </Button>
        </div>

        {/* Saved Dashboard Moments Gallery (If available) */}
        {dashboardMoments.length > 0 && (
          <div className="mb-8 p-6 bg-white rounded-3xl border border-red-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              Your Session Photos
            </h3>
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {dashboardMoments.map((photo, i) => (
                <div key={i} className="relative w-36 h-36 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-md">
                  <img src={photo} alt={`Moment ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {featureCards.map((card) => {
            const cardContent = (
              <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-none bg-white h-full">
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${card.color}`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm font-medium leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );

            if (card.isAction) {
              return (
                <div key={card.id} onClick={() => setIsCameraModalOpen(true)} className="block h-full">
                  {cardContent}
                </div>
              );
            }

            return (
              <Link key={card.id} href={card.href || "#"} className="block h-full">
                {cardContent}
              </Link>
            );
          })}
        </div>

        {/* Stats / Quick Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none bg-primary text-primary-foreground overflow-hidden relative">
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <DropletIcon size={200} />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-black uppercase tracking-tighter">Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black mb-2">3 Lives</div>
              <p className="font-bold opacity-90">Saved through your last donation on Dec 12, 2025.</p>
              <Button variant="secondary" className="mt-6 font-bold uppercase tracking-tight">View Full Impact Report</Button>
            </CardContent>
          </Card>

          <Card className="border-none bg-accent text-accent-foreground overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-2xl font-black uppercase tracking-tighter">Next Eligibility</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black mb-2">Feb 06</div>
              <p className="font-bold opacity-90">You are eligible to donate Whole Blood again in 6 days!</p>
              <Button variant="secondary" className="mt-6 font-bold uppercase tracking-tight">Set Reminder</Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Camera Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onSavePhoto={handleSavePhoto}
      />
    </div>
  );
}

function DropletIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}
