"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ProcedureItem,
  CaseStudyItem,
  PricingPlanItem,
  WorkshopSettings,
} from "@/types/database";
import {
  Save,
  Plus,
  Trash2,
  Lock,
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Upload,
  Loader2,
} from "lucide-react";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "procedures" | "cases" | "pricing" | "settings" | "mysql" | "sql"
  >("procedures");

  const [procedures, setProcedures] = useState<ProcedureItem[]>([]);
  const [cases, setCases] = useState<CaseStudyItem[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlanItem[]>([]);
  const [settings, setSettings] = useState<WorkshopSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  const handleUploadImage = async (
    file: File,
    caseIdx: number,
    field: "beforeImg" | "afterImg"
  ) => {
    const key = `${caseIdx}-${field}`;
    setUploadingKey(key);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        const updated = [...cases];
        updated[caseIdx][field] = data.url;
        setCases(updated);
      } else {
        alert("Gagal mengunggah foto: " + (data.error || "Format tidak didukung"));
      }
    } catch {
      alert("Gagal mengunggah foto");
    } finally {
      setUploadingKey(null);
    }
  };

  // Simple PIN Verification (default: 1234)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234" || pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("PIN salah! (Gunakan default PIN: 1234)");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProc, resCases, resPricing, resSettings] = await Promise.all([
        fetch("/api/procedures"),
        fetch("/api/cases"),
        fetch("/api/pricing"),
        fetch("/api/settings"),
      ]);

      const [dataProc, dataCases, dataPricing, dataSettings] = await Promise.all([
        resProc.json(),
        resCases.json(),
        resPricing.json(),
        resSettings.json(),
      ]);

      if (dataProc.data) setProcedures(dataProc.data);
      if (dataCases.data) setCases(dataCases.data);
      if (dataPricing.data) setPricingPlans(dataPricing.data);
      if (dataSettings.data) setSettings(dataSettings.data);
    } catch {
      alert("Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProcedure = async (proc: ProcedureItem) => {
    setSaveStatus("Menyimpan...");
    try {
      const res = await fetch("/api/procedures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proc),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("Tersimpan!");
        setTimeout(() => setSaveStatus(null), 2500);
      }
    } catch {
      setSaveStatus("Gagal simpan");
    }
  };

  const handleDeleteProcedure = async (id: string) => {
    if (!confirm("Yakin ingin menghapus prosedur ini?")) return;
    try {
      await fetch(`/api/procedures?id=${id}`, { method: "DELETE" });
      setProcedures(procedures.filter((p) => p.id !== id));
    } catch {
      alert("Gagal hapus");
    }
  };

  const handleAddProcedure = () => {
    const newProc: ProcedureItem = {
      id: `proc-${Date.now()}`,
      code: `0${procedures.length + 1} / PROSEDUR BARU`,
      name: "Nama Prosedur Baru",
      category: "KATEGORI POLI",
      headline: "Penjelasan singkat dalam satu kalimat.",
      description: "Deskripsi lengkap tindakan restorasi.",
      materials: ["Bahan pilihan 1", "Bahan pilihan 2"],
      steps: ["Langkah 1", "Langkah 2"],
      timeframe: "1 – 2 Hari",
      priceEstimate: "Mulai Rp 30.000",
      waMessage: "Halo Atelier Klinik Boneka Malang, saya ingin konsultasi...",
      orderIndex: procedures.length + 1,
    };
    setProcedures([...procedures, newProc]);
  };

  const handleSaveCase = async (item: CaseStudyItem) => {
    setSaveStatus("Menyimpan...");
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("Tersimpan!");
        setTimeout(() => setSaveStatus(null), 2500);
      }
    } catch {
      setSaveStatus("Gagal simpan");
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm("Yakin ingin menghapus catatan kasus ini?")) return;
    try {
      await fetch(`/api/cases?id=${id}`, { method: "DELETE" });
      setCases(cases.filter((c) => c.id !== id));
    } catch {
      alert("Gagal hapus");
    }
  };

  const handleAddCase = () => {
    const newCase: CaseStudyItem = {
      id: `case-${Date.now()}`,
      caseNo: `ARSIP #KB-0${cases.length + 500}`,
      title: "Nama Pasien Boneka Baru",
      vintage: "Usia / Jenis Boneka",
      owner: "Nama Klien",
      location: "Malang",
      beforeDiagnosis: "Diagnosa kerusakan awal...",
      afterRestoration: "Hasil penanganan dan bahan yang diganti...",
      duration: "2 Hari Pengerjaan",
      ownerNote: "Kesan atau testimoni pemilik...",
      beforeImg:
        "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80",
      afterImg:
        "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80",
      orderIndex: cases.length + 1,
    };
    setCases([...cases, newCase]);
  };

  const handleSavePricing = async (plan: PricingPlanItem) => {
    setSaveStatus("Menyimpan...");
    try {
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plan),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("Tersimpan!");
        setTimeout(() => setSaveStatus(null), 2500);
      }
    } catch {
      setSaveStatus("Gagal simpan");
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaveStatus("Menyimpan...");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("Pengaturan Tersimpan!");
        setTimeout(() => setSaveStatus(null), 2500);
      }
    } catch {
      setSaveStatus("Gagal simpan");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#211E1C] text-white rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs flex items-center justify-center mx-auto mb-3 font-serif text-xl font-bold">
              K
            </div>
            <h1 className="font-serif text-xl font-bold text-[#211E1C]">
              Atelier Admin Panel
            </h1>
            <p className="font-mono text-xs text-[#7A7269] mt-1">
              Klinik Boneka Malang
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs text-[#7A7269] mb-1 uppercase tracking-wider">
                Masukkan PIN Admin:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Default PIN: 1234"
                  className="w-full px-3.5 py-2.5 rounded-sm border border-[#DDD5C7] bg-[#FAF4EB] text-[#211E1C] font-mono text-sm focus:outline-none focus:border-[#D96B52]"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-[#7A7269] absolute right-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-sm bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-dashed border-[#DDD5C7] text-center">
            <Link
              href="/"
              className="font-mono text-xs text-[#7A7269] hover:text-[#211E1C] inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#211E1C] font-sans pb-16">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-[#E0D8CC] sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-sm bg-[#FAF4EB] border border-[#DDD5C7] flex items-center justify-center text-[#211E1C] hover:bg-[#211E1C] hover:text-white transition-colors"
              title="Ke Website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-base sm:text-lg font-bold text-[#211E1C]">
                Admin Atelier — Klinik Boneka Malang
              </h1>
              <span className="font-mono text-[10px] text-[#4A6B5D] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
                Backend Active &amp; Ready
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="font-mono text-xs text-[#4A6B5D] font-bold bg-[#E3ECE7] px-2.5 py-1 rounded-xs">
                {saveStatus}
              </span>
            )}
            <button
              onClick={fetchData}
              className="p-2 rounded-xs border border-[#DDD5C7] hover:bg-[#FAF4EB] text-xs font-mono flex items-center gap-1"
              title="Refresh Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-xs bg-[#211E1C] text-white font-mono text-xs uppercase"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E0D8CC] mb-6">
          <button
            onClick={() => setActiveTab("procedures")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "procedures"
                ? "bg-[#D96B52] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            01. Poli &amp; Prosedur ({procedures.length})
          </button>
          <button
            onClick={() => setActiveTab("cases")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "cases"
                ? "bg-[#D96B52] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            02. Catatan Kasus ({cases.length})
          </button>
          <button
            onClick={() => setActiveTab("pricing")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "pricing"
                ? "bg-[#D96B52] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            03. Taksiran Biaya ({pricingPlans.length})
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#D96B52] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            04. Pengaturan Atelier &amp; WA
          </button>
          <button
            onClick={() => setActiveTab("mysql")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "mysql"
                ? "bg-[#211E1C] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            🐬 MySQL Hosting cPanel
          </button>
          <button
            onClick={() => setActiveTab("sql")}
            className={`px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs uppercase tracking-wider cursor-pointer ${
              activeTab === "sql"
                ? "bg-[#211E1C] text-white font-bold"
                : "bg-white border border-[#DDD5C7] text-[#5C554E] hover:border-[#211E1C]"
            }`}
          >
            ⚡ Supabase SQL Setup
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center font-mono text-xs text-[#7A7269]">
            Memuat data dari database...
          </div>
        )}

        {/* TAB 1: PROCEDURES */}
        {!loading && activeTab === "procedures" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A7269]">
                Kelola Poli Layanan &amp; Rekam Medis
              </span>
              <button
                onClick={handleAddProcedure}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#211E1C] text-white font-mono text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Prosedur</span>
              </button>
            </div>

            <div className="space-y-6">
              {procedures.map((proc, idx) => (
                <div
                  key={proc.id}
                  className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#DDD5C7]">
                    <span className="font-mono text-xs font-bold text-[#D96B52]">
                      Item #{idx + 1} ({proc.code})
                    </span>
                    <button
                      onClick={() => handleDeleteProcedure(proc.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#7A7269] block mb-1">Kode Poli:</label>
                      <input
                        type="text"
                        value={proc.code}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].code = e.target.value;
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Nama Poli:</label>
                      <input
                        type="text"
                        value={proc.name}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].name = e.target.value;
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Kategori:</label>
                      <input
                        type="text"
                        value={proc.category}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].category = e.target.value;
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Headline Kutipan:</label>
                    <input
                      type="text"
                      value={proc.headline}
                      onChange={(e) => {
                        const updated = [...procedures];
                        updated[idx].headline = e.target.value;
                        setProcedures(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Deskripsi Lengkap:</label>
                    <textarea
                      rows={3}
                      value={proc.description}
                      onChange={(e) => {
                        const updated = [...procedures];
                        updated[idx].description = e.target.value;
                        setProcedures(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#7A7269] block mb-1">
                        Material (Pisahkan dengan koma):
                      </label>
                      <textarea
                        rows={2}
                        value={proc.materials.join(", ")}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].materials = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">
                        Langkah Kerja (Pisahkan dengan koma):
                      </label>
                      <textarea
                        rows={2}
                        value={proc.steps.join(", ")}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].steps = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#7A7269] block mb-1">Estimasi Biaya:</label>
                      <input
                        type="text"
                        value={proc.priceEstimate}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].priceEstimate = e.target.value;
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Waktu Pengerjaan:</label>
                      <input
                        type="text"
                        value={proc.timeframe}
                        onChange={(e) => {
                          const updated = [...procedures];
                          updated[idx].timeframe = e.target.value;
                          setProcedures(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={() => handleSaveProcedure(proc)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Prosedur #{idx + 1}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CASE STUDIES */}
        {!loading && activeTab === "cases" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#7A7269]">
                Kelola Arsip Sebelum &amp; Sesudah
              </span>
              <button
                onClick={handleAddCase}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#211E1C] text-white font-mono text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Catatan Kasus</span>
              </button>
            </div>

            <div className="space-y-6">
              {cases.map((study, idx) => (
                <div
                  key={study.id}
                  className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-5 sm:p-6 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#DDD5C7]">
                    <span className="font-mono text-xs font-bold text-[#D96B52]">
                      {study.caseNo} — {study.title}
                    </span>
                    <button
                      onClick={() => handleDeleteCase(study.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-sm"
                      title="Hapus"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#7A7269] block mb-1">Nomor Arsip:</label>
                      <input
                        type="text"
                        value={study.caseNo}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].caseNo = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Nama Pasien Boneka:</label>
                      <input
                        type="text"
                        value={study.title}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].title = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Usia / Jenis:</label>
                      <input
                        type="text"
                        value={study.vintage}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].vintage = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#7A7269] block mb-1">Nama Pemilik:</label>
                      <input
                        type="text"
                        value={study.owner}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].owner = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Lokasi:</label>
                      <input
                        type="text"
                        value={study.location}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].location = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#7A7269] block mb-1">Durasi Pengerjaan:</label>
                      <input
                        type="text"
                        value={study.duration}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].duration = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div>
                      <label className="text-[#D96B52] font-bold block mb-1">
                        Diagnosa Kondisi Sebelum:
                      </label>
                      <textarea
                        rows={2}
                        value={study.beforeDiagnosis}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].beforeDiagnosis = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                    <div>
                      <label className="text-[#4A6B5D] font-bold block mb-1">
                        Tindakan Restorasi Sesudah:
                      </label>
                      <textarea
                        rows={2}
                        value={study.afterRestoration}
                        onChange={(e) => {
                          const updated = [...cases];
                          updated[idx].afterRestoration = e.target.value;
                          setCases(updated);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                      />
                    </div>
                  </div>

                  {/* Photo Upload from Gallery / Camera Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-dashed border-[#DDD5C7]">
                    
                    {/* Foto Sebelum */}
                    <div className="p-3.5 rounded-sm bg-[#FAF4EB] border border-[#DDD5C7] space-y-2.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <label className="text-[#D96B52] font-bold block uppercase tracking-wider">
                          📸 Foto Sebelum Operasi:
                        </label>
                        {uploadingKey === `${idx}-beforeImg` && (
                          <span className="text-[#D96B52] flex items-center gap-1 font-bold text-[10px]">
                            <Loader2 className="w-3 h-3 animate-spin" /> Mengunggah...
                          </span>
                        )}
                      </div>

                      {/* Live Thumbnail Preview */}
                      {study.beforeImg && (
                        <div className="relative w-full h-32 rounded border border-[#DDD5C7] overflow-hidden bg-white flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={study.beforeImg}
                            alt="Preview Sebelum"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* File Picker from Gallery */}
                      <div className="flex items-center gap-2">
                        <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xs bg-[#211E1C] hover:bg-[#D96B52] text-white cursor-pointer transition-colors text-[11px] uppercase font-bold">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih dari Galeri HP / PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadImage(file, idx, "beforeImg");
                            }}
                          />
                        </label>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#7A7269] block mb-0.5">
                          Atau masukkan URL Foto:
                        </span>
                        <input
                          type="text"
                          value={study.beforeImg}
                          placeholder="https://..."
                          onChange={(e) => {
                            const updated = [...cases];
                            updated[idx].beforeImg = e.target.value;
                            setCases(updated);
                          }}
                          className="w-full px-2 py-1 rounded-xs border border-[#DDD5C7] bg-white text-[11px]"
                        />
                      </div>
                    </div>

                    {/* Foto Sesudah */}
                    <div className="p-3.5 rounded-sm bg-[#E3ECE7]/50 border border-[#CBD8D1] space-y-2.5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <label className="text-[#4A6B5D] font-bold block uppercase tracking-wider">
                          ✨ Foto Setelah Sembuh:
                        </label>
                        {uploadingKey === `${idx}-afterImg` && (
                          <span className="text-[#4A6B5D] flex items-center gap-1 font-bold text-[10px]">
                            <Loader2 className="w-3 h-3 animate-spin" /> Mengunggah...
                          </span>
                        )}
                      </div>

                      {/* Live Thumbnail Preview */}
                      {study.afterImg && (
                        <div className="relative w-full h-32 rounded border border-[#CBD8D1] overflow-hidden bg-white flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={study.afterImg}
                            alt="Preview Sesudah"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* File Picker from Gallery */}
                      <div className="flex items-center gap-2">
                        <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xs bg-[#4A6B5D] hover:bg-[#385348] text-white cursor-pointer transition-colors text-[11px] uppercase font-bold">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih dari Galeri HP / PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleUploadImage(file, idx, "afterImg");
                            }}
                          />
                        </label>
                      </div>

                      <div>
                        <span className="text-[10px] text-[#7A7269] block mb-0.5">
                          Atau masukkan URL Foto:
                        </span>
                        <input
                          type="text"
                          value={study.afterImg}
                          placeholder="https://..."
                          onChange={(e) => {
                            const updated = [...cases];
                            updated[idx].afterImg = e.target.value;
                            setCases(updated);
                          }}
                          className="w-full px-2 py-1 rounded-xs border border-[#CBD8D1] bg-white text-[11px]"
                        />
                      </div>
                    </div>

                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Kesan / Catatan Pemilik:</label>
                    <textarea
                      rows={2}
                      value={study.ownerNote}
                      onChange={(e) => {
                        const updated = [...cases];
                        updated[idx].ownerNote = e.target.value;
                        setCases(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      onClick={() => handleSaveCase(study)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xs bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Kasus {study.caseNo}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRICING */}
        {!loading && activeTab === "pricing" && (
          <div className="space-y-6">
            <span className="font-mono text-xs text-[#7A7269] block">
              Kelola Paket &amp; Taksiran Biaya
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-5 space-y-3"
                >
                  <div className="pb-2 border-b border-dashed border-[#DDD5C7]">
                    <span className="font-mono text-xs font-bold text-[#D96B52]">
                      Paket #{idx + 1}
                    </span>
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Nama Paket:</label>
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => {
                        const updated = [...pricingPlans];
                        updated[idx].name = e.target.value;
                        setPricingPlans(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Harga:</label>
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => {
                        const updated = [...pricingPlans];
                        updated[idx].price = e.target.value;
                        setPricingPlans(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">Satuan / Keterangan:</label>
                    <input
                      type="text"
                      value={plan.unit}
                      onChange={(e) => {
                        const updated = [...pricingPlans];
                        updated[idx].unit = e.target.value;
                        setPricingPlans(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="font-mono text-xs">
                    <label className="text-[#7A7269] block mb-1">
                      Cakupan (Pisahkan koma):
                    </label>
                    <textarea
                      rows={3}
                      value={plan.scope.join(", ")}
                      onChange={(e) => {
                        const updated = [...pricingPlans];
                        updated[idx].scope = e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean);
                        setPricingPlans(updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleSavePricing(plan)}
                      className="w-full py-2 rounded-xs bg-[#211E1C] hover:bg-[#D96B52] text-white font-mono text-xs uppercase"
                    >
                      Simpan Paket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {!loading && activeTab === "settings" && settings && (
          <div className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 max-w-2xl">
            <h3 className="font-serif text-xl font-bold text-[#211E1C] mb-4">
              Pengaturan Kontak &amp; Lokasi Workshop
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[#7A7269] block mb-1">Nama Brand Atelier:</label>
                <input
                  type="text"
                  value={settings.brandName}
                  onChange={(e) =>
                    setSettings({ ...settings, brandName: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#7A7269] block mb-1">Nomor WhatsApp (format: 628...):</label>
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) =>
                      setSettings({ ...settings, whatsapp: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                  />
                </div>
                <div>
                  <label className="text-[#7A7269] block mb-1">Telepon Tampilan:</label>
                  <input
                    type="text"
                    value={settings.phone}
                    onChange={(e) =>
                      setSettings({ ...settings, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#7A7269] block mb-1">Alamat Workshop Lengkap:</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                />
              </div>

              <div>
                <label className="text-[#7A7269] block mb-1">Patokan Lokasi:</label>
                <input
                  type="text"
                  value={settings.addressNote}
                  onChange={(e) =>
                    setSettings({ ...settings, addressNote: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#7A7269] block mb-1">Jam Buka Hari Kerja:</label>
                  <input
                    type="text"
                    value={settings.hoursWeekday}
                    onChange={(e) =>
                      setSettings({ ...settings, hoursWeekday: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                  />
                </div>
                <div>
                  <label className="text-[#7A7269] block mb-1">Jam Buka Akhir Pekan:</label>
                  <input
                    type="text"
                    value={settings.hoursWeekend}
                    onChange={(e) =>
                      setSettings({ ...settings, hoursWeekend: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xs border border-[#DDD5C7] bg-[#FAF4EB]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xs bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase font-bold"
                >
                  Simpan Pengaturan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: MYSQL CPANEL SETUP GUIDE */}
        {activeTab === "mysql" && (
          <div className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#DDD5C7]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#211E1C]">
                  Koneksi Database Hosting cPanel Anda
                </h3>
                <p className="font-mono text-xs text-[#7A7269] mt-1">
                  Server: <strong>liege.id.rapidplex.com (202.155.137.34)</strong>
                </p>
              </div>

              <span className="px-3 py-1 rounded-sm bg-[#E3ECE7] text-[#4A6B5D] font-mono text-xs font-bold">
                MySQL Driver Ready
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-sm bg-[#FAF4EB] border border-[#DDD5C7] space-y-2">
                <span className="font-bold text-[#211E1C] block uppercase tracking-wider">
                  1. Format File .env.local untuk Hosting Anda:
                </span>
                <pre className="bg-white p-3 rounded border border-[#DDD5C7] text-[#211E1C] leading-relaxed">
{`MYSQL_HOST=202.155.137.34
MYSQL_PORT=3306
MYSQL_USER=username_cpanel_db
MYSQL_PASSWORD=password_cpanel_db
MYSQL_DATABASE=nama_cpanel_database`}
                </pre>
              </div>

              <div className="p-4 rounded-sm bg-white border border-[#DDD5C7] space-y-2">
                <span className="font-bold text-[#211E1C] block uppercase tracking-wider">
                  2. Langkah Setup di cPanel:
                </span>
                <ol className="list-decimal list-inside space-y-1.5 text-[#5C554E]">
                  <li>Masuk ke cPanel hosting Anda di <code>https://liege.id.rapidplex.com:2083</code></li>
                  <li>Buka menu <strong>MySQL Databases</strong> &gt; Buat database &amp; user baru &gt; hubungkan user dengan <em>ALL PRIVILEGES</em>.</li>
                  <li>Buka menu <strong>Remote MySQL</strong> &gt; tambahkan <code>%</code> agar Next.js diizinkan mengakses database dari luar.</li>
                  <li>Buka menu <strong>phpMyAdmin</strong> &gt; pilih database Anda &gt; menu <strong>Import</strong> &gt; pilih file <code>mysql/schema.sql</code> dari proyek ini.</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUPABASE SQL SETUP GUIDE */}
        {activeTab === "sql" && (
          <div className="bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#211E1C]">
                  Panduan Menghubungkan ke Supabase (Database Cloud Gratis)
                </h3>
                <p className="font-mono text-xs text-[#7A7269] mt-1">
                  File schema lengkap ada di folder <code>supabase/schema.sql</code>.
                </p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    "Lihat file supabase/schema.sql di direktori proyek"
                  );
                  setCopiedSql(true);
                  setTimeout(() => setCopiedSql(false), 2000);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#211E1C] text-white font-mono text-xs uppercase"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSql ? "Disalin!" : "Salin Schema SQL"}</span>
              </button>
            </div>

            <div className="font-mono text-xs space-y-3 bg-[#FAF4EB] p-4 rounded-sm border border-[#DDD5C7]">
              <p className="font-bold text-[#211E1C]">Langkah Aktivasi 2 Menit:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-[#5C554E]">
                <li>Buka <strong>supabase.com</strong> dan buat project gratis baru.</li>
                <li>Buka menu <strong>SQL Editor</strong> di dashboard Supabase.</li>
                <li>Copy isi file <code>supabase/schema.sql</code> dan klik <strong>Run</strong>.</li>
                <li>Buka <strong>Project Settings &gt; API</strong>, lalu copy <code>Project URL</code> dan <code>anon public API key</code>.</li>
                <li>
                  Buat file <code>.env.local</code> di folder proyek dengan format:
                  <pre className="bg-white p-2.5 rounded border border-[#DDD5C7] mt-1 text-[#211E1C]">
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`}
                  </pre>
                </li>
              </ol>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
