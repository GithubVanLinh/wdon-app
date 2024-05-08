import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, AppFooter } from "./_components";
import StoreProvider from "./_components/provider";
import { NextUIProvider } from "./_components/nextui";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Don App",
  description: "social network",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NextUIProvider>
            <Navbar />
            <div>{children}</div>
            {/* <AppFooter /> */}
          </NextUIProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
