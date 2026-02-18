import "./globals.css";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";


export const metadata: Metadata = {
  title: "MurasAI LMS",
  description: "Platform  AI",
  icons: {
    icon: "murasAI_icon.jpg",
  },
};


const inter = Inter({
  subsets: ["latin"],
});

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // можно выбрать нужные веса
// });


export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className={inter.className}  >
        <div className="flex h-screen bg-gray-100">

          <Sidebar />

          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
