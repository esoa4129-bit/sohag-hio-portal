"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Download,
  Share2,
  Filter,
  CheckCircle,
  FileSpreadsheet,
  Building2,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Info
} from "lucide-react";

export interface ScheduleItem {
  id: string;
  title: string;
  category: "10th" | "wafa" | "tahta" | "specialized";
  categoryName: string;
  shift: string;
  shiftType: "morning" | "evening" | "both";
  workingDays: string;
  hours: string;
  location: string;
  imageSrc: string;
  description: string;
  specialties: string[];
  days: string[];
  badgeColor: string;
}

const SCHEDULES: ScheduleItem[] = [
  {
    id: "10th-morning",
    title: "مجمع عيادات العاشر من رمضان - الفترة الصباحية",
    category: "10th",
    categoryName: "مجمع العاشر من رمضان",
    shift: "الفترة الصباحية",
    shiftType: "morning",
    workingDays: "من السبت إلى الخميس",
    hours: "8:00 صباحاً - 2:00 ظهراً",
    location: "سوهاج - مجمع عيادات العاشر من رمضان",
    imageSrc: "/schedules/10th-ramadan-morning.jpg",
    description: "جدول تشغيل العيادات التخصصية الصباحية، الأطفال، الجراحة، واللجان الطبية والخدمات المكملة.",
    specialties: [
      "ممارس عام",
      "باطنة عامة",
      "عظام",
      "مسالك بولية",
      "أطفال",
      "جراحة عامة",
      "رمد وجراحة عيون",
      "أنف وأذن وحنجرة",
      "جلدية وتناسلية",
      "نساء وتوليد",
      "قلب وأوعية دموية",
      "مخ وأعصاب",
      "أسنان وجراحة فم",
      "لجان طبية متخصصة"
    ],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300/40"
  },
  {
    id: "10th-evening",
    title: "مجمع عيادات العاشر من رمضان - الفترة المسائية",
    category: "10th",
    categoryName: "مجمع العاشر من رمضان",
    shift: "الفترة المسائية",
    shiftType: "evening",
    workingDays: "من السبت إلى الخميس",
    hours: "4:00 عصراً - 8:00 مساءً",
    location: "سوهاج - مجمع عيادات العاشر من رمضان",
    imageSrc: "/schedules/10th-ramadan-evening.jpg",
    description: "مواعيد عمل العيادات المسائية لتخفيف التكدس وخدمة المواطنين والموظفين بعد ساعات العمل الرسمية.",
    specialties: [
      "ممارس عام",
      "باطنة",
      "عظام",
      "مسالك بولية",
      "أطفال",
      "رسم قلب وإيكو",
      "روماتيزم وتأهيل",
      "جراحة عامة"
    ],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-300/40"
  },
  {
    id: "wafa-clinic",
    title: "عيادة الوفاء الشاملة - الفترة الصباحية والمسائية",
    category: "wafa",
    categoryName: "عيادة الوفاء الشاملة",
    shift: "صباحي ومسائي",
    shiftType: "both",
    workingDays: "من السبت إلى الخميس",
    hours: "الصباحي: 8:00 ص - 2:00 م | المسائي: 4:00 م - 8:00 م",
    location: "سوهاج - عيادة الوفاء الشاملة للتأمين الصحي",
    imageSrc: "/schedules/wafa-clinic.jpg",
    description: "جدول المواعيد الكامل لعيادة الوفاء الشاملة بكافة التخصصات الطبية الصباحية والمسائية بالأيام.",
    specialties: [
      "ممارس عام",
      "باطنة وسكر",
      "أطفال وحديثي ولادة",
      "عظام",
      "رمد",
      "أنف وأذن",
      "جلدية",
      "جراحة عامة",
      "تنظيم أسرة ومتابعة حمل",
      "أسنان"
    ],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-300/40"
  },
  {
    id: "tahta-clinic",
    title: "عيادة طهطا الشاملة - الفترة الصباحية والمسائية",
    category: "tahta",
    categoryName: "عيادة طهطا الشاملة",
    shift: "صباحي ومسائي",
    shiftType: "both",
    workingDays: "من السبت إلى الخميس",
    hours: "الصباحي: 8:00 ص - 2:00 م | المسائي: 4:00 م - 8:00 م",
    location: "طهطا - عيادة طهطا الشاملة للتأمين الصحي (شمال سوهاج)",
    imageSrc: "/schedules/tahta-clinic.jpg",
    description: "جدول مواعيد عيادة طهطا لخدمة أهالي مركز ومدينة طهطا والمراكز المجاورة بالفترتين.",
    specialties: [
      "باطنة عامة",
      "أطفال",
      "جراحة عامة",
      "عظام",
      "نساء وتوليد",
      "مسالك بولية",
      "رمد",
      "أسنان",
      "لجان طبية",
      "رسم قلب وتحاليل"
    ],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300/40"
  },
  {
    id: "specialized-committees",
    title: "العيادات التخصصية وجداول اللجان الطبية بسوهاج",
    category: "specialized",
    categoryName: "العيادات التخصصية واللجان",
    shift: "مواعيد اللجان المعتمدة",
    shiftType: "morning",
    workingDays: "حسب جدول كل لجنة (السبت - الخميس)",
    hours: "تبدأ من 8:30 صباحاً وفقاً للأيام المحددة",
    location: "سوهاج - مقر العيادات التخصصية واللجان المركزية",
    imageSrc: "/schedules/specialized-clinics-committees.jpg",
    description: "مواعيد انعقاد اللجان الطبية المركزية لصرف العلاج والموافقات والقرارات الطبية المتخصصة.",
    specialties: [
      "لجنة الأورام (كبار وأطفال)",
      "لجنة أمراض الدم",
      "لجنة زراعة القوقعة",
      "لجنة الفيروسات الكبدية",
      "لجنة أمراض الكلى وكليكسان",
      "لجنة حقن العين والشبكية",
      "لجنة المفاصل والروماتويد",
      "لجنة القرنية والعيون",
      "اللجان الطبية العليا"
    ],
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-300/40"
  }
];

const DAYS_LIST = ["الكل", "السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"];

export default function ClinicSchedules() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalImage, setActiveModalImage] = useState<ScheduleItem | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Filter schedules based on category, day, and search query
  const filteredSchedules = SCHEDULES.filter((item) => {
    // Category match
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    // Day match
    if (selectedDay !== "الكل" && !item.days.includes(selectedDay)) {
      return false;
    }

    // Search query match
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inCat = item.categoryName.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inLoc = item.location.toLowerCase().includes(q);
      const inSpec = item.specialties.some((s) => s.toLowerCase().includes(q));
      if (!inTitle && !inCat && !inDesc && !inLoc && !inSpec) {
        return false;
      }
    }

    return true;
  });

  const openModal = (item: ScheduleItem) => {
    setActiveModalImage(item);
    setZoomScale(1);
  };

  const closeModal = () => {
    setActiveModalImage(null);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.3, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-7 shadow-lg border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>جداول ومواعيد التشغيل الرسمية المعتمدة</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              مواعيد وجداول تشغيل عيادات فرع سوهاج للتأمين الصحي
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              تصفح جداول الأيام والتخصصات الطبية واللجان بالعيادات والمجمعات التابعة للفرع لمعرفة موعد وتواجد طبيبك قبل الحجز دون الحاجة للسؤال.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block text-xl font-black text-emerald-400">5</span>
              <span className="text-[10px] text-slate-300">جداول رسمية</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
              <span className="block text-xl font-black text-teal-300">صباحي ومسائي</span>
              <span className="text-[10px] text-slate-300">فترات العمل</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالتخصص الطبي، العيادة، أو اللجنة (مثال: عظام، باطنة، أطفال، العاشر، طهطا، لجان)..."
            className="w-full pr-10 pl-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Center / Category Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 sm:px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            جميع العيادات واللجان (5)
          </button>
          <button
            onClick={() => setSelectedCategory("10th")}
            className={`px-3 sm:px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 ${
              selectedCategory === "10th"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            مجمع العاشر من رمضان
          </button>
          <button
            onClick={() => setSelectedCategory("wafa")}
            className={`px-3 sm:px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 ${
              selectedCategory === "wafa"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            عيادة الوفاء الشاملة
          </button>
          <button
            onClick={() => setSelectedCategory("tahta")}
            className={`px-3 sm:px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 ${
              selectedCategory === "tahta"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            عيادة طهطا الشاملة
          </button>
          <button
            onClick={() => setSelectedCategory("specialized")}
            className={`px-3 sm:px-4 py-2 rounded-xl font-bold whitespace-nowrap transition shrink-0 ${
              selectedCategory === "specialized"
                ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            العيادات التخصصية واللجان
          </button>
        </div>

        {/* Days Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-100 dark:border-slate-800/80 pt-2.5">
          <span className="text-slate-400 font-semibold text-[11px] shrink-0 flex items-center gap-1 pl-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            فلترة باليوم:
          </span>
          {DAYS_LIST.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                selectedDay === day
                  ? "bg-slate-800 dark:bg-emerald-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedules Grid */}
      {filteredSchedules.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
            لا توجد جداول مطابقة لبحثك الحالي
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDay("الكل");
              setSearchQuery("");
            }}
            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold"
          >
            إعادة تعيين الفلاتر والبحث
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredSchedules.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              {/* Card Header */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span
                      className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.shift}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h4>
                  </div>
                </div>

                {/* Info row */}
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>مواعيد العمل: {item.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span>أيام التشغيل: {item.workingDays}</span>
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Specialties Tags Preview */}
                <div className="pt-1">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1.5 flex items-center gap-1">
                    <Stethoscope className="w-3 h-3 text-emerald-600" />
                    أبرز التخصصات المتاحة بالجدول:
                  </p>
                  <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                    {item.specialties.slice(0, 7).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                    {item.specialties.length > 7 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold">
                        +{item.specialties.length - 7} تخصصات أخرى
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule Image Container */}
              <div className="relative bg-slate-100 dark:bg-slate-950/60 border-y border-slate-100 dark:border-slate-800 group/img">
                <div
                  onClick={() => openModal(item)}
                  className="cursor-pointer relative w-full h-56 sm:h-64 overflow-hidden flex items-center justify-center p-2"
                >
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover/img:scale-[1.02]"
                  />

                  {/* Hover Overlay Prompt */}
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Maximize2 className="w-4 h-4 text-emerald-600" />
                      انقر لتكبير وقراءة الجدول بوضوح
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-slate-900/70 flex items-center justify-between gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>عرض الجدول مكبراً</span>
                </button>

                <a
                  href={item.imageSrc}
                  download
                  className="py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  title="تحميل صورة الجدول على هاتفك"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">تحميل الصورة</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Image Modal */}
      {activeModalImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="bg-slate-900/90 rounded-2xl px-4 py-3 text-white flex items-center justify-between gap-3 shadow-lg border border-slate-700/60 max-w-5xl mx-auto w-full">
            <div className="min-w-0">
              <h4 className="font-bold text-xs sm:text-sm md:text-base text-white truncate">
                {activeModalImage.title}
              </h4>
              <p className="text-[10px] sm:text-xs text-emerald-400 font-semibold truncate">
                {activeModalImage.hours} • {activeModalImage.workingDays}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <button
                onClick={handleZoomIn}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                title="تكبير"
              >
                <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleZoomOut}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                title="تصغير"
              >
                <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition hidden sm:inline"
                title="إعادة ضبط الحجم"
              >
                100%
              </button>

              <a
                href={activeModalImage.imageSrc}
                download
                className="p-1.5 sm:p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs transition flex items-center gap-1"
                title="تحميل الجدول على هاتفك"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden md:inline font-bold text-xs">تحميل</span>
              </a>

              <button
                onClick={closeModal}
                className="p-1.5 sm:p-2 rounded-xl bg-red-600/80 hover:bg-red-600 text-white transition"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Body with Zoom Pan */}
          <div className="flex-1 w-full max-w-5xl mx-auto my-2 overflow-auto flex items-center justify-center p-2 rounded-2xl bg-black/40">
            <div
              className="transition-transform duration-200 flex items-center justify-center"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: "center center"
              }}
            >
              <Image
                src={activeModalImage.imageSrc}
                alt={activeModalImage.title}
                width={1200}
                height={800}
                priority
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Modal Footer Note */}
          <div className="bg-slate-900/90 rounded-2xl px-4 py-2.5 text-slate-300 text-center text-xs border border-slate-700/60 max-w-5xl mx-auto w-full flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 truncate">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate">
                يمكنك التكبير والتصغير بإصبعين على الهاتف أو بالضغط على أزرار التكبير أعلى اليمين.
              </span>
            </div>
            <button
              onClick={closeModal}
              className="text-emerald-400 hover:underline font-bold text-xs shrink-0"
            >
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
