import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liga das legendas",
  description: "Rank dos piores do mundo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body style={{ backgroundImage: "url('/images/bg.jpg')" }}
        className={`${nunito.className} h-full w-full bg-cover backdrop-blur-md bg-no-repeat bg-center`}>{children}</body>
    </html>
  );
}
