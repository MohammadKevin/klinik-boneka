import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Klinik Boneka Malang — Atelier Restorasi & Spa Boneka Antik",
  description:
    "Atelier restorasi boneka & plushie di Kedungkandang, Malang. Rekonstruksi jahit tangan rahasia, pengisian ulang kapas mikrofiber silikon grade-A, dan spa pembersihan botani bebas detergen keras.",
  keywords: [
    "klinik boneka malang",
    "restorasi boneka malang",
    "reparasi plushie malang",
    "spa boneka",
    "jahit boneka kedungkandang",
    "isi ulang dacron",
    "atelier boneka",
  ],
  openGraph: {
    title: "Klinik Boneka Malang — Studio Restorasi & Perawatan Boneka",
    description:
      "Memberi nafas baru untuk kawan kecil penuh kenangan. Pengerjaan teliti, jahitan rapi tak terlihat, dan bahan ramah alergi.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${sans.variable} ${serif.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#211E1C] antialiased selection:bg-[#D96B52]/15 selection:text-[#D96B52] font-sans">
        {children}
      </body>
    </html>
  );
}


