import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aesthetic Training Hub | Practitioner Directory",
  description:
    "Find vetted UK aesthetics trainers by specialism, location, and subscription tier.",
  openGraph: {
    title: "Aesthetic Training Hub Practitioner Directory",
    description:
      "Compare vetted UK aesthetics trainers by specialism, location, and listing tier.",
    siteName: "Aesthetic Training Hub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aesthetic Training Hub Practitioner Directory",
    description:
      "Compare vetted UK aesthetics trainers by specialism, location, and listing tier.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
          href="#main-content"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
