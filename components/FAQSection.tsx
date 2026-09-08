"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

interface FAQItem {
  no: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    no: "01",
    question: "Berapa kisaran biaya reparasi boneka di Klinik Boneka Malang?",
    answer:
      "Biaya reparasi sangat terjangkau, mulai dari Rp 25.000 untuk jahit robekan ringan atau pasang kancing/mata. Untuk pengisian dacron silikon baru mulai Rp 35.000, dan cuci spa higienis mulai Rp 40.000. Biaya pasti akan kami estimasikan secara transparan setelah Anda mengirimkan foto kerusakan via WhatsApp tanpa biaya konsultasi.",
  },
  {
    no: "02",
    question: "Berapa lama proses pengerjaan reparasi biasanya berlangsung?",
    answer:
      "Proses reparasi standar memakan waktu antara 1 hingga 3 hari kerja tergantung tingkat kerusakan dan antrean pasien. Untuk paket spa pencucian membutuhkan 2-3 hari karena melewati proses pengeringan suhu terkontrol agar tidak bau apek dan serat bulu tetap halus sempurna.",
  },
  {
    no: "03",
    question: "Apakah menerima pengiriman boneka dari luar kota Malang?",
    answer:
      "Tentu saja! Kami sering menerima boneka dari Surabaya, Sidoarjo, Jakarta, Bandung, Bali, hingga luar pulau melalui kurir ekspedisi (JNE, J&T, SiCepat, Paxel). Setiap boneka yang datang akan difoto dan dibuatkan Surat Penerimaan Pasien sebelum mulai dikerjakan.",
  },
  {
    no: "04",
    question: "Apakah bahan pembersih di Poli Spa aman untuk anak-anak atau pemilik alergi?",
    answer:
      "Sangat aman. Kami menggunakan sampo dan sabun pembersih organik khusus yang hypoallergenic (bebas detergen keras, bebas pemutih klorin, dan bebas pewangi kimia tajam). Kami juga melakukan sterilisasi uap bersuhu pas untuk membasmi 99.9% tungau debu & kuman pemicu alergi.",
  },
  {
    no: "05",
    question: "Apakah bisa request bentuk baju atau aksesori custom?",
    answer:
      "Bisa banget! Di Poli Modifikasi & Kostum, kami bisa membuatkan pakaian mini custom (baju dokter, seragam sekolah, toga wisuda mini, gaun pesta), penambahan pita, syal, bordir inisial nama, hingga topi miniatur sesuai keinginan Anda.",
  },
  {
    no: "06",
    question: "Bagaimana jika boneka saya memiliki nilai sentimental tinggi?",
    answer:
      "Kami memperlakukan setiap boneka seperti barang berharga keluarga. Teknik jahit kami menggunakan metode konservasi tekstil khusus, mempertahankan kain original sebanyak mungkin, dan benang nilon berkekuatan tinggi agar boneka awet hingga puluhan tahun ke depan.",
  },
  {
    no: "07",
    question: "Apakah ada garansi hasil jahitan jika nanti robek lagi?",
    answer:
      "Ya, kami memberikan Garansi Jahitan selama 14 Hari. Jika jahitan di area yang kami perbaiki lepas atau kurang pas, Anda bisa membawanya kembali ke workshop kami untuk diperbaiki ulang tanpa biaya tambahan.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#F7F4EE] border-b border-[#E8E2D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>LEMBAR TANYA JAWAB ATELIER</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-xs">
            Informasi lengkap seputar keamanan bahan, durasi, dan garansi pengerjaan.
          </p>
        </div>

        {/* Accordion Dossier */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.no}
                className={`bg-[#FFFFFF] border rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#D96B52] shadow-xs"
                    : "border-[#DDD5C7] hover:border-[#211E1C]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-mono text-xs font-bold text-[#D96B52]">
                      {faq.no}.
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#211E1C]">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 border border-[#DDD5C7] transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#D96B52] text-white rotate-180 border-[#D96B52]"
                        : "bg-[#FAF4EB] text-[#211E1C]"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#5C554E] leading-relaxed border-t border-dashed border-[#EBE5DB] font-normal animate-in fade-in-50 duration-150">
                    <div className="pl-6 border-l-2 border-[#D96B52]/40 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Box */}
        <div className="mt-10 p-6 rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs bg-[#FFFFFF] border-2 border-dashed border-[#DDD5C7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base font-bold text-[#211E1C]">
              Punya keluhan spesifik pada boneka Anda?
            </h4>
            <p className="font-sans text-xs text-[#5C554E] mt-0.5">
              Konsultasikan langsung dengan penjahit &amp; dokter boneka kami via WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/6281252530629?text=Halo%20Atelier%20Klinik%20Boneka%20Malang,%20saya%20punya%20pertanyaan%20spesifik..."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#D96B52] hover:bg-[#C2583F] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>Tanya Dokter Langsung</span>
          </a>
        </div>

      </div>
    </section>
  );
}
