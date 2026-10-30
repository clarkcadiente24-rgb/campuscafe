import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuroraBackground from "@/components/AuroraBackground";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { project } from "@/data/project";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${project.name} — IS Project Portfolio`,
  description:
    "Project portfolio for CampusCafe, an online pre-ordering and pickup system for university cafeterias, including the schedule, WBS, Gantt chart, analytics dashboard, developer profile, customer prototype, and staff order board.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-[#05060f]">
        <AuroraBackground />
        <SiteHeader />
        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
