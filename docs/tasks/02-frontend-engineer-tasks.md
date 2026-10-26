# Daftar Task Frontend Engineer: Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Target Agen** | `[Schedovyn - Landing Page] Frontend Engineer` (`.agents/agents/frontend-engineer/agent.md`) |
| **Acuan Spesifikasi** | [docs/Schedovyn-Landing-Page-PRD.md](../Schedovyn-Landing-Page-PRD.md), [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md), [DESIGN.md](../../DESIGN.md) |
| **Prasyarat** | Seluruh berkas pengujian Fase RED (`TASK-QA-01` s.d. `TASK-QA-07`) di `src/__tests__/` telah dibuat oleh QA Engineer |
| **Package Manager** | `pnpm` (Dilarang menggunakan `npm`, `yarn`, atau `bun`) |

---

## Protokol Wajib Sebelum & Sesudah Eksekusi

1. **Eksplorasi `codegraph` & Baca Test QA:** Sebelum menulis kode implementasi, jalankan MCP tool `codegraph_explore` (atau CLI `codegraph explore`) dan baca berkas pengujian di `src/__tests__/` agar seluruh nama ekspor, struktur data, teks label, dan atribut ARIA 100% selaras dengan kontrak test.
2. **Patuhi Aturan Ketat Proyek:**
   - **Zero `any` Policy:** Gunakan tipe TypeScript eksplisit dan ketat (`strict: true`).
   - **Estetika `radix-lyra` ([DESIGN.md](../../DESIGN.md)):** Gunakan sudut tajam `rounded-none` (`0px`), garis batas `1px` (`border-border`), warna aksen Indigo-Blue (`#1547E6` / `oklch(0.488 0.243 264.376)`), 4 warna semantik status validasi, serta kelas `tabular-nums` pada setiap angka, jam pelajaran (`08:00 - 09:00`), nomor langkah (`01` s.d. `04`), dan metrik kecepatan (`< 5 ms`).
   - **Larangan Keras Karakter *Em Dash* (`\u2014`):** Dilarang menggunakan karakter *em dash* pada berkas `.ts`, `.tsx`, `.astro`, maupun `.css`. Gunakan tanda hubung biasa (`-`), titik dua (`:`), atau pemisahan kalimat.
   - **Jangan Melemahkan Test:** Dilarang mengubah atau menghapus asersi di `src/__tests__/`.
3. **Sinkronisasi `codegraph`:** Setelah selesai mengimplementasikan seluruh komponen dan memastikan `pnpm run test` serta `pnpm run build` lulus, wajib jalankan `codegraph sync`.

---

## Rincian Task Implementasi (Fase GREEN)

### TASK-FE-01: Konfigurasi Astro, React 19, Tailwind CSS v4 (`radix-lyra`), & Font Lokal
- **Referensi:** TDD Bab 1 & Bab 2, [DESIGN.md](../../DESIGN.md) Bab 2 & Bab 3.
- **Berkas yang Dibuat / Dimodifikasi:**
  - `package.json`
  - `astro.config.mjs`
  - `tsconfig.json`
  - `src/styles/global.css`
- **Langkah Implementasi:**
  1. Pastikan seluruh paket produksi terpasang melalui `pnpm`:
     ```bash
     pnpm add @astrojs/react @astrojs/sitemap @tailwindcss/vite tailwindcss react react-dom lucide-react clsx tailwind-merge @fontsource-variable/figtree @fontsource-variable/inter
     ```
  2. Perbarui `astro.config.mjs` dengan `output: "static"`, `site: process.env.PUBLIC_SITE_URL || "https://schedovyn.com"`, integrasi `react()` dan `sitemap()`, serta plugin Vite `tailwindcss()`.
  3. Perbarui `tsconfig.json` untuk mendukung JSX React (`"jsx": "react-jsx"`, `"jsxImportSource": "react"`) dan path alias `"@/*": ["./src/*"]`.
  4. Buat `src/styles/global.css` menggunakan `@import "tailwindcss";` dengan variabel CSS OKLCH mode Terang (`:root`) dan mode Gelap (`.dark`) sesuai tabel token di [DESIGN.md Bab 2](../../DESIGN.md#2-sistem-warna-oklch--token-semantik-srcstylesglobalcss), konfigurasi font `--font-heading: 'Figtree Variable', sans-serif` dan `--font-sans: 'Inter Variable', sans-serif`, serta `--radius: 0rem`.

---

### TASK-FE-02: Implementasi Lapisan Data Terstruktur (`src/data/*.ts`)
- **Referensi:** TDD Bab 3.1 s.d. 3.4, `FR-LP-01` s.d. `FR-LP-09`.
- **Berkas yang Dibuat:**
  - `src/data/site-config.ts`
  - `src/data/simulation-scenarios.ts`
  - `src/data/features.ts`
  - `src/data/faqs.ts`
- **Langkah Implementasi:**
  1. **`src/data/site-config.ts`:** Ekspor tipe dan konstanta `SITE_CONFIG` yang memuat `appUrl` (`import.meta.env?.PUBLIC_APP_URL || 'https://app.schedovyn.com'`), `guideUrl` (`import.meta.env?.PUBLIC_GUIDE_URL || 'https://guide.schedovyn.com'`), 5 `navAnchors` (`#fitur`, `#cara-kerja`, `#simulasi`, `#ekspor`, `#faq`), 4 `trustBarItems`, 3 pasang `problemSolutions` (`< 5 milidetik`, alokasi otomatis, 4 Status Validasi), dan 4 `workflowSteps` (`01` s.d. `04`).
  2. **`src/data/simulation-scenarios.ts`:** Ekspor tipe dan konstanta `SIMULATION_SCENARIOS` untuk 4 skenario (`TEACHER_OVERLAP`, `SEQUENTIAL_NO_CONFLICT`, `BREAK_TIME_OVERLAP`, `INSTANT_RESOLUTION`) pada jadwal **Kelas VII-A** dan **Kelas VIII-A** hari Senin pukul `07:00 - 10:00` (dengan jam istirahat `09:15 - 09:30`).
  3. **`src/data/features.ts`:** Ekspor `FEATURE_BENTO_ITEMS` (6 kartu fitur `FR-01` s.d. `FR-12` & PWA) dan `EXPORT_SHOWCASE_TABS` (`pdf-landscape` & `excel-multi-sheet` beserta spesifikasi 4 lembar kerja: `Jadwal`, `Rekap Guru`, `Rekap Ruangan`, `Konflik`).
  4. **`src/data/faqs.ts`:** Ekspor `FAQ_ITEMS` yang berisi 6 pertanyaan dan jawaban lengkap sesuai `FR-LP-09` (termasuk konsep *Non-Blocking Placement* pada pertanyaan ke-6).
- **Verifikasi Antara:** Jalankan `pnpm run test src/__tests__/data-contracts.spec.ts` hingga berstatus **PASS**.

---

### TASK-FE-03: Implementasi Utilitas & Komponen Primitif `radix-lyra` (`src/components/ui/`)
- **Referensi:** [DESIGN.md Bab 5.1](../../DESIGN.md#51-komponen-primitif-srccomponentsui).
- **Berkas yang Dibuat:**
  - `src/lib/utils.ts` (fungsi helper `cn(...inputs)` menggunakan `clsx` dan `tailwind-merge`)
  - `src/components/ui/button.tsx`
  - `src/components/ui/badge.tsx`
  - `src/components/ui/card.tsx`
- **Langkah Implementasi:**
  - Bangun komponen primitif React bertipe ketat dengan estetika `radix-lyra`: wajib menggunakan `rounded-none`, garis batas `1px` (`border`), tinggi kontrol presisi, fokus cincin `focus-visible:ring-2`, dan varian warna semantik (termasuk 4 varian status validasi pada `Badge`).

---

### TASK-FE-04: Implementasi 4 Komponen Astro Islands Interaktif (React 19)
- **Referensi:** TDD Bab 4.2 s.d. 4.5, `FR-LP-01`, `FR-LP-04`, `FR-LP-06`, `FR-LP-09`, `AC-LP-03`, `AC-LP-04`, `AC-LP-05`.
- **Berkas yang Dibuat:**
  1. **`src/components/layout/ThemeToggle.tsx` (`client:load`):**
     - Sakelar mode Terang/Gelap yang memperbarui kelas `.dark` pada `document.documentElement` dan menyimpan preferensi ke `localStorage` (`schedovyn-theme`).
     - Mendengarkan event `keydown` tombol `d` / `D` pada `window` (diabaikan jika `ctrlKey`, `metaKey`, `altKey` aktif, atau jika `document.activeElement` adalah `INPUT`, `TEXTAREA`, `SELECT`, atau `isContentEditable`).
  2. **`src/components/islands/ConflictPlaygroundIsland.tsx` (`client:visible`):**
     - Menampilkan 4 tab skenario (`role="tablist"`, `role="tab"`, `aria-selected`) untuk `TEACHER_OVERLAP`, `SEQUENTIAL_NO_CONFLICT`, `BREAK_TIME_OVERLAP`, dan `INSTANT_RESOLUTION`.
     - Menampilkan lencana status validasi sesuai warna semantik, indikator kecepatan pindai `< 5 ms` (`tabular-nums`), kanvas 2 baris (**Kelas VII-A** dan **Kelas VIII-A**, Senin `07:00 - 10:00`, zona Istirahat `09:15 - 09:30`), kartu sesi pelajaran, panel diagnostik penyebab konflik, serta tombol aksi cepat **"Selesaikan Konflik Otomatis"** saat berada pada skenario konflik.
  3. **`src/components/islands/ExportShowcaseTabsIsland.tsx` (`client:visible`):**
     - Menyediakan tab pemilih antara **Tab 1: Dokumen PDF Cetak Landscape** dan **Tab 2: Spreadsheet Excel (`.xlsx`) Multi-Worksheet**.
     - Pada Tab PDF: menampilkan replika matriks jadwal mingguan *landscape*, lencana status validasi, dan blok catatan konflik.
     - Pada Tab Excel: menampilkan bar pemilih 4 lembar kerja (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, `Konflik`), tabel data sesuai *worksheet* aktif (`tabular-nums`), indikator **AutoFilter**, dan lencana **Sanitasi Formula Aktif**.
  4. **`src/components/islands/FaqAccordionIsland.tsx` (`client:visible`):**
     - Menampilkan 6 item akordeon dari `FAQ_ITEMS` dengan tombol `<button aria-expanded={...} aria-controls={...}>` yang aksesibel menggunakan keyboard.
- **Verifikasi Antara:** Jalankan `pnpm run test` pada `theme-toggle.test.tsx`, `conflict-playground.test.tsx`, `export-showcase-tabs.test.tsx`, dan `faq-accordion.test.tsx` hingga seluruhnya **PASS**.

---

### TASK-FE-05: Implementasi `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, & Aset Publik
- **Referensi:** `FR-LP-01`, `FR-LP-10`, `AC-LP-02`, `AC-LP-06`, `NFR-LP-04`, serta TDD Bab 4.1.
- **Berkas yang Dibuat:**
  - `public/favico.svg` (Ikon geometris kisi jadwal Schedovyn berwarna Indigo-Blue `#1547E6`)
  - `public/og-cover.png` (atau aset pratinjau OpenGraph)
  - `public/robots.txt`
  - `src/layouts/BaseLayout.astro`
  - `src/components/layout/Navbar.astro`
  - `src/components/layout/Footer.astro`
- **Langkah Implementasi:**
  1. **`BaseLayout.astro`:** Muat `@fontsource-variable/figtree`, `@fontsource-variable/inter`, dan `../styles/global.css`. Sertakan meta SEO Bahasa Indonesia (`lang="id"`), OpenGraph tags, skema JSON-LD (`SoftwareApplication`), serta `<script is:inline>` anti-FOUC tema sebelum `<body>`. Tanpa skrip pelacak iklan pihak ketiga (`NFR-LP-04`).
  2. **`Navbar.astro` (`FR-LP-01`):** Header sticky (`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur`) dengan logo `favico.svg`, merek **Schedovyn**, lencana `v1.0 Local-First`, 5 menu navigasi jangkar (`#fitur`, `#cara-kerja`, `#simulasi`, `#ekspor`, `#faq`), tautan **Panduan Pemakaian** (`SITE_CONFIG.guideUrl`), `<ThemeToggle client:load />`, dan tombol CTA **"Buka Aplikasi"** (`SITE_CONFIG.appUrl`).
  3. **`Footer.astro` (`FR-LP-10`):** Tautan cepat ke Aplikasi Utama (`SITE_CONFIG.appUrl`), Portal Panduan Pemakaian (`SITE_CONFIG.guideUrl`), ringkasan spesifikasi teknis (`100% Client-Side`, `IndexedDB`, `PWA Offline`), dan hak cipta.

---

### TASK-FE-06: Implementasi 7 Komponen Seksi Statis Astro (`0 KB JS`)
- **Referensi:** `FR-LP-02`, `FR-LP-03`, `FR-LP-05`, `FR-LP-07`, `FR-LP-08`, `FR-LP-10`, dan [DESIGN.md Bab 4 & Bab 5](../../DESIGN.md#4-tata-letak-arsitektural--responsivitas-nfr-lp-02).
- **Berkas yang Dibuat di `src/components/sections/`:**
  1. **`TrustBar.astro` (`FR-LP-02`):** Pita keunggulan cepat 4 kolom berbingkai `1px` (`border-border`).
  2. **`HeroSection.astro` (`FR-LP-02`):**
     - Headline: *"Susun Jadwal Sekolah Tanpa Bentrokan Guru dan Ruangan."*
     - Sub-headline sesuai PRD.
     - Primary CTA: **"Mulai Susun Jadwal Sekarang"** (`SITE_CONFIG.appUrl`) beserta mikro-kopi *"Gratis, tanpa registrasi akun, langsung berjalan di browser"*.
     - Secondary CTA: **"Pelajari Panduan Pemakaian"** (`SITE_CONFIG.guideUrl`).
     - Menyertakan `<TrustBar />` dan ilustrasi komponen **Hero Mockup 3 Panel Editor Schedovyn** (Panel Sesi Belum Terjadwal di kiri, Grid Mingguan di tengah, Panel Detail & Deteksi Konflik di kanan).
  3. **`ProblemSolutionSection.astro` (`FR-LP-03`):** Tabel/kartu komparasi *Cara Lama (Spreadsheet / Manual)* vs *Cara Schedovyn* beserta ilustrasi 4 Status Validasi Transparan.
  4. **`FeatureBentoGrid.astro` (`FR-LP-05`, `id="fitur"`):** Tata letak *Bento Grid* berbingkai tajam untuk ke-6 kartu fitur dari `FEATURE_BENTO_ITEMS`.
  5. **`HowItWorksSection.astro` (`FR-LP-07`, `id="cara-kerja"`):** Alur kerja 4 langkah (`01` s.d. `04`, `tabular-nums`) dari konfigurasi jam sekolah hingga cetak PDF & unduh Excel.
  6. **`PrivacyArchitectureSection.astro` (`FR-LP-08`):** Edukasi jujur bahwa data 100% tersimpan di IndexedDB peramban pengguna tanpa dikirim ke server, disertai anjuran mengekspor jadwal ke PDF/Excel secara berkala sebelum membersihkan *site data*.
  7. **`BottomCtaSection.astro` (`FR-LP-10`):** Banner penutup konversi tinggi dengan tombol menuju **Buka Aplikasi Schedovyn** (`SITE_CONFIG.appUrl`) dan **Baca Panduan Lengkap** (`SITE_CONFIG.guideUrl`).

---

### TASK-FE-07: Perakitan `src/pages/index.astro`, Pembersihan Boilerplate, & Verifikasi Akhir
- **Referensi:** `AC-LP-01` s.d. `AC-LP-06`, `NFR-LP-01` s.d. `NFR-LP-04`.
- **Langkah Implementasi:**
  1. Perbarui `src/pages/index.astro` untuk merakit seluruh komponen di dalam `<BaseLayout>` dengan urutan seksi dan ID jangkar yang tepat:
     - `<Navbar />`
     - `<main>`:
       1. `<HeroSection />` (termasuk `<TrustBar />`)
       2. `<ProblemSolutionSection />`
       3. Seksi `#simulasi` yang membungkus `<ConflictPlaygroundIsland client:visible />`
       4. `<FeatureBentoGrid />` (`id="fitur"`)
       5. Seksi `#ekspor` yang membungkus `<ExportShowcaseTabsIsland client:visible />`
       6. `<HowItWorksSection />` (`id="cara-kerja"`)
       7. `<PrivacyArchitectureSection />`
       8. Seksi `#faq` yang membungkus `<FaqAccordionIsland client:visible />`
       9. `<BottomCtaSection />`
     - `<Footer />`
  2. Hapus berkas *starter boilerplate* bawaan Astro yang tidak lagi digunakan (`src/components/Welcome.astro` dan `src/layouts/Layout.astro`) agar tidak menyisakan kode mati.
  3. Jalankan pengujian bebas *em dash* dan seluruh unit/component test:
     ```bash
     pnpm run test
     ```
  4. Jalankan kompilasi produksi statis:
     ```bash
     pnpm run build
     ```
  5. Jalankan `codegraph sync` untuk memperbarui *knowledge graph*.
