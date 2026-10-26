# Schedovyn Landing Page

> Situs Showcase dan Pemasaran Berkonversi Tinggi untuk **Schedovyn (*Smart Timetable Planner*)**.

Landing page mandiri berbasis **Astro (Static Site Generation)** yang dipadukan dengan **Astro Islands (React 19)** untuk mendemonstrasikan keunggulan penyusun jadwal sekolah modern: **100% Client-Side & Local-First**, deteksi konflik otomatis lintas kelas (`< 5 ms`), 4 status validasi transparan, mode offline (PWA), serta ekspor PDF dan Excel.

---

## 🌟 Nilai Utama Produk yang Ditampilkan

1. **Tanpa Login dan Tanpa Server (100% Local-First):** Pengguna langsung mulai menyusun jadwal di peramban tanpa registrasi akun, tanpa database terpusat, dan privasi data terjaga penuh di IndexedDB lokal.
2. **Deteksi Konflik Lintas Kelas Real-Time (`< 5 ms`):** Sistem otomatis mendeteksi bentrokan guru, ruangan khusus, irisan jam istirahat, dan jam operasional sekolah secara instan.
3. **4 Status Validasi Transparan:**
   - **Konflik Ditemukan** (`CONFLICT_DETECTED` - Merah/Destructive)
   - **Belum Lengkap** (`INCOMPLETE` - Kuning/Amber)
   - **Bebas Konflik pada Data Saat Ini** (`NO_CONFLICT_CURRENT_DATA` - Biru Langit/Sky)
   - **Jadwal Lengkap dan Valid** (`COMPLETE_AND_VALID` - Hijau Zamrud/Emerald)
4. **PWA Offline Ready:** Aplikasi dapat diinstal ke desktop/laptop dan tetap dapat digunakan 100% saat koneksi internet sekolah terputus.
5. **Ekspor Siap Cetak dan Olah Data:** Hasil cetak dokumen PDF *landscape* siap tempel serta berkas Excel multi-*worksheet* (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, dan `Konflik`).

---

## 🧩 Komponen dan Seksi Halaman

Landing page dibangun menggunakan arsitektur modular yang menggabungkan seksi statis (0 KB JS) dengan komponen interaktif Astro Islands:

- **Header dan Navigasi (`Navbar.astro`):** Navigasi jangkar (`#fitur`, `#cara-kerja`, `#simulasi`, `#ekspor`, `#faq`), sakelar tema Terang/Gelap (`ThemeToggle.tsx`), dan tombol CTA ke aplikasi utama.
- **Hero Section (`HeroSection.astro` & `TrustBar.astro`):** Penjelasan proposisi nilai instan, 4 butir keunggulan cepat, dan mockup visual kanvas editor 3 panel.
- **Masalah vs Solusi (`ProblemSolutionSection.astro`):** Perbandingan penyusunan manual/spreadsheet vs efisiensi mesin Schedovyn.
- **Simulasi Interaktif Deteksi Konflik (`ConflictPlaygroundIsland.tsx`):** Komponen React 19 interaktif (`client:visible`) untuk mencoba 4 skenario konflik jadwal secara langsung di browser:
  - *Skenario 1:* Bentrokan Guru Lintas Kelas (`TEACHER_OVERLAP`).
  - *Skenario 2:* Sesi Berurutan Presisi (`08:00 - 09:00` & `09:00 - 10:00`) membuktikan sesi berbatasan tidak dianggap bentrok.
  - *Skenario 3:* Irisan Waktu Istirahat (`BREAK_TIME_OVERLAP`).
  - *Skenario 4:* Resolusi Konflik Instan.
- **Bento Grid Fitur Lengkap (`FeatureBentoGrid.astro`):** Pameran 6 kemampuan utama (konfigurasi fleksibel, data master WCAG AA, duplikasi kelas paralel, 50 langkah undo/redo, auto-save IndexedDB, dan keyboard shortcuts).
- **Pameran Hasil Ekspor (`ExportShowcaseTabsIsland.tsx`):** Tab interaktif pratinjau dokumen PDF Landscape vs lembar kerja Excel 4 worksheet (`client:visible`).
- **Alur Kerja 4 Langkah (`HowItWorksSection.astro`):** Panduan ringkas dari konfigurasi jam hingga cetak jadwal.
- **Arsitektur Privasi (`PrivacyArchitectureSection.astro`):** Edukasi jujur mengenai penyimpanan lokal di IndexedDB dan anjuran pencadangan berkala.
- **Tanya Jawab Umum (`FaqAccordionIsland.tsx`):** Akordeon keyboard-accessible untuk 6 pertanyaan paling sering diajukan pihak sekolah.
- **Bottom CTA dan Footer (`BottomCtaSection.astro` & `Footer.astro`):** Penutup konversi dan tautan ekosistem Schedovyn.

---

## 🛠️ Tech Stack dan Arsitektur

| Lapisan | Teknologi | Catatan Implementasi |
|---|---|---|
| **Framework Web** | **Astro** (`v5+`) | Mode `output: "static"` (Static Site Generation murni) |
| **Interactive Islands** | **React 19** (`@astrojs/react`) | Hidrasi parsial khusus komponen simulasi, pameran tab, dan FAQ |
| **Package Manager** | **pnpm** (Node.js `>=22.23.4`) | Manajemen paket dan skrip proyek |
| **Bahasa** | **TypeScript** (`strict: true`) | Zero `any` policy |
| **Styling** | **Tailwind CSS v4** (`@tailwindcss/vite`) | Konfigurasi CSS-first di `src/styles/global.css` |
| **Desain Sistem** | **radix-lyra** | Sudut tajam (`rounded-none`), border presisi `1px`, aksen `#1547E6` |
| **Ikon** | **lucide-react** | Ikon visual konsisten |
| **Tipografi** | `@fontsource-variable/figtree` & `@fontsource-variable/inter` | Local bundling, angka `tabular-nums` |
| **SEO & Sitemap** | `@astrojs/sitemap` | Auto sitemap, OpenGraph tags, JSON-LD `SoftwareApplication` |
| **Testing** | **Vitest** + `@testing-library/react` | Pengujian unit, komponen island, dan audit bebas em dash |

---

## 📂 Struktur Direktori Proyek

```text
schedovyn-landing-page/
├── public/
│   ├── favico.svg                  # Ikon resmi Schedovyn
│   ├── og-cover.png                # Gambar pratinjau OpenGraph (1200x630)
│   └── robots.txt                  # Aturan perayapan mesin pencari
├── src/
│   ├── __tests__/                  # Automated test suite Vitest
│   ├── components/
│   │   ├── islands/                # React 19 Islands (ConflictPlayground, ExportTabs, FaqAccordion)
│   │   ├── layout/                 # Komponen navigasi (Navbar, Footer, ThemeToggle)
│   │   ├── sections/               # Komponen Astro statis 0 KB JS
│   │   └── ui/                     # Primitif UI radix-lyra (Button, Card, Badge)
│   ├── data/
│   │   ├── faqs.ts                 # Kontrak data 6 pertanyaan & jawaban FAQ
│   │   ├── features.ts             # Data fitur lengkap FR-01 s.d. FR-12
│   │   ├── simulation-scenarios.ts # Data jadwal & 4 skenario simulasi konflik
│   │   └── site-config.ts          # Konfigurasi tautan dan metadata situs
│   ├── layouts/
│   │   └── BaseLayout.astro        # Kerangka HTML, SEO, JSON-LD, skrip anti-FOUC
│   ├── pages/
│   │   └── index.astro             # Halaman utama landing page
│   └── styles/
│       └── global.css              # Variabel tema OKLCH radix-lyra & Tailwind CSS v4
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
```

---

## ⚙️ Variabel Lingkungan (Environment Variables)

Situs dapat dikonfigurasi melalui berkas `.env` (atau diset pada dashboard hosting):

```env
# URL aplikasi utama Schedovyn
PUBLIC_APP_URL=https://app.schedovyn.com

# URL portal panduan pengguna Schedovyn
PUBLIC_GUIDE_URL=https://guide.schedovyn.com
```

---

## 🚀 Panduan Menjalankan Proyek

Pastikan Anda telah memasang **Node.js `>=22.23.4`** dan **`pnpm`**.

### 1. Instalasi Dependensi

```bash
pnpm install
```

### 2. Menjalankan Server Pengembangan

```bash
pnpm dev
```

Buka peramban di `http://localhost:4321`.

### 3. Menjalankan Pengujian Otomatis (Vitest)

```bash
pnpm test
```

### 4. Melakukan Kompilasi Produksi (Static Build)

```bash
pnpm build
```

Hasil kompilasi statis murni akan tersimpan di dalam direktori `dist/`.

### 5. Pratinjau Hasil Kompilasi

```bash
pnpm preview
```

---

## 🎨 Pedoman Desain dan Copywriting

- **Estetika Architectural Technical Grid (`radix-lyra`):** Seluruh kartu, lencana, dan tombol menggunakan sudut tajam (`rounded-none`) dan garis batas `1px` (`border-border`).
- **Tipografi Tabular:** Seluruh rentang jam pelajaran, statistik, dan metrik kecepatan menggunakan kelas `tabular-nums`.
- **Dukungan Tema:** Mendukung mode Terang dan Gelap penuh dengan pintasan keyboard `D`.
- **Standar Bahasa Indonesia:** Bebas karakter tanda pisah panjang (em dash); gunakan tanda hubung biasa (`-`), titik dua (`:`), atau struktur kalimat terpisah.

---

## 🔗 Ekosistem Schedovyn

- **Aplikasi Utama:** [app.schedovyn.com](https://app.schedovyn.com)
- **Portal Panduan Pengguna:** [guide.schedovyn.com](https://guide.schedovyn.com)
- **Repositori Landing Page:** [github.com/akhmad-ardi/schedovyn-landing-page](https://github.com/akhmad-ardi/schedovyn-landing-page)
