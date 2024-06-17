import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const font = Roboto_Serif({
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing"}`,
    default: `Home | ${process.env.NEXT_PUBLIC_APP_NAME ?? "Turbo Typing"}`,
  },
  description: "A simple web app for typing speed, where you can test your typing speed and improve it.",
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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
