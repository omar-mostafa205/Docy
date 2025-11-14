import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";  
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Docy",
  description: "Docy - Automated Code Documentation ",
  icons: [{ rel: "icon", url: "/new.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
      <SessionProvider>
    <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionProvider>

      </body>
    </html>
  );
}
