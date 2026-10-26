# Daftar Task QA Engineer: Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Target Agen** | `[Schedovyn - Landing Page] Quality Assurance (QA) Engineer` (`.agents/agents/qa-engineer/agent.md`) |
| **Acuan Spesifikasi** | [docs/Schedovyn-Landing-Page-PRD.md](../Schedovyn-Landing-Page-PRD.md), [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md), [DESIGN.md](../../DESIGN.md) |
| **Ruang Lingkup Berkas** | `vitest.config.ts`, `src/__tests__/**`, dan konfigurasi skrip test di `package.json` |
| **Package Manager** | `pnpm` (Dilarang menggunakan `npm`, `yarn`, atau `bun`) |

---

## Protokol Wajib Sebelum & Sesudah Eksekusi

1. **Eksplorasi `codegraph`:** Sebelum menulis berkas pengujian, jalankan MCP tool `codegraph_explore` atau CLI `codegraph explore` untuk memeriksa struktur terkini di `src/`.
2. **Disiplin Fase RED:** Pada Fase 1, tulis pengujian berdasarkan kontrak di [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md) sebelum implementasi dibuat oleh Frontend Engineer. Pastikan test gagal (*FAIL / RED*) karena modul/komponen target belum tersedia.
3. **Larangan Karakter *Em Dash*:** Pastikan seluruh berkas test yang Anda tulis bebas dari karakter *em dash* (`\u2014`) di dalam komentar maupun string non-asersi (gunakan escape unicode `\u2014` saat menulis regex pendeteksi *em dash*).
4. **Sinkronisasi `codegraph`:** Setelah selesai membuat atau memperbarui berkas test, jalankan `codegraph sync`.

---

## Rincian Task Fase 1 (Fase RED - Spesifikasi Pengujian)

### TASK-QA-01: Setup Infrastruktur Pengujian (Vitest & React Testing Library)
- **Tujuan:** Menyiapkan *test runner* Vitest dengan lingkungan DOM (`jsdom`) dan pustaka pengujian komponen React 19.
- **Langkah Eksekusi:**
  1. Instal dependensi pengujian (bila belum terpasang) menggunakan `pnpm`:
     ```bash
     pnpm add -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/react @types/react-dom
     ```
     *(Pastikan `react` dan `react-dom` juga terpasang sebagai dependencies apabila dibutuhkan oleh `@testing-library/react`).*
  2. Tambahkan skrip `"test": "vitest run"` dan `"test:watch": "vitest"` pada `package.json`.
  3. Buat berkas `vitest.config.ts` dengan dukungan `@vitejs/plugin-react`, `environment: "jsdom"`, `globals: true`, dan `setupFiles: ["./src/__tests__/setup.ts"]`.
  4. Buat berkas `src/__tests__/setup.ts` yang mengimpor `@testing-library/jest-dom/vitest`, menyiapkan mock `window.matchMedia`, dan membersihkan `localStorage` serta kelas `document.documentElement` pada `beforeEach` / `afterEach`.
- **Kriteria Selesai (DoD):** Perintah `pnpm run test` dapat dieksekusi dengan lancar oleh Vitest.

---

### TASK-QA-02: Pengujian Kontrak Data Terstruktur (`src/__tests__/data-contracts.spec.ts`)
- **Referensi:** `FR-LP-01` s.d. `FR-LP-10`, `AC-LP-02`, `AC-LP-03`, `AC-LP-04`, `AC-LP-06`, serta TDD Bab 3.1 s.d. 3.4.
- **Berkas Target yang Diuji:**
  - `src/data/site-config.ts` (`SITE_CONFIG`)
  - `src/data/simulation-scenarios.ts` (`SIMULATION_SCENARIOS`)
  - `src/data/features.ts` (`FEATURE_BENTO_ITEMS`, `EXPORT_SHOWCASE_TABS`)
  - `src/data/faqs.ts` (`FAQ_ITEMS`)
- **Asersi Wajib:**
  1. **`SITE_CONFIG`:**
     - `brandName` bernilai `'Schedovyn'` dan `versionBadge` bernilai `'v1.0 Local-First'`.
     - `appUrl` dan `guideUrl` merupakan URL valid yang tidak kosong.
     - `navAnchors` memiliki tepat 5 item dengan `href`: `'#fitur'`, `'#cara-kerja'`, `'#simulasi'`, `'#ekspor'`, dan `'#faq'`.
     - `trustBarItems` memiliki 4 poin keunggulan utama (`100% Client-Side & Privasi Lokal`, `Deteksi 7 Jenis Konflik Real-Time`, `Ekspor PDF Cetak & Excel Rekap Guru`, `Mendukung Mode Offline (PWA)`).
     - `problemSolutions` memiliki minimal 3 pasang komparasi (mencakup pemindaian `< 5 milidetik`, perhitungan otomatis sesi belum terjadwal, dan 4 Status Validasi).
     - `workflowSteps` memiliki tepat 4 langkah berurutan (`01`, `02`, `03`, `04`).
  2. **`SIMULATION_SCENARIOS`:**
     - Memuat tepat 4 skenario dengan ID: `'TEACHER_OVERLAP'`, `'SEQUENTIAL_NO_CONFLICT'`, `'BREAK_TIME_OVERLAP'`, dan `'INSTANT_RESOLUTION'`.
     - Skenario `'TEACHER_OVERLAP'` memiliki `validationStatus: 'CONFLICT_DETECTED'`, `statusLabel: 'Konflik Ditemukan'`, serta menampilkan sesi Pak Budi yang beririsan antara `Kelas VII-A` (`08:00` - `09:00`) dan `Kelas VIII-A` (`08:30` - `09:30`) dengan `isConflicting: true`.
     - Skenario `'SEQUENTIAL_NO_CONFLICT'` memiliki `validationStatus: 'NO_CONFLICT_CURRENT_DATA'`, sesi berurutan `08:00` - `09:00` dan `09:00` - `10:00`, serta seluruh sesi memiliki `isConflicting: false`.
     - Skenario `'BREAK_TIME_OVERLAP'` memiliki `validationStatus: 'CONFLICT_DETECTED'` dan minimal satu sesi dengan `conflictCode: 'BREAK_TIME_OVERLAP'`.
     - Skenario `'INSTANT_RESOLUTION'` memiliki `validationStatus: 'COMPLETE_AND_VALID'`, `statusLabel: 'Jadwal Lengkap dan Valid'`, dan seluruh sesi memiliki `isConflicting: false`.
  3. **`FEATURE_BENTO_ITEMS` & `EXPORT_SHOWCASE_TABS`:**
     - `FEATURE_BENTO_ITEMS` memiliki tepat 6 item yang mencakup: konfigurasi jam belajar (`15`, `30`, `45`, `60` menit), data master & warna WCAG AA, penyalinan jadwal kelas paralel, riwayat `50` langkah Undo/Redo (`Ctrl+Z`), penyimpanan lokal IndexedDB, dan aksesibilitas keyboard (`Alt + Panah`).
     - `EXPORT_SHOWCASE_TABS` memiliki 2 tab (`'pdf-landscape'` dan `'excel-multi-sheet'`), di mana tab Excel mendefinisikan tepat 4 lembar kerja: `'Jadwal'`, `'Rekap Guru'`, `'Rekap Ruangan'`, dan `'Konflik'`.
  4. **`FAQ_ITEMS`:**
     - Memiliki tepat 6 pertanyaan & jawaban sesuai `FR-LP-09`, dan item ke-6 menjelaskan konsep *Non-Blocking Placement*.

---

### TASK-QA-03: Pengujian Audit Bebas Karakter *Em Dash* (`src/__tests__/no-em-dash.spec.ts`)
- **Referensi:** `AC-LP-05` & Bagian 4.4 PRD.
- **Tujuan:** Memastikan tidak ada satu pun berkas di dalam `src/` (`*.ts`, `*.tsx`, `*.astro`, `*.css`) yang mengandung karakter *em dash* (`\u2014`).
- **Asersi Wajib:**
  - Membaca secara rekursif seluruh berkas di dalam direktori `src/` (menggunakan `node:fs` dan `node:path`).
  - Memastikan setiap berkas tidak memiliki kecocokan terhadap `/\u2014/`.
  - Memastikan direktori `src/data/` dan `src/components/` telah ada dan tidak kosong.

---

### TASK-QA-04: Pengujian Komponen `ThemeToggle.tsx` (`src/__tests__/theme-toggle.test.tsx`)
- **Referensi:** `FR-LP-01`, `AC-LP-05`, `NFR-LP-03`, serta TDD Bab 4.2.
- **Berkas Target yang Diuji:** `src/components/layout/ThemeToggle.tsx`
- **Skenario & Asersi Wajib:**
  1. **Render & Aksesibilitas:** Merender `<button>` dengan `aria-label` yang jelas dan sudut tajam (`rounded-none`).
  2. **Klik Sakelar Tema:** Mengeklik tombol mengubah kelas `dark` pada `document.documentElement` dan memperbarui nilai `localStorage.getItem('schedovyn-theme')` antara `'dark'` dan `'light'`.
  3. **Pintasan Keyboard `D`:** Menekan tombol `d` atau `D` pada `window` mengganti tema secara instan.
  4. **Edge Case (Guard Fokus Input):** Saat fokus aktif berada di dalam elemen `<input>`, `<textarea>`, atau `<select>`, menekan tombol `d` atau `D` **tidak** mengubah tema.
  5. **Edge Case (Modifier Keys):** Menekan `Ctrl+D`, `Alt+D`, atau `Meta+D` **tidak** memicu pergantian tema.

---

### TASK-QA-05: Pengujian Astro Island `ConflictPlaygroundIsland.tsx` (`src/__tests__/conflict-playground.test.tsx`)
- **Referensi:** `FR-LP-04`, `AC-LP-03`, `AC-LP-05`, `NFR-LP-03`, serta TDD Bab 4.3.
- **Berkas Target yang Diuji:** `src/components/islands/ConflictPlaygroundIsland.tsx`
- **Skenario & Asersi Wajib:**
  1. **State Awal (`TEACHER_OVERLAP`):**
     - Menampilkan baris jadwal **Kelas VII-A** dan **Kelas VIII-A**.
     - Menampilkan lencana status **Konflik Ditemukan**, indikator kecepatan `< 5 ms`, kode `TEACHER_OVERLAP`, serta penjelasan bentrokan jam mengajar Pak Budi (`08:00 - 09:00` dan `08:30 - 09:30`).
  2. **Perpindahan ke Skenario 2 (`SEQUENTIAL_NO_CONFLICT`):**
     - Saat tombol skenario ke-2 diklik, tampilan beralih menampilkan sesi berurutan `08:00 - 09:00` dan `09:00 - 10:00`.
     - Menampilkan status bebas konflik (**Tidak Ada Konflik pada Data Saat Ini**) dan menegaskan bahwa sesi yang berbatasan tepat di pukul `09:00` tidak bertabrakan (`0` sesi berstatus konflik).
  3. **Perpindahan ke Skenario 3 (`BREAK_TIME_OVERLAP`):**
     - Saat tombol skenario ke-3 diklik, menampilkan peringatan irisan jam istirahat (`BREAK_TIME_OVERLAP`, `09:15 - 09:30`).
  4. **Perpindahan ke Skenario 4 / Resolusi Konflik Instan (`INSTANT_RESOLUTION`):**
     - Saat pengguna mengeklik tombol skenario ke-4 atau tombol aksi resolusi konflik cepat dari state konflik, status langsung berubah menjadi hijau (**Jadwal Lengkap dan Valid**).
  5. **Kepatuhan Desain & Aksesibilitas:**
     - Tombol skenario memiliki atribut `role="tab"` dan `aria-selected`.
     - Elemen rentang jam menggunakan kelas `tabular-nums` dan komponen menggunakan sudut tajam `rounded-none`.

---

### TASK-QA-06: Pengujian Astro Island `ExportShowcaseTabsIsland.tsx` (`src/__tests__/export-showcase-tabs.test.tsx`)
- **Referensi:** `FR-LP-06`, `AC-LP-04`, `NFR-LP-03`, serta TDD Bab 4.4.
- **Berkas Target yang Diuji:** `src/components/islands/ExportShowcaseTabsIsland.tsx`
- **Skenario & Asersi Wajib:**
  1. **Tab Default (Dokumen PDF Cetak Landscape):**
     - Menampilkan pratinjau matriks jadwal mingguan *landscape*, lencana status validasi, dan bagian daftar catatan konflik.
  2. **Perpindahan ke Tab Excel (`.xlsx`) Multi-Worksheet:**
     - Saat pengguna mengeklik tab Excel, menampilkan antarmuka *workbook* dengan ke-4 tab lembar kerja: **`Jadwal`**, **`Rekap Guru`**, **`Rekap Ruangan`**, dan **`Konflik`**.
     - Menampilkan informasi fitur **AutoFilter** dan keamanan **Sanitasi Formula**.
  3. **Interaksi Antar-Worksheet di dalam Tab Excel:**
     - Mengeklik masing-masing nama *worksheet* (`Rekap Guru`, `Rekap Ruangan`, `Konflik`) memperbarui tampilan kolom dan baris data pratinjau sesuai fungsi lembar kerja tersebut.

---

### TASK-QA-07: Pengujian Astro Island `FaqAccordionIsland.tsx` (`src/__tests__/faq-accordion.test.tsx`)
- **Referensi:** `FR-LP-09`, `NFR-LP-03`, serta TDD Bab 4.5.
- **Berkas Target yang Diuji:** `src/components/islands/FaqAccordionIsland.tsx`
- **Skenario & Asersi Wajib:**
  1. Merender seluruh 6 pertanyaan umum dari `FAQ_ITEMS`.
  2. Setiap pemicu pertanyaan berupa `<button>` dengan atribut `aria-expanded` dan `aria-controls`.
  3. Mengeklik pertanyaan membuka/menutup panel jawaban terkait secara akurat.
  4. Memastikan penjelasan mengenai alasan jadwal tetap diizinkan ditempatkan meskipun berkonflik (*Non-Blocking Placement*) dapat diakses dan tampil di dalam jawaban FAQ ke-6.

---

## Rincian Task Fase 3 (Setelah Implementasi Frontend Selesai)

### TASK-QA-08: Verifikasi Akhir Integrasi, Build Statis, & Regresi (Fase GREEN)
- **Referensi:** `AC-LP-01` s.d. `AC-LP-06`, `FR-LP-01` s.d. `FR-LP-10`, `NFR-LP-01` s.d. `NFR-LP-04`.
- **Langkah Eksekusi:**
  1. Tambahkan pengujian verifikasi struktur halaman (`src/__tests__/landing-page-sections.spec.ts`) yang memeriksa keberadaan dan kelengkapan konten pada berkas komponen `.astro` (`Navbar.astro`, `HeroSection.astro`, `TrustBar.astro`, `ProblemSolutionSection.astro`, `FeatureBentoGrid.astro`, `HowItWorksSection.astro`, `PrivacyArchitectureSection.astro`, `BottomCtaSection.astro`, `Footer.astro`, dan `BaseLayout.astro`).
  2. Jalankan seluruh *test suite*:
     ```bash
     pnpm run test
     ```
  3. Jalankan kompilasi produksi statis Astro:
     ```bash
     pnpm run build
     ```
  4. Verifikasi bahwa direktori `dist/` terbentuk dengan `0` error TypeScript, memiliki `dist/index.html`, serta total ukuran aset JS di `dist/_astro/` mematuhi target anggaran `< 40 kB` (gzip).
  5. Jalankan `codegraph sync` dan susun laporan hasil verifikasi akhir.
