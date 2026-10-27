"use client";

import React, { useState } from "react";
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
  Users,
  Ambulance,
  Star,
  ChevronDown,
  Eye
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
  heroEmoji: string;
  heroPattern: string;
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
      "وحدة قسطرة قلب متطورة"
    ],
    accentGradient: "from-sky-600 via-blue-800 to-slate-950",
    badgeColor: "bg-sky-500/20 text-sky-700 dark:text-sky-300 border-sky-500/30",
    iconText: "🏥",
    heroEmoji: "🏥",
    heroPattern: "from-sky-700 via-blue-800 to-indigo-950"
  },
  {
    id: "tahta",
    name: "مستشفى طهطا للتأمين الصحي",
    type: "مستشفى تخصصي - القطاع الشمالي",
    city: "طهطا (شمال سوهاج)",
    address: "مدينة طهطا - شارع المستشفى العام",
    phone: "093-5812345 / 093-5819876",
    emergency: true,
    emergencyHours: "24 ساعة طوال أيام الأسبوع",
    workingHours: "العيادات: 8:00 ص - 3:00 م | الطوارئ: 24 ساعة",
    bedsCount: "120 سريراً + 12 عناية مركزة + 8 حضانات",
    description: "ثاني أكبر مستشفيات فرع سوهاج، يخدم المنتفعين بقطاع شمال المحافظة ويوفر رعاية تخصصية وجراحية شاملة مع طوارئ واستقبال مجهز على مدار الساعة.",
    specialties: [
      "عيادات الباطنة والقلب والأوعية الدموية",
      "عيادات الجراحة العامة وجراحة المناظير",
      "عيادات العظام والكسور والروماتيزم",
      "عيادات الأطفال والحضانات والوبائية",
      "عيادات الرمد وفحص النظر",
      "عيادات الأنف والأذن والحنجرة",
      "عيادات النساء والتوليد والعقم",
      "معامل تحاليل وأشعة متقدمة"
    ],
    keyFeatures: [
      "استقبال وطوارئ 24/7 بالقطاع الشمالي",
      "غرف عمليات مجهزة بأحدث المعدات",
      "مختبرات تحاليل ومعامل حديثة"
    ],
    accentGradient: "from-emerald-600 via-green-800 to-slate-950",
    badgeColor: "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    iconText: "🏨",
    heroEmoji: "🏨",
    heroPattern: "from-emerald-700 via-teal-800 to-slate-950"
  },
  {
    id: "girga",
    name: "مستشفى جرجا للتأمين الصحي",
    type: "مستشفى تخصصي - القطاع الجنوبي",
    city: "جرجا (جنوب سوهاج)",
    address: "مدينة جرجا - الشارع الرئيسي",
    phone: "093-4601234 / 093-4605678",
    emergency: true,
    emergencyHours: "24 ساعة طوال أيام الأسبوع",
    workingHours: "العيادات: 8:00 ص - 3:00 م | الطوارئ: 24 ساعة",
    bedsCount: "100 سريراً + 10 عناية مركزة",
    description: "مستشفى تأميني متكامل يخدم منتفعي القطاع الجنوبي بجرجا وما حولها، ويقدم خدمات جراحية وتخصصية شاملة مع قسم طوارئ واستقبال يعمل 24/7.",
    specialties: [
      "عيادات الباطنة والغدد الصماء",
      "عيادات الجراحة العامة والتخصصية",
      "عيادات العظام والعلاج الطبيعي",
      "عيادات الأطفال وحديثي الولادة",
      "عيادات الأسنان وجراحة الوجه والفكين",
      "الأشعة التشخيصية والتصوير الطبي",
      "معمل التحاليل والدم وبنك الدم"
    ],
    keyFeatures: [
      "قسم طوارئ مجهز بالقطاع الجنوبي",
      "مركز لجان طبية إقليمي",
      "صيدلية صرف مميكنة"
    ],
    accentGradient: "from-rose-700 via-pink-900 to-slate-950",
    badgeColor: "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30",
    iconText: "🏩",
    heroEmoji: "🏩",
    heroPattern: "from-rose-700 via-pink-800 to-slate-950"
  },
  {
    id: "akhmim",
    name: "مجمع عيادات أخميم للتأمين الصحي",
    type: "مجمع عيادات تخصصية خارجية",
    city: "أخميم (شرق سوهاج)",
    address: "مدينة أخميم - بجوار المدرسة الإعدادية",
    phone: "093-4712233",
    emergency: false,
    workingHours: "يومياً من 8:00 ص حتى 3:00 م",
    description: "يقدم الخدمات التأمينية العلاجية لمنتفعي مدينة أخميم والمناطق المحيطة عبر عيادات متخصصة ولجان طبية لفحص الطلاب واللجان العامة.",
    specialties: [
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
    iconText: "🩺",
    heroEmoji: "🩺",
    heroPattern: "from-amber-700 via-orange-800 to-slate-950"
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
    iconText: "🏥",
    heroEmoji: "🏥",
    heroPattern: "from-teal-700 via-emerald-800 to-slate-950"
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
    iconText: "⭐",
    heroEmoji: "⭐",
    heroPattern: "from-purple-700 via-indigo-800 to-slate-950"
  }
];

interface HospitalsShowcaseProps {
  onOpenBooking: () => void;
}

export default function HospitalsShowcase({ onOpenBooking }: HospitalsShowcaseProps) {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalFacility, setActiveModalFacility] = useState<HospitalFacility | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

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
    <div className="space-y-6 sm:space-y-8">
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* GRAND HERO SECTION: SOHAG HEALTH INSURANCE BRANCH                       */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white shadow-2xl">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[80px]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }} />
        
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
          {/* TOP BADGES */}
          <div className="flex items-center gap-2.5 flex-wrap mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-200 border border-red-500/30 text-xs font-extrabold shadow-sm">
              <HeartHandshake className="w-4 h-4 text-red-400" />
              صحتك أمانة بين إيدينا
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-500/30 text-xs font-extrabold">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              الهيئة العامة للتأمين الصحي
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-xs font-bold">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              خدمة مستمرة 24/7
            </span>
          </div>

          {/* MAIN TITLE */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.15] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-sky-300">
              فرع سوهاج للتأمين الصحي
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-sky-100/90 leading-relaxed max-w-4xl mb-6">
            شبكة متكاملة من المستشفيات التخصصية ومجمعات العيادات واللجان الطبية العليا، مجهزة بأحدث الأجهزة الطبية والربط الرقمي المميكن، تقدم رعاية صحية شاملة لملايين المنتفعين من أبناء محافظة سوهاج.
          </p>

          {/* GRAND STATS ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.12] transition group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-2xl sm:text-4xl font-black text-amber-400 font-mono block">6+</span>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-bold">مستشفيات ومجمعات كبرى</p>
              <Building2 className="w-5 h-5 text-amber-400/30 absolute bottom-3 left-3 group-hover:text-amber-400/60 transition" />
            </div>

            <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.12] transition group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-2xl sm:text-4xl font-black text-sky-400 font-mono block">2.8M+</span>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-bold">منتفع ومستفيد بالمحافظة</p>
              <Users className="w-5 h-5 text-sky-400/30 absolute bottom-3 left-3 group-hover:text-sky-400/60 transition" />
            </div>

            <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.12] transition group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-2xl sm:text-4xl font-black text-emerald-400 font-mono block">500+</span>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-bold">سرير وعناية مركزة وحضانة</p>
              <Bed className="w-5 h-5 text-emerald-400/30 absolute bottom-3 left-3 group-hover:text-emerald-400/60 transition" />
            </div>

            <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.12] transition group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
              <span className="text-2xl sm:text-4xl font-black text-red-400 font-mono block">24/7</span>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-bold">طوارئ ورعاية مستمرة</p>
              <Ambulance className="w-5 h-5 text-red-400/30 absolute bottom-3 left-3 group-hover:text-red-400/60 transition" />
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2.5 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Stethoscope className="w-5 h-5" />
              <span>احجز موعد كشفك الآن</span>
              <ExternalLink className="w-4 h-4 opacity-60" />
            </button>

            <Link
              href="/team"
              className="px-6 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 backdrop-blur-sm transition"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>فريق العمل وأطقم المستشفيات</span>
            </Link>

            <a
              href="#schedules-section"
              className="px-6 py-3.5 sm:py-4 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 text-white font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <Clock className="w-4 h-4 text-teal-300" />
              <span>جداول العيادات</span>
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* SECTION TITLE: OUR HOSPITALS                                             */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="text-center space-y-2 pt-2">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          🏥 مستشفيات ومراكز فرع سوهاج
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          اكتشف المنشآت الطبية والمستشفيات التابعة لفرع سوهاج للتأمين الصحي عبر محافظة سوهاج
        </p>
      </div>

      {/* FILTER & SEARCH BAR FOR HOSPITALS */}
      <div className="sticky top-16 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {[
            { key: "all", label: `الكل (${SOHAG_FACILITIES.length})`, emoji: "🏥" },
            { key: "مدينة سوهاج", label: "سوهاج", emoji: "🌆" },
            { key: "طهطا", label: "طهطا", emoji: "🏘️" },
            { key: "جرجا", label: "جرجا", emoji: "🏘️" },
            { key: "أخميم", label: "أخميم", emoji: "🏘️" },
            { key: "البلينا", label: "البلينا", emoji: "🏘️" }
          ].map((city) => (
            <button
              key={city.key}
              onClick={() => setSelectedCity(city.key)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                selectedCity === city.key
                  ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md shadow-sky-600/20"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{city.emoji}</span>
              <span>{city.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو التخصص..."
            className="w-full pr-9 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════ */}
      {/* HOSPITAL CARDS GRID - PREMIUM DESIGN                                    */}
      {/* ══════════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        {filteredFacilities.map((facility) => {
          const isExpanded = expandedCard === facility.id;
          return (
            <div
              key={facility.id}
              className="group relative overflow-hidden rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* HOSPITAL HERO IMAGE AREA - Gradient with architectural pattern */}
              <div className={`relative h-48 sm:h-56 bg-gradient-to-br ${facility.heroPattern} overflow-hidden`}>
                {/* Architectural pattern overlay */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }} />
                
                {/* Floating hospital emoji */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 select-none">
                  {facility.heroEmoji}
                </div>

                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* TOP BADGES */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  {facility.emergency && (
                    <span className="px-3 py-1.5 rounded-full bg-red-600/90 text-white text-[11px] font-black flex items-center gap-1.5 shadow-lg shadow-red-900/30 animate-pulse backdrop-blur-sm">
                      <Ambulance className="w-3.5 h-3.5" />
                      <span>طوارئ 24/7</span>
                    </span>
                  )}
                  <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold shadow-sm border border-white/20">
                    📍 {facility.city}
                  </span>
                </div>

                {/* BOTTOM TITLE ON IMAGE */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <h3 className="font-black text-lg sm:text-xl text-white leading-snug drop-shadow-lg">
                    {facility.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 font-semibold">
                    {facility.type}
                  </p>
                </div>
              </div>

              {/* CARD BODY CONTENT */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {facility.description}
                </p>

                {/* QUICK INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50">
                    <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">العنوان</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{facility.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50">
                    <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">مواعيد العمل</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{facility.workingHours}</p>
                    </div>
                  </div>

                  {facility.bedsCount && (
                    <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50">
                      <Bed className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">السعة السريرية</span>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">{facility.bedsCount}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-violet-50/70 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900/50">
                    <Phone className="w-4 h-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-violet-700 dark:text-violet-400 uppercase tracking-wider">التواصل</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-mono" dir="ltr">{facility.phone}</p>
                    </div>
                  </div>
                </div>

                {/* SPECIALTIES TAGS */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5" />
                    الأقسام والتخصصات:
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {facility.specialties.slice(0, isExpanded ? 999 : 4).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                      >
                        {spec}
                      </span>
                    ))}
                    {!isExpanded && facility.specialties.length > 4 && (
                      <button
                        onClick={() => setExpandedCard(facility.id)}
                        className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-sky-800/40 hover:bg-sky-100 transition flex items-center gap-1"
                      >
                        <ChevronDown className="w-3 h-3" />
                        +{facility.specialties.length - 4} تخصصاً
                      </button>
                    )}
                    {isExpanded && (
                      <button
                        onClick={() => setExpandedCard(null)}
                        className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                      >
                        عرض أقل
                      </button>
                    )}
                  </div>
                </div>

                {/* KEY FEATURES */}
                <div className="space-y-1.5 pt-1">
                  {facility.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CARD ACTION BUTTONS */}
                <div className="pt-3 flex items-center gap-2.5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveModalFacility(facility)}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 dark:from-slate-800 dark:to-slate-800/80 dark:hover:from-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                  >
                    <Eye className="w-4 h-4 text-sky-600" />
                    <span>عرض كل التفاصيل</span>
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
                  >
                    <Stethoscope className="w-4 h-4" />
                    <span>حجز موعد</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredFacilities.length === 0 && (
        <div className="p-10 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-slate-700 dark:text-slate-300 font-bold text-sm">لم يتم العثور على نتائج مطابقة</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCity("all"); }}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200 transition"
          >
            إعادة ضبط البحث
          </button>
        </div>
      )}

      {/* MODAL: FULL FACILITY DETAILS */}
      {activeModalFacility && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4" onClick={() => setActiveModalFacility(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Hero */}
            <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${activeModalFacility.heroPattern} overflow-hidden`}>
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-20 select-none">{activeModalFacility.heroEmoji}</div>
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
              
              <button
                onClick={() => setActiveModalFacility(null)}
                className="absolute top-4 left-4 p-2.5 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                {activeModalFacility.emergency && (
                  <span className="px-3 py-1.5 rounded-full bg-red-600/90 text-white text-xs font-black flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Ambulance className="w-3.5 h-3.5" />
                    طوارئ 24/7
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 inset-x-0 px-6">
                <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">{activeModalFacility.name}</h3>
                <p className="text-xs text-white/80 mt-0.5 font-semibold">{activeModalFacility.type} • {activeModalFacility.city}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeModalFacility.description}
              </p>

              {/* Quick Contact & Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40">
                  <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">العنوان</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{activeModalFacility.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">التواصل</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 font-mono" dir="ltr">{activeModalFacility.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">مواعيد العمل</span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{activeModalFacility.workingHours}</p>
                  </div>
                </div>
                {activeModalFacility.bedsCount && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/40">
                    <Bed className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">السعة</span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{activeModalFacility.bedsCount}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* All Specialties List */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  <span>الأقسام الطبية والتخصصات ({activeModalFacility.specialties.length}):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeModalFacility.specialties.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-sky-50/50 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700/60">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="text-slate-800 dark:text-slate-200">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs text-slate-500 uppercase tracking-wider">أبرز المميزات:</h4>
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
                  className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>حجز موعد كشف بهذه المنشأة</span>
                </button>

                <Link
                  href="/team"
                  className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-amber-500" />
                  <span>الطاقم الطبي</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
