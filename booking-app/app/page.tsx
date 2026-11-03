"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  Smartphone,
  ExternalLink,
  Copy,
  CheckCircle2,
  Clock,
  IdCard,
  FileText,
  AlertCircle,
  PhoneCall,
  Moon,
  Sun,
  Share2,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  MapPin,
  Stethoscope,
  Info,
  Award,
  CalendarDays,
  Building2,
  HeartPulse,
  Home,
  ShieldCheck,
  Type
} from "lucide-react";
import SchedulesExplorer from "./components/SchedulesExplorer";
import HospitalsShowcase from "./components/HospitalsShowcase";
import OfficialPortalFooter from "./components/OfficialPortalFooter";

const BOOKING_URL = "https://reserv.hiocdis.org/hioClinicReservation.aspx";
const SOFREG_URL = "https://196.219.219.184/sofreg/registerdata.aspx";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function BookingPage() {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontScale, setFontScale] = useState<"normal" | "large" | "xlarge">("normal");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissFloating, setDismissFloating] = useState(false);
  const [dismissBanner, setDismissBanner] = useState(false);
  const [lastBookedTime, setLastBookedTime] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<"online" | "checking" | "offline">("online");
  const [latency, setLatency] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const checkBookingHealth = async () => {
    try {
      const cached = sessionStorage.getItem("hio_booking_health_cache");
      const cachedAt = sessionStorage.getItem("hio_booking_health_time");
      if (cached && cachedAt && Date.now() - Number(cachedAt) < 15 * 60 * 1000) {
        setServerStatus(cached as "online" | "checking" | "offline");
        return;
      }
    } catch {}

    setServerStatus("checking");
    try {
      const res = await fetch(`/api/check-status?url=${encodeURIComponent(BOOKING_URL)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.online) {
          setServerStatus("online");
          if (data.latency) setLatency(data.latency);
          try {
            sessionStorage.setItem("hio_booking_health_cache", "online");
            sessionStorage.setItem("hio_booking_health_time", Date.now().toString());
          } catch {}
          return;
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      try {
        await fetch(BOOKING_URL, { mode: "no-cors", signal: controller.signal, cache: "no-store" });
        clearTimeout(timeoutId);
        setServerStatus("online");
        try {
          sessionStorage.setItem("hio_booking_health_cache", "online");
          sessionStorage.setItem("hio_booking_health_time", Date.now().toString());
        } catch {}
      } catch {
        setServerStatus("offline");
      }
    } catch {
      setServerStatus("online");
    }
  };

  useEffect(() => {
    checkBookingHealth();
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsStandalone(true);
    }

    // Load theme
    const savedTheme = localStorage.getItem("hio_booking_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Load font size preference for seniors
    const savedScale = localStorage.getItem("hio_font_scale") as "normal" | "large" | "xlarge";
    if (savedScale) {
      setFontScale(savedScale);
      const val = savedScale === "xlarge" ? "1.25" : savedScale === "large" ? "1.12" : "1";
      document.documentElement.style.setProperty("--portal-font-scale", val);
    }

    const last = localStorage.getItem("hio_booking_last_access");
    if (last) {
      setLastBookedTime(last);
    }

    try {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        manifestLink.setAttribute("href", "/manifest-booking.json?v=3");
      }
    } catch {}

    if (typeof window !== "undefined" && (window as unknown as { __pwaInstallPrompt?: BeforeInstallPromptEvent }).__pwaInstallPrompt) {
      setDeferredPrompt((window as unknown as { __pwaInstallPrompt?: BeforeInstallPromptEvent }).__pwaInstallPrompt || null);
    }

    if (typeof window !== "undefined") {
      (window as unknown as { __onPwaPromptReady?: (e: BeforeInstallPromptEvent) => void }).__onPwaPromptReady = (e: BeforeInstallPromptEvent) => {
        setDeferredPrompt(e);
      };
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      const p = e as BeforeInstallPromptEvent;
      setDeferredPrompt(p);
      if (typeof window !== "undefined") {
        (window as unknown as { __pwaInstallPrompt?: unknown }).__pwaInstallPrompt = p;
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("hio_booking_theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("hio_booking_theme", "dark");
      setDarkMode(true);
    }
  };

  const handleCycleFontSize = () => {
    let next: "normal" | "large" | "xlarge" = "large";
    let val = "1.12";
    if (fontScale === "normal") {
      next = "large";
      val = "1.12";
    } else if (fontScale === "large") {
      next = "xlarge";
      val = "1.25";
    } else {
      next = "normal";
      val = "1";
    }
    setFontScale(next);
    localStorage.setItem("hio_font_scale", next);
    document.documentElement.style.setProperty("--portal-font-scale", val);
  };

  const handleOpenBooking = () => {
    const now = new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
    localStorage.setItem("hio_booking_last_access", now);
    setLastBookedTime(now);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(BOOKING_URL, "_blank");
    } else {
      const width = 1150;
      const height = 820;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        BOOKING_URL,
        "HioClinicBookingWindow",
        `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
      );
    }
  };

  const handleOpenSofreg = () => {
    window.open(SOFREG_URL, "_blank");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(BOOKING_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    const promptEvent =
      deferredPrompt ||
      (typeof window !== "undefined" &&
        (window as unknown as { __pwaInstallPrompt?: BeforeInstallPromptEvent }).__pwaInstallPrompt);

    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice && choice.outcome === "accepted") {
          setDeferredPrompt(null);
          if (typeof window !== "undefined") {
            (window as unknown as { __pwaInstallPrompt?: unknown }).__pwaInstallPrompt = null;
          }
        }
        return;
      } catch (err) {
        console.error("Direct install error:", err);
      }
    }

    setShowIosGuide(true);
  };

  const FAQ_ITEMS = [
    {
      q: "ما هي المستندات المطلوبة عند التوجه للعيادة؟",
      a: "بطاقة التأمين الصحي السارية المفعول، بطاقة الرقم القومي الأصلية للمنتفع (أو شهادة الميلاد المميكنة للأطفال والطلاب)، ورقم الحجز المؤكد الصادر من الموقع، بالإضافة إلى نموذج التحويل الطبي إن كان الكشف يتطلب ذلك."
    },
    {
      q: "كيف يمكنني إلغاء أو تعديل موعد الحجز؟",
      a: "يمكنك إعادة فتح رابط الحجز بالرقم القومي والضغط على زر (استعلام أو إلغاء الموعد)، وتعديل الموعد أو إلغاؤه دون أي غرامات، ويُرجى الإلغاء في حال عدم التمكن من الحضور لإتاحة الفرصة لمريض آخر."
    },
    {
      q: "هل الحجز الإلكتروني متاح للأطفال والمواليد وطلاب المدارس؟",
      a: "نعم، الحجز متاح لجميع الفئات بالرقم القومي المدون أعلى شهادة ميلاد الطفل أو بطاقة التأمين الصحي الخاصة بالطالب."
    },
    {
      q: "ما هي مواعيد العمل بالفترة المسائية بمحافظة سوهاج؟",
      a: "تعمل عيادات الفترة المسائية من الساعة 4:00 عصراً وحتى 8:00 مساءً بمجمع عيادات العاشر من رمضان وعيادة الوفاء الشاملة بسوهاج، لخدمة الموظفين وأصحاب الأعمال بعد ساعات العمل وتخفيف التكدس."
    },
    {
      q: "ما هو الرقم المعتمد لشكاوى واستفسارات التأمين الصحي؟",
      a: "الرقم الرسمي المعتمد والوحيد هو الخط الساخن الموحد 106 (متاح مجاناً على مدار 24 ساعة يومياً)، ولطوارئ مستشفى الهلال بسوهاج الاتصال بالرقم 093-2324567."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16 md:pb-0">
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* TOP ANNOUNCEMENT BANNER                                                 */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {!dismissBanner && (
        <div className="bg-emerald-700 dark:bg-emerald-900 text-white text-xs px-3 sm:px-4 py-2 border-b border-emerald-600 flex items-center justify-between gap-2 transition-all">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-center sm:text-right">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0 hidden sm:inline-block" />
            <p className="leading-tight">
              <strong>تنبيه رسمي:</strong> مواعيد العمل بالفترة المسائية من <strong>4:00 عصراً حتى 8:00 مساءً</strong> بمجمع العاشر من رمضان وعيادة الوفاء لتيسير الكشف وتخفيف الازدحام.
            </p>
          </div>
          <button
            onClick={() => setDismissBanner(true)}
            className="p-1 rounded-lg text-emerald-200 hover:text-white shrink-0"
            title="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* TOP NAVBAR                                                              */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          {/* Logo & Portal Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-white p-1 shadow-sm border border-slate-200 dark:border-slate-700 shrink-0">
              <Image src="/logo.png?v=3" alt="شعار التأمين الصحي" width={48} height={48} className="object-contain" priority />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 block tracking-wider uppercase truncate">
                الهيئة العامة للتأمين الصحي
              </span>
              <h1 className="font-extrabold text-xs sm:text-base md:text-lg text-slate-900 dark:text-white truncate">
                بوابة حجز العيادات • فرع سوهاج
              </h1>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Adjuster for Elderly */}
            <button
              onClick={handleCycleFontSize}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1"
              title="تكبير وتصغير حجم الخط لكبار السن"
              aria-label="تغيير حجم الخط"
            >
              <Type className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-mono text-[11px]">
                {fontScale === "xlarge" ? "A++" : fontScale === "large" ? "A+" : "A"}
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
              title={darkMode ? "التحويل للوضع النهاري" : "التحويل للوضع الليلي"}
              aria-label="تبديل الوضع"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Team Honor Board Link */}
            <Link
              href="/team"
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 text-xs font-bold transition flex items-center gap-1.5"
              title="لوحة الشرف وفريق العمل"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden md:inline">لوحة الشرف</span>
            </Link>

            {/* Direct PWA Install Button */}
            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-1.5"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">تثبيت التطبيق</span>
                <span className="sm:hidden">تثبيت</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT                                                            */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-10 w-full flex-grow space-y-8 sm:space-y-10">
        
        {/* HERO SECTION */}
        <div id="booking-section" className="scroll-mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-emerald-950 text-white p-6 sm:p-8 md:p-12 shadow-2xl shadow-emerald-950/20 border border-emerald-500/30">
          {/* Background delicate shapes */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-5">
            {/* Live Server Indicator */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                خدمة إلكترونية رسمية وفورية لمنتفعي سوهاج
              </span>

              {serverStatus === "online" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-xs font-bold text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>سيرفر الحجز نشط ومتاح</span>
                  {latency && <span className="opacity-75 font-mono text-[10px]">({latency}ms)</span>}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-snug">
              حجز مواعيد عيادات التأمين الصحي
            </h2>
            
            <p className="text-emerald-100 text-xs sm:text-base md:text-lg max-w-2xl leading-relaxed">
              احجز موعد كشفك في أي من عيادات ومستشفيات الهيئة العامة للتأمين الصحي بسوهاج بسهولة ودون انتظار، بالرقم القومي لبطاقتك التأمينية.
            </p>

            {/* Main Action CTAs */}
            <div className="pt-3 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 justify-center flex-wrap">
              <button
                onClick={handleOpenBooking}
                className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-black text-sm sm:text-base md:text-lg shadow-xl shadow-black/15 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0 min-h-[52px]"
              >
                <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                <span>احجز موعدك الآن بالعيادة</span>
                <ExternalLink className="w-4 h-4 text-emerald-500 opacity-70" />
              </button>

              <a
                href="#schedules-explorer-section"
                className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-4.5 rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm md:text-base border border-emerald-400/40 flex items-center justify-center gap-2 transition"
              >
                <CalendarDays className="w-4 h-4 text-teal-200" />
                <span>جداول مواعيد العيادات بالأيام</span>
              </a>

              <button
                onClick={handleOpenSofreg}
                className="w-full sm:w-auto px-5 sm:px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition"
                title="تسجيل وتحديث بيانات بطاقة التأمين الصحي"
              >
                <IdCard className="w-4 h-4 text-slate-900" />
                <span>بوابة تسجيل البيانات</span>
              </button>
            </div>

            {/* Trust Strip */}
            <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4 text-emerald-200/90 text-[11px] sm:text-xs flex-wrap">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>خدمة مجانية 100%</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>حماية كاملة للرقم القومي</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
                <span>الخط الساخن الموحد 106</span>
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* VISUAL BOOKING 4-STEP WIZARD                                            */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>خطوات حجز الموعد في دقائق معدودة</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              خطوات مبسطة وميسرة لكبار السن والمواطنين
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Step 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black text-sm flex items-center justify-center">
                  1
                </div>
                <IdCard className="w-5 h-5 text-emerald-600" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                إدخال الرقم القومي
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                اكتب الـ 14 رقماً لبطاقتك الشخصية للتأكد من سريان التغطية التأمينية.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-black text-sm flex items-center justify-center">
                  2
                </div>
                <Building2 className="w-5 h-5 text-sky-600" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                اختيار العيادة والتخصص
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                حدد المركز أو العيادة الأقرب لك والتخصص الطبي المطلوب الكشف به.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-black text-sm flex items-center justify-center">
                  3
                </div>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                تحديد اليوم والفترة
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                اختر اليوم والفترة المناسبة لك (فترة صباحية أو فترة مسائية).
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-black text-sm flex items-center justify-center">
                  4
                </div>
                <CheckCircle2 className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                تأكيد الحجز والحفظ
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                احفظ رقم الحجز أو لقطة شاشة وتوجه للعيادة في الموعد بكل راحة.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* INTERACTIVE CLINIC SCHEDULES EXPLORER (Priority 1)                     */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <SchedulesExplorer onOpenBooking={handleOpenBooking} />

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* HOSPITALS & CLINICS NETWORK SHOWCASE                                    */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div id="hospitals-section" className="scroll-mt-20">
          <HospitalsShowcase onOpenBooking={handleOpenBooking} />
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* REQUIRED DOCUMENTS & INSTRUCTIONS                                       */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-3">
            <h4 className="font-extrabold text-emerald-900 dark:text-emerald-200 text-sm sm:text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>المستندات المطلوبة عند التوجه للعيادة</span>
            </h4>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
              <li>بطاقة التأمين الصحي السارية المفعول للمنتفع.</li>
              <li>بطاقة الرقم القومي الأصلية للمنتفع (أو شهادة الميلاد للأطفال والطلاب).</li>
              <li>رقم الحجز المؤكد الصادر من الموقع الإلكتروني.</li>
              <li>خطاب الإحالة الطبي أو نموذج التأمين إن كان الحجز يتطلب ذلك.</li>
            </ul>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-3">
            <h4 className="font-extrabold text-amber-900 dark:text-amber-200 text-sm sm:text-base flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>تنبيهات هامة للمنتفعين</span>
            </h4>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
              <li>يُرجى الحضور مبكراً قبل موعد الكشف بنصف ساعة لإنهاء إجراءات التذاكر.</li>
              <li>في حال عدم التمكن من الحضور، يرجى إلغاء الحجز لإتاحة الفرصة لمريض آخر.</li>
              <li>الحجز الإلكتروني متاح على مدار الساعة طوال أيام الأسبوع.</li>
              <li>الخدمة مجانية تماماً ولا يتم دفع أي رسوم إضافية مقابل الحجز الإلكتروني.</li>
            </ul>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION)                             */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>الأسئلة الشائعة حول الحجز والمواعيد</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              إجابات مباشرة على أكثر الاستفسارات تكراراً من منتفعي محافظة سوهاج
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 pt-2">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-3">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-right flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="pt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pr-2">
                      {item.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* CONTACT & HOTLINE STRIP                                                */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h5 className="font-black text-sm sm:text-base text-slate-900 dark:text-white">
                هل تحتاج لمساعدة في الحجز أو لديك استفسار عاجل؟
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                الخط الساخن لخدمة عملاء الهيئة العامة للتأمين الصحي متاح 24/7
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:106"
              className="flex-1 sm:flex-none text-center px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition min-h-[48px] flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>اتصل بالخط الساخن 106</span>
            </a>
          </div>
        </div>

      </main>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MOBILE STICKY BOTTOM NAVIGATION BAR (Visible on mobile only)          */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-2xl"
        aria-label="شريط التنقل السريع على الهاتف"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition"
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>

        <a
          href="#schedules-explorer-section"
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition"
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-[10px] font-bold">الجداول</span>
        </a>

        {/* Center Booking Highlight Button */}
        <button
          onClick={handleOpenBooking}
          className="-mt-5 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-[11px] shadow-lg shadow-emerald-600/30 flex flex-col items-center gap-0.5 active:scale-95"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>احجز الآن</span>
        </button>

        <a
          href="#hospitals-section"
          className="flex flex-col items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition"
        >
          <Building2 className="w-4 h-4" />
          <span className="text-[10px] font-bold">المستشفيات</span>
        </a>

        <a
          href="tel:106"
          className="flex flex-col items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold"
        >
          <PhoneCall className="w-4 h-4" />
          <span className="text-[10px]">106</span>
        </a>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* IOS / PWA GUIDE MODAL                                                   */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>طريقة تثبيت التطبيق على هاتفك</span>
              </h3>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>لهواتف الآيفون (Safari):</span>
                </p>
                <ol className="space-y-1 list-decimal list-inside text-[11px] sm:text-xs">
                  <li>اضغط على زر <strong>المشاركة (Share)</strong> أسفل المتصفح.</li>
                  <li>اختر <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>.</li>
                  <li>اضغط على <strong>إضافة (Add)</strong> في الأعلى.</li>
                </ol>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  <span>لهواتف الأندرويد (Chrome):</span>
                </p>
                <ol className="space-y-1 list-decimal list-inside text-[11px] sm:text-xs">
                  <li>اضغط على القائمة <strong>(ثلاث نقاط ⋮)</strong> أعلى المتصفح.</li>
                  <li>اختر <strong>تثبيت التطبيق (Install App)</strong> أو <strong>إضافة للشاشة الرئيسية</strong>.</li>
                  <li>اضغط <strong>تثبيت</strong>.</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* OFFICIAL COMPREHENSIVE GOVERNMENT FOOTER                                */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <OfficialPortalFooter />
    </div>
  );
}
