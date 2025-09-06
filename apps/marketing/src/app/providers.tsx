"use client";

import { TRPCReactProvider } from "@v1/trpc/client";
import "@v1/ui/globals.css";

import { Toaster } from "@v1/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

import { ThemeProvider } from "next-themes";

import { Crisp } from "crisp-sdk-web";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { ReactNode } from "react";
import { useEffect } from "react";

type ProviderProps = {
  locale: string;
  children: ReactNode;
};

export function Providers({ locale, children }: ProviderProps) {
  useEffect(() => {
    Crisp.configure("b4962f86-8924-42e5-a112-dd87083d5b19");
  }, []);

  return (
    <TRPCReactProvider>
      <NuqsAdapter>
        {children}
        <Toaster />
        <Analytics />
      </NuqsAdapter>
    </TRPCReactProvider>
  );
}
