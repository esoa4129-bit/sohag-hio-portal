"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Cpu,
  Code2,
  Building2,
  Sun,
  Moon,
  Share2,
  CheckCircle2,
  HeartHandshake,
  Sparkles
} from "lucide-react";

export default function TeamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hio_booking_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "قيادات وفريق عمل بوابة تأمين صحي سوهاج",
        text: "لوحة الشرف وفريق عمل بوابة حجز التأمين الصحي بفرع سوهاج",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold transition transform active:scale-95"
          >
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <span>العودة لصفحة الحجز</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="مشاركة الصفحة"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleDarkMode}
              title={darkMode ? "الوضع الفاتح" : "الوضع الليلي"}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="تبديل المظهر"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12 w-full flex-grow space-y-10">
        {/* Official Header & Badge Section */}
        <section className="text-center flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-red-600 via-emerald-600 to-teal-600 rounded-full blur opacity-35 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white p-2 shadow-2xl flex items-center justify-center border-4 border-slate-100 dark:border-slate-800">
              <Image
                src="/logo.png"
                alt="شعار الهيئة العامة للتأمين الصحي - فرع سوهاج"
                width={130}
                height={130}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-1.5 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-xs font-bold">
              <HeartHandshake className="w-3.5 h-3.5" />
              صحتك أمانة بين إيدينا
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              الهيئة العامة للتأمين الصحي
            </h1>
            <h2 className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
              فرع سوهاج للتأمين الصحي
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
              لوحة الشرف وفريق العمل القائم على منظومة حجز العيادات الإلكترونية
            </p>
          </div>
        </section>

        {/* Leadership & Development Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Card 1: مدير عام الفرع */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-emerald-200 dark:border-emerald-800/60 p-6 sm:p-7 shadow-lg shadow-emerald-500/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  الرعاية والإشراف العام
                </span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-inner">
                  <Building2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  مدير عام فرع سوهاج للتأمين الصحي
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  دكتور / محمد خلف عفيفي
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                تحت رعاية وتوجيهات سيادته لتيسير حجز عيادات التأمين الصحي إلكترونياً وتوفير كافة سبل الراحة للمواطنين والمنتفعين بمحافظة سوهاج.
              </p>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>رعاية واعية لخدمة ورضا المواطنين والمنتفعين</span>
            </div>
          </div>

          {/* Card 2: مدير إدارة النظم والمعلومات */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-blue-200 dark:border-blue-800/60 p-6 sm:p-7 shadow-lg shadow-blue-500/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200">
                  <Cpu className="w-3.5 h-3.5 text-blue-600" />
                  إدارة النظم والتحول الرقمي
                </span>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shadow-inner">
                  <Cpu className="w-6 h-6" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  مدير إدارة النظم والمعلومات والتحول الرقمي
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  مهندس / مصطفى خلف
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                التخطيط الاستراتيجي ومتابعة ميكنة المنظومات والربط الشبكي لكافة المستشفيات والعيادات واللجان الطبية التابعة لفرع سوهاج.
              </p>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>إشراف وتنسيق استراتيجيات التحول الرقمي</span>
            </div>
          </div>

          {/* Card 3: رئيس قسم IT */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-teal-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-teal-200 dark:border-teal-800/60 p-6 sm:p-7 shadow-lg shadow-teal-500/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  تكنولوجيا المعلومات والدعم الفني
                </span>
                <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  رئيس قسم تكنولوجيا المعلومات (Head of IT)
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  مهندس / صفوت الجزيري
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                الإشراف الفني وإدارة استقرار الشبكات والسيرفرات والدعم التقني المستمر لجميع فرق العمل والأطقم الطبية والإدارية.
              </p>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>إدارة البنية التحتية والتشغيل الفني للسيرفرات</span>
            </div>
          </div>

          {/* Card 4: المطور ومبرمج البوابة */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-emerald-300 dark:border-emerald-700/60 p-6 sm:p-7 shadow-lg shadow-emerald-500/10 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200">
                  <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                  هندسة وتطوير البرمجيات
                </span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-inner">
                  <Code2 className="w-6 h-6" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1 font-bold">
                  مطور ومهندس البوابة الرقمية (Lead Software Engineer)
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  مهندس / إسلام أبو اليزيد
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                تصميم وبرمجة وتطوير تطبيق الحجز وتطبيقات الـ PWA، وأنظمة النوافذ الذكية وتجربة المستخدم السريعة والميسرة لكافة المواطنين.
              </p>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>تطوير وبرمجة بأحدث تقنيات الويب المتقدمة</span>
            </div>
          </div>
        </div>

        {/* Mission / Goal Statement */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl space-y-3 text-center">
          <h4 className="text-base sm:text-lg font-bold text-emerald-300 flex items-center justify-center gap-2">
            <HeartHandshake className="w-5 h-5" />
            صحتك أمانة بين إيدينا
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            تم إطلاق هذا التطبيق للتيسير على أهالينا بمحافظة سوهاج في حجز مواعيد العيادات دون أي عناء أو انتظار، متمنين للجميع دوام الصحة والعافية.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          الهيئة العامة للتأمين الصحي - فرع سوهاج
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          تطبيق حجز العيادات الإلكتروني للمواطنين والمنتفعين
        </p>
      </footer>
    </div>
  );
}
