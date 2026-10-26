import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [isDark, setIsDark] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Sync initial state from documentElement or localStorage
    const stored = localStorage.getItem('schedovyn-theme');
    const hasDarkClass = document.documentElement.classList.contains('dark');
    if (stored === 'dark' || (!stored && hasDarkClass)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'd' && e.key !== 'D') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const target = document.activeElement as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toUpperCase();
        if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || target.isContentEditable) {
          return;
        }
      }

      // Toggle theme
      const nextDark = !document.documentElement.classList.contains('dark');
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('schedovyn-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('schedovyn-theme', 'light');
      }
      setIsDark(nextDark);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('schedovyn-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('schedovyn-theme', 'light');
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      title="Ganti tema terang/gelap (Pintasan: D)"
      className={cn(
        'inline-flex items-center justify-center gap-1.5 h-9 px-2.5 rounded-none border border-border bg-background text-foreground hover:bg-muted font-sans text-xs cursor-pointer select-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-500" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" aria-hidden="true" />
      )}
      <span className="sr-only sm:not-sr-only text-xs font-mono text-muted-foreground uppercase">
        D
      </span>
    </button>
  );
};

export default ThemeToggle;
