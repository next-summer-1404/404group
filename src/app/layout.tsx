import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const IRANYekan = localFont({
  src: [
    {
      path: "../../public/font/BYekan+.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-iranyekan",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" className="light">
      <body className={`${IRANYekan.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
