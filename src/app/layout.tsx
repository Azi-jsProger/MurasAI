import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Providers from "@/components/Providers";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "MurasAI LMS",
  description: "Platform AI",
  icons: {
    icon: "murasAI_icon.jpg",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <UserProvider>
              <ClientLayoutWrapper>
                {children}
                <Providers />
              </ClientLayoutWrapper>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}