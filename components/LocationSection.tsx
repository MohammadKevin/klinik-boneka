"use client";

import {
  MessageCircle,
  ExternalLink,
  Navigation,
} from "lucide-react";

export default function LocationSection() {
  const gmapsUrl =
    "https://maps.google.com/?q=Jl.+Raya+Lapangan+Kedungkandang+No.+260,+Kedungkandang,+Kota+Malang";
  const waUrl =
    "https://wa.me/6281252530629?text=Halo%20Atelier%20Klinik%20Boneka%20Malang,%20saya%20berencana%20mengantar%20boneka%20ke%20Kedungkandang...";

  return (
    <section id="lokasi" className="py-16 md:py-24 bg-[#FBF9F5] border-b border-[#EBE5DB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>ATELIER FISIK &amp; JAM KUNJUNGAN</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Workshop Kedungkandang, Malang
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Anda bisa datang langsung membawa boneka untuk konsultasi tatap muka, atau mengirimkan lewat kurir instan/ekspedisi.
          </p>
        </div>

        {/* 2-Card Layout (Workshop Info + Map) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Workshop Physical Details (5 cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border-2 border-[#DDD5C7] rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div className="space-y-6">
              
              <div className="pb-3.5 border-b border-dashed border-[#EBE5DB]">
                <span className="font-mono text-[10px] text-[#4A6B5D] font-bold uppercase tracking-wider block mb-1">
                  ✓ WORKSHOP TERVERIFIKASI
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#211E1C]">
                  Studio Klinik Boneka Malang
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-1 font-mono text-xs text-[#5C554E]">
                <span className="font-bold text-[#211E1C] block text-sm font-serif">
                  Alamat Lengkap:
                </span>
                <p className="font-sans text-sm text-[#211E1C] font-semibold">
                  Jl. Raya Lapangan Kedungkandang No. 260
                </p>
                <p className="font-sans text-xs text-[#5C554E]">
                  Kedungkandang, Kota Malang, Jawa Timur
                </p>
                <div className="mt-2 p-2.5 rounded-xs bg-[#FAF4EB] border border-[#E8DEC8] text-[11px] font-mono text-[#7A7269]">
                  📍 <strong>Patokan:</strong> Tepat di area Lapangan Kedungkandang, sebelah timur KUA Kedungkandang, Malang.
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-1 font-mono text-xs text-[#5C554E]">
                <span className="font-bold text-[#211E1C] block text-sm font-serif">
                  Jam Kerja Studio:
                </span>
                <p className="font-sans text-sm text-[#211E1C]">
                  <strong>Senin – Sabtu:</strong> 08.00 – 17.00 WIB
                </p>
                <p className="font-sans text-xs text-[#D96B52]">
                  <strong>Minggu / Tanggal Merah:</strong> Libur (Konsultasi WhatsApp tetap dilayani)
                </p>
              </div>

              {/* Local Courier Badge */}
              <div className="p-3 rounded-xs bg-[#E3ECE7]/60 border border-[#CBD8D1] font-mono text-xs text-[#3E5C4E] space-y-1">
                <span className="font-bold block uppercase tracking-wider">
                  🛵 Pengantaran Malang Raya:
                </span>
                <p className="font-sans text-xs leading-relaxed">
                  Bisa antar-jemput via Gojek / Grab / Maxim untuk seluruh area Malang Kota &amp; Kabupaten.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="pt-6 border-t border-dashed border-[#DDD5C7] space-y-2.5 mt-6">
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#211E1C] hover:bg-[#D96B52] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Buka Petunjuk Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#FAF4EB] hover:bg-[#E8DEC8] border border-[#DDD5C7] text-[#211E1C] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Konfirmasi Janji Kedatangan</span>
              </a>
            </div>

          </div>

          {/* Card 2: Interactive Map Preview (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border-2 border-[#DDD5C7] rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#EBE5DB] mb-4">
                <span className="font-mono text-xs text-[#7A7269]">
                  NAVIGASI KEDUNGKANDANG
                </span>
                <span className="font-mono text-xs font-bold text-[#D96B52]">
                  KOTA MALANG
                </span>
              </div>

              {/* Embedded Map */}
              <div className="relative w-full h-[290px] sm:h-[350px] rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs overflow-hidden border border-[#DDD5C7] bg-[#F7F3EB]">
                <iframe
                  title="Peta Lokasi Workshop Klinik Boneka Malang"
                  src="https://maps.google.com/maps?q=Jl.+Raya+Lapangan+Kedungkandang+No.+260,+Kedungkandang,+Kota+Malang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Note beneath map */}
            <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between font-mono text-[11px] text-[#7A7269]">
              <span>Parkir Luas Mobil &amp; Motor</span>
              <span>Akses Jalan Aspal Lebar</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
