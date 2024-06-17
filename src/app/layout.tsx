import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/providers/auth-provider";

const font = Roboto_Serif({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME ?? "Speed Typing"}`,
    default: `Home | ${process.env.NEXT_PUBLIC_APP_NAME ?? "Speed Typing"}`,
  },
  description: "A simple speed typing web app, where you can test your typing speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
