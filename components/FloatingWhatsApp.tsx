"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(true);

  const waUrl =
    "https://wa.me/6281252530629?text=Halo%20Atelier%20Klinik%20Boneka%20Malang,%20saya%20mau%20konsultasi%20kondisi%20boneka...";

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 group">
      
      {/* Editorial Badge */}
      {isOpen && (
        <div className="relative bg-[#FFFFFF] border-2 border-[#DDD5C7] rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs px-3.5 py-2 shadow-[0_4px_16px_rgba(33,30,28,0.08)] flex items-center gap-2 max-w-[210px]">
          <span className="w-2 h-2 rounded-full bg-[#4A6B5D] shrink-0" />
          <span className="font-mono text-[11px] text-[#211E1C] font-semibold truncate">
            Konsultasi Dokter Boneka 🧸
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="text-[#7A7269] hover:text-[#211E1C] p-0.5"
            aria-label="Tutup"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Artisan Floating CTA */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs bg-[#D96B52] hover:bg-[#C2583F] text-white shadow-[0_4px_20px_rgba(217,107,82,0.35)] transition-all hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Konsultasi WhatsApp Klinik Boneka Malang"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </a>
    </div>
  );
}
