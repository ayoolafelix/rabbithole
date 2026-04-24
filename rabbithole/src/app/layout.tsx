import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RabbitHole — Recursive Learning OS",
  description: "Transform any content into an explorable knowledge system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}