"use client"
// Force rebuild

import * as React from "react"
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
  Droplet,
  Home,
  LayoutDashboard,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Schedule Appointment",
      url: "/schedule",
      icon: CalendarPlus,
    },
    {
      title: "Donor Card",
      url: "#",
      icon: IdCard,
    },
    {
      title: "Blood Journey",
      url: "/dashboard/journey",
      icon: Truck,
    },
    {
      title: "Donation History",
      url: "#",
      icon: History,
    },
    {
      title: "Manage Appointments",
      url: "#",
      icon: CalendarRange,
    },
  ],
  secondary: [
    {
      title: "Notes",
      url: "#",
      icon: FileText,
    },
    {
      title: "About Donating",
      url: "#",
      icon: Info,
    },
    {
      title: "Capture the Moment",
      url: "#",
      icon: Camera,
    },
    {
      title: "Contact Us",
      url: "#",
      icon: Phone,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="bg-primary flex aspect-square size-8 items-center justify-center rounded-lg text-primary-foreground">
                  <Droplet className="size-4 fill-current" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold uppercase tracking-tight">Life Link</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Donor</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="mt-4 border-t pt-4 px-2">
          {data.secondary.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={async () => {
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      window.location.href = "/";
                    },
                  },
                });
              }}
              className="cursor-pointer"
            >
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
