import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import ThemeToggle from '../components/layout/ThemeToggle';

describe('ThemeToggle Component (FR-LP-01, AC-LP-05, NFR-LP-03)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('class');
  });

  it('merender tombol dengan aria-label yang jelas dan kelas rounded-none', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toMatch(/tema/i);
    expect(button.className).toContain('rounded-none');
  });

  it('mengubah tema pada document.documentElement dan menyimpan ke localStorage saat tombol diklik', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');

    // Default tema terang (light)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Klik pertama: beralih ke dark
    await user.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('schedovyn-theme')).toBe('dark');

    // Klik kedua: kembali ke light
    await user.click(button);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('schedovyn-theme')).toBe('light');
  });

  it('mengganti tema secara instan saat menekan pintasan tombol D pada window', () => {
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Tekan tombol 'd'
    fireEvent.keyDown(window, { key: 'd' });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('schedovyn-theme')).toBe('dark');

    // Tekan tombol 'D'
    fireEvent.keyDown(window, { key: 'D' });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('schedovyn-theme')).toBe('light');
  });

  it('tidak mengganti tema ketika fokus aktif berada di elemen input, textarea, atau select', () => {
    render(<ThemeToggle />);

    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const select = document.createElement('select');

    document.body.appendChild(input);
    document.body.appendChild(textarea);
    document.body.appendChild(select);

    try {
      // Fokus di input
      input.focus();
      expect(document.activeElement).toBe(input);
      fireEvent.keyDown(window, { key: 'd' });
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Fokus di textarea
      textarea.focus();
      expect(document.activeElement).toBe(textarea);
      fireEvent.keyDown(window, { key: 'D' });
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Fokus di select
      select.focus();
      expect(document.activeElement).toBe(select);
      fireEvent.keyDown(window, { key: 'd' });
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    } finally {
      input.remove();
      textarea.remove();
      select.remove();
    }
  });

  it('tidak mengganti tema jika tombol D ditekan bersamaan dengan Ctrl, Alt, atau Meta', () => {
    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Ctrl + D
    fireEvent.keyDown(window, { key: 'd', ctrlKey: true });
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Alt + D
    fireEvent.keyDown(window, { key: 'd', altKey: true });
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Meta + D
    fireEvent.keyDown(window, { key: 'd', metaKey: true });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
