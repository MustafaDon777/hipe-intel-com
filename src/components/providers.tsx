// src/components/providers.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ClerkProvider
      dynamic
      appearance={{
        baseTheme: undefined,
      }}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
        storageKey="hipe-theme"
      >
        {mounted ? children : <div className="min-h-screen bg-gray-950" />}
      </ThemeProvider>
    </ClerkProvider>
  );
}