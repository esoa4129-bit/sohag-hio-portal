"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Star,
  ExternalLink,
  Copy,
  CheckCircle2,
  ShieldAlert,
  Plus,
  Edit2,
  Trash2,
  Smartphone,
  Moon,
  Sun,
  Layers,
  Building2,
  ClipboardList,
  Activity,
  Package,
  Users,
  MessageSquare,
  Clock,
  X,
  HelpCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Server,
  Award,
  RefreshCw,
  Wifi,
  WifiOff,
  Radio,
  CalendarCheck,
  Calendar
} from "lucide-react";

// Types
export type ConnectionType = "HTTPS" | "HTTP" | "HTTPS_IP" | "HTTP_IP" | "PORT";

export type ServerHealth = "online" | "offline" | "intranet" | "checking" | "unknown";

export interface SystemItem {
  id: string;
  name: string;
  url: string;
  category: "committees" | "specialties" | "admin_stock" | "beneficiary_internal" | "communication" | "custom";
  description: string;
  connectionType: ConnectionType;
  editable?: boolean;
  isCustom?: boolean;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// 23 Official Systems
const INITIAL_SYSTEMS: SystemItem[] = [
  // القسم الأول: اللجان الطبية والمجالس المتخصصة
  {
    id: "psycho",
    name: "منظومة اللجان النفسية (Psycho)",
    url: "https://196.219.219.187/Psycho/login.aspx",
    category: "committees",
    description: "بوابة فحص وتقارير اللجان النفسية بالتأمين الصحي",
    connectionType: "HTTPS_IP",
  },
  {
    id: "committee-gen",
    name: "لجان التأمين الصحي العامة",
    url: "https://srv488.hiocdis.org/committee/login.aspx",
    category: "committees",
    description: "نظام تسجيل ومتابعة اللجان الطبية العامة",
    connectionType: "HTTPS",
  },
  {
    id: "physical",
    name: "منظومة الفحص الطبي الشامل",
    url: "https://196.219.219.184/physical/",
    category: "committees",
    description: "منظومة كشوفات اللياقة والفحص الطبي الشامل للموظفين والمنتفعين",
    connectionType: "HTTPS_IP",
  },
  {
    id: "rpd-councils",
    name: "المجالس الطبية المتخصصة (RPD)",
    url: "https://rpd.smcegy.com/login.aspx?ReturnUrl=%2f",
    category: "committees",
    description: "بوابة قرارات العلاج على نفقة الدولة واللجان المتخصصة",
    connectionType: "HTTPS",
  },
  {
    id: "sma-councils",
    name: "منظومة المجالس الطبية (SMA)",
    url: "http://sma.smcegy.com/sma",
    category: "committees",
    description: "المنظومة الإلكترونية للتقارير الطبية والمجالس",
    connectionType: "HTTP",
  },
  {
    id: "hajj",
    name: "منظومة الكشف الطبي للحج",
    url: "https://hajj-egy.mohp.gov.eg/login.aspx",
    category: "committees",
    description: "بوابة وزارة الصحة لتسجيل الكشف الطبي لحجاج بيت الله الحرام",
    connectionType: "HTTPS",
  },

  // القسم الثاني: عيادات التخصصات والمبادرات الرئاسية
  {
    id: "oncology",
    name: "منظومة علاج الأورام (Oncology)",
    url: "http://81.21.104.211/oncology",
    category: "specialties",
    description: "متابعة وصرف بروتوكولات علاج الأورام والجرعات",
    connectionType: "HTTP_IP",
  },
  {
    id: "diabetic",
    name: "منظومة علاج السكر (Diabetic)",
    url: "https://196.219.219.187/diabitic/presentation/Login.aspx",
    category: "specialties",
    description: "بروتوكولات متابعة وصرف أدوية عيادات السكر المتخصصة",
    connectionType: "HTTPS_IP",
  },
  {
    id: "growth-hormone",
    name: "منظومة هرمون النمو (Growth Hormone)",
    url: "http://196.219.52.208/growthhormone/login.aspx",
    category: "specialties",
    description: "تسجيل لجان وبروتوكولات صرف هرمون النمو للأطفال",
    connectionType: "HTTP_IP",
  },
  {
    id: "anaemia-initiative",
    name: "مبادرة فحص الأنيميا للطلاب 2024",
    url: "https://anaemia.hio.gov.eg:4460/hiostudent2024/Default.aspx",
    category: "specialties",
    description: "تسجيل نتائج فحص الأنيميا والتقزم والسمنة لطلاب المدارس",
    connectionType: "PORT",
    editable: true,
  },
  {
    id: "anaemia-lab",
    name: "معامل فحص الطلاب والأنيميا",
    url: "https://anaemia.hio.gov.eg:4460/labStrident/",
    category: "specialties",
    description: "منظومة إدخال نتائج التحاليل المعملية لمبادرات الطلاب",
    connectionType: "PORT",
    editable: true,
  },

  // القسم الثالث: المخازن، الشراء الموحد، والأنظمة الإدارية والمالية
  {
    id: "stock-ip",
    name: "منظومة المخازن الرئيسية (السيرفر المباشر)",
    url: "http://196.219.52.208/STOCK/",
    category: "admin_stock",
    description: "حركة الأدوية والمستلزمات الطبية وأرصدة المخازن الرئيسية",
    connectionType: "HTTP_IP",
  },
  {
    id: "stock-domain",
    name: "منظومة مخازن التأمين الصحي العامة",
    url: "https://srv32.hiocdis.org/stock/",
    category: "admin_stock",
    description: "إدارة المخزون والتوريدات والصرف على الدومين المركزي",
    connectionType: "HTTPS",
  },
  {
    id: "sc-upa",
    name: "منظومة الشراء الموحد (UPA)",
    url: "https://sc.upa.gov.eg/",
    category: "admin_stock",
    description: "بوابة هيئة الشراء الموحد والتموين الطبي وإدارة الاحتياجات",
    connectionType: "HTTPS",
  },
  {
    id: "hio-admin",
    name: "لوحة تحكم إدارة التأمين الصحي (Admin)",
    url: "https://196.219.219.187/HIO/admin/Login.aspx",
    category: "admin_stock",
    description: "بوابة الإدارة المركزية والتحكم في صلاحيات المستخدمين",
    connectionType: "HTTPS_IP",
  },
  {
    id: "frm-finance",
    name: "المنظومة المالية والإدارية (FRM)",
    url: "http://41.33.64.54:86/index.aspx?ReturnUrl=%2fFRM",
    category: "admin_stock",
    description: "إدارة ومتابعة النماذج المالية والتحصيل والمطالبات",
    connectionType: "PORT",
  },

  // القسم الرابع: خدمات المنتفعين الداخلية والطلاب والسيرفرات
  {
    id: "reserv-main",
    name: "البوابة الرئيسية للاستعلام والحجز المركزي",
    url: "https://reserv.hiocdis.org/",
    category: "beneficiary_internal",
    description: "البوابة العامة للاستعلام ومتابعة منظومة الحجز",
    connectionType: "HTTPS",
  },
  {
    id: "reserv-ip",
    name: "سيرفر الحجز الداخلي المباشر",
    url: "http://196.219.52.230/reservation/",
    category: "beneficiary_internal",
    description: "السيرفر الداخلي لإدارة حجوزات العيادات والمراكز",
    connectionType: "HTTP_IP",
  },
  {
    id: "hiorequest",
    name: "منظومة طلبات المنتفعين (HioRequest)",
    url: "https://hioben.hiocdis.org/hiorequest/login.aspx",
    category: "beneficiary_internal",
    description: "إدارة ومتابعة طلبات وشكاوى المنتفعين والمواطنين",
    connectionType: "HTTPS",
  },
  {
    id: "hioben-ip",
    name: "بوابة المنتفعين الإدارية (السيرفر المباشر)",
    url: "https://196.219.219.187/hioben/",
    category: "beneficiary_internal",
    description: "استعلامات بيانات المستفيدين وصلاحية التغطية التأمينية",
    connectionType: "HTTPS_IP",
  },
  {
    id: "hiostudent",
    name: "منظومة التأمين الصحي للطلاب",
    url: "https://hioben.hiocdis.org/HioStudent/presentation/Login.aspx",
    category: "beneficiary_internal",
    description: "قاعدة بيانات وتغطية طلبة المدارس والمعاهد والجامعات",
    connectionType: "HTTPS",
  },
  {
    id: "serviceprovider",
    name: "بوابة مقدمي الخدمة الطبية",
    url: "https://serviceprovider.hiocdis.org/serviceprovider/",
    category: "beneficiary_internal",
    description: "بوابة المستشفيات والمراكز ومعامل التحاليل المتعاقدة",
    connectionType: "HTTPS",
  },

  // القسم الخامس: التواصل الإداري السريع
  {
    id: "whatsapp",
    name: "واتساب ويب للإدارة (WhatsApp Web)",
    url: "https://web.whatsapp.com",
    category: "communication",
    description: "أداة المراسلات والتواصل الفوري مع الأقسام وفرق العمل",
    connectionType: "HTTPS",
  },
];

const CATEGORIES = [
  { id: "all", label: "جميع المنظومات", icon: Layers },
  { id: "committees", label: "اللجان والمجالس الطبية", icon: ClipboardList },
  { id: "specialties", label: "التخصصات والمبادرات", icon: Activity },
  { id: "admin_stock", label: "المخازن والمالية والإدارة", icon: Package },
  { id: "beneficiary_internal", label: "خدمات المنتفعين والطلاب", icon: Users },
  { id: "communication", label: "التواصل الإداري", icon: MessageSquare },
];

export default function StaffPortalPage() {
  const [systems, setSystems] = useState<SystemItem[]>(INITIAL_SYSTEMS);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lastOpened, setLastOpened] = useState<{ id: string; name: string; time: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Health Status state: id -> { status, latency }
  const [healthMap, setHealthMap] = useState<Record<string, { status: ServerHealth; latency?: number }>>({});
  const [isCheckingAll, setIsCheckingAll] = useState(false);

  // PWA Prompt
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  // Security alert modal
  const [securityModalSystem, setSecurityModalSystem] = useState<SystemItem | null>(null);

  // Add Custom Link Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLinkName, setNewLinkName] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkDesc, setNewLinkDesc] = useState("");
  const [newLinkCategory, setNewLinkCategory] = useState<SystemItem["category"]>("admin_stock");

  // Edit Link Modal
  const [editingSystem, setEditingSystem] = useState<SystemItem | null>(null);
  const [editUrlValue, setEditUrlValue] = useState("");

  // Check single system health
  const checkSingleSystemHealth = useCallback(async (system: SystemItem) => {
    setHealthMap((prev) => ({
      ...prev,
      [system.id]: { status: "checking" },
    }));

    const isDirectIp =
      system.connectionType === "HTTP_IP" ||
      system.connectionType === "HTTPS_IP" ||
      system.connectionType === "PORT";

    try {
      // 1. Try server-side check API first
      const res = await fetch(`/api/check-status?url=${encodeURIComponent(system.url)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.online) {
          setHealthMap((prev) => ({
            ...prev,
            [system.id]: { status: "online", latency: data.latency },
          }));
          return;
        }
      }

      // 2. Client-side browser probe for internal IPs (if on user's health network)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      try {
        await fetch(system.url, {
          mode: "no-cors",
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId);
        // If fetch resolved (opaque response in no-cors), server is alive
        setHealthMap((prev) => ({
          ...prev,
          [system.id]: { status: "online" },
        }));
      } catch {
        // If it's a known internal IP server, label it as intranet-dependent
        if (isDirectIp) {
          setHealthMap((prev) => ({
            ...prev,
            [system.id]: { status: "intranet" },
          }));
        } else {
          setHealthMap((prev) => ({
            ...prev,
            [system.id]: { status: "offline" },
          }));
        }
      }
    } catch {
      setHealthMap((prev) => ({
        ...prev,
        [system.id]: { status: isDirectIp ? "intranet" : "offline" },
      }));
    }
  }, []);

  // Check all systems health
  const checkAllSystemsHealth = useCallback(async (targetList?: SystemItem[]) => {
    setIsCheckingAll(true);
    const list = targetList || systems;

    // Check in small batches of 4 to prevent network throttling
    for (let i = 0; i < list.length; i += 4) {
      const batch = list.slice(i, i + 4);
      await Promise.all(batch.map((sys) => checkSingleSystemHealth(sys)));
    }
    setIsCheckingAll(false);
  }, [systems, checkSingleSystemHealth]);

  // Load state from localStorage on client
  useEffect(() => {
    // Register Service Worker for PWA
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }

    // Check standalone mode (already installed)
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    ) {
      setIsStandalone(true);
    }

    // Theme
    const savedTheme = localStorage.getItem("sohag_hio_staff_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Favorites
    const savedFavs = localStorage.getItem("sohag_hio_staff_favs");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch {
        // ignore
      }
    }

    // Custom & Edited Systems
    const savedCustoms = localStorage.getItem("sohag_hio_staff_custom_systems");
    const editedMap = localStorage.getItem("sohag_hio_staff_edited_urls");

    let combined = [...INITIAL_SYSTEMS];
    if (editedMap) {
      try {
        const parsedMap: Record<string, string> = JSON.parse(editedMap);
        combined = combined.map((s) => (parsedMap[s.id] ? { ...s, url: parsedMap[s.id] } : s));
      } catch {
        // ignore
      }
    }

    if (savedCustoms) {
      try {
        const parsedCustoms: SystemItem[] = JSON.parse(savedCustoms);
        combined = [...combined, ...parsedCustoms];
      } catch {
        // ignore
      }
    }
    setSystems(combined);

    // Initial health check on load
    checkAllSystemsHealth(combined);

    // Last opened
    const savedLast = localStorage.getItem("sohag_hio_staff_last_opened");
    if (savedLast) {
      try {
        setLastOpened(JSON.parse(savedLast));
      } catch {
        // ignore
      }
    }

    // PWA event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  // Theme toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sohag_hio_staff_theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sohag_hio_staff_theme", "dark");
      setDarkMode(true);
    }
  };

  // Toggle favorite
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("sohag_hio_staff_favs", JSON.stringify(updated));
  };

  // Smart Window Launcher
  const launchSystem = (system: SystemItem) => {
    const now = new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
    const lastObj = { id: system.id, name: system.name, time: now };
    setLastOpened(lastObj);
    localStorage.setItem("sohag_hio_staff_last_opened", JSON.stringify(lastObj));

    // Check device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.open(system.url, "_blank");
    } else {
      const width = 1280;
      const height = 820;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      window.open(
        system.url,
        `HIO_${system.id}`,
        `width=${width},height=${height},top=${top},left=${left},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
      );
    }
  };

  // Copy link
  const copyLink = (system: SystemItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(system.url);
    setCopiedId(system.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Add custom link
  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkName || !newLinkUrl) return;

    let cleanUrl = newLinkUrl.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    const newItem: SystemItem = {
      id: "custom_" + Date.now(),
      name: newLinkName.trim(),
      url: cleanUrl,
      category: newLinkCategory,
      description: newLinkDesc.trim() || "رابط مخصص تمت إضافته يدوياً",
      connectionType: cleanUrl.startsWith("https://") ? "HTTPS" : "HTTP",
      isCustom: true,
      editable: true,
    };

    const updated = [...systems, newItem];
    setSystems(updated);

    const customItems = updated.filter((s) => s.isCustom);
    localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(customItems));

    setShowAddModal(false);
    setNewLinkName("");
    setNewLinkUrl("");
    setNewLinkDesc("");

    checkSingleSystemHealth(newItem);
  };

  // Delete custom link
  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("هل أنت متأكد من حذف هذا الرابط المخصص؟")) return;

    const updated = systems.filter((s) => s.id !== id);
    setSystems(updated);
    const customItems = updated.filter((s) => s.isCustom);
    localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(customItems));

    if (favorites.includes(id)) {
      const updatedFavs = favorites.filter((f) => f !== id);
      setFavorites(updatedFavs);
      localStorage.setItem("sohag_hio_staff_favs", JSON.stringify(updatedFavs));
    }
  };

  // Open Edit URL
  const handleOpenEdit = (system: SystemItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSystem(system);
    setEditUrlValue(system.url);
  };

  // Save Edited URL
  const handleSaveEditUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSystem || !editUrlValue) return;

    const cleanUrl = editUrlValue.trim();
    const updated = systems.map((s) => (s.id === editingSystem.id ? { ...s, url: cleanUrl } : s));
    setSystems(updated);

    if (editingSystem.isCustom) {
      const customItems = updated.filter((s) => s.isCustom);
      localStorage.setItem("sohag_hio_staff_custom_systems", JSON.stringify(customItems));
    } else {
      const editedMap: Record<string, string> = JSON.parse(
        localStorage.getItem("sohag_hio_staff_edited_urls") || "{}"
      );
      editedMap[editingSystem.id] = cleanUrl;
      localStorage.setItem("sohag_hio_staff_edited_urls", JSON.stringify(editedMap));
    }

    setEditingSystem(null);
    checkSingleSystemHealth({ ...editingSystem, url: cleanUrl });
  };

  // Reset System URL to Default
  const handleResetUrl = (id: string) => {
    const defaultObj = INITIAL_SYSTEMS.find((s) => s.id === id);
    if (!defaultObj) return;

    const updated = systems.map((s) => (s.id === id ? { ...s, url: defaultObj.url } : s));
    setSystems(updated);

    const editedMap: Record<string, string> = JSON.parse(
      localStorage.getItem("sohag_hio_staff_edited_urls") || "{}"
    );
    delete editedMap[id];
    localStorage.setItem("sohag_hio_staff_edited_urls", JSON.stringify(editedMap));
    setEditingSystem(null);
    checkSingleSystemHealth(defaultObj);
  };

  // Install PWA
  const handleInstallClick = async () => {
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream;
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setShowIosGuide(true);
    }
  };

  // Filter systems
  const filteredSystems = useMemo(() => {
    return systems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all"
          ? true
          : selectedCategory === "custom"
          ? item.isCustom
          : item.category === selectedCategory;

      const health = healthMap[item.id]?.status;
      const matchesOnlineFilter = filterOnlineOnly ? health === "online" : true;

      return matchesSearch && matchesCat && matchesOnlineFilter;
    });
  }, [systems, searchQuery, selectedCategory, filterOnlineOnly, healthMap]);

  const favoriteSystems = useMemo(() => {
    return systems.filter((item) => favorites.includes(item.id));
  }, [systems, favorites]);

  // Health summary counts
  const healthStats = useMemo(() => {
    let online = 0;
    let intranet = 0;
    let offline = 0;
    let checking = 0;

    systems.forEach((s) => {
      const st = healthMap[s.id]?.status;
      if (st === "online") online++;
      else if (st === "intranet") intranet++;
      else if (st === "offline") offline++;
      else checking++;
    });

    return { online, intranet, offline, checking, total: systems.length };
  }, [systems, healthMap]);

  // Render Health Status Indicator Badge
  const renderHealthIndicator = (system: SystemItem) => {
    const health = healthMap[system.id];
    const status = health?.status || "unknown";

    if (status === "checking") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping shrink-0" />
          <span>جارِ الفحص...</span>
        </span>
      );
    }

    if (status === "online") {
      return (
        <span
          title={`السيرفر يعمل بنشاط استجابة: ${health?.latency ? health.latency + "ms" : "سريع"}`}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-500" />
          <span>يعمل الآن</span>
          {health?.latency && <span className="opacity-75 font-mono text-[9px]">{health.latency}ms</span>}
        </span>
      );
    }

    if (status === "intranet") {
      return (
        <span
          title="سيرفر داخلي متاح عبر شبكة التأمين الصحي أو شبكة الوزارة"
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          <span>شبكة داخلية</span>
        </span>
      );
    }

    if (status === "offline") {
      return (
        <span
          title="السيرفر لا يستجيب في الفحص الأخير"
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <span>غير متاح مؤقتاً</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
        <span className="w-2 h-2 rounded-full bg-slate-400 shrink-0" />
        <span>لم يُفحص</span>
      </span>
    );
  };

  // Badge for connection type
  const renderConnectionBadge = (system: SystemItem) => {
    const isDirectIpOrHttp =
      system.connectionType === "HTTP_IP" ||
      system.connectionType === "HTTPS_IP" ||
      system.connectionType === "HTTP" ||
      system.connectionType === "PORT";

    if (!isDirectIpOrHttp) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40">
          HTTPS
        </span>
      );
    }

    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setSecurityModalSystem(system);
        }}
        title="اضغط لمعرفة إرشادات أمان هذا السيرفر"
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition"
      >
        <ShieldAlert className="w-3 h-3 text-amber-600" />
        <span>
          {system.connectionType === "HTTPS_IP"
            ? "IP مباشر"
            : system.connectionType === "PORT"
            ? "منفذ Port"
            : "HTTP"}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-slate-50 via-sky-50/20 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Official Badge Logo */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-white p-0.5 shadow-md shadow-sky-500/10 border-2 border-sky-500/30 shrink-0">
              <Image
                src="/logo.png"
                alt="شعار فرع سوهاج للتأمين الصحي"
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </div>

            <div className="min-w-0 truncate">
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xs sm:text-base md:text-lg text-slate-900 dark:text-white truncate leading-tight">
                  بوابة فرع سوهاج للتأمين الصحي
                </h1>
                <span className="hidden lg:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-sky-500/10 to-blue-500/10 text-sky-700 dark:text-sky-300 border border-sky-300/40 dark:border-sky-700/40">
                  لوحة الموظفين المركزية
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                منصة إطلاق ومتابعة السيرفرات والمنظومات الطبية والإدارية
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Link to Team Page */}
            <Link
              href="/team"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100/80 hover:from-amber-100 hover:to-amber-200/90 dark:from-amber-950/40 dark:to-amber-900/40 dark:hover:from-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300/60 dark:border-amber-700/50 text-xs sm:text-sm font-bold transition shadow-sm hover:shadow"
              title="فريق العمل والقيادات"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">فريق العمل والقيادات</span>
              <span className="sm:hidden">القيادات</span>
            </Link>

            {!isStandalone && (
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-sm shadow-sky-600/30 transition transform active:scale-95"
              >
                <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">📲 تثبيت البوابة</span>
                <span className="md:hidden">تثبيت</span>
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              title={darkMode ? "الوضع الفاتح" : "الوضع الليلي"}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              aria-label="تبديل المظهر"
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Live Health Overview Bar */}
        <div className="bg-slate-100/80 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800/60 py-1.5 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-0.5">
              <span className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1 shrink-0">
                <Radio className="w-3.5 h-3.5 text-sky-600" />
                حالة السيرفرات:
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>نشط: {healthStats.online}</span>
              </span>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 font-bold shrink-0">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>شبكة داخلية: {healthStats.intranet}</span>
              </span>

              {healthStats.offline > 0 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>غير متاح: {healthStats.offline}</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOnlineOnly(!filterOnlineOnly)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                  filterOnlineOnly
                    ? "bg-emerald-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                <Wifi className="w-3 h-3" />
                <span>{filterOnlineOnly ? "إلغاء فلتر النشط" : "النشطة فقط"}</span>
              </button>

              <button
                onClick={() => checkAllSystemsHealth()}
                disabled={isCheckingAll}
                className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-sm"
              >
                <RefreshCw className={`w-3 h-3 ${isCheckingAll ? "animate-spin" : ""}`} />
                <span>{isCheckingAll ? "جارِ الفحص..." : "فحص الكل"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 pb-2.5 sm:pb-3 pt-2 flex flex-col md:flex-row gap-2.5 sm:gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم المنظومة، الرابط، أو القسم..."
              className="w-full pr-10 pl-8 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs -mx-3 px-3 sm:mx-0 sm:px-0">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition shrink-0 ${
                    isActive
                      ? "bg-sky-600 text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 w-full flex-grow space-y-4 sm:space-y-6">
        {/* UNIFIED HERO BANNER: Clinic Booking Dedicated Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white p-5 sm:p-6 shadow-xl shadow-emerald-900/15 border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 text-center md:text-right">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
                <CalendarCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-300" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-300/40 text-[10px] sm:text-xs font-bold text-emerald-100">
                    خدمة المنتفعين والمواطنين
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>متاح ويعمل الآن</span>
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-extrabold tracking-tight">
                  بوابة حجز عيادات التأمين الصحي - فرع سوهاج
                </h2>
                <p className="text-xs text-emerald-100/90 leading-relaxed max-w-xl">
                  تطبيق إلكتروني مستقل مخصص للمواطنين لحجز مواعيد الكشف بالعيادات بالرقم القومي مع إمكانية التثبيت المباشر على الهاتف.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto shrink-0">
              <Link
                href="/booking"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <span>بوابة الحجز والمواعيد</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              </Link>
              <Link
                href="/booking#schedules-section"
                className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-teal-800/80 hover:bg-teal-700 border border-teal-400/40 text-white font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-200" />
                <span>جداول ومواعيد العيادات</span>
              </Link>
              <button
                onClick={() => {
                  window.open("https://reserv.hiocdis.org/hioClinicReservation.aspx", "_blank");
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-400/40 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>حجز سريع</span>
              </button>
            </div>
          </div>
        </section>

        {/* Last Opened Indicator */}
        {lastOpened && (
          <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-sky-900 dark:text-sky-200">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span>
                آخر منظومة تم تشغيلها: <strong>{lastOpened.name}</strong> (اليوم في الساعة {lastOpened.time})
              </span>
            </div>
            <button
              onClick={() => {
                const sys = systems.find((s) => s.id === lastOpened.id);
                if (sys) launchSystem(sys);
              }}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 self-end sm:self-auto"
            >
              إعادة الفتح الآن
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Pinned / Favorites Section */}
        {favoriteSystems.length > 0 && selectedCategory === "all" && !searchQuery && (
          <section className="space-y-3">
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              المنظومات المثبتة والمفضلة لديك ({favoriteSystems.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {favoriteSystems.map((system) => renderSystemCard(system, true))}
            </div>
          </section>
        )}

        {/* Systems Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              قائمة المنظومات والسيرفرات ({filteredSystems.length})
            </h2>

            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-sky-600 dark:text-sky-400 hover:underline"
              >
                عرض كافة الأقسام
              </button>
            )}
          </div>

          {filteredSystems.length === 0 ? (
            <div className="p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-slate-700 dark:text-slate-300 font-bold text-sm sm:text-base">
                لم يتم العثور على أي منظومة تطابق بحثك أو فلتر الحالة
              </p>
              <p className="text-xs text-slate-400">
                جرب تغيير خيارات الفلترة أو مسح شريط البحث
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFilterOnlineOnly(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-200"
              >
                إعادة ضبط البحث والفلاتر
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredSystems.map((system) => renderSystemCard(system, false))}
            </div>
          )}
        </section>
      </main>

      {/* Footer with Team Page Link */}
      <footer className="mt-8 sm:mt-12 border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-5 text-center text-xs text-slate-500 dark:text-slate-400 space-y-2">
        <p className="font-semibold text-slate-700 dark:text-slate-300">
          الهيئة العامة للتأمين الصحي - فرع سوهاج
        </p>
        <div className="flex items-center justify-center gap-3 text-[11px]">
          <span>صحتك أمانة بين إيدينا</span>
          <span>•</span>
          <Link
            href="/team"
            className="text-sky-600 dark:text-sky-400 font-bold hover:underline inline-flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>لوحة الشرف وفريق العمل والقيادات</span>
          </Link>
        </div>
      </footer>

      {/* MODAL 1: Security Alert / SSL Self-Signed Guide */}
      {securityModalSystem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm sm:text-base">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                <span>إرشادات شهادة الأمان والسيرفر الداخلي</span>
              </div>
              <button
                onClick={() => setSecurityModalSystem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                المنظومة: {securityModalSystem.name}
              </p>
              <p className="text-slate-500 dark:text-slate-400 break-all font-mono text-[11px]">
                {securityModalSystem.url}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                هذا السيرفر يعمل باتصال مباشر عبر IP حكومي أو شهادة أمان ذاتية (Self-Signed SSL).
              </p>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 space-y-2">
                <p className="font-bold text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
                  إذا ظهرت لك شاشة تحذير باللون الأحمر في المتصفح لأول مرة:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300 text-xs">
                  <li>
                    اضغط على زر <strong>خيارات متقدمة (Advanced)</strong> أسفل الشاشة.
                  </li>
                  <li>
                    اضغط على <strong>متابعة إلى الرابط (Proceed / Continue)</strong>.
                  </li>
                  <li>
                    سيتم فتح شاشة الدخول للسيرفر مباشرة دون مشاكل في المرات القادمة.
                  </li>
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const sys = securityModalSystem;
                  setSecurityModalSystem(null);
                  launchSystem(sys);
                }}
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
              >
                فتح المنظومة الآن
              </button>
              <button
                onClick={() => setSecurityModalSystem(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm hover:bg-slate-200 transition min-h-[44px]"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Custom System */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <form
            onSubmit={handleAddCustomLink}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-sky-600" />
                إضافة رابط أو سيرفر جديد
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  اسم المنظومة أو السيرفر *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: منظومة الرعايات المركزة"
                  value={newLinkName}
                  onChange={(e) => setNewLinkName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  رابط الموقع أو الـ IP *
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://... أو http://196..."
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  القسم التابع له
                </label>
                <select
                  value={newLinkCategory}
                  onChange={(e) => setNewLinkCategory(e.target.value as SystemItem["category"])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white text-xs"
                >
                  <option value="committees">اللجان والمجالس الطبية</option>
                  <option value="specialties">التخصصات والمبادرات</option>
                  <option value="admin_stock">المخازن والمالية والإدارة</option>
                  <option value="beneficiary_internal">خدمات المنتفعين والطلاب</option>
                  <option value="communication">التواصل الإداري</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  وصف مختصر للمنظومة
                </label>
                <input
                  type="text"
                  placeholder="مثال: تسجيل تحويلات العنايات المركزة"
                  value={newLinkDesc}
                  onChange={(e) => setNewLinkDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
              >
                حفظ الرابط
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium hover:bg-slate-200 transition min-h-[44px]"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 3: Edit System URL */}
      {editingSystem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <form
            onSubmit={handleSaveEditUrl}
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-sky-600" />
                تعديل رابط المنظومة
              </h3>
              <button
                type="button"
                onClick={() => setEditingSystem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <p className="font-bold text-slate-800 dark:text-slate-200">
                {editingSystem.name}
              </p>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  الرابط الجديد
                </label>
                <input
                  type="text"
                  required
                  value={editUrlValue}
                  onChange={(e) => setEditUrlValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
              >
                حفظ التعديل
              </button>

              {!editingSystem.isCustom && (
                <button
                  type="button"
                  onClick={() => handleResetUrl(editingSystem.id)}
                  title="استعادة الرابط الأصلي الافتراضي"
                  className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={() => setEditingSystem(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium hover:bg-slate-200 transition min-h-[44px]"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: Install PWA Guide */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-sky-600" />
                تثبيت البوابة كتطبيق على جهازك
              </h4>
              <button
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  💻 على جهاز الكمبيوتر (Chrome / Edge):
                </p>
                <p className="text-[11px] sm:text-xs">
                  اضغط على أيقونة التثبيت <strong>(⊕ أو Install App)</strong> الموجودة في شريط عنوان المتصفح بالأعلى، أو من قائمة خيارات المتصفح (⋮).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  📱 على هواتف الآيفون (iOS Safari):
                </p>
                <ol className="space-y-1 list-decimal list-inside text-[11px] sm:text-xs">
                  <li>اضغط على زر المشاركة (Share) أسفل المتصفح.</li>
                  <li>اختر إضافة إلى الشاشة الرئيسية (Add to Home Screen).</li>
                  <li>اضغط إضافة (Add).</li>
                </ol>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-100">
                  🤖 على هواتف الأندرويد (Android Chrome):
                </p>
                <ol className="space-y-1 list-decimal list-inside text-[11px] sm:text-xs">
                  <li>اضغط على القائمة (ثلاث نقاط ⋮) بالأعلى.</li>
                  <li>اختر تثبيت التطبيق أو إضافة للشاشة الرئيسية.</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition min-h-[44px]"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Helper to render each card
  function renderSystemCard(system: SystemItem, isFavSection: boolean) {
    const isFav = favorites.includes(system.id);
    const isCopied = copiedId === system.id;
    const isChecking = healthMap[system.id]?.status === "checking";

    return (
      <div
        key={(isFavSection ? "fav_" : "") + system.id}
        onClick={() => launchSystem(system)}
        className="group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-slate-200/90 dark:border-slate-800/90 hover:border-sky-500/60 dark:hover:border-sky-500/60 shadow-sm hover:shadow-xl hover:shadow-sky-500/10 dark:hover:shadow-sky-500/5 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
      >
        <div className="space-y-2.5 sm:space-y-3">
          {/* Card Top: Status & Connection Badges */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {renderHealthIndicator(system)}
              {renderConnectionBadge(system)}
              {system.isCustom && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
                  مخصص
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {/* Single Check Refresh Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  checkSingleSystemHealth(system);
                }}
                title="إعادة فحص اتصال هذا السيرفر"
                className="p-1.5 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? "animate-spin text-sky-600" : ""}`} />
              </button>

              {system.editable && (
                <button
                  onClick={(e) => handleOpenEdit(system, e)}
                  title="تعديل الرابط"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-800 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}

              {system.isCustom && (
                <button
                  onClick={(e) => handleDeleteCustom(system.id, e)}
                  title="حذف هذا الرابط المخصص"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={(e) => toggleFavorite(system.id, e)}
                title={isFav ? "إزالة من المفضلة" : "تثبيت في المفضلة"}
                className={`p-1.5 rounded-xl transition ${
                  isFav
                    ? "text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/40"
                    : "text-slate-300 dark:text-slate-600 hover:text-amber-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <Star className={`w-4 h-4 ${isFav ? "fill-amber-500" : ""}`} />
              </button>
            </div>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm md:text-base group-hover:text-sky-600 dark:group-hover:text-sky-400 transition leading-snug">
              {system.name}
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
              {system.description}
            </p>
          </div>
        </div>

        {/* Card Bottom: URL snippet & Actions */}
        <div className="mt-3.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 dark:text-slate-500 truncate max-w-[130px] sm:max-w-[170px]" dir="ltr">
            {system.url.replace(/^https?:\/\//, "")}
          </span>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => copyLink(system, e)}
              title="نسخ الرابط"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
            >
              {isCopied ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                launchSystem(system);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-[11px] sm:text-xs transition shadow-sm shadow-sky-500/20 active:scale-95"
            >
              <span>دخول</span>
              <ExternalLink className="w-3 h-3 opacity-90" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
