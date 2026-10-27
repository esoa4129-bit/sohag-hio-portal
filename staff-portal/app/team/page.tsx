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
import { FACILITIES, TeamMember, DEFAULT_TEAM_MEMBERS } from "./facilities";

export default function TeamPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string>("hq");
  const [searchQuery, setSearchQuery] = useState("");
  const [allMembers, setAllMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);

  useEffect(() => {
    const savedTheme = localStorage.getItem("sohag_hio_staff_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const loadMembers = () => {
      const savedMembers = localStorage.getItem("sohag_hio_custom_team_members");
      if (savedMembers) {
        try {
          const parsed: TeamMember[] = JSON.parse(savedMembers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllMembers(parsed);
            return;
          }
        } catch (e) {
          console.error("Failed to load team members:", e);
        }
      }
      setAllMembers(DEFAULT_TEAM_MEMBERS);
    };

    loadMembers();

    // Listen to local storage changes so updates from /admin show immediately
    const handleStorageChange = () => {
      loadMembers();
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

  const currentFacilityInfo = FACILITIES.find((f) => f.id === selectedFacility) || FACILITIES[0];

  // Filter members for active tab and search query
  const activeMembers = allMembers.filter((m) => {
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

  // Group members into 3 hierarchical tiers
  const topTier = activeMembers.filter((m) => m.hierarchyLevel === "top");
  const headTier = activeMembers.filter((m) => m.hierarchyLevel === "head");
  const memberTier = activeMembers.filter((m) => !m.hierarchyLevel || m.hierarchyLevel === "member");

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-sky-800 dark:text-sky-200 text-xs sm:text-sm font-bold border border-sky-200/60 dark:border-slate-700 transition transform active:scale-95 shadow-sm"
            >
              <ArrowRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>العودة للبوابة الرئيسية</span>
            </Link>
          </div>

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
      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12 w-full flex-grow space-y-8 sm:space-y-10">
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
              الهيكل التنظيمي والهرم الإداري لأطقم العمل والمستشفيات والعيادات التابعة لفرع سوهاج
            </p>
          </div>
        </section>

        {/* Search & Hospital Tabs */}
        <section className="space-y-4">
          {/* Search box */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم، الوظيفة، أو المستشفى..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Hospital Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {FACILITIES.map((fac) => {
              const isActive = selectedFacility === fac.id;
              const count = allMembers.filter((m) => m.facility === fac.id).length;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md shadow-sky-600/25 scale-[1.02]"
                      : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <span className="text-base">{fac.icon}</span>
                  <span>{fac.name}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Facility Header Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentFacilityInfo.icon}</span>
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {currentFacilityInfo.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentFacilityInfo.desc}
                </p>
              </div>
            </div>

            <div className="text-left shrink-0">
              <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-bold font-mono">
                {activeMembers.length} عضو
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* HIERARCHICAL PYRAMIDAL TREE FOR THE CURRENT FACILITY                   */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {activeMembers.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-2xl">
              {currentFacilityInfo.icon}
            </div>
            <h5 className="font-bold text-slate-800 dark:text-slate-200">
              لا توجد بيانات مسجلة حالياً في هذا القسم
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              سيتم ظهور الأطقم الطبية والإدارية هنا بمجرد إضافتها.
            </p>
          </div>
        ) : (
          <section className="space-y-8 pt-2">
            {/* 👑 LEVEL 1: TOP TIER (قمة الهرم - الإدارة العليا / مدير المنشأة) */}
            {topTier.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-black mb-4 shadow-sm">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>المستوى القيادي الأول • قمة الهرم</span>
                </div>

                <div className={`grid gap-4 w-full justify-center ${topTier.length === 1 ? "max-w-xl" : "grid-cols-1 md:grid-cols-2"}`}>
                  {topTier.map((member) => (
                    <div
                      key={member.id}
                      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 dark:from-slate-900 dark:via-slate-800 dark:to-amber-950/20 border-2 border-amber-400/80 dark:border-amber-600/70 p-6 sm:p-7 shadow-xl shadow-amber-500/10 text-center flex flex-col items-center hover:scale-[1.01] transition-all duration-300"
                    >
                      {/* Avatar / Photo */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border-2 border-amber-500/60 p-1 shadow-lg shadow-amber-500/20 mb-3 relative flex items-center justify-center">
                        {member.photoUrl ? (
                          <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Building2 className="w-10 h-10 text-amber-600 dark:text-amber-400" />
                        )}
                      </div>

                      {member.badge && (
                        <span className="text-[11px] font-extrabold px-3 py-0.5 rounded-full bg-amber-500 text-white shadow-sm mb-1.5">
                          {member.badge}
                        </span>
                      )}

                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                        {member.role}
                      </span>

                      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                        {member.name}
                      </h3>

                      {member.department && (
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">
                          {member.department}
                        </span>
                      )}

                      {member.bio && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 max-w-md">
                          {member.bio}
                        </p>
                      )}

                      {member.phone && (
                        <div className="mt-3 pt-2 border-t border-amber-200/60 dark:border-amber-900/50 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono" dir="ltr">
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Connector line to level 2 if exists */}
                {(headTier.length > 0 || memberTier.length > 0) && (
                  <div className="flex flex-col items-center my-3">
                    <div className="w-0.5 h-7 bg-gradient-to-b from-amber-400 to-sky-500" />
                    <ChevronDown className="w-4 h-4 text-sky-500 -mt-1" />
                  </div>
                )}
              </div>
            )}

            {/* 🛡️ LEVEL 2: HEAD TIER (المستوى الثاني - رؤساء الأقسام واللجان التخصصية) */}
            {headTier.length > 0 && (
              <div className="flex flex-col items-center">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-black mb-4 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                  <span>المستوى الثاني • رؤساء الأقسام واللجان التخصصية</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                  {headTier.map((member) => (
                    <div
                      key={member.id}
                      className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-800/70 p-5 sm:p-6 shadow-lg shadow-sky-500/5 hover:border-sky-500 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                            {member.badge || member.department || "رئيس قسم"}
                          </span>

                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 flex items-center justify-center border border-sky-200 dark:border-sky-800">
                            {member.photoUrl ? (
                              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                              <ShieldCheck className="w-6 h-6" />
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                            {member.role}
                          </p>
                          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                            {member.name}
                          </h4>
                          {member.department && (
                            <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold mt-0.5">
                              {member.department}
                            </p>
                          )}
                        </div>

                        {member.bio && (
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
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

                {/* Connector line to level 3 if exists */}
                {memberTier.length > 0 && (
                  <div className="flex flex-col items-center my-3">
                    <div className="w-0.5 h-7 bg-gradient-to-b from-blue-500 to-teal-500" />
                    <ChevronDown className="w-4 h-4 text-teal-500 -mt-1" />
                  </div>
                )}
              </div>
            )}

            {/* 🩺 LEVEL 3: OPERATIONAL & MEDICAL STAFF (المستوى الثالث - الأطقم الطبية والإدارية والتشغيلية) */}
            {memberTier.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <Users2 className="w-4 h-4 text-teal-600" />
                    <span>الأطقم الطبية والإدارية والتشغيلية ({memberTier.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">المستوى التنفيذي</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {memberTier.map((member) => (
                    <div
                      key={member.id}
                      className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3 hover:border-teal-500/50"
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Member Photo */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-teal-500/30 shrink-0 relative flex items-center justify-center">
                          {member.photoUrl ? (
                            <img
                              src={member.photoUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                          )}
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                          {member.badge && (
                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                              {member.badge}
                            </span>
                          )}
                          <h5 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                            {member.name}
                          </h5>
                          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                            {member.role}
                          </p>
                          {member.department && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {member.department}
                            </p>
                          )}
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-2.5">
                          {member.bio}
                        </p>
                      )}

                      {member.phone && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono pt-1" dir="ltr">
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <span>{member.phone}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

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

      {/* Footer (No Admin Links) */}
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
