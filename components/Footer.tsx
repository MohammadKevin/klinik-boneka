"use client";

import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#211E1C] text-[#FAF4EB] pt-14 pb-10 border-t-4 border-[#D96B52]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-[#38332E]">
          
          {/* Atelier Brand Story (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs bg-[#D96B52] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-[#FAF4EB]">
                  Klinik Boneka Malang
                </span>
                <span className="font-mono text-[10px] text-[#A89F95] uppercase tracking-widest">
                  Atelier Restorasi &amp; Spa Boneka
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#C4BDB5] leading-relaxed max-w-sm font-normal">
              Studio restorasi plushie dan boneka antik di Malang. Menghidupkan kembali kawan kecil kesayangan keluarga dengan dedikasi tinggi, ketelitian jahit tangan rahasia, dan bahan berkualitas aman anak.
            </p>

            <div className="pt-1 flex items-center gap-2 font-mono text-[11px] text-[#A89F95]">
              <span>📍 KEDUNGKANDANG, MALANG</span>
              <span>•</span>
              <span className="text-[#D96B52]">EST. 2021</span>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="font-bold text-[#FAF4EB] uppercase tracking-wider block">
              Poli &amp; Prosedur
            </span>
            <ul className="space-y-2 text-[#C4BDB5]">
              <li>
                <a href="#layanan" className="hover:text-[#D96B52] transition-colors">
                  01 / Rekonstruksi Jahit
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#D96B52] transition-colors">
                  02 / Refill Silikon Grade-A
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#D96B52] transition-colors">
                  03 / Deep Botanical Spa
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-[#D96B52] transition-colors">
                  04 / Custom Makeover
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#D96B52] transition-colors">
                  Catatan Kasus Sebelum/Sesudah
                </a>
              </li>
              <li>
                <a href="#harga" className="hover:text-[#D96B52] transition-colors">
                  Taksiran Biaya Reparasi
                </a>
              </li>
            </ul>
          </div>

          {/* Workshop Contact & Working Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="font-bold text-[#FAF4EB] uppercase tracking-wider block">
              Alamat Workshop
            </span>
            
            <div className="space-y-2.5 text-[#C4BDB5]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D96B52] shrink-0 mt-0.5" />
                <span className="font-sans text-xs">
                  Jl. Raya Lapangan Kedungkandang No. 260, Kedungkandang, Kota Malang (Sebelah timur KUA Kedungkandang)
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#4A6B5D] shrink-0 mt-0.5" />
                <span className="font-sans text-xs">
                  Senin – Sabtu: 08.00 – 17.00 WIB
                  <br />
                  <span className="text-[#8C8379] font-mono text-[10px]">
                    (Minggu: Libur, konsultasi WA tetap dilayani)
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#D96B52] shrink-0" />
                <a
                  href="tel:+6281252530629"
                  className="font-mono text-xs font-bold text-[#FAF4EB] hover:text-[#D96B52] transition-colors"
                >
                  +62 812-5253-0629
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/6281252530629"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#38332E] hover:bg-[#D96B52] text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#38332E] hover:bg-[#D96B52] text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Legal & Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[#8C8379]">
          <p>
            © {currentYear} <strong>Klinik Boneka Malang</strong>. Hak Cipta Dilindungi.
          </p>
          <p className="flex items-center gap-1.5">
            <span>Dikerjakan dengan ketulusan tangan di Malang, Jawa Timur</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
