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
  X,
  Sparkles,
  MapPin,
  Stethoscope,
  Award,
  HeartHandshake,
  CalendarDays
} from "lucide-react";
import ClinicSchedules from "./ClinicSchedules";
import HospitalsShowcase from "../components/HospitalsShowcase";

const BOOKING_URL = "https://reserv.hiocdis.org/hioClinicReservation.aspx";
const SOFREG_URL = "https://196.219.219.184/sofreg/registerdata.aspx";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function BookingPortalPage() {
  const [copied, setCopied] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [dismissFloating, setDismissFloating] = useState(false);
  const [lastBookedTime, setLastBookedTime] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<"online" | "checking" | "offline">("checking");
  const [latency, setLatency] = useState<number | null>(null);

  const checkBookingHealth = async () => {
    // Extreme Bandwidth Optimization: Use client sessionStorage cache (15 mins) to prevent zero-purpose serverless hits
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
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsStandalone(true);
    }

    const savedTheme = localStorage.getItem("sohag_hio_staff_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const last = localStorage.getItem("hio_booking_last_access");
    if (last) {
      setLastBookedTime(last);
    }

    checkBookingHealth();

    // Ensure dedicated booking PWA manifest is active with official emblem
    try {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        manifestLink.setAttribute("href", "/manifest-booking.json?v=3");
      } else {
        const link = document.createElement("link");
        link.rel = "manifest";
        link.href = "/manifest-booking.json?v=3";
        document.head.appendChild(link);
      }
    } catch {}

    // Check if prompt was already captured by head script
    if (typeof window !== "undefined" && (window as unknown as { __pwaInstallPrompt?: BeforeInstallPromptEvent }).__pwaInstallPrompt) {
      setDeferredPrompt((window as unknown as { __pwaInstallPrompt?: BeforeInstallPromptEvent }).__pwaInstallPrompt || null);
    }

    // Expose ready callback for head script
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
      localStorage.setItem("sohag_hio_staff_theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sohag_hio_staff_theme", "dark");
      setDarkMode(true);
    }
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
    // 1. Direct one-click prompt: Try state or global captured prompt
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

    // 2. iOS Guide
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream;
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    // 3. Fallback guide
    setShowIosGuide(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Official Badge Logo */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md border-2 border-emerald-500/40 shrink-0">
              <Image
                src="/logo.png"
                alt="شعار فرع سوهاج للتأمين الصحي"
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </div>

            <div className="min-w-0 truncate">
              <h1 className="font-bold text-xs sm:text-base md:text-lg text-slate-900 dark:text-white truncate leading-tight">
                التأمين الصحي - فرع سوهاج
              </h1>
              <p className="text-[10px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                بوابة حجز عيادات المنتفعين
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Link to Team Page */}
            <Link
              href="/team"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 border border-amber-300/50 text-xs sm:text-sm font-bold transition shadow-sm"
              title="فريق العمل"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>فريق العمل</span>
            </Link>

            <button
              onClick={toggleDarkMode}
              title={darkMode ? "الوضع الفاتح" : "الوضع الليلي"}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="تبديل المظهر"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-emerald-600/30 transition transform active:scale-95"
              >
                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">تثبيت التطبيق</span>
                <span className="sm:hidden">تثبيت</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-10 w-full flex-grow space-y-6 sm:space-y-8">
        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-700 to-emerald-900 text-white p-5 sm:p-7 md:p-10 shadow-xl shadow-emerald-900/15">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-4 sm:space-y-5">
            {/* Live Server Status Indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-[11px] sm:text-xs md:text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
                خدمة إلكترونية فورية ومجانية للمنتفعين
              </span>

              {serverStatus === "online" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-[11px] sm:text-xs font-bold text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>المنظومة نشطة ومتاحة</span>
                  {latency && <span className="opacity-75 font-mono text-[10px]">({latency}ms)</span>}
                </span>
              )}

              {serverStatus === "checking" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-400/20 text-[11px] sm:text-xs text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-sky-300 animate-ping" />
                  <span>جارِ فحص الاتصال...</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight leading-snug">
              حجز مواعيد عيادات التأمين الصحي
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              احجز موعد كشفك في أي من عيادات ومستشفيات الهيئة العامة للتأمين الصحي بسوهاج بسهولة ودون انتظار، بالرقم القومي لبطاقتك التأمينية.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 flex-wrap justify-center">
              <button
                onClick={handleOpenBooking}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm sm:text-base md:text-lg shadow-lg shadow-black/10 flex items-center justify-center gap-2 sm:gap-3 transition transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
              >
                <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                <span>احجز موعدك الآن بالعيادة</span>
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 opacity-70" />
              </button>

              <button
                onClick={handleOpenSofreg}
                className="w-full sm:w-auto px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-lg shadow-black/15 transition transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
              >
                <IdCard className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>منظومة الكبد (تسجيل مرضى الكبد والمنتفعين - SofReg)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-950 opacity-70" />
              </button>

              <button
                onClick={handleInstallClick}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/15 transition transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px]"
              >
                <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>تثبيت تطبيق الحجز على الهاتف</span>
              </button>

              <a
                href="#schedules-section"
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-teal-800/80 hover:bg-teal-700 border border-teal-400/40 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition min-h-[48px]"
              >
                <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5 text-teal-200" />
                <span>مواعيد وجداول العيادات بالأيام</span>
              </a>

              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-500/30 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition min-h-[48px]"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                    <span>تم نسخ الرابط بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                    <span>نسخ رابط الحجز</span>
                  </>
                )}
              </button>
            </div>

            {lastBookedTime && (
              <p className="text-[11px] sm:text-xs text-emerald-200/80 pt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>آخر دخول لمنظومة الحجز كان اليوم الساعة: {lastBookedTime}</span>
              </p>
            )}
          </div>
        </div>

        {/* Dedicated PWA Mobile Install Showcase Card */}
        {!isStandalone && (
          <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-500/30 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-white p-1 shadow-md border-2 border-emerald-500 shrink-0">
                <Image
                  src="/logo.png?v=3"
                  alt="شعار فرع سوهاج للتأمين الصحي"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    تطبيق ويب معتمد (PWA)
                  </span>
                  <span className="text-[10px] text-slate-500">حجم خفيف جداً</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                  تثبيت تطبيق حجز العيادات على هاتفك
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
                  ثبت التطبيق بشعار التأمين الصحي الرسمي للوصول السريع لخدمة الحجز وجداول الأطباء مباشرة بنقرة واحدة.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <button
                onClick={handleInstallClick}
                className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
              >
                <Smartphone className="w-4 h-4" />
                <span>تثبيت التطبيق الآن</span>
              </button>
              <button
                onClick={() => setShowIosGuide(true)}
                className="px-3.5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition"
                title="طريقة التثبيت"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* SofReg Liver & Beneficiary Registration Card */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-sky-950 text-white p-5 sm:p-6 border-2 border-amber-500/50 shadow-xl shadow-amber-950/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center md:text-right">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                <IdCard className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] sm:text-xs font-bold text-amber-300">
                    منظومة الكبد وفيروس C (تسجيل مرضى الكبد والمنتفعين - SofReg)
                  </span>
                  <span className="text-[11px] text-emerald-300 font-bold hidden sm:inline">سيرفر مباشر</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
                  تسجيل بيانات مرضى الكبد وحجز عيادات الكبد وصرف بروتوكولات العلاج
                </h3>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  يمكن لمرضى الكبد وفيروس C والمنتفعين الدخول مباشرة إلى منظومة SofReg لتسجيل وتحديث بيانات البطاقة التأمينية والرقم القومي لفتح الملف الطبي وحجز المواعيد.
                </p>
              </div>
            </div>

            <button
              onClick={handleOpenSofreg}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 min-h-[44px]"
            >
              <ExternalLink className="w-4 h-4" />
              <span>الدخول لمنظومة الكبد الآن</span>
            </button>
          </div>
        </section>

        {/* 4 Steps Guide */}
        <section className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            خطوات الحجز الإلكتروني البسيطة
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs sm:text-sm mb-2.5 sm:mb-3">
                  1
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 text-xs sm:text-sm">
                  الرقم القومي
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  أدخل الرقم القومي للمريض (14 رقماً) والمسجل على بطاقة التأمين الصحي.
                </p>
              </div>
              <IdCard className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 self-end mt-3 opacity-75" />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs sm:text-sm mb-2.5 sm:mb-3">
                  2
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 text-xs sm:text-sm">
                  اختيار العيادة والتخصص
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  اختر عيادة فرع سوهاج التابع لها وحدد التخصص الطبي المطلوب الكشف به.
                </p>
              </div>
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 self-end mt-3 opacity-75" />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs sm:text-sm mb-2.5 sm:mb-3">
                  3
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 text-xs sm:text-sm">
                  تحديد موعد الحجز
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  اختر اليوم المتاح والمناسب لك ثم اضغط على زر تأكيد الحجز.
                </p>
              </div>
              <CalendarCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 self-end mt-3 opacity-75" />
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center text-xs sm:text-sm mb-2.5 sm:mb-3">
                  4
                </span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1 text-xs sm:text-sm">
                  الحفظ والتوجه للعيادة
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  احتفظ برقم الحجز أو صورة من الشاشة، وتوجه للعيادة قبل الموعد بنصف ساعة.
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 self-end mt-3 opacity-75" />
            </div>
          </div>
        </section>

        {/* Hospitals & Branch Overview Showcase */}
        <div id="hospitals-section" className="scroll-mt-20">
          <HospitalsShowcase onOpenBooking={handleOpenBooking} />
        </div>

        {/* Quick Navigation to Schedules */}
        <div className="flex items-center justify-center">
          <a
            href="#schedules-section"
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 text-white font-extrabold text-sm shadow-xl shadow-teal-900/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <CalendarDays className="w-5 h-5 text-teal-200 group-hover:animate-bounce" />
            <span>📋 عرض جداول ومواعيد تشغيل العيادات بالأيام</span>
          </a>
        </div>

        {/* Interactive Clinic & Specialized Committees Schedules Gallery */}
        <div id="schedules-section" className="scroll-mt-20">
          <ClinicSchedules />
        </div>

        {/* Required Documents & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm md:text-base flex items-center gap-2 mb-2.5 sm:mb-3">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
              المستندات المطلوبة عند التوجه للعيادة
            </h4>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 sm:space-y-2 list-disc list-inside">
              <li>بطاقة التأمين الصحي السارية المفعول للمنتفع.</li>
              <li>بطاقة الرقم القومي الأصلية للمنتفع (أو شهادة الميلاد للأطفال والطلاب).</li>
              <li>رقم الحجز المؤكد الصادر من الموقع الإلكتروني.</li>
              <li>خطاب الإحالة الطبي أو نموذج التأمين إن كان الحجز يتطلب ذلك.</li>
            </ul>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <h4 className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm md:text-base flex items-center gap-2 mb-2.5 sm:mb-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
              تنبيهات هامة للمنتفعين
            </h4>
            <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5 sm:space-y-2 list-disc list-inside">
              <li>يُرجى الحضور مبكراً قبل موعد الكشف بنصف ساعة لإنهاء إجراءات التذاكر.</li>
              <li>في حال عدم التمكن من الحضور، يرجى إلغاء الحجز لإتاحة الفرصة لمريض آخر.</li>
              <li>الحجز الإلكتروني متاح على مدار الساعة طوال أيام الأسبوع.</li>
              <li>الخدمة مجانية تماماً ولا يتم دفع أي رسوم إضافية مقابل الحجز الإلكتروني.</li>
            </ul>
          </div>
        </div>

        {/* Contact & Support Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                هل تحتاج لمساعدة في الحجز أو لديك استفسار؟
              </h5>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                الخط الساخن لخدمة عملاء الهيئة العامة للتأمين الصحي
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="tel:106"
              className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px] flex items-center justify-center"
            >
              اتصل برقم 106
            </a>
            <a
              href="tel:15335"
              className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition min-h-[44px] flex items-center justify-center"
            >
              أو 15335
            </a>
          </div>
        </div>

        {/* Mobile Sticky Floating Install Prompt */}
        {!isStandalone && !dismissFloating && (
          <div className="fixed bottom-3 inset-x-3 z-30 md:hidden bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl border border-emerald-500/40 shadow-2xl flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom-5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shrink-0 border border-emerald-400">
                <Image src="/logo.png?v=3" alt="شعار سوهاج" width={40} height={40} className="object-contain" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs truncate">تطبيق حجز عيادات سوهاج</p>
                <p className="text-[10px] text-emerald-400 truncate">تثبيت فوري على الشاشة الرئيسية</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition"
              >
                تثبيت
              </button>
              <button
                onClick={() => setDismissFloating(true)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Installation Guide Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                طريقة تثبيت التطبيق على هاتفك
              </h4>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  📱 لهواتف الآيفون (Safari):
                </p>
                <ol className="space-y-1 list-decimal list-inside text-[11px] sm:text-xs">
                  <li>اضغط على زر <strong>المشاركة (Share)</strong> أسفل المتصفح.</li>
                  <li>اختر <strong>إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>.</li>
                  <li>اضغط على <strong>إضافة (Add)</strong> في الأعلى.</li>
                </ol>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  🤖 لهواتف الأندرويد (Chrome):
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

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 py-5 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          الهيئة العامة للتأمين الصحي - فرع سوهاج
        </p>
        <div className="flex items-center justify-center gap-3 text-[11px]">
          <span>صحتك أمانة بين إيدينا</span>
          <span>•</span>
          <Link
            href="/team"
            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>لوحة الشرف وفريق العمل</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
