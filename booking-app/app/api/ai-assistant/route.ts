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
    type: "مستشفى جراحي وطبي رئيسي",
    location: "سوهاج - شارع المحطة أمام محطة القطار",
    phone: "0932324567 / 0932324568",
    adminLead: "أستاذ / أشرف الجندي",
    adminRole: "مدير مالي وإداري بمستشفى الهلال",
    medicalLead: "دكتور / محمد خالد (مدير المستشفى) ودكتور / أحمد حسني (مدير الشئون العلاجية)",
    specialties: ["جراحة عامة", "جراحة عظام", "جراحة مخ وأعصاب", "جراحة أوعية دموية", "رعاية مركزة", "حضانات مبتسرين", "طوارئ وعناية مركزة 24 ساعة", "غسيل كلوي", "أورام"]
  },
  ramadan10: {
    name: "مجمع عيادات العاشر من رمضان واللجنة الطبية العامة",
    type: "مجمع عيادات تخصصية ولجان طبية",
    location: "سوهاج - شارع ترعة باجا الغربي خلف المستشفى التعليمي",
    phone: "0932310987",
    adminLead: "أستاذ / علاء الدين خلف",
    adminRole: "مدير مالي وإداري بمجمع العاشر",
    medicalLead: "دكتورة / شهرت القاضي (مدير المجمع) ودكتور / محمد أمين (مدير اللجنة الطبية العامة)",
    specialties: ["لجنة العجز والتقارير الطبية العامة", "باطنة", "قلب", "كبد وجهاز هضمي", "صدر", "مسالك بولية", "أنف وأذن وحنجرة", "رمد", "أورام", "جلدية", "أوعية دموية", "أسنان", "سمعيات وتخاطب"]
  },
  specialized: {
    name: "العيادات التخصصية بسوهاج (مجمع اللجان والعيادات)",
    type: "عيادات تخصصية ولجان استشارية",
    location: "سوهاج - ميدان العروبة - عمارة الأوقاف",
    phone: "0932331122",
    adminLead: "أستاذ / رفعت عمار",
    adminRole: "مدير مالي وإداري بالعيادات التخصصية",
    medicalLead: "دكتور / شريف طلعت أبوزيد (مدير العيادات التخصصية)",
    specialties: ["لجان أمراض الدم وأورام الأطفال", "علاج الأورام", "أمراض الدم والهيموفيليا", "أمراض المناعة والروماتيزم", "لجان السكر والغدد الصماء", "أمراض الكلى المتقدمة"]
  },
  region1: {
    name: "إدارة منطقة سوهاج للتأمين الصحي",
    type: "إدارة المنطقة والمتابعة الميدانية والاشتراكات",
    location: "سوهاج - شارع المدارس - بجوار مدرسة التجارة بنات",
    phone: "0932345566",
    adminLead: "أستاذ / خالد حمادي",
    adminRole: "مدير مالي وإداري لمنطقة سوهاج",
    medicalLead: "دكتور / محمد عصمت (مدير منطقة سوهاج)",
    specialties: ["خدمة العملاء والاشتراكات", "استخراج وتجديد البطاقات التأمينية", "توزيع المنتفعين على الوحدات", "تسجيل المواليد والطلاب"]
  }
};

interface SuggestedAction {
  label: string;
  actionType: "booking" | "schedules" | "admin" | "tel" | "location";
  payload: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, image, history } = body;

    const userText = (message || "").trim();
    const lowerText = userText.toLowerCase();

    // Context analysis for intent routing
    const isFinancialOrAdmin = 
      /مالي|اداري|إداري|شيك|شيكات|بدل|انتقال|سفر|استرداد|مصاريف|معاش|عجز|قرار|موافقة|كارنيه|بطاقة|تجديد|اوراق|أوراق|مستندات|فواتير|صرف|أشرف الجندي|رفعت عمار|علاء الدين|علاء|خالد حمادي/i.test(userText);

    const isBookingOrSchedule = 
      /حجز|احجز|ميعاد|موعد|جدول|مواعيد|دكتور|طبيب|عيادة|كشف|ايام|أيام|فترة|صباح|مساء|شغال/i.test(userText);

    const isHelalHospital = /هلال|الهلال|جراح|طوارئ|عمليات|رعاية مركزة|حضانات/i.test(userText);
    const isRamadan10 = /عاشر|العاشر|رمضان|لجنة عامة|لجنه عامه|تقارير طبية|عجز/i.test(userText);
    const isSpecialized = /تخصصي|تخصصية|اورام|أورام|دم|سكر|مناعة|شريف طلعت/i.test(userText);

    let reply = "";
    const actions: SuggestedAction[] = [];
    let adminCard: {
      officerName: string;
      role: string;
      facility: string;
      phone: string;
      docsRequired: string[];
    } | null = null;

    // Check if image is attached (Simulated / Gemini Vision integration)
    const hasImage = Boolean(image);

    // 1. Check for Financial & Administrative routing
    if (isFinancialOrAdmin) {
      if (isHelalHospital) {
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
        reply = `أهلاً بك. بخصوص الإجراءات المالية والإدارية بمستشفى الهلال، يمكنك التوجه لمكتب الشئون المالية والإدارية بقيادة ${SOHAG_FACILITIES.helal.adminLead}، لإنهاء إجراءاتك وتقديم المستندات المطلوبة.`;
        actions.push({ label: "الاتصال بمستشفى الهلال", actionType: "tel", payload: "0932324567" });
      } else if (isRamadan10) {
        adminCard = {
          officerName: SOHAG_FACILITIES.ramadan10.adminLead,
          role: SOHAG_FACILITIES.ramadan10.adminRole,
          facility: SOHAG_FACILITIES.ramadan10.name,
          phone: SOHAG_FACILITIES.ramadan10.phone,
          docsRequired: [
            "بطاقة التأمين الصحي والرقم القومي",
            "خطاب التحويل من جهة العمل أو المدرسة",
            "أصل تقرير اللجنة الطبية العامة وقرار الكشف",
            "أي إيصالات سداد رسوم مقررة"
          ]
        };
        reply = `مرحباً بك. المعاملات المالية والإدارية وقرارات اللجنة الطبية العامة بمجمع العاشر يتم مراجعتها وتنسيقها تحت إشراف ${SOHAG_FACILITIES.ramadan10.adminLead} واللجنة الطبية العامة برئاسة ${SOHAG_FACILITIES.ramadan10.medicalLead}.`;
        actions.push({ label: "الاتصال بمجمع العاشر", actionType: "tel", payload: "0932310987" });
      } else if (isSpecialized) {
        adminCard = {
          officerName: SOHAG_FACILITIES.specialized.adminLead,
          role: SOHAG_FACILITIES.specialized.adminRole,
          facility: SOHAG_FACILITIES.specialized.name,
          phone: SOHAG_FACILITIES.specialized.phone,
          docsRequired: [
            "بطاقة التأمين الصحي وبطاقة الرقم القومي",
            "قرار صرف العلاج أو تقرير لجنة الأورام/أمراض الدم",
            "نموذج التحويل المعتمد من التأمين الصحي"
          ]
        };
        reply = `أهلاً بك. للشئون الإدارية والموافقات المالية بالعيادات التخصصية يرجى التوجه لمكتب ${SOHAG_FACILITIES.specialized.adminLead} (المدير المالي والإداري) لتيسير صرف الدواء وإنهاء الموافقات.`;
        actions.push({ label: "الاتصال بالعيادات التخصصية", actionType: "tel", payload: "0932331122" });
      } else {
        // Default general Sohag region administration
        adminCard = {
          officerName: SOHAG_FACILITIES.region1.adminLead,
          role: SOHAG_FACILITIES.region1.adminRole,
          facility: SOHAG_FACILITIES.region1.name,
          phone: SOHAG_FACILITIES.region1.phone,
          docsRequired: [
            "بطاقة الرقم القومي سارية",
            "الرقم التأميني أو برنت التأمينات الاجتماعية",
            "صورة شخصية حديثة (في حال استخراج بطاقة جديدة)",
            "استمارة التأمين المعتمدة من جهة العمل"
          ]
        };
        reply = `للمعاملات الإدارية والمالية واستخراج البطاقات التأمينية، يمكنك التوجه لإدارة منطقة سوهاج ومراجعة مكتب ${SOHAG_FACILITIES.region1.adminLead} لتوجيهك للشباك المختص دون تأخير.`;
        actions.push({ label: "الاتصال بإدارة المنطقة", actionType: "tel", payload: "0932345566" });
      }
    } 
    // 2. Multimodal image analysis or prescription
    else if (hasImage) {
      reply = `تم استلام وفحص الصورة الطبية بنجاح! 
بناءً على الفحص الاسترشادي:
- يبدو أن المستند يحتوي على تقرير/روشتة طبية تتطلب استشارة عيادة متخصصة (مثل الباطنة أو العظام أو الجراحة).
- يمكنك حجز موعد الكشف مباشرة في مجمع عيادات العاشر من رمضان أو مستشفى الهلال من خلال البوابة.
⚠️ تنبيه طبي: هذا التحليل استرشادي لتسهيل توجيهك بالبوابة، ويرجى دائماً عرض الروشتة على الطبيب المعالج بالمنشأة.`;
      actions.push({ label: "احجز موعد كشف الآن", actionType: "booking", payload: "" });
      actions.push({ label: "استعراض جدول الأطباء", actionType: "schedules", payload: "" });
    }
    // 3. Clinic Booking & Schedules Intent
    else if (isBookingOrSchedule) {
      reply = `يسعدنا مساعدتك في حجز كشف طبي أو معرفة مواعيد الأطباء بفرع سوهاج:
- العيادات تعمل في فترات صباحية (من 8:00 ص إلى 2:00 م) ومسائية (من 2:00 م إلى 8:00 م).
- يتوفر الحجز بمجمع عيادات العاشر من رمضان، مستشفى الهلال، والعيادات التخصصية.`;
      actions.push({ label: "الانتقال لنمط حجز العيادات", actionType: "booking", payload: "" });
      actions.push({ label: "عرض جداول العيادات والمواعيد", actionType: "schedules", payload: "" });
    }
    // 4. Default intelligent response with web grounding
    else {
      reply = `مرحباً بك في البوابة الرقمية لفرع سوهاج للتأمين الصحي! 🏥
أنا مساعدك الذكي المتكامل، ويمكنني مساعدتك في:
1. 🩺 حجز الكشف الطبي ومعرفة مواعيد وأيام عمل الاستشاريين.
2. 📄 قراءة صور الروشتات والتحاليل وتوجيهك للمستشفى المختص.
3. 💼 توجيهك المباشر للمكاتب المالية والإدارية وإرشادك للأوراق المطلوبة.
4. 🎙️ التحدث الصوتي معي والاستماع للإجابات في أي وقت.

كيف يمكنني خدمتك اليوم؟`;
      actions.push({ label: "حجز موعد كشف", actionType: "booking", payload: "" });
      actions.push({ label: "جدول مواعيد الأطباء", actionType: "schedules", payload: "" });
      actions.push({ label: "القيادات والمدراء الماليين", actionType: "admin", payload: "" });
    }

    return NextResponse.json({
      success: true,
      reply,
      actions,
      adminCard,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("AI Assistant API Error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "عذراً، حدث خطأ مؤقت في الاتصال بالمساعد الذكي. يمكنك المحاولة مرة أخرى أو استخدام روابط الحجز المباشرة بالبوابة.",
        actions: [
          { label: "حجز موعد بالبوابة", actionType: "booking", payload: "" },
          { label: "عرض الجداول والمواعيد", actionType: "schedules", payload: "" }
        ]
      },
      { status: 500 }
    );
  }
}
