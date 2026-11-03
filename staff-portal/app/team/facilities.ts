export type HierarchyLevel = "top" | "head" | "member";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  facility: string; // "hq" | "hilal" | "ramadan10" | "specialized" | "sohag-region" | "akhmim" | "balyana" | "wafa" | string
  hierarchyLevel?: HierarchyLevel; // "top" = قمة الهرم | "head" = رؤساء أقسام | "member" = أطقم وكوادر
  department?: string;
  bio?: string;
  photoUrl?: string;
  phone?: string;
  badge?: string;
  order?: number;
}

export interface FacilityInfo {
  id: string;
  name: string;
  icon: string;
  desc: string;
  mapUrl: string;
}

export const FACILITIES: FacilityInfo[] = [
  {
    id: "hq",
    name: "رئاسة الفرع والإدارة العامة",
    icon: "🏛️",
    desc: "الإشراف العام، الإدارة التنفيذية والمالية، وإدارة النظم وتكنولوجيا المعلومات",
    mapUrl: "https://maps.google.com/?q=فرع+سوهاج+للتأمين+الصحي"
  },
  {
    id: "hilal",
    name: "مستشفى الهلال للتأمين الصحي",
    icon: "🏥",
    desc: "المستشفى الرئيسي والجراحي لفرع سوهاج - الطوارئ، الجراحة، الرعاية المركزة، والأقسام الداخلية",
    mapUrl: "https://maps.google.com/?q=مستشفى+الهلال+للتأمين+الصحي+سوهاج"
  },
  {
    id: "ramadan10",
    name: "مجمع عيادات العاشر من رمضان",
    icon: "🏥",
    desc: "اللجنة العامة سوهاج والعيادات التخصصية",
    mapUrl: "https://maps.google.com/?q=مجمع+العاشر+من+رمضان+للتأمين+الصحي+سوهاج"
  },
  {
    id: "specialized",
    name: "عيادات التخصصية للتأمين الصحي",
    icon: "🏥",
    desc: "اللجنة الفرعية والخدمات الطبية التخصصية",
    mapUrl: "https://maps.google.com/?q=عيادات+التخصصية+للتأمين+الصحي+سوهاج"
  },
  {
    id: "sohag-region",
    name: "منطقة سوهاج للتأمين الصحي",
    icon: "🏢",
    desc: "إدارة منطقة سوهاج والمتابعة الإدارية والطبية للوحدات التأمينية",
    mapUrl: "https://maps.google.com/?q=منطقة+سوهاج+للتأمين+الصحي"
  },
  {
    id: "akhmim",
    name: "مجمع عيادات أخميم",
    icon: "🏥",
    desc: "العيادات الخارجية التخصصية وخدمات الكشف وصرف الأدوية",
    mapUrl: "https://maps.google.com/?q=مجمع+عيادات+أخميم+للتأمين+الصحي"
  },
  {
    id: "balyana",
    name: "مجمع عيادات البلينا",
    icon: "🏥",
    desc: "منظومة العيادات التخصصية ورعاية منتفعي مركز البلينا",
    mapUrl: "https://maps.google.com/?q=عيادات+البلينا+للتأمين+الصحي"
  },
  {
    id: "wafa",
    name: "عيادات الوفاء للتأمين الصحي",
    icon: "🩺",
    desc: "اللجان الطبية العامة، عيادات السكر والأورام وهرمون النمو والمراكز التخصصية",
    mapUrl: "https://maps.google.com/?q=عيادات+الوفاء+للتأمين+الصحي+شارع+سيتي+سوهاج"
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
    photoUrl: "/team/mohamed-khalaf-afifi.jpg",
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
    photoUrl: "/team/mostafa-khalaf.jpg",
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
    photoUrl: "/team/moataz-hammadi.jpg",
    order: 3
  },
  {
    id: "core-abdelhamid",
    name: "مهندس / محمد عبد الحميد",
    role: "مسئول البوابة الإلكترونية",
    facility: "hq",
    hierarchyLevel: "head",
    department: "إدارة النظم والمعلومات والبوابة الرقمية",
    bio: "متابعة وتشغيل وتحديث منصة البوابة الإلكترونية لفرع سوهاج",
    badge: "البوابة الإلكترونية",
    photoUrl: "/team/mohamed-abdelhamid.jpg",
    order: 4
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
    order: 5
  },
  {
    id: "core-fawzy",
    name: "أستاذ / محمد فوزي",
    role: "رئيس الشئون الإدارية",
    facility: "hq",
    hierarchyLevel: "head",
    department: "الشئون الإدارية برئاسة الفرع",
    bio: "التنظيم الإداري والخدمات المعاونة ودعم مسيرة العمل بالفرع",
    badge: "الشئون الإدارية",
    photoUrl: "/team/mohamed-fawzy.jpg",
    order: 6
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
    photoUrl: "/team/eslam-aboelyazid.jpg",
    order: 7
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
    order: 8
  }
];

// القيادات المعينة للمستشفيات والعيادات والمجمعات التابعة
export const INITIAL_FACILITY_LEADERSHIP: TeamMember[] = [
  // 1. مستشفى الهلال
  {
    id: "fac-hilal-1",
    name: "دكتور / محمد خالد",
    role: "مدير المستشفى",
    facility: "hilal",
    hierarchyLevel: "top",
    department: "إدارة مستشفى الهلال للتأمين الصحي",
    bio: "الإشراف الطبي والإداري العام على مستشفى الهلال والأقسام الجراحية والرعايات",
    badge: "مدير المستشفى",
    order: 1
  },
  {
    id: "fac-hilal-2",
    name: "دكتور / أحمد حسني",
    role: "مدير الشئون العلاجية",
    facility: "hilal",
    hierarchyLevel: "head",
    department: "الشئون العلاجية والطبية",
    bio: "متابعة البروتوكولات العلاجية والأطقم الطبية وجودة الخدمات السريرية",
    badge: "الشئون العلاجية",
    order: 2
  },
  {
    id: "fac-hilal-3",
    name: "أستاذ / أشرف الجندي",
    role: "مدير مالي وإداري",
    facility: "hilal",
    hierarchyLevel: "head",
    department: "الشئون المالية والإدارية بمستشفى الهلال",
    bio: "التنظيم الإداري وتوفير الموارد والمستلزمات لدعم المنظومة الصحية",
    badge: "مدير مالي وإداري",
    photoUrl: "/team/ashraf-elgendy.jpg",
    order: 3
  },
  {
    id: "fac-hilal-4",
    name: "أستاذ / شريف محرزي",
    role: "مدير إدارة شئون المرضى",
    facility: "hilal",
    hierarchyLevel: "head",
    department: "إدارة شئون المرضى وخدمة العملاء",
    bio: "تسهيل إجراءات دخول وخروج المرضى وتذليل كافة العقبات للمنتفعين",
    badge: "شئون المرضى",
    photoUrl: "/team/sherif-mehrezi.jpg",
    order: 4
  },

  // 2. عيادات التخصصية
  {
    id: "fac-spec-1",
    name: "دكتور / شريف طلعت",
    role: "مدير العيادات التخصصية",
    facility: "specialized",
    hierarchyLevel: "top",
    department: "إدارة عيادات التخصصية واللجنة الفرعية",
    bio: "الإشراف العام على عيادات التخصصية واللجان الفرعية التابعة",
    badge: "مدير العيادات",
    order: 1
  },
  {
    id: "fac-spec-2",
    name: "أستاذ / رفعت",
    role: "مدير مالي وإداري",
    facility: "specialized",
    hierarchyLevel: "head",
    department: "الشئون المالية والإدارية بالعيادات التخصصية",
    bio: "الإشراف المالي والإداري ودعم سير العمل بالعيادات التخصصية",
    badge: "مدير مالي وإداري",
    order: 2
  },

  // 3. مجمع العاشر من رمضان
  {
    id: "fac-ramadan-1",
    name: "دكتورة / شهرت القاضي",
    role: "مدير مجمع العاشر",
    facility: "ramadan10",
    hierarchyLevel: "top",
    department: "إدارة مجمع عيادات العاشر من رمضان واللجنة العامة",
    bio: "الإشراف على منظومة العيادات التخصصية وأعمال اللجنة العامة بسوهاج",
    badge: "مدير المجمع",
    order: 1
  },
  {
    id: "fac-ramadan-2",
    name: "أستاذ / علاء",
    role: "مدير مالي وإداري",
    facility: "ramadan10",
    hierarchyLevel: "head",
    department: "الشئون المالية والإدارية بمجمع العاشر",
    bio: "الإشراف الإداري واللوجستي ودعم الخدمات الطبية للمنتفعين",
    badge: "مدير مالي وإداري",
    order: 2
  },

  // 4. منطقة سوهاج
  {
    id: "fac-region-1",
    name: "دكتور / محمد عصمت",
    role: "مدير منطقة سوهاج",
    facility: "sohag-region",
    hierarchyLevel: "top",
    department: "إدارة منطقة سوهاج للتأمين الصحي",
    bio: "المتابعة الميدانية والإشراف على الخدمات التأمينية بكافة وحدات المنطقة",
    badge: "مدير المنطقة",
    order: 1
  },
  {
    id: "fac-region-2",
    name: "أستاذ / خالد حمادي",
    role: "مدير مالي وإداري",
    facility: "sohag-region",
    hierarchyLevel: "head",
    department: "الشئون المالية والإدارية لمنطقة سوهاج",
    bio: "الإشراف المالي والإداري والمتابعة اللوجستية لوحدات منطقة سوهاج",
    badge: "مدير مالي وإداري",
    order: 2
  }
];

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  ...BRANCH_CORE_LEADERSHIP,
  ...INITIAL_FACILITY_LEADERSHIP
];
