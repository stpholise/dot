"use client";
import { Provider } from "react-redux";
import { store } from "./store";

import { useEffect } from "react";
import { WebVitals } from "./_components/web-vitals";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    WebVitals();
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
