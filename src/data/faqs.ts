export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Biaya & Akun',
    question: 'Apakah Schedovyn benar-benar gratis dan tanpa perlu membuat akun?',
    answer: 'Ya, Schedovyn sepenuhnya gratis tanpa biaya berlangganan tersembunyi. Anda tidak perlu mendaftarkan email, membuat akun, atau memasukkan kata sandi. Cukup buka aplikasi di peramban dan Anda dapat langsung mulai menyusun jadwal sekolah dalam hitungan detik.',
  },
  {
    id: 'faq-2',
    category: 'Akses & Offline',
    question: 'Apakah aplikasi ini bisa digunakan saat koneksi internet sekolah mati?',
    answer: 'Bisa. Schedovyn dibangun dengan arsitektur Progressive Web App (PWA) dan prinsip local-first. Seluruh kode aplikasi di-cache di peramban, sehingga Anda tetap bisa menyusun, mengedit, dan memvalidasi jadwal meskipun jaringan internet sekolah terputus sama sekali.',
  },
  {
    id: 'faq-3',
    category: 'Guru & Ketersediaan',
    question: 'Bagaimana jika satu guru mengajar di banyak kelas dan memiliki hari libur khusus?',
    answer: 'Schedovyn menyediakan fitur konfigurasi interval ketidakhadiran (unavailable intervals) pada data guru. Anda dapat menandai hari atau jam tertentu saat guru berhalangan hadir. Sistem akan otomatis mendeteksi dan memberi peringatan jika sesi pelajaran diletakkan pada jam tersebut.',
  },
  {
    id: 'faq-4',
    category: 'Efisiensi Kerja',
    question: 'Apakah saya bisa menduplikasi jadwal kelas yang mirip tanpa menyusun ulang dari awal?',
    answer: 'Tentu saja. Tersedia fitur Duplikasi Jadwal Kelas Paralel. Anda dapat menyalin seluruh tata letak sesi dari satu kelas ke kelas lain dalam sekali klik, dengan pilihan strategi penugasan: menggunakan guru default kelas tujuan, menyalin guru sumber, atau mengosongkan guru untuk diisi belakangan.',
  },
  {
    id: 'faq-5',
    category: 'Keamanan & Privasi',
    question: 'Di mana data jadwal saya disimpan dan bagaimana cara mengamankannya?',
    answer: 'Seluruh data jadwal disimpan 100% secara lokal di media penyimpanan IndexedDB pada perangkat dan peramban yang Anda gunakan. Data tidak pernah dikirim ke server luar. Kami menyarankan untuk secara rutin mengekspor cadangan jadwal ke berkas Excel atau PDF sebelum membersihkan riwayat dan cache peramban.',
  },
  {
    id: 'faq-6',
    category: 'Logika Penjadwalan',
    question: 'Mengapa jadwal tetap diizinkan ditempatkan ke grid meskipun terjadi konflik?',
    answer: 'Schedovyn mengadopsi prinsip Non-Blocking Placement. Sistem tidak memblokir atau menolak peletakan sesi yang berbenturan, melainkan langsung menandainya dengan bingkai visual merah dan kode diagnostik. Pendekatan Non-Blocking Placement ini memberikan keleluasaan penuh bagi penyusun jadwal untuk menata skenario alternatif sebelum memutuskan resolusi terbaik.',
  },
];
