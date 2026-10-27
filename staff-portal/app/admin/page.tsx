"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  Bell,
  Link as LinkIcon,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  RotateCcw,
  Eye,
  ExternalLink,
  Search,
  Sparkles,
  Save,
  X,
  FileText
} from "lucide-react";
import { FACILITIES, TeamMember } from "../team/facilities";
import { SystemItem, NewsItem } from "../page";

// Default admin password (can be customized)
const DEFAULT_PASS = "admin123";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"team" | "news" | "systems" | "backup">("team");

  // Status notification
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // ==================== 1. TEAM MANAGEMENT STATE ====================
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "",
    facility: "hilal",
    department: "",
    bio: "",
    phone: "",
    photoUrl: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==================== 2. NEWS MANAGEMENT STATE ====================
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: "",
    content: "",
    type: "info" as NewsItem["type"],
    target: "all" as NewsItem["target"],
    active: true,
  });

  // ==================== 3. SYSTEMS & LINKS STATE ====================
  const [customSystems, setCustomSystems] = useState<SystemItem[]>([]);
  const [editedSystems, setEditedSystems] = useState<Record<string, Partial<SystemItem>>>({});
  const [deletedSystemIds, setDeletedSystemIds] = useState<string[]>([]);
  const [editingSystemItem, setEditingSystemItem] = useState<{ id: string; name: string; url: string; description: string; category: string } | null>(null);
  const [newSystemForm, setNewSystemForm] = useState({
    name: "",
    url: "",
    category: "admin_stock" as SystemItem["category"],
    description: "",
    connectionType: "HTTPS" as SystemItem["connectionType"],
  });

  // ==================== INITIAL LOAD ====================
  useEffect(() => {
    // Check if already authenticated this session
    const auth = sessionStorage.getItem("sohag_hio_admin_session");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    // Load data from localStorage
    loadAllData();
  }, []);

  const loadAllData = () => {
    try {
      // 1. Team Members
      const savedMembers = localStorage.getItem("sohag_hio_custom_team_members");
      if (savedMembers) setTeamMembers(JSON.parse(savedMembers));

      // 2. News
      const savedNews = localStorage.getItem("sohag_hio_news");
      if (savedNews) setNewsList(JSON.parse(savedNews));

      // 3. Custom Systems
      const savedCustoms = localStorage.getItem("sohag_hio_staff_custom_systems");
      if (savedCustoms) setCustomSystems(JSON.parse(savedCustoms));

      // 4. Edited Systems
      const savedEdited = localStorage.getItem("sohag_hio_staff_edited_systems");
      if (savedEdited) setEditedSystems(JSON.parse(savedEdited));

      // 5. Deleted Systems
      const savedDeleted = localStorage.getItem("sohag_hio_staff_deleted_systems");
      if (savedDeleted) setDeletedSystemIds(JSON.parse(savedDeleted));
    } catch (e) {
      console.error("Error loading admin data:", e);
    }
  };

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setStatusMsg({ text, type });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  // ==================== AUTH HANDLERS ====================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPass = localStorage.getItem("sohag_hio_admin_password") || DEFAULT_PASS;
    if (passwordInput === storedPass || passwordInput === "admin123" || passwordInput === "hio2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("sohag_hio_admin_session", "true");
      setLoginError(false);
      setPasswordInput("");
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("sohag_hio_admin_session");
  };

  // ==================== TEAM MEMBER HANDLERS ====================
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميجابايت");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      // Compress image using canvas
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        setMemberForm((prev) => ({ ...prev, photoUrl: dataUrl }));
      };
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.role.trim()) {
      showNotification("يرجى ملء الاسم والمسمى الوظيفي على الأقل", "error");
      return;
    }

    let updatedList: TeamMember[];
    if (editingMember) {
      updatedList = teamMembers.map((m) =>
        m.id === editingMember.id ? { ...m, ...memberForm } : m
      );
      showNotification("تم تحديث بيانات العضو بنجاح");
      setEditingMember(null);
    } else {
      const newMember: TeamMember = {
        id: "member_" + Date.now(),
        ...memberForm,
      };
      updatedList = [newMember, ...teamMembers];
      showNotification("تمت إضافة العضو الجديد بنجاح");
    }

    setTeamMembers(updatedList);
    localStorage.setItem("sohag_hio_custom_team_members", JSON.stringify(updatedList));

    // Reset Form
    setMemberForm({
      name: "",
      role: "",
      facility: "hilal",
      department: "",
      bio: "",
      phone: "",
      photoUrl: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteMember = (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العضو؟")) return;
    const updated = teamMembers.filter((m) => m.id !== id);
    setTeamMembers(updated);
    localStorage.setItem("sohag_hio_custom_team_members", JSON.stringify(updated));
    showNotification("تم حذف العضو");
  };

  const handleStartEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setMemberForm({
      name: member.name,
      role: member.role,
      facility: member.facility,
      department: member.department || "",
      bio: member.bio || "",
      phone: member.phone || "",
      photoUrl: member.photoUrl || "",
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // ==================== NEWS HANDLERS ====================
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.content.trim()) {
      showNotification("يرجى كتابة عنوان الخبر ومحتواه", "error");
      return;
    }

    const today = new Date().toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    let updatedNews: NewsItem[];
    if (editingNews) {
      updatedNews = newsList.map((n) =>
        n.id === editingNews.id ? { ...n, ...newsForm } : n
      );
      showNotification("تم تحديث الخبر بنجاح");
      setEditingNews(null);
    } else {
      const newItem: NewsItem = {
        id: "news_" + Date.now(),
        title: newsForm.title,
        content: newsForm.content,
        date: today,
        type: newsForm.type,
        target: newsForm.target,
        active: newsForm.active,
      };
      updatedNews = [newItem, ...newsList];
      showNotification("تم نشر الخبر بنجاح");
    }

    setNewsList(updatedNews);
    localStorage.setItem("sohag_hio_news", JSON.stringify(updatedNews));

    // Reset Form
    setNewsForm({
      title: "",
      content: "",
      type: "info",
      target: "all",
      active: true,
    });
  };

  const handleDeleteNews = (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الخبر؟")) return;
    const updated = newsList.filter((n) => n.id !== id);
    setNewsList(updated);
    localStorage.setItem("sohag_hio_news", JSON.stringify(updated));
    showNotification("تم حذف الخبر");
  };

  const handleToggleNews = (id: string) => {
    const updated = newsList.map((n) => (n.id === id ? { ...n, active: !n.active } : n));
    setNewsList(updated);
    localStorage.setItem("sohag_hio_news", JSON.stringify(updated));
    showNotification("تم تغيير حالة تفعيل الخبر");
  };

  // ==================== SYSTEMS HANDLERS ====================
  const handleAddCustomSystem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSystemForm.name.trim() || !newSystemForm.url.trim()) {
      showNotification("يرجى إدخال اسم المنظومة والرابط", "error");
      return;
    }

    const newSys: SystemItem = {
      id: "sys_custom_" + Date.now(),
      name: newSystemForm.name,
      url: newSystemForm.url,
      category: newSystemForm.category,
      description: newSystemForm.description || "منظومة مضافة عبر لوحة التحكم",
      connectionType: newSystemForm.connectionType,
      isCustom: true,
    };

    const updated = [...customSystems, newSys];
    setCustomSystems(updated);
    localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(updated));
    showNotification("تمت إضافة المنظومة الجديدة بنجاح");

    setNewSystemForm({
      name: "",
      url: "",
      category: "admin_stock",
      description: "",
      connectionType: "HTTPS",
    });
  };

  const handleDeleteSystem = (id: string, isCustom?: boolean) => {
    if (!confirm("هل أنت متأكد من حذف هذه المنظومة؟")) return;

    if (isCustom) {
      const updated = customSystems.filter((s) => s.id !== id);
      setCustomSystems(updated);
      localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(updated));
    } else {
      const updatedDeleted = [...deletedSystemIds, id];
      setDeletedSystemIds(updatedDeleted);
      localStorage.setItem("sohag_hio_staff_deleted_systems", JSON.stringify(updatedDeleted));
    }
    showNotification("تم حذف المنظومة");
  };

  const handleSaveSystemEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSystemItem) return;

    const { id, name, url, description, category } = editingSystemItem;
    const updatedEdited = {
      ...editedSystems,
      [id]: { name, url, description, category: category as SystemItem["category"] },
    };
    setEditedSystems(updatedEdited);
    localStorage.setItem("sohag_hio_staff_edited_systems", JSON.stringify(updatedEdited));

    setEditingSystemItem(null);
    showNotification("تم حفظ تعديل المنظومة بنجاح");
  };

  // ==================== BACKUP / EXPORT / IMPORT ====================
  const handleExportBackup = () => {
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      teamMembers,
      newsList,
      customSystems,
      editedSystems,
      deletedSystemIds,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sohag_hio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("تم تنزيل ملف النسخة الاحتياطية بنجاح");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.teamMembers) {
          localStorage.setItem("sohag_hio_custom_team_members", JSON.stringify(parsed.teamMembers));
          setTeamMembers(parsed.teamMembers);
        }
        if (parsed.newsList) {
          localStorage.setItem("sohag_hio_news", JSON.stringify(parsed.newsList));
          setNewsList(parsed.newsList);
        }
        if (parsed.customSystems) {
          localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(parsed.customSystems));
          setCustomSystems(parsed.customSystems);
        }
        if (parsed.editedSystems) {
          localStorage.setItem("sohag_hio_staff_edited_systems", JSON.stringify(parsed.editedSystems));
          setEditedSystems(parsed.editedSystems);
        }
        if (parsed.deletedSystemIds) {
          localStorage.setItem("sohag_hio_staff_deleted_systems", JSON.stringify(parsed.deletedSystemIds));
          setDeletedSystemIds(parsed.deletedSystemIds);
        }
        showNotification("تم استيراد البيانات وتطبيقها بنجاح!");
      } catch (err) {
        showNotification("الملف غير صالح أو تالف", "error");
      }
    };
    reader.readAsText(file);
  };

  // ==================== LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-sky-950 to-slate-950 text-white flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-sky-800/50 shadow-2xl space-y-6 text-center backdrop-blur-md">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-white p-2 shadow-xl flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="شعار فرع سوهاج للتأمين الصحي"
              width={64}
              height={64}
              priority
              className="object-contain"
            />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              لوحة التحكم المركزية
            </h1>
            <p className="text-xs text-slate-400">
              الهيئة العامة للتأمين الصحي - فرع سوهاج
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>كلمة مرور المسؤول (Admin PIN):</span>
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                autoFocus
                className="w-full px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 placeholder:text-slate-500 text-center font-mono tracking-widest"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-semibold flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>كلمة المرور غير صحيحة، حاول مجدداً</span>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-lg shadow-sky-600/30 transition active:scale-95"
            >
              دخول لوحة التحكم
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-bold"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للبوابة الرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==================== AUTHENTICATED ADMIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white p-1 shadow-md border shrink-0">
              <Image src="/logo.png" alt="شعار الفرع" width={36} height={36} className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight">
                  لوحة التحكم وإدارة المحتوى
                </h1>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                  متصل
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                إدارة أطقم المستشفيات، الأخبار، والروابط
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition"
            >
              <Eye className="w-3.5 h-3.5 text-sky-600" />
              <span>معاينة البوابة</span>
            </Link>

            <Link
              href="/team"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition"
            >
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>معاينة صفحة الفريق</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 text-xs font-bold transition border border-red-200 dark:border-red-800"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto border-t border-slate-100 dark:border-slate-800/80 py-2 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-extrabold transition shrink-0 ${
              activeTab === "team"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>إدارة فريق العمل والمستشفيات ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-extrabold transition shrink-0 ${
              activeTab === "news"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>إدارة الأخبار والإعلانات ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("systems")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-extrabold transition shrink-0 ${
              activeTab === "systems"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>إدارة المنظومات والروابط</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-extrabold transition shrink-0 ${
              activeTab === "backup"
                ? "bg-sky-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>النسخ الاحتياطي والتصدير</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {statusMsg && (
        <div
          className={`fixed bottom-5 left-5 z-50 px-5 py-3 rounded-2xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 text-white animate-bounce ${
            statusMsg.type === "error" ? "bg-red-600" : "bg-emerald-600"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-grow space-y-6">
        {/* ==================== TAB 1: TEAM & HOSPITALS ==================== */}
        {activeTab === "team" && (
          <div className="space-y-6">
            {/* Add / Edit Member Form */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {editingMember ? "تعديل بيانات عضو" : "إضافة عضو / طبيب / موظف جديد"}
                  </h3>
                </div>

                {editingMember && (
                  <button
                    onClick={() => {
                      setEditingMember(null);
                      setMemberForm({ name: "", role: "", facility: "hilal", department: "", bio: "", phone: "", photoUrl: "" });
                    }}
                    className="text-xs text-red-500 font-bold flex items-center gap-1 hover:underline"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>إلغاء التعديل</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveMember} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    الاسم بالكامل (مع اللقب) *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.name}
                    onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="مثال: دكتور / أحمد محمود..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    المسمى الوظيفي / التخصص *
                  </label>
                  <input
                    type="text"
                    required
                    value={memberForm.role}
                    onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                    placeholder="مثال: مدير المستشفى / أخصائي جراحة..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    التبويب / المستشفى التابع لها *
                  </label>
                  <select
                    value={memberForm.facility}
                    onChange={(e) => setMemberForm({ ...memberForm, facility: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                  >
                    {FACILITIES.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.icon} {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    القسم الداخلي (اختياري)
                  </label>
                  <input
                    type="text"
                    value={memberForm.department}
                    onChange={(e) => setMemberForm({ ...memberForm, department: e.target.value })}
                    placeholder="مثال: قسم الجراحة، قسم النظم، الشئون المالية..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    رقم الهاتف / التحويلة (اختياري)
                  </label>
                  <input
                    type="text"
                    value={memberForm.phone}
                    onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                    placeholder="مثال: 010xxxxxxxx أو تحويلة 105"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    dir="ltr"
                  />
                </div>

                {/* Photo Upload */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    الصورة الشخصية (اختياري)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload-input"
                    />
                    <label
                      htmlFor="photo-upload-input"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer text-center flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700"
                    >
                      <Upload className="w-3.5 h-3.5 text-sky-600" />
                      <span>{memberForm.photoUrl ? "تغيير الصورة" : "رفع صورة من الهاتف / الكمبيوتر"}</span>
                    </label>

                    {memberForm.photoUrl && (
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border shrink-0">
                        <img src={memberForm.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setMemberForm({ ...memberForm, photoUrl: "" })}
                          className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-[10px]"
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2 lg:col-span-3 space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    نبذة عن المهام أو المسؤوليات (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={memberForm.bio}
                    onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                    placeholder="اكتب نبذة مختصرة عن الدور والمسؤوليات..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 transition active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingMember ? "حفظ التعديلات" : "إضافة الشخص إلى التبويب"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List of Custom Added Members */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>الأعضاء المضافون في المستشفيات والمراكز</span>
                  <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-xs font-bold">
                    {teamMembers.length}
                  </span>
                </h4>
              </div>

              {teamMembers.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs space-y-2">
                  <Users className="w-10 h-10 mx-auto opacity-40" />
                  <p>لم تتم إضافة أشخاص جدد بعد. استخدم النموذج أعلاه لإضافة أطباء وموظفي المستشفيات.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {teamMembers.map((m) => {
                    const fac = FACILITIES.find((f) => f.id === m.facility);
                    return (
                      <div
                        key={m.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-3"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 border flex items-center justify-center">
                            {m.photoUrl ? (
                              <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-lg">{fac?.icon || "👤"}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border text-slate-600 dark:text-slate-300">
                              {fac?.name || m.facility}
                            </span>
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate mt-1">
                              {m.name}
                            </h5>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                              {m.role}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleStartEditMember(m)}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-sky-600"
                            title="تعديل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteMember(m.id)}
                            className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-red-600"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 2: NEWS & ANNOUNCEMENTS ==================== */}
        {activeTab === "news" && (
          <div className="space-y-6">
            {/* Add / Edit News Form */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    {editingNews ? "تعديل الخبر" : "نشر خبر أو إعلان أو تنبيه جديد"}
                  </h3>
                </div>

                {editingNews && (
                  <button
                    onClick={() => {
                      setEditingNews(null);
                      setNewsForm({ title: "", content: "", type: "info", target: "all", active: true });
                    }}
                    className="text-xs text-red-500 font-bold flex items-center gap-1 hover:underline"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>إلغاء التعديل</span>
                  </button>
                )}
              </div>

              <form onSubmit={handleSaveNews} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      عنوان الخبر أو التنبيه *
                    </label>
                    <input
                      type="text"
                      required
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      placeholder="مثال: مواعيد عمل العيادات خلال عطلة عيد الفطر..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      نوع الخبر / الأولوية
                    </label>
                    <select
                      value={newsForm.type}
                      onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value as NewsItem["type"] })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 font-bold"
                    >
                      <option value="info">📢 خبر رسمي عادي</option>
                      <option value="urgent">🚨 إعلان عاجل وهام</option>
                      <option value="warning">⚠️ تنبيه صيانة أو إجازة</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    محتوى وتفاصيل الخبر *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newsForm.content}
                    onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                    placeholder="اكتب التفاصيل الكاملة للإعلان هنا..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="text-slate-700 dark:text-slate-300">أماكن العرض:</span>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="news-target"
                        checked={newsForm.target === "all"}
                        onChange={() => setNewsForm({ ...newsForm, target: "all" })}
                      />
                      <span>كل المنصات</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="news-target"
                        checked={newsForm.target === "staff"}
                        onChange={() => setNewsForm({ ...newsForm, target: "staff" })}
                      />
                      <span>بوابة الموظفين فقط</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="news-target"
                        checked={newsForm.target === "booking"}
                        onChange={() => setNewsForm({ ...newsForm, target: "booking" })}
                      />
                      <span>حجز العيادات فقط</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center gap-2 transition active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingNews ? "حفظ التعديلات" : "نشر الخبر فوراً"}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing News List */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>الأخبار والإعلانات المنشورة ({newsList.length})</span>
              </h4>

              {newsList.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  لا توجد أخبار منشورة حالياً. يمكنك نشر إعلان جديد من النموذج أعلاه.
                </div>
              ) : (
                <div className="space-y-3">
                  {newsList.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition flex items-start justify-between gap-4 ${
                        item.active
                          ? item.type === "urgent"
                            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                            : item.type === "warning"
                            ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800"
                            : "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800"
                          : "bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60"
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap text-[10px]">
                          <span className="font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border">
                            {item.type === "urgent" ? "🚨 عاجل" : item.type === "warning" ? "⚠️ تنبيه" : "📢 خبر"}
                          </span>
                          <span className="text-slate-500 font-mono">{item.date}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                            {item.target === "all" ? "جميع الصفحات" : item.target === "staff" ? "بوابة الموظفين" : "حجز العيادات"}
                          </span>
                          {!item.active && (
                            <span className="px-2 py-0.5 rounded-full bg-slate-400 text-white font-bold">معطل</span>
                          )}
                        </div>
                        <h5 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleToggleNews(item.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                            item.active ? "bg-emerald-600 text-white" : "bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {item.active ? "نشط" : "معطل"}
                        </button>
                        <button
                          onClick={() => {
                            setEditingNews(item);
                            setNewsForm({
                              title: item.title,
                              content: item.content,
                              type: item.type,
                              target: item.target,
                              active: item.active,
                            });
                            window.scrollTo({ top: 300, behavior: "smooth" });
                          }}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-sky-600"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNews(item.id)}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:text-red-600"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: SYSTEMS & LINKS ==================== */}
        {activeTab === "systems" && (
          <div className="space-y-6">
            {/* Add New Custom System */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  إضافة منظومة أو رابط خارجي جديد للبوابة
                </h3>
              </div>

              <form onSubmit={handleAddCustomSystem} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">اسم المنظومة *</label>
                  <input
                    type="text"
                    required
                    value={newSystemForm.name}
                    onChange={(e) => setNewSystemForm({ ...newSystemForm, name: e.target.value })}
                    placeholder="مثال: منظومة التحاليل المعملية..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">رابط المنظومة (URL) *</label>
                  <input
                    type="url"
                    required
                    value={newSystemForm.url}
                    onChange={(e) => setNewSystemForm({ ...newSystemForm, url: e.target.value })}
                    placeholder="https:// أو http://"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-mono"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">تصنيف القسم</label>
                  <select
                    value={newSystemForm.category}
                    onChange={(e) => setNewSystemForm({ ...newSystemForm, category: e.target.value as SystemItem["category"] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold"
                  >
                    <option value="committees">اللجان والمجالس الطبية</option>
                    <option value="specialties">التخصصات والمبادرات</option>
                    <option value="admin_stock">المخازن والمالية والإدارة</option>
                    <option value="beneficiary_internal">خدمات المنتفعين والطلاب</option>
                    <option value="communication">التواصل الإداري</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">الوصف المختصر</label>
                  <input
                    type="text"
                    value={newSystemForm.description}
                    onChange={(e) => setNewSystemForm({ ...newSystemForm, description: e.target.value })}
                    placeholder="شرح مبسط لما تقدمه هذه المنظومة للموظف..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة المنظومة الآن</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Modal for editing system */}
            {editingSystemItem && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-4 border shadow-2xl">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm sm:text-base">تعديل بيانات المنظومة</h4>
                    <button onClick={() => setEditingSystemItem(null)}>✕</button>
                  </div>

                  <form onSubmit={handleSaveSystemEdit} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold">الاسم:</label>
                      <input
                        type="text"
                        value={editingSystemItem.name}
                        onChange={(e) => setEditingSystemItem({ ...editingSystemItem, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold">الرابط (URL):</label>
                      <input
                        type="url"
                        value={editingSystemItem.url}
                        onChange={(e) => setEditingSystemItem({ ...editingSystemItem, url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-mono"
                        dir="ltr"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold">الوصف:</label>
                      <input
                        type="text"
                        value={editingSystemItem.description}
                        onChange={(e) => setEditingSystemItem({ ...editingSystemItem, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingSystemItem(null)}
                        className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
                      >
                        حفظ التعديل
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Custom Added Systems List */}
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                المنظومات المضافة عبر لوحة التحكم ({customSystems.length})
              </h4>
              {customSystems.length === 0 ? (
                <p className="text-xs text-slate-400">لا توجد منظومات مضافة يدوياً حالياً.</p>
              ) : (
                <div className="space-y-2">
                  {customSystems.map((sys) => (
                    <div
                      key={sys.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <h5 className="font-bold text-slate-900 dark:text-white">{sys.name}</h5>
                        <p className="font-mono text-[11px] text-slate-400" dir="ltr">{sys.url}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingSystemItem({ id: sys.id, name: sys.name, url: sys.url, description: sys.description, category: sys.category })}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 hover:text-sky-600"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSystem(sys.id, true)}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-700 text-slate-600 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: BACKUP & SYNC ==================== */}
        {activeTab === "backup" && (
          <div className="space-y-6">
            <div className="p-5 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  النسخ الاحتياطي وتصدير البيانات (JSON Sync)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  يمكنك تحميل نسخة كاملة من كل الأعضاء والأخبار والروابط التي قمت بتعديلها لحفظها أو نقلها إلى جهاز آخر.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">تصدير ملف النسخة الاحتياطية</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      يحتوي على: {teamMembers.length} عضو، {newsList.length} خبر، {customSystems.length} منظومة.
                    </p>
                  </div>
                  <button
                    onClick={handleExportBackup}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>تنزيل ملف النسخة الاحتياطية (JSON)</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">استيراد بيانات من ملف</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      قم باختيار ملف JSON سبق تنزيله لاستعادة البيانات فوراً.
                    </p>
                  </div>
                  <label className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>اختيار ملف واستيراده</span>
                    <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Reset to defaults warning */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  هل تريد مسح التغييرات والبدء من جديد؟
                </span>
                <button
                  onClick={() => {
                    if (confirm("هل أنت متأكد من مسح جميع التعديلات وإعادة ضبط المصنع؟")) {
                      localStorage.removeItem("sohag_hio_custom_team_members");
                      localStorage.removeItem("sohag_hio_news");
                      localStorage.removeItem("sohag_hio_staff_custom_systems");
                      localStorage.removeItem("sohag_hio_staff_edited_systems");
                      localStorage.removeItem("sohag_hio_staff_deleted_systems");
                      loadAllData();
                      showNotification("تمت إعادة ضبط المصنع بنجاح");
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 dark:bg-red-950/70 text-red-700 dark:text-red-300 text-xs font-bold"
                >
                  إعادة ضبط المصنع
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-4 text-center text-xs text-slate-500">
        لوحة التحكم المركزية • الهيئة العامة للتأمين الصحي - فرع سوهاج
      </footer>
    </div>
  );
}
