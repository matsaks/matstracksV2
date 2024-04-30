import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import "mapbox-gl/dist/mapbox-gl.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatsTracks",
  description: "My running and skiing tracks.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MainNav />
          {children}
          <Footer />
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
