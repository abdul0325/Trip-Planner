"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export default function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  // Must use useRef — creating QueryClient directly in the component body
  // causes a new instance (and wiped cache) on every render.
  const ref = useRef<QueryClient | null>(null);
  if (!ref.current) {
    ref.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 30_000,
          refetchOnWindowFocus: true,
        },
      },
    });
  }
  return <QueryClientProvider client={ref.current}>{children}</QueryClientProvider>;
}
