import type { Metadata } from "next";
import { Anton, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Cursor from "@/components/Cursor";
import SmoothScroll from "@/components/SmoothScroll";
import OverlayTheme from "@/components/OverlayTheme";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://topmarketingsolutions.in"),
  title: {
    default: "TOP Marketing Solutions — We will be the last agency you hire",
    template: "%s — TOP Marketing Solutions",
  },
  description:
    "Hyderabad marketing agency. Content, social, design, web, CGI, influencer, performance, events and PR. Five years of retaining India's finest brands.",
  openGraph: {
    title: "TOP Marketing Solutions",
    description: "We will be the last agency you hire.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${poppins.variable}`}>
      <body>
        <Preloader />
        <PageTransition />
        <SmoothScroll />
        <OverlayTheme />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
