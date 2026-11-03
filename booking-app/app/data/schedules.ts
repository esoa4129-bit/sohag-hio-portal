/**
 * 🏥 قاعدة البيانات الرسمية لجداول مواعيد تشغيل العيادات واللجان الطبية
 * فرع سوهاج للتأمين الصحي - مستخرجة بالكامل ومطابقة للصور الرسمية
 */

export type DayOfWeek = "السبت" | "الأحد" | "الإثنين" | "الثلاثاء" | "الأربعاء" | "الخميس";

export type FacilityScheduleId = "10th-morning" | "10th-evening" | "wafa-morning" | "wafa-evening" | "specialized";

export type SpecialtyCategory = "clinics" | "pediatrics" | "committees" | "support_services";

export interface ClinicScheduleRow {
  id: string;
  facilityId: FacilityScheduleId;
  facilityName: string;
  facilityLocation: string;
  shift: "morning" | "evening";
  shiftLabel: string;
  hours: string;
  category: SpecialtyCategory;
  categoryLabel: string;
  name: string; // اسم العيادة / اللجنة / الخدمة
  days: DayOfWeek[];
  doctorTitle?: string;
  notes?: string;
  imageSrc: string;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس"
];

export const CATEGORY_LABELS: Record<SpecialtyCategory, string> = {
  clinics: "العيادات التخصصية",
  pediatrics: "عيادات الأطفال",
  committees: "اللجان الطبية المتخصصة",
  support_services: "الفحوصات والخدمات الإضافية"
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. مجمع العاشر من رمضان - الفترة الصباحية
// ═══════════════════════════════════════════════════════════════════════════
const RAMADAN_10_MORNING: ClinicScheduleRow[] = [
  // العيادات العامة والتخصصية
  {
    id: "10m-vascular",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان - بجوار مديرية الصحة",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أوعية دموية",
    days: ["السبت", "الأحد", "الإثنين", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-surgery",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة عامة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ent",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أنف وأذن وحنجرة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-chest",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "صدر",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-internal",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "باطنة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ophthalmology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "رمد",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-oncology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أورام",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-nephrology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "كلى كبار",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-cardiology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "قلب",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-speech",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "تخاطب",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-plastic-surgery",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة تجميل",
    days: ["السبت"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-orthopedics",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "عظام",
    days: ["السبت", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-dermatology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جلدية",
    days: ["السبت", "الأحد", "الإثنين"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-neurosurgery",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة مخ وأعصاب",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-gastro",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جهاز هضمي",
    days: ["الأحد", "الإثنين"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-audiology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "السمعيات",
    days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-hematology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أمراض دم",
    days: ["الثلاثاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-dental",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أسنان",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-diabetic-center",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "مركز السكر",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-family-planning",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "تنظيم الأسرة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-gp",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "الممارس العام",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-physiotherapy",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "علاج طبيعي",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },

  // عيادات الأطفال الصباحية
  {
    id: "10m-ped-nephrology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "كلى أطفال",
    days: ["السبت", "الثلاثاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-surgery",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "جراحة أطفال",
    days: ["السبت", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-endocrine",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "الغدد الصماء للأطفال",
    days: ["السبت", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-consultant",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "استشاري أطفال",
    doctorTitle: "استشاري",
    days: ["الأحد", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-diabetes",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "سكر أطفال",
    days: ["الأحد"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-growth",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "تقييم هرمون النمو للأطفال",
    days: ["الأحد"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-diab-center",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "مركز سكر أطفال",
    days: ["الأحد", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ped-neurology",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "أعصاب أطفال",
    days: ["الإثنين", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },

  // اللجان الطبية الصباحية
  {
    id: "10m-comm-cardio",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة قلب",
    days: ["السبت", "الثلاثاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-drug",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة تنسيق الدواء",
    days: ["الأحد", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-ped-cardio",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة قلب أطفال",
    days: ["الإثنين"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-muscular",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة ضمور العضلات",
    days: ["الإثنين"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-blood",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة أمراض دم",
    days: ["الثلاثاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-growth",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة هرمون النمو",
    days: ["الثلاثاء", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-comm-entresto",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة قلب الإنترستو",
    days: ["الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },

  // الخدمات الإضافية الصباحية
  {
    id: "10m-echo",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "الإيكو (أشعة تلفزيونية على القلب)",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-wound-care",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "غيار الجروح",
    days: ["السبت", "الإثنين", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  },
  {
    id: "10m-ultrasound",
    facilityId: "10th-morning",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "الأشعة التلفزيونية (السونار)",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-morning.jpg"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 2. مجمع العاشر من رمضان - الفترة المسائية
// ═══════════════════════════════════════════════════════════════════════════
const RAMADAN_10_EVENING: ClinicScheduleRow[] = [
  {
    id: "10e-gp",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "الممارس العام",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-internal",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "باطنة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-orthopedics",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "عظام",
    days: ["الأحد", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-surgery",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة عامة",
    days: ["الأحد"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-pediatrics",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "pediatrics",
    categoryLabel: "عيادات الأطفال",
    name: "أطفال",
    days: ["الأحد", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-urology",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "مسالك بولية",
    days: ["الإثنين", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-echo",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "إيكو (أشعة تلفزيونية على القلب)",
    days: ["الثلاثاء", "الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  },
  {
    id: "10e-rheumatology",
    facilityId: "10th-evening",
    facilityName: "مجمع العاشر من رمضان",
    facilityLocation: "سوهاج - مجمع العاشر من رمضان",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "روماتيزم وتأهيل",
    days: ["الأربعاء"],
    imageSrc: "/schedules/10th-ramadan-evening.jpg"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. عيادة الوفاء الشاملة - الصباحية والمسائية
// ═══════════════════════════════════════════════════════════════════════════
const WAFA_CLINIC_SCHEDULES: ClinicScheduleRow[] = [
  // الصباحي (8:00 ص - 2:00 م)
  {
    id: "wafa-m-internal",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "باطنة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-rheumatology",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "روماتيزم",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-dermatology",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جلدية",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-chest",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "صدر",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-nephrology",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "كلى",
    days: ["السبت", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-orthopedics",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "عظام",
    days: ["الأحد", "الإثنين", "الأربعاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-surgery",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة عامة",
    days: ["الإثنين", "الثلاثاء", "الأربعاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-ent",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أنف وأذن",
    days: ["الإثنين"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-ophthalmology",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "رمد",
    days: ["الإثنين", "الثلاثاء", "الأربعاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-gynecology",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "نساء وتوليد",
    days: ["الإثنين", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-vascular",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أوعية دموية",
    days: ["الثلاثاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-gp",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "الممارس العام",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-physio",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "علاج طبيعي",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-dental",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أسنان",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-daily-services",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "المعمل والتحاليل الطبية",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    notes: "خدمة متاحة يومياً صباحاً",
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-xray",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "الأشعة العادية (X-Ray)",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    notes: "خدمة متاحة يومياً صباحاً",
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-m-ecg",
    facilityId: "wafa-morning",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "رسم القلب (ECG)",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    notes: "خدمة متاحة يومياً صباحاً",
    imageSrc: "/schedules/wafa-clinic.jpg"
  },

  // عيادة الوفاء - المسائي (4:00 م - 8:00 م)
  {
    id: "wafa-e-internal",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "باطنة",
    days: ["السبت", "الأحد", "الإثنين", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-e-pain",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "عيادة الألم وتسكين الآلام المزمنة",
    days: ["السبت"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-e-ultrasound",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "الأشعة التلفزيونية (السونار)",
    days: ["الأحد", "الثلاثاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-e-surgery",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة عامة",
    days: ["الأربعاء"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-e-gp",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "الممارس العام",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/wafa-clinic.jpg"
  },
  {
    id: "wafa-e-xray",
    facilityId: "wafa-evening",
    facilityName: "عيادة الوفاء الشاملة",
    facilityLocation: "سوهاج - شارع سيتي الرئيسي",
    shift: "evening",
    shiftLabel: "الفترة المسائية",
    hours: "4:00 م - 8:00 م",
    category: "support_services",
    categoryLabel: "الفحوصات والخدمات الإضافية",
    name: "الأشعة العادية (X-Ray)",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    notes: "خدمة متاحة يومياً مساءً",
    imageSrc: "/schedules/wafa-clinic.jpg"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 4. العيادات التخصصية وجداول اللجان الطبية
// ═══════════════════════════════════════════════════════════════════════════
const SPECIALIZED_SCHEDULES: ClinicScheduleRow[] = [
  // العيادات
  {
    id: "spec-internal",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية - عيادات التخصصية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "باطنة",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-ophthalmology",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "رمد",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-rheumatology",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "روماتيزم",
    days: ["السبت", "الأحد", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-urology",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "مسالك بولية",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-gynecology",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "نساء وتوليد",
    days: ["السبت", "الثلاثاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-neurology",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "أعصاب",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-onco-surgery",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:00 ص - 2:00 م",
    category: "clinics",
    categoryLabel: "العيادات التخصصية",
    name: "جراحة أورام",
    days: ["الأحد", "الخميس"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },

  // اللجان الطبية التخصصية
  {
    id: "spec-comm-breast-onco",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة أورام ثدي",
    days: ["السبت", "الأربعاء"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-liver-onco",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة أورام كبد",
    days: ["السبت"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-general-onco",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة أورام عامة",
    days: ["الأحد", "الثلاثاء"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-rheumatoid",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة روماتيزم",
    days: ["الإثنين"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-cochlear",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة القوقعة (زراعة القوقعة)",
    days: ["الإثنين"],
    notes: "الإثنين الأول من كل شهر ميلادي",
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-clexane-gyn",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة نساء (كليكسان لحالات الحمل الحرج)",
    days: ["الثلاثاء"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-hep-viruses",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة الفيروسات الكبدية",
    days: ["الأربعاء"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-eye-injections",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة حقن عين (الشبكية)",
    days: ["الأربعاء"],
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-joints",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "8:30 ص - 2:00 م",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة المفاصل والبيولوجي",
    days: ["الأربعاء"],
    notes: "الأربعاء الأول من كل شهر ميلادي",
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  },
  {
    id: "spec-comm-cornea",
    facilityId: "specialized",
    facilityName: "العيادات التخصصية واللجان",
    facilityLocation: "سوهاج - المنطقة الطبية",
    shift: "morning",
    shiftLabel: "الفترة الصباحية",
    hours: "يحدد بالاتصال",
    category: "committees",
    categoryLabel: "اللجان الطبية المتخصصة",
    name: "لجنة القرنية وزراعة القرنية",
    days: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    notes: "يحدد الميعاد عن طريق التواصل بالتليفون كل شهر",
    imageSrc: "/schedules/specialized-clinics-committees.jpg"
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// القائمة الشاملة المدمجة لجميع العيادات واللجان
// ═══════════════════════════════════════════════════════════════════════════
export const ALL_CLINIC_SCHEDULES: ClinicScheduleRow[] = [
  ...RAMADAN_10_MORNING,
  ...RAMADAN_10_EVENING,
  ...WAFA_CLINIC_SCHEDULES,
  ...SPECIALIZED_SCHEDULES
];

/**
 * دالة مساعدة لتطبيع وتجريد النصوص العربية من الهمزات والتشكيل
 * لإتاحة بحث فوري دقيق وسلس
 */
export function normalizeArabicText(text: string): string {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    // إزالة التشكيل والتنوين والشدة
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // توحيد الألفات (أ / إ / آ / ٱ -> ا)
    .replace(/[أإآٱ]/g, "ا")
    // توحيد التاء المربوطة والهاء (ة -> ه)
    .replace(/ة/g, "ه")
    // توحيد الياء والألف المقصورة (ى -> ي)
    .replace(/ى/g, "ي")
    // إزالة المسافات المتعددة
    .replace(/\s+/g, " ");
}

/**
 * تحديد اليوم الحالي بتوقيت القاهرة
 */
export function getCairoCurrentDay(): DayOfWeek | null {
  try {
    const formatter = new Intl.DateTimeFormat("ar-EG", {
      weekday: "long",
      timeZone: "Africa/Cairo"
    });
    const weekday = formatter.format(new Date());
    
    // تنظيف اسم اليوم
    if (weekday.includes("سبت")) return "السبت";
    if (weekday.includes("أحد") || weekday.includes("احد")) return "الأحد";
    if (weekday.includes("اثنين") || weekday.includes("إثنين")) return "الإثنين";
    if (weekday.includes("ثلاثاء")) return "الثلاثاء";
    if (weekday.includes("أربعاء") || weekday.includes("اربعاء")) return "الأربعاء";
    if (weekday.includes("خميس")) return "الخميس";
    return null; // الجمعة عطلة
  } catch {
    return null;
  }
}

/**
 * هل العيادة مفتوحة الآن بتوقيت القاهرة؟
 */
export function isClinicOpenNow(shift: "morning" | "evening", days: DayOfWeek[]): {
  isOpen: boolean;
  statusText: string;
} {
  try {
    const currentDay = getCairoCurrentDay();
    if (!currentDay || !days.includes(currentDay)) {
      return { isOpen: false, statusText: "مغلق اليوم" };
    }

    const now = new Date();
    // توقيت مصر بنظام الساعات (0-23)
    const cairoHourStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: "Africa/Cairo"
    }).format(now);
    const hour = parseInt(cairoHourStr, 10);

    if (shift === "morning") {
      if (hour >= 8 && hour < 14) {
        return { isOpen: true, statusText: "مفتوح الآن (فترة صباحية)" };
      }
      return { isOpen: false, statusText: "مغلق الآن (يبدأ 8:00 ص)" };
    } else {
      if (hour >= 16 && hour < 20) {
        return { isOpen: true, statusText: "مفتوح الآن (فترة مسائية)" };
      }
      return { isOpen: false, statusText: "مغلق الآن (يبدأ 4:00 م)" };
    }
  } catch {
    return { isOpen: false, statusText: "مواعيد مجدولة" };
  }
}
