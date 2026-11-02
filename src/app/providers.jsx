"use client";

import { ThemeProvider } from "next-themes";
import { StateContextProvider } from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="light">
      <StateContextProvider>
        {children}
        <ToastContainer position="bottom-right" theme="colored" />
      </StateContextProvider>
    </ThemeProvider>
  );
}
