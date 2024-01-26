"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();
export const ReactQueryProvider = ({ children }: { children: any }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
