import { Geist, Geist_Mono } from "next/font/google";
import AuthSessionProvider from "@/components/SessionProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "PeerMatch",
  description: "Find your study peers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <AuthSessionProvider>
          <Navbar />
          {children}
          <Toaster />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
