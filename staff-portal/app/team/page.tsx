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
  Crown,
  ExternalLink,
  MapPin,
  Globe,
  Briefcase
} from "lucide-react";
import { FACILITIES, TeamMember, BRANCH_CORE_LEADERSHIP, INITIAL_FACILITY_LEADERSHIP } from "./facilities";

export default function TeamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customMembers, setCustomMembers] = useState<TeamMember[]>(INITIAL_FACILITY_LEADERSHIP);
      
  useEffect(() => {
    const savedTheme = localStorage.getItem("sohag_hio_staff_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const mergeWithDefaults = (list: TeamMember[]): TeamMember[] => {
      const map = new Map<string, TeamMember>();
      for (const m of INITIAL_FACILITY_LEADERSHIP) {
        map.set(m.id, m);
      }
      for (const m of list) {
        const initial = map.get(m.id);
        map.set(m.id, {
          ...m,
          photoUrl: m.photoUrl || initial?.photoUrl,
        });
      }
      return Array.from(map.values());
    };

    // Auto-invalidate stale cache if team version changed
    const CURRENT_VERSION = "2026-11-08-v2";
    try {
      if (typeof window !== "undefined") {
        const savedVer = localStorage.getItem("sohag_hio_team_version");
        if (savedVer !== CURRENT_VERSION) {
          localStorage.removeItem("sohag_hio_custom_team_members");
          localStorage.setItem("sohag_hio_team_version", CURRENT_VERSION);
        }
      }
    } catch {}

    const loadCustomMembers = () => {
      try {
        // 1. Check if sync payload passed in URL (e.g. from QR or direct sync link)
        if (typeof window !== "undefined") {
          const params = new URLSearchParams(window.location.search);
          const syncData = params.get("sync");
          if (syncData) {
            try {
              const decoded = JSON.parse(decodeURIComponent(escape(atob(syncData))));
              if (Array.isArray(decoded)) {
                const merged = mergeWithDefaults(decoded);
                setCustomMembers(merged);
                localStorage.setItem("sohag_hio_custom_team_members", JSON.stringify(merged));
                // Also sync to server API
                fetch("/api/team-members", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(merged),
                }).catch(() => {});
                return;
              }
            } catch (err) {
              console.error("Sync data parse error:", err);
            }
          }
        }

        // 2. Load from localStorage (instant cache)
        const saved = localStorage.getItem("sohag_hio_custom_team_members");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const clean = parsed.filter((m: TeamMember) => !m.id.startsWith("dummy-"));
            const merged = mergeWithDefaults(clean);
            setCustomMembers(merged);
          }
        }

        // 3. Always fetch latest from server API (ensures mobile gets PC data)
        fetch("/api/team-members", { cache: "no-store" })
          .then((res) => res.json())
          .then((serverData) => {
            if (Array.isArray(serverData) && serverData.length > 0) {
              const cleanServer = serverData.filter((m: TeamMember) => !m.id.startsWith("dummy-"));
              const mergedServer = mergeWithDefaults(cleanServer);
              setCustomMembers((prev) => {
                if (mergedServer.length >= prev.length) {
                  try {
                    localStorage.setItem("sohag_hio_custom_team_members", JSON.stringify(mergedServer));
                  } catch {}
                  return mergedServer;
                }
                return prev;
              });
            }
          })
          .catch(() => {});
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

            <div className="w-full max-w-xl relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/20 border-2 border-amber-400/80 dark:border-amber-600/70 p-6 sm:p-8 shadow-2xl shadow-amber-500/15 text-center flex flex-col items-center hover:scale-[1.01] transition-all duration-300">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl shadow-amber-500/30 mb-4 relative flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <img
                  src="/team/mohamed-khalaf-afifi.jpg"
                  alt="دكتور / محمد خلف عفيفي"
                  className="w-full h-full object-cover object-center"
                />
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
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800/70 p-5 sm:p-6 shadow-xl shadow-sky-500/5 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                      <Cpu className="w-3.5 h-3.5 text-sky-600" />
                      إدارة النظم والمعلومات
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-xl shrink-0 bg-sky-100 dark:bg-sky-950">
                      <img
                        src="/team/mostafa-khalaf.jpg"
                        alt="مهندس / مصطفى خلف"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      مدير إدارة النظم والمعلومات
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
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
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800/70 p-5 sm:p-6 shadow-xl shadow-indigo-500/5 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      <Coins className="w-3.5 h-3.5 text-indigo-600" />
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shrink-0 bg-indigo-100 dark:bg-indigo-950">
                      <img
                        src="/team/moataz-hammadi.jpg"
                        alt="أستاذ / معتز بالله فاروق حمادي"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      مدير الشئون المالية والإدارية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
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

          {/* LEVEL 3: صفوت الجزيري ورئاسة تكنولوجيا المعلومات والشئون الإدارية والبوابة الإلكترونية */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-[11px] font-bold mb-4 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              المستوى الثالث • رئاسة تكنولوجيا المعلومات والشئون الإدارية والبوابة الإلكترونية
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
              {/* Card 3A (على يمين صفوت): مهندس محمد عبد الحميد */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800/70 p-5 sm:p-6 shadow-xl shadow-sky-500/5 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                      <Globe className="w-3.5 h-3.5 text-sky-600" />
                      البوابة الإلكترونية
                    </span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-xl shrink-0 bg-sky-100 dark:bg-sky-950">
                      <img
                        src="/team/mohamed-abdelhamid.jpg"
                        alt="مهندس / محمد عبد الحميد"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      مسئول البوابة الإلكترونية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      مهندس / محمد عبد الحميد
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    متابعة وتشغيل وتحديث منصة البوابة الإلكترونية لفرع سوهاج
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>إدارة المحتوى والتحول الرقمي</span>
                </div>
              </div>

              {/* Card 3B (في الوسط): مهندس صفوت الجزيري */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-400 dark:border-teal-700 p-5 sm:p-6 shadow-xl shadow-teal-500/10 hover:border-teal-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                      تكنولوجيا المعلومات
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-teal-400 shadow-xl shrink-0 bg-teal-100 dark:bg-teal-950">
                      <img
                        src="/team/safwat-elgeziri-v2.jpg?v=20261108"
                        alt="مهندس / صفوت الجزيري"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      رئيس قسم تكنولوجيا المعلومات
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      مهندس / صفوت الجزيري
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    الإشراف الفني واستقرار السيرفرات والبنية التحتية
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>استقرار السيرفرات والشبكات المركزية</span>
                </div>
              </div>

              {/* Card 3C (على شمال صفوت): أستاذ محمد فوزي */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-800/70 p-5 sm:p-6 shadow-lg shadow-indigo-500/5 hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      الشئون الإدارية
                    </span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shrink-0 bg-indigo-100 dark:bg-indigo-950">
                      <img
                        src="/team/mohamed-fawzy.jpg"
                        alt="أستاذ / محمد فوزي"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      رئيس الشئون الإدارية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                      أستاذ / محمد فوزي
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                    التنظيم الإداري والخدمات المعاونة برئاسة الفرع
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>التنسيق والمساندة الإدارية الشاملة</span>
                </div>
              </div>
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <Code2 className="w-3.5 h-3.5 text-emerald-600" />
                      هندسة وتطوير البرمجيات
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-lg shrink-0 bg-emerald-100 dark:bg-emerald-950">
                      <img
                        src="/team/eslam-aboelyazid.jpg"
                        alt="مهندس / إسلام أبو اليزيد"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      مطور ومهندس البوابة الرقمية
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
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
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300">
                      <Wifi className="w-3.5 h-3.5 text-cyan-600" />
                      إدارة الإنترنت والشبكات
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 border-2 border-cyan-400/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center shadow-lg shrink-0">
                      <Wifi className="w-8 h-8" />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400">
                      مسؤول شبكات الإنترنت والاتصالات
                    </p>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
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

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* FEATURED: قيادات مستشفى الهلال للتأمين الصحي بسوهاج (المستشفى الرئيسي والجراحي) */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t-2 border-slate-200/80 dark:border-slate-800 space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/30 text-xs font-black shadow-sm">
                <Building2 className="w-4 h-4 text-red-500" />
                <span>المستشفى الرئيسي والجراحي للفرع</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                قيادات مستشفى الهلال للتأمين الصحي بسوهاج
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                إدارة الصرح الطبي الأكبر والجراحي التابع لفرع سوهاج للتأمين الصحي
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
              {/* Card 1: دكتور محمد خالد */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-red-300 dark:border-red-900/60 p-5 shadow-lg shadow-red-500/5 hover:border-red-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                      مدير المستشفى
                    </span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-red-100 dark:bg-red-950/70 border-2 border-red-400/80 text-red-700 dark:text-red-300 flex items-center justify-center shadow-lg shrink-0">
                      <Building2 className="w-10 h-10" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">إدارة مستشفى الهلال</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتور / محمد خالد
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف الطبي والإداري العام على مستشفى الهلال والأقسام الجراحية والرعايات
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-600 dark:text-red-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>إدارة المستشفى العام</span>
                </div>
              </div>

              {/* Card 2: دكتور أحمد حسني */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900/60 p-5 shadow-lg shadow-rose-500/5 hover:border-rose-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                      الشئون العلاجية
                    </span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-rose-100 dark:bg-rose-950/70 border-2 border-rose-400/80 text-rose-700 dark:text-rose-300 flex items-center justify-center shadow-lg shrink-0">
                      <Award className="w-10 h-10" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير الشئون العلاجية</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتور / أحمد حسني
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    متابعة البروتوكولات العلاجية والأطقم الطبية وجودة الخدمات السريرية
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف العلاجي والسريري</span>
                </div>
              </div>

              {/* Card 3: أستاذ أشرف الجندي */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-700/80 p-5 shadow-xl shadow-amber-500/10 hover:border-amber-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shrink-0 bg-amber-100 dark:bg-amber-950">
                      <img
                        src="/team/ashraf-elgendy.jpg"
                        alt="أستاذ / أشرف الجندي"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير مالي وإداري</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / أشرف الجندي
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    التنظيم الإداري وتوفير الموارد والمستلزمات لدعم المستشفى والأقسام الطبية
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف المالي والإداري بالمستشفى</span>
                </div>
              </div>

              {/* Card 4: أستاذ شريف محرزي */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-700/80 p-5 shadow-xl shadow-sky-500/10 hover:border-sky-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                      إدارة شئون المرضى
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-sky-400 shadow-xl shrink-0 bg-sky-100 dark:bg-sky-950">
                      <img
                        src="/team/sherif-mehrezi.jpg"
                        alt="أستاذ / شريف محرزي"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير إدارة شئون المرضى</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / شريف محرزي
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    تسهيل إجراءات دخول وخروج المرضى وتذليل كافة العقبات لمنتفعي التأمين الصحي
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>خدمة المنتفعين ورعاية المرضى</span>
                </div>
              </div>

              {/* Card 5: أستاذ أحمد حسن */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-700/80 p-5 shadow-xl shadow-indigo-500/10 hover:border-indigo-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      مكتب مدير المستشفى
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shrink-0 bg-indigo-100 dark:bg-indigo-950">
                      <img
                        src="/team/ahmed-hassan.jpg"
                        alt="أستاذ / أحمد حسن"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير مكتب مدير المستشفى</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / أحمد حسن
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    التنسيق الإداري والمتابعة المباشرة لمكتب الإدارة ودعم سير العمل بمستشفى الهلال
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>المتابعة والتنسيق الإداري لمكتب المدير</span>
                </div>
              </div>

            </div>
          </div>
        

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* FEATURED: قيادات منطقة سوهاج للتأمين الصحي                              */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t-2 border-slate-200/80 dark:border-slate-800 space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/30 text-xs font-black shadow-sm">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>إدارة منطقة سوهاج والمتابعة التأمينية</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                قيادات منطقة سوهاج للتأمين الصحي
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                المتابعة الميدانية والإشراف الإداري والمالي على الوحدات التأمينية بالمنطقة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
              {/* Card 1: دكتور محمد عصمت */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-300 dark:border-blue-900/60 p-5 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      مدير المنطقة
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-xl shrink-0 bg-blue-100 dark:bg-blue-950">
                      <img
                        src="/team/mohamed-esmat.jpg"
                        alt="دكتور / محمد عصمت"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">إدارة منطقة سوهاج</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتور / محمد عصمت
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    المتابعة الميدانية والإشراف الطبي العام على كافة العيادات والوحدات التأمينية بمنطقة سوهاج
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف العام على منطقة سوهاج</span>
                </div>
              </div>

              {/* Card 2: أستاذ خالد حمادي */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-300 dark:border-indigo-900/60 p-5 shadow-lg shadow-indigo-500/5 hover:border-indigo-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300">
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-indigo-400 shadow-xl shrink-0 bg-indigo-100 dark:bg-indigo-950">
                      <img
                        src="/team/khaled-hammadi.jpg"
                        alt="أستاذ / خالد حمادي"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير مالي وإداري</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / خالد حمادي
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف المالي والإداري والمتابعة اللوجستية وتيسير العمل بوحدات منطقة سوهاج
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف المالي والإداري بالمنطقة</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* FEATURED: قيادات العيادات التخصصية واللجان الطبية                       */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t-2 border-slate-200/80 dark:border-slate-800 space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/30 text-xs font-black shadow-sm">
                <Stethoscope className="w-4 h-4 text-teal-500" />
                <span>العيادات التخصصية واللجان الطبية الفرعية</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                قيادات العيادات التخصصية واللجان الطبية بسوهاج
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                إدارة العيادات التخصصية وأعمال اللجان الطبية الفرعية وخدمة المراجعين
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
              {/* Card 1: دكتور شريف طلعت أبوزيد */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-300 dark:border-teal-900/60 p-5 shadow-lg shadow-teal-500/5 hover:border-teal-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                      مدير العيادات التخصصية
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-teal-400 shadow-xl shrink-0 bg-teal-100 dark:bg-teal-950">
                      <img
                        src="/team/sherif-talaat.jpg"
                        alt="دكتور / شريف طلعت أبوزيد"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">إدارة العيادات التخصصية</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتور / شريف طلعت أبوزيد
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف الطبي العام على منظومة العيادات التخصصية واللجان الطبية والخدمات العلاجية
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-teal-600 dark:text-teal-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف العام على العيادات واللجان</span>
                </div>
              </div>

              {/* Card 2: أستاذ رفعت عمار */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-300 dark:border-amber-900/60 p-5 shadow-lg shadow-amber-500/5 hover:border-amber-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl shrink-0 bg-amber-100 dark:bg-amber-950">
                      <img
                        src="/team/refaat-ammar.jpg"
                        alt="أستاذ / رفعت عمار"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير مالي وإداري</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / رفعت عمار
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف المالي والإداري وتوفير المستلزمات ودعم سير العمل بالعيادات التخصصية
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف المالي والإداري بالعيادات</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* FEATURED: قيادات مجمع عيادات العاشر من رمضان                            */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <div className="pt-6 border-t-2 border-slate-200/80 dark:border-slate-800 space-y-5">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black shadow-sm">
                <Building2 className="w-4 h-4 text-emerald-500" />
                <span>مجمع عيادات العاشر من رمضان واللجنة العامة</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                قيادات مجمع عيادات العاشر من رمضان
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                إدارة أكبر مجمعات العيادات التخصصية وأعمال اللجنة الطبية العامة بسوهاج
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
              {/* Card 1: دكتورة شهرت القاضي */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-900/60 p-5 shadow-lg shadow-emerald-500/5 hover:border-emerald-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      مدير المجمع
                    </span>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-400 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-lg shrink-0">
                      <Building2 className="w-10 h-10" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">إدارة مجمع العاشر</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتورة / شهرت القاضي
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف الطبي والإداري على منظومة العيادات التخصصية واللجنة الطبية العامة
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف العام على مجمع العاشر</span>
                </div>
              </div>

              {/* Card 2: أستاذ علاء */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-teal-300 dark:border-teal-900/60 p-5 shadow-lg shadow-teal-500/5 hover:border-teal-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                      الشئون المالية والإدارية
                    </span>
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-teal-100 dark:bg-teal-950/60 border-2 border-teal-400 shrink-0 shadow-lg relative">
                      <Image
                        src="/team/alaa-elbadry.jpg"
                        alt="أستاذ / علاء البدري"
                        width={96}
                        height={120}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير مالي وإداري</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      أستاذ / علاء البدري
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف الإداري والمالي وتوفير المستلزمات ودعم سير العمل بمجمع العاشر
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-teal-600 dark:text-teal-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الإشراف المالي والإداري بالمجمع</span>
                </div>
              </div>

              {/* Card 3: دكتور محمد أمين */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-300 dark:border-blue-900/60 p-5 shadow-lg shadow-blue-500/5 hover:border-blue-500 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      اللجنة الطبية العامة
                    </span>
                    <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-blue-100 dark:bg-blue-950/60 border-2 border-blue-400 shrink-0 shadow-lg relative">
                      <Image
                        src="/team/mohamed-amin.jpg"
                        alt="دكتور / محمد أمين"
                        width={96}
                        height={120}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">مدير اللجنة الطبية العامة</p>
                    <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                      دكتور / محمد أمين
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2">
                    الإشراف الطبي على أعمال وقرارات اللجنة الطبية العامة ولجان العجز بسوهاج
                  </p>
                </div>
                <div className="mt-3 pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>إدارة اللجنة الطبية العامة</span>
                </div>
              </div>
            </div>
          </div>
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
