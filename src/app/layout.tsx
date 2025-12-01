// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "HIPE INTEL COM",
  description: "Secure Community for Cybersecurity & Intelligence Enthusiasts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body>
          <Navbar />
          <main className="px-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}