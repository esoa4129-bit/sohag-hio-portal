import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "بوابة حجز عيادات التأمين الصحي - فرع سوهاج",
  description: "البوابة الرسمية لحجز مواعيد عيادات ومستشفيات الهيئة العامة للتأمين الصحي بمحافظة سوهاج، وجداول مواعيد الفترات الصباحية والمسائية واللجان الطبية.",
  keywords: [
    "تأمين صحي سوهاج",
    "حجز عيادات التأمين الصحي سوهاج",
    "مستشفى الهلال سوهاج",
    "مجمع العاشر من رمضان سوهاج",
    "عيادات الوفاء التأمين الصحي",
    "اللجان الطبية التأمين الصحي سوهاج"
  ],
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
  openGraph: {
    title: "بوابة حجز عيادات التأمين الصحي - فرع سوهاج",
    description: "احجز موعد كشفك الطبي إلكترونياً واستعرض جداول مواعيد العيادات واللجان الطبية بمحافظة سوهاج",
    locale: "ar_EG",
    type: "website",
    siteName: "الهيئة العامة للتأمين الصحي - فرع سوهاج",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "حجز التأمين الصحي",
  },
};

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
};

const JSON_LD_DATA = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "الهيئة العامة للتأمين الصحي - فرع سوهاج",
  "alternateName": "Sohag Health Insurance Branch",
  "url": "https://sohag-hio-portal.vercel.app",
  "logo": "https://sohag-hio-portal.vercel.app/logo.png",
  "telephone": "106",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "سوهاج",
    "addressRegion": "محافظة سوهاج",
    "streetAddress": "ميدان الثقافة - ديوان عام الفرع",
    "addressCountry": "EG"
  },
  "medicalSpecialty": [
    "GeneralPractice",
    "InternalMedicine",
    "Pediatrics",
    "Orthopedics",
    "Cardiovascular",
    "Oncology",
    "Ophthalmology"
  ]
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_DATA) }}
        />
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
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
