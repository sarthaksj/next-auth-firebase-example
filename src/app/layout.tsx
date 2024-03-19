import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/components/SessionProvider";
import NavMenu from "@/components/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main className="mx-auto max-w-5xl text-2xl flex gap-2 text-white">
            <NavMenu />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
