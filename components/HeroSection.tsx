"use client";

import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const waLink =
    "https://wa.me/6281252530629?text=Halo%20Klinik%20Boneka%20Malang,%20saya%20mau%20konsultasi%20reparasi%20boneka...";

  const polaroidPatients = [
    {
      name: "Teddy 1994",
      treatment: "Jahit leher & 250g dacron",
      img: "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=300&q=80",
      tapeColor: "bg-[#F0E6D2]",
      rotate: "-rotate-2",
    },
    {
      name: "Dumbo Gajah",
      treatment: "Rekonstruksi telinga simetris",
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=300&q=80",
      tapeColor: "bg-[#E3ECE7]",
      rotate: "rotate-1",
    },
    {
      name: "Kelinci Miffy",
      treatment: "Deep spa organik bebas tungau",
      img: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=300&q=80",
      tapeColor: "bg-[#F7E5DE]",
      rotate: "-rotate-1",
    },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EBE5DB] overflow-hidden bg-paper-grain">
      
      {/* Background Subtle Sewing Chalk Lines */}
      <div className="absolute inset-0 bg-stitch-pattern pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Editorial & Story-Driven (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Garment Care / Admission Ticket Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#FAF4EB] border border-dashed border-[#D6CBB8] text-[#5C554E] font-mono text-[11px] tracking-wider uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>TIKET MASUK KLINIK • NO. REG: MLG-2026</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#211E1C] tracking-tight leading-[1.18] mb-5">
              Memberi nafas baru untuk{" "}
              <em className="italic font-normal text-[#D96B52] underline decoration-[#E8C5BC] decoration-wavy decoration-1 underline-offset-4">
                kawan kecil
              </em>{" "}
              penuh kenangan.
            </h1>

            {/* Subheadline with artisanal depth */}
            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed mb-8 max-w-xl font-normal">
              Atelier restorasi boneka &amp; plushie di Kedungkandang, Malang.
              Kami merawat boneka berharga Anda dengan teknik jahit tangan rahasia{" "}
              <span className="text-[#211E1C] font-medium underline decoration-stone-300 decoration-dotted">
                (invisible ladder stitch)
              </span>
              , pengisian silikon microfiber murni anti-gumpal, dan spa pembersihan botani non-kimia keras.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-[#D96B52] hover:bg-[#C2583F] text-white text-xs sm:text-sm font-mono tracking-wider uppercase transition-all shadow-sm hover:shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Konsultasi Rekam Medis WA</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-white border border-[#DDD5C7] text-[#211E1C] text-xs sm:text-sm font-medium hover:bg-[#FAF4EB] transition-colors"
              >
                <span>Buka Arsip Kasus Pasien</span>
              </a>
            </div>

            {/* Mini Polaroids Trust Gallery */}
            <div className="w-full pt-6 border-t border-dashed border-[#DDD5C7]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-[#7A7269] uppercase tracking-widest">
                  PASIEN RESTORASI TERAKHIR DI WORKSHOP:
                </span>
                <span className="text-[11px] font-mono text-[#4A6B5D] font-medium">
                  ✓ 100% PULIH SEHAT
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {polaroidPatients.map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-2 sm:p-2.5 border border-[#E0D8CC] rounded-sm shadow-[0_2px_8px_rgba(33,30,28,0.04)] ${item.rotate} hover:rotate-0 transition-transform duration-200`}
                  >
                    {/* Tape Sticker Accent */}
                    <div className="relative">
                      <div className="w-8 h-2.5 bg-[#EBE5DB]/90 mx-auto -mt-3 mb-1 border-x border-dashed border-stone-400/30 rotate-2" />
                      <div className="relative h-20 sm:h-24 w-full overflow-hidden rounded-xs bg-[#F4EFE6]">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          sizes="150px"
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                    <div className="mt-1.5 text-center">
                      <p className="font-serif text-xs font-bold text-[#211E1C] leading-tight">
                        {item.name}
                      </p>
                      <p className="text-[9px] sm:text-[10px] font-mono text-[#7A7269] truncate">
                        {item.treatment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Doctor's Consultation Table / Meja Bedah Boneka (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            
            {/* Measuring Tape & Tailor Grid Texture Card */}
            <div className="relative bg-[#FFFFFF] border-2 border-[#DDD5C7] rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-5 sm:p-6 shadow-[0_8px_30px_rgba(33,30,28,0.06)]">
              
              {/* Doctor Consultation Table Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-dashed border-[#DDD5C7] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E3ECE7] text-[#4A6B5D] flex items-center justify-center font-mono text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#7A7269] uppercase tracking-widest block">
                      STATUS PASIEN AKTIF
                    </span>
                    <span className="font-serif text-sm font-bold text-[#211E1C]">
                      Rekam Medis #KB-0492
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-sm bg-[#E3ECE7] text-[#4A6B5D] font-mono text-[10px] tracking-wider font-bold">
                  SIAP PULANG
                </span>
              </div>

              {/* Main Restored Plushie Portrait */}
              <div className="relative h-64 sm:h-72 w-full rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs overflow-hidden bg-[#F7F3EB] border border-[#E8E2D8]">
                <Image
                  src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=80"
                  alt="Restored Classic Teddy Bear in Atelier"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center"
                />

                {/* Hand-stamped Label Tag Overlay */}
                <div className="absolute top-3 left-3 bg-[#FAF4EB]/95 backdrop-blur-xs border border-[#D6CBB8] px-3 py-1 rounded-xs shadow-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#211E1C] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
                    SILIKON MIKROFIBER 100%
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#211E1C]/90 backdrop-blur-xs text-[#FAF4EB] px-3 py-1 rounded-xs shadow-xs">
                  <span className="font-mono text-[10px] tracking-wider">
                    JAHITAN RAHASIA RAPI
                  </span>
                </div>
              </div>

              {/* Clinical Metadata Table */}
              <div className="mt-4 pt-3.5 border-t border-[#EBE5DB] space-y-2 font-mono text-xs text-[#5C554E]">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-[#7A7269]">Nama Pasien:</span>
                  <span className="font-serif font-bold text-[#211E1C]">Teddy Vintage (1998)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-[#7A7269]">Diagnosa Kasus:</span>
                  <span className="text-[#D96B52] font-medium">Robek Leher &amp; Kempis Total</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-[#7A7269]">Tindakan Bedah:</span>
                  <span className="text-[#211E1C]">Rekonstruksi Sendi + 280g Silikon</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#7A7269]">Garansi Jahitan:</span>
                  <span className="text-[#4A6B5D] font-bold">14 Hari Bebas Robek</span>
                </div>
              </div>

              {/* Workshop Local Stamp */}
              <div className="mt-4 pt-3 border-t border-dashed border-[#DDD5C7] flex items-center justify-between text-[11px] text-[#7A7269]">
                <span className="font-mono">📍 KEDUNGKANDANG, MALANG</span>
                <span className="font-mono font-medium text-[#211E1C]">PENGIRIMAN SE-INDONESIA</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
