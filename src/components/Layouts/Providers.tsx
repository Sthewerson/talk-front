"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { io, Socket } from "socket.io-client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "dayjs/locale/pt-br";

/* Socket instance - inicializado apenas no cliente */
let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket && typeof window !== "undefined") {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_BASE_URL não está definida");
      return null;
    }
    socket = io(apiUrl);
  }
  return socket;
};

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const socketInitialized = useRef(false);

  useEffect(() => {
    // Set locale to pt-br
    dayjs.locale("pt-br");

    // Inicializa socket apenas uma vez no cliente
    if (!socketInitialized.current) {
      getSocket();
      socketInitialized.current = true;
    }

    // Cleanup ao desmontar
    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
        socketInitialized.current = false;
      }
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}

      <ProgressBar height="4px" color="#493cdd" shallowRouting />

      <Toaster />
    </ThemeProvider>
  );
};
