import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "ChiEats — 今天吃什么",
  description: "Dish-first Chinese food discovery for Providence, RI",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1A1A1A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="antialiased bg-[#FAFAFA]">
        <AuthProvider>
          <LanguageProvider>
            {/* Phone-width container — centered on desktop */}
            <div className="mx-auto max-w-[430px] min-h-screen bg-[#FAFAFA] relative">
              {children}
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
