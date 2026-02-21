// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MurasAI LMS",
  description: "Platform AI",
  icons: {
    icon: "murasAI_icon.jpg",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  );
}