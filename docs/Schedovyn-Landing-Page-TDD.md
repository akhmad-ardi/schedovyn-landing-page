# Technical Design Document (TDD): Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Nama Proyek** | Schedovyn Landing Page (Marketing & Product Showcase Web) |
| **Produk Induk** | Schedovyn (*Smart Timetable Planner*) |
| **Versi Dokumen** | 1.1.0 |
| **Dokumen Referensi** | [docs/Schedovyn-PRD.md](Schedovyn-PRD.md) (v1.1.0), [docs/Schedovyn-Landing-Page-PRD.md](Schedovyn-Landing-Page-PRD.md) (v1.2.0), [DESIGN.md](../DESIGN.md), [AGENTS.md](../AGENTS.md) |
| **Tech Stack Utama** | Astro (`output: "static"`), React 19 Islands, TypeScript (`strict`), Tailwind CSS v4 (`radix-lyra`), Vitest |
| **Package Manager** | `pnpm` (Node.js `>=22.23.4`) |
| **Status** | Siap Untuk Eksekusi Siklus TDD (Fase RED & GREEN) |

---

## 1. Gambaran Umum Arsitektur & Strategi Rendering

**Schedovyn Landing Page** dirancang menggunakan arsitektur **Astro Static Site Generation (SSG)** yang dipadukan dengan **Astro Islands (React 19)**. Pendekatan ini memastikan seluruh konten informasi pemasaran, struktur SEO, dan ilustrasi antarmuka dirender menjadi HTML + CSS statis murni (`0 KB JS`), sementara komponen demonstrasi interaktif dihidrasi secara selektif di sisi klien.

### 1.1 Diagram Arsitektur Komponen & Hidrasi

```mermaid
flowchart TD
    subgraph BuildTime["Astro Static Build (0 KB Client JS)"]
        BL["BaseLayout.astro (SEO, OpenGraph, JSON-LD, Anti-FOUC Script)"]
        IDX["pages/index.astro"]
        NAV["layout/Navbar.astro (FR-LP-01)"]
        HERO["sections/HeroSection.astro (FR-LP-02)"]
        TB["sections/TrustBar.astro (FR-LP-02)"]
        PS["sections/ProblemSolutionSection.astro (FR-LP-03)"]
        FBG["sections/FeatureBentoGrid.astro (FR-LP-05)"]
        HIW["sections/HowItWorksSection.astro (FR-LP-07)"]
        PRIV["sections/PrivacyArchitectureSection.astro (FR-LP-08)"]
        BCTA["sections/BottomCtaSection.astro (FR-LP-10)"]
        FOOT["layout/Footer.astro (FR-LP-10)"]
    end

    subgraph ClientIslands["Astro Islands (React 19 Selective Hydration)"]
        TT["layout/ThemeToggle.tsx (client:load)"]
        CPI["islands/ConflictPlaygroundIsland.tsx (client:visible) (FR-LP-04)"]
        EST["islands/ExportShowcaseTabsIsland.tsx (client:visible) (FR-LP-06)"]
        FAQ["islands/FaqAccordionIsland.tsx (client:visible) (FR-LP-09)"]
    end

    subgraph DataLayer["Typed Data Contracts (src/data/*.ts)"]
        SC["site-config.ts"]
        FEAT["features.ts (FR-01 s.d. FR-13 & PWA)"]
        SIM["simulation-scenarios.ts"]
        FAQS["faqs.ts (7 Poin Tanya Jawab)"]
    end

    BL --> IDX
    IDX --> NAV
    NAV --> TT
    IDX --> HERO
    HERO --> TB
    IDX --> PS
    IDX --> CPI
    IDX --> FBG
    IDX --> EST
    IDX --> HIW
    IDX --> PRIV
    IDX --> FAQ
    IDX --> BCTA
    IDX --> FOOT

    SC --> NAV
    SC --> HERO
    SC --> PS
    SC --> HIW
    SC --> PRIV
    SC --> BCTA
    SC --> FOOT
    FEAT --> FBG
    FEAT --> EST
    SIM --> CPI
    FAQS --> FAQ
```

### 1.2 Matriks Anggaran Hidrasi (*Hydration Budget Matrix* - `NFR-LP-01`)

Untuk memenuhi syarat **total JavaScript initial load `< 40 kB` (gzip)** dan **FCP `< 0.8 detik`**, penggunaan direktif hidrasi Astro dibatasi secara ketat sebagai berikut:

| Komponen | Jenis Berkas | Direktif Hidrasi | Alasan Teknis |
|---|---|---|---|
| `Navbar.astro` | Astro Component | Statis (`0 KB JS`) | Navigasi jangkar HTML murni dan tautan CTA |
| `ThemeToggle.tsx` | React 19 Island | `client:load` | Harus segera merespons klik sakelar tema dan pintasan tombol `D` sejak halaman dimuat |
| `HeroSection.astro` & `TrustBar.astro` | Astro Component | Statis (`0 KB JS`) | Menjamin *Largest Contentful Paint (LCP)* instan pada 5 detik pertama kunjungan |
| `ProblemSolutionSection.astro` | Astro Component | Statis (`0 KB JS`) | Tabel/kartu komparasi statis |
| `ConflictPlaygroundIsland.tsx` | React 19 Island | `client:visible` | Dihidrasi hanya saat pengunjung menggulir mendekati seksi `#simulasi` |
| `FeatureBentoGrid.astro` | Astro Component | Statis (`0 KB JS`) | 7 kartu fitur *Bento Grid* (`FR-01` s.d. `FR-13` & PWA) dirender penuh pada waktu *build* |
| `ExportShowcaseTabsIsland.tsx` | React 19 Island | `client:visible` | Dihidrasi saat pengunjung mencapai seksi `#ekspor` |
| `HowItWorksSection.astro` | Astro Component | Statis (`0 KB JS`) | Daftar 4 langkah terstruktur |
| `PrivacyArchitectureSection.astro` | Astro Component | Statis (`0 KB JS`) | Blok informasi arsitektur IndexedDB lokal & isolasi *multi-workspace* |
| `FaqAccordionIsland.tsx` | React 19 Island | `client:visible` | Dihidrasi saat pengunjung mencapai seksi `#faq` |
| `BottomCtaSection.astro` & `Footer.astro` | Astro Component | Statis (`0 KB JS`) | Banner konversi akhir dan tautan *footer* |

---

## 2. Konfigurasi Proyek, Lingkungan, & Dependensi (`pnpm`)

### 2.1 Daftar Paket yang Diperlukan (`package.json`)
Seluruh instalasi wajib dijalankan menggunakan `pnpm`:
- **Dependencies:**
  - `astro`
  - `@astrojs/react`, `react`, `react-dom`
  - `@astrojs/sitemap`
  - `@tailwindcss/vite`, `tailwindcss`
  - `lucide-react`
  - `clsx`, `tailwind-merge`
  - `@fontsource-variable/figtree`, `@fontsource-variable/inter`
- **DevDependencies:**
  - `typescript`, `@types/react`, `@types/react-dom`
  - `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`

### 2.2 Skrip Standar `package.json`
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "astro": "astro"
  }
}
```

### 2.3 Konfigurasi Variabel Lingkungan (`PUBLIC_*`)
Variabel lingkungan dibaca melalui `import.meta.env` dengan nilai *fallback* aman di `src/data/site-config.ts`:
- `PUBLIC_APP_URL`: Default `https://app.schedovyn.com`
- `PUBLIC_GUIDE_URL`: Default `https://guide.schedovyn.com`
- `PUBLIC_SITE_URL`: Default `https://schedovyn.com` (digunakan oleh `@astrojs/sitemap` dan canonical URL)

---

## 3. Kontrak Data & Skema TypeScript (`src/data/`)

Seluruh berkas di `src/data/` wajib mematuhi **Zero `any` Policy** (`strict: true`) dan **Bebas Karakter Tanda Pisah Panjang (*Em Dash*)**.

### 3.1 `src/data/site-config.ts`
Menyimpan konfigurasi URL lintas proyek, item navigasi jangkar (`FR-LP-01`), poin *Trust Bar* (`FR-LP-02`), komparasi Masalah vs Solusi (`FR-LP-03`), dan 4 langkah cara kerja (`FR-LP-07`).

```ts
export interface NavAnchor {
  id: string;
  label: string;
  href: string;
}

export interface TrustBarItem {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ProblemSolutionItem {
  id: string;
  aspect: string;
  oldWayProblem: string;
  schedovynSolution: string;
  benefitBadge: string;
}

export interface WorkflowStep {
  stepNumber: '01' | '02' | '03' | '04';
  title: string;
  description: string;
  highlightTag: string;
  detail: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  versionBadge: string;
  appUrl: string;
  guideUrl: string;
  siteUrl: string;
  navAnchors: NavAnchor[];
  trustBarItems: TrustBarItem[];
  problemSolutions: ProblemSolutionItem[];
  workflowSteps: WorkflowStep[];
}
```

**Nilai Wajib `navAnchors` (`FR-LP-01`):**
1. `{ id: 'fitur', label: 'Fitur Utama', href: '#fitur' }`
2. `{ id: 'cara-kerja', label: 'Cara Kerja', href: '#cara-kerja' }`
3. `{ id: 'simulasi', label: 'Simulasi Konflik', href: '#simulasi' }`
4. `{ id: 'ekspor', label: 'Ekspor & Laporan', href: '#ekspor' }`
5. `{ id: 'faq', label: 'Tanya Jawab', href: '#faq' }`

**Nilai Wajib `trustBarItems` (`FR-LP-02`):**
1. `100% Client-Side & Privasi Lokal`
2. `Deteksi 7 Jenis Konflik Real-Time`
3. `Ekspor PDF Cetak & Excel Rekap Guru`
4. `Mendukung Mode Offline (PWA)`

**Nilai Wajib `workflowSteps` (`FR-LP-07`):**
1. **Langkah `01` (`Siapkan Ruang Kerja, Jam Sekolah & Istirahat`):** Buat ruang kerja baru (kosong atau data contoh) maupun kloning data master dari semester sebelumnya, lalu atur hari sekolah aktif (5 atau 6 hari), jam pulang khusus hari Jumat, dan jeda istirahat dengan interval *snap grid* `15` hingga `60` menit.
2. **Langkah `02` (`Masukkan Data Master & Alokasi`):** Input atau sesuaikan daftar kelas, guru pengajar beserta jadwal ketidakhadiran, ruangan, dan target jam mingguan dengan palet 10 warna kontras tinggi standar WCAG AA.
3. **Langkah `03` (`Susun di Kanvas & Atasi Konflik`):** Tarik kartu pelajaran ke grid atau salin susunan kelas paralel dengan bantuan deteksi konflik instan di dalam ruang kerja aktif.
4. **Langkah `04` (`Cetak PDF & Unduh Rekap Excel`):** Terbitkan jadwal dalam format PDF *landscape* siap cetak serta berkas Excel multi-*sheet* lengkap (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, dan `Konflik`).

---

### 3.2 `src/data/simulation-scenarios.ts` (`FR-LP-04` & `AC-LP-03`)
Mendefinisikan model data untuk **Astro Island Simulasi Interaktif Deteksi Konflik** (`ConflictPlaygroundIsland.tsx`).

```ts
export type ValidationStatusCode =
  | 'CONFLICT_DETECTED'
  | 'INCOMPLETE'
  | 'NO_CONFLICT_CURRENT_DATA'
  | 'COMPLETE_AND_VALID';

export type ConflictScenarioId =
  | 'TEACHER_OVERLAP'
  | 'SEQUENTIAL_NO_CONFLICT'
  | 'BREAK_TIME_OVERLAP'
  | 'INSTANT_RESOLUTION';

export interface ScheduleSession {
  id: string;
  className: 'Kelas VII-A' | 'Kelas VIII-A';
  subject: string;
  teacher: string;
  room: string;
  startTime: string; // Format HH:mm, wajib tabular-nums (misal: "08:00")
  endTime: string;   // Format HH:mm, wajib tabular-nums (misal: "09:00")
  isConflicting: boolean;
  conflictCode?: 'TEACHER_OVERLAP' | 'BREAK_TIME_OVERLAP';
}

export interface SimulationScenario {
  id: ConflictScenarioId;
  shortLabel: string;
  title: string;
  description: string;
  validationStatus: ValidationStatusCode;
  statusLabel:
    | 'Konflik Ditemukan'
    | 'Belum Lengkap'
    | 'Tidak Ada Konflik pada Data Saat Ini'
    | 'Jadwal Lengkap dan Valid';
  scanTimeLabel: string; // Contoh: "< 5 ms"
  sessions: ScheduleSession[];
  diagnosticMessage: string;
  resolutionHint: string;
}
```

**Spesifikasi 4 Skenario Wajib (`SIMULATION_SCENARIOS`):**
1. **`TEACHER_OVERLAP` (Skenario 1: Bentrokan Guru Lintas Kelas):**
   - `validationStatus`: `'CONFLICT_DETECTED'`, `statusLabel`: `'Konflik Ditemukan'`.
   - Sesi: Pak Budi mengajar Matematika di **Kelas VII-A** (`08:00 - 09:00`) dan ditempatkan mengajar Matematika di **Kelas VIII-A** (`08:30 - 09:30`).
   - Kedua blok sesi memiliki `isConflicting: true` dan `conflictCode: 'TEACHER_OVERLAP'`.
   - `diagnosticMessage`: Menjelaskan bahwa Pak Budi mengalami irisan waktu mengajar pada rentang `08:30 - 09:00` antara Kelas VII-A dan Kelas VIII-A.
2. **`SEQUENTIAL_NO_CONFLICT` (Skenario 2: Sesi Berurutan Presisi `08:00 - 09:00` & `09:00 - 10:00`):**
   - `validationStatus`: `'NO_CONFLICT_CURRENT_DATA'`, `statusLabel`: `'Tidak Ada Konflik pada Data Saat Ini'`.
   - Sesi: Pak Budi mengajar di **Kelas VII-A** (`08:00 - 09:00`) dan langsung mengajar di **Kelas VIII-A** (`09:00 - 10:00`).
   - Seluruh blok sesi memiliki `isConflicting: false`.
   - `diagnosticMessage`: Membuktikan bahwa batas waktu akhir `09:00` dan waktu mulai `09:00` dihitung secara presisi menggunakan perbandingan interval setengah terbuka (`startA < endB AND startB < endA`), sehingga sesi berurutan **tidak** dianggap bertabrakan.
3. **`BREAK_TIME_OVERLAP` (Skenario 3: Irisan Waktu Istirahat):**
   - `validationStatus`: `'CONFLICT_DETECTED'`, `statusLabel`: `'Konflik Ditemukan'`.
   - Sesi: Sesi Bahasa Indonesia di **Kelas VIII-A** (`08:45 - 09:45`) memotong jam istirahat sekolah (`09:15 - 09:30`).
   - Blok sesi memiliki `isConflicting: true` dan `conflictCode: 'BREAK_TIME_OVERLAP'`.
4. **`INSTANT_RESOLUTION` (Skenario 4: Resolusi Konflik Instan):**
   - `validationStatus`: `'COMPLETE_AND_VALID'`, `statusLabel`: `'Jadwal Lengkap dan Valid'`.
   - Sesi: Seluruh sesi pada **Kelas VII-A** (`07:00 - 08:00`, `08:00 - 09:00`) dan **Kelas VIII-A** (`07:00 - 08:00`, `08:00 - 09:00`) telah digeser ke slot bebas bentrokan dengan guru dan ruangan yang valid.
   - Seluruh blok sesi memiliki `isConflicting: false`.

---

### 3.3 `src/data/features.ts` (`FR-LP-05`, `FR-LP-06`, & `AC-LP-07`)
Mendefinisikan 7 kartu fitur *Bento Grid* (`FEATURE_BENTO_ITEMS`) yang mencakup `FR-01` s.d. `FR-13` & PWA serta data pratinjau ekspor (`EXPORT_SHOWCASE_TABS`).

```ts
export interface FeatureBentoItem {
  id: string;
  badge: string; // Contoh: "FR-01 & FR-02", "FR-13"
  title: string;
  description: string;
  details: string[];
  colSpanClass: 'lg:col-span-1' | 'lg:col-span-2';
  iconName: 'Clock' | 'Users' | 'Copy' | 'Layers' | 'History' | 'Database' | 'Keyboard';
}

export interface ExcelWorksheet {
  sheetName: 'Jadwal' | 'Rekap Guru' | 'Rekap Ruangan' | 'Konflik';
  description: string;
  sampleColumns: string[];
  sampleRows: Record<string, string>[];
}

export interface ExportShowcaseTab {
  id: 'pdf-landscape' | 'excel-multi-sheet';
  title: string;
  subtitle: string;
  formatBadge: string;
  description: string;
  features: string[];
  excelWorksheets?: ExcelWorksheet[];
}
```

**Daftar 7 Kartu Wajib `FEATURE_BENTO_ITEMS` (`FR-LP-05` - Tata Letak 3 Baris @ 3 Kolom di `lg:grid-cols-3`):**
1. **`flexible-time-config` (`lg:col-span-2`, Badge: `FR-01`, Ikon: `Clock`):**
   - **Judul:** `Konfigurasi Jam Belajar Fleksibel`
   - **Cakupan:** Hari sekolah aktif (5 atau 6 hari), jam pulang Jumat lebih awal, multi-periode istirahat, dan interval *snap grid* (`15`, `30`, `45`, atau `60` menit).
2. **`master-data-contrast` (`lg:col-span-1`, Badge: `FR-02 & FR-03`, Ikon: `Users`):**
   - **Judul:** `Manajemen Data Master & Ketersediaan`
   - **Cakupan:** Kelas, Mata Pelajaran dengan 10 palet warna kontras tinggi (WCAG AA), Guru beserta *unavailable intervals*, dan Ruangan Khusus (Lab IPA, Lab Komputer, Lapangan).
3. **`parallel-class-copy` (`lg:col-span-1`, Badge: `FR-12`, Ikon: `Copy`):**
   - **Judul:** `Penyalinan Jadwal Kelas Paralel`
   - **Cakupan:** Duplikasi jadwal dari Kelas VII-A ke VII-B sekali klik dengan 3 strategi guru/ruangan (*Gunakan Guru Default*, *Salin Guru Sumber*, atau *Kosongkan*).
4. **`multi-workspace-management` (`lg:col-span-2`, Badge: `FR-13`, Ikon: `Layers`):**
   - **Judul:** `Pengelolaan Multi-Ruang Kerja & Duplikasi Semester`
   - **Deskripsi:** `Kelola beberapa ruang kerja terpisah di satu peramban untuk memisahkan jadwal antar-semester, tahun ajaran, atau skenario simulasi jadwal.`
   - **Details:**
     - `Workspace Switcher instan di header dengan isolasi penuh deteksi konflik dan riwayat Undo/Redo per ruang kerja`
     - `Duplikasi ruang kerja (Clone Workspace): pilih mode Konfigurasi & Data Master Saja untuk semester baru atau Salin Penuh Beserta Jadwal`
     - `Inisialisasi ruang kerja fleksibel (Ruang Kerja Kosong atau Muat Data Contoh) dan pemulihan otomatis ruang kerja aktif terakhir`
5. **`undo-redo-history` (`lg:col-span-1`, Badge: `FR-07`, Ikon: `History`):**
   - **Judul:** `Riwayat Perubahan 50 Langkah (Undo & Redo)`
   - **Cakupan:** Eksperimen bebas dengan pintasan `Ctrl+Z` dan `Ctrl+Y` yang dihitung ulang dan terisolasi per ruang kerja aktif.
6. **`local-first-storage` (`lg:col-span-1`, Badge: `FR-10 & PWA`, Ikon: `Database`):**
   - **Judul:** `Penyimpanan Lokal Jujur & Tangguh`
   - **Cakupan:** Auto-save ke IndexedDB peramban tanpa tombol simpan manual, berjalan 100% offline sebagai PWA, lengkap dengan diagnostik kapasitas penyimpanan.
7. **`keyboard-first-accessibility` (`lg:col-span-1`, Badge: `FR-04 & Aksesibilitas`, Ikon: `Keyboard`):**
   - **Judul:** `Aksesibilitas Keyboard Penuh`
   - **Cakupan:** Geser waktu sesi dengan `Alt + Panah` atau tempatkan sesi langsung dari panel melalui kontrol formulir tanpa bergantung pada *mouse drag*.

---

### 3.4 `src/data/faqs.ts` (`FR-LP-09` & `AC-LP-07`)
Mendefinisikan 7 pertanyaan dan jawaban FAQ untuk `FaqAccordionIsland.tsx`.

```ts
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
```

**Daftar 7 Pertanyaan Wajib (`FAQ_ITEMS`):**
1. **`faq-1` (`Biaya & Akun`):** `Apakah Schedovyn benar-benar gratis dan tanpa perlu membuat akun?`
2. **`faq-2` (`Akses & Offline`):** `Apakah aplikasi ini bisa digunakan saat koneksi internet sekolah mati?`
3. **`faq-3` (`Guru & Ketersediaan`):** `Bagaimana jika satu guru mengajar di banyak kelas dan memiliki hari libur khusus?`
4. **`faq-4` (`Efisiensi Kerja`):** `Apakah saya bisa menduplikasi jadwal kelas yang mirip tanpa menyusun ulang dari awal?`
5. **`faq-5` (`Keamanan & Privasi`):** `Di mana data jadwal saya disimpan dan bagaimana cara mengamankannya?`
6. **`faq-6` (`Logika Penjadwalan`):** `Mengapa jadwal tetap diizinkan ditempatkan ke grid meskipun terjadi konflik?` (Wajib memuat penjelasan konsep *Non-Blocking Placement* agar penyuntingan jadwal tetap luwes).
7. **`faq-7` (`Multi-Ruang Kerja & Semester Baru`):** `Bagaimana cara menyiapkan jadwal untuk semester baru atau membuat simulasi jadwal tanpa merusak jadwal yang sedang berjalan?` (Wajib menjelaskan fitur **Multi-Ruang Kerja / Multi-Workspace (`FR-13`)**, *Workspace Switcher*, serta dua mode duplikasi ruang kerja: **Konfigurasi & Data Master Saja** untuk memulai semester baru tanpa mengetik ulang data guru/kelas/mapel, dan **Salin Penuh Beserta Jadwal** untuk eksperimen simulasi dengan isolasi penuh di IndexedDB).

---

## 4. Spesifikasi Teknis Komponen & Interaksi

### 4.1 `src/layouts/BaseLayout.astro`
- **Atribut HTML:** `<html lang="id">`
- **Skrip Anti-FOUC Tema (Inline `<script is:inline>` di dalam `<head>`):**
  - Membaca `localStorage.getItem('schedovyn-theme')`.
  - Jika bernilai `'dark'` atau belum disetel namun `window.matchMedia('(prefers-color-scheme: dark)').matches` bernilai `true`, tambahkan kelas `'dark'` pada `document.documentElement` sebelum *first paint*.
- **Metadata SEO & JSON-LD (`SoftwareApplication`):**
  - Title, meta description, canonical URL, OpenGraph (`og:title`, `og:description`, `og:image` mengarah ke `/og-cover.png`, `og:type="website"`), serta `<script type="application/ld+json">` untuk `SoftwareApplication` (`applicationCategory: "EducationalApplication"`, `operatingSystem: "All (Web Browser, PWA)"`, `offers.price: "0"`).

### 4.2 `src/components/layout/ThemeToggle.tsx` (`client:load`, `AC-LP-05`)
- **State:** `isDark: boolean`.
- **Interaksi Klik:** Mengubah state tema, memperbarui `document.documentElement.classList.add('dark')` / `remove('dark')`, dan menyimpan ke `localStorage.setItem('schedovyn-theme', 'dark' | 'light')`.
- **Pintasan Keyboard `D`:**
  - Mendaftarkan `window.addEventListener('keydown', handleKeyDown)`.
  - Jika `event.key === 'd' || event.key === 'D'`, tanpa modifier `ctrlKey`, `metaKey`, atau `altKey`, dan elemen fokus aktif (`document.activeElement`) **bukan** `INPUT`, `TEXTAREA`, `SELECT`, atau `isContentEditable`, maka tema berganti secara instan.
- **Aksesibilitas:** Memiliki `aria-label` yang jelas dan menampilkan indikator tombol `D`.

### 4.3 `src/components/sections/HeroSection.astro` & `src/components/sections/FeatureBentoGrid.astro` (`FR-LP-02`, `FR-LP-05`, `AC-LP-07`)
- **Toolbar *Hero Mockup* pada `HeroSection.astro`:**
  - Menampilkan lencana **Ruang Kerja Aktif (*Workspace Switcher*)** (contoh: `SMPN 1 Nusantara - Semester Ganjil`), diikuti pemilih **Kelas Aktif** (`Kelas VII-A`), dan indikator status penyimpanan (`Tersimpan di browser`).
- **Grid Fitur pada `FeatureBentoGrid.astro`:**
  - Merender ke-7 item `FEATURE_BENTO_ITEMS` termasuk ikon `Layers` dari `lucide-react` untuk kartu `multi-workspace-management` (`FR-13`).

### 4.4 `src/components/islands/ConflictPlaygroundIsland.tsx` (`client:visible`, `FR-LP-04`, `AC-LP-03`)
- **Fitur Interaktif:**
  1. **Pemilih 4 Skenario (`role="tablist"`):** Tombol untuk memilih `TEACHER_OVERLAP`, `SEQUENTIAL_NO_CONFLICT`, `BREAK_TIME_OVERLAP`, atau `INSTANT_RESOLUTION`.
  2. **Tombol Aksi Cepat Resolusi:** Saat berada pada skenario konflik (`TEACHER_OVERLAP` atau `BREAK_TIME_OVERLAP`), menyediakan tombol interaktif **"Selesaikan Konflik Otomatis"** yang langsung memindahkan state ke `'INSTANT_RESOLUTION'`.
  3. **Header Status Validasi Real-Time:** Menampilkan lencana status sesuai warna semantik (`CONFLICT_DETECTED` = merah/destructive, `NO_CONFLICT_CURRENT_DATA` = biru langit/sky, `COMPLETE_AND_VALID` = hijau zamrud/emerald) serta metrik kecepatan pindai `< 5 ms` (`tabular-nums`).
  4. **Mini-Kanvas 2 Baris Kelas:** Merender baris **Kelas VII-A** dan **Kelas VIII-A** pada rentang waktu Senin `07:00 - 10:00` beserta penanda zona **Istirahat Pagi (`09:15 - 09:30`)** dan kartu sesi pelajaran (`tabular-nums`).
  5. **Panel Diagnostik Konflik:** Menampilkan kode konflik (`TEACHER_OVERLAP` / `BREAK_TIME_OVERLAP`), pesan penjelasan dalam Bahasa Indonesia, dan panduan resolusi.

### 4.5 `src/components/islands/ExportShowcaseTabsIsland.tsx` (`client:visible`, `FR-LP-06`, `AC-LP-04`)
- **State:** `activeTabId: ExportShowcaseTab['id']` (default: `'pdf-landscape'`), serta `activeSheetIndex: number` saat berada di tab Excel.
- **Tab 1 (`pdf-landscape`):** Menampilkan replika visual dokumen **PDF Cetak Landscape** berbingkai teknis `1px`, lengkap dengan header sekolah contoh, lencana status validasi, matriks jadwal mingguan (`tabular-nums`), dan blok catatan konflik di bagian bawah.
- **Tab 2 (`excel-multi-sheet`):** Menampilkan replika visual *workbook* **Excel (`.xlsx`) Multi-Worksheet** dengan pemilih 4 tab lembar kerja (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, `Konflik`), indikator *AutoFilter* aktif, dan badge keamanan **Sanitasi Formula Aktif**.

### 4.6 `src/components/islands/FaqAccordionIsland.tsx` (`client:visible`, `FR-LP-09`, `AC-LP-07`)
- Merender seluruh 7 item tanya jawab dari `src/data/faqs.ts` secara dinamis.
- Menggunakan elemen `<button aria-expanded={isOpen} aria-controls={contentId}>` yang dapat dioperasikan penuh dengan keyboard (`Tab`, `Enter`, `Space`) sesuai `NFR-LP-03`.

---

## 5. Matriks Pengujian Otomatis (TDD Test Suite - `src/__tests__/`)

Seluruh pengujian dijalankan menggunakan **Vitest** dan **`@testing-library/react`**:

| Berkas Test | Target Pengujian | Cakupan Persyaratan |
|---|---|---|
| `src/__tests__/data-contracts.spec.ts` | Validasi kelengkapan `site-config.ts`, `features.ts` (7 kartu Bento mencakup `FR-01` s.d. `FR-13` Multi-Workspace), `simulation-scenarios.ts` (4 skenario), `faqs.ts` (7 FAQ termasuk *Non-Blocking Placement* dan *Multi-Workspace*), serta URL `PUBLIC_APP_URL` & `PUBLIC_GUIDE_URL`. | `FR-LP-01` s.d. `FR-LP-10`, `AC-LP-02`, `AC-LP-06`, `AC-LP-07` |
| `src/__tests__/no-em-dash.spec.ts` | Memindai seluruh berkas di `src/` (`*.ts`, `*.tsx`, `*.astro`, `*.css`) untuk memastikan **0 kemunculan karakter tanda pisah panjang (`\u2014`)**. | `AC-LP-05`, Bagian 4.4 PRD |
| `src/__tests__/theme-toggle.test.tsx` | Menguji klik tombol `ThemeToggle`, perubahan kelas `.dark` pada `document.documentElement`, penyimpanan `localStorage`, pintasan keyboard `D`, dan pengabaian pintasan `D` saat fokus berada di dalam `<input>` / `<textarea>`. | `FR-LP-01`, `AC-LP-05`, `NFR-LP-03` |
| `src/__tests__/conflict-playground.test.tsx` | Menguji `ConflictPlaygroundIsland`: tampilan awal `TEACHER_OVERLAP` (indikator merah & penjelasan Pak Budi), perpindahan ke `SEQUENTIAL_NO_CONFLICT` (`08:00 - 09:00` & `09:00 - 10:00` bebas konflik), `BREAK_TIME_OVERLAP`, dan resolusi instan ke `COMPLETE_AND_VALID`. | `FR-LP-04`, `AC-LP-03`, `NFR-LP-03` |
| `src/__tests__/export-showcase-tabs.test.tsx` | Menguji `ExportShowcaseTabsIsland`: perpindahan antara Tab PDF Landscape dan Tab Excel (`.xlsx`), serta visibilitas ke-4 lembar kerja (`Jadwal`, `Rekap Guru`, `Rekap Ruangan`, `Konflik`). | `FR-LP-06`, `AC-LP-04`, `NFR-LP-03` |
| `src/__tests__/faq-accordion.test.tsx` | Menguji `FaqAccordionIsland`: merender seluruh 7 pertanyaan umum, interaksi klik dan keyboard (`aria-expanded`), serta keberadaan penjelasan *Non-Blocking Placement* dan *Multi-Workspace (`FR-13`)*. | `FR-LP-09`, `NFR-LP-03`, `AC-LP-07` |

---

## 6. Urutan Eksekusi Implementasi (TDD Roadmap)

1. **Langkah 1 - Persiapan Infrastruktur & Test Runner:**
   - Konfigurasi dependensi `pnpm` (React 19, Tailwind CSS v4, Vitest, Testing Library, Lucide, Fontsource).
   - Konfigurasi `astro.config.mjs`, `tsconfig.json`, dan `vitest.config.ts`.
2. **Langkah 2 - Fase RED (QA Engineer):**
   - Menulis dan memperbarui seluruh berkas pengujian di `src/__tests__/` berdasarkan kontrak pada Bab 3, 4, dan 5 dokumen ini (termasuk pengujian kontrak `FR-13` Multi-Workspace pada `data-contracts.spec.ts` dan `faq-accordion.test.tsx`).
   - Memverifikasi bahwa `pnpm run test` gagal (*RED*) sebelum data/komponen diperbarui.
3. **Langkah 3 - Fase GREEN: Data Layer & Design Tokens (Frontend Engineer):**
   - Mengimplementasikan `src/styles/global.css` sesuai spesifikasi token warna OKLCH di [DESIGN.md](../DESIGN.md).
   - Mengimplementasikan dan memperbarui `src/data/site-config.ts`, `src/data/simulation-scenarios.ts`, `src/data/features.ts` (7 kartu Bento termasuk `multi-workspace-management`), dan `src/data/faqs.ts` (7 item FAQ).
   - Mengimplementasikan komponen primitif `radix-lyra` di `src/components/ui/`.
4. **Langkah 4 - Fase GREEN: Astro Islands Interaktif (Frontend Engineer):**
   - Mengimplementasikan `ThemeToggle.tsx`, `ConflictPlaygroundIsland.tsx`, `ExportShowcaseTabsIsland.tsx`, dan `FaqAccordionIsland.tsx`.
5. **Langkah 5 - Fase GREEN: Layout & Seksi Statis Astro (Frontend Engineer):**
   - Mengimplementasikan `BaseLayout.astro`, `Navbar.astro`, `Footer.astro`, ke-7 seksi statis di `src/components/sections/*.astro` (termasuk indikator *Workspace Switcher* di `HeroSection.astro`, ikon `Layers` di `FeatureBentoGrid.astro`, dan penjelasan isolasi *multi-workspace* di `PrivacyArchitectureSection.astro`), aset publik (`public/favico.svg`, `public/og-cover.png`, `public/robots.txt`), serta merakit `src/pages/index.astro`.
6. **Langkah 6 - Verifikasi Akhir & Sinkronisasi Codegraph (QA & Frontend Engineer):**
   - Menjalankan `pnpm run test` (seluruh test wajib **PASS / GREEN**).
   - Menjalankan `pnpm run build` (`astro build` wajib menghasilkan `dist/` dengan `0` error TypeScript).
   - Menjalankan `codegraph sync`.
