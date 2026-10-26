import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

function getSourceFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getSourceFiles(fullPath));
    } else if (/\.(ts|tsx|astro|css)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

describe('Audit Karakter Em Dash (AC-LP-05 & Bagian 4.4 PRD)', () => {
  const srcDir = path.resolve(__dirname, '..');

  it('memastikan direktori src/data/ dan src/components/ telah ada dan tidak kosong', () => {
    const dataDir = path.join(srcDir, 'data');
    const componentsDir = path.join(srcDir, 'components');

    expect(fs.existsSync(dataDir)).toBe(true);
    expect(fs.readdirSync(dataDir).length).toBeGreaterThan(0);

    expect(fs.existsSync(componentsDir)).toBe(true);
    expect(fs.readdirSync(componentsDir).length).toBeGreaterThan(0);
  });

  it('memastikan 0 kemunculan karakter em dash di seluruh berkas sumber src/', () => {
    const files = getSourceFiles(srcDir);
    expect(files.length).toBeGreaterThan(0);

    const violations: { file: string; line: number; text: string }[] = [];
    const emDashRegex = /\u2014/;

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (emDashRegex.test(content)) {
        const lines = content.split('\n');
        lines.forEach((lineText, index) => {
          if (emDashRegex.test(lineText)) {
            violations.push({
              file: path.relative(srcDir, file),
              line: index + 1,
              text: lineText.trim(),
            });
          }
        });
      }
    }

    expect(violations).toEqual([]);
  });
});
