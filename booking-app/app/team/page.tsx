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
  Sparkles,
  Wifi,
  Coins,
  Network,
  Users2,
  ChevronDown
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
        title: "الهيكل التنظيمي وقيادات فرع سوهاج للتأمين الصحي",
        text: "لوحة الشرف وفريق عمل تطبيق حجز التأمين الصحي بفرع سوهاج",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-bold border border-emerald-200/60 dark:border-slate-700 transition transform active:scale-95 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-8 sm:py-12 w-full flex-grow space-y-12">
        {/* Header Hero with Badge */}
        <section className="text-center flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-600 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white p-2 shadow-2xl flex items-center justify-center border-4 border-slate-100 dark:border-slate-800">
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

          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 dark:bg-red-950/70 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-300 text-xs font-extrabold shadow-sm">
              <HeartHandshake className="w-3.5 h-3.5" />
              صحتك أمانة بين إيدينا
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              الهيئة العامة للتأمين الصحي
            </h1>
            <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              فرع سوهاج للتأمين الصحي
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              الهيكل الإداري والتنظيمي لمنظومة حجز العيادات الإلكترونية والخدمات الرقمية للمنتفعين
            </p>
          </div>
        </section>

        {/* HIERARCHICAL TREE STRUCTURE */}
        <section className="relative space-y-8">
          {/* LEVEL 1: قمة الهرم - مدير عام الفرع */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-bold mb-3">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              المستوى القيادي الأول • الإشراف والرعاية العامة
            </div>

            <div className="w-full max-w-xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-amber-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/20 border-2 border-amber-400/60 dark:border-amber-600/50 p-6 sm:p-7 shadow-xl shadow-amber-500/10 text-center flex flex-col items-center hover:scale-[1.01] transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3">
                <Building2 className="w-7 h-7" />
              </div>

              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                مدير عام فرع سوهاج للتأمين الصحي
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-snug">
                دكتور / محمد خلف عفيفي
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 max-w-md">
                قيادة ودعم مسيرة التيسير على المواطنين والمنتفعين بسوهاج عبر ميكنة وتسهيل حجز العيادات الطبية دون أي عناء أو انتظار.
              </p>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-2">
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-emerald-500" />
              <ChevronDown className="w-4 h-4 text-emerald-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 2: مدير الإدارة + مدير مالي وإداري جنباً إلى جنب */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold mb-4">
              <Users2 className="w-3.5 h-3.5 text-blue-500" />
              المستوى الثاني • الإدارة التنفيذية والمالية والإدارية
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Card 2A: مدير إدارة النظم والمعلومات */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-800/70 p-5 sm:p-6 shadow-lg shadow-emerald-500/5 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                      إدارة النظم والمعلومات
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      مدير إدارة النظم والمعلومات والتحول الرقمي
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      مهندس / مصطفى خلف
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    التخطيط الاستراتيجي ومتابعة ميكنة المنظومات والربط الشبكي لكافة المستشفيات واللجان والعيادات التابعة للفرع.
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>تخطيط واستراتيجيات الميكنة والربط</span>
                </div>
              </div>

              {/* Card 2B: مدير الشئون المالية والإدارية (معتز بالله حمادي) */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800/70 p-5 sm:p-6 shadow-lg shadow-indigo-500/5 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      <Coins className="w-3.5 h-3.5 text-indigo-600" />
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                      <Coins className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      مدير الشئون المالية والإدارية بفرع سوهاج
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      أستاذ / معتز بالله حمادي
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    الإشراف الإداري والمالي ودعم توفير الموارد اللوجستية وتيسير متطلبات الميكنة والتحول الرقمي بالفرع.
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>دعم وتمكين إداري ومالي مستمر</span>
                </div>
              </div>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-2">
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-teal-500" />
              <ChevronDown className="w-4 h-4 text-teal-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 3: رئيس قسم تكنولوجيا المعلومات (صفوت الجزيري) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[11px] font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              المستوى الثالث • رئاسة تكنولوجيا المعلومات والبنية التحتية
            </div>

            <div className="w-full max-w-xl relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-300 dark:border-teal-800/70 p-6 sm:p-7 shadow-lg shadow-teal-500/5 hover:border-teal-500 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md mb-2.5">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
                رئيس قسم تكنولوجيا المعلومات (Head of IT)
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                مهندس / صفوت الجزيري
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 max-w-md">
                الإشراف الفني وإدارة استقرار السيرفرات والشبكات والدعم التقني المباشر لجميع الأطقم الطبية والإدارية بالفرع.
              </p>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-2">
              <div className="w-0.5 h-6 bg-gradient-to-b from-teal-500 to-emerald-500" />
              <ChevronDown className="w-4 h-4 text-emerald-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 4: فريق التطوير والشبكات (إسلام أبو اليزيد + سماح القاضي) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold mb-4">
              <Network className="w-3.5 h-3.5 text-emerald-500" />
              المستوى الرابع • فريق هندسة البرمجيات والشبكات والإنترنت
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Card 4A: مهندس إسلام أبو اليزيد (المطور) */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-emerald-400 dark:border-emerald-700 p-5 sm:p-6 shadow-xl shadow-emerald-500/10 hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                      هندسة وتطوير البرمجيات
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                      <Code2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      مطور ومهندس البوابة الرقمية (Lead Software Engineer)
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      مهندس / إسلام أبو اليزيد
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    تصميم وبرمجة وتطوير تطبيق الحجز وتطبيقات الـ PWA، ومحرك فحص حالة السيرفرات وتجربة المستخدم الذكية لكافة المواطنين.
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>تطوير وبرمجة بأحدث تقنيات الويب الحديثة</span>
                </div>
              </div>

              {/* Card 4B: مهندسة سماح القاضي (مسؤول الإنترنت والشبكات) */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-cyan-50/40 dark:from-slate-900 dark:to-slate-800/80 border-2 border-cyan-400 dark:border-cyan-700 p-5 sm:p-6 shadow-xl shadow-cyan-500/10 hover:border-cyan-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300">
                      <Wifi className="w-3.5 h-3.5 text-cyan-600" />
                      إدارة الإنترنت والشبكات
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 flex items-center justify-center">
                      <Wifi className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400">
                      مسؤول شبكات الإنترنت والاتصالات بالفرع
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      مهندسة / سماح القاضي
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    إدارة ومتابعة خطوط الربط وشبكات الإنترنت، وضمان استقرار الاتصال بالمنظومات وسيرفرات الحجز الإلكتروني.
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>ضمان استقرار خطوط الربط والاتصال الشبكي</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Card */}
        <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white shadow-2xl border border-emerald-800/40 text-center space-y-3">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <h4 className="text-base sm:text-lg font-bold text-emerald-300 flex items-center justify-center gap-2">
            <HeartHandshake className="w-5 h-5 text-red-400" />
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
          لوحة الشرف وفريق العمل بالبوابة الإلكترونية الموحدة
        </p>
      </footer>
    </div>
  );
}
