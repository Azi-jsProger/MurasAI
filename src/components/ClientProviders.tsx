"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { UserProvider } from "@/context/UserContext";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import Providers from "./Providers";
import AuthGuard from "./AuthGuard";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <UserProvider>
          <AuthGuard>
            <ClientLayoutWrapper>
              {children}
              <Providers />
            </ClientLayoutWrapper>
          </AuthGuard>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}