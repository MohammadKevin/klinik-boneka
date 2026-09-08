-- ==============================================================================
-- SCHEMA & SEED DATA UNTUK KLINIK BONEKA MALANG (SUPABASE)
-- Copy dan Paste seluruh script ini ke SQL Editor di Dashboard Supabase Anda.
-- ==============================================================================

-- 1. TABEL PROCEDURES (Poli Layanan & Rekam Medis)
CREATE TABLE IF NOT EXISTS public.procedures (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  headline TEXT NOT NULL,
  description TEXT NOT NULL,
  materials TEXT[] DEFAULT '{}',
  steps TEXT[] DEFAULT '{}',
  timeframe TEXT NOT NULL,
  price_estimate TEXT NOT NULL,
  wa_message TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL CASE STUDIES (Catatan Kasus Sebelum / Sesudah)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id TEXT PRIMARY KEY,
  case_no TEXT NOT NULL,
  title TEXT NOT NULL,
  vintage TEXT NOT NULL,
  owner TEXT NOT NULL,
  location TEXT NOT NULL,
  before_diagnosis TEXT NOT NULL,
  after_restoration TEXT NOT NULL,
  duration TEXT NOT NULL,
  owner_note TEXT NOT NULL,
  before_img TEXT NOT NULL,
  after_img TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PRICING PLANS (Taksiran Biaya & Paket)
CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  price TEXT NOT NULL,
  unit TEXT NOT NULL,
  scope TEXT[] DEFAULT '{}',
  materials_included TEXT NOT NULL,
  highlighted BOOLEAN DEFAULT FALSE,
  wa_message TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL SETTINGS (Pengaturan Atelier, WA & Lokasi)
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  brand_name TEXT NOT NULL DEFAULT 'Klinik Boneka Malang',
  phone TEXT NOT NULL DEFAULT '+62 812-5253-0629',
  whatsapp TEXT NOT NULL DEFAULT '6281252530629',
  address TEXT NOT NULL,
  address_note TEXT NOT NULL,
  hours_weekday TEXT NOT NULL,
  hours_weekend TEXT NOT NULL,
  announcement_text TEXT,
  google_maps_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access
CREATE POLICY "Public Read Procedures" ON public.procedures FOR SELECT USING (true);
CREATE POLICY "Public Read Case Studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public Read Pricing Plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);

-- Allow Public/Anon or Service Role Write for Admin (adjust according to your auth preference)
CREATE POLICY "Allow All Procedures" ON public.procedures FOR ALL USING (true);
CREATE POLICY "Allow All Case Studies" ON public.case_studies FOR ALL USING (true);
CREATE POLICY "Allow All Pricing Plans" ON public.pricing_plans FOR ALL USING (true);
CREATE POLICY "Allow All Settings" ON public.settings FOR ALL USING (true);

-- 5. STORAGE BUCKET UNTUK FOTO PASIEN BONEKA
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-photos', 'case-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies (Allow Public Read & Upload)
CREATE POLICY "Public Read Case Photos" ON storage.objects FOR SELECT USING (bucket_id = 'case-photos');
CREATE POLICY "Public Upload Case Photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'case-photos');
CREATE POLICY "Public Update Case Photos" ON storage.objects FOR UPDATE USING (bucket_id = 'case-photos');
CREATE POLICY "Public Delete Case Photos" ON storage.objects FOR DELETE USING (bucket_id = 'case-photos');

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Procedures
INSERT INTO public.procedures (id, code, name, category, headline, description, materials, steps, timeframe, price_estimate, wa_message, order_index)
VALUES 
(
  'proc-01',
  '01 / REKONSTRUKSI JAHIT',
  'Poli Bedah & Rekonstruksi Jahitan',
  'OPERASI FISIK',
  'Jahitan tangan rahasia untuk robekan kain, sendi putus, dan kancing lepas.',
  'Tindakan presisi menggunakan teknik ladder stitch (jahitan tangga tersembunyi) yang tidak meninggalkan jejak simpul benang di permukaan luar. Menyatukan kembali sambungan kepala, lengan, telinga, hingga penggantian resleting rusak.',
  ARRAY['Benang nilon monofilamen berkekuatan tinggi (anti-getas)', 'Jarum kurva bedah khusus kain plushie', 'Sepasang mata manik berstandar SNI (Safety Lock Washer)', 'Rangka kawat tembaga elastis anti-karat (opsional)'],
  ARRAY['Pemeriksaan tegangan kain & identifikasi serat rapuh', 'Pembongkaran jahitan rusak secara non-destruktif', 'Penyambungan kembali dengan jahitan ganda', 'Penguncian simpul internal anti-lepas'],
  '1 – 3 Hari Kerja',
  'Mulai Rp 25.000',
  'Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Bedah & Rekonstruksi Jahitan...',
  1
),
(
  'proc-02',
  '02 / REFILL SILIKON GRADE-A',
  'Poli Refill & Pembentukan Anatomi',
  'RESTORASI BENTUK',
  'Penggantian total isi boneka yang kempis, lembek, dan mengeras karena usia.',
  'Mengeluarkan kapas dakron lama yang sudah menggumpal, bau apek, atau berdebu tungau. Diisi kembali dengan serat silikon mikrofiber 100% grade-A yang empuk, tahan kempes bertahun-tahun, serta bisa disesuaikan tingkat kepadatannya (soft / medium / firm).',
  ARRAY['100% Virgin Siliconized Polyester Hollow Microfiber (Grade A)', 'Bahan hypo-allergenic (bebas bau, bebas debu kimia)', 'Lapisan furing dalam breathable untuk boneka berkancing'],
  ARRAY['Evakuasi higienis kapas lama yang mengeras', 'Sanitasi ruang dalam kain dengan uap steril', 'Pemasukan silikon baru secara proporsional per rongga', 'Sculpting & penataan siluet agar boneka kembali tegap'],
  '1 – 2 Hari Kerja',
  'Mulai Rp 35.000',
  'Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Refill Silikon Grade-A...',
  2
),
(
  'proc-03',
  '03 / DEEP SPA HYGIENE',
  'Poli Spa & Deep Botanical Wash',
  'PERAWATAN HIGIENIS',
  'Pencucian manual botani ramah serat bulu tanpa deterjen keras ataupun pemutih.',
  'Proses spa boneka menyeluruh untuk mengangkat noda membandel, minyak, tumpahan susu, serta sterilisasi tungau dan bakteri pemicu alergi anak. Dikeringkan dengan suhu stabil terkontrol agar serat bulu tidak kaku dan tidak menimbulkan bau apek.',
  ARRAY['Sampo botani pH netral berbahan ekstrak chamomile & aloe vera', 'Sterilisator uap bersuhu 65°C pemusnah 99.9% tungau debu', 'Kondisioner khusus pelembut serat bulu sintetis (detangling)', 'Wewangian aromaterapi lembut bersertifikat aman anak'],
  ARRAY['Dry-brushing awal untuk mengangkat partikel debu mikro', 'Pembersihan noda lokal menggunakan busa enzimatik', 'Pencucian spa rendam lembut non-mesin', 'Pengeringan sirkulasi udara hangat & penyisiran bulu'],
  '2 – 3 Hari Kerja',
  'Mulai Rp 40.000',
  'Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Spa & Deep Cleaning...',
  3
),
(
  'proc-04',
  '04 / CUSTOM MAKEOVER',
  'Poli Modifikasi & Kostum Miniatur',
  'KUSTOMISASI ARTISAN',
  'Pembuatan pakaian custom, jubah wisuda mini, aksesori, dan bordir nama personal.',
  'Kustomisasi tampilan boneka kesayangan Anda. Mulai dari penjahitan pakaian miniatur dari pola presisi, pembuatan kostum wisuda, pakaian cosplay karakter anime, hingga bordir inisial nama pemilik di telapak kaki boneka.',
  ARRAY['Kain katun jepang, linen, drill, dan satin premium', 'Kancing miniatur, ritsleting mikro, dan velcro lembut', 'Benang bordir sutra sintetis tahan luntur'],
  ARRAY['Pengukuran proporsi badan dan lingkar tubuh boneka', 'Pembuatan pola baju kertas miniatur khusus', 'Penjahitan dan fitting berkala', 'Finishing aksesori (pita, topi mini, selendang)'],
  '3 – 5 Hari Kerja',
  'Mulai Rp 50.000',
  'Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Modifikasi & Kostum...',
  4
)
ON CONFLICT (id) DO NOTHING;

-- Seed Case Studies
INSERT INTO public.case_studies (id, case_no, title, vintage, owner, location, before_diagnosis, after_restoration, duration, owner_note, before_img, after_img, order_index)
VALUES
(
  'case-01',
  'ARSIP #KB-0419',
  'Classic Teddy Bear 90-an',
  'Koleksi Keluarga (±25 Tahun)',
  'Sarah A.',
  'Klojen, Malang',
  'Robek 8cm pada sambungan leher, dacron mengeras dan berdebu tungau, bulu lepek kusam.',
  'Restorasi serat, isi ulang 280g silikon mikrofiber grade-A, jahitan rahasia (invisible ladder stitch) tak terlihat.',
  '2 Hari Pengerjaan',
  'Bener-bener terharu pas paket dateng! Boneka dari alm. Nenek waktu aku kecil sekarang montok, wangi, dan jahitannya kuat banget tanpa ada bekas jahitan kasar.',
  'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=800&q=80',
  1
),
(
  'case-02',
  'ARSIP #KB-0382',
  'Boneka Gajah Vintage ''Dumbo''',
  'Hadiah Ulang Tahun (±12 Tahun)',
  'Keluarga Bima',
  'Kedungkandang, Malang',
  'Telinga kiri hilang terlepas, mata manik copot 1 sisi, noda susu mengering bertahun-tahun.',
  'Pembuatan ulang telinga kain simetris, pasang sepasang mata safety lock SNI, deep spa enzimatik anti-noda.',
  '3 Hari Pengerjaan',
  'Sempat mau dibuang karena telinganya hilang, untung nemu Klinik Boneka Malang. Hasil replika telinganya plek ketiplek aslinya dan bersih total.',
  'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80',
  2
),
(
  'case-03',
  'ARSIP #KB-0511',
  'Plushie Karakter Anime & Idol',
  'Merchandise Impor Jepang',
  'Nadhira',
  'Lowokwaru, Malang',
  'Jahitan ketiak robek 6cm, rambut serat felt kusut menggumpal, topi mini lepas.',
  'Blind stitch mikro benang nilon, detangling serat rambut halus, pemasangan presisi topi miniatur.',
  '1 Hari Pengerjaan',
  'Jahitannya rapi banget, sama sekali nggak keliatan bekas robekannya. Bulu karakternya juga balik halus lembut!',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
  3
)
ON CONFLICT (id) DO NOTHING;

-- Seed Pricing Plans
INSERT INTO public.pricing_plans (id, name, subtitle, price, unit, scope, materials_included, highlighted, wa_message, order_index)
VALUES
(
  'ringan',
  'Tindakan Rawat Jalan',
  'Untuk kerusakan terlokalisir & minor',
  'Rp 25.000',
  'Mulai dari / titik kerusakan',
  ARRAY['Jahit robekan kain minor (< 5 cm)', 'Pemasangan 1 buah mata manik / hidung safety lock', 'Perbaikan ritsleting macet / kancing lepas', 'Pengecekan integritas sambungan leher & lengan'],
  'Benang nilon monofilamen + 1x Safety lock eye',
  FALSE,
  'Halo Atelier Klinik Boneka Malang, saya ingin estimasi tindakan rawat jalan untuk kerusakan ringan boneka...',
  1
),
(
  'refill-spa',
  'Poli Refill & Deep Spa',
  'Untuk boneka kempis, kusam & berdebu',
  'Rp 55.000',
  'Mulai dari (tergantung ukuran badan)',
  ARRAY['Penggantian 100% kapas dacron lama yang apek', 'Isi ulang serat silikon mikrofiber grade-A murni', 'Pencucian deep botanical wash anti-tungau', 'Penyisiran bulu halus & pewangi aromaterapi bayi'],
  'Silikon mikrofiber murni + Sampo botani aloe chamomile',
  FALSE,
  'Halo Atelier Klinik Boneka Malang, saya ingin estimasi Poli Refill & Deep Spa untuk boneka saya...',
  2
),
(
  'total',
  'Paket Restorasi Komprehensif',
  'Bedah total untuk boneka tua / vintage',
  'Rp 95.000',
  'Paket All-in-One Rekonstruksi Penuh',
  ARRAY['Operasi jahit rekonstruksi tanpa batas titik robek', 'Penguatan internal sendi leher, tangan & kaki', 'Refill total silikon microfiber grade-A tahan kempis', 'Deep botanical spa + sterilisasi uap anti-bakteri', 'Kartu Pasien Sembuh + Garansi Jahitan 14 Hari'],
  'Full Paket Bahan Premium + Garansi Jahitan Eksklusif',
  TRUE,
  'Halo Atelier Klinik Boneka Malang, saya tertarik dengan Paket Restorasi Komprehensif untuk boneka saya...',
  3
)
ON CONFLICT (id) DO NOTHING;

-- Seed Settings
INSERT INTO public.settings (id, brand_name, phone, whatsapp, address, address_note, hours_weekday, hours_weekend, announcement_text, google_maps_url)
VALUES (
  'main',
  'Klinik Boneka Malang',
  '+62 812-5253-0629',
  '6281252530629',
  'Jl. Raya Lapangan Kedungkandang No. 260, Kedungkandang, Kota Malang',
  'Area Lapangan, Sebelah timur KUA Kedungkandang, Malang',
  'Senin – Sabtu: 08.00 – 17.00 WIB',
  'Minggu / Hari Libur: Tutup (Konsultasi WhatsApp Aktif)',
  'ATELIER RESTORASI & SPA BONEKA — KEDUNGKANDANG, KOTA MALANG',
  'https://maps.google.com/?q=Jl.+Raya+Lapangan+Kedungkandang+No.+260,+Kedungkandang,+Kota+Malang'
)
ON CONFLICT (id) DO NOTHING;
