import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Placement360 AI — From Preparation to Placement — Your Entire Journey, Personalized",
  description: "An intelligent, adaptive placement ecosystem connecting career intelligence, skill gaps, targeted learning, adaptive assessment, live GD practice, AI interview defense, ATS resume analysis, and integrated ZyncRole AI job intelligence.",
  keywords: [
    "Placement360 AI",
    "placement preparation",
    "mock interview AI",
    "group discussion practice",
    "ATS resume checker",
    "skill gap analysis",
    "campus recruitment",
    "ZyncRole AI",
  ],
  authors: [{ name: "Placement360 AI Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
