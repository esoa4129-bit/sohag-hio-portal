"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CreditCard,
  FileText,
  CheckCircle2,
  ZoomIn,
  X,
  Download,
  Users,
  Baby,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  MapPin,
  Sparkles,
  Info
} from "lucide-react";

export interface GuideItem {
  id: string;
  category: "all" | "employees" | "pensioners" | "students" | "children" | "widows";
  categoryLabel: string;
  categoryColor: string;
  categoryIcon: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc: string;
  targetAudience: string;
  documents: string[];
  steps: string[];
  location: string;
  notes?: string;
}

const GUIDES_DATA: GuideItem[] = [
  {
    id: "guide-employees",
    category: "employees",
    categoryLabel: "الموظفون الجدد",
    categoryColor: "blue",
    categoryIcon: <Briefcase className="w-4 h-4" />,
    title: "بطاقة التأمين للموظفين الجدد (بطاقتك العلاجية حقك)",
    subtitle: "إجراءات إثبات اللياقة الطبية واستخراج البطاقة العلاجية عند التعيين",
    imageSrc: "/guides/card-employees.jpg",
    targetAudience: "المعينون الجدد بالجهاز الإداري للدولة والقطاعين العام والخاص",
    documents: [
      "استمارة مميكنة معتمدة ومختومة بختم النسر من جهة العمل",
      "بطاقة رقم قومي سارية + عدد 2 صورة شخصية حديثة",
      "برنت تأميني (طابعة بالرقم التأميني) من مكتب التأمينات",
      "برنت منشأة من التأمينات وجهة العمل"
    ],
    steps: [
      "استيفاء استمارة التعيين واعتمادها بختم النسر من جهة العمل",
      "استخراج برنت تأميني وبرنت منشأة من التأمينات الاجتماعية",
      "التوجه لمركز إصدار البطاقات العلاجية التابع له جهة العمل",
      "تسليم الملف واستلام البطاقة العلاجية فور استكمال الأوراق"
    ],
    location: "مراكز إصدار البطاقات بديوان عام الفرع وإدارات المناطق واللجان الطبية"
  },
  {
    id: "guide-pensioners",
    category: "pensioners",
    categoryLabel: "أصحاب المعاشات",
    categoryColor: "emerald",
    categoryIcon: <HeartHandshake className="w-4 h-4" />,
    title: "استخراج وتجديد بطاقة التأمين الصحي للمعاشات",
    subtitle: "الدليل الشامل لأصحاب المعاشات والمستفيدين والتحول الرقمي للتجديد",
    imageSrc: "/guides/card-pensioners.jpg",
    targetAudience: "المحالون للتقاعد وأصحاب المعاشات والمستحقين عنهم",
    documents: [
      "استمارة اشتراك مميكنة للمعاشات معتمدة ومختومة",
      "صورة بطاقة الرقم القومي سارية",
      "عدد 2 صورة شخصية حديثة",
      "طابعة بيان معاش بالرقم التأميني (التجديد الآن بالرقم القومي فقط)"
    ],
    steps: [
      "التوجه لمركز إصدار البطاقات العلاجية لصرف استمارة المعاش لأول مرة",
      "التوجه لمكتب التأمينات لاعتماد الاستمارة واستخراج طابعة بيان المعاش",
      "التوجه لأقرب مركز إصدار بطاقات علاجية تابع لمحل الإقامة بسوهاج",
      "تقديم المستندات واستلام البطاقة بعد مراجعة البيانات مباشرة"
    ],
    location: "مراكز إصدار البطاقات العلاجية (إدارة منطقة سوهاج - العيادات التخصصية - مراكز الفرع)",
    notes: "ملحوظة هامة: تم تفعيل التجديد السريع بالرقم القومي فقط تسهيلاً لكبار السن."
  },
  {
    id: "guide-students",
    category: "students",
    categoryLabel: "طلاب المدارس",
    categoryColor: "amber",
    categoryIcon: <GraduationCap className="w-4 h-4" />,
    title: "استخراج كارنيه التأمين الصحي لطلاب المدارس",
    subtitle: "كافة مراحل التعليم: ابتدائي • إعدادي • ثانوي بجميع مدن ومراكز سوهاج",
    imageSrc: "/guides/card-students.jpg",
    targetAudience: "جميع الطلاب المسجلين بالمدارس الحكومية والتجريبية والخاصة والأزهر",
    documents: [
      "شهادة ميلاد مميكنة كمبيوتر حديثة للطالب",
      "صورة شخصية حديثة للطالب",
      "إثبات قيد معتمد ومختوم من المدرسة المقيد بها",
      "إيصال سداد المصروفات المدرسية أو ما يفيد السداد",
      "صورة بطاقة الرقم القومي لولي الأمر"
    ],
    steps: [
      "التوجه لشئون الطلاب بالمدرسة واستخراج إثبات القيد",
      "تجهيز الأوراق المطلوبة وصورة بطاقة ولي الأمر",
      "التوجه لأقرب وحدة صحة مدرسية أو إدارة المنطقة التعليمية للتأمين",
      "تقديم الأوراق وسداد الرسوم المقررة واستلام الكارنيه في نفس اليوم"
    ],
    location: "أقرب وحدة صحة مدرسية، أو إدارة المنطقة (شارع المدارس بسوهاج)، أو إدارة الفرع"
  },
  {
    id: "guide-children",
    category: "children",
    categoryLabel: "الأطفال والمواليد",
    categoryColor: "purple",
    categoryIcon: <Baby className="w-4 h-4" />,
    title: "استخراج التأمين الصحي للأطفال حديثي الولادة والمواليد",
    subtitle: "حماية ورعاية طبية شاملة لمواليد مصر من اليوم الأول",
    imageSrc: "/guides/card-children.jpg",
    targetAudience: "الأطفال حديثو الولادة والمواليد دون سن المدرسة",
    documents: [
      "شهادة ميلاد الطفل كمبيوتر (أو شهادة الميلاد الورقية لحديثي الولادة)",
      "صورة بطاقة الرقم القومي للأب أو ولي الأمر سارية"
    ],
    steps: [
      "تجهيز شهادة ميلاد الطفل وصورة بطاقة الأب/ولي الأمر",
      "التوجه مباشرة لأقرب وحدة صحة مدرسية تابعة لمحل سكن ولي الأمر",
      "تسجيل بيانات الطفل في منظومة التأمين الصحي للأطفال",
      "استلام كارنيه التأمين الصحي للطفل فوراً في نفس اليوم"
    ],
    location: "أقرب وحدة صحة مدرسية تابعة لمحل سكن ولي الأمر بمحافظة سوهاج"
  },
  {
    id: "guide-widows",
    category: "widows",
    categoryLabel: "السيدات الأرامل",
    categoryColor: "rose",
    categoryIcon: <Users className="w-4 h-4" />,
    title: "استخراج بطاقة التأمين الصحي للسيدات الأرامل",
    subtitle: "دليلك المختصر للحصول على الرعاية الصحية والبطاقة التأمينية",
    imageSrc: "/guides/card-widows.jpg",
    targetAudience: "السيدات الأرامل المستحقات لمعاش تأميني",
    documents: [
      "بطاقة رقم قومي سارية للزوجة (الأرملة)",
      "شهادة وفاة الزوج الرسمية المميكنة",
      "صورة شخصية حديثة",
      "استمارة انتفاع من التأمين الصحي",
      "بيان معاش رسمي معتمد من التأمينات الاجتماعية"
    ],
    steps: [
      "التوجه لمكتب التأمينات الاجتماعية التابع له المعاش",
      "طلب بيان تأميني واعتماد استمارة الانتفاع",
      "التوجه لفرع التأمين الصحي بسوهاج أو أقرب مركز بطاقات",
      "تقديم الأوراق والمستندات واستخراج البطاقة الصحية مباشرة"
    ],
    location: "ديوان عام فرع سوهاج للتأمين الصحي ومراكز إصدار البطاقات بإدارات المناطق"
  }
];

export default function CardsGuideSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GuideItem | null>(null);

  const filteredGuides =
    activeCategory === "all"
      ? GUIDES_DATA
      : GUIDES_DATA.filter((g) => g.category === activeCategory);

  return (
    <section id="cards-guide-section" className="scroll-mt-24 space-y-6">
      {/* Section Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white p-6 sm:p-8 md:p-10 border border-teal-500/30 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>الهيئة العامة للتأمين الصحي • صحتك أمانة بين أيدينا</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              🪪 دليل استخراج وتجديد البطاقات العلاجية
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
              دليلك الرسمي المعتمد لمعرفة الأوراق المطلوبة، والخطوات التفصيلية، وأماكن استخراج الكارنيهات والبطاقات الصحية لكافة الفئات التأمينية بسوهاج.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
            <CreditCard className="w-8 h-8 text-emerald-400" />
            <div className="text-right">
              <p className="text-xs text-emerald-300 font-bold">٥ أدلة رسمية معتمدة</p>
              <p className="text-[11px] text-slate-300">انقر على أي إنفوجرافيك للتكبير</p>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === "all"
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <span>جميع الفئات (٥)</span>
          </button>
          {GUIDES_DATA.map((guide) => (
            <button
              key={guide.id}
              type="button"
              onClick={() => setActiveCategory(guide.category)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === guide.category
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                  : "bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {guide.categoryIcon}
              <span>{guide.categoryLabel}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <div
            key={guide.id}
            className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with Zoom Overlay */}
              <div
                onClick={() => setSelectedImage(guide)}
                className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden border-b border-slate-100 dark:border-slate-800"
              >
                <Image
                  src={guide.imageSrc}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 group-hover:scale-102 transition duration-500"
                  priority={guide.id === "guide-employees"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition flex items-end justify-between p-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-xs font-black flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
                    <span>تكبير الإنفوجرافيك</span>
                  </span>
                  <span className="text-[11px] font-bold text-white/90 bg-emerald-600/90 px-2.5 py-1 rounded-lg">
                    {guide.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-5 sm:p-6 space-y-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {guide.subtitle}
                  </p>
                </div>

                {/* Required Documents */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-black text-xs">
                    <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>الأوراق والمستندات المطلوبة:</span>
                  </div>
                  <ul className="space-y-1.5 pr-2">
                    {guide.documents.map((doc, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="text-amber-500 font-bold shrink-0">•</span>
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-black text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>خطوات وإجراءات الاستخراج:</span>
                  </div>
                  <ol className="space-y-1.5 pr-1">
                    {guide.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
                  <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">أين يتم الاستخراج: </span>
                    <span>{guide.location}</span>
                  </div>
                </div>

                {guide.notes && (
                  <div className="flex items-center gap-1.5 text-[11px] text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 p-2.5 rounded-xl border border-teal-200 dark:border-teal-900/40">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    <span>{guide.notes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Button */}
            <div className="p-5 pt-0">
              <button
                type="button"
                onClick={() => setSelectedImage(guide)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-300 font-black text-xs transition flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
              >
                <ZoomIn className="w-4 h-4 text-emerald-600" />
                <span>عرض الإنفوجرافيك الرسمي بالحجم الكامل</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Fullscreen Image Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {selectedImage.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    الهيئة العامة للتأمين الصحي • إنفوجرافيك الإرشادات المعتمدة
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedImage.imageSrc}
                  download={selectedImage.title}
                  className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 text-xs font-bold transition flex items-center gap-1.5"
                  title="تحميل الصورة"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">تحميل الإنفوجرافيك</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 hover:text-rose-600 transition"
                  title="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Image View */}
            <div className="relative flex-1 min-h-[350px] sm:min-h-[500px] bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-auto">
              <Image
                src={selectedImage.imageSrc}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold">
                📍 مكان تقديم الخدمة: {selectedImage.location}
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold">
                فرع سوهاج للتأمين الصحي • بوابة الخدمات الرقمية
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
