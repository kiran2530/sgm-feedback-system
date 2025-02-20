import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { FeedbackProvider } from "@/context/FeedbackContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FeedbackProvider>
          <>
            <Navbar />
            <main className="min-h-screen bg-gray-50">{children}</main>
          </>
        </FeedbackProvider>
      </body>
    </html>
  );
}
