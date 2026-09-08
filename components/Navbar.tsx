"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Poli Restorasi", href: "#layanan" },
    { label: "Catatan Kasus", href: "#portfolio" },
    { label: "Alur Perawatan", href: "#alur-servis" },
    { label: "Taksiran Biaya", href: "#harga" },
    { label: "Atelier Malang", href: "#lokasi" },
    { label: "FAQ", href: "#faq" },
  ];

  const waLink =
    "https://wa.me/6281252530629?text=Halo%20Klinik%20Boneka%20Malang,%20saya%20mau%20konsultasi%20kondisi%20boneka...";

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E2D8] py-3 shadow-[0_2px_12px_rgba(33,30,28,0.03)]"
          : "bg-[#FBF9F5] border-b border-dashed border-[#E0D8CC] py-3.5"
      }`}
    >
      {/* Editorial Top Micro Bar */}
      <div className="hidden lg:block border-b border-[#EDE7DE] pb-2 mb-2 text-[11px] text-[#7A7269] font-mono tracking-wider">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
            <span>ATELIER RESTORASI & SPA BONEKA — KEDUNGKANDANG, KOTA MALANG</span>
          </div>
          <div className="flex items-center gap-6">
            <span>JAM KERJA: SENIN–SABTU (08:00–17:00 WIB)</span>
            <span className="text-[#D96B52] font-semibold">EST. 2021 • 1.500+ BONEKA PULIH</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Mark with Artisan Type */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
        >
          {/* Atelier Stamp Icon */}
          <div className="w-10 h-10 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm bg-[#211E1C] text-[#FBF9F5] flex items-center justify-center font-serif text-lg font-bold border border-[#211E1C] group-hover:bg-[#D96B52] group-hover:border-[#D96B52] transition-colors shadow-xs">
            <span>K</span>
          </div>

          <div className="flex flex-col">
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#211E1C] leading-none">
              Klinik Boneka Malang
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#7A7269] uppercase mt-1">
              Atelier & Hospital for Plushies
            </span>
          </div>
        </a>

        {/* Minimalist Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-[13px] font-medium tracking-wide text-[#5C554E] hover:text-[#211E1C] transition-colors relative py-1 group/link"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D96B52] transition-all duration-200 group-hover/link:w-full" />
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#D96B52] hover:bg-[#C2583F] text-white text-xs font-mono font-medium tracking-wider uppercase transition-all shadow-xs hover:shadow-sm"
          >
            <span>Konsultasi WA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-[#D96B52] text-white"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md border border-[#E0D8CC] text-[#211E1C]"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#E0D8CC] px-5 pt-4 pb-6 space-y-3">
          <div className="font-mono text-[10px] text-[#7A7269] uppercase tracking-widest pb-1 border-b border-[#E8E2D8]">
            Navigasi Atelier
          </div>
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-medium text-[#211E1C] hover:text-[#D96B52] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-dashed border-[#E0D8CC]">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-[#D96B52] text-white font-mono text-xs uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Konsultasi WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
