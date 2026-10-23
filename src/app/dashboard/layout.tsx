"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { UserNav } from "@/components/user-nav";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MovingShortageTicker from "@/components/sections/moving-shortage-ticker";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen w-full min-w-0 overflow-x-hidden">
          <MovingShortageTicker />
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-white sticky top-0 z-10 w-full">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1" />
              <div className="h-5 w-px bg-slate-200 hidden sm:block" />
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
                Donor Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search features..."
                  className="pl-9 h-9 rounded-full bg-slate-100/80 border-none text-xs focus-visible:ring-1 focus-visible:ring-red-600/30"
                />
              </div>

              <Button variant="ghost" size="icon" className="rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                <Bell className="h-4 w-4" />
              </Button>

              <UserNav user={session.user} />
            </div>
          </header>
          <main className="flex-1 w-full p-4 overflow-x-hidden">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
