import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";

const font = Roboto_Serif({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Speed Typing",
  description: "A simple speed typing web app, where you can test your typing speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
