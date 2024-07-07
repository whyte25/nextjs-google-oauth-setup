"use client";
import { store } from "@/redux-store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { GiDuration } from "react-icons/gi";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>

        <Toaster
          position="top-right"
          duration={3000}
          closeButton
          toastOptions={{
            unstyled: true,
            classNames: {
              closeButton:
                "!bg-transparent  ml-auto mt-2 -mr-1.5 border-white  !text-white !right-0",
              error:
                "destructive group border-red-700 bg-red-700 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md text-sm  px-0 py-4 pr-8  shadow-lg transition-all ",
              success:
                " group border-green-700 bg-green-700 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all ",
              warning:
                "text-white group border-yellow-600 bg-yellow-600 text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all",
              info: "bg-primary group   text-white  group pointer-events-auto relative flex w-full  items-center  space-x-4 overflow-hidden rounded-md   px-0 py-4 pr-8 text-sm pr-8  shadow-lg transition-all",
            },
          }}
        />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
