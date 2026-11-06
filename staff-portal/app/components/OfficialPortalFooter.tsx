"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Building2,
  HeartPulse,
  ChevronLeft,
  Sparkles,
  Layers,
  Server
} from "lucide-react";

export default function OfficialPortalFooter() {
  return (
    <footer className="mt-14 border-t border-slate-200 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950 text-slate-700 dark:text-slate-300 transition-colors">
      {/* Top Banner / Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pb-10 border-b border-slate-200/80 dark:border-slate-800">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <Image
                  src="/logo.png"
                  alt="شعار التأمين الصحي"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-sky-600 dark:text-sky-400 block">
                  جمهورية مصر العربية
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                  الهيئة العامة للتأمين الصحي
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  فرع سوهاج • ديوان عام الفرع
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              البوابة الرقمية الموحدة للعاملين والكوادر الطبية والإدارية، للوصول المباشر إلى المنظومات والأنظمة السحابية والداخلية بكافة وحدات الفرع.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 text-[11px] font-bold text-sky-700 dark:text-sky-300">
              <HeartPulse className="w-3.5 h-3.5 shrink-0 text-sky-600 dark:text-sky-400" />
              <span>شعارنا: صحتك أمانة بين إيدينا</span>
            </div>
          </div>

          {/* Column 2: Quick Links & Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>أقسام البوابة والخدمات</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/booking"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 group font-medium"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition" />
                  <span>بوابة حجز مواعيد العيادات للمنتفعين</span>
                </Link>
              </li>
              <li>
                <a
                  href="#hospitals-section"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition" />
                  <span>شبكة المستشفيات والعيادات والمجمعات</span>
                </a>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 group font-semibold text-sky-700 dark:text-sky-300"
                >
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                  <span>لوحة الشرف وهيكل القيادات بالفرع</span>
                </Link>
              </li>
              <li>
                <a
                  href="#systems-grid"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 group"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-500 transition" />
                  <span>دليل المنظومات الطبية واللجان المتخصصة</span>
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1.5 group text-slate-600 dark:text-slate-300 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  <span>سياسة الخصوصية وحماية الرقم القومي</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Main Facilities Directory */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>المنشآت والمستشفيات التابعة</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">مستشفى الهلال للتأمين الصحي</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">استقبال وطوارئ وعمليات 24 ساعة</span>
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">مجمع عيادات العاشر من رمضان</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">مقر اللجنة الطبية العامة بسوهاج</span>
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">عيادات التخصصية بسوهاج</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">مقر اللجنة الطبية الفرعية</span>
                </div>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                <div>
                  <strong className="text-slate-800 dark:text-slate-200 block">منطقة سوهاج وعيادات الوفاء</strong>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">الإشراف والخدمات التخصصية للمراكز</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency & Official Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>أرقام الطوارئ والدعم الفني</span>
            </h4>

            {/* Official Hotline Card */}
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  الخط الساخن الموحد للتأمين الصحي
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white font-black">
                  مجاني 24/7
                </span>
              </div>
              <a
                href="tel:106"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-lg shadow-sm transition active:scale-95"
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span dir="ltr">106</span>
              </a>
              <p className="text-[10px] text-center text-slate-500 dark:text-slate-400">
                الرقم المعتمد الوحيد لشكاوى واستفسارات التأمين الصحي
              </p>
            </div>

            {/* Sohag Branch Administration Phone */}
            <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-900 dark:text-emerald-200">هاتف إدارة فرع سوهاج:</span>
                <a
                  href="tel:0832156139"
                  className="font-black text-emerald-700 dark:text-emerald-300 hover:underline"
                  dir="ltr"
                >
                  0832156139
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
                <Building2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>المقر الرئيسي لديوان عام فرع سوهاج للتأمين الصحي</span>
              </div>
            </div>

            {/* Hilal Emergency Direct Phone */}
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700 dark:text-slate-300">طوارئ مستشفى الهلال:</span>
                <a
                  href="tel:0932324567"
                  className="font-bold text-red-600 dark:text-red-400 hover:underline"
                  dir="ltr"
                >
                  093-2324567
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>سوهاج - شارع المحطة أمام محطة القطار</span>
              </div>
            </div>
          </div>

        </div>

        {/* Official Governance & Leadership Strip */}
        <div className="py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              إشراف ورعاية: <strong className="text-slate-900 dark:text-white">دكتور / محمد خلف عفيفي</strong> - مدير عام فرع سوهاج
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] flex-wrap">
            <span>مواعيد العمل: الفترة الصباحية (8:00 ص - 2:00 م)</span>
            <span>•</span>
            <span>الفترة المسائية (4:00 م - 8:00 م)</span>
            <span>•</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">أقسام الطوارئ 24/7</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & IT Team */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right text-[11px] text-slate-500 dark:text-slate-400">
          <div className="space-y-1">
            <p className="font-medium">
              جميع الحقوق محفوظة © {new Date().getFullYear()} الهيئة العامة للتأمين الصحي - فرع سوهاج.
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              تطوير وإشراف: إدارة النظم والمعلومات وقسم تكنولوجيا المعلومات بالفرع
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/team"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition"
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>فريق التطوير والقيادات</span>
            </Link>
            <div className="flex items-center gap-1 text-[10px] text-sky-600 dark:text-sky-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>خوادم رسمية مشفرة ومؤمنة</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
