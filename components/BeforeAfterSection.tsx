"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Clock, MessageCircle } from "lucide-react";
import { CaseStudyItem } from "@/types/database";
import { initialCaseStudies } from "@/lib/data-store";

export default function BeforeAfterSection() {
  const [caseFiles, setCaseFiles] = useState<CaseStudyItem[]>(initialCaseStudies);
  const [activeCaseId, setActiveCaseId] = useState<string>(initialCaseStudies[0].id);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [viewMode, setViewMode] = useState<"slider" | "before" | "after">("slider");

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setCaseFiles(data.data);
          if (!data.data.some((c: CaseStudyItem) => c.id === activeCaseId)) {
            setActiveCaseId(data.data[0].id);
          }
        }
      })
      .catch(() => {});
  }, [activeCaseId]);

  const currentCase =
    caseFiles.find((c) => c.id === activeCaseId) || caseFiles[0] || initialCaseStudies[0];


  return (
    <section id="portfolio" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EBE5DB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
              <span>DOKUMENTASI REKAM MEDIS &amp; INSPEKSI</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Catatan Kasus Sebelum &amp; Sesudah
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Dokumentasi nyata hasil penanganan meja bedah atelier. Geser garis inspeksi untuk melihat detail transformasi fisik.
          </p>
        </div>

        {/* Case File Selector Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {caseFiles.map((study) => {
            const isSelected = study.id === activeCaseId;
            return (
              <button
                key={study.id}
                onClick={() => {
                  setActiveCaseId(study.id);
                  setSliderPos(50);
                }}
                className={`px-4 py-2.5 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs font-mono text-xs transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#211E1C] text-white shadow-xs font-bold"
                    : "bg-[#FFFFFF] text-[#5C554E] border border-[#DDD5C7] hover:border-[#211E1C]"
                }`}
              >
                <span>{study.caseNo} — {study.title}</span>
              </button>
            );
          })}
        </div>

        {/* Inspection Case Dossier Card */}
        <div className="bg-[#FFFFFF] border-2 border-[#DDD5C7] rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-6 sm:p-8 shadow-[0_4px_24px_rgba(33,30,28,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Interactive Inspection Comparison Lens (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              
              {/* Lens Controls */}
              <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 bg-[#FAF4EB] p-1 rounded-sm border border-[#DDD5C7]">
                  <button
                    onClick={() => setViewMode("slider")}
                    className={`px-3 py-1 rounded-xs font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                      viewMode === "slider"
                        ? "bg-[#211E1C] text-white"
                        : "text-[#5C554E] hover:text-[#211E1C]"
                    }`}
                  >
                    Geser Inspeksi
                  </button>
                  <button
                    onClick={() => setViewMode("before")}
                    className={`px-3 py-1 rounded-xs font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                      viewMode === "before"
                        ? "bg-[#D96B52] text-white"
                        : "text-[#5C554E] hover:text-[#211E1C]"
                    }`}
                  >
                    Kondisi Awal
                  </button>
                  <button
                    onClick={() => setViewMode("after")}
                    className={`px-3 py-1 rounded-xs font-mono text-[11px] font-medium transition-colors cursor-pointer ${
                      viewMode === "after"
                        ? "bg-[#4A6B5D] text-white"
                        : "text-[#5C554E] hover:text-[#211E1C]"
                    }`}
                  >
                    Hasil Sembuh
                  </button>
                </div>

                <span className="font-mono text-xs text-[#7A7269] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D96B52]" />
                  {currentCase.duration}
                </span>
              </div>

              {/* Image Frame with Stamped Labels */}
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs overflow-hidden select-none bg-[#F7F3EB] border border-[#E0D8CC]">
                {viewMode === "before" && (
                  <div className="relative w-full h-full">
                    <Image
                      src={currentCase.beforeImg}
                      alt={`Kondisi sebelum: ${currentCase.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-center filter brightness-95"
                    />
                    <div className="absolute top-3 left-3 bg-[#D96B52] text-white px-3 py-1 rounded-xs font-mono text-[10px] tracking-wider uppercase shadow-xs">
                      [ KONDISI AWAL PASIEN ]
                    </div>
                  </div>
                )}

                {viewMode === "after" && (
                  <div className="relative w-full h-full animate-in fade-in duration-200">
                    <Image
                      src={currentCase.afterImg}
                      alt={`Kondisi setelah: ${currentCase.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover object-center"
                    />
                    <div className="absolute top-3 right-3 bg-[#4A6B5D] text-white px-3 py-1 rounded-xs font-mono text-[10px] tracking-wider uppercase shadow-xs">
                      [ RESTORASI SELESAI &amp; PULIH ]
                    </div>
                  </div>
                )}

                {viewMode === "slider" && (
                  <div className="relative w-full h-full group touch-none">
                    {/* After Image Layer */}
                    <div className="absolute inset-0">
                      <Image
                        src={currentCase.afterImg}
                        alt={`Setelah restorasi: ${currentCase.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover object-center"
                      />
                      <div className="absolute top-3 right-3 bg-[#4A6B5D] text-white px-2.5 py-1 rounded-xs font-mono text-[9px] tracking-wider font-bold shadow-xs">
                        SESUDAH
                      </div>
                    </div>

                    {/* Before Image Layer (Clipped) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPos}%` }}
                    >
                      <div className="relative w-full h-full" style={{ width: "100%", height: "100%" }}>
                        <Image
                          src={currentCase.beforeImg}
                          alt={`Sebelum restorasi: ${currentCase.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover object-center filter brightness-90 max-w-none"
                          style={{ width: "100%", minWidth: "100%" }}
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-[#D96B52] text-white px-2.5 py-1 rounded-xs font-mono text-[9px] tracking-wider font-bold shadow-xs">
                        SEBELUM
                      </div>
                    </div>

                    {/* Minimalist Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)] pointer-events-none"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#211E1C] text-white border-2 border-white flex items-center justify-center font-mono text-[10px] shadow-sm">
                        ↔
                      </div>
                    </div>

                    {/* Native Range Slider Touch Interactivity */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderPos}
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                      aria-label="Geser untuk perbandingan sebelum dan sesudah"
                    />
                  </div>
                )}
              </div>

              {viewMode === "slider" && (
                <span className="font-mono text-[11px] text-[#7A7269] mt-2 block text-center">
                  ← Geser titik tengah untuk memeriksa kualitas jahitan &amp; volume →
                </span>
              )}

            </div>

            {/* Right Column: Case Diagnosis & Story (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold text-[#D96B52]">
                    {currentCase.caseNo}
                  </span>
                  <span className="text-[#7A7269]">•</span>
                  <span className="font-mono text-xs text-[#7A7269]">
                    {currentCase.vintage}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#211E1C] leading-tight mb-2">
                  {currentCase.title}
                </h3>
                <p className="font-mono text-xs text-[#7A7269]">
                  Pemilik: {currentCase.owner} ({currentCase.location})
                </p>
              </div>

              {/* Diagnosis vs Restoration Notes */}
              <div className="space-y-3 font-mono text-xs">
                {/* Sebelum */}
                <div className="p-3.5 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#FAF4EB] border border-[#E8DEC8]">
                  <span className="text-[#D96B52] font-bold block mb-1 uppercase tracking-wider">
                    [ DIAGNOSA AWAL ]:
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#5C554E] leading-relaxed">
                    {currentCase.beforeDiagnosis}
                  </p>
                </div>

                {/* Sesudah */}
                <div className="p-3.5 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#E3ECE7]/60 border border-[#CBD8D1]">
                  <span className="text-[#4A6B5D] font-bold block mb-1 uppercase tracking-wider">
                    [ TINDAKAN RESTORASI ]:
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#211E1C] leading-relaxed">
                    {currentCase.afterRestoration}
                  </p>
                </div>
              </div>

              {/* Owner Quote */}
              <div className="pt-2 border-t border-dashed border-[#DDD5C7]">
                <span className="font-mono text-[10px] text-[#7A7269] uppercase tracking-widest block mb-1">
                  CATATAN PEMILIK SETELAH UNBOXING:
                </span>
                <p className="font-serif italic text-xs sm:text-sm text-[#211E1C] leading-relaxed">
                  &ldquo;{currentCase.ownerNote}&rdquo;
                </p>
              </div>

              {/* WhatsApp consultation CTA */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/6281252530629?text=${encodeURIComponent(
                    `Halo Atelier Klinik Boneka Malang, saya memiliki kasus serupa seperti "${currentCase.title}"...`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Konsultasikan Kasus Serupa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
