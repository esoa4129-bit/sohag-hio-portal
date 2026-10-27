"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Stethoscope,
  Activity,
  HeartHandshake,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  X,
  Search,
  Bed,
  Sparkles,
  Users
} from "lucide-react";

export interface HospitalFacility {
  id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  phone: string;
  emergency: boolean;
  emergencyHours?: string;
  workingHours: string;
  bedsCount?: string;
  description: string;
  specialties: string[];
  keyFeatures: string[];
  accentGradient: string;
  badgeColor: string;
  iconText: string;
}

export const SOHAG_FACILITIES: HospitalFacility[] = [
  {
    id: "hilal",
    name: "مستشفى الهلال للتأمين الصحي بسوهاج",
    type: "المستشفى الرئيسي والجراحي للفرع",
    city: "مدينة سوهاج",
    address: "سوهاج - ميدان الثقافة - بجوار ديوان عام المحافظة",
    phone: "093-2324567 / 093-2328901",
    emergency: true,
    emergencyHours: "24 ساعة طوال أيام الأسبوع",
    workingHours: "العيادات: 8:00 ص - 8:00 م | الطوارئ: 24 ساعة",
    bedsCount: "240 سريراً + 28 عناية مركزة + 12 حضانة",
    description: "الصرح الطبي والجراحي الأكبر التابع لفرع سوهاج للتأمين الصحي، يقدم العمليات الجراحية الكبرى والدقيقة، الرعايات المركزة، مناظير الجهاز الهضمي، وحدة القسطرة، وقسم الطوارئ والاستقبال المجهز على مدار الساعة.",
    specialties: [
      "جراحة المخ والأعصاب والعمود الفقري",
      "جراحة القلب المفتوح والقسطرة التداخلية",
      "الرعايات المركزة (ICU) والرعاية المتوسطة",
      "جراحة العظام والمفاصل والكسور المعقدة",
      "مناظير الجهاز الهضمي والقنوات المرارية",
      "حضانات الأطفال المبتسرين وحديثي الولادة",
      "جراحة المسالك البولية والتفتيت",
      "قسم الأشعة المقطعية والرنين المغناطيسي",
      "بنك الدم التجميعي والمعامل المركزية"
    ],
    keyFeatures: [
      "طوارئ واستقبال 24 ساعة بدون انقطاع",
      "غرف عمليات كبرى بنظام الكبسولة المعقمة",
      "فريق طبي واستشاري على أعلى مستوى بالصعيد",
      "ربط إلكتروني كامل ومميكن لكافة ملفات المرضى"
    ],
    accentGradient: "from-sky-600 via-blue-700 to-indigo-900",
    badgeColor: "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
    iconText: "🏥"
  },
  {
    id: "tahta",
    name: "مستشفى ومجمع عيادات طهطا للتأمين الصحي",
    type: "مستشفى ومجمع عيادات تخصصية",
    city: "طهطا (شمال سوهاج)",
    address: "مدينة طهطا - شارع البحر - مجمع المصالح الحكومية",
    phone: "093-4771234",
    emergency: true,
    emergencyHours: "استقبال وطوارئ يومياً",
    workingHours: "الفترة الصباحية: 8 ص - 2 ظ | المسائية: 4 م - 8 م",
    bedsCount: "85 سريراً داخلياً وعناية متوسطة",
    description: "يقدم الرعاية الصحية والخدمات الطبية لقطاع شمال محافظة سوهاج ويشمل مراكز طهطا، طما، وجهينة. يضم عيادات تخصصية متكاملة، لجان العجز واللجان العامة، ووحدات الغسيل الكلوي.",
    specialties: [
      "العيادات الخارجية التخصصية (25 عيادة)",
      "وحدة الغسيل الكلوي والتنقية الدموية",
      "عيادات السكر والغدد الصماء والباطنة",
      "جراحة العيون والرمد والفحوصات البصرية",
      "النساء والتوليد ورعاية الأمومة والطفولة",
      "لجان التأمين الصحي العامة ولجان العجز",
      "معمل متكامل ووحدة أشعة سينية وموجات صوتية"
    ],
    keyFeatures: [
      "خدمة أهالي مراكز طهطا وطما وجهينة",
      "صيدلية مركزية لصرف أدوية الأمراض المزمنة",
      "حجز إلكتروني مسبق لمنع الازدحام والتكدس"
    ],
    accentGradient: "from-emerald-600 via-teal-700 to-slate-900",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    iconText: "🏥"
  },
  {
    id: "girga",
    name: "مستشفى ومجمع عيادات جرجا للتأمين الصحي",
    type: "مستشفى ومجمع عيادات تخصصية",
    city: "جرجا (جنوب سوهاج)",
    address: "مدينة جرجا - بالقرب من محطة السكة الحديد",
    phone: "093-6775678",
    emergency: true,
    emergencyHours: "استقبال طوارئ يومياً",
    workingHours: "العيادات: 8:00 ص - 7:00 م",
    bedsCount: "70 سريراً داخلياً ووحدة غسيل كلوي",
    description: "الصرح الطبي المخصص لخدمة قطاع جنوب سوهاج ويشمل جرجا، المنشأة، ودار السلام. يقدم خدمات الكشف في كافة التخصصات، الغسيل الكلوي، وصرف علاجات الأورام وأمراض الدم.",
    specialties: [
      "وحدة الغسيل الكلوي ورعاية الفشل الكلوي",
      "عيادات القلب والباطنة وارتفاع ضغط الدم",
      "الجراحة العامة وجراحة المسالك والعظام",
      "عيادات الأطفال وحديثي الولادة والتطعيمات",
      "عيادات الأنف والأذن والحنجرة وجراحات اليوم الواحد",
      "اللجان الطبية لجنوب المحافظة والمطالبات"
    ],
    keyFeatures: [
      "تغطية جغرافية كبرى لجنوب سوهاج ودار السلام",
      "صيدليات صرف موزعة لتيسير الحصول على الدواء",
      "أطقم تمريض وأطباء استشاريين متخصصين"
    ],
    accentGradient: "from-cyan-600 via-blue-800 to-slate-950",
    badgeColor: "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
    iconText: "🏥"
  },
  {
    id: "akhmim",
    name: "مجمع عيادات أخميم الشامل للتأمين الصحي",
    type: "مجمع عيادات تخصصية وفحص شامل",
    city: "أخميم (شرق سوهاج)",
    address: "مدينة أخميم - شارع الفردوس - خلف مجلس المدينة",
    phone: "093-2580123",
    emergency: false,
    workingHours: "يومياً من 8:00 ص حتى 3:00 م (ما عدا الجمعة)",
    description: "مجمع عيادات شامل يقدم الكشوفات الطبية والفحوصات المعملية لمنتفعي شرق النيل ومدينة أخميم وقراها، ويضم مقراً رئيسياً للجان الكشف الطبي لطلاب المدارس ومبادرات الصحة المدرسية.",
    specialties: [
      "لجان فحص الطلاب والمبادرات المدرسية (الأنيميا والتقزم)",
      "عيادات الرمد وفحص قاع العين والنظارات",
      "عيادات العظام والروماتيزم والمفاصل",
      "عيادات الباطنة والجهاز الهضمي والقلب",
      "عيادات الأسنان وجراحة الفم واللثة",
      "الفحص الطبي الشامل للموظفين الجدد واللياقة الطبية",
      "صيدلية العلاج الشهري لأصحاب المعاشات"
    ],
    keyFeatures: [
      "المقر الرئيسي للجان الطلاب بالقطاع الأوسط",
      "معامل متطورة لتحاليل الدم والأنيميا",
      "قاعات انتظار مكيفة ومجهزة لكبار السن"
    ],
    accentGradient: "from-amber-600 via-orange-700 to-slate-950",
    badgeColor: "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30",
    iconText: "🩺"
  },
  {
    id: "balyana",
    name: "مجمع عيادات البلينا للتأمين الصحي",
    type: "مجمع عيادات خارجية وتغطية تأمينية",
    city: "البلينا (أقصى جنوب سوهاج)",
    address: "مدينة البلينا - شارع الجمهورية - أمام المحكمة",
    phone: "093-4809988",
    emergency: false,
    workingHours: "يومياً من 8:00 ص حتى 3:00 م",
    description: "يقدم الخدمات الطبية لمنتفعي أقصى جنوب المحافظة، ويشمل عيادات تخصصية متطورة تخدم العمال، الموظفين، أصحاب المعاشات، وطلبة المدارس لتجنيبهم مشقة السفر لعاصمة المحافظة.",
    specialties: [
      "عيادات الباطنة العامة وأمراض الكبد والسكر",
      "عيادات جراحة العظام والعمود الفقري",
      "عيادات الأطفال وحديثي الولادة",
      "عيادات المسالك البولية والتناسلية",
      "لجان اعتماد الإجازات والتقارير الطبية",
      "صيدلية صرف الأدوية المزمنة للمنتفعين"
    ],
    keyFeatures: [
      "توفير الرعاية للمنتفعين بأقصى جنوب المحافظة",
      "خدمة سريعة ومميكنة لصرف العلاج الدوري",
      "تنسيق مباشر مع مستشفى الهلال للحالات الجراحية"
    ],
    accentGradient: "from-teal-600 via-emerald-800 to-slate-950",
    badgeColor: "bg-teal-500/20 text-teal-700 dark:text-teal-300 border-teal-500/30",
    iconText: "🏥"
  },
  {
    id: "city-centers",
    name: "مجمع عيادات سيتي والمراكز الطبية التخصصية",
    type: "مجمع لجان طبية عليا ومراكز تخصصية",
    city: "مدينة سوهاج",
    address: "سوهاج - شارع سيتي الرئيسي - مجمع التأمين الصحي",
    phone: "093-2311122",
    emergency: false,
    workingHours: "يومياً من 8:00 ص حتى 3:00 م",
    description: "المقر الإقليمي للجان الطبية التخصصية والعليا بمحافظة سوهاج، يضم لجان هرمون النمو للأطفال، لجان الأورام والبروتوكولات البيولوجية، لجان أمراض الدم واللجان النفسية.",
    specialties: [
      "لجنة هرمون النمو (Growth Hormone) للأطفال",
      "لجنة أمراض الدم والأنيميا والثلاسيميا",
      "لجنة بروتوكولات وصرف أدوية الأورام المتطورة",
      "اللجان الطبية النفسية والمجالس المتخصصة",
      "لجان الكشف الطبي لمرشحي الوظائف والحج",
      "وحدة فحص اللياقة البدنية والطب الرياضي"
    ],
    keyFeatures: [
      "أعلى مستوى للجان الاستشارية الطبية بالمحافظة",
      "إصدار القرارات الطبية وصرف العلاج البيولوجي فوراً",
      "منظومة ربط إلكتروني بالسيرفرات الوزارية المركزية"
    ],
    accentGradient: "from-purple-600 via-indigo-800 to-slate-950",
    badgeColor: "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30",
    iconText: "⭐"
  }
];

interface HospitalsShowcaseProps {
  onOpenBooking: () => void;
}

export default function HospitalsShowcase({ onOpenBooking }: HospitalsShowcaseProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalFacility, setActiveModalFacility] = useState<HospitalFacility | null>(null);

  const filteredFacilities = SOHAG_FACILITIES.filter((fac) => {
    const matchesCity = selectedCity === "all" ? true : fac.city.includes(selectedCity);
    const matchesSearch =
      searchQuery === ""
        ? true
        : fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fac.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          fac.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
          fac.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* SECTION HEADER & HERO OVERVIEW OF SOHAG BRANCH */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-8 md:p-10 border border-sky-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                <HeartHandshake className="w-3.5 h-3.5 text-red-400" />
                صحتك أمانة بين إيدينا
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 border border-sky-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                الهيئة العامة للتأمين الصحي - فرع سوهاج
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
              منظومة المستشفيات والخدمات العلاجية بمحافظة سوهاج
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              يقدم فرع سوهاج للتأمين الصحي رعاية طبية شاملة لملايين المنتفعين من أبناء المحافظة (الطلاب، المواليد، العمال، أصحاب المعاشات، والموظفين) عبر شبكة متكاملة من المستشفيات التخصصية، مجمعات العيادات، واللجان الطبية المجهزة بأحدث التقنيات والربط الرقمي المميكن.
            </p>

            {/* QUICK STATS NUMBERS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-lg sm:text-2xl font-black text-amber-400 font-mono">6+</span>
                <p className="text-[11px] text-slate-300 mt-0.5">مستشفيات ومجمعات كبرى</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-lg sm:text-2xl font-black text-sky-400 font-mono">2.8M+</span>
                <p className="text-[11px] text-slate-300 mt-0.5">منتفع ومستفيد بالمحافظة</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-lg sm:text-2xl font-black text-emerald-400 font-mono">22+</span>
                <p className="text-[11px] text-slate-300 mt-0.5">منظومة وسيرفر مميكن</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="text-lg sm:text-2xl font-black text-cyan-400 font-mono">24/7</span>
                <p className="text-[11px] text-slate-300 mt-0.5">طوارئ ورعاية على مدار الساعة</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Stethoscope className="w-4 h-4" />
              <span>احجز موعد كشفك بالعيادة</span>
            </button>

            <Link
              href="/team"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>فريق العمل وأطقم المستشفيات</span>
            </Link>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR FOR HOSPITALS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedCity("all")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "all"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            جميع المستشفيات والمراكز ({SOHAG_FACILITIES.length})
          </button>
          <button
            onClick={() => setSelectedCity("مدينة سوهاج")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "مدينة سوهاج"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            مدينة سوهاج
          </button>
          <button
            onClick={() => setSelectedCity("طهطا")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "طهطا"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            قطاع شمال (طهطا)
          </button>
          <button
            onClick={() => setSelectedCity("جرجا")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "جرجا"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            قطاع جنوب (جرجا)
          </button>
          <button
            onClick={() => setSelectedCity("أخميم")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "أخميم"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            أخميم
          </button>
          <button
            onClick={() => setSelectedCity("البلينا")}
            className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition ${
              selectedCity === "البلينا"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            البلينا
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو التخصص..."
            className="w-full pr-9 pl-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* FACILITIES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFacilities.map((facility) => (
          <div
            key={facility.id}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:border-sky-500/50"
          >
            {/* CARD TOP BANNER WITH ACCENT */}
            <div className={`p-5 bg-gradient-to-r ${facility.accentGradient} text-white space-y-2 relative`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{facility.iconText}</span>
                <div className="flex items-center gap-1.5">
                  {facility.emergency && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-black animate-pulse flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span>طوارئ 24 ساعة</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-bold">
                    {facility.city}
                  </span>
                </div>
              </div>

              <h3 className="font-extrabold text-base sm:text-lg leading-snug pt-1">
                {facility.name}
              </h3>
              <p className="text-[11px] text-white/80 line-clamp-1">
                {facility.type}
              </p>
            </div>

            {/* CARD BODY CONTENT */}
            <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {facility.description}
              </p>

              {/* DETAILS ROW (Address, Hours, Beds) */}
              <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{facility.address}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{facility.workingHours}</span>
                </div>

                {facility.bedsCount && (
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{facility.bedsCount}</span>
                  </div>
                )}
              </div>

              {/* SPECIALTIES TAGS PREVIEW */}
              <div className="flex flex-wrap gap-1 pt-1">
                {facility.specialties.slice(0, 3).map((spec, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
                {facility.specialties.length > 3 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 text-sky-600 dark:text-sky-400">
                    +{facility.specialties.length - 3} تخصصاً
                  </span>
                )}
              </div>

              {/* CARD ACTION BUTTONS */}
              <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveModalFacility(facility)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition"
                >
                  <span>التفاصيل والأقسام</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <Link
                  href="/team"
                  className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold text-xs flex items-center gap-1 border border-amber-200 dark:border-amber-800/40 transition"
                  title="عرض فريق العمل لهذا القسم"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">أطباء القسم</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL: FULL FACILITY DETAILS */}
      {activeModalFacility && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{activeModalFacility.iconText}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    {activeModalFacility.city}
                  </span>
                  {activeModalFacility.emergency && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      طوارئ 24/7
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {activeModalFacility.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeModalFacility.type}
                </p>
              </div>

              <button
                onClick={() => setActiveModalFacility(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalFacility.description}
            </p>

            {/* Quick Contact & Logistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  العنوان بالتفصيل:
                </span>
                <p className="text-slate-600 dark:text-slate-400 pr-5">{activeModalFacility.address}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  أرقام التواصل والاستعلام:
                </span>
                <p className="text-slate-600 dark:text-slate-400 pr-5 font-mono" dir="ltr">{activeModalFacility.phone}</p>
              </div>
            </div>

            {/* All Specialties List */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-sky-600" />
                <span>الأقسام الطبية والتخصصات المتوفرة ({activeModalFacility.specialties.length}):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeModalFacility.specialties.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-slate-800 dark:text-slate-200">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">
                أبرز المميزات والخدمات:
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                {activeModalFacility.keyFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={() => {
                  setActiveModalFacility(null);
                  onOpenBooking();
                }}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md transition"
              >
                <Stethoscope className="w-4 h-4" />
                <span>حجز موعد كشف بهذه المنشأة</span>
              </button>

              <Link
                href="/team"
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-amber-500" />
                <span>عرض الطاقم الطبي والأطباء</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
