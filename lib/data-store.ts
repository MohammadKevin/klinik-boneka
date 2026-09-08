import { ProcedureItem, CaseStudyItem, PricingPlanItem, WorkshopSettings } from "@/types/database";

export const initialProcedures: ProcedureItem[] = [
  {
    id: "proc-01",
    code: "01 / REKONSTRUKSI JAHIT",
    name: "Poli Bedah & Rekonstruksi Jahitan",
    category: "OPERASI FISIK",
    headline: "Jahitan tangan rahasia untuk robekan kain, sendi putus, dan kancing lepas.",
    description:
      "Tindakan presisi menggunakan teknik ladder stitch (jahitan tangga tersembunyi) yang tidak meninggalkan jejak simpul benang di permukaan luar. Menyatukan kembali sambungan kepala, lengan, telinga, hingga penggantian resleting rusak.",
    materials: [
      "Benang nilon monofilamen berkekuatan tinggi (anti-getas)",
      "Jarum kurva bedah khusus kain plushie",
      "Sepasang mata manik berstandar SNI (Safety Lock Washer)",
      "Rangka kawat tembaga elastis anti-karat (opsional)",
    ],
    steps: [
      "Pemeriksaan tegangan kain & identifikasi serat rapuh",
      "Pembongkaran jahitan rusak secara non-destruktif",
      "Penyambungan kembali dengan jahitan ganda",
      "Penguncian simpul internal anti-lepas",
    ],
    timeframe: "1 – 3 Hari Kerja",
    priceEstimate: "Mulai Rp 25.000",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Bedah & Rekonstruksi Jahitan...",
    orderIndex: 1,
  },
  {
    id: "proc-02",
    code: "02 / REFILL SILIKON GRADE-A",
    name: "Poli Refill & Pembentukan Anatomi",
    category: "RESTORASI BENTUK",
    headline: "Penggantian total isi boneka yang kempis, lembek, dan mengeras karena usia.",
    description:
      "Mengeluarkan kapas dakron lama yang sudah menggumpal, bau apek, atau berdebu tungau. Diisi kembali dengan serat silikon mikrofiber 100% grade-A yang empuk, tahan kempes bertahun-tahun, serta bisa disesuaikan tingkat kepadatannya (soft / medium / firm).",
    materials: [
      "100% Virgin Siliconized Polyester Hollow Microfiber (Grade A)",
      "Bahan hypo-allergenic (bebas bau, bebas debu kimia)",
      "Lapisan furing dalam breathable untuk boneka berkancing",
    ],
    steps: [
      "Evakuasi higienis kapas lama yang mengeras",
      "Sanitasi ruang dalam kain dengan uap steril",
      "Pemasukan silikon baru secara proporsional per rongga",
      "Sculpting & penataan siluet agar boneka kembali tegap",
    ],
    timeframe: "1 – 2 Hari Kerja",
    priceEstimate: "Mulai Rp 35.000",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Refill Silikon Grade-A...",
    orderIndex: 2,
  },
  {
    id: "proc-03",
    code: "03 / DEEP SPA HYGIENE",
    name: "Poli Spa & Deep Botanical Wash",
    category: "PERAWATAN HIGIENIS",
    headline: "Pencucian manual botani ramah serat bulu tanpa deterjen keras ataupun pemutih.",
    description:
      "Proses spa boneka menyeluruh untuk mengangkat noda membandel, minyak, tumpahan susu, serta sterilisasi tungau dan bakteri pemicu alergi anak. Dikeringkan dengan suhu stabil terkontrol agar serat bulu tidak kaku dan tidak menimbulkan bau apek.",
    materials: [
      "Sampo botani pH netral berbahan ekstrak chamomile & aloe vera",
      "Sterilisator uap bersuhu 65°C pemusnah 99.9% tungau debu",
      "Kondisioner khusus pelembut serat bulu sintetis (detangling)",
      "Wewangian aromaterapi lembut bersertifikat aman anak",
    ],
    steps: [
      "Dry-brushing awal untuk mengangkat partikel debu mikro",
      "Pembersihan noda lokal menggunakan busa enzimatik",
      "Pencucian spa rendam lembut non-mesin",
      "Pengeringan sirkulasi udara hangat & penyisiran bulu",
    ],
    timeframe: "2 – 3 Hari Kerja",
    priceEstimate: "Mulai Rp 40.000",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Spa & Deep Cleaning...",
    orderIndex: 3,
  },
  {
    id: "proc-04",
    code: "04 / CUSTOM MAKEOVER",
    name: "Poli Modifikasi & Kostum Miniatur",
    category: "KUSTOMISASI ARTISAN",
    headline: "Pembuatan pakaian custom, jubah wisuda mini, aksesori, dan bordir nama personal.",
    description:
      "Kustomisasi tampilan boneka kesayangan Anda. Mulai dari penjahitan pakaian miniatur dari pola presisi, pembuatan kostum wisuda, pakaian cosplay karakter anime, hingga bordir inisial nama pemilik di telapak kaki boneka.",
    materials: [
      "Kain katun jepang, linen, drill, dan satin premium",
      "Kancing miniatur, ritsleting mikro, dan velcro lembut",
      "Benang bordir sutra sintetis tahan luntur",
    ],
    steps: [
      "Pengukuran proporsi badan dan lingkar tubuh boneka",
      "Pembuatan pola baju kertas miniatur khusus",
      "Penjahitan dan fitting berkala",
      "Finishing aksesori (pita, topi mini, selendang)",
    ],
    timeframe: "3 – 5 Hari Kerja",
    priceEstimate: "Mulai Rp 50.000",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Modifikasi & Kostum...",
    orderIndex: 4,
  },
];

export const initialCaseStudies: CaseStudyItem[] = [
  {
    id: "case-01",
    caseNo: "ARSIP #KB-0419",
    title: "Classic Teddy Bear 90-an",
    vintage: "Koleksi Keluarga (±25 Tahun)",
    owner: "Sarah A.",
    location: "Klojen, Malang",
    beforeDiagnosis:
      "Robek 8cm pada sambungan leher, dacron mengeras dan berdebu tungau, bulu lepek kusam.",
    afterRestoration:
      "Restorasi serat, isi ulang 280g silikon mikrofiber grade-A, jahitan rahasia (invisible ladder stitch) tak terlihat.",
    duration: "2 Hari Pengerjaan",
    ownerNote:
      "Bener-bener terharu pas paket dateng! Boneka dari alm. Nenek waktu aku kecil sekarang montok, wangi, dan jahitannya kuat banget tanpa ada bekas jahitan kasar.",
    beforeImg:
      "https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80",
    orderIndex: 1,
  },
  {
    id: "case-02",
    caseNo: "ARSIP #KB-0382",
    title: "Boneka Gajah Vintage 'Dumbo'",
    vintage: "Hadiah Ulang Tahun (±12 Tahun)",
    owner: "Keluarga Bima",
    location: "Kedungkandang, Malang",
    beforeDiagnosis:
      "Telinga kiri hilang terlepas, mata manik copot 1 sisi, noda susu mengering bertahun-tahun.",
    afterRestoration:
      "Pembuatan ulang telinga kain simetris, pasang sepasang mata safety lock SNI, deep spa enzimatik anti-noda.",
    duration: "3 Hari Pengerjaan",
    ownerNote:
      "Sempat mau dibuang karena telinganya hilang, untung nemu Klinik Boneka Malang. Hasil replika telinganya plek ketiplek aslinya dan bersih total.",
    beforeImg:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
    orderIndex: 2,
  },
  {
    id: "case-03",
    caseNo: "ARSIP #KB-0511",
    title: "Plushie Karakter Anime & Idol",
    vintage: "Merchandise Impor Jepang",
    owner: "Nadhira",
    location: "Lowokwaru, Malang",
    beforeDiagnosis:
      "Jahitan ketiak robek 6cm, rambut serat felt kusut menggumpal, topi mini lepas.",
    afterRestoration:
      "Blind stitch mikro benang nilon, detangling serat rambut halus, pemasangan presisi topi miniatur.",
    duration: "1 Hari Pengerjaan",
    ownerNote:
      "Jahitannya rapi banget, sama sekali nggak keliatan bekas robekannya. Bulu karakternya juga balik halus lembut!",
    beforeImg:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    afterImg:
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    orderIndex: 3,
  },
];

export const initialPricingPlans: PricingPlanItem[] = [
  {
    id: "ringan",
    name: "Tindakan Rawat Jalan",
    subtitle: "Untuk kerusakan terlokalisir & minor",
    price: "Rp 25.000",
    unit: "Mulai dari / titik kerusakan",
    scope: [
      "Jahit robekan kain minor (< 5 cm)",
      "Pemasangan 1 buah mata manik / hidung safety lock",
      "Perbaikan ritsleting macet / kancing lepas",
      "Pengecekan integritas sambungan leher & lengan",
    ],
    materialsIncluded: "Benang nilon monofilamen + 1x Safety lock eye",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin estimasi tindakan rawat jalan untuk kerusakan ringan boneka...",
    orderIndex: 1,
  },
  {
    id: "refill-spa",
    name: "Poli Refill & Deep Spa",
    subtitle: "Untuk boneka kempis, kusam & berdebu",
    price: "Rp 55.000",
    unit: "Mulai dari (tergantung ukuran badan)",
    scope: [
      "Penggantian 100% kapas dacron lama yang apek",
      "Isi ulang serat silikon mikrofiber grade-A murni",
      "Pencucian deep botanical wash anti-tungau",
      "Penyisiran bulu halus & pewangi aromaterapi bayi",
    ],
    materialsIncluded: "Silikon mikrofiber murni + Sampo botani aloe chamomile",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya ingin estimasi Poli Refill & Deep Spa untuk boneka saya...",
    orderIndex: 2,
  },
  {
    id: "total",
    name: "Paket Restorasi Komprehensif",
    subtitle: "Bedah total untuk boneka tua / vintage",
    price: "Rp 95.000",
    unit: "Paket All-in-One Rekonstruksi Penuh",
    highlighted: true,
    scope: [
      "Operasi jahit rekonstruksi tanpa batas titik robek",
      "Penguatan internal sendi leher, tangan & kaki",
      "Refill total silikon microfiber grade-A tahan kempis",
      "Deep botanical spa + sterilisasi uap anti-bakteri",
      "Kartu Pasien Sembuh + Garansi Jahitan 14 Hari",
    ],
    materialsIncluded: "Full Paket Bahan Premium + Garansi Jahitan Eksklusif",
    waMessage:
      "Halo Atelier Klinik Boneka Malang, saya tertarik dengan Paket Restorasi Komprehensif untuk boneka saya...",
    orderIndex: 3,
  },
];

export const initialSettings: WorkshopSettings = {
  brandName: "Klinik Boneka Malang",
  phone: "+62 812-5253-0629",
  whatsapp: "6281252530629",
  address: "Jl. Raya Lapangan Kedungkandang No. 260, Kedungkandang, Kota Malang",
  addressNote: "Area Lapangan, Sebelah timur KUA Kedungkandang, Malang",
  hoursWeekday: "Senin – Sabtu: 08.00 – 17.00 WIB",
  hoursWeekend: "Minggu / Hari Libur: Tutup (Konsultasi WhatsApp Aktif)",
  announcementText: "ATELIER RESTORASI & SPA BONEKA — KEDUNGKANDANG, KOTA MALANG",
  googleMapsUrl:
    "https://maps.google.com/?q=Jl.+Raya+Lapangan+Kedungkandang+No.+260,+Kedungkandang,+Kota+Malang",
};
