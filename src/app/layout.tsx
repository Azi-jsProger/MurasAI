// layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "MurasAI LMS",
  description: "Platform  AI",
  icons: {
    icon: "murasAI_icon.jpg",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body className={`${inter.className} bg-gray-100`}>
        <UserProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </UserProvider>
      </body>
    </html>
  );
}
