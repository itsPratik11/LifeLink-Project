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
  User
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Add Link import
import Link from "next/link";

const featureCards = [
  {
    title: "Schedule New Appointment",
    description: "Choose time, location, and donation type.",
    icon: CalendarPlus,
    color: "bg-red-50 text-red-600",
    href: "/schedule",
  },
  {
    title: "Donor Card",
    description: "A digital view of their donor ID card.",
    icon: IdCard,
    color: "bg-blue-50 text-blue-600",
    href: "#",
  },
  {
    title: "Blood Journey",
    description: "A tracker to see where their donation is going.",
    icon: Truck,
    color: "bg-green-50 text-green-600",
    href: "#",
  },
  {
    title: "Donation History",
    description: "A list of past donations and health records.",
    icon: History,
    color: "bg-purple-50 text-purple-600",
    href: "#",
  },
  {
    title: "Manage Appointments",
    description: "Options to reschedule or cancel.",
    icon: CalendarRange,
    color: "bg-orange-50 text-orange-600",
    href: "#",
  },
  {
    title: "Notes",
    description: "A place to add info about medications or donations.",
    icon: FileText,
    color: "bg-yellow-50 text-yellow-600",
    href: "#",
  },
  {
    title: "About Donating",
    description: "Information on eligibility and process.",
    icon: Info,
    color: "bg-cyan-50 text-cyan-600",
    href: "#",
  },
  {
    title: "Capture the Moment",
    description: "A feature to upload or share a selfie.",
    icon: Camera,
    color: "bg-pink-50 text-pink-600",
    href: "#",
  },
  {
    title: "Contact Us",
    description: "Support contact details.",
    icon: Phone,
    color: "bg-slate-50 text-slate-600",
    href: "#",
  },
  {
    title: "Settings",
    description: "App preferences.",
    icon: Settings,
    color: "bg-gray-50 text-gray-600",
    href: "#",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1 bg-muted/30">
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
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-foreground mb-2">Welcome back, Donor!</h2>
          <p className="text-muted-foreground">Ready to make a difference today? Your contributions save lives.</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {featureCards.map((card) => (
            <Link key={card.title} href={card.href} className="block h-full">
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
            </Link>
          ))}
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
