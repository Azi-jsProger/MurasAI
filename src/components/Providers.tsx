// components/Providers.tsx
"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  autoClose?: number;
  theme?: "light" | "dark" | "colored";
  toastStyle?: React.CSSProperties;
}

export default function Providers({
  position = "top-right",
  autoClose = 3000,
  theme = "colored",
  toastStyle = { borderRadius: "12px" },
}: ProvidersProps) {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      theme={theme}
      toastStyle={toastStyle}
    />
  );
}
