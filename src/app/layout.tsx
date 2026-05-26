// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
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
      <body className={`${inter.className} bg-gray-50 text-foreground transition-colors duration-300 dark:bg-slate-950`}>
        {children}
      </body>
    </html>
  );
}