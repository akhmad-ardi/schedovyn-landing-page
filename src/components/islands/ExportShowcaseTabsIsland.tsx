import * as React from 'react';
import {
  EXPORT_SHOWCASE_TABS,
  type ExportShowcaseTab,
  type ExcelWorksheet,
} from '@/data/features';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  FileSpreadsheet,
  Download,
  Filter,
  ShieldCheck,
  CheckCircle2,
  Printer,
  TableProperties,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const ExportShowcaseTabsIsland: React.FC = () => {
  const [activeTabId, setActiveTabId] = React.useState<ExportShowcaseTab['id']>('pdf-landscape');
  const [activeSheetIndex, setActiveSheetIndex] = React.useState<number>(0);

  const pdfTab = EXPORT_SHOWCASE_TABS.find((t) => t.id === 'pdf-landscape') || EXPORT_SHOWCASE_TABS[0];
  const excelTab = EXPORT_SHOWCASE_TABS.find((t) => t.id === 'excel-multi-sheet') || EXPORT_SHOWCASE_TABS[1];

  const currentWorksheet: ExcelWorksheet | undefined = excelTab.excelWorksheets?.[activeSheetIndex];

  return (
    <div className="rounded-none border border-border bg-card text-card-foreground p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
            <span>[04 / EKSPOR DOKUMEN]</span>
            <span className="mx-1">:</span>
            <span>Pratinjau Hasil Cetak & Spreadsheet</span>
          </div>
          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
            Pameran Format Ekspor Jadwal
          </h3>
        </div>

        {/* Tab Controls */}
        <div role="tablist" aria-label="Format Ekspor Dokumen" className="flex items-center gap-1.5 p-1 border border-border bg-muted/40">
          <button
            role="tab"
            type="button"
            id="tab-pdf"
            aria-selected={activeTabId === 'pdf-landscape'}
            aria-controls="panel-pdf-landscape"
            onClick={() => setActiveTabId('pdf-landscape')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-medium transition-colors cursor-pointer select-none',
              activeTabId === 'pdf-landscape'
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            )}
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            <span>Dokumen PDF Cetak Landscape</span>
          </button>

          <button
            role="tab"
            type="button"
            id="tab-excel"
            aria-selected={activeTabId === 'excel-multi-sheet'}
            aria-controls="panel-excel-multi-sheet"
            onClick={() => setActiveTabId('excel-multi-sheet')}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-none text-xs font-medium transition-colors cursor-pointer select-none',
              activeTabId === 'excel-multi-sheet'
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            )}
          >
            <FileSpreadsheet className="h-4 w-4" aria-hidden="true" />
            <span>Spreadsheet Excel (.xlsx) Multi-Worksheet</span>
          </button>
        </div>
      </div>

      {/* Panel 1: PDF Landscape */}
      {activeTabId === 'pdf-landscape' && (
        <div
          id="panel-pdf-landscape"
          role="tabpanel"
          aria-labelledby="tab-pdf"
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30 border border-border p-3.5">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-[11px]">
                  {pdfTab.formatBadge}
                </Badge>
                <span className="text-xs font-semibold text-foreground">
                  {pdfTab.subtitle}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {pdfTab.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Siap Cetak A4</span>
              </span>
            </div>
          </div>

          {/* PDF Visual Mockup Sheet */}
          <div className="border border-border bg-background p-4 sm:p-6 shadow-sm space-y-4">
            {/* Kop Jadwal */}
            <div className="border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-foreground tracking-tight">
                  JADWAL PELAJARAN SEMESTER GANJIL 2026/2027
                </h4>
                <p className="text-xs text-muted-foreground">
                  Matriks Jadwal Mingguan Resmi Institusi Pendidikan
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="emerald" className="text-[10px]">
                  <CheckCircle2 className="h-3 w-3 mr-1" aria-hidden="true" />
                  Status Validasi: Jadwal Lengkap dan Valid
                </Badge>
              </div>
            </div>

            {/* Matriks Mingguan Table Mockup */}
            <div className="overflow-x-auto border border-border">
              <table className="w-full text-xs text-left border-collapse min-w-[580px]">
                <thead>
                  <tr className="bg-muted border-b border-border font-mono text-muted-foreground">
                    <th className="p-2 border-r border-border font-semibold w-24">Waktu</th>
                    <th className="p-2 border-r border-border font-semibold">Senin</th>
                    <th className="p-2 border-r border-border font-semibold">Selasa</th>
                    <th className="p-2 border-r border-border font-semibold">Rabu</th>
                    <th className="p-2 border-r border-border font-semibold">Kamis</th>
                    <th className="p-2 font-semibold">Jumat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/20">
                    <td className="p-2 font-mono text-muted-foreground border-r border-border tabular-nums">07:00 - 08:30</td>
                    <td className="p-2 border-r border-border bg-primary/5">
                      <div className="font-semibold text-foreground">Matematika</div>
                      <div className="text-[10px] text-muted-foreground">Pak Budi (Ruang 7A)</div>
                    </td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">Bahasa Indonesia</div>
                      <div className="text-[10px] text-muted-foreground">Bu Ratna (Ruang 7A)</div>
                    </td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">IPA Terpadu</div>
                      <div className="text-[10px] text-muted-foreground">Bu Siti (Lab IPA)</div>
                    </td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">Bahasa Inggris</div>
                      <div className="text-[10px] text-muted-foreground">Bu Dian (Ruang 7A)</div>
                    </td>
                    <td className="p-2">
                      <div className="font-semibold text-foreground">Pendidikan Agama</div>
                      <div className="text-[10px] text-muted-foreground">Pak Mansur (Ruang 7A)</div>
                    </td>
                  </tr>
                  <tr className="bg-muted/50 border-y border-dashed border-border text-[11px] font-mono text-muted-foreground">
                    <td className="p-1.5 border-r border-border tabular-nums">09:15 - 09:30</td>
                    <td colSpan={5} className="p-1.5 text-center text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                      Zona Istirahat Pagi Sekolah
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/20">
                    <td className="p-2 font-mono text-muted-foreground border-r border-border tabular-nums">09:30 - 11:00</td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">IPA Terpadu</div>
                      <div className="text-[10px] text-muted-foreground">Bu Siti (Lab IPA)</div>
                    </td>
                    <td className="p-2 border-r border-border bg-primary/5">
                      <div className="font-semibold text-foreground">Matematika</div>
                      <div className="text-[10px] text-muted-foreground">Pak Budi (Ruang 7A)</div>
                    </td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">Penjasorkes</div>
                      <div className="text-[10px] text-muted-foreground">Pak Agus (Lapangan)</div>
                    </td>
                    <td className="p-2 border-r border-border">
                      <div className="font-semibold text-foreground">IPS Terpadu</div>
                      <div className="text-[10px] text-muted-foreground">Pak Joko (Ruang 7A)</div>
                    </td>
                    <td className="p-2">
                      <div className="font-semibold text-foreground">Seni Budaya</div>
                      <div className="text-[10px] text-muted-foreground">Bu Maya (Ruang Kesenian)</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Catatan Konflik Footer */}
            <div className="border border-border/80 bg-muted/20 p-2.5 text-xs flex items-center justify-between text-muted-foreground">
              <span className="font-medium text-foreground">Catatan Audit Konflik:</span>
              <span className="font-mono text-[11px]">0 Bentrokan Jadwal Terdeteksi (Valid)</span>
            </div>
          </div>
        </div>
      )}

      {/* Panel 2: Excel Multi-Worksheet */}
      {activeTabId === 'excel-multi-sheet' && (
        <div
          id="panel-excel-multi-sheet"
          role="tabpanel"
          aria-labelledby="tab-excel"
          className="space-y-4"
        >
          {/* Feature Badges for Excel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-muted/30 border border-border p-3.5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="primary" className="text-[11px]">
                  {excelTab.formatBadge}
                </Badge>
                <span className="text-xs font-semibold text-foreground">
                  {excelTab.subtitle}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {excelTab.description}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-none border border-border bg-card text-foreground">
                <Filter className="h-3 w-3 text-primary" aria-hidden="true" />
                <span>AutoFilter Aktif</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-none border border-emerald-600/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                <span>Sanitasi Formula Aktif</span>
              </span>
            </div>
          </div>

          {/* Worksheet Navigator & Table Content */}
          <div className="border border-border bg-card shadow-sm">
            {/* Sheet Sub-Tabs */}
            <div className="flex items-center gap-1 border-b border-border bg-muted/40 p-1.5 overflow-x-auto">
              {excelTab.excelWorksheets?.map((sheet, index) => {
                const isSelected = activeSheetIndex === index;
                return (
                  <button
                    key={sheet.sheetName}
                    type="button"
                    onClick={() => setActiveSheetIndex(index)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-none text-xs font-medium cursor-pointer transition-colors border select-none whitespace-nowrap',
                      isSelected
                        ? 'border-border bg-background text-foreground shadow-xs font-semibold'
                        : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <TableProperties className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                    <span>{sheet.sheetName}</span>
                  </button>
                );
              })}
            </div>

            {/* Current Sheet Content Table */}
            {currentWorksheet && (
              <div className="p-4 space-y-3">
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Deskripsi Lembar Kerja: </span>
                  {currentWorksheet.description}
                </div>

                <div className="overflow-x-auto border border-border">
                  <table className="w-full text-xs text-left border-collapse min-w-[540px]">
                    <thead>
                      <tr className="bg-muted border-b border-border font-mono text-muted-foreground">
                        {currentWorksheet.sampleColumns.map((col) => (
                          <th key={col} className="p-2 border-r border-border last:border-r-0 font-semibold">
                            <div className="flex items-center justify-between gap-1">
                              <span>{col}</span>
                              <Filter className="h-2.5 w-2.5 opacity-60" aria-hidden="true" />
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {currentWorksheet.sampleRows.map((row, rIndex) => (
                        <tr key={rIndex} className="hover:bg-muted/20">
                          {currentWorksheet.sampleColumns.map((col) => (
                            <td key={col} className="p-2 border-r border-border last:border-r-0 tabular-nums">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportShowcaseTabsIsland;
