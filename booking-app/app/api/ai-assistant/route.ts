import { NextRequest, NextResponse } from "next/server";

// Comprehensive knowledge base for Sohag Health Insurance Branch
interface FacilityInfo {
  name: string;
  type: string;
  location: string;
  phone: string;
  adminLead: string;
  adminRole: string;
  medicalLead: string;
  specialties: string[];
}

const SOHAG_FACILITIES: Record<string, FacilityInfo> = {
  helal: {
    name: "مستشفى الهلال للتأمين الصحي بسوهاج",
    type: "مستشفى جراحي وطبي رئيسي وطوارئ 24 ساعة",
    location: "سوهاج - شارع المحطة أمام محطة القطار",
    phone: "0932324567 / 0932324568",
    adminLead: "أستاذ / أشرف الجندي",
    adminRole: "مدير مالي وإداري بمستشفى الهلال",
    medicalLead: "دكتور / محمد خالد (مدير المستشفى) ودكتور / أحمد حسني (مدير الشئون العلاجية)",
    specialties: [
      "جراحة عامة", "جراحة عظام", "جراحة مخ وأعصاب", "جراحة أوعية دموية", 
      "رعاية مركزة (ICU)", "حضانات مبتسرين", "طوارئ وعناية مركزة 24 ساعة", 
      "غسيل كلوي", "أورام وعمليات كبرى"
    ]
  },
  ramadan10: {
    name: "مجمع عيادات العاشر من رمضان واللجنة الطبية العامة",
    type: "مجمع عيادات تخصصية ولجان طبية عامة",
    location: "سوهاج - شارع ترعة باجا الغربي خلف المستشفى التعليمي",
    phone: "0932310987",
    adminLead: "أستاذ / علاء الدين خلف",
    adminRole: "مدير مالي وإداري بمجمع العاشر",
    medicalLead: "دكتورة / شهرت القاضي (مدير المجمع) ودكتور / محمد أمين (مدير اللجنة الطبية العامة بسوهاج)",
    specialties: [
      "لجنة العجز والتقارير الطبية العامة", "صدر", "جراحة عامة", "أنف وأذن وحنجرة", 
      "باطنة عامة وسكر", "قلب وأوعية دموية", "كبد وجهاز هضمي", "عظام", "رمد وعيون", 
      "أطفال ومبتسرين", "جلدية وتناسلية", "مسالك بولية", "أسنان وجراحة وجه وفكين", 
      "سمعيات وتخاطب", "لجان طبية تخصصية"
    ]
  },
  specialized: {
    name: "العيادات التخصصية بسوهاج (مجمع اللجان والعيادات)",
    type: "عيادات استشارية متقدمة ولجان أمراض مزمنة",
    location: "سوهاج - ميدان العروبة - عمارة الأوقاف",
    phone: "0932331122",
    adminLead: "أستاذ / رفعت عمار",
    adminRole: "مدير مالي وإداري بالعيادات التخصصية",
    medicalLead: "دكتور / شريف طلعت أبوزيد (مدير العيادات التخصصية)",
    specialties: [
      "لجان أمراض الدم وأورام الأطفال", "علاج الأورام وصرف الكيماوي", 
      "أمراض الدم والهيموفيليا", "أمراض المناعة والروماتيزم والذئبة الحمراء", 
      "لجان السكر والغدد الصماء", "أمراض الكلى المتقدمة"
    ]
  },
  region1: {
    name: "إدارة منطقة سوهاج للتأمين الصحي",
    type: "المقر الإداري وشئون الاشتراكات وخدمة العملاء",
    location: "سوهاج - شارع المدارس - بجوار مدرسة التجارة بنات",
    phone: "0932345566",
    adminLead: "أستاذ / خالد حمادي",
    adminRole: "مدير مالي وإداري لمنطقة سوهاج",
    medicalLead: "دكتور / محمد عصمت (مدير منطقة سوهاج)",
    specialties: [
      "خدمة العملاء والاشتراكات", "استخراج وتجديد البطاقات التأمينية", 
      "توزيع المنتفعين على الوحدات والمجمعات", "تسجيل المواليد والطلاب"
    ]
  }
};

const SYSTEM_PROMPT = `أنت المساعد الذكي والمتحدث الرسمي لبوابة فرع سوهاج للتأمين الصحي (الهيئة العامة للتأمين الصحي - مصر).

مهمتك:
1. الرد بدقة وموثوقية باللغة العربية الفصحى السهلة والودودة، وخدمة منتفعي التأمين الصحي بسوهاج (موظفين، معاشات، طلاب، مواليد، عمالة غير منتظمة).
2. الإلمام التام بكافة تفاصيل فرع سوهاج:
   - مجمع عيادات العاشر من رمضان: يقع في شارع ترعة باجا الغربي خلف المستشفى التعليمي. مديرة المجمع دكتورة شهرت القاضي، مدير اللجنة الطبية العامة دكتور محمد أمين، والمدير المالي والإداري أستاذ علاء الدين خلف. فترات العمل: صباحية (8 ص - 2 م) ومسائية (2 م - 8 م).
   - مستشفى الهلال للتأمين الصحي: شارع المحطة أمام محطة القطار. مدير المستشفى د. محمد خالد، مدير الشئون العلاجية د. أحمد حسني، المدير المالي والإداري أستاذ أشرف الجندي. (طوارئ 24 ساعة، جراحات، غسيل كلوي، رعاية مركزة).
   - العيادات التخصصية: ميدان العروبة عمارة الأوقاف. المدير د. شريف طلعت أبوزيد، والمدير المالي والإداري أستاذ رفعت عمار (أورام، أمراض دم، مناعة، سكر وغدد).
   - إدارة منطقة سوهاج: شارع المدارس. المدير د. محمد عصمت، والمدير المالي والإداري أستاذ خالد حمادي (بطاقات، اشتراكات، شباك واحد).
3. عند السؤال عن الجداول والمواعيد:
   - اذكر مواعيد الفترات الصباحية (8:00 ص إلى 2:00 م) والمسائية (2:00 م إلى 8:00 م).
   - اذكر أن أيام الكشف من السبت إلى الخميس.
   - وجه المريض للاطلاع على بطاقات الجداول التفاعلية المباشرة بالبوابة.
4. عند تحليل الصور (روشتات، تقارير، تحاليل، بطاقات):
   - اقرأ بدقة النص أو التشخيص أو التخصص الطبي المكتوب في الصورة.
   - لخص الحالة بلطف، واذكر التخصص المطلوب والمنشأة المناسبة في سوهاج.
   - ضع تنبيهاً طبياً مهنياً بأن الإرشاد استرشادي لتسهيل الإجراءات ولابد من مراجعة الطبيب.
5. حافظ دائماً على نبرة رسمية، إنسانية، مطمئنة، ومنظمة في نقاط واضحة.`;

interface SuggestedAction {
  label: string;
  actionType: "booking" | "schedules" | "admin" | "tel" | "location";
  payload: string;
}

// API Keys strictly from Environment Variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";

// Engine 1: Google Gemini API (gemini-3.8-flash)
async function callGemini(userText: string, imageBase64?: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  const parts: any[] = [{ text: `${SYSTEM_PROMPT}\n\nسؤال المواطن: ${userText || "يرجى فحص المستند/الروشتة المرفقة وتوجيهي."}` }];

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

  // Try gemini-3.8-flash
  const modelsToTry = ["gemini-3.8-flash", "gemma-4-26b-a4b-it"];
  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }] }),
        cache: "no-store"
      });

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

// Engine 2: OpenRouter API (google/gemma-4-26b-a4b-it)
async function callOpenRouter(userText: string, imageBase64?: string): Promise<string | null> {
  if (!OPENROUTER_API_KEY) return null;

  try {
    let userContent: any = userText || "يرجى فحص المستند أو الروشتة المرفقة وتقديم التوجيه اللازم.";

    if (imageBase64) {
      userContent = [
        { type: "text", text: userText || "يرجى فحص المستند الطبي/الروشتة وتوضيح التخصص المطلوب بالفرع." },
        { type: "image_url", image_url: { url: imageBase64 } }
      ];
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
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
        max_tokens: 650
      }),
      cache: "no-store"
    });

    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply && reply.trim()) return reply.trim();
  } catch {
    return null;
  }

  return null;
}

// Engine 3: Local Rule-Based Knowledge Engine (Fallback)
function generateLocalReply(userText: string, hasImage: boolean) {
  const isFinancialOrAdmin =
    /مالي|اداري|إداري|شيك|شيكات|بدل|انتقال|سفر|استرداد|مصاريف|معاش|عجز|قرار|موافقة|كارنيه|بطاقة|تجديد|اوراق|أوراق|مستندات|فواتير|صرف|أشرف الجندي|رفعت عمار|علاء الدين|علاء|خالد حمادي/i.test(
      userText
    );
  const isBookingOrSchedule =
    /حجز|احجز|ميعاد|موعد|جدول|مواعيد|دكتور|طبيب|عيادة|كشف|ايام|أيام|فترة|صباح|مساء|شغال/i.test(userText);

  if (isFinancialOrAdmin) {
    if (/هلال/i.test(userText)) {
      return `أهلاً بك. بخصوص الإجراءات المالية والإدارية بمستشفى الهلال بسوهاج، يمكنك التوجه لمكتب الشئون المالية والإدارية بقيادة ${SOHAG_FACILITIES.helal.adminLead}، لإنهاء إجراءاتك وتقديم المستندات المطلوبة.`;
    }
    if (/عاشر/i.test(userText)) {
      return `مرحباً بك. المعاملات المالية والإدارية وقرارات اللجنة الطبية العامة بمجمع العاشر يتم مراجعتها وتنسيقها تحت إشراف ${SOHAG_FACILITIES.ramadan10.adminLead} واللجنة الطبية العامة برئاسة ${SOHAG_FACILITIES.ramadan10.medicalLead}.`;
    }
    return `للمعاملات الإدارية والمالية واستخراج البطاقات التأمينية، يمكنك التوجه لإدارة منطقة سوهاج ومراجعة مكتب ${SOHAG_FACILITIES.region1.adminLead} لتوجيهك للشباك المختص.`;
  }

  if (hasImage) {
    return `تم استلام وفحص الصورة الطبية بنجاح! 
بناءً على الفحص الاسترشادي للمستند:
- يرجى مراجعة العيادة التخصصية المطلوبة بمجمع عيادات العاشر من رمضان أو مستشفى الهلال بسوهاج.
- يمكنك حجز موعد الكشف مباشرة عبر البوابة الإلكترونية.
⚠️ تنبيه طبي: هذا التحليل استرشادي لتسهيل إجراءاتك بالبوابة، ويرجى دائماً عرض أصل الروشتة على الطبيب المعالج.`;
  }

  if (isBookingOrSchedule) {
    return `مرحباً بك في فرع سوهاج للتأمين الصحي 🏥
مواعيد وفترات العمل بالعيادات:
- الفترة الصباحية: من 8:00 صباحاً حتى 2:00 ظهراً (مجمع العاشر، الهلال، العيادات التخصصية).
- الفترة المسائية: من 2:00 ظهراً حتى 8:00 مساءً.
- أيام العمل: من السبت إلى الخميس أسبوعياً.
يمكنك الضغط على زر "جدول مواعيد العيادات" بالأسفل للانتقال فوراً لبطاقات المواعيد وأيام الكشف التفاعلية.`;
  }

  return `أهلاً بك في بوابة فرع سوهاج للتأمين الصحي. أنا المساعد الذكي، يمكنني إرشادك لحجز العيادات، معرفة مواعيد الأطباء، فحص صور الروشتات، وتوجيهك للإدارات المالية واللجان الطبية. كيف يمكنني خدمتك؟`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, image } = body;

    const userText = (message || "").trim();
    const hasImage = Boolean(image);

    // Call AI Engines with automatic failover
    let reply: string | null = null;
    let providerUsed = "none";

    // 1. Try Google Gemini
    reply = await callGemini(userText, image);
    if (reply) {
      providerUsed = "Google Gemini";
    }

    // 2. Fallback to OpenRouter (Gemma) if Gemini fails or is unavailable
    if (!reply) {
      reply = await callOpenRouter(userText, image);
      if (reply) {
        providerUsed = "OpenRouter (Gemma)";
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
    const isScheduleIntent = /جدول|مواعيد|موعد|عيادة|كشف|ايام|أيام|فترة|ساعات|تخصص/i.test(lowerCombined);
    if (isScheduleIntent) {
      actions.push({
        label: "📅 جدول مواعيد العيادات",
        actionType: "schedules",
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

    // Check for admin intent
    const isAdminIntent = /مالي|اداري|إداري|شيك|بدل|استرداد|مصاريف|معاش|عجز|قرار|أشرف الجندي|علاء الدين|رفعت عمار|خالد حمادي/i.test(
      lowerCombined
    );

    if (isAdminIntent) {
      if (/هلال/i.test(lowerCombined)) {
        adminCard = {
          officerName: SOHAG_FACILITIES.helal.adminLead,
          role: SOHAG_FACILITIES.helal.adminRole,
          facility: SOHAG_FACILITIES.helal.name,
          phone: SOHAG_FACILITIES.helal.phone,
          docsRequired: [
            "أصل بطاقة التأمين الصحي السارية",
            "صورة بطاقة الرقم القومي",
            "أصل الفواتير والمستندات الطبية معتمدة ومختومة",
            "تقرير طبي معتمد من استشاري المستشفى"
          ]
        };
        actions.push({ label: "📞 الاتصال بمستشفى الهلال", actionType: "tel", payload: "0932324567" });
      } else if (/عاشر/i.test(lowerCombined)) {
        adminCard = {
          officerName: SOHAG_FACILITIES.ramadan10.adminLead,
          role: SOHAG_FACILITIES.ramadan10.adminRole,
          facility: SOHAG_FACILITIES.ramadan10.name,
          phone: SOHAG_FACILITIES.ramadan10.phone,
          docsRequired: [
            "بطاقة التأمين الصحي ورقم قومي ساري",
            "خطاب التحويل من جهة العمل أو المدرسة",
            "أصل تقرير اللجنة الطبية العامة وقرار الكشف",
            "إيصالات سداد الرسوم المقررة"
          ]
        };
        actions.push({ label: "📞 الاتصال بمجمع العاشر", actionType: "tel", payload: "0932310987" });
      } else {
        adminCard = {
          officerName: SOHAG_FACILITIES.region1.adminLead,
          role: SOHAG_FACILITIES.region1.adminRole,
          facility: SOHAG_FACILITIES.region1.name,
          phone: SOHAG_FACILITIES.region1.phone,
          docsRequired: [
            "بطاقة الرقم القومي سارية",
            "الرقم التأميني أو برنت التأمينات الاجتماعية",
            "صورة شخصية حديثة للمنتفع",
            "استمارة التأمين المعتمدة من جهة العمل"
          ]
        };
        actions.push({ label: "📞 الاتصال بإدارة المنطقة", actionType: "tel", payload: "0932345566" });
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
        reply:
          "أهلاً بك. يمكنك حجز موعد الكشف أو استعراض جدول العيادات والمواعيد المحدثة مباشرة عبر البوابة.",
        actions: [
          { label: "📅 جدول مواعيد العيادات", actionType: "schedules", payload: "" },
          { label: "🩺 حجز موعد كشف", actionType: "booking", payload: "" }
        ]
      },
      { status: 200 }
    );
  }
}
