import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import ConflictPlaygroundIsland from '../components/islands/ConflictPlaygroundIsland';

describe('ConflictPlaygroundIsland (FR-LP-04, AC-LP-03, AC-LP-05, NFR-LP-03)', () => {
  it('merender state awal skenario TEACHER_OVERLAP dengan status Konflik Ditemukan dan penjelasan Pak Budi', () => {
    render(<ConflictPlaygroundIsland />);

    // Memeriksa kedua baris kelas
    expect(screen.getByText('Kelas VII-A')).toBeInTheDocument();
    expect(screen.getByText('Kelas VIII-A')).toBeInTheDocument();

    // Lencana status dan metrik waktu pemindaian
    expect(screen.getByText('Konflik Ditemukan')).toBeInTheDocument();
    expect(screen.getByText('< 5 ms')).toBeInTheDocument();

    // Kode konflik dan keterlibatan guru Pak Budi
    expect(screen.getByText(/TEACHER_OVERLAP/i)).toBeInTheDocument();
    const pakBudiElements = screen.getAllByText(/Pak Budi/i);
    expect(pakBudiElements.length).toBeGreaterThanOrEqual(1);

    // Rentang jam bentrokan (08:00 - 09:00 dan 08:30 - 09:30)
    expect(screen.getByText(/08:00\s*-\s*09:00/)).toBeInTheDocument();
    expect(screen.getByText(/08:30\s*-\s*09:30/)).toBeInTheDocument();
  });

  it('beralih ke skenario SEQUENTIAL_NO_CONFLICT saat tab dipilih dan membuktikan sesi berbatasan 09:00 bebas konflik', async () => {
    const user = userEvent.setup();
    render(<ConflictPlaygroundIsland />);

    const tabs = screen.getAllByRole('tab');
    // Tab ke-2 mewakili SEQUENTIAL_NO_CONFLICT
    const sequentialTab = tabs.find((t) => /berurutan|sequential/i.test(t.textContent || '')) || tabs[1];
    await user.click(sequentialTab);

    // Status berubah menjadi Tidak Ada Konflik pada Data Saat Ini
    expect(screen.getByText('Tidak Ada Konflik pada Data Saat Ini')).toBeInTheDocument();

    // Jam berurutan tampil
    expect(screen.getByText(/08:00\s*-\s*09:00/)).toBeInTheDocument();
    expect(screen.getByText(/09:00\s*-\s*10:00/)).toBeInTheDocument();

    // Tidak ada pesan konflik aktif
    expect(screen.queryByText(/Konflik Ditemukan/)).not.toBeInTheDocument();
  });

  it('beralih ke skenario BREAK_TIME_OVERLAP dan menampilkan peringatan irisan jam istirahat', async () => {
    const user = userEvent.setup();
    render(<ConflictPlaygroundIsland />);

    const tabs = screen.getAllByRole('tab');
    // Tab ke-3 mewakili BREAK_TIME_OVERLAP
    const breakTab = tabs.find((t) => /istirahat|break/i.test(t.textContent || '')) || tabs[2];
    await user.click(breakTab);

    expect(screen.getByText('Konflik Ditemukan')).toBeInTheDocument();
    expect(screen.getByText(/BREAK_TIME_OVERLAP/i)).toBeInTheDocument();
    expect(screen.getByText(/09:15\s*-\s*09:30/)).toBeInTheDocument();
  });

  it('beralih ke skenario INSTANT_RESOLUTION dengan status Jadwal Lengkap dan Valid', async () => {
    const user = userEvent.setup();
    render(<ConflictPlaygroundIsland />);

    // Mencari tombol resolusi cepat atau tab ke-4
    const quickResolveButton = screen.queryByRole('button', { name: /selesaikan|geser|resolusi/i });
    if (quickResolveButton) {
      await user.click(quickResolveButton);
    } else {
      const tabs = screen.getAllByRole('tab');
      const resolutionTab = tabs.find((t) => /resolusi|valid|lengkap/i.test(t.textContent || '')) || tabs[3];
      await user.click(resolutionTab);
    }

    expect(screen.getByText('Jadwal Lengkap dan Valid')).toBeInTheDocument();
    expect(screen.queryByText(/Konflik Ditemukan/)).not.toBeInTheDocument();
  });

  it('memenuhi aksesibilitas role="tab" dan prinsip desain radix-lyra (tabular-nums, rounded-none)', () => {
    const { container } = render(<ConflictPlaygroundIsland />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs.length).toBe(4);

    // Tab terpilih pertama memiliki aria-selected="true"
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    // Memeriksa keberadaan kelas tabular-nums dan rounded-none
    const tabularElements = container.querySelectorAll('.tabular-nums');
    expect(tabularElements.length).toBeGreaterThan(0);

    const roundedNoneElements = container.querySelectorAll('.rounded-none');
    expect(roundedNoneElements.length).toBeGreaterThan(0);
  });
});
