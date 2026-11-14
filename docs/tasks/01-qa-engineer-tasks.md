# Daftar Task QA Engineer: Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Target Agen** | `[Schedovyn - Landing Page] Quality Assurance (QA) Engineer` (`.agents/agents/qa-engineer/agent.md`) |
| **Acuan Spesifikasi** | [docs/Schedovyn-PRD.md](../Schedovyn-PRD.md) (v1.1.0), [docs/Schedovyn-Landing-Page-PRD.md](../Schedovyn-Landing-Page-PRD.md) (v1.2.0), [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md) (v1.1.0), [DESIGN.md](../../DESIGN.md) |
| **Ruang Lingkup Berkas** | `vitest.config.ts`, `src/__tests__/**`, dan konfigurasi skrip test di `package.json` |
| **Package Manager** | `pnpm` (Dilarang menggunakan `npm`, `yarn`, atau `bun`) |

---

## Protokol Wajib Sebelum & Sesudah Eksekusi

1. **Eksplorasi `codegraph`:** Sebelum menulis atau memperbarui berkas pengujian, jalankan MCP tool `codegraph_explore` atau CLI `codegraph explore` untuk memeriksa struktur terkini di `src/`.
2. **Disiplin Fase RED:** Tulis atau perbarui pengujian berdasarkan kontrak di [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md) (v1.1.0) sebelum implementasi dibuat oleh Frontend Engineer. Pastikan test baru gagal (*FAIL / RED*) karena modul/komponen target belum diperbarui.
3. **Larangan Karakter *Em Dash*:** Pastikan seluruh berkas test yang Anda tulis bebas dari karakter tanda pisah panjang (`\u2014`) di dalam komentar maupun string non-asersi (gunakan escape unicode `\u2014` saat menulis regex pendeteksi *em dash*).
4. **Sinkronisasi `codegraph`:** Setelah selesai membuat atau memperbarui berkas test, jalankan `codegraph sync`.

---

## Rincian Task Iterasi Baru: Fitur Multi-Workspace (`FR-13` & `AC-LP-07`)

> **Prioritas Eksekusi Saat Ini:** Jalankan **`TASK-QA-WS-01`** (Fase RED) terlebih dahulu sebelum Frontend Engineer mengeksekusi implementasi `FR-13`, lalu jalankan **`TASK-QA-WS-02`** (Fase Verifikasi GREEN) setelah Frontend Engineer selesai.

### TASK-QA-WS-01: Pembaruan & Penambahan Test Fase RED untuk Fitur Multi-Workspace (`FR-13` & `AC-LP-07`)
- **Referensi:** `FR-LP-02`, `FR-LP-05`, `FR-LP-07`, `FR-LP-08`, `FR-LP-09`, `AC-LP-07`, serta TDD v1.1.0 Bab 3.1, 3.3, 3.4, 4.3, 4.6, dan Bab 5.
- **Berkas Test yang Diperbarui / Dibuat:**
  1. **`src/__tests__/data-contracts.spec.ts` (MODIFIKASI):**
     - **`SITE_CONFIG.workflowSteps`:** Tambahkan asersi bahwa langkah pertama (`stepNumber === '01'`) memuat kata kunci ruang kerja (`ruang kerja` atau `workspace` atau `semester`) pada `title`, `description`, atau `detail` sesuai `FR-LP-07`.
     - **`FEATURE_BENTO_ITEMS`:**
       - Ubah asersi jumlah kartu dari `toHaveLength(6)` menjadi **`toHaveLength(7)`**.
       - Tambahkan test atau asersi khusus yang memverifikasi keberadaan kartu dengan `id: 'multi-workspace-management'`, `badge: 'FR-13'`, dan `iconName: 'Layers'`.
       - Pastikan konten kartu `multi-workspace-management` mencantumkan konsep **Workspace Switcher**, mode duplikasi **Konfigurasi & Data Master Saja** serta **Salin Penuh**, mode inisialisasi **Ruang Kerja Kosong** / **Data Contoh**, dan isolasi **Undo/Redo** atau deteksi konflik.
       - Verifikasi bahwa total bobot kolom `colSpanClass` pada ke-7 kartu (`lg:col-span-2` = 2, `lg:col-span-1` = 1) berjumlah tepat `9` (3 baris penuh @ 3 kolom tanpa celah kosong).
     - **`FAQ_ITEMS`:**
       - Ubah asersi jumlah pertanyaan dari `toHaveLength(6)` menjadi **`toHaveLength(7)`**.
       - Tambahkan test khusus: *"item FAQ ke-7 menjelaskan fitur Multi-Ruang Kerja (FR-13) dan duplikasi semester secara lengkap"*, yang memastikan `FAQ_ITEMS[6]` (`id: 'faq-7'`) memuat pertanyaan seputar semester baru / simulasi jadwal dan jawabannya menjelaskan **Multi-Ruang Kerja** (atau *Multi-Workspace*), mode **Konfigurasi & Data Master Saja**, serta **Salin Penuh Beserta Jadwal**.
  2. **`src/__tests__/faq-accordion.test.tsx` (MODIFIKASI):**
     - Ubah asersi jumlah tombol pemicu akordeon dari `toHaveLength(6)` menjadi **`toHaveLength(7)`**.
     - Tambahkan skenario test baru: *"memastikan penjelasan fitur Multi-Ruang Kerja (FR-13) dan mode duplikasi semester dapat diakses pada jawaban pertanyaan ke-7"* (mengeklik `triggers[6]` lalu memeriksa kemunculan teks `/Konfigurasi & Data Master Saja/i` dan `/Salin Penuh/i`).
  3. **`src/__tests__/landing-page-sections.spec.ts` (BARU):**
     - Buat berkas test verifikasi komponen seksi `.astro` (membaca source/template `.astro` di `src/components/sections/`) untuk memvalidasi `AC-LP-07`:
       - `HeroSection.astro`: Memuat indikator **Ruang Kerja Aktif** (*Workspace Switcher*, misal teks `Ruang Kerja` dan `Semester Ganjil`) di samping indikator `Kelas Aktif`.
       - `FeatureBentoGrid.astro`: Mengimpor dan merender ikon `Layers` dari `lucide-react` untuk kartu `FR-13`.
       - `PrivacyArchitectureSection.astro`: Mencantumkan penjelasan isolasi **multi-ruang kerja** (*multi-workspace*) di IndexedDB dan pemulihan otomatis ruang kerja aktif terakhir.
- **Kriteria Selesai Fase RED (DoD):**
  - Jalankan `pnpm run test` dan pastikan test yang baru diperbarui/ditambahkan berstatus **FAIL (RED)** karena berkas `src/data/*.ts` dan `src/components/**` belum diperbarui ke spesifikasi `FR-13`.
  - Jalankan `codegraph sync`.

---

### TASK-QA-WS-02: Verifikasi Akhir Fase GREEN & Regresi Multi-Workspace (`AC-LP-01` s.d. `AC-LP-07`)
- **Prasyarat:** Frontend Engineer telah menyelesaikan `TASK-FE-WS-01` s.d. `TASK-FE-WS-03`.
- **Langkah Eksekusi:**
  1. Jalankan seluruh *test suite* (`pnpm run test`) dan pastikan seluruh berkas pengujian (`data-contracts.spec.ts`, `no-em-dash.spec.ts`, `theme-toggle.test.tsx`, `conflict-playground.test.tsx`, `export-showcase-tabs.test.tsx`, `faq-accordion.test.tsx`, dan `landing-page-sections.spec.ts`) lulus **100% PASS (GREEN)**.
  2. Jalankan `pnpm run build` (`astro build`) dan pastikan kompilasi statis ke `dist/` berhasil dengan `0` error TypeScript.
  3. Periksa `dist/index.html` untuk memastikan kartu ke-7 (`FR-13`), *Workspace Switcher* pada *Hero Mockup*, dan 7 item FAQ ter-render di hasil build produksi.
  4. Jalankan `codegraph sync` dan laporkan hasil verifikasi akhir.

---

## Referensi Task Fondasi Awal (`TASK-QA-01` s.d. `TASK-QA-08`)

### TASK-QA-01: Setup Infrastruktur Pengujian (Vitest & React Testing Library)
- Menyiapkan `vitest.config.ts` dengan `@vitejs/plugin-react`, `environment: "jsdom"`, `globals: true`, dan `setupFiles: ["./src/__tests__/setup.ts"]`.

### TASK-QA-02: Pengujian Kontrak Data Terstruktur (`src/__tests__/data-contracts.spec.ts`)
- Menguji `SITE_CONFIG`, `SIMULATION_SCENARIOS` (4 skenario), `FEATURE_BENTO_ITEMS` (7 kartu fitur `FR-01` s.d. `FR-13` & PWA), `EXPORT_SHOWCASE_TABS` (PDF & Excel 4 sheet), serta `FAQ_ITEMS` (7 pertanyaan).

### TASK-QA-03: Pengujian Audit Bebas Karakter *Em Dash* (`src/__tests__/no-em-dash.spec.ts`)
- Memastikan 0 kemunculan karakter `\u2014` di seluruh berkas `src/` (`*.ts`, `*.tsx`, `*.astro`, `*.css`).

### TASK-QA-04: Pengujian Komponen `ThemeToggle.tsx` (`src/__tests__/theme-toggle.test.tsx`)
- Menguji klik tombol tema, sinkronisasi `localStorage`, pintasan keyboard `D`, serta guard fokus elemen input dan modifier keys.

### TASK-QA-05: Pengujian Astro Island `ConflictPlaygroundIsland.tsx` (`src/__tests__/conflict-playground.test.tsx`)
- Menguji ke-4 skenario (`TEACHER_OVERLAP`, `SEQUENTIAL_NO_CONFLICT` pukul `08:00 - 09:00` & `09:00 - 10:00`, `BREAK_TIME_OVERLAP`, dan `INSTANT_RESOLUTION`).

### TASK-QA-06: Pengujian Astro Island `ExportShowcaseTabsIsland.tsx` (`src/__tests__/export-showcase-tabs.test.tsx`)
- Menguji perpindahan Tab PDF Landscape vs Tab Excel 4 Worksheet (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, `Konflik`), fitur AutoFilter, dan Sanitasi Formula.

### TASK-QA-07: Pengujian Astro Island `FaqAccordionIsland.tsx` (`src/__tests__/faq-accordion.test.tsx`)
- Menguji render 7 pertanyaan umum, atribut aksesibilitas `aria-expanded` & `aria-controls`, penjelasan *Non-Blocking Placement* (FAQ ke-6), dan penjelasan *Multi-Ruang Kerja `FR-13`* (FAQ ke-7).

### TASK-QA-08: Verifikasi Akhir Integrasi, Build Statis, & Regresi
- Memastikan seluruh test suite dan `pnpm run build` lulus tanpa error serta anggaran JS `< 40 kB` (gzip) terjaga.
