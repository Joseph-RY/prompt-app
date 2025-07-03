"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <Provider store={store}>
        <Toaster />
        <Header />
        {children}
        <Footer />
      </Provider>
    </div>
  );
}
