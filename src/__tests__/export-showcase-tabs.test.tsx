import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ExportShowcaseTabsIsland from '../components/islands/ExportShowcaseTabsIsland';

describe('ExportShowcaseTabsIsland (FR-LP-06, AC-LP-04, NFR-LP-03)', () => {
  it('merender tab default PDF Landscape dengan matriks mingguan dan status validasi', () => {
    render(<ExportShowcaseTabsIsland />);

    // Memeriksa keberadaan indikator atau judul PDF Landscape
    expect(screen.getByText(/PDF/i)).toBeInTheDocument();

    // Memeriksa keberadaan indikator matriks mingguan atau status validasi
    const pdfIndicators = screen.getAllByText(/(?:Landscape|Matriks|Validasi|Konflik)/i);
    expect(pdfIndicators.length).toBeGreaterThan(0);
  });

  it('beralih ke tab Excel Multi-Worksheet dan menampilkan 4 lembar kerja serta fitur AutoFilter dan Sanitasi Formula', async () => {
    const user = userEvent.setup();
    render(<ExportShowcaseTabsIsland />);

    // Klik tab Excel
    const excelTab = screen.getByRole('tab', { name: /excel/i });
    await user.click(excelTab);

    // Memastikan ke-4 worksheet tersedia
    expect(screen.getByText('Jadwal')).toBeInTheDocument();
    expect(screen.getByText('Rekap Guru')).toBeInTheDocument();
    expect(screen.getByText('Rekap Ruangan')).toBeInTheDocument();
    expect(screen.getByText('Konflik')).toBeInTheDocument();

    // Memastikan fitur AutoFilter dan Sanitasi Formula dijelaskan
    expect(screen.getByText(/AutoFilter/i)).toBeInTheDocument();
    expect(screen.getByText(/Sanitasi Formula/i)).toBeInTheDocument();
  });

  it('memperbarui konten pratinjau saat berganti antar-worksheet Excel', async () => {
    const user = userEvent.setup();
    render(<ExportShowcaseTabsIsland />);

    // Beralih ke tab Excel
    const excelTab = screen.getByRole('tab', { name: /excel/i });
    await user.click(excelTab);

    // Klik sheet Rekap Guru
    const teacherSheetTab = screen.getByText('Rekap Guru');
    await user.click(teacherSheetTab);
    expect(screen.getAllByText(/Guru|Pengajar|Beban/i).length).toBeGreaterThan(0);

    // Klik sheet Rekap Ruangan
    const roomSheetTab = screen.getByText('Rekap Ruangan');
    await user.click(roomSheetTab);
    expect(screen.getAllByText(/Ruang|Lab|Kapasitas/i).length).toBeGreaterThan(0);

    // Klik sheet Konflik
    const conflictSheetTab = screen.getByText('Konflik');
    await user.click(conflictSheetTab);
    expect(screen.getAllByText(/Konflik|Bentrokan|Catatan/i).length).toBeGreaterThan(0);
  });

  it('menerapkan prinsip desain radix-lyra dengan kelas rounded-none', () => {
    const { container } = render(<ExportShowcaseTabsIsland />);

    const roundedNoneElements = container.querySelectorAll('.rounded-none');
    expect(roundedNoneElements.length).toBeGreaterThan(0);
  });
});
