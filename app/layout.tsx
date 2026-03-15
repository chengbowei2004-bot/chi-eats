import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { RouteOverlay } from "@/components/RouteOverlay";

export const metadata: Metadata = {
  title: "DeeDao — 发现你身边的地道中国味",
  description: "Find authentic Chinese flavors near you",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="antialiased bg-white">
        <AuthProvider>
          <LanguageProvider>
            {/* Phone-width container — centered on desktop */}
            <div className="mx-auto max-w-[430px] min-h-screen bg-white relative">
              {children}
            </div>
            <RouteOverlay />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
