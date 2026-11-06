"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Mic,
  MicOff,
  Image as ImageIcon,
  Volume2,
  VolumeX,
  Sparkles,
  UserCheck,
  Calendar,
  Phone,
  FileText,
  AlertCircle,
  Building2,
  Loader2,
  Maximize2,
  Minimize2
} from "lucide-react";

interface ActionItem {
  label: string;
  actionType: "booking" | "schedules" | "admin" | "tel" | "location";
  payload: string;
}

interface AdminCardData {
  officerName: string;
  role: string;
  facility: string;
  phone: string;
  docsRequired: string[];
}

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  image?: string;
  adminCard?: AdminCardData | null;
  actions?: ActionItem[];
  provider?: string;
  timestamp: string;
}

interface AiMedicalAssistantProps {
  onOpenBooking?: () => void;
  onOpenSchedules?: () => void;
  onOpenTeam?: () => void;
}

export default function AiMedicalAssistant({
  onOpenBooking,
  onOpenSchedules,
  onOpenTeam
}: AiMedicalAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "مرحباً بك في خدمة المساعد الذكي لفرع سوهاج للتأمين الصحي 🏥\nيمكنك سؤالي عن مواعيد وأيام الكشف، إرسال صورة روشتة أو تقرير، أو التحويل للإدارة المالية والإدارية وقرارات اللجان الطبية.",
      actions: [
        { label: "حجز موعد كشف", actionType: "booking", payload: "" },
        { label: "جدول مواعيد العيادات", actionType: "schedules", payload: "" },
        { label: "المدراء الماليين والإداريين", actionType: "admin", payload: "" }
      ],
      timestamp: "الآن"
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "ar-EG";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, []);

  const speakText = (text: string, msgId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[#*_~`]/g, "")
      .replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "ar-SA";
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("التعرف على الصوت غير مدعوم في هذا المتصفح. يرجى استخدام متصفح Chrome أو Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setAttachedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed && !attachedImage) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
      image: attachedImage || undefined,
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    const sentImage = attachedImage;
    setAttachedImage(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          image: sentImage
        })
      });

      const data = await res.json();
      const botMsgId = `bot-${Date.now()}`;
      const botMsg: Message = {
        id: botMsgId,
        sender: "bot",
        text: data.reply || "تمت معالجة استفسارك بنجاح.",
        actions: data.actions || [],
        adminCard: data.adminCard || null,
        provider: data.provider || undefined,
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);

      if (voiceEnabled && data.reply) {
        speakText(data.reply, botMsgId);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: "bot",
          text: "تعذر الاتصال بالمساعد الذكي في هذه اللحظة، يرجى المحاولة مرة أخرى.",
          timestamp: "الآن"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: ActionItem) => {
    if (action.actionType === "booking") {
      setIsOpen(false);
      setTimeout(() => {
        onOpenBooking?.();
      }, 100);
    } else if (action.actionType === "schedules") {
      setIsOpen(false);
      setTimeout(() => {
        if (onOpenSchedules) {
          onOpenSchedules();
        } else {
          const el = document.getElementById("schedules-section");
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            window.location.href = "/#schedules-section";
          }
        }
      }, 120);
    } else if (action.actionType === "admin") {
      setIsOpen(false);
      setTimeout(() => {
        onOpenTeam?.();
      }, 100);
    } else if (action.actionType === "tel") {
      window.location.href = `tel:${action.payload}`;
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-extrabold text-sm shadow-2xl shadow-emerald-900/30 border border-white/20 transition-all hover:scale-105 active:scale-95 group"
          aria-label="فتح المساعد الطبي الذكي"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white animate-ping" />
          </div>
          <span>المساعد الذكي لفرع سوهاج</span>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? "inset-2 sm:inset-6"
              : "bottom-4 left-4 right-4 sm:right-auto sm:w-[440px] h-[620px] max-h-[90vh]"
          } flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/30 dark:border-emerald-500/20 overflow-hidden animate-in fade-in zoom-in-95`}
          dir="rtl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-sm flex items-center gap-1.5">
                  <span>مساعد فرع سوهاج الذكي</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-emerald-100 opacity-90">
                  ذكاء اصطناعي فائق (Gemini & Gemma) • رؤية حاسوبية • صوت
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-xl transition ${
                  voiceEnabled ? "bg-white/20 text-white" : "text-white/60 hover:bg-white/10"
                }`}
                title={voiceEnabled ? "تعطيل النطق الصوتي" : "تفعيل النطق الصوتي"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="hidden sm:block p-2 rounded-xl text-white/80 hover:bg-white/10 transition"
                title={isExpanded ? "تصغير النافذة" : "تكبير النافذة"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  if (typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl text-white/80 hover:bg-white/20 transition"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/40 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 shadow-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-none"
                  }`}
                >
                  {msg.image && (
                    <div className="rounded-xl overflow-hidden border border-white/20 max-h-48">
                      <img src={msg.image} alt="المستند المرفق" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <p className="whitespace-pre-line leading-relaxed font-medium">{msg.text}</p>

                  {msg.adminCard && (
                    <div className="mt-3 p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border-2 border-teal-300 dark:border-teal-700/80 space-y-2 text-right text-xs">
                      <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-black">
                        <UserCheck className="w-4 h-4 text-teal-600" />
                        <span>بيانات التحويل للمسؤول المختص:</span>
                      </div>
                      <div className="space-y-1 text-slate-700 dark:text-slate-200">
                        <p className="font-extrabold text-slate-900 dark:text-white">
                          👤 {msg.adminCard.officerName}
                        </p>
                        <p className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold">
                          📌 {msg.adminCard.role} - {msg.adminCard.facility}
                        </p>
                      </div>

                      {msg.adminCard.docsRequired?.length > 0 && (
                        <div className="pt-2 border-t border-teal-200 dark:border-teal-800 space-y-1">
                          <p className="font-bold text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                            <FileText className="w-3 h-3 text-amber-500" />
                            <span>المستندات والأوراق المطلوبة قبل الذهاب:</span>
                          </p>
                          <ul className="list-disc list-inside text-[11px] text-slate-600 dark:text-slate-400 space-y-0.5">
                            {msg.adminCard.docsRequired.map((doc, i) => (
                              <li key={i}>{doc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-[11px] flex items-center gap-1.5 transition active:scale-95"
                        >
                          {act.actionType === "booking" && <Calendar className="w-3 h-3 text-emerald-600" />}
                          {act.actionType === "admin" && <Building2 className="w-3 h-3 text-teal-600" />}
                          {act.actionType === "tel" && <Phone className="w-3 h-3 text-blue-600" />}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.sender === "bot" && (
                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-emerald-600 transition"
                      >
                        {speakingMessageId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-amber-500 animate-spin" />
                            <span>إيقاف الصوت</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-slate-400" />
                            <span>استماع</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>المساعد الذكي يحلل طلبك الآن...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {attachedImage && (
            <div className="p-2 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img src={attachedImage} alt="المستند المرفق" className="w-8 h-8 rounded-lg object-cover" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">تم إرفاق صورة مستند/روشتة</span>
              </div>
              <button
                onClick={() => setAttachedImage(null)}
                className="text-red-500 hover:text-red-600 font-bold text-xs"
              >
                إلغاء
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                title="إرفاق صورة تقرير أو روشتة"
              >
                <ImageIcon className="w-4 h-4" />
              </button>

              <button
                onClick={toggleListening}
                className={`p-2.5 rounded-xl transition ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                }`}
                title={isListening ? "إيقاف التسجيل الصوتي" : "تحدث صوتياً"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={isListening ? "جاري الاستماع لصوتك..." : "اكتب استفسارك أو اطلب توجيهاً إدارياً..."}
                className="flex-1 py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 border border-transparent focus:border-emerald-500 focus:outline-hidden transition"
              />

              <button
                onClick={handleSendMessage}
                disabled={isLoading || (!inputText.trim() && !attachedImage)}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white shadow-md shadow-emerald-600/20 transition"
                title="إرسال"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
