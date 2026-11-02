"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  IdCard,
  FileText,
  PhoneCall,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Building2,
  Server,
  ArrowRight,
  HeartPulse,
  Award
} from "lucide-react";
import OfficialPortalFooter from "../components/OfficialPortalFooter";

export default function PrivacyPolicyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shadow-sm border border-slate-200 dark:border-slate-700">
                <Image src="/logo.png?v=3" alt="شعار التأمين الصحي" width={40} height={40} className="object-contain" priority />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block leading-tight">
                  الهيئة العامة للتأمين الصحي
                </span>
                <h1 className="font-extrabold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-tight">
                  فرع سوهاج • سياسة الخصوصية
                </h1>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 flex-grow space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-10 shadow-xl shadow-emerald-950/20">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-xs font-bold text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>حماية البيانات وحرية الخصوصية</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              سياسة الخصوصية وحماية الرقم القومي
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              تلتزم الهيئة العامة للتأمين الصحي - فرع سوهاج بأعلى معايير الأمان الرقمي وسرية المعلومات الشخصية والطبية لجميع منتفعي المحافظة وفقاً للتشريعات المنظمة.
            </p>
          </div>
        </div>

        {/* Protection Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <IdCard className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              1. كيف نتعامل مع الرقم القومي؟
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              يُطلب الرقم القومي <strong>فقط وحصرياً</strong> للتحقق من هوية المنتفع والتأكد من سريان التغطية التأمينية وحجز الموعد بالعيادة التابعة له.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-[11px] text-emerald-800 dark:text-emerald-300">
              ✓ لا يتم تخزين أرقامك القومية على أي خوادم وسيطة أو مشاركتها مع أي جهة خارجية.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              2. التشفير والاتصال الآمن (SSL)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              كافة البيانات والاتصالات مشفرة ببروتوكول التشفير الآمن (HTTPS / TLS 1.3)، مما يضمن عدم إمكانية اعتراض أو قراءة البيانات أثناء الحجز.
            </p>
            <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 text-[11px] text-sky-800 dark:text-sky-300">
              ✓ انتقال فوري ومباشر إلى سيرفر الحجز المركزي المعتمد للهيئة العامة للتأمين الصحي.
            </div>
          </div>
        </div>

        {/* Official Transparency & Server Identification */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3>الروابط والسيرفرات الحكومية الرسمية</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            حرصاً على الشفافية التامة مع أهالينا في سوهاج، توضح البوابة أن الحجز يتم بالربط المباشر مع السيرفرات الرسمية المعتمدة للهيئة:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <strong className="text-slate-800 dark:text-slate-200 block">منظومة الحجز المركزي للعيادات</strong>
                <span className="text-[11px] text-slate-500">سيرفر الإدارة المركزية لنظم المعلومات والتحول الرقمي بالهيئة</span>
              </div>
              <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 shrink-0" dir="ltr">
                reserv.hiocdis.org
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <strong className="text-slate-800 dark:text-slate-200 block">الخط الساخن الموحد للتأمين الصحي</strong>
                <span className="text-[11px] text-slate-500">الرقم المعتمد الوحيد لكافة الاستفسارات والشكاوى والدعم الفني</span>
              </div>
              <span className="font-mono font-bold text-sm text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-200 dark:border-sky-800 shrink-0" dir="ltr">
                106
              </span>
            </div>
          </div>
        </div>

        {/* User Rights & Obligations */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>حقوق والتزامات المنتفع</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc list-inside">
            <li>الحجز متاح مجاناً لكافة حاملي بطاقات التأمين الصحي والطلاب والمواليد والموظفين وأصحاب المعاشات بسوهاج.</li>
            <li>البوابة <strong>لا تطلب إطلاقاً</strong> أي بيانات مالية أو أرقام بطاقات دفع بنكية (فيزا / ماستركارد). الحجز الإلكتروني مجاني 100%.</li>
            <li>في حال عدم التمكن من الحضور في الموعد المحدد، يُرجى إلغاء الحجز عبر البوابة لإتاحة الفرصة لمريض آخر.</li>
            <li>لأي استفسارات أو بلاغات، يمكن التواصل مباشرة مع ديوان عام الفرع بميدان الثقافة أو الاتصال بالخط الساخن 106.</li>
          </ul>
        </div>

        {/* Supervisory Signoff */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-bold text-slate-700 dark:text-slate-300">
            الهيئة العامة للتأمين الصحي - فرع سوهاج
          </p>
          <p className="text-[11px]">
            إشراف إدارة النظم والمعلومات وقسم تكنولوجيا المعلومات بالفرع
          </p>
        </div>
      </main>

      {/* Footer */}
      <OfficialPortalFooter />
    </div>
  );
}
