import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import AuthProvider from "./AuthProvider";
import SocketProvider from "./SocketProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  media,
  post,
}: Readonly<{
  children: React.ReactNode;
  media: React.ReactNode;
  post: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <SocketProvider>
              {media}
              {post}
              {children}
            </SocketProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
