"use client";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <HeroUIProvider>
      {" "}
      <QueryClientProvider client={queryClient}>
        {" "}
        <Toaster position="top-left" reverseOrder={false} />
        {children}
      </QueryClientProvider>
    </HeroUIProvider>
  );
}
