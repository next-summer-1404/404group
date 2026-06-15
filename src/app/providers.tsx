"use client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { ReserveProvider } from "../context/ReserveContext";
import AxiosProvider from "./AxiosProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ReserveProvider>
        <HeroUIProvider>
          {" "}
          <QueryClientProvider client={queryClient}>
            {" "}
            <Toaster position="top-left" reverseOrder={false} />
            <AxiosProvider>{children}</AxiosProvider>
          </QueryClientProvider>
        </HeroUIProvider>
      </ReserveProvider>
    </ThemeProvider>
  );
}
