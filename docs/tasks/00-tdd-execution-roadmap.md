# Peta Eksekusi TDD (Master Roadmap): Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Proyek** | Schedovyn Landing Page (Marketing & Product Showcase Web) |
| **Acuan Utama** | [docs/Schedovyn-Landing-Page-PRD.md](../Schedovyn-Landing-Page-PRD.md), [docs/Schedovyn-Landing-Page-TDD.md](../Schedovyn-Landing-Page-TDD.md), [DESIGN.md](../../DESIGN.md) |
| **Metode Pengembangan** | Test-Driven Development (RED -> GREEN -> REFACTOR) |
| **Package Manager** | `pnpm` (Wajib untuk seluruh instalasi dan eksekusi skrip) |

---

## 1. Alur Kolaborasi Agen (TDD Lifecycle)

```mermaid
flowchart LR
    PA["1. Product Architect\n(PRD, TDD, DESIGN.md, & Task Breakdown)"] --> QA_RED["2. QA Engineer (Fase RED)\n(TASK-QA-01 s.d. TASK-QA-07)"]
    QA_RED --> FE_GREEN["3. Frontend Engineer (Fase GREEN)\n(TASK-FE-01 s.d. TASK-FE-07)"]
    FE_GREEN --> QA_VERIFY["4. QA Engineer (Fase Verifikasi)\n(TASK-QA-08: Full Regression & Build)"]
```

1. **Fase 1 - Spesifikasi Pengujian / RED ([01-qa-engineer-tasks.md](01-qa-engineer-tasks.md)):**
   - **QA Engineer** menyiapkan infrastruktur pengujian Vitest + React Testing Library (`TASK-QA-01`) dan menulis seluruh berkas pengujian (`TASK-QA-02` s.d. `TASK-QA-07`) di `src/__tests__/`.
   - Pengujian pada tahap ini **wajib gagal (RED)** karena modul data (`src/data/*.ts`) dan komponen (`src/components/**`) belum diimplementasikan.
   - Setelah selesai menulis test, QA Engineer menjalankan `codegraph sync` dan menyerahkan eksekusi ke Frontend Engineer.
2. **Fase 2 - Implementasi Produk / GREEN ([02-frontend-engineer-tasks.md](02-frontend-engineer-tasks.md)):**
   - **Frontend Engineer** mengimplementasikan konfigurasi Tailwind CSS v4 `radix-lyra` (`TASK-FE-01`), kontrak data (`TASK-FE-02`), komponen primitif UI (`TASK-FE-03`), ke-4 Astro Islands React 19 (`TASK-FE-04`), kerangka `BaseLayout.astro` + `Navbar.astro` + `Footer.astro` (`TASK-FE-05`), ke-7 seksi statis `.astro` (`TASK-FE-06`), serta merakit `src/pages/index.astro` (`TASK-FE-07`).
   - Frontend Engineer wajib memastikan seluruh test unit/komponen berstatus **PASS (GREEN)** (`pnpm run test`) dan kompilasi statis (`pnpm run build`) berhasil tanpa error TypeScript.
3. **Fase 3 - Verifikasi Akhir & Quality Gate ([01-qa-engineer-tasks.md](01-qa-engineer-tasks.md#task-qa-08-verifikasi-akhir-integrasi-build-statis--regresi-fase-green)):**
   - **QA Engineer** menjalankan verifikasi menyeluruh (`TASK-QA-08`) atas hasil build statis di `dist/`, memastikan seluruh kriteria penerimaan `AC-LP-01` s.d. `AC-LP-06`, persyaratan fungsional `FR-LP-01` s.d. `FR-LP-10`, dan persyaratan non-fungsional `NFR-LP-01` s.d. `NFR-LP-04` terpenuhi 100%.

---

## 2. Daftar Dokumen Task

| Berkas Task | Agen Penanggung Jawab | Ringkasan Cakupan |
|---|---|---|
| **[docs/tasks/01-qa-engineer-tasks.md](01-qa-engineer-tasks.md)** | `[Schedovyn - Landing Page] Quality Assurance (QA) Engineer` | `TASK-QA-01` s.d. `TASK-QA-08`: Setup Vitest, test kontrak data, audit bebas *em dash*, test 4 Astro Islands (`ThemeToggle`, `ConflictPlaygroundIsland`, `ExportShowcaseTabsIsland`, `FaqAccordionIsland`), dan verifikasi hasil build statis `dist/`. |
| **[docs/tasks/02-frontend-engineer-tasks.md](02-frontend-engineer-tasks.md)** | `[Schedovyn - Landing Page] Frontend Engineer` | `TASK-FE-01` s.d. `TASK-FE-07`: Setup Astro + React 19 + Tailwind CSS v4 (`radix-lyra`), implementasi `src/data/*.ts`, `src/components/ui/`, 4 React Islands, `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, 7 seksi statis `.astro`, dan perakitan `src/pages/index.astro`. |

---

## 3. Matriks Keterlacakan Persyaratan (Requirement Traceability Matrix)

| ID Persyaratan | Deskripsi Singkat | Task Frontend Engineer | Task QA Engineer |
|---|---|---|---|
| **FR-LP-01** | Header & Navigasi Sticky (`Navbar.astro` + `ThemeToggle.tsx`) | `TASK-FE-04`, `TASK-FE-05` | `TASK-QA-02`, `TASK-QA-04`, `TASK-QA-08` |
| **FR-LP-02** | Hero Section, *Trust Bar*, & *Hero Mockup* 3 Panel Editor | `TASK-FE-02`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **FR-LP-03** | Seksi Masalah vs Solusi (`< 5 ms`, 4 Status Validasi) | `TASK-FE-02`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **FR-LP-04** | Astro Island Simulasi Interaktif Deteksi Konflik (4 Skenario) | `TASK-FE-02`, `TASK-FE-04` | `TASK-QA-02`, `TASK-QA-05` |
| **FR-LP-05** | Sorotan Fitur Lengkap dalam *Bento Grid* (6 Kartu Kemampuan) | `TASK-FE-02`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **FR-LP-06** | Astro Island Pameran Hasil Ekspor (PDF Landscape vs Excel 4 Sheet) | `TASK-FE-02`, `TASK-FE-04` | `TASK-QA-02`, `TASK-QA-06` |
| **FR-LP-07** | Seksi Alur Kerja 4 Langkah (`HowItWorksSection.astro`) | `TASK-FE-02`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **FR-LP-08** | Seksi Arsitektur Privasi & Penyimpanan Lokal IndexedDB | `TASK-FE-02`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **FR-LP-09** | Astro Island Pertanyaan Umum 6 Poin (`FaqAccordionIsland.tsx`) | `TASK-FE-02`, `TASK-FE-04` | `TASK-QA-02`, `TASK-QA-07` |
| **FR-LP-10** | Banner Penutup (`BottomCtaSection.astro`) & `Footer.astro` | `TASK-FE-05`, `TASK-FE-06` | `TASK-QA-08` |
| **AC-LP-01 & NFR-LP-01** | Kompilasi `pnpm run build` ke `dist/` (0 error TS, `< 40 kB` gzip JS) | `TASK-FE-01`, `TASK-FE-07` | `TASK-QA-08` |
| **AC-LP-02 & AC-LP-06** | Tautan CTA `PUBLIC_APP_URL` & `PUBLIC_GUIDE_URL` di Header, Hero, & Footer | `TASK-FE-02`, `TASK-FE-05`, `TASK-FE-06` | `TASK-QA-02`, `TASK-QA-08` |
| **AC-LP-03** | Pembuktian `TEACHER_OVERLAP` merah & Sesi Berurutan (`08:00 - 09:00` & `09:00 - 10:00`) bebas konflik | `TASK-FE-02`, `TASK-FE-04` | `TASK-QA-05` |
| **AC-LP-04** | Perpindahan Tab PDF Landscape vs Tab Excel 4 Worksheet | `TASK-FE-02`, `TASK-FE-04` | `TASK-QA-06` |
| **AC-LP-05** | Tema Terang/Gelap + pintasan `D`, desain `radix-lyra` (`rounded-none`, `tabular-nums`), & bebas *em dash* | `TASK-FE-01` s.d. `TASK-FE-07` | `TASK-QA-03`, `TASK-QA-04`, `TASK-QA-08` |
| **NFR-LP-02, 03, 04** | Responsif `360px` s.d. `1440px+`, Aksesibilitas Keyboard WCAG AA, *Zero External Tracking* | `TASK-FE-04` s.d. `TASK-FE-07` | `TASK-QA-04` s.d. `TASK-QA-08` |
