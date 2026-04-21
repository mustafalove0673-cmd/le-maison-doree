import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Maison Dorée | Fine Dining Restaurant",
  description: "Her tabak, bir hikaye anlatır. İstanbul'un kalbinde eşsiz bir gastronomi deneyimi.",
  keywords: ["Le Maison Dorée", "Fine Dining", "Restoran", "Istanbul", "Gastronomi"],
  authors: [{ name: "Le Maison Dorée" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Le Maison Dorée | Fine Dining Restaurant",
    description: "Her tabak, bir hikaye anlatır. İstanbul'un kalbinde eşsiz bir gastronomi deneyimi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
