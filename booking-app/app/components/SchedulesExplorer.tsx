"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Calendar,
  Clock,
  Filter,
  Building2,
  Stethoscope,
  Sparkles,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  MapPin,
  Eye,
  RefreshCw,
  Baby,
  Users2,
  Activity,
  Table,
  LayoutGrid
} from "lucide-react";
import {
  ClinicScheduleRow,
  ALL_CLINIC_SCHEDULES,
  DayOfWeek,
  DAYS_OF_WEEK,
  SpecialtyCategory,
  CATEGORY_LABELS,
  normalizeArabicText,
  getCairoCurrentDay,
  isClinicOpenNow
} from "../data/schedules";

const OFFICIAL_BOOKING_URL = "https://reserv.hiocdis.org/hioClinicReservation.aspx";

interface SchedulesExplorerProps {
  onOpenBooking?: () => void;
}

export default function SchedulesExplorer({ onOpenBooking }: SchedulesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<string>("all");
  const [selectedShift, setSelectedShift] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [todayName, setTodayName] = useState<DayOfWeek | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // حساب اليوم الحالي بتوقيت مصر
  useEffect(() => {
    setTodayName(getCairoCurrentDay());
  }, []);

  // تصفية الجداول بذكاء فائق
  const filteredRows = useMemo(() => {
    const qNormalized = normalizeArabicText(searchQuery);

    return ALL_CLINIC_SCHEDULES.filter((row) => {
      // فلتر الصرح / المنشأة
      if (selectedFacility !== "all") {
        if (selectedFacility === "10th" && !row.facilityId.startsWith("10th")) return false;
        if (selectedFacility === "wafa" && !row.facilityId.startsWith("wafa")) return false;
        if (selectedFacility === "specialized" && row.facilityId !== "specialized") return false;
      }

      // فلتر الفترة
      if (selectedShift !== "all" && row.shift !== selectedShift) {
        return false;
      }

      // فلتر التصنيف
      if (selectedCategory !== "all" && row.category !== selectedCategory) {
        return false;
      }

      // فلتر اليوم
      if (selectedDay !== "all" && !row.days.includes(selectedDay as DayOfWeek)) {
        return false;
      }

      // البحث اللحظي
      if (qNormalized) {
        const nameNorm = normalizeArabicText(row.name);
        const facilityNorm = normalizeArabicText(row.facilityName);
        const catNorm = normalizeArabicText(row.categoryLabel);
        const notesNorm = normalizeArabicText(row.notes || "");
        
        const match =
          nameNorm.includes(qNormalized) ||
          facilityNorm.includes(qNormalized) ||
          catNorm.includes(qNormalized) ||
          notesNorm.includes(qNormalized);

        if (!match) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFacility, selectedShift, selectedCategory, selectedDay]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedFacility("all");
    setSelectedShift("all");
    setSelectedCategory("all");
    setSelectedDay("all");
  };

  const handleBookingClick = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.open(OFFICIAL_BOOKING_URL, "_blank", "noopener,noreferrer");
    }
  };

  // صور الجداول الأصلية للمعاينة والتحميل
  const ORIGINAL_SCHEDULE_SHEETS = [
    {
      id: "10th-m",
      title: "مجمع العاشر من رمضان (صباحي)",
      src: "/schedules/10th-ramadan-morning.jpg",
      badge: "صباحي"
    },
    {
      id: "10th-e",
      title: "مجمع العاشر من رمضان (مسائي)",
      src: "/schedules/10th-ramadan-evening.jpg",
      badge: "مسائي"
    },
    {
      id: "wafa",
      title: "عيادة الوفاء الشاملة (صباحي ومسائي)",
      src: "/schedules/wafa-clinic.jpg",
      badge: "كامل"
    },
    {
      id: "spec",
      title: "العيادات التخصصية واللجان الطبية",
      src: "/schedules/specialized-clinics-committees.jpg",
      badge: "لجان"
    }
  ];

  const handleClearCacheAndRefresh = async () => {
    try {
      if (typeof window !== "undefined") {
        if ("caches" in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
        if ("serviceWorker" in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          for (const reg of regs) {
            reg.update();
            reg.active?.postMessage({ type: "CLEAR_ALL_CACHES" });
          }
        }
        sessionStorage.clear();
        localStorage.removeItem("hio_booking_health_cache");
        localStorage.removeItem("hio_booking_health_time");
        window.location.reload();
      }
    } catch {
      window.location.reload();
    }
  };

  return (
    <section id="schedules-explorer-section" className="space-y-6">
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 1. Header & Title Banner                                                */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-emerald-950/20 border border-emerald-500/20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-200">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>منظومة الجداول التفاعلية المعتمدة</span>
            </div>

            <button
              onClick={handleClearCacheAndRefresh}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition active:scale-95 shadow-sm"
              title="تحديث البيانات فورياً ومسح الكاش"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-300" />
              <span>تحديث البيانات ومسح الكاش</span>
            </button>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
            دليل مواعيد العيادات واللجان الطبية بسوهاج
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
            ابحث فورياً عن مواعيد الأطباء والتخصصات واللجان الطبية العليا بمجمع العاشر من رمضان، عيادة الوفاء، والعيادات التخصصية بالأيام والفترات مع تحديد حالة العمل الحالية.
          </p>

          {/* Quick Stats Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 font-bold text-white">
              {ALL_CLINIC_SCHEDULES.length} موعد عيادة ولجنة مسجلة
            </span>
            {todayName && (
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/30 border border-emerald-400/40 font-bold text-emerald-200 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>اليوم بتوقيت سوهاج: <strong>{todayName}</strong></span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 2. Interactive Search & Filters Bar                                     */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm space-y-4">
        {/* Instant Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالتخصص (مثال: عظام، باطنة، أورام، أطفال، رسم قلب، قوقعة...)"
            className="w-full pr-12 pl-10 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white placeholder:text-slate-400 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Days Horizontal Scrollable Filter Strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>اختر يوم الكشف:</span>
            </span>
            {selectedDay !== "all" && (
              <button
                onClick={() => setSelectedDay("all")}
                className="text-emerald-600 dark:text-emerald-400 hover:underline text-[11px]"
              >
                عرض كل الأيام
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-1">
            <button
              onClick={() => setSelectedDay("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
                selectedDay === "all"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              جميع الأيام
            </button>

            {DAYS_OF_WEEK.map((day) => {
              const isToday = todayName === day;
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : isToday
                      ? "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-400 text-emerald-700 dark:text-emerald-300"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-500 text-white font-black">
                      اليوم
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns Row: Facility, Shift, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
          {/* Facility Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 dark:text-slate-400 block px-1">المنشأة الطبية:</label>
            <select
              value={selectedFacility}
              onChange={(e) => setSelectedFacility(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">كافة المنشآت (العاشر، الوفاء، التخصصية)</option>
              <option value="10th">مجمع العاشر من رمضان</option>
              <option value="wafa">عيادة الوفاء الشاملة</option>
              <option value="specialized">العيادات التخصصية واللجان</option>
            </select>
          </div>

          {/* Shift Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 dark:text-slate-400 block px-1">الفترة:</label>
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">كافة الفترات (صباحي ومسائي)</option>
              <option value="morning">الفترة الصباحية (8:00 ص - 2:00 م)</option>
              <option value="evening">الفترة المسائية (4:00 م - 8:00 م)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 dark:text-slate-400 block px-1">نوع الخدمة:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">كافة التخصصات واللجان</option>
              <option value="clinics">العيادات التخصصية العامة</option>
              <option value="pediatrics">عيادات الأطفال</option>
              <option value="committees">اللجان الطبية المتخصصة</option>
              <option value="support_services">الفحوصات والخدمات الإضافية</option>
            </select>
          </div>
        </div>

        {/* Active Filters Summary & Reset */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            تم العثور على <strong>{filteredRows.length}</strong> عيادة / خدمة مطابقة
          </span>

          {(searchQuery || selectedFacility !== "all" || selectedShift !== "all" || selectedCategory !== "all" || selectedDay !== "all") && (
            <button
              onClick={handleResetFilters}
              className="text-red-600 dark:text-red-400 font-bold hover:underline inline-flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>إعادة ضبط الفلاتر</span>
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 3. Schedules Display: Desktop Table & Mobile Touch Cards           */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      {/* Summary Counter & Desktop View Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>النتائج:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-black">
              {filteredRows.length}
            </strong>
            <span>عيادة وخدمة مطابقة</span>
          </span>
        </div>

        {/* View Switcher on Desktop Only (Mobile is strictly optimized Cards) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">نمط العرض:</span>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "cards"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>بطاقات</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "table"
                  ? "bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>جدول منظم</span>
            </button>
          </div>
        </div>
      </div>

      {filteredRows.length > 0 ? (
        <div className="space-y-4">
          {/* ============================================================= */}
          {/* A. DESKTOP VIEW: Clean Structured Table (Hidden on Mobile)     */}
          {/* ============================================================= */}
          <div className={`hidden md:${viewMode === "table" ? "block" : "hidden"} overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm`}>
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs" aria-label="جدول مواعيد تشغيل عيادات التأمين الصحي بسوهاج">
                <caption className="sr-only">جدول مواعيد عيادات ولجان التأمين الصحي بمحافظة سوهاج</caption>
                <thead>
                  <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-black text-xs">
                    <th scope="col" className="p-3.5 pr-6">التخصص / الخدمة</th>
                    <th scope="col" className="p-3.5">المنشأة الطبية</th>
                    <th scope="col" className="p-3.5">الفترة والمواعيد</th>
                    <th scope="col" className="p-3.5">أيام العمل</th>
                    <th scope="col" className="p-3.5">الحالة الآن</th>
                    <th scope="col" className="p-3.5 pl-6 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredRows.map((row) => {
                    const openStatus = isClinicOpenNow(row.shift, row.days);
                    const isAvailableToday = todayName ? row.days.includes(todayName) : false;

                    return (
                      <tr
                        key={row.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition group"
                      >
                        {/* Specialty Name */}
                        <td className="p-3.5 pr-6 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            {row.category === "pediatrics" ? (
                              <Baby className="w-4 h-4 text-pink-500 shrink-0" />
                            ) : row.category === "committees" ? (
                              <Users2 className="w-4 h-4 text-purple-500 shrink-0" />
                            ) : row.category === "support_services" ? (
                              <Activity className="w-4 h-4 text-amber-500 shrink-0" />
                            ) : (
                              <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                            <div>
                              <span>{row.name}</span>
                              {row.doctorTitle && (
                                <span className="block text-[10px] text-slate-400 font-normal">
                                  {row.doctorTitle}
                                </span>
                              )}
                              {row.notes && (
                                <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                                  ⚠️ {row.notes}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Facility */}
                        <td className="p-3.5">
                          <span className="font-semibold block text-slate-800 dark:text-slate-200">
                            {row.facilityName}
                          </span>
                          <span className="text-[10px] text-slate-400 line-clamp-1">
                            {row.categoryLabel}
                          </span>
                        </td>

                        {/* Shift & Hours */}
                        <td className="p-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              row.shift === "morning"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                                : "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300"
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{row.shiftLabel}</span>
                          </span>
                          <span className="block text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                            {row.hours}
                          </span>
                        </td>

                        {/* Days */}
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {row.days.map((d) => (
                              <span
                                key={d}
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  todayName === d
                                    ? "bg-emerald-600 text-white font-bold"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                }`}
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="p-3.5">
                          {openStatus.isOpen ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-[10px]">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>مفتوح الآن</span>
                            </span>
                          ) : isAvailableToday ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 font-bold text-[10px]">
                              <Calendar className="w-3 h-3" />
                              <span>متاح اليوم</span>
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              مغلق اليوم
                            </span>
                          )}
                        </td>

                        {/* Booking CTA */}
                        <td className="p-3.5 pl-6 text-center">
                          <button
                            onClick={handleBookingClick}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] shadow-sm transition active:scale-95"
                          >
                            <span>احجز موعد</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ============================================================= */}
          {/* B. MOBILE VIEW: Touch-Friendly Cards (No scrolling traps!)   */}
          {/* Also shown on desktop if user switches to Cards              */}
          {/* ============================================================= */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 ${
            viewMode === "table" ? "md:hidden" : "md:grid"
          }`}>
            {filteredRows.map((row) => {
              const openStatus = isClinicOpenNow(row.shift, row.days);
              const isAvailableToday = todayName ? row.days.includes(todayName) : false;

              return (
                <div
                  key={row.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition hover:shadow-md"
                >
                  {/* Card Header: Specialty & Current Status Badge */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200/50 dark:border-emerald-800/40">
                        {row.category === "pediatrics" ? (
                          <Baby className="w-5 h-5 text-pink-500" />
                        ) : row.category === "committees" ? (
                          <Users2 className="w-5 h-5 text-purple-500" />
                        ) : row.category === "support_services" ? (
                          <Activity className="w-5 h-5 text-amber-500" />
                        ) : (
                          <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                          {row.name}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                          {row.facilityName} • <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{row.categoryLabel}</span>
                        </span>
                        {row.doctorTitle && (
                          <span className="text-[11px] text-slate-400 font-normal block mt-0.5">
                            👨‍⚕️ {row.doctorTitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status Badge (حالة الظهور والعمل الآن) */}
                    <div className="shrink-0">
                      {openStatus.isOpen ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-black text-xs shrink-0 flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>مفتوح الآن</span>
                        </span>
                      ) : isAvailableToday ? (
                        <span className="px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950/70 text-sky-800 dark:text-sky-300 font-black text-xs shrink-0 flex items-center gap-1.5 border border-sky-300 dark:border-sky-800 shadow-xs">
                          <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>متاح اليوم</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs shrink-0 flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>مغلق الآن</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Notes & Alerts */}
                  {row.notes && (
                    <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-200 font-medium">
                      ⚠️ {row.notes}
                    </div>
                  )}

                  {/* Shift & Operating Hours (الفترات ومواعيد العمل) */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
                        <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>فترة التشغيل:</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${
                          row.shift === "morning"
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900"
                            : "bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900"
                        }`}>
                          {row.shiftLabel}
                        </span>
                      </div>
                      <span className="font-mono text-slate-700 dark:text-slate-300 text-xs font-black bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200/60 dark:border-slate-700">
                        {row.hours}
                      </span>
                    </div>
                  </div>

                  {/* Examination Days (أيام الكشف المحددة) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>أيام الكشف والعمل:</span>
                      </span>
                      {todayName && row.days.includes(todayName) && (
                        <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900">
                          ✓ العيادة تعمل اليوم
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {row.days.map((d) => {
                        const isDayToday = todayName === d;
                        return (
                          <span
                            key={d}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                              isDayToday
                                ? "bg-emerald-600 text-white font-black shadow-xs ring-2 ring-emerald-500/30 scale-105"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                            }`}
                          >
                            {d}
                            {isDayToday && " (اليوم)"}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Booking CTA & Original View */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setLightboxImage({ src: row.imageSrc, title: row.facilityName })}
                      className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1.5 active:scale-95 shrink-0"
                      title="معاينة الجدول الورقي المعتمد"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>الأصل</span>
                    </button>

                    <button
                      onClick={handleBookingClick}
                      className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-95"
                    >
                      <span>احجز موعد في هذا التخصص</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">
            لم يتم العثور على عيادة أو تخصص يطابق بحثك
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            تأكد من كتابة الاسم بشكل صحيح أو جرّب مسح الفلاتر لعرض كافة العيادات المتاحة.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition"
          >
            مسح الفلاتر وعرض الكل
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 4. Original Image Sheets Option (Lightbox & Download)                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div className="p-5 rounded-3xl bg-slate-100/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>جداول المواعيد الورقية الأصلية (المعتمدة من الفرع)</span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              يمكنك معاينة أو تحميل النسخة المصورة الأصلية للجداول والمعلقة بالعيادات:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {ORIGINAL_SCHEDULE_SHEETS.map((sheet) => (
            <button
              key={sheet.id}
              onClick={() => {
                setLightboxImage({ src: sheet.src, title: sheet.title });
                setLightboxZoom(1);
              }}
              className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-right hover:border-emerald-500 transition group flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-black">
                  {sheet.badge}
                </span>
                <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1.5 line-clamp-2 leading-tight">
                  {sheet.title}
                </p>
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold group-hover:underline">
                <span>معاينة وتكبير</span>
                <Eye className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* 5. LIGHTBOX MODAL FOR ORIGINAL IMAGES                                  */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-5"
          onClick={() => setLightboxImage(null)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between gap-3 text-white pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <h4 className="font-black text-sm sm:text-base truncate">{lightboxImage.title}</h4>
              <p className="text-[11px] text-slate-300">الجدول المعتمد الأصلي</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxZoom((prev) => Math.min(prev + 0.25, 3))}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                title="تكبير"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLightboxZoom((prev) => Math.max(prev - 0.25, 0.75))}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                title="تصغير"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <a
                href={lightboxImage.src}
                download
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition flex items-center gap-1.5 text-xs font-bold"
                title="تحميل الصورة"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">تحميل</span>
              </a>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Image Container */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center overflow-auto p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="transition-transform duration-200 max-h-[80vh] flex items-center justify-center"
              style={{ transform: `scale(${lightboxZoom})` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Bottom Hint */}
          <p className="text-[11px] text-slate-400 text-center pt-2">
            اضغط في أي مكان خارج الصورة أو زر الإغلاق للعودة للجداول التفاعلية
          </p>
        </div>
      )}
    </section>
  );
}
