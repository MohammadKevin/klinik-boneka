"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ProcedureItem } from "@/types/database";
import { initialProcedures } from "@/lib/data-store";

export default function ServicesSection() {
  const [procedures, setProcedures] = useState<ProcedureItem[]>(initialProcedures);
  const [selectedCode, setSelectedCode] = useState<string>(initialProcedures[0].code);

  useEffect(() => {
    fetch("/api/procedures")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setProcedures(data.data);
          if (!data.data.some((p: ProcedureItem) => p.code === selectedCode)) {
            setSelectedCode(data.data[0].code);
          }
        }
      })
      .catch(() => {});
  }, [selectedCode]);

  const activeProcedure =
    procedures.find((p) => p.code === selectedCode) || procedures[0] || initialProcedures[0];


  return (
    <section id="layanan" className="py-16 md:py-24 bg-[#F7F4EE] border-b border-[#E8E2D8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Editorial Framing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>BUKU REKAM MEDIS &amp; KATALOG PROSEDUR</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Poli Layanan &amp; Penanganan Artisan
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Setiap tindakan dilakukan secara manual dengan standar restorasi tekstil kuratorial untuk menjaga keaslian kenangan Anda.
          </p>
        </div>

        {/* Dossier Style Layout: Left Index Tabs + Right Procedure Sheet */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Procedure Index Cards (4 cols) */}
          <div className="lg:col-span-4 space-y-2.5">
            <div className="font-mono text-[10px] text-[#7A7269] uppercase tracking-widest px-2 pb-1">
              DAFTAR TINDAKAN KLINIS:
            </div>

            {procedures.map((item) => {
              const isSelected = item.code === selectedCode;
              return (
                <button
                  key={item.code}
                  onClick={() => setSelectedCode(item.code)}
                  className={`w-full text-left p-4 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-[#FFFFFF] border-[#D96B52] shadow-sm ring-1 ring-[#D96B52]/20 translate-x-1"
                      : "bg-[#FBF9F5] border-[#E0D8CC] hover:bg-white hover:border-[#D6CBB8]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold text-[#D96B52] tracking-wider">
                      {item.code}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs bg-[#EBE5DB] text-[#5C554E]">
                      {item.timeframe}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[#211E1C] leading-snug">
                    {item.name}
                  </h3>
                </button>
              );
            })}

            {/* Reassurance Callout Box */}
            <div className="p-4 mt-4 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-[#E3ECE7]/70 border border-[#CBD8D1] text-xs text-[#3E5C4E] space-y-1.5">
              <div className="font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GARANSI INTEGRITAS KAIN</span>
              </div>
              <p className="leading-relaxed">
                Kami mempertahankan sebanyak mungkin kain asli tanpa memaksakan penggantian jika tidak diperlukan.
              </p>
            </div>
          </div>

          {/* Right: Active Detailed Medical Dossier Sheet (8 cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md p-6 sm:p-8 shadow-[0_4px_20px_rgba(33,30,28,0.03)] relative">
            
            {/* Dossier Header Stamp */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-dashed border-[#DDD5C7] mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-[#D96B52] font-bold uppercase block mb-1">
                  DOKUMEN PROSEDUR • {activeProcedure.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#211E1C]">
                  {activeProcedure.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-[#7A7269] block">Estimasi Biaya:</span>
                <span className="font-serif text-lg font-bold text-[#D96B52]">
                  {activeProcedure.priceEstimate}
                </span>
              </div>
            </div>

            {/* Headline Note */}
            <p className="font-serif italic text-base sm:text-lg text-[#211E1C] leading-relaxed mb-4">
              &ldquo;{activeProcedure.headline}&rdquo;
            </p>

            {/* Description */}
            <p className="text-sm text-[#5C554E] leading-relaxed mb-6 font-normal">
              {activeProcedure.description}
            </p>

            {/* 2-Column Specs: Materials & Procedures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 border-t border-[#EBE5DB] mb-8">
              
              {/* Material Quality */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] font-bold text-[#211E1C] uppercase tracking-wider block">
                  🔬 Material &amp; Bahan Pilihan:
                </span>
                <ul className="space-y-2 text-xs text-[#5C554E]">
                  {activeProcedure.materials.map((mat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#D96B52] font-bold mt-0.5">•</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Protocol Steps */}
              <div className="space-y-3">
                <span className="font-mono text-[11px] font-bold text-[#211E1C] uppercase tracking-wider block">
                  📋 Alur Pengerjaan Di Meja:
                </span>
                <ul className="space-y-2 text-xs text-[#5C554E]">
                  {activeProcedure.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-[10px] text-[#4A6B5D] font-bold mt-0.5">
                        0{i + 1}.
                      </span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Footer Action of Dossier */}
            <div className="pt-4 border-t border-dashed border-[#DDD5C7] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-xs text-[#7A7269]">
                <span>Waktu Pengerjaan:</span>
                <span className="text-[#211E1C] font-semibold">{activeProcedure.timeframe}</span>
              </div>

              <a
                href={`https://wa.me/6281252530629?text=${encodeURIComponent(
                  activeProcedure.waMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#211E1C] hover:bg-[#D96B52] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>Konsultasikan Prosedur Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
