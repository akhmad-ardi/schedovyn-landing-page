# DESIGN.md: Sistem Desain & Identitas Visual Schedovyn Landing Page (`radix-lyra`)

| Atribut Desain | Spesifikasi |
|---|---|
| **Nama Sistem Desain** | `radix-lyra` (Architectural Technical Grid) |
| **Produk** | Schedovyn Landing Page & Ekosistem *Smart Timetable Planner* |
| **Filosofi Visual** | Presisi Cetak Biru Akademik (*Academic Timetable Blueprint*), Lugas, Jujur, dan Berkecepatan Tinggi |
| **Geometri Sudut** | `0px` (`rounded-none`) pada seluruh komponen, kartu, lencana, tombol, dan pratinjau kanvas |
| **Garis Struktural** | `1px solid` (`border-border`) dengan pembagian kisi (*structural hairline grid*) |
| **Warna Aksen Utama** | Indigo-Blue (`#1547E6` / `oklch(0.488 0.243 264.376)`) |
| **Tipografi** | `'Figtree Variable'` (Heading) & `'Inter Variable'` (Body / UI), wajib `tabular-nums` untuk angka & waktu |
| **Mode Tema** | Terang (*Light Mode*) & Gelap (*Dark Mode*) dengan sakelar instan dan pintasan tombol `D` |

---

## 1. Filosofi Desain: Architectural Technical Grid

**Schedovyn** adalah alat kerja presisi untuk menyusun matriks jadwal pelajaran sekolah yang kompleks. Oleh karena itu, halaman pemasaran (*Landing Page*) wajib menolak gaya dekoratif generik (seperti kartu membulat besar, gradien pelangi buram, atau bayangan mengambang yang kabur) dan menerapkan estetika **Architectural Technical Grid (`radix-lyra`)**:

1. **Kejujuran Struktural (*Structural Honesty*):** Setiap seksi dibatasi oleh garis pembatas `1px` (`border-border`) yang tegas, menyerupai lembar kerja jadwal pelajaran dan cetak biru arsitektur.
2. **Sudut Tajam Presisi (`rounded-none`):** Radius sudut ditetapkan `0px` (`--radius: 0rem`) di seluruh permukaan. Hal ini menyatukan identitas visual *Landing Page* dengan kanvas editor di aplikasi utama Schedovyn.
3. **Kejelasan Informasi di Atas Dekorasi:** Setiap visual di halaman ini berfungsi sebagai bukti nyata cara kerja produk (pratinjau 3 panel editor, simulasi bentrokan guru lintas kelas, dan struktur 4 lembar kerja Excel).
4. **Bebas Karakter *Em Dash*:** Seluruh teks antarmuka menggunakan Bahasa Indonesia yang lugas dan **dilarang keras** memuat karakter *em dash* (`—`); gunakan tanda hubung biasa (`-`), titik dua (`:`), atau pemisahan kalimat.

---

## 2. Sistem Warna OKLCH & Token Semantik (`src/styles/global.css`)

Seluruh warna didefinisikan menggunakan ruang warna perseptual **OKLCH** pada konfigurasi Tailwind CSS v4 (`src/styles/global.css`) untuk menjamin kontras keterbacaan tingkat **WCAG AA** baik pada mode Terang maupun Gelap.

### 2.1 Palet Permukaan & Aksen Utama

| Token CSS | Peran Visual | Nilai Mode Terang (`:root`) | Nilai Mode Gelap (`.dark`) |
|---|---|---|---|
| `--background` | Latar belakang utama halaman | `oklch(0.99 0.002 264)` (`#FAFBFD`) | `oklch(0.145 0.015 264)` (`#0B0E17`) |
| `--foreground` | Teks utama kontras tinggi | `oklch(0.16 0.02 264)` (`#0F1424`) | `oklch(0.96 0.005 264)` (`#F1F4FA`) |
| `--card` | Permukaan kartu & panel kanvas | `oklch(1 0 0)` (`#FFFFFF`) | `oklch(0.18 0.018 264)` (`#111624`) |
| `--card-foreground` | Teks di atas permukaan kartu | `oklch(0.16 0.02 264)` | `oklch(0.96 0.005 264)` |
| `--muted` | Latar area sekunder / header tabel | `oklch(0.955 0.006 264)` (`#F0F3F9`) | `oklch(0.22 0.02 264)` (`#181F32`) |
| `--muted-foreground` | Teks sekunder / keterangan | `oklch(0.45 0.025 264)` | `oklch(0.72 0.015 264)` |
| `--primary` | Aksen utama merek (Indigo-Blue) | `oklch(0.488 0.243 264.376)` (`#1547E6`) | `oklch(0.60 0.22 264.376)` (`#3B6BFF`) |
| `--primary-foreground` | Teks di atas tombol `primary` | `oklch(0.99 0 0)` (`#FFFFFF`) | `oklch(0.99 0 0)` (`#FFFFFF`) |
| `--border` | Garis kisi presisi `1px` | `oklch(0.89 0.01 264)` (`#DCE1EC`) | `oklch(0.27 0.022 264)` (`#232B42`) |
| `--ring` | Cincin fokus aksesibilitas keyboard | `oklch(0.488 0.243 264.376)` | `oklch(0.60 0.22 264.376)` |

### 2.2 Sinyal Semantik 4 Status Validasi Schedovyn

Inti komunikasi visual Schedovyn terletak pada **4 Status Validasi Transparan**. Keempat status ini wajib memiliki warna permukaan, garis batas, dan teks yang konsisten di seluruh seksi (Hero Mockup, Problem vs Solution, Simulasi Konflik, dan Pratinjau Ekspor):

| Kode Status Validasi | Label Resmi Bahasa Indonesia | Peran Semantik | Warna Aksen & Kelas Utilitas Acuan |
|---|---|---|---|
| `CONFLICT_DETECTED` | **Konflik Ditemukan** | Merah (`destructive`): Terdapat bentrokan waktu guru, ruangan, atau jam istirahat | Border: `border-red-600 dark:border-red-500`, Bg: `bg-red-500/10`, Text: `text-red-700 dark:text-red-300` |
| `INCOMPLETE` | **Belum Lengkap** | Kuning / Amber (`warning`): Tidak ada bentrokan waktu, namun masih ada sesi pelajaran yang belum ditempatkan | Border: `border-amber-600 dark:border-amber-500`, Bg: `bg-amber-500/10`, Text: `text-amber-800 dark:text-amber-300` |
| `NO_CONFLICT_CURRENT_DATA` | **Tidak Ada Konflik pada Data Saat Ini** | Biru Langit (`sky`): Sesi yang terpasang bebas bentrokan, sedang dalam proses penyusunan | Border: `border-sky-600 dark:border-sky-400`, Bg: `bg-sky-500/10`, Text: `text-sky-800 dark:text-sky-300` |
| `COMPLETE_AND_VALID` | **Jadwal Lengkap dan Valid** | Hijau Zamrud (`emerald`): Seluruh target jam pelajaran terpenuhi dan 0 konflik ditemukan | Border: `border-emerald-600 dark:border-emerald-500`, Bg: `bg-emerald-500/10`, Text: `text-emerald-800 dark:text-emerald-300` |

---

## 3. Tipografi & Hierarki Numerik

### 3.1 Pasangan Font Lokal (`@fontsource-variable`)
Font di-bundle secara lokal untuk menghilangkan ketergantungan jaringan eksternal dan mencegah *Cumulative Layout Shift (CLS)*:
1. **Heading Font (`--font-heading`):** `'Figtree Variable'`, sans-serif. Digunakan pada seluruh `h1`, `h2`, `h3`, nomor langkah, dan metrik utama. Karakteristik geometris yang tegas dan mudah dipindai.
2. **Body & UI Font (`--font-sans`):** `'Inter Variable'`, sans-serif. Digunakan pada paragraf penjelasan, tabel komparasi, lencana status, blok jadwal, dan pertanyaan FAQ.
3. **Monospace / Kode Konflik (`--font-mono`):** `ui-monospace, 'JetBrains Mono', monospace`. Digunakan khusus pada pengenal teknis seperti `TEACHER_OVERLAP`, `BREAK_TIME_OVERLAP`, dan pintasan keyboard (`Ctrl+Z`, `Alt + Panah`, `D`).

### 3.2 Skala Tipografi

| Elemen | Kelas Tailwind Acuan | Ukuran & Ketebalan | Atribut Tambahan |
|---|---|---|---|
| **Hero Display (`h1`)** | `text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.12]` | `30px` s.d. `48px`, Bold (`700`) | `font-heading` |
| **Judul Seksi (`h2`)** | `text-2xl sm:text-3xl font-bold tracking-tight leading-tight` | `24px` s.d. `30px`, Bold (`700`) | `font-heading` |
| **Judul Kartu / Langkah (`h3`)** | `text-lg font-semibold tracking-tight` | `18px`, SemiBold (`600`) | `font-heading` |
| **Sub-headline Hero** | `text-base sm:text-lg text-muted-foreground leading-relaxed` | `16px` s.d. `18px`, Regular (`400`) | Lebar baca maks `65ch` |
| **Body Copy / FAQ** | `text-sm sm:text-base text-muted-foreground leading-relaxed` | `14px` s.d. `16px`, Regular (`400`) | Kontras WCAG AA |
| **Label Teknis / Lencana** | `text-xs font-medium uppercase tracking-wider` | `12px`, Medium (`500`) | `tabular-nums` |

### 3.3 Aturan Wajib `tabular-nums`
Seluruh elemen yang memuat angka, waktu pelajaran, durasi slot, atau metrik performa **wajib** menyertakan kelas `tabular-nums` (`font-variant-numeric: tabular-nums`):
- Rentang jam pelajaran: `07:00 - 10:00`, `08:00 - 09:00`, `08:30 - 09:30`, `09:00 - 10:00`, `09:15 - 09:30`.
- Metrik kecepatan deteksi konflik: `< 5 ms` / `< 5 milidetik`.
- Interval *snap grid*: `15`, `30`, `45`, `60` menit.
- Kapasitas riwayat perubahan: `50` langkah Undo/Redo.
- Penomoran alur kerja: `01`, `02`, `03`, `04`.

---

## 4. Tata Letak Arsitektural & Responsivitas (`NFR-LP-02`)

### 4.1 Struktur Kisi Halaman (*Blueprint Container Grid*)
- Kontainer utama menggunakan `mx-auto max-w-7xl border-x border-border` sehingga pada layar *Laptop* (`1024px`) dan *Desktop Wide* (`1440px+`) terbentuk bingkai vertikal presisi di sisi kiri dan kanan halaman.
- Antar-seksi dipisahkan oleh garis horizontal `border-b border-border` penuh.
- Setiap seksi diawali oleh **Section Index Header** berbingkai teknis (contoh: `[01 / MASALAH VS SOLUSI]`, `[02 / SIMULASI DETEKSI KONFLIK]`, `[03 / FITUR LENGKAP]`, `[04 / EKSPOR DOKUMEN]`, `[05 / ALUR KERJA]`, `[06 / PRIVASI LOKAL]`, `[07 / TANYA JAWAB]`).

### 4.2 Titik Henti Responsif (*Breakpoints*) & Pencegahan Overflow
Halaman wajib tampil rapi dari lebar `360px` hingga `1440px+` tanpa ada elemen yang menyebabkan *horizontal scroll* pada `body`:
- **Smartphone (`360px - 639px`):**
  - Tata letak 1 kolom penuh (`grid-cols-1`).
  - Tombol CTA utama di Hero tersusun vertikal (`flex-col w-full`) dengan tinggi sentuh nyaman (`min-h-10` / `40px`).
  - Kanvas mini pada `ConflictPlaygroundIsland` dan tabel pratinjau pada `ExportShowcaseTabsIsland` dibungkus kontainer `overflow-x-auto` lokal dengan indikator batas yang rapi agar tidak merusak lebar viewport utama.
- **Tablet (`768px - 1023px`):**
  - Bento Grid dan langkah kerja beralih ke 2 kolom (`md:grid-cols-2`).
- **Laptop & Desktop Wide (`1024px - 1440px+`):**
  - Navigasi jangkar lengkap di `Navbar.astro`, Bento Grid 3 kolom (`lg:grid-cols-3`), dan *Hero Mockup* 3 panel tampil penuh secara berdampingan.

---

## 5. Spesifikasi Visual Komponen Primitif & Showcase

### 5.1 Komponen Primitif (`src/components/ui/`)
1. **Button (`rounded-none`):**
   - `primary`: `bg-primary text-primary-foreground hover:bg-primary/90 border border-primary rounded-none font-medium transition-colors`
   - `outline`: `bg-background text-foreground hover:bg-muted border border-border rounded-none font-medium transition-colors`
   - `ghost`: `hover:bg-muted text-foreground rounded-none transition-colors`
   - Ukuran standar kontrol: `h-9 px-4 text-sm`, ukuran CTA Hero: `h-11 px-6 text-sm sm:text-base font-semibold`.
2. **Badge (`rounded-none`):**
   - `rounded-none border px-2 py-0.5 text-xs font-medium tabular-nums`.
3. **Card (`rounded-none`):**
   - `rounded-none border border-border bg-card text-card-foreground shadow-none`.

### 5.2 Visual *Hero Mockup* 3 Panel Editor (`HeroSection.astro` - `FR-LP-02`)
Menampilkan replika presisi antarmuka Editor Schedovyn dalam bingkai `border border-border bg-card`:
- **Top Toolbar Mockup:** Menampilkan pemilih kelas aktif (`Kelas VII-A`), lencana status penyimpanan `"Tersimpan di browser"`, tombol `"Batal Perubahan"` / `"Ulangi Perubahan"`, tombol `"Salin Jadwal"`, serta lencana status validasi.
- **Panel Kiri (Sesi Belum Terjadwal):** Daftar kartu mata pelajaran dengan indikator sisa alokasi jam mingguan (`tabular-nums`).
- **Panel Tengah (Grid Mingguan):** Matriks hari Senin s.d. Jumat dengan rentang jam `07:00 - 12:00` (`tabular-nums`), menampilkan blok mata pelajaran berwarna kontras tinggi dan pita waktu istirahat.
- **Panel Kanan (Detail & Deteksi Konflik):** Menampilkan ringkasan validasi *real-time* (`< 5 ms`) dan rincian pemeriksaan lintas kelas.

### 5.3 Visual *Conflict Playground Island* (`ConflictPlaygroundIsland.tsx` - `FR-LP-04`)
- **Baris Tombol Skenario (4 Tab):** Setiap tombol menampilkan nomor skenario (`01` s.d. `04`), judul singkat, dan indikator aktif berupa garis bawah / latar `bg-primary text-primary-foreground`.
- **Kanvas Perbandingan Lintas Kelas (2 Baris):**
  - Baris 1: **Kelas VII-A** (Senin `07:00 - 10:00`).
  - Baris 2: **Kelas VIII-A** (Senin `07:00 - 10:00`).
  - Zona **Istirahat Pagi (`09:15 - 09:30`)** diberi arsiran teknis halus (`bg-muted/70 border-x border-dashed border-border`).
  - Saat `isConflicting: true` (`TEACHER_OVERLAP` atau `BREAK_TIME_OVERLAP`), kartu sesi menampilkan bingkai `border-2 border-red-600 dark:border-red-500 bg-red-500/10`, ikon peringatan segitiga, dan lencana kode konflik.
  - Saat `SEQUENTIAL_NO_CONFLICT` dipilih (`08:00 - 09:00` & `09:00 - 10:00`), titik temu pukul `09:00` ditandai dengan lencana presisi `"Batas Jam 09:00 Aman (0 Konflik)"`.

### 5.4 Visual *Export Showcase Tabs Island* (`ExportShowcaseTabsIsland.tsx` - `FR-LP-06`)
- **Tab 1 (Dokumen PDF Cetak Landscape):**
  - Bingkai proporsi dokumen *landscape* dengan kop jadwal sekolah, lencana status validasi, tabel matriks Senin s.d. Jumat, dan kotak catatan konflik di bagian bawah halaman cetak.
- **Tab 2 (Spreadsheet Excel `.xlsx` Multi-Worksheet):**
  - Bingkai menyerupai jendela lembar kerja dengan baris header berfitur panah *AutoFilter*, lencana **"Sanitasi Formula Aktif"**, isi tabel sesuai lembar kerja yang dipilih, dan bar navigasi 4 *sheet* di bagian bawah:
    1. `Jadwal`
    2. `Rekap Guru`
    3. `Rekap Ruangan`
    4. `Konflik`

---

## 6. Standar Aksesibilitas (WCAG AA) & Gerakan (`NFR-LP-03`)

1. **Navigasi Keyboard Penuh:** Seluruh tautan jangkar, tombol CTA, sakelar tema (`ThemeToggle`), ke-4 tombol skenario di `ConflictPlaygroundIsland`, tab di `ExportShowcaseTabsIsland`, dan item di `FaqAccordionIsland` wajib dapat difokuskan dan diaktifkan menggunakan `Tab`, `Shift+Tab`, `Enter`, dan `Space`.
2. **Indikator Fokus Tegas:** Setiap elemen interaktif wajib memiliki gaya `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
3. **Kepatuhan `prefers-reduced-motion`:** Transisi warna dan bukaan akordeon harus instan atau menghormati `@media (prefers-reduced-motion: reduce)` tanpa animasi memantul yang mengganggu.
