export type ValidationStatusCode =
  | 'CONFLICT_DETECTED'
  | 'INCOMPLETE'
  | 'NO_CONFLICT_CURRENT_DATA'
  | 'COMPLETE_AND_VALID';

export type ConflictCode =
  | 'TEACHER_OVERLAP'
  | 'ROOM_OVERLAP'
  | 'BREAK_TIME_OVERLAP'
  | 'TEACHER_UNAVAILABLE'
  | 'OUTSIDE_OPERATING_HOURS';

export interface ScheduleSession {
  id: string;
  className: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  startTime: string; // 'HH:mm'
  endTime: string;   // 'HH:mm'
  colorClass: string;
  isConflicting: boolean;
  conflictCode?: ConflictCode;
  conflictReason?: string;
}

export interface SimulationScenario {
  id: 'TEACHER_OVERLAP' | 'SEQUENTIAL_NO_CONFLICT' | 'BREAK_TIME_OVERLAP' | 'INSTANT_RESOLUTION';
  title: string;
  shortLabel: string;
  description: string;
  validationStatus: ValidationStatusCode;
  statusLabel: string;
  scanTimeLabel: string;
  diagnosticTitle: string;
  diagnosticDetail: string;
  actionHint: string;
  sessions: ScheduleSession[];
}

export const BREAK_TIME = {
  start: '09:15',
  end: '09:30',
  label: 'Istirahat Pagi (09:15 - 09:30)',
};

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'TEACHER_OVERLAP',
    title: 'Bentrokan Guru Lintas Kelas',
    shortLabel: 'Bentrokan Guru',
    description: 'Pak Budi dijadwalkan mengajar Matematika di Kelas VII-A dan VIII-A pada jam yang beririsan.',
    validationStatus: 'CONFLICT_DETECTED',
    statusLabel: 'Konflik Ditemukan',
    scanTimeLabel: '< 5 ms',
    diagnosticTitle: 'TEACHER_OVERLAP: Guru Mengajar di Dua Kelas Bersamaan',
    diagnosticDetail: 'Pak Budi terdeteksi mengajar bersamaan di Kelas VII-A dan Kelas VIII-A. Bentrokan 30 menit terdeteksi lintas kelas.',
    actionHint: 'Klik tombol "Selesaikan Konflik Otomatis" untuk menggeser sesi ke jam yang aman.',
    sessions: [
      {
        id: 's1-viia-ipa',
        className: 'Kelas VII-A',
        subject: 'IPA',
        teacher: 'Bu Siti',
        room: 'Lab IPA',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:00',
        colorClass: 'emerald',
        isConflicting: false,
      },
      {
        id: 's1-viia-math',
        className: 'Kelas VII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 7A',
        day: 'Senin',
        startTime: '08:00',
        endTime: '09:00',
        colorClass: 'indigo',
        isConflicting: true,
        conflictCode: 'TEACHER_OVERLAP',
        conflictReason: 'Bentrokan waktu pengajar Pak Budi dengan kelas paralel.',
      },
      {
        id: 's1-viiia-bina',
        className: 'Kelas VIII-A',
        subject: 'Bahasa Indonesia',
        teacher: 'Bu Ratna',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:30',
        colorClass: 'sky',
        isConflicting: false,
      },
      {
        id: 's1-viiia-math',
        className: 'Kelas VIII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '08:30',
        endTime: '09:30',
        colorClass: 'indigo',
        isConflicting: true,
        conflictCode: 'TEACHER_OVERLAP',
        conflictReason: 'Pengajar Pak Budi terdaftar aktif di kelas lain.',
      },
    ],
  },
  {
    id: 'SEQUENTIAL_NO_CONFLICT',
    title: 'Sesi Berurutan Presisi (09:00)',
    shortLabel: 'Sesi Berurutan',
    description: 'Membuktikan bahwa sesi yang berbatasan tepat pada pukul 09:00 tidak dianggap bentrok oleh sistem.',
    validationStatus: 'NO_CONFLICT_CURRENT_DATA',
    statusLabel: 'Tidak Ada Konflik pada Data Saat Ini',
    scanTimeLabel: '< 5 ms',
    diagnosticTitle: 'Batas Jam 09:00 Aman (0 Konflik)',
    diagnosticDetail: 'Sesi Matematika selesai pukul 09:00 dan sesi Bahasa Inggris dimulai pukul 09:00. Tidak ada bentrokan waktu.',
    actionHint: 'Sistem mendukung batas waktu berdekatan tanpa false positive alarm.',
    sessions: [
      {
        id: 's2-viia-math',
        className: 'Kelas VII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 7A',
        day: 'Senin',
        startTime: '08:00',
        endTime: '09:00',
        colorClass: 'indigo',
        isConflicting: false,
      },
      {
        id: 's2-viia-bing',
        className: 'Kelas VII-A',
        subject: 'Bahasa Inggris',
        teacher: 'Bu Dian',
        room: 'Ruang 7A',
        day: 'Senin',
        startTime: '09:00',
        endTime: '10:00',
        colorClass: 'violet',
        isConflicting: false,
      },
      {
        id: 's2-viiia-ips',
        className: 'Kelas VIII-A',
        subject: 'IPS',
        teacher: 'Pak Joko',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:30',
        colorClass: 'amber',
        isConflicting: false,
      },
      {
        id: 's2-viiia-penjas',
        className: 'Kelas VIII-A',
        subject: 'Penjasorkes',
        teacher: 'Pak Agus',
        room: 'Lapangan',
        day: 'Senin',
        startTime: '08:30',
        endTime: '09:45',
        colorClass: 'emerald',
        isConflicting: false,
      },
    ],
  },
  {
    id: 'BREAK_TIME_OVERLAP',
    title: 'Irisan Jam Istirahat Sekolah',
    shortLabel: 'Irisan Istirahat',
    description: 'Sesi pelajaran memotong waktu istirahat pagi sekolah.',
    validationStatus: 'CONFLICT_DETECTED',
    statusLabel: 'Konflik Ditemukan',
    scanTimeLabel: '< 5 ms',
    diagnosticTitle: 'BREAK_TIME_OVERLAP: Memotong Jam Istirahat Sekolah',
    diagnosticDetail: 'Sesi IPA menabrak jeda istirahat pagi sekolah. Pindahkan sesi ke jam sebelum atau sesudah istirahat.',
    actionHint: 'Pindahkan sesi sebelum istirahat atau mulai setelah istirahat berakhir.',
    sessions: [
      {
        id: 's3-viia-ipa',
        className: 'Kelas VII-A',
        subject: 'IPA',
        teacher: 'Bu Siti',
        room: 'Lab IPA',
        day: 'Senin',
        startTime: '08:45',
        endTime: '09:45',
        colorClass: 'emerald',
        isConflicting: true,
        conflictCode: 'BREAK_TIME_OVERLAP',
        conflictReason: 'Sesi menabrak jeda istirahat pagi sekolah.',
      },
      {
        id: 's3-viiia-math',
        className: 'Kelas VIII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '07:30',
        endTime: '09:00',
        colorClass: 'indigo',
        isConflicting: false,
      },
    ],
  },
  {
    id: 'INSTANT_RESOLUTION',
    title: 'Resolusi Instan & Jadwal Valid',
    shortLabel: 'Jadwal Lengkap & Valid',
    description: 'Seluruh bentrokan terselesaikan secara presisi, alokasi terpenuhi, dan jadwal siap diterbitkan.',
    validationStatus: 'COMPLETE_AND_VALID',
    statusLabel: 'Jadwal Lengkap dan Valid',
    scanTimeLabel: '< 5 ms',
    diagnosticTitle: 'Semua Matriks Valid & Siap Digunakan',
    diagnosticDetail: '0 bentrokan terdeteksi pada seluruh kelas. Jam mengajar guru dan utilisasi ruangan 100% konsisten.',
    actionHint: 'Jadwal dapat langsung diekspor ke format PDF landscape atau Excel.',
    sessions: [
      {
        id: 's4-viia-math',
        className: 'Kelas VII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 7A',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:30',
        colorClass: 'indigo',
        isConflicting: false,
      },
      {
        id: 's4-viia-ipa',
        className: 'Kelas VII-A',
        subject: 'IPA',
        teacher: 'Bu Siti',
        room: 'Lab IPA',
        day: 'Senin',
        startTime: '08:30',
        endTime: '09:15',
        colorClass: 'emerald',
        isConflicting: false,
      },
      {
        id: 's4-viiia-bina',
        className: 'Kelas VIII-A',
        subject: 'Bahasa Indonesia',
        teacher: 'Bu Ratna',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '07:00',
        endTime: '08:30',
        colorClass: 'sky',
        isConflicting: false,
      },
      {
        id: 's4-viiia-math',
        className: 'Kelas VIII-A',
        subject: 'Matematika',
        teacher: 'Pak Budi',
        room: 'Ruang 8A',
        day: 'Senin',
        startTime: '08:30',
        endTime: '09:15',
        colorClass: 'indigo',
        isConflicting: false,
      },
    ],
  },
];
