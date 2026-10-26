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

export const SITE_CONFIG: SiteConfig = {
  brandName: 'Schedovyn',
  tagline: 'Smart Timetable Planner',
  versionBadge: 'v1.0 Local-First',
  appUrl: (typeof process !== 'undefined' && process.env?.PUBLIC_APP_URL) || import.meta.env?.PUBLIC_APP_URL || 'https://app.schedovyn.com',
  guideUrl: (typeof process !== 'undefined' && process.env?.PUBLIC_GUIDE_URL) || import.meta.env?.PUBLIC_GUIDE_URL || 'https://guide.schedovyn.com',
  siteUrl: (typeof process !== 'undefined' && process.env?.PUBLIC_SITE_URL) || import.meta.env?.PUBLIC_SITE_URL || 'https://schedovyn.com',
  navAnchors: [
    { id: 'fitur', label: 'Fitur Utama', href: '#fitur' },
    { id: 'cara-kerja', label: 'Cara Kerja', href: '#cara-kerja' },
    { id: 'simulasi', label: 'Simulasi Konflik', href: '#simulasi' },
    { id: 'ekspor', label: 'Ekspor & Laporan', href: '#ekspor' },
    { id: 'faq', label: 'Tanya Jawab', href: '#faq' },
  ],
  trustBarItems: [
    {
      id: 'client-side',
      label: '100% Client-Side & Privasi Lokal',
      description: 'Data tersimpan di browser tanpa server dan tanpa registrasi akun.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'conflict-detection',
      label: 'Deteksi 7 Jenis Konflik Real-Time',
      description: 'Pemindaian tabrakan guru dan ruangan lintas kelas dalam < 5 ms.',
      iconName: 'Zap',
    },
    {
      id: 'export-suite',
      label: 'Ekspor PDF Cetak & Excel Rekap Guru',
      description: 'Dokumen landscape siap tempel dan 4 worksheet spreadsheet terstruktur.',
      iconName: 'FileSpreadsheet',
    },
    {
      id: 'pwa-offline',
      label: 'Mendukung Mode Offline (PWA)',
      description: 'Dapat diinstal di laptop sekolah dan berjalan lancar tanpa koneksi internet.',
      iconName: 'WifiOff',
    },
  ],
  problemSolutions: [
    {
      id: 'conflict-check',
      aspect: 'Deteksi Bentrokan Guru & Ruangan',
      oldWayProblem: 'Bentrokan guru yang mengajar di dua kelas sekaligus sering baru disadari setelah jadwal berjalan.',
      schedovynSolution: 'Mesin deteksi memindai seluruh kelas sekolah dalam waktu < 5 milidetik setiap kali sesi digeser.',
      benefitBadge: '< 5 ms Respon',
    },
    {
      id: 'curriculum-allocation',
      aspect: 'Alokasi Jam Kurikulum',
      oldWayProblem: 'Jam pelajaran sering terlewat atau tidak sesuai alokasi kurikulum mingguan karena hitungan manual.',
      schedovynSolution: 'Panel alokasi otomatis menghitung sisa jam belum terjadwal secara presisi per mata pelajaran.',
      benefitBadge: 'Alokasi Otomatis',
    },
    {
      id: 'schedule-readiness',
      aspect: 'Kepastian Kesiapan Jadwal',
      oldWayProblem: 'Sulit memastikan apakah jadwal sudah bebas konflik atau masih ada bagian yang belum tuntas diatur.',
      schedovynSolution: '4 Status Validasi transparan membedakan konflik aktif, draft belum lengkap, dan jadwal final yang valid.',
      benefitBadge: '4 Status Validasi',
    },
  ],
  workflowSteps: [
    {
      stepNumber: '01',
      title: 'Atur Jam Sekolah & Istirahat',
      description: 'Tentukan hari sekolah aktif (5 atau 6 hari), jam pulang khusus hari Jumat, serta jeda istirahat.',
      highlightTag: 'Struktur Belajar',
      detail: 'Konfigurasi slot waktu dengan interval snap grid fleksibel dari 15 hingga 60 menit.',
    },
    {
      stepNumber: '02',
      title: 'Masukkan Data Master & Alokasi',
      description: 'Input daftar kelas, guru pengajar beserta jadwal ketidakhadiran, ruangan, dan target jam mingguan.',
      highlightTag: 'Data Master',
      detail: 'Palet 10 warna kontras tinggi standar WCAG AA mempermudah pemindaian visual di atas kanvas.',
    },
    {
      stepNumber: '03',
      title: 'Susun di Kanvas & Atasi Konflik',
      description: 'Tarik kartu pelajaran ke grid atau salin susunan kelas paralel dengan bantuan deteksi konflik instan.',
      highlightTag: 'Kanvas Visual',
      detail: 'Setiap bentrokan langsung diberi tanda peringatan visual tanpa mengunci kebebasan penataan jadwal.',
    },
    {
      stepNumber: '04',
      title: 'Cetak PDF & Unduh Rekap Excel',
      description: 'Terbitkan jadwal dalam format PDF landscape siap cetak serta berkas Excel multi-sheet lengkap.',
      highlightTag: 'Publikasi & Laporan',
      detail: 'Format Excel mencakup lembar kerja Jadwal, Rekap Guru, Rekap Ruangan, dan catatan Konflik.',
    },
  ],
};
