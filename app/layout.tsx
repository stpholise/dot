import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/layout/Header";
import Sidebar from "./_components/layout/Sidebar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "DOT",
  description: "DOT micro finance bank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${inter.className} ${geistSans.variable}  bg-[#FAF9F9] text-[#667085] `}
        >
          <Providers>
            <Header />
            <Sidebar />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
