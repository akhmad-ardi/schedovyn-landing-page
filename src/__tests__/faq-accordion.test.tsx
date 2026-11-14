import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import FaqAccordionIsland from '../components/islands/FaqAccordionIsland';

describe('FaqAccordionIsland (FR-LP-09, NFR-LP-03, AC-LP-07)', () => {
  it('merender seluruh 7 pertanyaan umum', () => {
    render(<FaqAccordionIsland />);

    // Memeriksa bahwa terdapat 7 tombol pemicu akordeon
    const triggers = screen.getAllByRole('button').filter((btn) => btn.hasAttribute('aria-expanded'));
    expect(triggers).toHaveLength(7);
  });

  it('setiap tombol pemicu akordeon memiliki atribut aksesibilitas aria-expanded dan aria-controls', () => {
    render(<FaqAccordionIsland />);

    const triggers = screen.getAllByRole('button').filter((btn) => btn.hasAttribute('aria-expanded'));
    for (const trigger of triggers) {
      expect(trigger).toHaveAttribute('aria-expanded');
      expect(trigger).toHaveAttribute('aria-controls');

      const controlledId = trigger.getAttribute('aria-controls');
      expect(controlledId).toBeTruthy();
    }
  });

  it('membuka dan menutup panel jawaban secara akurat saat pertanyaan diklik', async () => {
    const user = userEvent.setup();
    render(<FaqAccordionIsland />);

    const triggers = screen.getAllByRole('button').filter((btn) => btn.hasAttribute('aria-expanded'));
    const targetTrigger = triggers[1]; // Memilih pertanyaan kedua

    const isInitiallyExpanded = targetTrigger.getAttribute('aria-expanded') === 'true';

    // Klik untuk mengubah status
    await user.click(targetTrigger);
    expect(targetTrigger.getAttribute('aria-expanded')).toBe(isInitiallyExpanded ? 'false' : 'true');

    // Klik lagi untuk mengembalikan status
    await user.click(targetTrigger);
    expect(targetTrigger.getAttribute('aria-expanded')).toBe(isInitiallyExpanded ? 'true' : 'false');
  });

  it('memastikan penjelasan konsep Non-Blocking Placement dapat diakses pada jawaban pertanyaan ke-6', async () => {
    const user = userEvent.setup();
    render(<FaqAccordionIsland />);

    const triggers = screen.getAllByRole('button').filter((btn) => btn.hasAttribute('aria-expanded'));
    const q6Trigger = triggers[5]; // Pertanyaan ke-6

    // Buka panel pertanyaan ke-6 bila belum terbuka
    if (q6Trigger.getAttribute('aria-expanded') !== 'true') {
      await user.click(q6Trigger);
    }

    expect(screen.getByText(/Non-Blocking Placement/i)).toBeInTheDocument();
  });

  it('memastikan penjelasan fitur Multi-Ruang Kerja (FR-13) dan mode duplikasi semester dapat diakses pada jawaban pertanyaan ke-7', async () => {
    const user = userEvent.setup();
    render(<FaqAccordionIsland />);

    const triggers = screen.getAllByRole('button').filter((btn) => btn.hasAttribute('aria-expanded'));
    const q7Trigger = triggers[6]; // Pertanyaan ke-7

    expect(q7Trigger).toBeDefined();

    // Buka panel pertanyaan ke-7 bila belum terbuka
    if (q7Trigger.getAttribute('aria-expanded') !== 'true') {
      await user.click(q7Trigger);
    }

    expect(screen.getByText(/Konfigurasi & Data Master Saja/i)).toBeInTheDocument();
    expect(screen.getByText(/Salin Penuh/i)).toBeInTheDocument();
  });

  it('menerapkan estetika teknis radix-lyra dengan sudut tajam rounded-none', () => {
    const { container } = render(<FaqAccordionIsland />);

    const roundedNoneElements = container.querySelectorAll('.rounded-none');
    expect(roundedNoneElements.length).toBeGreaterThan(0);
  });
});
