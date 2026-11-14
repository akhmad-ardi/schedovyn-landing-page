import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('Landing Page Astro Sections Verification (AC-LP-01 s.d. AC-LP-07)', () => {
  const componentsDir = path.resolve(__dirname, '../components');
  const layoutsDir = path.resolve(__dirname, '../layouts');

  describe('HeroSection.astro (FR-LP-02 & AC-LP-07)', () => {
    const heroFilePath = path.join(componentsDir, 'sections/HeroSection.astro');

    it('berkas HeroSection.astro tersedia', () => {
      expect(fs.existsSync(heroFilePath)).toBe(true);
    });

    it('memuat headline utama, CTA ke appUrl & guideUrl, serta TrustBar', () => {
      const content = fs.readFileSync(heroFilePath, 'utf-8');

      expect(content).toMatch(/Susun Jadwal Sekolah Tanpa Bentrokan Guru dan Ruangan/);
      expect(content).toMatch(/SITE_CONFIG\.appUrl/);
      expect(content).toMatch(/SITE_CONFIG\.guideUrl/);
      expect(content).toMatch(/<TrustBar/);
    });

    it('memuat indikator Ruang Kerja Aktif (Workspace Switcher) di toolbar mockup sesuai AC-LP-07', () => {
      const content = fs.readFileSync(heroFilePath, 'utf-8');

      // Validasi teks Ruang Kerja dan nama semester (misal: Semester Ganjil) pada toolbar Hero Mockup
      expect(content).toMatch(/Ruang Kerja/i);
      expect(content).toMatch(/Semester Ganjil/i);
      // Tetap memuat indikator Kelas Aktif
      expect(content).toMatch(/Kelas Aktif/i);
    });
  });

  describe('FeatureBentoGrid.astro (FR-LP-05 & AC-LP-07)', () => {
    const bentoFilePath = path.join(componentsDir, 'sections/FeatureBentoGrid.astro');

    it('berkas FeatureBentoGrid.astro tersedia', () => {
      expect(fs.existsSync(bentoFilePath)).toBe(true);
    });

    it('mengimpor dan merender ikon Layers dari lucide-react untuk kartu FR-13 Multi-Workspace', () => {
      const content = fs.readFileSync(bentoFilePath, 'utf-8');

      // Verifikasi impor ikon Layers
      expect(content).toMatch(/import\s*\{[^}]*Layers[^}]*\}\s*from\s*['"]lucide-react['"]/);

      // Verifikasi rendering elemen ikon Layers
      expect(content).toMatch(/item\.iconName\s*===\s*['"]Layers['"]\s*&&\s*<Layers/);
    });
  });

  describe('PrivacyArchitectureSection.astro (FR-LP-08 & AC-LP-07)', () => {
    const privacyFilePath = path.join(componentsDir, 'sections/PrivacyArchitectureSection.astro');

    it('berkas PrivacyArchitectureSection.astro tersedia', () => {
      expect(fs.existsSync(privacyFilePath)).toBe(true);
    });

    it('mencantumkan penjelasan isolasi multi-ruang kerja di IndexedDB dan pemulihan otomatis ruang kerja aktif terakhir', () => {
      const content = fs.readFileSync(privacyFilePath, 'utf-8');

      // Verifikasi penjelasan isolasi multi-ruang kerja / multi-workspace di IndexedDB
      expect(content).toMatch(/(?:multi-ruang kerja|multi-workspace|ruang kerja)/i);
      expect(content).toMatch(/(?:terisolasi|isolasi)/i);
      expect(content).toMatch(/IndexedDB/i);

      // Verifikasi pemulihan otomatis ruang kerja aktif terakhir
      expect(content).toMatch(/(?:pemulihan otomatis|ruang kerja aktif terakhir)/i);
    });
  });

  describe('Navbar.astro, Footer.astro, & BaseLayout.astro (FR-LP-01, FR-LP-10, AC-LP-01)', () => {
    it('Navbar.astro memuat logo, brand, badge versi, anchor links, guideUrl, appUrl, dan ThemeToggle', () => {
      const navbarPath = path.join(componentsDir, 'layout/Navbar.astro');
      expect(fs.existsSync(navbarPath)).toBe(true);

      const content = fs.readFileSync(navbarPath, 'utf-8');
      expect(content).toMatch(/\/favico\.svg/);
      expect(content).toMatch(/SITE_CONFIG\.brandName/);
      expect(content).toMatch(/SITE_CONFIG\.versionBadge/);
      expect(content).toMatch(/SITE_CONFIG\.navAnchors/);
      expect(content).toMatch(/SITE_CONFIG\.guideUrl/);
      expect(content).toMatch(/SITE_CONFIG\.appUrl/);
      expect(content).toMatch(/<ThemeToggle/);
    });

    it('BaseLayout.astro memuat anti-FOUC theme script, JSON-LD SoftwareApplication, dan viewport', () => {
      const layoutPath = path.join(layoutsDir, 'BaseLayout.astro');
      expect(fs.existsSync(layoutPath)).toBe(true);

      const content = fs.readFileSync(layoutPath, 'utf-8');
      expect(content).toMatch(/schedovyn-theme/);
      expect(content).toMatch(/SoftwareApplication/);
      expect(content).toMatch(/viewport/);
    });
  });
});
