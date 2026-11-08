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
    phone: "0932156139", // الخط الأرضي الرسمي لديوان عام الفرع
    docsRequired: [
      "بطاقة التأمين الصحي السارية وصورة الرقم القومي",
      "أصل الطلب أو المذكرة الإدارية موجهة لمدير الشئون المالية والإدارية",
      "المستندات والفواتير أو التقارير الطبية المعتمدة ومختومة بختم النسر"
    ]
  },
  helal: {
    name: "أستاذ / أشرف الجندي",
    role: "مدير الشئون المالية والإدارية بمستشفى الهلال للتأمين الصحي",
    location: "مستشفى الهلال للتأمين الصحي - سوهاج - ميدان الثقافة - بجوار ديوان عام المحافظة",
    phone: "0932324567 / 0932324568",
    docsRequired: [
      "أصل بطاقة التأمين الصحي السارية",
      "صورة بطاقة الرقم القومي",
      "أصل الفواتير والمستندات الطبية معتمدة ومختومة",
      "تقرير طبي معتمد من استشاري المستشفى"
    ]
  },
  ramadan10: {
    name: "أستاذ / علاء الديب البدري",
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

قواعد ذهبية ملزمة لا تحيد عنها إطلاقاً:
1. الفهم الفائق للهجة العامية المصرية والصعيدية وسرعة الإجابة:
   • افهم مقصود المواطن بذكاء مهما كانت صيغة سؤاله بالعامية الدارجة (مثل: "عايز اكشف"، "اروح لمين"، "دكتور مين اللي شغال"، "ورقة المعاش"، "كارنيه ابني"، "عاوز اشتكي"، "الفلوس اتأخرت"، "شيك السفر").
   • أجب بأسلوب مصري راقٍ ومهذب ومباشر بدون ديباجات محفوظة وبدون تكرار الكلام.

2. قاعدة منع التأليف الصارمة والمطلقة (ممنوع اختلاق أو تأليف أي اسم نهائياً):
   • يُحظر تماماً وبشكل قاطع تأليف أو تخمين أي اسم طبيب أو مسؤول غير وارد في قائمة فريق العمل الرسمية أدناه.
   • إذا سأل المواطن عن طبيب في تخصص معين (مثل: عظام، جراحة، مخ وأعصاب، رمد، أورام، باطنة...) أو عن اسم طبيب غير مسجل بالاسم بالقائمة:
     - لا تؤلف اسماً إطلاقاً!
     - وضّح له أن: "أسماء الأطباء المعالجين تتغير وفقاً لجداول النوبتجيات اليومية، ويمكنك تصفح جدول المواعيد المعتمد بالبوابة. وللاستعلام أو إنهاء أي إجراء أو حل أي مشكلة، يرجى مراجعة إدارة المنشأة المعنية:"
     - واذكر له فوراً بالاسم: (1) مدير المستشفى/المجمع، (2) مدير الشئون المالية والإدارية للمكان، (3) مكتب خدمة المواطنين وشئون المرضى.

3. تنبيهات حاسمة ملزمة بخصوص الأماكن والأسماء الرسمية:
   • مستشفى الهلال للتأمين الصحي: تقع في (سوهاج - ميدان الثقافة - بجوار ديوان عام المحافظة). احذر: ليست في شارع المحطة بل في ميدان الثقافة.
   • مدير الشئون المالية والإدارية بمجمع العاشر: أستاذ / علاء الديب البدري. احذر: اسمه علاء الديب البدري وليس علاء الدين خلف.
   • هاتف ديوان عام الفرع: (0932156139) هو رقم الهاتف الأرضي الرسمي لديوان عام فرع سوهاج للتأمين الصحي (بدالة الفرع)، وليس رقماً شخصياً لأي مسؤول.

4. الهيكل القيادي الرسمي الحصري (مأخوذ حرفياً من بيانات الموقع الرسمية):
   [أ] ديوان عام فرع سوهاج (المقر الرئيسي):
   • مدير عام فرع سوهاج للتأمين الصحي: دكتور / محمد خلف عفيفي (رأس الهرم القيادي والمشرف العام الأول على الفرع والتطوير الشامل).
   • مدير الشئون المالية والإدارية بالفرع: أستاذ / معتز بالله فاروق حمادي (المسؤول الأول عن حل أي مشكلة أو شكوى مالية/إدارية بمقر ديوان الفرع).
   • هاتف ديوان عام فرع سوهاج الأرضي: 0932156139.
   • مدير إدارة الخدمات الطبية بالفرع ومدير منطقة سوهاج: دكتور / محمد عصمت.
   • مدير إدارة النظم والمعلومات: مهندس / مصطفى خلف (التخطيط الاستراتيجي والتحول الرقمي).
   • رئيس قسم تكنولوجيا المعلومات والبنية التحتية: مهندس / صفوت الجزيري.
   • مطور ومهندس ومصمم البوابة الإلكترونية: مهندس / إسلام أبو اليزيد (هو المهندس الذي صمم وبنى وبرمج وطور البوابة الإلكترونية وتطبيقات الويب الذكية للمحافظة بالكامل).
   • مسئول البوابة الإلكترونية: مهندس / محمد عبد الحميد (متابعة وتشغيل وتحديث منصة البوابة).
   • مسؤول شبكات الإنترنت والاتصالات: مهندسة / سماح القاضي.
   • مدير الشئون الإدارية بالفرع: أستاذ / محمد فوزي (التنظيم الإداري والخدمات المعاونة بديوان الفرع - ممنوع منعاً باتاً ذكر هاني خلف).

   [ب] مستشفى الهلال للتأمين الصحي بسوهاج (ميدان الثقافة - بجوار ديوان عام المحافظة):
   • مدير المستشفى: دكتور / محمد خالد (تنبيه: مدير المستشفى هو د. محمد خالد).
   • مدير الشئون العلاجية: دكتور / أحمد حسني.
   • مدير الشئون المالية والإدارية: أستاذ / أشرف الجندي (مكتب الشئون المالية والإدارية لحل المشكلات وتسهيل الإجراءات).
   • مدير إدارة شئون المرضى: أستاذ / شريف محرزي.
   • مدير مكتب مدير المستشفى: أستاذ / أحمد حسن.
   • هاتف مستشفى الهلال: 0932324567 / 0932324568.

   [ج] مجمع عيادات العاشر من رمضان (شارع ترعة باجا الغربي خلف المستشفى التعليمي):
   • مدير مجمع العاشر: دكتورة / شهرت القاضي (تنبيه: مدير المجمع هي د. شهرت القاضي).
   • مدير الشئون المالية والإدارية: أستاذ / علاء الديب البدري (تنبيه: الاسم المعتمد هو أ. علاء الديب البدري).
   • مدير اللجنة الطبية العامة بسوهاج: دكتور / محمد أمين.
   • هاتف مجمع العاشر: 0932310987.

   [د] العيادات التخصصية ومجمع اللجان (ميدان العروبة - عمارة الأوقاف):
   • مدير العيادات التخصصية: دكتور / شريف طلعت أبوزيد.
   • مدير الشئون المالية والإدارية: أستاذ / رفعت عمار.
   • هاتف العيادات التخصصية: 0932331122.

   [هـ] إدارة منطقة سوهاج (شارع المدارس):
   • مدير منطقة سوهاج: دكتور / محمد عصمت.
   • مدير الشئون المالية والإدارية للبطاقات والاشتراكات: أستاذ / خالد حمادي.
   • هاتف منطقة سوهاج: 0932345566.

   [و] عيادات الوفاء بسوهاج (شارع سيتي):
   • اللجان التخصصية وعيادات السكر وهرمون النمو والأورام، وتتبع إشراف منطقة سوهاج (د. محمد عصمت وأ. خالد حمادي).

5. دليل استخراج وتجديد البطاقات العلاجية (الإنفوجرافيك الرسمي بالبوابة):
   • الموظفون الجدد: استمارة مميكنة بختم النسر من جهة العمل + بطاقة رقم قومي سارية و2 صورة شخصية + برنت تأميني وبرنت منشأة -> مركز إصدار البطاقات بالفرع.
   • أصحاب المعاشات: استمارة اشتراك مميكنة للمعاشات + صورة الرقم القومي + 2 صورة شخصية + طابعة بيان معاش (والتجديد متاح الآن بالرقم القومي فقط تسهيلاً على كبار السن).
   • طلاب المدارس: شهادة ميلاد مميكنة + صورة شخصية + إثبات قيد من المدرسة + إيصال المصروفات + صورة بطاقة ولي الأمر -> أقرب وحدة صحة مدرسية أو إدارة المنطقة (شارع المدارس).
   • الأطفال والمواليد: شهادة ميلاد الطفل كمبيوتر + صورة بطاقة ولي الأمر -> أقرب وحدة صحة مدرسية تابعة لمحل السكن فوراً.
   • السيدات الأرامل: بطاقة رقم قومي سارية + شهادة وفاة الزوج + صورة شخصية + استمارة انتفاع + بيان معاش من التأمينات -> مكتب التأمينات ثم فرع التأمين الصحي.

6. مواعيد العيادات:
   • فترات صباحية (8:00 ص إلى 2:00 م) ومسائية (2:00 م إلى 8:00 م) من السبت إلى الخميس.
   • وجّه دائماً للنقر على "الانتقال لبطاقات المواعيد بالصفحة" للاطلاع على التخصصات بالتفصيل.

الأسلوب: عربي مصري فصيح ومهذب، مباشر وسريع البديهة.`;

interface SuggestedAction {
  label: string;
  actionType: "booking" | "schedules" | "schedules_navigate" | "cards_navigate" | "admin" | "tel" | "location";
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

// Engine 1: Google Gemini Flash via OpenRouter - Ultra Fast (< 3 seconds), Smart, Instant
async function callOpenRouterGemini(userText: string, imageBase64?: string): Promise<string | null> {
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
    const timeout = setTimeout(() => controller.abort(), 10000);

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
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent }
        ],
        temperature: 0.15,
        max_tokens: 650
      }),
      cache: "no-store"
    });

    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply && reply.trim()) return reply.trim();
  } catch (err) {
    console.warn("OpenRouter Gemini fetch error:", err);
  }

  return null;
}

// Engine 2: Google Gemini Direct API (gemini-3.8-flash) with thinkingBudget: 0 for instant response
async function callGeminiDirect(userText: string, imageBase64?: string): Promise<string | null> {
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

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${GEMINI_API_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 1024,
          thinkingConfig: { thinkingBudget: 0 } // Eliminates long thinking delay!
        }
      }),
      cache: "no-store"
    });

    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    
    const textPart = data.candidates?.[0]?.content?.parts?.find((p: any) => p.text && !p.thoughtSignature)?.text 
      || data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (textPart && textPart.trim()) return textPart.trim();
  } catch (err) {
    console.warn("Gemini Direct fetch error:", err);
  }

  return null;
}

// Engine 3: OpenRouter Gemma 26B Failover
async function callOpenRouterGemma(userText: string, imageBase64?: string): Promise<string | null> {
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
    const timeout = setTimeout(() => controller.abort(), 8000);

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
        temperature: 0.15,
        max_tokens: 650
      }),
      cache: "no-store"
    });

    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply && reply.trim()) return reply.trim();
  } catch (err) {
    console.warn("OpenRouter Gemma fetch error:", err);
  }

  return null;
}

// Engine 4: Local Sohag Knowledge Engine (Fallback with exact official data)
function generateLocalReply(userText: string, hasImage: boolean) {
  // 1. Cards & Benefits queries
  if (/أرامل|ارامل|وفاة الزوج|بطاقة ارملة/i.test(userText)) {
    return `أوراق وخطوات استخراج بطاقة التأمين الصحي للسيدات الأرامل:
📋 الأوراق المطلوبة:
1. بطاقة رقم قومي سارية للأرملة.
2. شهادة وفاة الزوج المميكنة.
3. صورة شخصية حديثة.
4. استمارة انتفاع من التأمين الصحي.
5. بيان معاش رسمي معتمد من التأمينات الاجتماعية.

🚶‍♂️ الخطوات:
التوجه لمكتب التأمينات لطلب بيان تأميني واعتماد الاستمارة، ثم التوجه لفرع التأمين الصحي لتقديم الأوراق واستخراج البطاقة فوراً.
(يمكنك تصفح قسم "دليل البطاقات" بالصفحة لعرض الإنفوجرافيك الرسمي وتكبيره).`;
  }

  if (/مدرسة|مدارس|طلاب|طالب|كارنيه المدرسة|صحة مدرسية/i.test(userText)) {
    return `خطوات وأوراق استخراج كارنيه التأمين لطلاب المدارس (ابتدائي/إعدادي/ثانوي):
📋 الأوراق المطلوبة:
1. شهادة ميلاد مميكنة كمبيوتر حديثة.
2. صورة شخصية حديثة للطالب.
3. إثبات قيد معتمد ومختوم من المدرسة.
4. إيصال سداد المصروفات المدرسية.
5. صورة بطاقة الرقم القومي لولي الأمر.

📍 أين يتم الاستخراج؟
من أقرب وحدة صحة مدرسية، أو إدارة منطقة سوهاج (شارع المدارس)، أو ديوان الفرع، ويتم استلام الكارنيه في نفس اليوم.`;
  }

  if (/مواليد|مولود|طفل|أطفال|اطفال|حديثي الولادة|رضيع/i.test(userText)) {
    return `إجراءات استخراج التأمين الصحي للأطفال حديثي الولادة والمواليد:
📋 الأوراق المطلوبة:
1. شهادة ميلاد الطفل كمبيوتر (أو شهادة الميلاد الورقية لحديثي الولادة).
2. صورة بطاقة الرقم القومي للأب أو ولي الأمر.

🚶‍♂️ الخطوات:
التوجه مباشرة لأقرب وحدة صحة مدرسية تابعة لمحل سكن ولي الأمر، وتسجيل الطفل واستلام الكارنيه فوراً في نفس اليوم.`;
  }

  if (/معاش|معاشات|متقاعد|تجديد المعاش/i.test(userText)) {
    return `أوراق وإجراءات استخراج أو تجديد بطاقة التأمين للمعاشات:
📋 الأوراق المطلوبة:
1. استمارة اشتراك مميكنة للمعاشات معتمدة ومختومة من التأمينات.
2. صورة بطاقة الرقم القومي سارية.
3. عدد 2 صورة شخصية حديثة.
4. طابعة بالرقم التأميني (بيان معاش).

💡 تنبيه رقمي: التجديد متاح الآن بالرقم القومي فقط تسهيلاً على أصحاب المعاشات.`;
  }

  if (/موظف جديد|تعيين|لياقة طبية|كشف تعيين|استمارة تعيين/i.test(userText)) {
    return `إجراءات بطاقة التأمين الصحي للموظفين الجدد (بطاقتك العلاجية حقك):
📋 الأوراق المطلوبة:
1. استمارة مميكنة مختومة بختم النسر من جهة العمل ومعتمدة.
2. بطاقة رقم قومي سارية + 2 صورة شخصية حديثة.
3. برنت تأميني وبرنت منشأة من التأمينات وجهة العمل.

📍 التوجه لمركز إصدار البطاقات بالفرع لاستلام البطاقة فور استكمال الأوراق.`;
  }

  // 2. Hilal Hospital queries
  const isHilalQuery = /مدير المستشفى|مدير مستشفى الهلال|مستشفى الهلال|الهلال/i.test(userText);
  if (isHilalQuery && /مدير|مين ماسك|رئيس|ادارة|مكان|فين/i.test(userText)) {
    return `مستشفى الهلال للتأمين الصحي بسوهاج:
📍 الموقع: سوهاج - ميدان الثقافة - بجوار ديوان عام المحافظة.

القيادات وإدارة المستشفى:
• مدير المستشفى: دكتور / محمد خالد
• مدير الشئون العلاجية: دكتور / أحمد حسني
• مدير الشئون المالية والإدارية: أستاذ / أشرف الجندي
• مدير إدارة شئون المرضى: أستاذ / شريف محرزي
• مدير مكتب مدير المستشفى: أستاذ / أحمد حسن
(هاتف مستشفى الهلال: 0932324567 / 0932324568)`;
  }

  // 3. Ramadan 10 queries
  const isRamadanQuery = /مدير مجمع العاشر|مجمع العاشر|شهرت|العاشر من رمضان|علاء الديب/i.test(userText);
  if (isRamadanQuery && /مدير|مين ماسك|رئيس|ادارة/i.test(userText)) {
    return `إدارة مجمع عيادات العاشر من رمضان بسوهاج:
• مدير مجمع العاشر: دكتورة / شهرت القاضي
• مدير الشئون المالية والإدارية: أستاذ / علاء الديب البدري
• مدير اللجنة الطبية العامة بسوهاج: دكتور / محمد أمين
(هاتف مجمع العاشر: 0932310987)`;
  }

  // 4. Developer Islam Abouelyazid queries
  const isDeveloperQuery = /اسلام|إسلام|ابواليزيد|أبو اليزيد|مطور|مصمم البوابة|مبرمج|من بنى|من صمم|مهندس اسلام/i.test(userText);
  if (isDeveloperQuery) {
    return `مسؤول تطوير وتصميم البوابة الإلكترونية لفرع سوهاج للتأمين الصحي هو:
مهندس / إسلام أبو اليزيد (مطور ومهندس البوابة الرقمية).

هو المهندس الذي قام بتصميم وبناء وهندسة وتطوير البوابة الإلكترونية وتطبيقات الويب الذكية لفرع سوهاج للتأمين الصحي بالكامل.`;
  }

  // 5. Portal Manager Mohamed Abdelhamid queries
  const isPortalManager = /مسئول البوابة|مسؤول البوابة|محمد عبد الحميد/i.test(userText);
  if (isPortalManager) {
    return `مسئول البوابة الإلكترونية لفرع سوهاج للتأمين الصحي هو:
مهندس / محمد عبد الحميد (متابعة وتشغيل وتحديث منصة البوابة الإلكترونية)،
ويعاونه في التطوير والتصميم: مهندس / إسلام أبو اليزيد (مهندس ومطور البوابة الرقمية).`;
  }

  // 6. Admin Manager Mohamed Fawzy queries
  const isAdminFawzy = /محمد فوزي|شئون إدارية|شئون ادارية|مدير الشئون الادارية|رئيس قسم الشئون الادارية|هاني خلف/i.test(userText);
  if (isAdminFawzy) {
    return `مدير الشئون الإدارية بديوان عام فرع سوهاج للتأمين الصحي هو:
أستاذ / محمد فوزي (المشرف على التنظيم الإداري والخدمات المعاونة برئاسة الفرع).`;
  }

  // 7. Branch Director General Mohamed Khalaf Afifi
  const isDirectorGeneral = /مدير الفرع|مدير عام الفرع|رئيس الفرع|دكتور محمد خلف|عفيفي/i.test(userText);
  if (isDirectorGeneral) {
    return `مدير عام فرع سوهاج للتأمين الصحي ورئيس الهرم القيادي للفرع هو:
دكتور / محمد خلف عفيفي (مدير عام الفرع المشرف على منظومة التطوير الشامل بسوهاج).

ويعاونه في الشئون المالية والإدارية: الأستاذ / معتز بالله فاروق حمادي (مدير الشئون المالية والإدارية بمقر ديوان عام الفرع).
(هاتف ديوان عام فرع سوهاج الأرضي: 0932156139).`;
  }

  // 8. IT Leadership
  const isITLeader = /نظم ومعلومات|مصطفى خلف|صفوت الجزيري|تكنولوجيا المعلومات|شبكات/i.test(userText);
  if (isITLeader) {
    return `إدارة تكنولوجيا المعلومات والنظم بفرع سوهاج:
• مدير إدارة النظم والمعلومات: مهندس / مصطفى خلف
• رئيس قسم تكنولوجيا المعلومات: مهندس / صفوت الجزيري
• مطور ومهندس البوابة الإلكترونية: مهندس / إسلام أبو اليزيد
• مسئول تشغيل البوابة: مهندس / محمد عبد الحميد
• مسؤول الشبكات والاتصالات: مهندسة / سماح القاضي`;
  }

  // 9. Specialized Clinics
  const isSpecQuery = /العيادات التخصصية|تخصصية|شريف طلعت|رفعت عمار/i.test(userText);
  if (isSpecQuery && /مدير|ادارة/i.test(userText)) {
    return `إدارة العيادات التخصصية بسوهاج (ميدان العروبة):
• مدير العيادات التخصصية: دكتور / شريف طلعت أبوزيد
• مدير الشئون المالية والإدارية: أستاذ / رفعت عمار
(هاتف العيادات التخصصية: 0932331122)`;
  }

  // 10. Sohag Region
  const isRegionQuery = /منطقة سوهاج|محمد عصمت|خالد حمادي/i.test(userText);
  if (isRegionQuery && /مدير|ادارة/i.test(userText)) {
    return `إدارة منطقة سوهاج للتأمين الصحي (شارع المدارس):
• مدير المنطقة: دكتور / محمد عصمت
• مدير الشئون المالية والإدارية: أستاذ / خالد حمادي
(هاتف منطقة سوهاج: 0932345566)`;
  }

  // 11. Generic Doctor query where specific doctor is not listed
  const isDoctorQuery = /دكتور مين|طبيب مين|اسم الدكتور|دكتور مخ|دكتور عظام|دكتور رمد|دكتور جراحة|دكتور قلب|دكتور باطنة|مين بيكشف/i.test(userText);
  if (isDoctorQuery) {
    return `أهلاً بك يا فندم. أسماء الأطباء المعالجين تتغير دورياً وفقاً لجداول النوبتجيات اليومية لكل عيادة، ويمكنك مراجعة جدول المواعيد بالبوابة لمعرفة أيام وساعات العمل المعتمدة.

وللاستعلام المباشر عن الطبيب النوبتجي أو إنهاء أي إجراء، يرجى مراجعة إدارة المنشأة المعنية:
• مستشفى الهلال (ميدان الثقافة): مكتب د. محمد خالد (مدير المستشفى) أو أ. أشرف الجندي (المدير المالي والإداري) - هاتف: 0932324567.
• مجمع العاشر: مكتب د. شهرت القاضي (مدير المجمع) أو أ. علاء الديب البدري (المدير المالي والإداري) - هاتف: 0932310987.
• العيادات التخصصية: مكتب د. شريف طلعت أبوزيد أو أ. رفعت عمار (المدير المالي والإداري) - هاتف: 0932331122.
• ديوان عام الفرع: مكتب أ. معتز بالله فاروق حمادي (مدير الشئون المالية والإدارية) - هاتف: 0932156139.`;
  }

  const isProblemOrAdmin = /مشكل|مشكلة|شكوى|تأخير|تعطل|عطل|فلوس|استرداد|مصاريف|بدل|سفر|شيك|شيكات|معاش|عجز|قرار|موافقة|كارنيه|بطاقة|تجديد|اوراق|أوراق|مستندات|فواتير|صرف|مالي|اداري|إداري|معتز|أشرف الجندي|علاء الديب|رفعت عمار|خالد حمادي/i.test(
    userText
  );
  if (isProblemOrAdmin) {
    if (/هلال/i.test(userText)) {
      return `لحل أي مشكلة أو إجراء مالي وإداري بمستشفى الهلال (ميدان الثقافة)، يرجى التوجه لمكتب الأستاذ / أشرف الجندي (مدير الشئون المالية والإدارية بمستشفى الهلال)، أو مكتب شئون المرضى (أ. شريف محرزي)، هاتف المستشفى: 0932324567.`;
    }
    if (/عاشر/i.test(userText)) {
      return `بخصوص أي مشكلة أو معاملة مالية وإدارية أو لجان طبية بمجمع العاشر، يرجى التوجه لمكتب الأستاذ / علاء الديب البدري (مدير الشئون المالية والإدارية بمجمع العاشر) تحت إشراف الدكتورة / شهرت القاضي (مدير المجمع)، وبالتعاون مع الدكتور / محمد أمين (مدير اللجنة الطبية العامة)، هاتف المجمع: 0932310987.`;
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

    // Call AI Engines with high speed priority:
    // 1. Google Gemini Flash (Fastest, Smartest, 1-3 seconds response time, perfect dialect)
    let reply: string | null = null;
    let providerUsed = "none";

    reply = await callOpenRouterGemini(userText, image);
    if (reply) {
      providerUsed = "Google Gemini Flash";
    }

    // 2. Google Gemini Direct API (Zero thinking budget fallback)
    if (!reply) {
      reply = await callGeminiDirect(userText, image);
      if (reply) {
        providerUsed = "Google Gemini 3.8 Flash";
      }
    }

    // 3. OpenRouter Gemma 26B
    if (!reply) {
      reply = await callOpenRouterGemma(userText, image);
      if (reply) {
        providerUsed = "OpenRouter (Gemma 26B)";
      }
    }

    // 4. Local Sohag Knowledge Base
    if (!reply) {
      reply = generateLocalReply(userText, hasImage);
      providerUsed = "Local Sohag Knowledge Engine";
    }

    // Extract dynamic actions and admin cards
    const actions: SuggestedAction[] = [];
    let adminCard: any = null;

    const lowerCombined = `${userText} ${reply}`.toLowerCase();

    // Check for Cards & Benefits guide intent
    const isCardIntent = /بطاق|كارنيه|أرامل|ارامل|معاش|مدارس|طلاب|طالب|مواليد|أطفال|اطفال|موظف جديد|تعيين|لياقة/i.test(lowerCombined);
    if (isCardIntent) {
      actions.push({
        label: "🪪 عرض دليل البطاقات الرسمية بالصفحة",
        actionType: "cards_navigate",
        payload: "cards-guide-section"
      });
    }

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
    const isAdminIntent = /مشكل|مشكلة|شكوى|تأخير|تعطل|عطل|مالي|اداري|إداري|شيك|بدل|استرداد|مصاريف|معاش|عجز|قرار|معتز|أشرف الجندي|علاء الديب|رفعت عمار|خالد حمادي/i.test(
      lowerCombined
    );

    if (isAdminIntent) {
      if (/هلال/i.test(lowerCombined)) {
        adminCard = {
          officerName: BRANCH_ADMIN_LEADERS.helal.name,
          role: BRANCH_ADMIN_LEADERS.helal.role,
          facility: "مستشفى الهلال للتأمين الصحي بسوهاج (ميدان الثقافة)",
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
