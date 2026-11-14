# Product Requirements Document (PRD): Schedovyn Landing Page

| Informasi Dokumen | Detail |
|---|---|
| **Nama Proyek** | Schedovyn Landing Page (Marketing & Product Showcase Web) |
| **Produk Induk** | Schedovyn (*Smart Timetable Planner*) |
| **Versi Dokumen** | 1.2.0 |
| **Status** | Siap Untuk Perancangan & Eksekusi Proyek Mandiri |
| **Framework Utama** | **Astro** (Static Site Generation + Astro Islands Architecture) |
| **Target Audiens** | Kepala Sekolah, Wakil Kepala Sekolah Bidang Kurikulum, Staf Tata Usaha/Kurikulum, dan Guru Penyusun Jadwal |
| **Bahasa Antarmuka** | Bahasa Indonesia (Bebas karakter *em dash*) |
| **Gaya Desain Acuan** | `radix-lyra` (Architectural Technical Grid, `rounded-none`, Presisi Garis `1px`, Indigo-Blue `#1547E6`, `tabular-nums`) |

---

## 1. Ringkasan Eksekutif & Visi Produk

### 1.1 Latar Belakang Masalah
Menyusun jadwal pelajaran mingguan di sekolah (SD, SMP, SMA, SMK, maupun Madrasah) adalah salah satu pekerjaan paling rumit setiap awal semester. Tim kurikulum harus mencocokkan puluhan guru, belasan hingga puluhan kelas, ruang laboratorium terbatas, jam istirahat yang berbeda (seperti hari Jumat), dan pembatasan hari hadir guru. Penggunaan kertas tempel atau *spreadsheet* manual sering kali berujung pada **bentrokan jadwal guru lintas kelas** yang baru disadari ketika kegiatan belajar-mengajar sudah berjalan. Selain itu, saat memasuki semester atau tahun ajaran baru, tim kurikulum sering terpaksa mengetik ulang seluruh data guru, kelas, dan mata pelajaran dari awal atau takut merusak jadwal aktif ketika ingin mencoba skenario simulasi jadwal baru.

Di sisi lain, banyak sekolah enggan menggunakan aplikasi penjadwalan berbasis *cloud* berbayar karena kendala anggaran, birokrasi pendaftaran akun, kekhawatiran privasi data sekolah, atau koneksi internet ruang guru yang tidak stabil.

### 1.2 Solusi yang Ditawarkan Schedovyn
**Schedovyn** hadir sebagai aplikasi penyusun jadwal pembelajaran visual berbasis konsep *Smart Timetable Planner* yang berjalan **100% di peramban pengguna (*Client-Side & Local-First*)**:
1. **Tanpa Login & Tanpa Server:** Buka aplikasi dan langsung mulai menyusun jadwal dalam hitungan detik tanpa registrasi akun.
2. **Deteksi Konflik Lintas Kelas Otomatis (*Smart Conflict Detection*):** Menyunting satu kelas pada satu waktu, namun sistem selalu memeriksa bentrokan guru, ruangan, jam sekolah, dan waktu istirahat terhadap seluruh kelas di dalam ruang kerja secara *real-time*.
3. **Pengelolaan Multi-Ruang Kerja & Duplikasi Semester (*Multi-Workspace*):** Kelola beberapa ruang kerja terpisah di satu peramban untuk memisahkan jadwal antar-semester, tahun ajaran, atau skenario simulasi jadwal. Gandakan ruang kerja ke semester baru hanya dengan menyalin konfigurasi & data master tanpa perlu mengetik ulang data guru dan kelas, atau salin penuh beserta jadwal untuk eksperimen simulasi.
4. **100% Offline & PWA:** Dapat dipasang (*install*) ke laptop/komputer dan digunakan penuh tanpa koneksi internet.
5. **Siap Cetak & Olah Data:** Ekspor langsung ke dokumen PDF *landscape* siap tempel di papan pengumuman dan berkas Excel (`.xlsx`) multi-*worksheet* untuk rekapitulasi jam mengajar guru.

### 1.3 Tujuan Proyek Landing Page
Membangun situs *Landing Page* mandiri berbasis **Astro** yang berfungsi sebagai **wajah utama produk Schedovyn** dengan tujuan:
1. Menjelaskan proposisi nilai utama Schedovyn secara instan dalam 5 detik pertama kunjungan (*Hero Section*).
2. Mendemonstrasikan cara kerja **Deteksi Konflik Lintas Kelas**, **Validasi 4 Status**, dan pengelolaan **Multi-Ruang Kerja (*Multi-Workspace*)** secara visual dan interaktif sehingga calon pengguna langsung percaya pada keandalan sistem.
3. Menghilangkan keraguan pengguna terkait keamanan data lokal (*Local-First Privacy*), isolasi antar-ruang kerja di peramban, dan kemampuan kerja tanpa internet (*PWA Offline*).
4. Mengonversi pengunjung menjadi pengguna aktif melalui tombol panggilan aksi (*Call-to-Action* / CTA) langsung menuju aplikasi utama (**Buka Aplikasi Schedovyn**) serta mengarahkan pengguna baru ke **Portal Panduan Pemakaian (User Guide)**.

---

## 2. Target Pengguna & Persona Pengunjung

### 2.1 Persona 1: Wakil Kepala Sekolah Bidang Kurikulum (Pengambil Keputusan Teknis)
- **Kebutuhan:** Memastikan jadwal seluruh sekolah selesai tepat waktu sebelum hari pertama masuk sekolah tanpa ada satu pun guru yang bentrok mengajar di dua kelas bersamaan, serta dapat menyiapkan skenario jadwal Semester Genap dari data Semester Ganjil tanpa mengganggu jadwal yang sedang berjalan.
- **Kekhawatiran:** Takut aplikasi sulit dipelajari, takut jadwal masih menyisakan jam pelajaran yang terlewat (*belum lengkap*), dan butuh laporan beban mengajar guru dalam format Excel.
- **Pesan Kunci di Landing Page:** *"Deteksi otomatis 7 jenis konflik jadwal, kelola banyak ruang kerja antar-semester, dan rekap otomatis beban jam mengajar guru ke Excel."*

### 2.2 Persona 2: Staf Kurikulum / Operator Sekolah (Eksekutor Harian)
- **Kebutuhan:** Alat kerja visual yang cepat, mendukung *drag-and-drop*, bisa *Undo/Redo* (`Ctrl+Z`), bisa menyalin jadwal antar-kelas paralel, bisa mengkloning data master guru/kelas ke ruang kerja semester baru sekali klik, dan tidak lemot saat internet sekolah sedang mati.
- **Kekhawatiran:** Lelah menyusun jadwal di Excel yang rumit dan mengetik ulang data master setiap pergantian semester; takut pekerjaan hilang jika tab peramban tidak sengaja tertutup.
- **Pesan Kunci di Landing Page:** *"Tarik-lepas sesi pelajaran secepat kilat, kloning ruang kerja untuk semester baru tanpa input ulang data master, tersimpan otomatis di peramban, dan bekerja 100% tanpa internet."*

### 2.3 Persona 3: Kepala Sekolah (Penanggung Jawab Kebijakan)
- **Kebutuhan:** Solusi modern yang meningkatkan kerapian administrasi akademik tanpa membebani anggaran langganan bulanan atau risiko kebocoran data internal sekolah ke pihak ketiga.
- **Pesan Kunci di Landing Page:** *"100% Gratis, Tanpa Akun, Privasi Penuh di Perangkat Sekolah Anda."*

---

## 3. Spesifikasi Tech Stack & Arsitektur Teknis (Astro)

Proyek Landing Page ini **wajib dibangun menggunakan Astro** untuk menghasilkan halaman statis berkinerja ultra-cepat (*Zero JS by default*) yang dipadukan dengan *Astro Islands* khusus pada komponen demonstrasi interaktif.

### 3.1 Tabel Spesifikasi Tech Stack
| Layer / Kebutuhan | Teknologi / Pustaka | Catatan Implementasi |
|---|---|---|
| **Package Manager & Runtime** | **pnpm** & **Node.js** (`>=22.23.4`) | Wajib gunakan `pnpm` (`pnpm install`, `pnpm run dev`, `pnpm run build`) |
| **Core Web Framework** | **Astro** (`^5.0.0`) | Mode `output: "static"` (Static Site Generation / SSG murni) |
| **Interactive UI Islands** | **React 19** (`@astrojs/react`) | Digunakan khusus untuk *Astro Islands* (`client:visible` / `client:load`) pada Simulasi Konflik Interaktif, Tab Pameran Ekspor, dan FAQ |
| **Language** | **TypeScript** (`~5.8+` / `~6.0+`) | `strict` mode aktif, *Zero `any` policy* |
| **Styling** | **Tailwind CSS v4** (`@tailwindcss/vite`) | Menggunakan konfigurasi CSS-first (`src/styles/global.css`) dengan token warna OKLCH `radix-lyra` yang identik dengan aplikasi utama |
| **UI Primitives & Icons** | **shadcn/ui** (`radix-lyra`) + **`lucide-react`** / **`@lucide/astro`** | Komponen bersudut tajam (`rounded-none`), garis batas `1px` |
| **Typography** | `@fontsource-variable/figtree` & `@fontsource-variable/inter` | Di-bundle secara lokal untuk kecepatan muat optimal tanpa *layout shift* |
| **SEO & Metadata** | `@astrojs/sitemap` + Astro Head SEO | Pembuatan otomatis `sitemap-index.xml`, OpenGraph tags, dan JSON-LD (`SoftwareApplication`) |
| **Testing** | **Vitest** + **Playwright** / `@testing-library/react` | Pengujian unit pada komponen *Island* interaktif dan verifikasi build statis |

### 3.2 Struktur Direktori Proyek Astro
```text
schedovyn-landing/
├── public/
│   ├── favico.svg                  # Ikon resmi Schedovyn
│   ├── og-cover.png                # Gambar pratinjau OpenGraph (1200x630)
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.astro        # Header sticky & navigasi jangkar
│   │   │   ├── Footer.astro        # Footer & tautan ekosistem Schedovyn
│   │   │   └── ThemeToggle.tsx     # Island (client:load) sakelar tema Terang/Gelap + shortcut 'D'
│   │   ├── sections/               # Komponen Astro statis (0 KB JS)
│   │   │   ├── HeroSection.astro
│   │   │   ├── TrustBar.astro
│   │   │   ├── ProblemSolutionSection.astro
│   │   │   ├── FeatureBentoGrid.astro
│   │   │   ├── HowItWorksSection.astro
│   │   │   ├── PrivacyArchitectureSection.astro
│   │   │   └── BottomCtaSection.astro
│   │   ├── islands/                # Komponen React Interaktif (Astro Islands)
│   │   │   ├── ConflictPlaygroundIsland.tsx  # (client:visible) Simulasi 4 skenario konflik
│   │   │   ├── ExportShowcaseTabsIsland.tsx  # (client:visible) Pratinjau PDF vs Excel 4 sheet
│   │   │   └── FaqAccordionIsland.tsx        # (client:visible) Akordeon tanya jawab
│   │   └── ui/                     # Komponen primitif radix-lyra (Button, Card, Badge, Tabs)
│   ├── data/
│   │   ├── features.ts             # Data terstruktur fitur FR-01 s.d. FR-13 & PWA
│   │   ├── simulation-scenarios.ts # Data jadwal & konflik untuk mini-playground
│   │   └── faqs.ts                 # Daftar pertanyaan & jawaban FAQ
│   ├── layouts/
│   │   └── BaseLayout.astro        # Kerangka HTML, meta SEO, JSON-LD, & skrip anti-FOUC tema
│   ├── pages/
│   │   └── index.astro             # Halaman utama Landing Page
│   └── styles/
│       └── global.css              # Konfigurasi Tailwind CSS v4 & variabel tema OKLCH
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### 3.3 Konfigurasi URL Lintas Proyek (`Environment Variables`)
Agar tautan ke Aplikasi Utama dan Portal Panduan Pemakaian mudah dikonfigurasi saat *deployment*:
- `PUBLIC_APP_URL`: URL menuju aplikasi utama Schedovyn (contoh: `https://app.schedovyn.com` atau `https://schedovyn.pages.dev`).
- `PUBLIC_GUIDE_URL`: URL menuju Portal Panduan Pemakaian (contoh: `https://guide.schedovyn.com`).

---

## 4. Prinsip Desain & Identitas Visual

Agar *Landing Page* terasa menyatu secara utuh dengan aplikasi utama Schedovyn, proyek ini wajib mematuhi panduan desain berikut:

1. **Estetika Architectural Technical Grid (`radix-lyra`):**
   - Menggunakan sudut tajam (`rounded-none` / `0px`) pada seluruh kartu, tombol, pratinjau komponen, dan bingkai seksi.
   - Menggunakan garis pembatas presisi `1px` (`border-border`) yang menciptakan kesan cetak biru (*blueprint*) jadwal akademik yang rapi dan terstruktur.
2. **Tipografi & Hierarki Teks:**
   - **Heading Font:** `'Figtree Variable'` (tegas, modern, dan geometris).
   - **Body Font:** `'Inter Variable'` (keterbacaan tinggi pada ukuran kecil maupun sedang).
   - **Angka & Jam:** Wajib menerapkan `tabular-nums` pada seluruh angka statistik, jam pelajaran (`07:30 - 09:00`), dan metrik kecepatan (`< 5 ms`).
3. **Palet Warna Semantik (Light & Dark Mode):**
   - Mendukung mode Terang dan Gelap secara penuh (termasuk pintasan tombol `D` untuk mengganti tema).
   - **Aksen Utama:** Indigo-Blue (`#1547E6` / `oklch(0.488 0.243 264.376)`).
   - **Sinyal Status Validasi:**
     - Merah (`destructive`): Konflik waktu terdeteksi.
     - Kuning/Amber: Jadwal belum lengkap.
     - Biru Langit (`sky`): Bebas konflik pada data saat ini.
     - Hijau Zamrud (`emerald`): Jadwal lengkap dan valid.
4. **Aturan Copywriting:**
   - Menggunakan Bahasa Indonesia yang lugas, profesional, dan akrab bagi dunia pendidikan Indonesia.
   - **Larangan Keras:** Dilarang menggunakan karakter tanda pisah panjang (*em dash*) pada seluruh teks halaman; gunakan tanda hubung biasa (`-`), titik dua (`:`), atau pemisahan kalimat.

---

## 5. Struktur Halaman & Spesifikasi Fungsional Seksi (FR)

Landing Page dirancang sebagai halaman tunggal yang kaya informasi (*High-Converting Single-Page Marketing Site*) dengan navigasi jangkar (*anchor links*) yang mulus.

### FR-LP-01: Header & Navigasi Sticky (`Navbar.astro`)
- **Logo & Identitas:** Ikon resmi Schedovyn (`favico.svg`), nama merek **Schedovyn**, dan lencana versi `v1.0 Local-First`.
- **Menu Navigasi Jangkar:**
  1. Fitur Utama (`#fitur`)
  2. Cara Kerja (`#cara-kerja`)
  3. Simulasi Konflik (`#simulasi`)
  4. Ekspor & Laporan (`#ekspor`)
  5. Tanya Jawab (`#faq`)
- **Tautan Eksternal & Aksi:**
  - Tautan ke **Panduan Pemakaian** (`PUBLIC_GUIDE_URL`).
  - Tombol Pengganti Tema (Terang / Gelap).
  - Tombol Utama (CTA): **"Buka Aplikasi"** (`PUBLIC_APP_URL`).

### FR-LP-02: Hero Section dengan Pratinjau Kanvas Jadwal (`HeroSection.astro`)
- **Headline Utama:** *"Susun Jadwal Sekolah Tanpa Bentrokan Guru dan Ruangan."*
- **Sub-headline:** *"Aplikasi Smart Timetable Planner berbasis visual drag-and-drop dengan deteksi konflik lintas kelas otomatis. Berjalan 100% di browser Anda: tanpa login, tanpa server, dan siap digunakan secara offline."*
- **Kelompok CTA Utama:**
  - Primary CTA: **"Mulai Susun Jadwal Sekarang"** (dengan keterangan kecil di bawahnya: *"Gratis, tanpa registrasi akun, langsung berjalan di browser"*).
  - Secondary CTA: **"Pelajari Panduan Pemakaian"**.
- **Pita Keunggulan Cepat (*Trust Bar*):**
  - `100% Client-Side & Privasi Lokal`
  - `Deteksi 7 Jenis Konflik Real-Time`
  - `Ekspor PDF Cetak & Excel Rekap Guru`
  - `Mendukung Mode Offline (PWA)`
- **Visual Utama (*Hero Mockup*):**
  - Ilustrasi komponen UI presisi 3 panel Editor Schedovyn lengkap dengan bilah alat atas yang menampilkan **Pemilih Ruang Kerja Aktif (*Workspace Switcher*)** (misal: `SMPN 1 Nusantara - Semester Ganjil`), pemilih **Kelas Aktif** (`Kelas VII-A`), indikator penyimpanan lokal (`Tersimpan di browser`), serta 3 area utama (Panel Sesi Belum Terjadwal di kiri, Grid Mingguan dengan blok mata pelajaran berwarna di tengah, serta Panel Detail & Deteksi Konflik di kanan).

### FR-LP-03: Seksi Masalah vs Solusi (`ProblemSolutionSection.astro`)
- Menyandingkan penderitaan penyusunan jadwal cara lama dengan cara kerja cerdas Schedovyn dalam tabel/kartu komparasi:
  1. **Cara Lama (Spreadsheet / Manual):** Sulit melacak guru yang sama mengajar di kelas VII-A dan VIII-B pada jam beririsan $\rightarrow$ **Cara Schedovyn:** Mesin deteksi konflik memindai seluruh kelas di dalam ruang kerja aktif dalam waktu `< 5 milidetik` setiap kali sesi digeser.
  2. **Cara Lama:** Sesi terlewat atau jumlah jam pelajaran kurang dari target kurikulum $\rightarrow$ **Cara Schedovyn:** Panel Sesi Belum Terjadwal menghitung sisa alokasi mingguan secara otomatis.
  3. **Cara Lama:** Bingung membedakan jadwal yang sudah aman dengan jadwal yang baru terisi sebagian $\rightarrow$ **Cara Schedovyn:** 4 Status Validasi Transparan (*Konflik Ditemukan*, *Belum Lengkap*, *Tidak Ada Konflik pada Data Saat Ini*, dan *Jadwal Lengkap dan Valid*).

### FR-LP-04: Seksi Simulasi Interaktif Deteksi Konflik (`ConflictPlaygroundIsland.tsx`)
- Dirender sebagai **Astro Island (`client:visible`)** agar pengunjung dapat mencoba langsung simulasi mini di halaman Landing Page:
  - Menampilkan 2 baris jadwal kelas (misal: **Kelas VII-A** dan **Kelas VIII-A**) pada hari Senin pukul `07:00 - 10:00`.
  - Pengunjung dapat menekan tombol skenario:
    1. **Skenario 1: Bentrokan Guru Lintas Kelas (`TEACHER_OVERLAP`)** - Pak Budi mengajar Matematika di VII-A (`08:00 - 09:00`) dan ditempatkan mengajar di VIII-A (`08:30 - 09:30`). Sistem langsung menampilkan bingkai merah, ikon peringatan, dan penjelasan penyebab konflik.
    2. **Skenario 2: Sesi Berurutan Presisi (`08:00 - 09:00` & `09:00 - 10:00`)** - Membuktikan bahwa sesi yang berbatasan tepat di pukul `09:00` **tidak** dianggap bertabrakan.
    3. **Skenario 3: Irisan Waktu Istirahat (`BREAK_TIME_OVERLAP`)** - Sesi yang memotong jam istirahat sekolah otomatis ditandai.
    4. **Skenario 4: Resolusi Konflik Instan** - Menggeser sesi ke jam kosong langsung mengubah status menjadi hijau (*Valid*).

### FR-LP-05: Seksi Sorotan Fitur Lengkap (`FeatureBentoGrid.astro`)
Menampilkan seluruh kemampuan Schedovyn (FR-01 s.d. FR-13 & PWA) dalam tata letak *Bento Grid* berbingkai tajam:
1. **Konfigurasi Jam Belajar Fleksibel (`FR-01`):** Atur hari sekolah aktif (5 atau 6 hari), jam pulang hari Jumat yang lebih awal, beberapa periode istirahat, dan interval *snap grid* (`15`, `30`, `45`, atau `60` menit).
2. **Manajemen Data Master & Ketersediaan (`FR-02 & FR-03`):** Kelola Kelas, Mata Pelajaran dengan 10 palet warna kontras tinggi (WCAG AA), Guru beserta jadwal ketidaktersediaan (*unavailable intervals*), dan Ruangan Khusus (Lab IPA, Lab Komputer, Lapangan).
3. **Penyalinan Jadwal Kelas Paralel (`FR-12`):** Duplikasi susunan jadwal dari Kelas VII-A ke VII-B dalam sekali klik dengan pilihan strategi guru/ruangan (*Gunakan Guru Default Kelas Tujuan*, *Salin Guru Sumber*, atau *Kosongkan*).
4. **Pengelolaan Multi-Ruang Kerja & Duplikasi Semester (`FR-13`):** Kelola beberapa ruang kerja (*workspace*) terpisah di satu peramban untuk memisahkan jadwal antar-semester, tahun ajaran, atau skenario simulasi. Dilengkapi *Workspace Switcher* instan, pembuatan ruang kerja baru (*Ruang Kerja Kosong* atau *Muat Data Contoh*), serta *Clone Workspace* dengan 2 mode (*Konfigurasi & Data Master Saja* untuk memulai semester baru tanpa input ulang data master, atau *Salin Penuh Beserta Jadwal* untuk simulasi) dengan isolasi penuh atas deteksi konflik dan riwayat *Undo/Redo*.
5. **Riwayat Perubahan 50 Langkah (*Undo & Redo* - `FR-07`):** Bebas bereksperimen mengatur ulang jadwal dengan pintasan `Ctrl+Z` dan `Ctrl+Y`.
6. **Penyimpanan Lokal Jujur & Tangguh (`FR-10 & PWA`):** Auto-save ke IndexedDB peramban tanpa tombol simpan manual, pemulihan otomatis ruang kerja aktif terakhir, lengkap dengan diagnostik kapasitas penyimpanan.
7. **Aksesibilitas Keyboard Penuh (`FR-04 & Aksesibilitas`):** Tidak harus selalu menggunakan *mouse drag*; geser waktu sesi dengan `Alt + Panah` atau tempatkan sesi langsung dari panel melalui kontrol formulir.

### FR-LP-06: Seksi Pameran Hasil Ekspor (`ExportShowcaseTabsIsland.tsx`)
- Dirender sebagai **Astro Island (`client:visible`)** yang menampilkan pratinjau visual hasil keluaran dokumen:
  - **Tab 1: Dokumen PDF Cetak Landscape:** Menunjukkan tata letak tabel matriks mingguan per kelas maupun seluruh kelas dalam ruang kerja aktif, lengkap dengan lencana status validasi dan daftar catatan konflik.
  - **Tab 2: Spreadsheet Excel (`.xlsx`) Multi-Worksheet:** Menunjukkan 4 lembar kerja terstruktur (`Jadwal`, `Rekap Guru` untuk menghitung total beban jam mengajar mingguan, `Rekap Ruangan` untuk melihat utilisasi lab, dan `Konflik`), dilengkapi fitur *AutoFilter* dan keamanan sanitasi formula.

### FR-LP-07: Seksi Alur Kerja 4 Langkah (`HowItWorksSection.astro`)
Menjelaskan betapa mudahnya memulai dari nol atau melanjutkan semester baru hingga jadwal siap terbit:
1. **Langkah 1: Siapkan Ruang Kerja, Jam Sekolah & Istirahat** (Buat ruang kerja baru dari kosong, muat data contoh, atau kloning konfigurasi & data master dari semester sebelumnya, lalu atur hari aktif dan durasi slot).
2. **Langkah 2: Masukkan Data Master & Kebutuhan Sesi** (Input atau sesuaikan kelas, guru, mapel, ruangan, dan target sesi mingguan).
3. **Langkah 3: Susun di Kanvas & Selesaikan Konflik** (Tarik kartu ke grid atau salin jadwal antar-kelas paralel, dipandu deteksi konflik otomatis di dalam ruang kerja aktif).
4. **Langkah 4: Cetak PDF & Unduh Rekap Excel** (Jadwal siap dibagikan ke guru dan siswa).

### FR-LP-08: Seksi Arsitektur Privasi & Keterbatasan Penyimpanan Lokal (`PrivacyArchitectureSection.astro`)
- Memberikan edukasi jujur sesuai prinsip produk:
  - Data 100% tersimpan di dalam peramban perangkat pengguna (IndexedDB), mendukung penyimpanan beberapa ruang kerja (*multi-workspace*) yang terisolasi penuh beserta pemulihan otomatis ruang kerja aktif terakhir tanpa pernah dikirim ke server mana pun.
  - Penjelasan transparan bahwa fitur duplikasi ruang kerja (*Salin Penuh*) menjaga variasi skenario di dalam peramban yang sama, namun membersihkan *site data* peramban dapat menghapus seluruh data lokal, sehingga pengguna dianjurkan mengekspor jadwal ke PDF/Excel secara berkala sebagai arsip resmi di luar peramban.

### FR-LP-09: Seksi Pertanyaan Umum (`FaqAccordionIsland.tsx`)
Memuat jawaban atas 7 pertanyaan yang paling sering diajukan pihak sekolah:
1. *Apakah Schedovyn benar-benar gratis dan tanpa perlu membuat akun?*
2. *Apakah aplikasi ini bisa digunakan saat koneksi internet sekolah mati?*
3. *Bagaimana jika satu guru mengajar di banyak kelas dan memiliki hari libur khusus (misal guru tidak hadir hari Selasa)?*
4. *Apakah saya bisa memindahkan jadwal kelas yang mirip tanpa menyusun ulang dari awal?*
5. *Di mana data jadwal saya disimpan dan bagaimana cara mengamankannya?*
6. *Mengapa jadwal tetap diizinkan ditempatkan ke grid meskipun berkonflik?* (Penjelasan konsep *Non-Blocking Placement* agar penyuntingan tetap luwes).
7. *Bagaimana cara menyiapkan jadwal untuk semester baru atau membuat simulasi jadwal tanpa merusak jadwal yang sedang berjalan?* (Penjelasan fitur **Multi-Ruang Kerja / Multi-Workspace (`FR-13`)** beserta dua mode duplikasi: *Konfigurasi & Data Master Saja* untuk pergantian semester tanpa mengetik ulang data guru/kelas, dan *Salin Penuh Beserta Jadwal* untuk eksperimen simulasi terisolasi).

### FR-LP-10: Banner Penutup (Bottom CTA) & Footer (`BottomCtaSection.astro` & `Footer.astro`)
- **Banner Penutup:** Ajakan terakhir untuk langsung mencoba aplikasi atau membaca buku panduan lengkap.
- **Footer:** Tautan cepat ke Aplikasi Utama, Portal Panduan Pemakaian, Ringkasan Spesifikasi Teknis, dan informasi hak cipta.

---

## 6. Persyaratan Non-Fungsional (NFR)

1. **NFR-LP-01 (Kinerja Astro & Web Vitals):**
   - Berkat arsitektur *Astro Islands*, total JavaScript sisi klien yang dikirim pada pemuatan awal (*initial load*) wajib `< 40 kB` (terkompresi gzip).
   - Waktu muat halaman pertama (*First Contentful Paint* / FCP) `< 0.8 detik`.
   - Skor Lighthouse Performance, Accessibility, Best Practices, dan SEO minimal **`95/100`**.
2. **NFR-LP-02 (Responsivitas Lintas Perangkat):**
   - Tampil optimal di layar *Desktop Wide* (`1440px+`), *Laptop* (`1024px`), *Tablet* (`768px`), hingga *Smartphone* (`360px+`) tanpa ada elemen yang meluap (*horizontal overflow*).
3. **NFR-LP-03 (Aksesibilitas WCAG AA):**
   - Seluruh elemen interaktif (tab simulasi, akordeon FAQ, tombol tema) dapat dioperasikan penuh menggunakan keyboard (`Tab`, `Enter`, `Space`) dan memiliki kontras warna memadai pada mode Terang maupun Gelap.
4. **NFR-LP-04 (Zero External Tracking):**
   - Selaras dengan filosofi privasi Schedovyn, Landing Page tidak boleh memuat skrip pelacak iklan pihak ketiga yang invasif.

---

## 7. Acceptance Criteria (Kriteria Penerimaan Proyek)

- **AC-LP-01:** Proyek berhasil dikompilasi menggunakan `pnpm run build` (`astro build`) menjadi situs statis murni di dalam direktori `dist/` dengan 0 error TypeScript.
- **AC-LP-02:** Pengunjung dapat memahami fungsi utama Schedovyn dan mengeklik tombol **"Mulai Susun Jadwal Sekarang"** untuk membuka aplikasi utama dari bagian Hero maupun Header.
- **AC-LP-03:** Astro Island **Simulasi Interaktif Deteksi Konflik** (`ConflictPlaygroundIsland.tsx`) berfungsi secara nyata di halaman Landing Page: ketika pengunjung memilih skenario bentrokan guru, UI simulasi menampilkan indikator merah beserta penjelasan konflik lintas kelas; ketika memilih skenario sesi berurutan (`08:00 - 09:00` dan `09:00 - 10:00`), UI simulasi menampilkan status bebas konflik.
- **AC-LP-04:** Pengunjung dapat beralih tab pada Astro Island **Pameran Hasil Ekspor** (`ExportShowcaseTabsIsland.tsx`) untuk melihat representasi visual dokumen PDF *landscape* dan *workbook* Excel 4 *worksheet*.
- **AC-LP-05:** Seluruh halaman mendukung pergantian mode Terang dan Gelap secara instan serta mematuhi aturan desain `radix-lyra` (`rounded-none`, `tabular-nums`, bebas karakter *em dash*).
- **AC-LP-06:** Seluruh tautan menuju **Portal Panduan Pemakaian (User Guide)** dapat diakses dengan jelas dari navigasi atas, Hero, dan Footer.
- **AC-LP-07:** Kemampuan terbaru **Pengelolaan Multi-Ruang Kerja (`FR-13`)** (termasuk *Workspace Switcher*, duplikasi ruang kerja mode *Konfigurasi & Data Master Saja* vs *Salin Penuh Beserta Jadwal*, serta isolasi ruang kerja di IndexedDB) ditampilkan secara akurat pada *Hero Mockup*, *Feature Bento Grid*, *How It Works*, dan *FAQ*.
