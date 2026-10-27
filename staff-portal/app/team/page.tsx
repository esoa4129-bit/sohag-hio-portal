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
  ChevronDown,
  Search,
  User,
  Stethoscope,
  Phone,
  Crown
} from "lucide-react";
import { FACILITIES, TeamMember, BRANCH_CORE_LEADERSHIP } from "./facilities";

export default function TeamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string>("hilal");
  const [searchQuery, setSearchQuery] = useState("");
  const [customMembers, setCustomMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("sohag_hio_staff_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const loadCustomMembers = () => {
      try {
        const saved = localStorage.getItem("sohag_hio_custom_team_members");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Filter out any dummy placeholder IDs if they exist
            const clean = parsed.filter(
              (m: TeamMember) =>
                !m.id.startsWith("dummy-") &&
                !["hilal-1","hilal-2","hilal-3","hilal-4","hilal-5","tahta-1","tahta-2","girga-1","girga-2","akhmim-1","balyana-1","centers-1","centers-2","core-1","core-2","core-3","core-4","core-5","core-6"].includes(m.id)
            );
            setCustomMembers(clean);
          }
        }
      } catch (e) {
        console.error("Failed to load custom team members:", e);
      }
    };

    loadCustomMembers();

    const handleStorageChange = () => {
      loadCustomMembers();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "الهيكل التنظيمي وفريق العمل بفرع سوهاج للتأمين الصحي",
        text: "لوحة الشرف وأطقم العمل والمستشفيات بالبوابة الرقمية لفرع سوهاج للتأمين الصحي",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentFacilityInfo = FACILITIES.find((f) => f.id === selectedFacility) || FACILITIES[1];

  // Custom members for the active facility
  const activeFacilityMembers = customMembers.filter((m) => {
    const matchesFacility = selectedFacility === "all" ? true : m.facility === selectedFacility;
    const matchesSearch =
      searchQuery === ""
        ? true
        : m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (m.department && m.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (m.bio && m.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFacility && matchesSearch;
  });

  const facilityTopTier = activeFacilityMembers.filter((m) => m.hierarchyLevel === "top");
  const facilityHeadTier = activeFacilityMembers.filter((m) => m.hierarchyLevel === "head");
  const facilityMemberTier = activeFacilityMembers.filter((m) => !m.hierarchyLevel || m.hierarchyLevel === "member");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <Link
            href="/"
            prefetch={false}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-800 dark:text-sky-200 text-xs sm:text-sm font-bold border border-sky-200/60 dark:border-slate-700 transition transform active:scale-95 shadow-sm"
          >
            <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>العودة للبوابة الرئيسية</span>
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
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 w-full flex-grow space-y-10 sm:space-y-14">
        {/* Header Hero with Badge */}
        <section className="text-center flex flex-col items-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 via-amber-500 to-sky-600 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500" />
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-2xl flex items-center justify-center border-4 border-slate-100 dark:border-slate-800">
              <Image
                src="/logo.png"
                alt="شعار الهيئة العامة للتأمين الصحي - فرع سوهاج"
                width={120}
                height={120}
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
            <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
              فرع سوهاج للتأمين الصحي
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
              الهيكل التنظيمي والهرم الإداري لأطقم العمل والمستشفيات والعيادات التابعة للفرع
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 1. PERMANENT CORE LEADERSHIP PYRAMID (فرع سوهاج للتأمين الصحي - أول شيء) */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="relative space-y-8 p-6 sm:p-8 rounded-[2rem] bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 shadow-xl">
          <div className="text-center space-y-1 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-sky-500/20 text-slate-800 dark:text-slate-200 border border-amber-500/30 text-xs font-black shadow-sm">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>قيادات التحول الرقمي والإدارة العليا بفرع سوهاج</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
              الهرم القيادي والإداري لفرع سوهاج
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              فريق العمل الرئيسي المشرف على إدارة وتطوير المنظومات والمستشفيات
            </p>
          </div>

          {/* LEVEL 1: قمة الهرم - دكتور محمد خلف عفيفي */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-[11px] font-bold mb-3 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              المستوى القيادي الأول • الإشراف والرعاية العامة
            </div>

            <div className="w-full max-w-xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/20 border-2 border-amber-400/80 dark:border-amber-600/70 p-6 sm:p-7 shadow-xl shadow-amber-500/10 text-center flex flex-col items-center hover:scale-[1.01] transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 mb-3">
                <Building2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                مدير عام الفرع
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                دكتور / محمد خلف عفيفي
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 max-w-md">
                الإشراف والرعاية العامة لمسيرة التطوير الشامل
              </p>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-3">
              <div className="w-0.5 h-7 bg-gradient-to-b from-amber-400 to-sky-500" />
              <ChevronDown className="w-4 h-4 text-sky-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 2: مدير الإدارة + مدير مالي وإداري (مصطفى خلف + معتز بالله فاروق حمادي) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold mb-4 shadow-sm">
              <Users2 className="w-3.5 h-3.5 text-blue-500" />
              المستوى الثاني • الإدارة التنفيذية والمالية والإدارية
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Card 2A: مهندس مصطفى خلف */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800/70 p-5 sm:p-6 shadow-lg shadow-sky-500/5 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                      <Cpu className="w-3.5 h-3.5 text-sky-600" />
                      إدارة النظم والمعلومات
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      مدير إدارة النظم والمعلومات
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      مهندس / مصطفى خلف
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    التخطيط الاستراتيجي ومتابعة المنظومات والربط
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>تخطيط واستراتيجيات الميكنة والربط</span>
                </div>
              </div>

              {/* Card 2B: أستاذ معتز بالله فاروق حمادي */}
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
                      مدير الشئون المالية والإدارية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      أستاذ / معتز بالله فاروق حمادي
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    الإشراف الإداري والمالي ودعم متطلبات الميكنة
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>دعم وتمكين إداري ومالي مستمر</span>
                </div>
              </div>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-3">
              <div className="w-0.5 h-7 bg-gradient-to-b from-blue-500 to-teal-500" />
              <ChevronDown className="w-4 h-4 text-teal-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 3: رئيس قسم تكنولوجيا المعلومات (صفوت الجزيري) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[11px] font-bold mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              المستوى الثالث • رئاسة تكنولوجيا المعلومات والبنية التحتية
            </div>

            <div className="w-full max-w-xl relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-300 dark:border-teal-800/70 p-6 sm:p-7 shadow-lg shadow-teal-500/5 hover:border-teal-500 transition-all duration-300 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-md mb-2.5">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-1">
                رئيس قسم تكنولوجيا المعلومات
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                مهندس / صفوت الجزيري
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 max-w-md">
                الإشراف الفني واستقرار السيرفرات والبنية التحتية
              </p>
            </div>

            {/* Tree Connector Line */}
            <div className="flex flex-col items-center my-3">
              <div className="w-0.5 h-7 bg-gradient-to-b from-teal-500 to-emerald-500" />
              <ChevronDown className="w-4 h-4 text-emerald-500 -mt-1" />
            </div>
          </div>

          {/* LEVEL 4: فريق التطوير والشبكات (إسلام أبو اليزيد + سماح القاضي) */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold mb-4 shadow-sm">
              <Network className="w-3.5 h-3.5 text-emerald-500" />
              المستوى الرابع • فريق هندسة البرمجيات والشبكات والإنترنت
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Card 4A: مهندس إسلام أبو اليزيد */}
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
                      مطور ومهندس البوابة الرقمية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      مهندس / إسلام أبو اليزيد
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    تصميم وتطوير البوابات وتطبيقات الويب الذكية
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>تطوير وبرمجة بأحدث تقنيات الويب الحديثة</span>
                </div>
              </div>

              {/* Card 4B: مهندسة سماح القاضي */}
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
                      مسؤول شبكات الإنترنت والاتصالات
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                      مهندسة / سماح القاضي
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    متابعة خطوط الربط وشبكات الإنترنت واستقرار الاتصال
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

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* 2. HOSPITAL & CLINIC TABS (المستشفيات والمراكز التابعة)                 */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              🏥 أطقم عمل مستشفيات ومراكز التأمين الصحي بسوهاج
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              اختر المستشفى أو المركز لعرض فريق العمل والأطباء المضافين بكل منشأة
            </p>
          </div>

          {/* Search box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الوظيفة، أو المستشفى..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Hospital Navigation Deck - Responsive & No ugly scrollbars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {FACILITIES.map((fac) => {
              const isActive = selectedFacility === fac.id;
              const count = customMembers.filter((m) => m.facility === fac.id).length;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac.id)}
                  className={`group relative overflow-hidden flex flex-col items-center justify-between text-center p-3 sm:p-4 rounded-2xl transition-all duration-300 border ${
                    isActive
                      ? "bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white shadow-xl shadow-sky-600/30 border-sky-400 scale-[1.02] ring-2 ring-sky-400/50"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-sky-50/70 dark:hover:bg-slate-800/80 border-slate-200/90 dark:border-slate-800 hover:border-sky-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-2xl sm:text-3xl filter drop-shadow-sm">{fac.icon}</span>
                    {count > 0 ? (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black font-mono shadow-sm ${isActive ? "bg-white/20 text-white" : "bg-sky-100 dark:bg-slate-800 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-slate-700"}`}>
                        {count} عضو
                      </span>
                    ) : (
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white/10 text-sky-100" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}>
                        متاح
                      </span>
                    )}
                  </div>
                  
                  <div className="w-full space-y-0.5">
                    <span className={`text-xs sm:text-sm font-black block leading-tight ${isActive ? "text-white" : "text-slate-800 dark:text-slate-100"}`}>
                      {fac.name}
                    </span>
                    <span className={`text-[10px] block line-clamp-1 opacity-75 ${isActive ? "text-sky-100" : "text-slate-400 dark:text-slate-500"}`}>
                      {fac.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Facility Header Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentFacilityInfo.icon}</span>
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {currentFacilityInfo.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentFacilityInfo.desc}
                </p>
              </div>
            </div>

            <div className="text-left shrink-0">
              <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold font-mono">
                {activeFacilityMembers.length} عضو
              </span>
            </div>
          </div>

          {/* Custom Members in Hierarchical Layout */}
          {activeFacilityMembers.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-2xl">
                {currentFacilityInfo.icon}
              </div>
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                لا يوجد أعضاء مضافون حالياً في هذا القسم
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                يمكن إضافة أطباء وكوادر هذه المنشأة من لوحة التحكم لتظهر في هذا التبويب فوراً.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Level 1: Top Tier of Facility */}
              {facilityTopTier.length > 0 && (
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-bold mb-3">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>إدارة المنشأة • قمة الهرم</span>
                  </div>

                  <div className={`grid gap-4 w-full justify-center ${facilityTopTier.length === 1 ? "max-w-xl" : "grid-cols-1 md:grid-cols-2"}`}>
                    {facilityTopTier.map((member) => (
                      <div
                        key={member.id}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/20 border-2 border-amber-400/70 dark:border-amber-600/60 p-5 sm:p-6 shadow-lg shadow-amber-500/5 text-center flex flex-col items-center"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-amber-500/50 p-0.5 shadow-md mb-2 relative flex items-center justify-center">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover rounded-xl" />
                          ) : (
                            <User className="w-8 h-8 text-amber-600" />
                          )}
                        </div>

                        {member.badge && (
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500 text-white mb-1">
                            {member.badge}
                          </span>
                        )}

                        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                          {member.role}
                        </span>

                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                          {member.name}
                        </h4>

                        {member.department && (
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                            {member.department}
                          </span>
                        )}

                        {member.bio && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2 max-w-md">
                            {member.bio}
                          </p>
                        )}

                        {member.phone && (
                          <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/50 flex items-center gap-1.5 text-xs text-slate-600 font-mono" dir="ltr">
                            <Phone className="w-3.5 h-3.5 text-amber-600" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {(facilityHeadTier.length > 0 || facilityMemberTier.length > 0) && (
                    <div className="flex flex-col items-center my-3">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-amber-400 to-sky-500" />
                      <ChevronDown className="w-4 h-4 text-sky-500 -mt-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Level 2: Head Tier of Facility */}
              {facilityHeadTier.length > 0 && (
                <div className="flex flex-col items-center">
                  <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-[11px] font-bold mb-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>رؤساء الأقسام واللجان</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {facilityHeadTier.map((member) => (
                      <div
                        key={member.id}
                        className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800/70 p-5 shadow-sm flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                              {member.badge || member.department || "رئيس قسم"}
                            </span>
                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-sky-100 dark:bg-sky-950 text-sky-700 flex items-center justify-center">
                              {member.photoUrl ? (
                                <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                              ) : (
                                <ShieldCheck className="w-5 h-5" />
                              )}
                            </div>
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{member.role}</p>
                            <h5 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">{member.name}</h5>
                            {member.department && (
                              <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">{member.department}</p>
                            )}
                          </div>

                          {member.bio && (
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                              {member.bio}
                            </p>
                          )}
                        </div>

                        {member.phone && (
                          <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-slate-500 font-mono" dir="ltr">
                            <Phone className="w-3.5 h-3.5 text-sky-600" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {facilityMemberTier.length > 0 && (
                    <div className="flex flex-col items-center my-3">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-teal-500" />
                      <ChevronDown className="w-4 h-4 text-teal-500 -mt-1" />
                    </div>
                  )}
                </div>
              )}

              {/* Level 3: Members / Operational */}
              {facilityMemberTier.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h5 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-teal-600" />
                      <span>الأطقم الطبية والإدارية ({facilityMemberTier.length})</span>
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {facilityMemberTier.map((member) => (
                      <div
                        key={member.id}
                        className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between space-y-2 hover:border-teal-500/50 transition"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-teal-500/30 shrink-0 flex items-center justify-center">
                            {member.photoUrl ? (
                              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-6 h-6 text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0 flex-1 space-y-0.5">
                            {member.badge && (
                              <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                                {member.badge}
                              </span>
                            )}
                            <h6 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                              {member.name}
                            </h6>
                            <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate">
                              {member.role}
                            </p>
                            {member.department && (
                              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                {member.department}
                              </p>
                            )}
                          </div>
                        </div>

                        {member.bio && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 border-t border-slate-100 dark:border-slate-800 pt-2">
                            {member.bio}
                          </p>
                        )}

                        {member.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono pt-1" dir="ltr">
                            <Phone className="w-3 h-3 text-teal-600" />
                            <span>{member.phone}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Vision & Mission Card */}
        <section className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-950 via-slate-900 to-blue-950 text-white shadow-2xl border border-sky-800/40 text-center space-y-3">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <h4 className="text-base sm:text-lg font-bold text-sky-300 flex items-center justify-center gap-2">
            <HeartHandshake className="w-5 h-5 text-red-400" />
            رسالة وميثاق فريق العمل بفرع سوهاج
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
            تتضافر جهود قيادات وأطقم العمل بفرع سوهاج للتأمين الصحي لتقديم أفضل بيئة عمل إلكترونية متطورة تدعم اتخاذ القرار وتيسر على المواطنين تلقي الخدمات العلاجية بأعلى معايير الدقة والسرعة.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          الهيئة العامة للتأمين الصحي - فرع سوهاج
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          الهيكل التنظيمي وفريق العمل بالبوابة الإلكترونية الموحدة والمستشفيات التابعة
        </p>
      </footer>
    </div>
  );
}
