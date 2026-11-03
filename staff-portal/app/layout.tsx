import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "بوابة الأنظمة والخدمات الموحدة - تأمين صحي سوهاج",
  description: "المنصة المركزية لإطلاق وإدارة السيرفرات والمنظومات الطبية والإدارية لفرع سوهاج للتأمين الصحي",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png?v=3", sizes: "192x192", type: "image/png" },
      { url: "/logo.png?v=3", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/logo.png?v=3",
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
      { url: "/logo.png?v=3" },
    ],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon-192.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pwaInstallPrompt=e;if(window.__onPwaPromptReady){window.__onPwaPromptReady(e);}});`,
          }}
        />
        {/* Completely remove and block Vercel Toolbar & Feedback widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){function k(){var els=document.querySelectorAll('vercel-live-feedback,[data-vercel-toolbar],iframe[src*="vercel.live"],#vercel-live-feedback,vercel-toolbar');els.forEach(function(e){e.remove();});}k();window.addEventListener('DOMContentLoaded',k);window.addEventListener('load',k);if(typeof MutationObserver!=='undefined'){new MutationObserver(k).observe(document.documentElement,{childList:true,subtree:true});}})();`,
          }}
        />
      </head>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
