"use client";

import { ArrowRight } from "lucide-react";

interface WorkflowPhase {
  phase: string;
  code: string;
  title: string;
  description: string;
  notes: string;
  actionHint: string;
}

const phases: WorkflowPhase[] = [
  {
    phase: "FASE 01",
    code: "INSPEKSI AWAL",
    title: "Kirim Foto & Keluhan Kerusakan",
    description:
      "Foto bagian boneka yang robek, sobek sambungan, atau mengempis. Kirimkan via WhatsApp beserta perkiraan dimensi tinggi boneka.",
    notes: "Sertakan foto detail dari jarak dekat dan sudut menyeluruh.",
    actionHint: "Respon dalam < 30 menit",
  },
  {
    phase: "FASE 02",
    code: "DIAGNOSA & TAKSIRAN",
    title: "Estimasi Biaya & Surat Penerimaan",
    description:
      "Kami memberikan analisa tindakan poli yang diperlukan beserta rincian biaya yang transparan tanpa ada biaya tersembunyi.",
    notes: "Pengerjaan baru dimulai setelah Anda menyetujui rincian taksiran.",
    actionHint: "Transparan 100%",
  },
  {
    phase: "FASE 03",
    code: "TINDAKAN RAWAT INAP",
    title: "Pengantaran / Ekspedisi ke Workshop",
    description:
      "Antar langsung ke workshop kami di Kedungkandang, kirim via Gosend/Grab untuk area Malang Raya, atau kirim paket (JNE/J&T/Paxel) dari luar kota.",
    notes: "Kami terbitkan Surat Tanda Pasien Diterima begitu boneka tiba di atelier.",
    actionHint: "Update foto berkala",
  },
  {
    phase: "FASE 04",
    code: "PEMULANGAN HANGAT",
    title: "Quality Check, Packing & Pemulangan",
    description:
      "Setelah restorasi & spa selesai, boneka diperiksa kerapian jahitannya, disterilkan, dikemas cantik dalam kotak pelindung, dan siap pulang.",
    notes: "Disertai Kartu Garansi Jahitan 14 Hari Bebas Robek Ulang.",
    actionHint: "Wangi & siap peluk",
  },
];

export default function WorkflowSection() {
  return (
    <section id="alur-servis" className="py-16 md:py-24 bg-[#F7F4EE] border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>LOGBOOK PROSEDUR RAWAT INAP</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              4 Langkah Perawatan di Atelier
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Alur kerja terstruktur dan menenangkan, memastikan setiap boneka tercatat dan tertangani secara bertanggung jawab.
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 shadow-xs flex flex-col justify-between relative group hover:border-[#211E1C] transition-colors"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#EBE5DB] mb-4">
                  <span className="font-mono text-xs font-bold text-[#D96B52]">
                    {item.phase}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A7269] uppercase">
                    {item.code}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#211E1C] leading-snug mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] font-mono text-[11px] text-[#7A7269] space-y-1">
                <p className="text-[#211E1C] font-medium flex items-center gap-1.5">
                  <span className="text-[#4A6B5D]">✓</span>
                  <span>{item.actionHint}</span>
                </p>
                <p className="text-[10px] text-[#7A7269] italic">
                  {item.notes}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Logistics & Packaging Guide Banner */}
        <div className="mt-10 p-6 sm:p-8 bg-[#FAF4EB] border-2 border-dashed border-[#D6CBB8] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#D96B52] block">
              📦 PETUNJUK PENGIRIMAN DARI LUAR KOTA MALANG
            </span>
            <h4 className="font-serif text-xl font-bold text-[#211E1C]">
              Menerima Kiriman Pasien dari Seluruh Kota di Indonesia
            </h4>
            <p className="text-xs sm:text-sm text-[#5C554E] leading-relaxed">
              Bagi pasien luar kota (Surabaya, Sidoarjo, Jakarta, Bandung, Denpasar, dsb), bungkus boneka dengan plastik bersih berlapis sebelum dimasukkan kardus. Kirim via JNE, J&amp;T, SiCepat, atau Paxel.
            </p>
          </div>

          <a
            href="https://wa.me/6281252530629?text=Halo%20Atelier%20Klinik%20Boneka%20Malang,%20saya%20mau%20minta%20alamat%20lengkap%20untuk%20kirim%20boneka%20dari%20luar%20kota..."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-tl-lg rounded-br-lg rounded-tr-xs rounded-bl-xs bg-[#211E1C] hover:bg-[#D96B52] text-white font-mono text-xs uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Minta Format Label Pengiriman</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
