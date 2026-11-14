# Daftar Task Frontend Engineer: Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Target Agen** | `[Schedovyn - Landing Page] Frontend Engineer` (`.agents/agents/frontend-engineer/agent.md`) |
| **Acuan Spesifikasi** | [docs/Schedovyn-PRD.md](../Schedovyn-PRD.md) (v1.1.0), [docs/Schedovyn-Landing-Page-PRD.md](../Schedovyn-Landing-Page-PRD.md) (v1.2.0), [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md) (v1.1.0), [DESIGN.md](../../DESIGN.md) |
| **Prasyarat** | QA Engineer telah menyelesaikan pembaruan test Fase RED (`TASK-QA-WS-01`) di `src/__tests__/` |
| **Package Manager** | `pnpm` (Dilarang menggunakan `npm`, `yarn`, atau `bun`) |

---

## Protokol Wajib Sebelum & Sesudah Eksekusi

1. **Eksplorasi `codegraph` & Baca Test QA:** Sebelum menulis kode implementasi, jalankan MCP tool `codegraph_explore` (atau CLI `codegraph explore`) dan baca berkas pengujian di `src/__tests__/` agar seluruh nama ekspor, struktur data, teks label, dan atribut ARIA 100% selaras dengan kontrak test.
2. **Patuhi Aturan Ketat Proyek:**
   - **Zero `any` Policy:** Gunakan tipe TypeScript eksplisit dan ketat (`strict: true`).
   - **Estetika `radix-lyra` ([DESIGN.md](../../DESIGN.md)):** Gunakan sudut tajam `rounded-none` (`0px`), garis batas `1px` (`border-border`), warna aksen Indigo-Blue (`#1547E6` / `oklch(0.488 0.243 264.376)`), 4 warna semantik status validasi, serta kelas `tabular-nums` pada setiap angka, jam pelajaran (`08:00 - 09:00`), nomor langkah (`01` s.d. `04`), dan metrik kecepatan (`< 5 ms`).
   - **Larangan Keras Karakter *Em Dash* (`\u2014`):** Dilarang menggunakan karakter tanda pisah panjang pada berkas `.ts`, `.tsx`, `.astro`, maupun `.css`. Gunakan tanda hubung biasa (`-`), titik dua (`:`), atau pemisahan kalimat.
   - **Jangan Melemahkan Test:** Dilarang mengubah atau menghapus asersi di `src/__tests__/`.
3. **Sinkronisasi `codegraph`:** Setelah selesai mengimplementasikan seluruh komponen dan memastikan `pnpm run test` serta `pnpm run build` lulus, wajib jalankan `codegraph sync`.

---

## Rincian Task Iterasi Baru: Implementasi Fitur Multi-Workspace (`FR-13` & `AC-LP-07`)

> **Prioritas Eksekusi Saat Ini:** Kerjakan **`TASK-FE-WS-01`** s.d. **`TASK-FE-WS-03`** untuk mengubah seluruh test Fase RED dari `TASK-QA-WS-01` menjadi **PASS (GREEN)**.

### TASK-FE-WS-01: Pembaruan Kontrak Data untuk Fitur Multi-Workspace (`src/data/*.ts`)
- **Referensi:** PRD v1.2.0 (`FR-LP-05`, `FR-LP-07`, `FR-LP-09`, `AC-LP-07`) & TDD v1.1.0 Bab 3.1, 3.3, dan 3.4.
- **Berkas yang Dimodifikasi:**
  1. **`src/data/site-config.ts`:**
     - Perbarui item pertama pada `workflowSteps` (`stepNumber: '01'`):
       - `title`: `'Siapkan Ruang Kerja, Jam Sekolah & Istirahat'`
       - `description`: `'Buat ruang kerja baru atau gandakan data master dari semester sebelumnya, lalu tentukan hari sekolah aktif (5 atau 6 hari), jam pulang khusus hari Jumat, dan jeda istirahat.'`
       - `highlightTag`: `'Ruang Kerja & Jam'`
       - `detail`: `'Dukung multi-ruang kerja (Kosong, Data Contoh, atau Kloning Semester) dengan interval snap grid 15 hingga 60 menit.'`
  2. **`src/data/features.ts`:**
     - Perbarui `FEATURE_BENTO_ITEMS` agar memuat **7 kartu fitur** (`FR-01` s.d. `FR-13` & PWA) dengan tata letak 3 baris penuh @ 3 kolom (`lg:grid-cols-3`, total bobot kolom = `9`):
       - Kartu 1 (`flexible-time-config`): `colSpanClass: 'lg:col-span-2'`, `badge: 'FR-01'`, `iconName: 'Clock'`.
       - Kartu 2 (`master-data-contrast`): `colSpanClass: 'lg:col-span-1'`, `badge: 'FR-02 & FR-03'`, `iconName: 'Users'`.
       - Kartu 3 (`parallel-class-copy`): `colSpanClass: 'lg:col-span-1'`, `badge: 'FR-12'`, `iconName: 'Copy'`.
       - **Kartu 4 Baru (`multi-workspace-management`):**
         ```ts
         {
           id: 'multi-workspace-management',
           badge: 'FR-13',
           title: 'Pengelolaan Multi-Ruang Kerja & Duplikasi Semester',
           description: 'Kelola beberapa ruang kerja terpisah di satu peramban untuk memisahkan jadwal antar-semester, tahun ajaran, atau skenario simulasi jadwal.',
           details: [
             'Workspace Switcher instan di header dengan isolasi penuh deteksi konflik dan riwayat Undo/Redo per ruang kerja',
             'Duplikasi ruang kerja (Clone Workspace): pilih mode Konfigurasi & Data Master Saja untuk semester baru atau Salin Penuh Beserta Jadwal',
             'Inisialisasi fleksibel (Ruang Kerja Kosong atau Muat Data Contoh) dan pemulihan otomatis ruang kerja aktif terakhir',
           ],
           colSpanClass: 'lg:col-span-2',
           iconName: 'Layers',
         }
         ```
       - Kartu 5 (`undo-redo-history`): ubah `colSpanClass` menjadi `'lg:col-span-1'`, `badge: 'FR-07'`, `iconName: 'History'`.
       - Kartu 6 (`local-first-storage`): ubah `colSpanClass` menjadi `'lg:col-span-1'`, `badge: 'FR-10 & PWA'`, `iconName: 'Database'`.
       - Kartu 7 (`keyboard-first-accessibility`): `colSpanClass: 'lg:col-span-1'`, `badge: 'FR-04 & Aksesibilitas'`, `iconName: 'Keyboard'`.
  3. **`src/data/faqs.ts`:**
     - Tambahkan item pertanyaan ke-7 (`id: 'faq-7'`) ke dalam `FAQ_ITEMS`:
       ```ts
       {
         id: 'faq-7',
         category: 'Multi-Ruang Kerja & Semester Baru',
         question: 'Bagaimana cara menyiapkan jadwal untuk semester baru atau membuat simulasi jadwal tanpa merusak jadwal yang sedang berjalan?',
         answer: 'Schedovyn dilengkapi fitur Pengelolaan Multi-Ruang Kerja (Multi-Workspace). Melalui Workspace Switcher di bagian atas aplikasi, Anda dapat membuat banyak ruang kerja terpisah di satu peramban. Saat memasuki semester baru, gunakan fitur Duplikasi Ruang Kerja (Clone Workspace) dengan mode Konfigurasi & Data Master Saja agar seluruh data jam belajar, kelas, guru, mata pelajaran, dan ruangan langsung tersalin dengan jadwal kosong tanpa perlu mengetik ulang. Jika ingin bereksperimen menguji variasi jadwal, pilih mode Salin Penuh Beserta Jadwal yang terisolasi penuh di IndexedDB.',
       }
       ```
- **Verifikasi Antara:** Jalankan `pnpm run test src/__tests__/data-contracts.spec.ts` hingga berstatus **PASS**.

---

### TASK-FE-WS-02: Pembaruan Komponen Island & Seksi Statis Astro (`HeroSection`, `FeatureBentoGrid`, `PrivacyArchitectureSection`, `FaqAccordionIsland`)
- **Referensi:** PRD v1.2.0 (`FR-LP-02`, `FR-LP-05`, `FR-LP-08`, `FR-LP-09`, `AC-LP-07`) & TDD v1.1.0 Bab 4.3 & 4.6.
- **Berkas yang Dimodifikasi:**
  1. **`src/components/islands/FaqAccordionIsland.tsx`:**
     - Pastikan state `openIds` diinisialisasi secara dinamis dari `FAQ_ITEMS` (atau mencakup `'faq-7': false`) sehingga seluruh 7 pertanyaan dari `FAQ_ITEMS` dapat dibuka dan ditutup dengan mulus.
  2. **`src/components/sections/FeatureBentoGrid.astro`:**
     - Impor ikon `Layers` dari `lucide-react`.
     - Tambahkan kondisi render `{item.iconName === 'Layers' && <Layers className="h-4.5 w-4.5" aria-hidden="true" />}` agar kartu ke-4 (`multi-workspace-management` / `FR-13`) menampilkan ikon secara presisi.
     - Perbarui sub-headline seksi agar turut menyebutkan pengelolaan multi-ruang kerja antar-semester.
  3. **`src/components/sections/HeroSection.astro`:**
     - Pada bilah atas (*Toolbar Mockup* 3 Panel Editor), tambahkan elemen visual **Pemilih Ruang Kerja Aktif (*Workspace Switcher*)** di sebelah kiri pemilih *Kelas Aktif*, misalnya:
       - Label `Ruang Kerja:` dengan badge/kotak `SMPN 1 Nusantara - Semester Ganjil` (menggunakan ikon `Layers` atau `FolderKanban` dari `lucide-react`), diikuti pemilih `Kelas Aktif: Kelas VII-A` dan indikator `Tersimpan di browser`.
  4. **`src/components/sections/PrivacyArchitectureSection.astro`:**
     - Perbarui kartu ke-2 (*Penyimpanan Terisolasi di IndexedDB*) dan kartu anjuran cadangan untuk menjelaskan bahwa IndexedDB menyimpan **multi-ruang kerja (*multi-workspace*) yang saling terisolasi** beserta pemulihan otomatis ruang kerja aktif terakhir, serta menegaskan bahwa fitur kloning ruang kerja (*Salin Penuh*) menjaga skenario di dalam peramban yang sama sementara ekspor PDF/Excel digunakan sebagai arsip eksternal.

---

### TASK-FE-WS-03: Verifikasi Test Suite, Static Build, & Sinkronisasi Codegraph
- **Langkah Eksekusi:**
  1. Jalankan seluruh unit, component, dan section test:
     ```bash
     pnpm run test
     ```
     Pastikan seluruh test (termasuk `no-em-dash.spec.ts`, `data-contracts.spec.ts`, `faq-accordion.test.tsx`, dan `landing-page-sections.spec.ts`) berstatus **PASS (GREEN)**.
  2. Jalankan kompilasi statis produksi:
     ```bash
     pnpm run build
     ```
     Pastikan `astro build` selesai dengan `0` error TypeScript.
  3. Jalankan `codegraph sync` untuk memperbarui indeks *knowledge graph*.

---

## Referensi Task Fondasi Awal (`TASK-FE-01` s.d. `TASK-FE-07`)

### TASK-FE-01: Konfigurasi Astro, React 19, Tailwind CSS v4 (`radix-lyra`), & Font Lokal
- Konfigurasi `astro.config.mjs`, `tsconfig.json`, dan token warna OKLCH `radix-lyra` di `src/styles/global.css`.

### TASK-FE-02: Implementasi Lapisan Data Terstruktur (`src/data/*.ts`)
- Implementasi `site-config.ts`, `simulation-scenarios.ts`, `features.ts`, dan `faqs.ts`.

### TASK-FE-03: Implementasi Utilitas & Komponen Primitif `radix-lyra` (`src/components/ui/`)
- Implementasi `src/lib/utils.ts`, `button.tsx`, `badge.tsx`, dan `card.tsx`.

### TASK-FE-04: Implementasi 4 Komponen Astro Islands Interaktif (React 19)
- Implementasi `ThemeToggle.tsx` (`client:load`), `ConflictPlaygroundIsland.tsx` (`client:visible`), `ExportShowcaseTabsIsland.tsx` (`client:visible`), dan `FaqAccordionIsland.tsx` (`client:visible`).

### TASK-FE-05: Implementasi `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, & Aset Publik
- Implementasi kerangka HTML SEO/JSON-LD, navigasi sticky, footer ekosistem, dan aset publik di `public/`.

### TASK-FE-06: Implementasi 7 Komponen Seksi Statis Astro (`0 KB JS`)
- Implementasi `TrustBar.astro`, `HeroSection.astro`, `ProblemSolutionSection.astro`, `FeatureBentoGrid.astro`, `HowItWorksSection.astro`, `PrivacyArchitectureSection.astro`, dan `BottomCtaSection.astro`.

### TASK-FE-07: Perakitan `src/pages/index.astro` & Verifikasi Build
- Merakit seluruh seksi dan Astro Islands pada halaman utama serta memverifikasi hasil build statis.
