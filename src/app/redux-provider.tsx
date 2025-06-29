"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Toaster } from "react-hot-toast";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <div>
      <Toaster />
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
