import "./globals.css";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "MurasAI LMS",
  description: "Platform AI",
  icons: {
    icon: "murasAI_icon.jpg",
  },
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.className}>
        <UserProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
