import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "بوابة الأنظمة والخدمات الموحدة - تأمين صحي سوهاج",
  description: "المنصة المركزية لإطلاق وإدارة السيرفرات والمنظومات الطبية والإدارية لفرع سوهاج للتأمين الصحي",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "تأمين صحي سوهاج",
  },
};

export const viewport: Viewport = {
  themeColor: "#0284c7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
