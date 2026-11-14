import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QR Studio — Make a QR code in seconds",
  description:
    "Create clean, scannable QR codes in seconds. Link, Text, Wi-Fi, Email and Contact types, 10 colour presets and 10 dot styles, PNG and SVG download. Free, in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700;1,800&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F4FFEB] font-sans text-[#212121] dark:bg-[#0A0A0A] dark:text-white">
        {children}
      </body>
    </html>
  );
}
