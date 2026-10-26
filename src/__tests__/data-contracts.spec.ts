import { describe, it, expect } from 'vitest';

describe('Data Contracts Verification', () => {
  describe('SITE_CONFIG (src/data/site-config.ts)', () => {
    it('memiliki metadata brand, versi, dan URL lintas proyek yang valid', async () => {
      const { SITE_CONFIG } = await import('../data/site-config');

      expect(SITE_CONFIG).toBeDefined();
      expect(SITE_CONFIG.brandName).toBe('Schedovyn');
      expect(SITE_CONFIG.tagline).toBe('Smart Timetable Planner');
      expect(SITE_CONFIG.versionBadge).toBe('v1.0 Local-First');
      expect(typeof SITE_CONFIG.appUrl).toBe('string');
      expect(SITE_CONFIG.appUrl.length).toBeGreaterThan(0);
      expect(typeof SITE_CONFIG.guideUrl).toBe('string');
      expect(SITE_CONFIG.guideUrl.length).toBeGreaterThan(0);
      expect(typeof SITE_CONFIG.siteUrl).toBe('string');
      expect(SITE_CONFIG.siteUrl.length).toBeGreaterThan(0);
    });

    it('memiliki tepat 5 menu navigasi jangkar sesuai spesifikasi FR-LP-01', async () => {
      const { SITE_CONFIG } = await import('../data/site-config');

      expect(SITE_CONFIG.navAnchors).toHaveLength(5);
      const hrefs = SITE_CONFIG.navAnchors.map((item) => item.href);
      expect(hrefs).toEqual(['#fitur', '#cara-kerja', '#simulasi', '#ekspor', '#faq']);

      const ids = SITE_CONFIG.navAnchors.map((item) => item.id);
      expect(ids).toEqual(['fitur', 'cara-kerja', 'simulasi', 'ekspor', 'faq']);
    });

    it('memiliki 4 butir Trust Bar keunggulan utama sesuai FR-LP-02', async () => {
      const { SITE_CONFIG } = await import('../data/site-config');

      expect(SITE_CONFIG.trustBarItems).toHaveLength(4);
      const labels = SITE_CONFIG.trustBarItems.map((item) => item.label);
      expect(labels).toContain('100% Client-Side & Privasi Lokal');
      expect(labels).toContain('Deteksi 7 Jenis Konflik Real-Time');
      expect(labels).toContain('Ekspor PDF Cetak & Excel Rekap Guru');
      expect(labels).toContain('Mendukung Mode Offline (PWA)');
    });

    it('memiliki minimal 3 komparasi Masalah vs Solusi sesuai FR-LP-03', async () => {
      const { SITE_CONFIG } = await import('../data/site-config');

      expect(SITE_CONFIG.problemSolutions.length).toBeGreaterThanOrEqual(3);

      const allText = JSON.stringify(SITE_CONFIG.problemSolutions);
      // Validasi pencantuman kecepatan deteksi konflik (< 5 ms atau < 5 milidetik)
      expect(allText).toMatch(/< 5 (?:ms|milidetik)/i);
      // Validasi kalkulasi otomatis jam/alokasi belum terjadwal
      expect(allText).toMatch(/(?:belum terjadwal|alokasi|sisa)/i);
      // Validasi 4 status validasi transparan
      expect(allText).toMatch(/4 Status Validasi/i);
    });

    it('memiliki tepat 4 langkah alur kerja berurutan 01 s.d. 04 sesuai FR-LP-07', async () => {
      const { SITE_CONFIG } = await import('../data/site-config');

      expect(SITE_CONFIG.workflowSteps).toHaveLength(4);
      const stepNumbers = SITE_CONFIG.workflowSteps.map((s) => s.stepNumber);
      expect(stepNumbers).toEqual(['01', '02', '03', '04']);

      for (const step of SITE_CONFIG.workflowSteps) {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(0);
        expect(step.highlightTag.length).toBeGreaterThan(0);
      }
    });
  });

  describe('SIMULATION_SCENARIOS (src/data/simulation-scenarios.ts)', () => {
    it('memuat tepat 4 skenario interaktif dengan ID spesifik', async () => {
      const { SIMULATION_SCENARIOS } = await import('../data/simulation-scenarios');

      expect(SIMULATION_SCENARIOS).toHaveLength(4);
      const scenarioIds = SIMULATION_SCENARIOS.map((s) => s.id);
      expect(scenarioIds).toEqual([
        'TEACHER_OVERLAP',
        'SEQUENTIAL_NO_CONFLICT',
        'BREAK_TIME_OVERLAP',
        'INSTANT_RESOLUTION',
      ]);
    });

    it('mengonfigurasi Skenario 1 (TEACHER_OVERLAP) dengan irisan guru Pak Budi', async () => {
      const { SIMULATION_SCENARIOS } = await import('../data/simulation-scenarios');
      const scenario = SIMULATION_SCENARIOS.find((s) => s.id === 'TEACHER_OVERLAP');

      expect(scenario).toBeDefined();
      expect(scenario?.validationStatus).toBe('CONFLICT_DETECTED');
      expect(scenario?.statusLabel).toBe('Konflik Ditemukan');
      expect(scenario?.scanTimeLabel).toBe('< 5 ms');

      // Memeriksa keberadaan sesi Kelas VII-A dan Kelas VIII-A yang berbenturan
      const conflictingSessions = scenario?.sessions.filter((sess) => sess.isConflicting);
      expect(conflictingSessions?.length).toBeGreaterThanOrEqual(2);

      const hasVIIA = conflictingSessions?.some((s) => s.className === 'Kelas VII-A' && s.teacher === 'Pak Budi');
      const hasVIIIA = conflictingSessions?.some((s) => s.className === 'Kelas VIII-A' && s.teacher === 'Pak Budi');
      expect(hasVIIIA).toBe(true);
      expect(hasVIIA).toBe(true);

      const overlapSessionCodes = conflictingSessions?.map((s) => s.conflictCode);
      expect(overlapSessionCodes).toContain('TEACHER_OVERLAP');
    });

    it('mengonfigurasi Skenario 2 (SEQUENTIAL_NO_CONFLICT) dengan sesi berurutan 08:00 - 09:00 dan 09:00 - 10:00 tanpa konflik', async () => {
      const { SIMULATION_SCENARIOS } = await import('../data/simulation-scenarios');
      const scenario = SIMULATION_SCENARIOS.find((s) => s.id === 'SEQUENTIAL_NO_CONFLICT');

      expect(scenario).toBeDefined();
      expect(scenario?.validationStatus).toBe('NO_CONFLICT_CURRENT_DATA');
      expect(scenario?.statusLabel).toBe('Tidak Ada Konflik pada Data Saat Ini');

      // Seluruh sesi harus bebas konflik (isConflicting === false)
      const hasConflicts = scenario?.sessions.some((s) => s.isConflicting);
      expect(hasConflicts).toBe(false);

      // Memastikan ada sesi 08:00 - 09:00 dan 09:00 - 10:00 untuk membuktikan sesi berurutan
      const times = scenario?.sessions.map((s) => `${s.startTime}-${s.endTime}`);
      expect(times).toContain('08:00-09:00');
      expect(times).toContain('09:00-10:00');
    });

    it('mengonfigurasi Skenario 3 (BREAK_TIME_OVERLAP) dengan irisan jam istirahat', async () => {
      const { SIMULATION_SCENARIOS } = await import('../data/simulation-scenarios');
      const scenario = SIMULATION_SCENARIOS.find((s) => s.id === 'BREAK_TIME_OVERLAP');

      expect(scenario).toBeDefined();
      expect(scenario?.validationStatus).toBe('CONFLICT_DETECTED');
      expect(scenario?.statusLabel).toBe('Konflik Ditemukan');

      const breakConflicts = scenario?.sessions.filter((s) => s.conflictCode === 'BREAK_TIME_OVERLAP');
      expect(breakConflicts?.length).toBeGreaterThanOrEqual(1);
      expect(breakConflicts?.[0].isConflicting).toBe(true);
    });

    it('mengonfigurasi Skenario 4 (INSTANT_RESOLUTION) dengan status Jadwal Lengkap dan Valid', async () => {
      const { SIMULATION_SCENARIOS } = await import('../data/simulation-scenarios');
      const scenario = SIMULATION_SCENARIOS.find((s) => s.id === 'INSTANT_RESOLUTION');

      expect(scenario).toBeDefined();
      expect(scenario?.validationStatus).toBe('COMPLETE_AND_VALID');
      expect(scenario?.statusLabel).toBe('Jadwal Lengkap dan Valid');

      const hasConflicts = scenario?.sessions.some((s) => s.isConflicting);
      expect(hasConflicts).toBe(false);
    });
  });

  describe('FEATURE_BENTO_ITEMS & EXPORT_SHOWCASE_TABS (src/data/features.ts)', () => {
    it('FEATURE_BENTO_ITEMS memiliki tepat 6 kartu fitur dengan highlight spesifik', async () => {
      const { FEATURE_BENTO_ITEMS } = await import('../data/features');

      expect(FEATURE_BENTO_ITEMS).toHaveLength(6);

      const allContent = JSON.stringify(FEATURE_BENTO_ITEMS);
      // Konfigurasi jam belajar (15, 30, 45, 60 menit)
      expect(allContent).toMatch(/15/);
      expect(allContent).toMatch(/30/);
      expect(allContent).toMatch(/45/);
      expect(allContent).toMatch(/60/);

      // Data master & palet WCAG AA
      expect(allContent).toMatch(/WCAG AA/i);

      // Penyalinan jadwal kelas paralel
      expect(allContent).toMatch(/(?:paralel|salin|duplikasi)/i);

      // Riwayat 50 langkah undo/redo
      expect(allContent).toMatch(/50/);
      expect(allContent).toMatch(/Ctrl\+Z/i);

      // IndexedDB lokal
      expect(allContent).toMatch(/IndexedDB/i);

      // Aksesibilitas keyboard Alt + Panah
      expect(allContent).toMatch(/Alt\s*\+\s*Panah/i);
    });

    it('EXPORT_SHOWCASE_TABS memuat tab PDF Landscape dan Excel Multi-Worksheet dengan 4 sheet', async () => {
      const { EXPORT_SHOWCASE_TABS } = await import('../data/features');

      expect(EXPORT_SHOWCASE_TABS).toHaveLength(2);

      const pdfTab = EXPORT_SHOWCASE_TABS.find((t) => t.id === 'pdf-landscape');
      expect(pdfTab).toBeDefined();
      expect(pdfTab?.title).toMatch(/PDF/i);

      const excelTab = EXPORT_SHOWCASE_TABS.find((t) => t.id === 'excel-multi-sheet');
      expect(excelTab).toBeDefined();
      expect(excelTab?.excelWorksheets).toBeDefined();
      expect(excelTab?.excelWorksheets).toHaveLength(4);

      const sheetNames = excelTab?.excelWorksheets?.map((s) => s.sheetName);
      expect(sheetNames).toEqual(['Jadwal', 'Rekap Guru', 'Rekap Ruangan', 'Konflik']);

      // Memastikan ada catatan AutoFilter dan sanitasi formula
      const allExcelNotes = JSON.stringify(excelTab);
      expect(allExcelNotes).toMatch(/AutoFilter/i);
      expect(allExcelNotes).toMatch(/Sanitasi Formula/i);
    });
  });

  describe('FAQ_ITEMS (src/data/faqs.ts)', () => {
    it('memuat tepat 6 pertanyaan dan jawaban', async () => {
      const { FAQ_ITEMS } = await import('../data/faqs');

      expect(FAQ_ITEMS).toHaveLength(6);
      for (const faq of FAQ_ITEMS) {
        expect(faq.id.length).toBeGreaterThan(0);
        expect(faq.question.length).toBeGreaterThan(0);
        expect(faq.answer.length).toBeGreaterThan(0);
        expect(faq.category.length).toBeGreaterThan(0);
      }
    });

    it('item FAQ ke-6 menjelaskan konsep Non-Blocking Placement secara transparan', async () => {
      const { FAQ_ITEMS } = await import('../data/faqs');
      const q6 = FAQ_ITEMS[5];

      expect(q6).toBeDefined();
      expect(q6.question).toMatch(/konflik|grid/i);
      expect(q6.answer).toMatch(/Non-Blocking Placement/i);
    });
  });
});
