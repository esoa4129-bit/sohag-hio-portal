export type HierarchyLevel = "top" | "head" | "member";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  facility: string; // "hq" | "hilal" | "akhmim" | "balyana" | "centers" | string
  hierarchyLevel?: HierarchyLevel; // "top" = قمة الهرم | "head" = رؤساء أقسام | "member" = أطقم وكوادر
  department?: string;
  bio?: string;
  photoUrl?: string;
  phone?: string;
  badge?: string;
  order?: number;
}

export const FACILITIES = [
  {
    id: "hq",
    name: "رئاسة الفرع والإدارة العامة",
    icon: "🏛️",
    desc: "الإشراف العام، الإدارة التنفيذية والمالية، وإدارة النظم وتكنولوجيا المعلومات"
  },
  {
    id: "hilal",
    name: "مستشفى الهلال للتأمين الصحي",
    icon: "🏥",
    desc: "المستشفى الرئيسي والجراحي لفرع سوهاج - الطوارئ، الجراحة، الرعاية المركزة، والأقسام الداخلية"
  },
  {
    id: "akhmim",
    name: "مجمع عيادات أخميم",
    icon: "🏥",
    desc: "العيادات الخارجية التخصصية وخدمات الكشف وصرف الأدوية"
  },
  {
    id: "balyana",
    name: "مجمع عيادات البلينا",
    icon: "🏥",
    desc: "منظومة العيادات التخصصية ورعاية منتفعي مركز البلينا"
  },
  {
    id: "centers",
    name: "اللجان والمراكز التخصصية",
    icon: "🩺",
    desc: "اللجان الطبية العامة، عيادات السكر والأورام وهرمون النمو"
  },
];

// القيادة الدائمة الأساسية لفرع سوهاج للتأمين الصحي (مثبتة دائماً في قمة الهرم)
export const BRANCH_CORE_LEADERSHIP: TeamMember[] = [
  {
    id: "core-1",
    name: "دكتور / محمد خلف عفيفي",
    role: "مدير عام الفرع",
    facility: "hq",
    hierarchyLevel: "top",
    department: "القيادة العامة للفرع",
    bio: "الإشراف والرعاية العامة لمسيرة التطوير الشامل",
    badge: "المستوى القيادي الأول",
    order: 1
  },
  {
    id: "core-2",
    name: "مهندس / مصطفى خلف",
    role: "مدير إدارة النظم والمعلومات",
    facility: "hq",
    hierarchyLevel: "head",
    department: "إدارة النظم والمعلومات",
    bio: "التخطيط الاستراتيجي ومتابعة المنظومات والربط",
    badge: "الإدارة التنفيذية",
    order: 2
  },
  {
    id: "core-3",
    name: "أستاذ / معتز بالله فاروق حمادي",
    role: "مدير الشئون المالية والإدارية",
    facility: "hq",
    hierarchyLevel: "head",
    department: "الشئون المالية والإدارية",
    bio: "الإشراف الإداري والمالي ودعم متطلبات الميكنة",
    badge: "الإدارة المالية والإدارية",
    order: 3
  },
  {
    id: "core-4",
    name: "مهندس / صفوت الجزيري",
    role: "رئيس قسم تكنولوجيا المعلومات",
    facility: "hq",
    hierarchyLevel: "head",
    department: "تكنولوجيا المعلومات والبنية التحتية",
    bio: "الإشراف الفني واستقرار السيرفرات والبنية التحتية",
    badge: "رئاسة تكنولوجيا المعلومات",
    order: 4
  },
  {
    id: "core-5",
    name: "مهندس / إسلام أبو اليزيد",
    role: "مطور ومهندس البوابة الرقمية",
    facility: "hq",
    hierarchyLevel: "member",
    department: "هندسة وتطوير البرمجيات",
    bio: "تصميم وتطوير البوابات وتطبيقات الويب الذكية",
    badge: "هندسة البرمجيات",
    order: 5
  },
  {
    id: "core-6",
    name: "مهندسة / سماح القاضي",
    role: "مسؤول شبكات الإنترنت والاتصالات",
    facility: "hq",
    hierarchyLevel: "member",
    department: "إدارة الإنترنت والشبكات",
    bio: "متابعة خطوط الربط وشبكات الإنترنت واستقرار الاتصال",
    badge: "شبكات واتصالات",
    order: 6
  }
];

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [...BRANCH_CORE_LEADERSHIP];
