import * as React from 'react';
import { FAQ_ITEMS, type FaqItem } from '@/data/faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FaqAccordionIsland: React.FC = () => {
  const [openIds, setOpenIds] = React.useState<Record<string, boolean>>({
    'faq-1': false,
    'faq-2': false,
    'faq-3': false,
    'faq-4': false,
    'faq-5': false,
    'faq-6': false,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="rounded-none border border-border bg-card text-card-foreground p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="border-b border-border/70 pb-4">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">
          <span>[07 / TANYA JAWAB]</span>
          <span className="mx-1">:</span>
          <span>Pertanyaan Kunci Seputar Schedovyn</span>
        </div>
        <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground">
          Jawaban Lengkap untuk Pihak Sekolah
        </h3>
      </div>

      <div className="divide-y divide-border border border-border">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = !!openIds[item.id];
          const triggerId = `faq-trigger-${item.id}`;
          const contentId = `faq-content-${item.id}`;
          const numStr = `0${index + 1}`;

          return (
            <div key={item.id} className="rounded-none bg-background transition-colors">
              <h4>
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left rounded-none font-sans text-sm sm:text-base font-semibold text-foreground hover:bg-muted/40 transition-colors cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="font-mono text-xs font-bold text-primary tabular-nums shrink-0">
                      {numStr}
                    </span>
                    <span className="leading-snug">{item.question}</span>
                  </div>

                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200',
                      isOpen && 'transform rotate-180 text-primary'
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h4>

              <div
                id={contentId}
                role="region"
                aria-labelledby={triggerId}
                hidden={!isOpen}
                className={cn(
                  'px-4 pb-5 pt-1 sm:px-5 sm:pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 bg-muted/10',
                  !isOpen && 'hidden'
                )}
              >
                <div className="pl-7">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqAccordionIsland;
