"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { usePathname } from "next/navigation";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/create" ||  pathname.startsWith("/auth/");

  return (
    <div className="max-w-[1440px] mx-auto">
      <Provider store={store}>
        <Toaster />
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Footer />}
      </Provider>
    </div>
  );
}
