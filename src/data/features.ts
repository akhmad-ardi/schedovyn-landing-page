export interface FeatureBentoItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  details: string[];
  colSpanClass: string;
  iconName: string;
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

export const FEATURE_BENTO_ITEMS: FeatureBentoItem[] = [
  {
    id: 'flexible-time-config',
    badge: 'FR-01 & FR-02',
    title: 'Konfigurasi Jam Belajar Fleksibel',
    description: 'Atur hari sekolah aktif (5 atau 6 hari kerja), jam pulang hari Jumat yang lebih awal, dan beberapa waktu jeda istirahat.',
    details: [
      'Interval snap grid fleksibel: 15, 30, 45, atau 60 menit per slot',
      'Pemisahan otomatis interval istirahat tanpa mengganggu tata letak',
      'Batas jam operasional harian yang dapat disesuaikan per institusi',
    ],
    colSpanClass: 'lg:col-span-2',
    iconName: 'Clock',
  },
  {
    id: 'master-data-contrast',
    badge: 'FR-03 & FR-04',
    title: 'Manajemen Data Master & Ketersediaan',
    description: 'Kelola Kelas, Mata Pelajaran, Ruangan Khusus (Lab IPA, Lab Komputer, Lapangan), dan jadwal ketersediaan guru.',
    details: [
      '10 palet warna kontras tinggi standar WCAG AA untuk keterbacaan prima',
      'Pencatatan interval unavailable guru pengajar yang fleksibel',
      'Penetapan kapasitas ruangan dan spesifikasi laboratorium sekolah',
    ],
    colSpanClass: 'lg:col-span-1',
    iconName: 'Users',
  },
  {
    id: 'parallel-class-copy',
    badge: 'FR-09',
    title: 'Penyalinan Jadwal Kelas Paralel',
    description: 'Salin susunan jadwal dari satu kelas ke kelas paralel lain dalam sekali klik tanpa perlu mengulang dari nol.',
    details: [
      'Duplikasi susunan jadwal dari Kelas VII-A ke VII-B secara instan',
      '3 strategi penugasan: Gunakan Guru Default, Salin Guru Sumber, atau Kosongkan',
      'Pengecekan bentrokan otomatis pasca-duplikasi jadwal paralel',
    ],
    colSpanClass: 'lg:col-span-1',
    iconName: 'Copy',
  },
  {
    id: 'undo-redo-history',
    badge: 'FR-11',
    title: 'Riwayat Perubahan 50 Langkah (Undo & Redo)',
    description: 'Bebas bereksperimen mengatur variasi jadwal tanpa khawatir kehilangan tata letak sebelumnya.',
    details: [
      'Kapasitas riwayat hingga 50 langkah pembatalan perubahan',
      'Pintasan keyboard universal Ctrl+Z (Undo) dan Ctrl+Y (Redo)',
      'Sinkronisasi riwayat instan dengan kanvas penyusunan jadwal',
    ],
    colSpanClass: 'lg:col-span-2',
    iconName: 'History',
  },
  {
    id: 'local-first-storage',
    badge: 'FR-10 & PWA',
    title: 'Penyimpanan Lokal Jujur & Tangguh',
    description: 'Sistem penyimpanan client-side murni menggunakan IndexedDB peramban pengguna tanpa ketergantungan server luar.',
    details: [
      'Auto-save otomatis ke IndexedDB lokal setiap kali sesi digeser',
      'Bekerja 100% offline sebagai Progressive Web App (PWA)',
      'Diagnostik kapasitas penyimpanan lokal yang transparan',
    ],
    colSpanClass: 'lg:col-span-2',
    iconName: 'Database',
  },
  {
    id: 'keyboard-first-accessibility',
    badge: 'FR-08 & Aksesibilitas',
    title: 'Aksesibilitas Keyboard Penuh',
    description: 'Susun dan geser jadwal dengan cepat tanpa harus selalu mengandalkan kursor mouse atau layar sentuh.',
    details: [
      'Pindahkan slot waktu sesi secara langsung menggunakan Alt + Panah',
      'Penempatan sesi terarah melalui dropdown dan modal yang aksesibel',
      'Navigasi kisi jadwal terstruktur sesuai pedoman WCAG AA',
    ],
    colSpanClass: 'lg:col-span-1',
    iconName: 'Keyboard',
  },
];

export const EXPORT_SHOWCASE_TABS: ExportShowcaseTab[] = [
  {
    id: 'pdf-landscape',
    title: 'Dokumen PDF Cetak Landscape',
    subtitle: 'Siap Cetak & Ditempel di Papan Pengumuman Sekolah',
    formatBadge: 'Pratinjau A4 Landscape',
    description: 'Format dokumen cetak resmi dengan tata letak matriks mingguan Senin sampai Jumat yang rapi dan proporsional.',
    features: [
      'Kop jadwal sekolah resmi lengkap dengan identitas semester',
      'Lencana status validasi cetak (Jadwal Lengkap dan Valid)',
      'Daftar catatan konflik transparan jika jadwal masih memiliki bentrokan',
      'Skala cetak proporsional A4 tanpa teks yang terpotong',
    ],
  },
  {
    id: 'excel-multi-sheet',
    title: 'Spreadsheet Excel (.xlsx) Multi-Worksheet',
    subtitle: 'Buku Kerja Lengkap dengan 4 Lembar Kerja Terstruktur',
    formatBadge: 'Format .xlsx (4 Lembar Kerja)',
    description: 'Buku kerja lengkap untuk mempermudah rekapitulasi beban mengajar guru, analisis utilisasi ruangan, dan arsip kurikulum.',
    features: [
      'Fitur AutoFilter aktif di setiap baris header lembar kerja',
      'Perlindungan Sanitasi Formula Aktif untuk mencegah injeksi CSV/formula berbahaya',
      'Pembagian 4 lembar kerja mandiri: Jadwal, Rekap Guru, Rekap Ruangan, dan Konflik',
      'Format numerik tabular presisi untuk kalkulasi total jam mengajar mingguan',
    ],
    excelWorksheets: [
      {
        sheetName: 'Jadwal',
        description: 'Matriks lengkap penempatan sesi seluruh kelas berdasarkan hari dan rentang jam pelajaran.',
        sampleColumns: ['Hari', 'Jam Pelajaran', 'Kelas', 'Mata Pelajaran', 'Guru Pengajar', 'Ruangan'],
        sampleRows: [
          { Hari: 'Senin', 'Jam Pelajaran': '07:00 - 08:30', Kelas: 'Kelas VII-A', 'Mata Pelajaran': 'Matematika', 'Guru Pengajar': 'Pak Budi', Ruangan: 'Ruang 7A' },
          { Hari: 'Senin', 'Jam Pelajaran': '08:30 - 09:15', Kelas: 'Kelas VII-A', 'Mata Pelajaran': 'IPA', 'Guru Pengajar': 'Bu Siti', Ruangan: 'Lab IPA' },
          { Hari: 'Senin', 'Jam Pelajaran': '07:00 - 08:30', Kelas: 'Kelas VIII-A', 'Mata Pelajaran': 'Bahasa Indonesia', 'Guru Pengajar': 'Bu Ratna', Ruangan: 'Ruang 8A' },
          { Hari: 'Senin', 'Jam Pelajaran': '08:30 - 09:15', Kelas: 'Kelas VIII-A', 'Mata Pelajaran': 'Matematika', 'Guru Pengajar': 'Pak Budi', Ruangan: 'Ruang 8A' },
        ],
      },
      {
        sheetName: 'Rekap Guru',
        description: 'Rekapitulasi total alokasi jam mengajar per guru untuk perhitungan beban kerja guru dan honorarium.',
        sampleColumns: ['Kode Guru', 'Nama Guru', 'Mata Pelajaran', 'Total Jam Mingguan', 'Status Beban'],
        sampleRows: [
          { 'Kode Guru': 'G01', 'Nama Guru': 'Pak Budi', 'Mata Pelajaran': 'Matematika', 'Total Jam Mingguan': '24 Jam', 'Status Beban': 'Sesuai Standar' },
          { 'Kode Guru': 'G02', 'Nama Guru': 'Bu Siti', 'Mata Pelajaran': 'IPA', 'Total Jam Mingguan': '20 Jam', 'Status Beban': 'Sesuai Standar' },
          { 'Kode Guru': 'G03', 'Nama Guru': 'Bu Ratna', 'Mata Pelajaran': 'Bahasa Indonesia', 'Total Jam Mingguan': '18 Jam', 'Status Beban': 'Cukup' },
        ],
      },
      {
        sheetName: 'Rekap Ruangan',
        description: 'Pemantauan persentase penggunaan laboratorium dan ruangan khusus untuk mencegah jadwal ganda.',
        sampleColumns: ['Kode Ruangan', 'Nama Ruangan', 'Tipe', 'Kapasitas', 'Total Jam Terpakai', 'Utilisasi'],
        sampleRows: [
          { 'Kode Ruangan': 'LAB-IPA', 'Nama Ruangan': 'Lab IPA', Tipe: 'Laboratorium Khusus', Kapasitas: '36 Siswa', 'Total Jam Terpakai': '16 Jam', Utilisasi: '80%' },
          { 'Kode Ruangan': 'LAB-KOMP', 'Nama Ruangan': 'Lab Komputer', Tipe: 'Laboratorium Khusus', Kapasitas: '40 PC', 'Total Jam Terpakai': '22 Jam', Utilisasi: '92%' },
          { 'Kode Ruangan': 'LAP-01', 'Nama Ruangan': 'Lapangan Olahraga', Tipe: 'Area Luar', Kapasitas: '2 Rombel', 'Total Jam Terpakai': '12 Jam', Utilisasi: '60%' },
        ],
      },
      {
        sheetName: 'Konflik',
        description: 'Daftar perincian bentrokan jadwal guru, ruangan, atau waktu istirahat yang perlu ditinjau ulang.',
        sampleColumns: ['No', 'Kode Konflik', 'Kelas Terkait', 'Guru / Ruangan', 'Waktu Bentrokan', 'Status'],
        sampleRows: [
          { No: '1', 'Kode Konflik': 'TEACHER_OVERLAP', 'Kelas Terkait': 'VII-A & VIII-A', 'Guru / Ruangan': 'Pak Budi', 'Waktu Bentrokan': 'Senin 08:30 - 09:00', Status: 'Perlu Revisi' },
          { No: '2', 'Kode Konflik': 'BREAK_TIME_OVERLAP', 'Kelas Terkait': 'VII-A', 'Guru / Ruangan': 'Lab IPA', 'Waktu Bentrokan': 'Senin 09:15 - 09:30', Status: 'Perlu Revisi' },
        ],
      },
    ],
  },
];
