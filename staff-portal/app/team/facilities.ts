export interface TeamMember {
  id: string;
  name: string;
  role: string;
  facility: string; // "hq" | "hilal" | "tahta" | "girga" | "akhmim" | "balyana" | "centers" | string
  department?: string;
  bio?: string;
  photoUrl?: string;
  phone?: string;
}

export const FACILITIES = [
  { id: "hq", name: "رئاسة الفرع والإدارة العامة", icon: "🏛️", desc: "الإشراف العام، الإدارة التنفيذية والمالية، وإدارة النظم وتكنولوجيا المعلومات" },
  { id: "hilal", name: "مستشفى الهلال للتأمين الصحي", icon: "🏥", desc: "المستشفى الرئيسي لفرع سوهاج - الطوارئ، الجراحة، الرعاية المركزة، والأقسام الداخلية" },
  { id: "tahta", name: "مستشفى ومجمع عيادات طهطا", icon: "🏥", desc: "الخدمات الطبية الشاملة واللجان التخصصية لقطاع شمال سوهاج" },
  { id: "girga", name: "مستشفى ومجمع عيادات جرجا", icon: "🏥", desc: "الرعاية الطبية والعيادات التخصصية لقطاع جنوب سوهاج" },
  { id: "akhmim", name: "مجمع عيادات أخميم", icon: "🏥", desc: "العيادات الخارجية التخصصية وخدمات الكشف وصرف الأدوية" },
  { id: "balyana", name: "مجمع عيادات البلينا", icon: "🏥", desc: "منظومة العيادات التخصصية ورعاية منتفعي مركز البلينا" },
  { id: "centers", name: "اللجان والمراكز التخصصية", icon: "🩺", desc: "اللجان الطبية العامة، عيادات السكر والأورام وهرمون النمو" },
];
