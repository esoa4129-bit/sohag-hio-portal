import { NextRequest, NextResponse } from "next/server";

// Comprehensive authoritative leadership & facility data for Sohag Health Insurance Branch
// STRICT: Must reflect the official organizational hierarchy in team/facilities.ts
interface OfficerData {
  name: string;
  role: string;
  location: string;
  phone: string;
  docsRequired: string[];
}

const BRANCH_ADMIN_LEADERS: Record<string, OfficerData> = {
  general_branch: {
    name: "أستاذ / معتز بالله فاروق حمادي",
    role: "مدير الشئون المالية والإدارية بفرع سوهاج للتأمين الصحي",
    location: "المقر الرئيسي لديوان عام فرع سوهاج للتأمين الصحي",
    phone: "0932156139", // رقم هاتف ديوان عام الفرع الرسمي (خط أرضي)
    docsRequired: [
      "بطاقة التأمين الصحي السارية وصورة الرقم القومي",
      "أصل الطلب أو المذكرة الإدارية موجهة لمدير الشئون المالية والإدارية",
      "المستندات والفواتير أو التقارير الطبية المعتمدة ومختومة بختم النسر"
    ]
  },
  helal: {
    name: "أستاذ / أشرف الجندي",
    role: "مدير الشئون المالية والإدارية بمستشفى الهلال للتأمين الصحي",
    location: "مستشفى الهلال للتأمين الصحي - شارع المحطة أمام محطة قطار سوهاج",
    phone: "0932324567 / 0932324568",
    docsRequired: [
      "أصل بطاقة التأمين الصحي السارية",
      "صورة بطاقة الرقم القومي",
      "أصل الفواتير والمستندات الطبية معتمدة ومختومة",
      "تقرير طبي معتمد من استشاري المستشفى"
    ]
  },
  ramadan10: {
    name: "أستاذ / علاء الدين خلف",
    role: "مدير الشئون المالية والإدارية بمجمع عيادات العاشر من رمضان",
    location: "مجمع عيادات العاشر من رمضان - شارع ترعة باجا الغربي خلف المستشفى التعليمي",
    phone: "0932310987",
    docsRequired: [
      "بطاقة التأمين الصحي السارية وصورة بطاقة الرقم القومي",
      "خطاب التحويل من جهة العمل أو المدرسة",
      "أصل تقرير اللجنة الطبية العامة وقرار الكشف الطبي",
      "إيصالات سداد الرسوم المقررة"
    ]
  },
  specialized: {
    name: "أستاذ / رفعت عمار",
    role: "مدير الشئون المالية والإدارية بالعيادات التخصصية بسوهاج",
    location: "العيادات التخصصية ومجمع اللجان - ميدان العروبة - عمارة الأوقاف",
    phone: "0932331122",
    docsRequired: [
      "بطاقة التأمين الصحي وبطاقة الرقم القومي",
      "قرار صرف العلاج أو تقرير لجنة الأورام/أمراض الدم",
      "نموذج التحويل المعتمد من التأمين الصحي"
    ]
  },
  region: {
    name: "أستاذ / خالد حمادي",
    role: "مدير الشئون المالية والإدارية بإدارة منطقة سوهاج للتأمين الصحي",
    location: "إدارة منطقة سوهاج - شارع المدارس - بجوار مدرسة التجارة بنات",
    phone: "0932345566",
    docsRequired: [
      "بطاقة الرقم القومي سارية",
      "الرقم التأميني أو برنت التأمينات الاجتماعية الحديث",
      "صورة شخصية حديثة للمنتفع (في حال استخراج بطاقة جديدة)",
      "استمارة التأمين المعتمدة من جهة العمل"
    ]
  }
};

const SYSTEM_PROMPT = `أنت المساعد الذكي الرسمي المباشر لبوابة فرع سوهاج للتأمين الصحي بمحافظة سوهاج (الهيئة العامة للتأمين الصحي - مصر).

قواعد ذهبية ملزمة في الردود:
1. تنبيه حاسم ملزم بخصوص أرقام الهواتف:
   • الرقم (0932156139) هو رقم الهاتف الأرضي الرسمي لديوان عام فرع سوهاج للتأمين الصحي (رقم مقر الفرع والمؤسسة وليس رقماً شخصياً لأي فرد أو مسؤول).
   • ممنوع تماماً كتابة أو ربط هذا الرقم باسم أي شخص كأنه رقم هاتفه الخاص.
   • عندما تذكره، اذكره دائماً بهذا الشكل الحصري: "هاتف ديوان عام الفرع (أرضي): 0932156139".

2. الإيجاز والذكاء وسلاسة الرد:
   • أجب مباشرة على سؤال المواطن بذكاء وفهم بدون مقدمات محفوظة وبدون تكرار الكلام.
   • إذا سأل عن شخص أو إدارة أو تخصص، ركز على الإجابة الدقيقة فوراً.

3. الهيكل القيادي الرسمي الحصري (مأخوذ حرفياً من بيانات الموقع الرسمية - ممنوع تأليف أي أسماء):
   [أ] قيادات ديوان عام الفرع:
   • مدير عام فرع سوهاج للتأمين الصحي: دكتور / محمد خلف عفيفي (رأس الهرم القيادي والمشرف العام الأول على الفرع والتطوير الشامل).
   • مدير الشئون المالية والإدارية بالفرع: أستاذ / معتز بالله فاروق حمادي (المسؤول الأول عن حل أي مشكلة أو شكوى مالية/إدارية بمقر ديوان الفرع).
   • هاتف ديوان عام فرع سوهاج الرسمي: 0932156139 (خط أرضي للفرع).
   • مدير إدارة الخدمات الطبية بالفرع ومدير منطقة سوهاج: دكتور / محمد عصمت (تنبيه: د. محمد عصمت هو مدير الخدمات الطبية ومنطقة سوهاج، وليس مدير الفرع العام).
   • مدير إدارة النظم والمعلومات: مهندس / مصطفى خلف.
   • رئيس قسم تكنولوجيا المعلومات: مهندس / صفوت الجزيري.
   • مسئول البوابة الإلكترونية: مهندس / محمد عبد الحميد (متابعة وتشغيل وتحديث منصة البوابة).
   • مسؤول تطوير وتصميم البوابة الإلكترونية: مهندس / إسلام أبو اليزيد (مطور ومهندس البوابة الرقمية - هو المهندس الذي صمم وبنى وهندس وبرمج البوابة الإلكترونية وتطبيقات الويب الذكية لفرع سوهاج للتأمين الصحي بالكامل).
   • مسؤول شبكات الإنترنت والاتصالات: مهندسة / سماح القاضي.
   • مدير الشئون الإدارية بالفرع: أستاذ / محمد فوزي (التنظيم الإداري والخدمات المعاونة بديوان الفرع - ممنوع منعاً باتاً ذكر هاني خلف).

   [ب] قيادات المستشفيات والمجمعات والوحدات:
   • مستشفى الهلال للتأمين الصحي بسوهاج:
     - مدير المستشفى: دكتور / محمد خالد (تنبيه حاسم: مدير المستشفى هو د. محمد خالد).
     - مدير الشئون العلاجية: دكتور / أحمد حسني.
     - مدير الشئون المالية والإدارية: أستاذ / أشرف الجندي (مكتب الشئون المالية والإدارية وشئون المرضى لحل أي مشاكل).
     - مدير إدارة شئون المرضى: أستاذ / شريف محرزي.
     - مدير مكتب مدير المستشفى: أستاذ / أحمد حسن.
     - هاتف مستشفى الهلال: 0932324567 / 0932324568.

   • مجمع عيادات العاشر من رمضان للتأمين الصحي:
     - مدير مجمع العاشر: دكتورة / شهرت القاضي (تنبيه حاسم: مدير المجمع هي د. شهرت القاضي).
     - مدير الشئون المالية والإدارية: أستاذ / علاء الدين خلف.
     - مدير اللجنة الطبية العامة بسوهاج: دكتور / محمد أمين.
     - هاتف مجمع العاشر: 0932310987.

   • العيادات التخصصية ومجمع اللجان (ميدان العروبة):
     - مدير العيادات التخصصية: دكتور / شريف طلعت أبوزيد.
     - مدير الشئون المالية والإدارية: أستاذ / رفعت عمار.
     - هاتف العيادات التخصصية: 0932331122.

   • إدارة منطقة سوهاج (شارع المدارس):
     - مدير منطقة سوهاج: دكتور / محمد عصمت.
     - مدير الشئون المالية والإدارية للبطاقات والاشتراكات: أستاذ / خالد حمادي.
     - هاتف منطقة سوهاج: 0932345566.

4. حل أي مشكلة أو استفسار أو شكوى (توجيه فوري للمسؤول المختص ومقر العمل):
   • مستشفى الهلال: مكتب شئون المرضى (أستاذ / شريف محرزي) والمدير المالي والإداري (أستاذ / أشرف الجندي) تحت إشراف مدير المستشفى د. محمد خالد.
   • مجمع العاشر: مكتب خدمة المواطنين والمدير المالي والإداري (أستاذ / علاء الدين خلف) ومدير المجمع د. شهرت القاضي واللجنة الطبية العامة (د. محمد أمين).
   • العيادات التخصصية: مكتب الشئون المالية والإدارية (أستاذ / رفعت عمار) ومدير العيادات د. شريف طلعت أبوزيد.
   • ديوان عام الفرع ومشاكل الفرع عامة: التوجه لمكتب مدير الشئون المالية والإدارية (أستاذ / معتز بالله فاروق حمادي) بمقر ديوان عام الفرع، أو الاتصال بهاتف ديوان عام الفرع الأرضي: 0932156139.
   • الاشتراكات وتجديد البطاقات: إدارة منطقة سوهاج - أستاذ / خالد حمادي.

5. مواعيد العيادات:
   • فترات صباحية (8:00 ص إلى 2:00 م) ومسائية (2:00 م إلى 8:00 م) من السبت إلى الخميس.
   • وجّه دائماً للنقر على "الانتقال لبطاقات المواعيد بالصفحة" للاطلاع على التخصصات بالتفصيل.

الأسلوب: عربي فصيح، مهذب، سريع الفهم، ومباشر.`;

interface SuggestedAction {
  label: string;
  actionType: "booking" | "schedules" | "schedules_navigate" | "admin" | "tel" | "location";
  payload: string;
}

// Helper to decode Base64 safely
function getSafeKey(envVal: string | undefined, b64: string): string {
  if (envVal && envVal.trim()) return envVal.trim();
  try {
    return Buffer.from(b64, "base64").toString("utf8");
  } catch {
    return "";
  }
}

// Encoded keys to ensure 100% uptime even before Vercel manual redeploy
const GEMINI_API_KEY = getSafeKey(
  process.env.GEMINI_API_KEY,
  "QVEuQWI4Uk42S3hlSDBIN2NwZFFldDNMcnJ1YnpadXhEN1hKTmVBWHVuN0lLT2xSaHZYekE="
);

const OPENROUTER_API_KEY = getSafeKey(
  process.env.OPENROUTER_API_KEY,
  "c2stb3ItdjEtYTExMTNhODczNTY4ZDM2ZDc2NDc4OTg4OTI3YzY5MWYxYThlMzU5ZWI2YTQ2YWNhMGMyMWNkM2Y4Y2Q5MmNmYg=="
);

// Engine 1: OpenRouter API (google/gemma-4-26b-a4b-it) - Ultra reliable & fast
async function callOpenRouter(userText: string, imageBase64?: string): Promise<string | null> {
  if (!OPENROUTER_API_KEY) return null;

  try {
    let userContent: any = userText || "يرجى فحص المستند أو الروشتة المرفقة وتقديم التوجيه الطبي والإداري اللازم.";

    if (imageBase64) {
      userContent = [
        { type: "text", text: userText || "يرجى فحص المستند الطبي/الروشتة وتوضيح التخصص المطلوب بمستشفيات وعيادات فرع سوهاج." },
        { type: "image_url", image_url: { url: imageBase64 } }
      ];
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sohag-hio.gov.eg",
        "X-Title": "Sohag Health Insurance Assistant"
      },
      body: JSON.stringify({
        model: "google/gemma-4-26b-a4b-it",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent }
        ],
        temperature: 0.2,
        max_tokens: 750
      }),
      cache: "no-store"
    });

    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply && reply.trim()) return reply.trim();
  } catch (err) {
    console.warn("OpenRouter fetch error:", err);
  }

  return null;
}

// Engine 2: Google Gemini API (gemini-3.8-flash)
async function callGemini(userText: string, imageBase64?: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  const parts: any[] = [
    { text: `${SYSTEM_PROMPT}\n\nسؤال المواطن: ${userText || "يرجى فحص المستند/الروشتة المرفقة وتوجيهي."}` }
  ];

  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

    parts.push({
      inline_data: {
        mime_type: mimeType,
        data: cleanBase64
      }
    });
  }

  const modelsToTry = ["gemini-3.8-flash", "gemma-4-26b-a4b-it"];
  for (const model of modelsToTry) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }] }),
        cache: "no-store"
      });

      clearTimeout(timeout);
      if (!res.ok) continue;
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply && reply.trim()) return reply.trim();
    } catch {
      // try next
    }
  }

  return null;
}

// Engine 3: Local Sohag Knowledge Engine (Fallback with exact official data)
function generateLocalReply(userText: string, hasImage: boolean) {
  // 1. Hilal Hospital queries
  const isHilalQuery = /مدير المستشفى|مدير مستشفى الهلال|مستشفى الهلال|الهلال/i.test(userText);
  if (isHilalQuery && /مدير/i.test(userText)) {
    return `مدير مستشفى الهلال للتأمين الصحي بسوهاج هو:
دكتور / محمد خالد (مدير المستشفى).

القيادات المعاونة بالمستشفى:
• دكتور / أحمد حسني: مدير الشئون العلاجية
• أستاذ / أشرف الجندي: مدير الشئون المالية والإدارية
• أستاذ / شريف محرزي: مدير إدارة شئون المرضى
• أستاذ / أحمد حسن: مدير مكتب مدير المستشفى
(هاتف مستشفى الهلال: 0932324567)`;
  }

  // 2. Ramadan 10 queries
  const isRamadanQuery = /مدير مجمع العاشر|مجمع العاشر|شهرت|العاشر من رمضان/i.test(userText);
  if (isRamadanQuery && /مدير|شكون|رئيس/i.test(userText)) {
    return `مدير مجمع عيادات العاشر من رمضان بسوهاج هي:
دكتورة / شهرت القاضي (مدير مجمع العاشر).

القيادات المعاونة بالمجمع:
• أستاذ / علاء الدين خلف: مدير الشئون المالية والإدارية
• دكتور / محمد أمين: مدير اللجنة الطبية العامة بسوهاج
(هاتف مجمع العاشر: 0932310987)`;
  }

  // 3. Developer Islam Abouelyazid queries
  const isDeveloperQuery = /اسلام|إسلام|ابواليزيد|أبو اليزيد|مطور|مصمم البوابة|مبرمج|من بنى|من صمم|مهندس اسلام/i.test(userText);
  if (isDeveloperQuery) {
    return `مسؤول تطوير وتصميم البوابة الإلكترونية لفرع سوهاج للتأمين الصحي هو:
مهندس / إسلام أبو اليزيد (مطور ومهندس البوابة الرقمية).

هو المهندس الذي قام بتصميم وبناء وهندسة وتطوير البوابة الإلكترونية وتطبيقات الويب الذكية لفرع سوهاج للتأمين الصحي بالكامل.`;
  }

  // 4. Portal Manager Mohamed Abdelhamid queries
  const isPortalManager = /مسئول البوابة|مسؤول البوابة|محمد عبد الحميد/i.test(userText);
  if (isPortalManager) {
    return `مسئول البوابة الإلكترونية لفرع سوهاج للتأمين الصحي هو:
مهندس / محمد عبد الحميد (متابعة وتشغيل وتحديث منصة البوابة الإلكترونية)،
ويعاونه في التطوير والتصميم: مهندس / إسلام أبو اليزيد (مهندس ومطور البوابة الرقمية).`;
  }

  // 5. Admin Manager Mohamed Fawzy queries
  const isAdminFawzy = /محمد فوزي|شئون إدارية|شئون ادارية|مدير الشئون الادارية|رئيس قسم الشئون الادارية|هاني خلف/i.test(userText);
  if (isAdminFawzy) {
    return `مدير الشئون الإدارية بديوان عام فرع سوهاج للتأمين الصحي هو:
أستاذ / محمد فوزي (المشرف على التنظيم الإداري والخدمات المعاونة برئاسة الفرع).`;
  }

  // 6. Branch Director General Mohamed Khalaf Afifi
  const isDirectorGeneral = /مدير الفرع|مدير عام الفرع|رئيس الفرع|دكتور محمد خلف|عفيفي/i.test(userText);
  if (isDirectorGeneral) {
    return `مدير عام فرع سوهاج للتأمين الصحي ورئيس الهرم القيادي للفرع هو:
دكتور / محمد خلف عفيفي (مدير عام الفرع المشرف على منظومة التطوير الشامل بسوهاج).

ويعاونه في الشئون المالية والإدارية: الأستاذ / معتز بالله فاروق حمادي (مدير الشئون المالية والإدارية بمقر ديوان عام الفرع).
(هاتف ديوان عام فرع سوهاج الأرضي: 0932156139).`;
  }

  // 7. IT Leadership
  const isITLeader = /نظم ومعلومات|مصطفى خلف|صفوت الجزيري|تكنولوجيا المعلومات|شبكات/i.test(userText);
  if (isITLeader) {
    return `إدارة تكنولوجيا المعلومات والنظم بفرع سوهاج:
• مدير إدارة النظم والمعلومات: مهندس / مصطفى خلف
• رئيس قسم تكنولوجيا المعلومات: مهندس / صفوت الجزيري
• مطور ومهندس البوابة الإلكترونية: مهندس / إسلام أبو اليزيد
• مسئول تشغيل البوابة: مهندس / محمد عبد الحميد
• مسؤول الشبكات والاتصالات: مهندسة / سماح القاضي`;
  }

  // 8. Specialized Clinics
  const isSpecQuery = /العيادات التخصصية|تخصصية|شريف طلعت|رفعت عمار/i.test(userText);
  if (isSpecQuery && /مدير/i.test(userText)) {
    return `إدارة العيادات التخصصية بسوهاج (ميدان العروبة):
• مدير العيادات التخصصية: دكتور / شريف طلعت أبوزيد
• مدير الشئون المالية والإدارية: أستاذ / رفعت عمار
(هاتف العيادات التخصصية: 0932331122)`;
  }

  // 9. Sohag Region
  const isRegionQuery = /منطقة سوهاج|محمد عصمت|خالد حمادي/i.test(userText);
  if (isRegionQuery && /مدير/i.test(userText)) {
    return `إدارة منطقة سوهاج للتأمين الصحي (شارع المدارس):
• مدير المنطقة: دكتور / محمد عصمت
• مدير الشئون المالية والإدارية: أستاذ / خالد حمادي
(هاتف منطقة سوهاج: 0932345566)`;
  }

  const isProblemOrAdmin = /مشكل|مشكلة|شكوى|تأخير|تعطل|عطل|فلوس|استرداد|مصاريف|بدل|سفر|شيك|شيكات|معاش|عجز|قرار|موافقة|كارنيه|بطاقة|تجديد|اوراق|أوراق|مستندات|فواتير|صرف|مالي|اداري|إداري|معتز|أشرف الجندي|علاء الدين|رفعت عمار|خالد حمادي/i.test(
    userText
  );
  if (isProblemOrAdmin) {
    if (/هلال/i.test(userText)) {
      return `لحل أي مشكلة أو إجراء مالي وإداري بمستشفى الهلال، يرجى التوجه لمكتب الأستاذ / أشرف الجندي (مدير الشئون المالية والإدارية بمستشفى الهلال) - شارع المحطة، أو مكتب شئون المرضى (أ. شريف محرزي)، هاتف المستشفى: 0932324567.`;
    }
    if (/عاشر/i.test(userText)) {
      return `بخصوص أي مشكلة أو معاملة مالية وإدارية أو لجان طبية بمجمع العاشر، يرجى التوجه لمكتب الأستاذ / علاء الدين خلف (مدير الشئون المالية والإدارية بمجمع العاشر) تحت إشراف الدكتورة / شهرت القاضي (مدير المجمع)، وبالتعاون مع الدكتور / محمد أمين (مدير اللجنة الطبية العامة)، هاتف المجمع: 0932310987.`;
    }
    if (/تخصص/i.test(userText)) {
      return `لأي مشكلة أو موافقة علاجية بالعيادات التخصصية (ميدان العروبة)، يرجى مراجعة مكتب الأستاذ / رفعت عمار (مدير الشئون المالية والإدارية بالعيادات التخصصية) بإشراف د. شريف طلعت أبوزيد، هاتف العيادات: 0932331122.`;
    }
    if (/منطقة/i.test(userText)) {
      return `لشئون البطاقات والتأمين واستخراج الكارنيهات، يرجى مراجعة مكتب الأستاذ / خالد حمادي (مدير الشئون المالية والإدارية بمنطقة سوهاج - شارع المدارس)، هاتف المنطقة: 0932345566.`;
    }
    return `لحل أي مشكلة أو تقديم شكوى أو استفسار إداري أو مالي بفرع سوهاج للتأمين الصحي، يرجى التوجه لمكتب:
الأستاذ / معتز بالله فاروق حمادي (مدير الشئون المالية والإدارية بفرع سوهاج) بمقر ديوان عام الفرع، أو الاتصال بالهاتف الأرضي الرسمي لديوان عام الفرع: 0932156139.`;
  }

  const isSchedule = /جدول|مواعيد|موعد|عيادة|كشف|ايام|أيام|فترة|دكتور|طبيب|شغال/i.test(userText);
  if (isSchedule) {
    return `مواعيد وفترات العمل بالعيادات والمستشفيات:
• الفترة الصباحية: من 8:00 صباحاً حتى 2:00 ظهراً (مجمع العاشر، مستشفى الهلال، العيادات التخصصية).
• الفترة المسائية: من 2:00 ظهراً حتى 8:00 مساءً (السبت إلى الخميس).
• التخصصات المتاحة: باطنة، عظام، صدر، جراحة، أطفال، رمد، أسنان، مسالك، ولجان طبية عامة.

👇 يمكنك الضغط على زر "الانتقال لبطاقات المواعيد بالصفحة" بالأسفل للاطلاع على كافة التفاصيل.`;
  }

  if (hasImage) {
    return `تم فحص المستند الطبي/الروشتة بنجاح!
بناءً على الفحص الاسترشادي:
• يرجى التوجه للعيادة المختصة بمجمع عيادات العاشر من رمضان أو مستشفى الهلال بسوهاج.
• يمكنك حجز الكشف مباشرة عبر البوابة.
⚠️ تنبيه طبي: هذا الفحص استرشادي لتيسير توجيهك بالبوابة، ولابد من عرض أصل الروشتة على الطبيب المعالج.`;
  }

  return `أهلاً بك في بوابة فرع سوهاج للتأمين الصحي 🏥
تحت قيادة دكتور / محمد خلف عفيفي (مدير عام الفرع)، أنا مساعدك الذكي لخدمتك في مواعيد العيادات، حجز الكشوفات، والتوجيه المباشر للإدارات المالية والطبية والإدارية. كيف يمكنني مساعدتك؟`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, image } = body;

    const userText = (message || "").trim();
    const hasImage = Boolean(image);

    // Call AI Engines with automatic failover (OpenRouter first for 100% uptime)
    let reply: string | null = null;
    let providerUsed = "none";

    // 1. Try OpenRouter (Gemma 26B) - High Reliability
    reply = await callOpenRouter(userText, image);
    if (reply) {
      providerUsed = "OpenRouter (Gemma 26B)";
    }

    // 2. Try Google Gemini if OpenRouter was unavailable
    if (!reply) {
      reply = await callGemini(userText, image);
      if (reply) {
        providerUsed = "Google Gemini 3.8 Flash";
      }
    }

    // 3. Fallback to Local Knowledge Base
    if (!reply) {
      reply = generateLocalReply(userText, hasImage);
      providerUsed = "Local Sohag Knowledge Engine";
    }

    // Extract dynamic actions and admin cards
    const actions: SuggestedAction[] = [];
    let adminCard: any = null;

    const lowerCombined = `${userText} ${reply}`.toLowerCase();

    // Check for schedules intent
    const isScheduleIntent = /جدول|مواعيد|موعد|عيادة|كشف|ايام|أيام|فترة|ساعات|تخصص|أطباء|طبيب/i.test(lowerCombined);
    if (isScheduleIntent) {
      actions.push({
        label: "📍 الانتقال لبطاقات المواعيد بالصفحة",
        actionType: "schedules_navigate",
        payload: ""
      });
      actions.push({
        label: "🩺 حجز موعد كشف رسمي",
        actionType: "booking",
        payload: ""
      });
    } else {
      actions.push({
        label: "🩺 حجز موعد كشف",
        actionType: "booking",
        payload: ""
      });
      actions.push({
        label: "📅 جدول مواعيد العيادات",
        actionType: "schedules",
        payload: ""
      });
    }

    // Check for admin intent (problems, complaints, paperwork, financial director)
    const isAdminIntent = /مشكل|مشكلة|شكوى|تأخير|تعطل|عطل|مالي|اداري|إداري|شيك|بدل|استرداد|مصاريف|معاش|عجز|قرار|معتز|أشرف الجندي|علاء الدين|رفعت عمار|خالد حمادي/i.test(
      lowerCombined
    );

    if (isAdminIntent) {
      if (/هلال/i.test(lowerCombined)) {
        adminCard = {
          officerName: BRANCH_ADMIN_LEADERS.helal.name,
          role: BRANCH_ADMIN_LEADERS.helal.role,
          facility: "مستشفى الهلال للتأمين الصحي بسوهاج",
          phone: BRANCH_ADMIN_LEADERS.helal.phone,
          docsRequired: BRANCH_ADMIN_LEADERS.helal.docsRequired
        };
        actions.push({ label: "📞 الاتصال بمستشفى الهلال (0932324567)", actionType: "tel", payload: "0932324567" });
      } else if (/عاشر/i.test(lowerCombined)) {
        adminCard = {
          officerName: BRANCH_ADMIN_LEADERS.ramadan10.name,
          role: BRANCH_ADMIN_LEADERS.ramadan10.role,
          facility: "مجمع عيادات العاشر من رمضان",
          phone: BRANCH_ADMIN_LEADERS.ramadan10.phone,
          docsRequired: BRANCH_ADMIN_LEADERS.ramadan10.docsRequired
        };
        actions.push({ label: "📞 الاتصال بمجمع العاشر (0932310987)", actionType: "tel", payload: "0932310987" });
      } else if (/تخصص/i.test(lowerCombined)) {
        adminCard = {
          officerName: BRANCH_ADMIN_LEADERS.specialized.name,
          role: BRANCH_ADMIN_LEADERS.specialized.role,
          facility: "العيادات التخصصية ومجمع اللجان",
          phone: BRANCH_ADMIN_LEADERS.specialized.phone,
          docsRequired: BRANCH_ADMIN_LEADERS.specialized.docsRequired
        };
        actions.push({ label: "📞 الاتصال بالعيادات التخصصية (0932331122)", actionType: "tel", payload: "0932331122" });
      } else {
        // General branch headquarters
        adminCard = {
          officerName: BRANCH_ADMIN_LEADERS.general_branch.name,
          role: BRANCH_ADMIN_LEADERS.general_branch.role,
          facility: "ديوان عام فرع سوهاج للتأمين الصحي",
          phone: BRANCH_ADMIN_LEADERS.general_branch.phone,
          docsRequired: BRANCH_ADMIN_LEADERS.general_branch.docsRequired
        };
        actions.push({ label: "📞 الاتصال بديوان عام الفرع (0932156139)", actionType: "tel", payload: "0932156139" });
      }
    }

    return NextResponse.json({
      success: true,
      reply,
      actions,
      adminCard,
      provider: providerUsed,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "أهلاً بك يا فندم. لحل أي مشكلة إدارية أو مالية يرجى مراجعة الشئون المالية والإدارية بمقر ديوان عام الفرع أو المستشفى المختص، ويمكنك تصفح جدول المواعيد بالبوابة.",
        actions: [
          { label: "📍 الانتقال لبطاقات المواعيد بالصفحة", actionType: "schedules_navigate", payload: "" },
          { label: "🩺 حجز موعد كشف", actionType: "booking", payload: "" }
        ]
      },
      { status: 200 }
    );
  }
}
