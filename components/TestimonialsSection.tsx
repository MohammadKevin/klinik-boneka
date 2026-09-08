"use client";

interface Review {
  owner: string;
  origin: string;
  doll: string;
  vintage: string;
  date: string;
  content: string;
  treatment: string;
}

const reviews: Review[] = [
  {
    owner: "Ratna Sari",
    origin: "Sukun, Kota Malang",
    doll: "Boneka Beruang 'Brownie'",
    vintage: "Masa Pacaran (18 Tahun Lalu)",
    date: "Februari 2026",
    content:
      "Awalnya ragu karena leher beruang udah nyaris putus dan dacronnya menggumpal bau apek. Setelah selesai di Klinik Boneka Malang, hasilnya luar biasa! Jahitannya rapi nggak keliatan sama sekali, wangi lembut, dan montok seperti waktu pertama dikasih suami.",
    treatment: "Rekonstruksi Leher + Refill Silikon 300g",
  },
  {
    owner: "Dimas Aditya",
    origin: "Surabaya (Kirim via Ekspedisi JNE)",
    doll: "Plushie Pikachu Jumbo",
    vintage: "Koleksi Hadiah Ulang Tahun Anak",
    date: "Januari 2026",
    content:
      "Kirim dari Surabaya ke Kedungkandang Malang lewat JNE. Pelayanannya komunikatif banget, tiap tahapan dikirimi foto update. Anak saya senang bukan main pas unboxing karena Pikachu kesayangannya udah bersih wangi dan empuk lagi.",
    treatment: "Deep Botanical Spa + Jahit Ulang Ekor",
  },
  {
    owner: "Clara Meilani",
    origin: "Klojen, Kota Malang",
    doll: "Boneka Kelinci Rajut Vintage",
    vintage: "Kado Lahiran Anak Pertama",
    date: "Januari 2026",
    content:
      "Poli Spa & Deep Cleaning-nya juara. Noda susu & minyak yang sudah bertahun-tahun nempel bisa hilang tuntas tanpa merusak serat rajutan bulunya. Sabunnya juga wangi lembut ramah buat anak yang punya alergi debu.",
    treatment: "Poli Spa Higienis Organik Anti-Tungau",
  },
  {
    owner: "Andre Kurniawan",
    origin: "Kota Batu, Jawa Timur",
    doll: "Husky Giant Plush (1.2 Meter)",
    vintage: "Koleksi Pribadi",
    date: "Desember 2025",
    content:
      "Ukurannya super gede dan butuh refill silikon banyak. Dikerjain tepat waktu 2 hari, harganya sangat masuk akal dibanding nilai kenangan yang nggak bisa dibeli lagi di toko mainan mana pun.",
    treatment: "Refill Silikon Mikrofiber Grade-A 850g",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F7F4EE] border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E0D8CC]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-[#7A7269] uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D96B52]" />
              <span>BUKU TAMU &amp; ARSIP PESAN PEMILIK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#211E1C] tracking-tight">
              Cerita Bahagia Dari Pemilik Boneka
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#5C554E] max-w-md">
            Setiap boneka membawa cerita dan ikatan emosional. Inilah sepenggal surat dan kesan tulus dari mereka.
          </p>
        </div>

        {/* 2x2 Guestbook Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#DDD5C7] rounded-tl-2xl rounded-br-2xl rounded-tr-xs rounded-bl-xs p-6 sm:p-7 shadow-xs flex flex-col justify-between relative hover:border-[#211E1C] transition-colors"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#EBE5DB] mb-4">
                  <span className="font-mono text-xs font-bold text-[#D96B52]">
                    🧸 {rev.doll}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A7269]">
                    {rev.date}
                  </span>
                </div>

                {/* Content Quote */}
                <p className="font-serif italic text-sm sm:text-base text-[#211E1C] leading-relaxed mb-6">
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              {/* Author & Treatment */}
              <div className="pt-4 border-t border-[#F0EBE1] flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <div>
                  <span className="font-serif font-bold text-sm text-[#211E1C] block">
                    {rev.owner}
                  </span>
                  <span className="text-[#7A7269] text-[11px]">{rev.origin}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#4A6B5D] bg-[#E3ECE7] px-2 py-0.5 rounded-xs font-medium">
                    ✓ {rev.treatment}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
