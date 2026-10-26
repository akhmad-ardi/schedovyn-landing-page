## Development

When starting the dev server, use background mode:

```bash
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

---

# Schedovyn Landing Page - AI Agents Protocol & Guidelines

Dokumen ini menetapkan aturan main global, protokol operasional, siklus pengembangan berbasis **Test-Driven Development (TDD)**, serta standar arsitektur dan desain bagi seluruh *AI Agents* yang bekerja di repositori **Schedovyn Landing Page**.

---

## 1. Sumber Kebenaran (Source of Truth) & Tujuan Proyek

1. **Dokumen Acuan Utama:**
   - [docs/Schedovyn-Landing-Page-PRD.md](docs/Schedovyn-Landing-Page-PRD.md) (Product Requirements Document v1.1.0)
   - `docs/Schedovyn-Landing-Page-TDD.md` (Technical Design Document, bila tersedia)
2. **Misi Produk:**
   - Membangun situs *Landing Page* mandiri (*High-Converting Single-Page Marketing & Product Showcase Web*) berbasis **Astro** (`output: "static"`) yang dipadukan dengan **Astro Islands (React 19)** untuk memperkenalkan **Schedovyn (*Smart Timetable Planner*)** kepada Kepala Sekolah, Wakil Kepala Sekolah Bidang Kurikulum, Staf Tata Usaha/Kurikulum, dan Guru Penyusun Jadwal.
   - Mendemonstrasikan secara interaktif keunggulan utama Schedovyn: **100% Client-Side & Local-First (Tanpa Login & Tanpa Server)**, **Deteksi Konflik Lintas Kelas Otomatis (`< 5 ms`)**, **4 Status Validasi Transparan**, **PWA Offline**, serta **Ekspor PDF Landscape & Excel Multi-Worksheet**.

---

## 2. Protokol Wajib `codegraph` & Package Manager (`pnpm`)

### 2.1 Aturan Wajib `codegraph`
Setiap *Agent* **WAJIB** menggunakan `codegraph` (bukan `graphify`) untuk menjaga konteks struktur *codebase*:
1. **Inisialisasi:** Jika direktori `.codegraph/` belum ada di *root* proyek, jalankan `codegraph init` terlebih dahulu.
2. **SEBELUM Melakukan Task:** Jalankan MCP tool `codegraph_explore` atau perintah CLI `codegraph explore "<simbol atau modul>"`, `codegraph query "<kata kunci>"`, atau `codegraph context "<deskripsi tugas>"` untuk memahami struktur berkas, kontrak data, dan relasi antar-komponen sebelum membuat atau memodifikasi berkas.
3. **SESUDAH Menyelesaikan Task:** Setelah selesai menulis atau mengubah kode, wajib menjalankan `codegraph sync` agar *knowledge graph* selalu mutakhir untuk agen berikutnya.

### 2.2 Aturan Wajib `pnpm`
- Seluruh instalasi paket, manajemen dependensi, dan eksekusi skrip **wajib menggunakan pnpm** (`pnpm install`, `pnpm add`, `pnpm run dev`, `pnpm run build`, `pnpm run test`).
- Dilarang menggunakan `npm`, `yarn`, atau `bun`.

---

## 3. Siklus Pengembangan TDD & Spesifikasi Agen

Pengembangan mengikuti alur **TDD (Red - Green - Refactor)** melalui kolaborasi tiga agen spesialis di `.agents/agents/`:

### A. `[Schedovyn - Landing Page] Product Manager & Software Architect`
- **Lokasi Definisi:** [.agents/agents/product-architect/agent.md](.agents/agents/product-architect/agent.md)
- **Tanggung Jawab:**
  - Menyusun dan memperbarui PRD/TDD di `docs/*.md`.
  - Merancang kontrak tipe TypeScript (tanpa `any`) untuk data terstruktur (`src/data/features.ts`, `src/data/simulation-scenarios.ts`, `src/data/faqs.ts`), batas arsitektur *Astro Static Components* (`0 KB JS`) vs *React 19 Interactive Islands* (`client:load` / `client:visible`), serta konfigurasi `PUBLIC_APP_URL` dan `PUBLIC_GUIDE_URL`.
  - Menyusun *task breakdown* terstruktur untuk QA Engineer dan Frontend Engineer.

### B. `[Schedovyn - Landing Page] Quality Assurance (QA) Engineer`
- **Lokasi Definisi:** [.agents/agents/qa-engineer/agent.md](.agents/agents/qa-engineer/agent.md)
- **Tanggung Jawab:**
  - **Fase 1 - RED:** Menulis *automated test suite* menggunakan **Vitest** dan **`@testing-library/react`** (serta Playwright bila diperlukan) di `src/__tests__/` sebelum implementasi dibuat, lalu memverifikasi bahwa test gagal (*FAIL*) karena alasan yang tepat.
  - **Fase 3 - Verifikasi GREEN & Regresi:** Memvalidasi seluruh pemenuhan `FR-LP-01` s.d. `FR-LP-10`, `NFR-LP-01` s.d. `NFR-LP-04`, dan `AC-LP-01` s.d. `AC-LP-06`, termasuk kepatuhan larangan karakter *em dash* (`—`) dan keberhasilan `pnpm run build` (`astro build`).

### C. `[Schedovyn - Landing Page] Frontend Engineer`
- **Lokasi Definisi:** [.agents/agents/frontend-engineer/agent.md](.agents/agents/frontend-engineer/agent.md)
- **Tanggung Jawab:**
  - **Fase 2 - GREEN & Refactor:** Mengimplementasikan kerangka `BaseLayout.astro`, komponen layout (`Navbar.astro`, `Footer.astro`, `ThemeToggle.tsx`), seksi statis Astro (`src/components/sections/*.astro`), Astro Islands interaktif React 19 (`ConflictPlaygroundIsland.tsx`, `ExportShowcaseTabsIsland.tsx`, `FaqAccordionIsland.tsx`), komponen primitif `radix-lyra` (`src/components/ui/`), data terstruktur (`src/data/*.ts`), dan styling Tailwind CSS v4 (`src/styles/global.css`) hingga seluruh test berstatus **PASS (GREEN)** dan situs berhasil dikompilasi ke `dist/`.

---

## 4. Arsitektur Teknis & Struktur Direktori

```text
schedovyn-landing-page/
├── public/
│   ├── favico.svg                  # Ikon resmi Schedovyn
│   ├── og-cover.png                # Gambar pratinjau OpenGraph (1200x630)
│   └── robots.txt
├── src/
│   ├── __tests__/                  # Unit, Component, & Content Verification Tests (Vitest)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro        # Header sticky & navigasi jangkar (FR-LP-01)
│   │   │   ├── Footer.astro        # Footer & tautan ekosistem Schedovyn (FR-LP-10)
│   │   │   └── ThemeToggle.tsx     # Island (client:load) sakelar tema Terang/Gelap + pintasan 'D'
│   │   ├── sections/               # Komponen Astro statis (0 KB JS)
│   │   │   ├── HeroSection.astro               # (FR-LP-02)
│   │   │   ├── TrustBar.astro                  # (FR-LP-02)
│   │   │   ├── ProblemSolutionSection.astro    # (FR-LP-03)
│   │   │   ├── FeatureBentoGrid.astro          # (FR-LP-05)
│   │   │   ├── HowItWorksSection.astro         # (FR-LP-07)
│   │   │   ├── PrivacyArchitectureSection.astro# (FR-LP-08)
│   │   │   └── BottomCtaSection.astro          # (FR-LP-10)
│   │   ├── islands/                # Komponen React 19 Interaktif (Astro Islands)
│   │   │   ├── ConflictPlaygroundIsland.tsx    # (client:visible) Simulasi 4 skenario konflik (FR-LP-04)
│   │   │   ├── ExportShowcaseTabsIsland.tsx    # (client:visible) Pratinjau PDF vs Excel 4 sheet (FR-LP-06)
│   │   │   └── FaqAccordionIsland.tsx          # (client:visible) Akordeon tanya jawab 6 poin (FR-LP-09)
│   │   └── ui/                     # Komponen primitif radix-lyra (Button, Card, Badge, Tabs)
│   ├── data/
│   │   ├── features.ts             # Data terstruktur fitur FR-01 s.d. FR-12 & PWA
│   │   ├── simulation-scenarios.ts # Data jadwal & 4 skenario konflik untuk mini-playground
│   │   └── faqs.ts                 # Daftar 6 pertanyaan & jawaban FAQ
│   ├── layouts/
│   │   └── BaseLayout.astro        # Kerangka HTML, meta SEO, JSON-LD, & skrip anti-FOUC tema
│   ├── pages/
│   │   └── index.astro             # Halaman utama Landing Page
│   └── styles/
│       └── global.css              # Konfigurasi Tailwind CSS v4 & variabel tema OKLCH radix-lyra
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### Variabel Lingkungan Lintas Proyek (`Environment Variables`)
- `PUBLIC_APP_URL`: URL menuju aplikasi utama Schedovyn (default fallback contoh: `https://app.schedovyn.com`).
- `PUBLIC_GUIDE_URL`: URL menuju Portal Panduan Pemakaian (default fallback contoh: `https://guide.schedovyn.com`).

---

## 5. Prinsip Desain `radix-lyra`, Copywriting, & Batasan Proyek

1. **Estetika Architectural Technical Grid (`radix-lyra`):**
   - Wajib menggunakan sudut tajam (`rounded-none` / `0px`) pada seluruh kartu, tombol, lencana, pratinjau komponen, dan bingkai seksi.
   - Menggunakan garis pembatas presisi `1px` (`border-border`) yang mencerminkan presisi cetak biru jadwal akademik.
   - Dilarang menggunakan *inline styles*; gunakan kelas utilitas Tailwind CSS v4.
2. **Tipografi & Hierarki Angka:**
   - Heading: `'Figtree Variable'` (`@fontsource-variable/figtree`).
   - Body: `'Inter Variable'` (`@fontsource-variable/inter`).
   - Wajib menerapkan kelas `tabular-nums` pada seluruh angka statistik, rentang jam pelajaran (`07:30 - 09:00`), nomor langkah, dan metrik kecepatan (`< 5 ms`).
3. **Palet Warna Semantik & Tema (Terang / Gelap):**
   - Mendukung mode Terang dan Gelap secara penuh (termasuk pintasan tombol keyboard `D`).
   - Aksen Utama: Indigo-Blue (`#1547E6` / `oklch(0.488 0.243 264.376)`).
   - Sinyal 4 Status Validasi:
     - Merah (`destructive`): Konflik waktu terdeteksi (`CONFLICT_DETECTED`).
     - Kuning/Amber: Jadwal belum lengkap (`INCOMPLETE`).
     - Biru Langit (`sky`): Tidak ada konflik pada data saat ini (`NO_CONFLICT_CURRENT_DATA`).
     - Hijau Zamrud (`emerald`): Jadwal lengkap dan valid (`COMPLETE_AND_VALID`).
4. **Aturan Copywriting Bahasa Indonesia (Bebas *Em Dash*):**
   - Gunakan Bahasa Indonesia yang lugas, profesional, dan relevan dengan terminologi sekolah di Indonesia.
   - **LARANGAN KERAS:** Dilarang menggunakan karakter *em dash* (`—`) pada seluruh teks halaman, komponen UI, maupun berkas data; gunakan tanda hubung biasa (`-`), titik dua (`:`), atau pemisahan kalimat.
5. **No `any` Policy & Kinerja Web Vitals (`NFR-LP-01` s.d. `NFR-LP-04`):**
   - Penggunaan `any` dalam TypeScript dilarang keras (`strict: true`).
   - Total JavaScript sisi klien pada pemuatan awal wajib `< 40 kB` (gzip), FCP `< 0.8 detik`, skor Lighthouse minimal `95/100` di semua kategori, bebas *horizontal overflow* dari lebar layar `360px` hingga `1440px+`, memenuhi aksesibilitas keyboard WCAG AA, dan bebas dari skrip pelacak iklan pihak ketiga (*Zero External Tracking*).

---

## 6. Protokol Git (Git Protocol)

Seluruh *AI Agents* wajib mematuhi protokol pengelolaan versi Git berikut demi menjaga integritas riwayat repositori dan keamanan kode:

### 6.1 Otorisasi Commit & Push
- **Jangan Commit/Push Otomatis Tanpa Instruksi:** Agen **dilarang** menjalankan `git commit`, `git push`, `git tag`, atau `git merge` secara sepihak tanpa perintah eksplisit dari pengguna.
- Sebelum melaporkan penyelesaian tugas atau melakukan *commit* (bila diminta), jalankan `git status` dan `git diff` untuk meninjau seluruh berkas yang berubah dan memastikan tidak ada berkas sementara (*scratch files*) yang tertinggal.

### 6.2 Standar Pesan Commit (*Conventional Commits*)
- Setiap pesan *commit* wajib menggunakan format **Conventional Commits**:
  ```text
  <type>(<scope>): <deskripsi singkat yang jelas>
  ```
- **Tipe (`<type>`) yang Diizinkan:**
  - `feat`: Penambahan seksi halaman, komponen Astro Island, atau data fitur baru (contoh: `feat(playground): implement conflict simulation island FR-LP-04`).
  - `fix`: Perbaikan *bug* visual, logika interaktif, atau aksesibilitas.
  - `test`: Penambahan atau pembaruan pengujian otomatis Vitest di `src/__tests__/` (contoh: `test(export-tabs): add red phase tests for FR-LP-06`).
  - `docs`: Pembaruan dokumen PRD, TDD, `README.md`, atau protokol agen (`AGENTS.md`).
  - `style`: Penyesuaian kelas utilitas Tailwind CSS v4 / token `radix-lyra` tanpa mengubah logika.
  - `refactor`: Restrukturisasi kode/komponen tanpa mengubah perilaku eksternal.
  - `chore`: Pembaruan konfigurasi Astro, dependensi `pnpm`, atau skrip *build*.
- **Aturan Penulisan Pesan:**
  - Gunakan deskripsi yang ringkas, spesifik terhadap *intent* perubahan, dan sertakan referensi ID (`FR-LP-xx`, `AC-LP-xx`, atau `NFR-LP-xx`) bila relevan.
  - Dilarang menggunakan karakter *em dash* (`—`) di dalam judul maupun isi pesan *commit*.

### 6.3 Checklist Pra-Commit (Quality Gate)
Sebelum sebuah perubahan di-*commit* pada fase **GREEN / Refactor**, agen wajib memastikan:
1. Indeks `codegraph` telah diperbarui dengan `codegraph sync`.
2. Seluruh *test suite* lulus (`pnpm run test`).
3. Kompilasi statis Astro berhasil tanpa error TypeScript (`pnpm run build`).

### 6.4 Keamanan Git & Operasi Terlarang (*Git Safety*)
- **Larangan Perintah Destruktif:** Dilarang keras menjalankan `git reset --hard`, `git clean -fd`, `git checkout -- .`, atau `git push --force` tanpa izin eksplisit dari pengguna.
- **Larangan Bypass Hook:** Jangan gunakan *flag* `--no-verify` atau `--no-gpg-sign` saat melakukan *commit*.
- **Kebersihan Repositori:** Pastikan berkas lingkungan lokal (`.env`, `.env.*`), hasil kompilasi (`dist/`, `.astro/`), dan dependensi (`node_modules/`) tidak pernah masuk ke dalam *staging area* (`git add`).
