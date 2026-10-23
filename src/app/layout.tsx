import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import { Toaster } from "sonner";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blood Donor App | Life Link",
  description: "Schedule blood donations quickly and easily with the Life Link Blood Donor App. Track your blood journey, earn badges, and save lives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        {/* <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="97b90385-8109-40fe-958d-b72a3833b6a8"
        /> */}
        <ErrorReporter />
        {/* <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        /> */}
        {children}
        {/* <VisualEditsMessenger /> */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
