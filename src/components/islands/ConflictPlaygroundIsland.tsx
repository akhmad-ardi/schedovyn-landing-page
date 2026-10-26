import * as React from 'react';
import {
  SIMULATION_SCENARIOS,
  BREAK_TIME,
  type SimulationScenario,
  type ScheduleSession,
  type ValidationStatusCode,
} from '@/data/simulation-scenarios';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle2, Clock, Zap, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ConflictPlaygroundIsland: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = React.useState<SimulationScenario['id']>('TEACHER_OVERLAP');

  const activeScenario = React.useMemo(() => {
    return (
      SIMULATION_SCENARIOS.find((s) => s.id === activeScenarioId) ||
      SIMULATION_SCENARIOS[0]
    );
  }, [activeScenarioId]);

  const getStatusBadgeVariant = (status: ValidationStatusCode): 'conflict' | 'warning' | 'sky' | 'emerald' => {
    switch (status) {
      case 'CONFLICT_DETECTED':
        return 'conflict';
      case 'INCOMPLETE':
        return 'warning';
      case 'NO_CONFLICT_CURRENT_DATA':
        return 'sky';
      case 'COMPLETE_AND_VALID':
        return 'emerald';
    }
  };

  const viiaSessions = activeScenario.sessions.filter((s) => s.className === 'Kelas VII-A');
  const viiiaSessions = activeScenario.sessions.filter((s) => s.className === 'Kelas VIII-A');

  const handleResolveConflict = () => {
    setActiveScenarioId('INSTANT_RESOLUTION');
  };

  return (
    <div className="rounded-none border border-border bg-card text-card-foreground p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Header & Scenario Selector */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-border/70 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
              <span>[02 / SIMULASI INTERAKTIF]</span>
              <span>:</span>
              <span>Hari Senin (07:00 - 10:00)</span>
            </div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
              Simulasi Deteksi Konflik Lintas Kelas
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={getStatusBadgeVariant(activeScenario.validationStatus)} className="text-xs px-2.5 py-1">
              {activeScenario.validationStatus === 'CONFLICT_DETECTED' ? (
                <AlertTriangle className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
              )}
              {activeScenario.statusLabel}
            </Badge>

            <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-none border border-border bg-muted/50 text-foreground tabular-nums">
              <Zap className="h-3 w-3 text-primary" aria-hidden="true" />
              <span>{activeScenario.scanTimeLabel}</span>
            </span>
          </div>
        </div>

        {/* 4 Scenario Tablist */}
        <div role="tablist" aria-label="Pilihan Skenario Deteksi Konflik" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SIMULATION_SCENARIOS.map((scenario, index) => {
            const isSelected = activeScenarioId === scenario.id;
            const stepNum = `0${index + 1}`;
            return (
              <button
                key={scenario.id}
                role="tab"
                type="button"
                id={`tab-${scenario.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${scenario.id}`}
                onClick={() => setActiveScenarioId(scenario.id)}
                className={cn(
                  'rounded-none border p-2.5 sm:p-3 text-left transition-all cursor-pointer select-none',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm ring-1 ring-primary'
                    : 'border-border bg-background hover:bg-muted text-foreground'
                )}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={cn('tabular-nums font-bold', isSelected ? 'text-primary-foreground/90' : 'text-primary')}>
                    {stepNum}
                  </span>
                  <span className={cn('text-[10px] uppercase', isSelected ? 'text-primary-foreground/75' : 'text-muted-foreground')}>
                    {scenario.id === 'SEQUENTIAL_NO_CONFLICT' ? 'Berurutan' : scenario.id === 'BREAK_TIME_OVERLAP' ? 'Istirahat' : scenario.id === 'INSTANT_RESOLUTION' ? 'Resolusi' : 'Bentrokan'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate leading-snug">
                  {scenario.shortLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Canvas Area: 2 Class Rows */}
      <div
        id={`panel-${activeScenario.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeScenario.id}`}
        className="space-y-4"
      >
        {/* Timeline Header bar */}
        <div className="overflow-x-auto border border-border bg-muted/30 p-3">
          <div className="min-w-[640px] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-28 pb-1 border-b border-border/50">
              <span className="tabular-nums">07:00</span>
              <span className="tabular-nums">08:00</span>
              <span className="tabular-nums">08:30</span>
              <span className="tabular-nums">09:00</span>
              <span className="tabular-nums font-semibold text-amber-600 dark:text-amber-400">Jeda Istirahat</span>
              <span className="tabular-nums">10:00</span>
            </div>

            {/* Row 1: Kelas VII-A */}
            <div className="flex items-stretch gap-2">
              <div className="w-24 shrink-0 flex items-center justify-center p-2 rounded-none border border-border bg-muted font-heading font-semibold text-xs text-foreground select-none">
                Kelas VII-A
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1.5 min-h-[64px] relative">
                {viiaSessions.map((session) => renderSessionCard(session))}
              </div>
            </div>

            {/* Break Time Marker Ribbon */}
            <div className="flex items-center text-[11px] font-mono text-muted-foreground bg-muted/60 border border-dashed border-border px-3 py-1">
              <Clock className="h-3 w-3 mr-1.5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
              <span>Zona Istirahat Pagi:</span>
              <span className="ml-1 font-semibold text-foreground tabular-nums">{BREAK_TIME.start} - {BREAK_TIME.end}</span>
              <span className="ml-auto text-[10px] text-muted-foreground">Tidak boleh ada kegiatan belajar pada interval ini</span>
            </div>

            {/* Row 2: Kelas VIII-A */}
            <div className="flex items-stretch gap-2">
              <div className="w-24 shrink-0 flex items-center justify-center p-2 rounded-none border border-border bg-muted font-heading font-semibold text-xs text-foreground select-none">
                Kelas VIII-A
              </div>
              <div className="flex-1 grid grid-cols-12 gap-1.5 min-h-[64px] relative">
                {viiiaSessions.map((session) => renderSessionCard(session))}
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Panel */}
        <div
          className={cn(
            'rounded-none border p-4 space-y-3',
            activeScenario.validationStatus === 'CONFLICT_DETECTED'
              ? 'border-red-600/70 bg-red-500/5 text-foreground'
              : activeScenario.validationStatus === 'COMPLETE_AND_VALID'
              ? 'border-emerald-600/70 bg-emerald-500/5 text-foreground'
              : 'border-sky-600/70 bg-sky-500/5 text-foreground'
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  [Diagnostik Sistem]
                </span>
                <span className="font-mono text-xs text-muted-foreground font-semibold">
                  {activeScenario.diagnosticTitle}
                </span>
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {activeScenario.diagnosticDetail}
              </p>
            </div>

            {activeScenario.validationStatus === 'CONFLICT_DETECTED' && (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleResolveConflict}
                className="shrink-0 gap-1.5 text-xs font-semibold"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Selesaikan Konflik Otomatis</span>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1 border-t border-border/50">
            <span className="font-semibold text-foreground">Keterangan:</span>
            <span>{activeScenario.actionHint}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderSessionCard(session: ScheduleSession) {
  const startMinutes = parseTimeToMinutes(session.startTime) - 7 * 60;
  const durationMinutes = parseTimeToMinutes(session.endTime) - parseTimeToMinutes(session.startTime);
  const colStart = Math.max(1, Math.min(12, Math.floor(startMinutes / 15) + 1));
  const colSpan = Math.max(1, Math.min(12, Math.ceil(durationMinutes / 15)));

  return (
    <div
      key={session.id}
      style={{ gridColumn: `${colStart} / span ${colSpan}` }}
      className={cn(
        'rounded-none border p-2 flex flex-col justify-between transition-all select-none',
        session.isConflicting
          ? 'border-2 border-red-600 dark:border-red-500 bg-red-500/10 text-red-950 dark:text-red-100 ring-1 ring-red-500'
          : 'border-border bg-card hover:border-primary/50 text-foreground'
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="font-heading font-bold text-xs truncate">
          {session.subject}
        </span>
        {session.isConflicting && (
          <span className="inline-flex items-center text-[10px] font-mono text-red-600 dark:text-red-400 font-bold uppercase">
            <AlertTriangle className="h-3 w-3 mr-0.5 shrink-0" aria-hidden="true" />
            <span>Peringatan</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1">
        <span className="font-medium text-foreground truncate">{session.teacher}</span>
        <span className="font-mono text-[10px] tabular-nums text-foreground/80">
          {session.startTime} - {session.endTime}
        </span>
      </div>

      <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-0.5">
        <span>{session.room}</span>
        {session.conflictReason && (
          <span className="text-[9px] text-red-600 dark:text-red-400 font-medium truncate max-w-[120px]">
            {session.conflictReason}
          </span>
        )}
      </div>
    </div>
  );
}

function parseTimeToMinutes(timeStr: string): number {
  const parts = timeStr.split(':');
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
}

export default ConflictPlaygroundIsland;
