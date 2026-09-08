-- ==============================================================================
-- SCHEMA & SEED DATA UNTUK MYSQL / MARIADB (CPANEL HOSTING)
-- Host: 202.155.137.34 (liege.id.rapidplex.com)
-- Import file ini melalui menu phpMyAdmin di cPanel Anda
-- ==============================================================================

-- 1. TABEL PROCEDURES (Poli Layanan)
CREATE TABLE IF NOT EXISTS `procedures` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `code` VARCHAR(64) NOT NULL,
  `name` VARCHAR(128) NOT NULL,
  `category` VARCHAR(64) NOT NULL,
  `headline` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `materials` JSON NULL,
  `steps` JSON NULL,
  `timeframe` VARCHAR(64) NOT NULL,
  `price_estimate` VARCHAR(64) NOT NULL,
  `wa_message` TEXT NOT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. TABEL CASE STUDIES (Catatan Kasus Sebelum/Sesudah)
CREATE TABLE IF NOT EXISTS `case_studies` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `case_no` VARCHAR(64) NOT NULL,
  `title` VARCHAR(128) NOT NULL,
  `vintage` VARCHAR(128) NOT NULL,
  `owner` VARCHAR(128) NOT NULL,
  `location` VARCHAR(128) NOT NULL,
  `before_diagnosis` TEXT NOT NULL,
  `after_restoration` TEXT NOT NULL,
  `duration` VARCHAR(64) NOT NULL,
  `owner_note` TEXT NOT NULL,
  `before_img` TEXT NOT NULL,
  `after_img` TEXT NOT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. TABEL PRICING PLANS (Taksiran Biaya)
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` VARCHAR(64) NOT NULL PRIMARY KEY,
  `name` VARCHAR(128) NOT NULL,
  `subtitle` VARCHAR(128) NOT NULL,
  `price` VARCHAR(64) NOT NULL,
  `unit` VARCHAR(64) NOT NULL,
  `scope` JSON NULL,
  `materials_included` TEXT NOT NULL,
  `highlighted` TINYINT(1) DEFAULT 0,
  `wa_message` TEXT NOT NULL,
  `order_index` INT DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. TABEL SETTINGS (Pengaturan Atelier & WhatsApp)
CREATE TABLE IF NOT EXISTS `settings` (
  `id` VARCHAR(32) NOT NULL PRIMARY KEY DEFAULT 'main',
  `brand_name` VARCHAR(128) NOT NULL DEFAULT 'Klinik Boneka Malang',
  `phone` VARCHAR(32) NOT NULL DEFAULT '+62 812-5253-0629',
  `whatsapp` VARCHAR(32) NOT NULL DEFAULT '6281252530629',
  `address` TEXT NOT NULL,
  `address_note` TEXT NOT NULL,
  `hours_weekday` VARCHAR(128) NOT NULL,
  `hours_weekend` VARCHAR(128) NOT NULL,
  `announcement_text` TEXT NULL,
  `google_maps_url` TEXT NOT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

INSERT INTO `procedures` (`id`, `code`, `name`, `category`, `headline`, `description`, `materials`, `steps`, `timeframe`, `price_estimate`, `wa_message`, `order_index`)
VALUES 
(
  'proc-01',
  '01 / REKONSTRUKSI JAHIT',
  'Poli Bedah & Rekonstruksi Jahitan',
  'OPERASI FISIK',
  'Jahitan tangan rahasia untuk robekan kain, sendi putus, dan kancing lepas.',
  'Tindakan presisi menggunakan teknik ladder stitch (jahitan tangga tersembunyi) yang tidak meninggalkan jejak simpul benang di permukaan luar. Menyatukan kembali sambungan kepala, lengan, telinga, hingga penggantian resleting rusak.',
  '["Benang nilon monofilamen berkekuatan tinggi (anti-getas)", "Jarum kurva bedah khusus kain plushie", "Sepasang mata manik berstandar SNI (Safety Lock Washer)", "Rangka kawat tembaga elastis anti-karat (opsional)"]',
  '["Pemeriksaan tegangan kain & identifikasi serat rapuh", "Pembongkaran jahitan rusak secara non-destruktif", "Penyambungan kembali dengan jahitan ganda", "Penguncian simpul internal anti-lepas"]',
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
  '["100% Virgin Siliconized Polyester Hollow Microfiber (Grade A)", "Bahan hypo-allergenic (bebas bau, bebas debu kimia)", "Lapisan furing dalam breathable untuk boneka berkancing"]',
  '["Evakuasi higienis kapas lama yang mengeras", "Sanitasi ruang dalam kain dengan uap steril", "Pemasukan silikon baru secara proporsional per rongga", "Sculpting & penataan siluet agar boneka kembali tegap"]',
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
  '["Sampo botani pH netral berbahan ekstrak chamomile & aloe vera", "Sterilisator uap bersuhu 65°C pemusnah 99.9% tungau debu", "Kondisioner khusus pelembut serat bulu sintetis (detangling)", "Wewangian aromaterapi lembut bersertifikat aman anak"]',
  '["Dry-brushing awal untuk mengangkat partikel debu mikro", "Pembersihan noda lokal menggunakan busa enzimatik", "Pencucian spa rendam lembut non-mesin", "Pengeringan sirkulasi udara hangat & penyisiran bulu"]',
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
  '["Kain katun jepang, linen, drill, dan satin premium", "Kancing miniatur, ritsleting mikro, dan velcro lembut", "Benang bordir sutra sintetis tahan luntur"]',
  '["Pengukuran proporsi badan dan lingkar tubuh boneka", "Pembuatan pola baju kertas miniatur khusus", "Penjahitan dan fitting berkala", "Finishing aksesori (pita, topi mini, selendang)"]',
  '3 – 5 Hari Kerja',
  'Mulai Rp 50.000',
  'Halo Atelier Klinik Boneka Malang, saya ingin konsultasi Poli Modifikasi & Kostum...',
  4
)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `case_studies` (`id`, `case_no`, `title`, `vintage`, `owner`, `location`, `before_diagnosis`, `after_restoration`, `duration`, `owner_note`, `before_img`, `after_img`, `order_index`)
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
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

INSERT INTO `pricing_plans` (`id`, `name`, `subtitle`, `price`, `unit`, `scope`, `materials_included`, `highlighted`, `wa_message`, `order_index`)
VALUES
(
  'ringan',
  'Tindakan Rawat Jalan',
  'Untuk kerusakan terlokalisir & minor',
  'Rp 25.000',
  'Mulai dari / titik kerusakan',
  '["Jahit robekan kain minor (< 5 cm)", "Pemasangan 1 buah mata manik / hidung safety lock", "Perbaikan ritsleting macet / kancing lepas", "Pengecekan integritas sambungan leher & lengan"]',
  'Benang nilon monofilamen + 1x Safety lock eye',
  0,
  'Halo Atelier Klinik Boneka Malang, saya ingin estimasi tindakan rawat jalan untuk kerusakan ringan boneka...',
  1
),
(
  'refill-spa',
  'Poli Refill & Deep Spa',
  'Untuk boneka kempis, kusam & berdebu',
  'Rp 55.000',
  'Mulai dari (tergantung ukuran badan)',
  '["Penggantian 100% kapas dacron lama yang apek", "Isi ulang serat silikon mikrofiber grade-A murni", "Pencucian deep botanical wash anti-tungau", "Penyisiran bulu halus & pewangi aromaterapi bayi"]',
  'Silikon mikrofiber murni + Sampo botani aloe chamomile',
  0,
  'Halo Atelier Klinik Boneka Malang, saya ingin estimasi Poli Refill & Deep Spa untuk boneka saya...',
  2
),
(
  'total',
  'Paket Restorasi Komprehensif',
  'Bedah total untuk boneka tua / vintage',
  'Rp 95.000',
  'Paket All-in-One Rekonstruksi Penuh',
  '["Operasi jahit rekonstruksi tanpa batas titik robek", "Penguatan internal sendi leher, tangan & kaki", "Refill total silikon microfiber grade-A tahan kempis", "Deep botanical spa + sterilisasi uap anti-bakteri", "Kartu Pasien Sembuh + Garansi Jahitan 14 Hari"]',
  'Full Paket Bahan Premium + Garansi Jahitan Eksklusif',
  1,
  'Halo Atelier Klinik Boneka Malang, saya tertarik dengan Paket Restorasi Komprehensif untuk boneka saya...',
  3
)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

INSERT INTO `settings` (`id`, `brand_name`, `phone`, `whatsapp`, `address`, `address_note`, `hours_weekday`, `hours_weekend`, `announcement_text`, `google_maps_url`)
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
ON DUPLICATE KEY UPDATE `brand_name` = VALUES(`brand_name`);
