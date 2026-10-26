import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'conflict' | 'warning' | 'sky' | 'emerald';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  const variantClasses = {
    default: 'border-border bg-muted text-foreground',
    primary: 'border-primary/40 bg-primary/10 text-primary',
    conflict: 'border-red-600 dark:border-red-500 bg-red-500/10 text-red-700 dark:text-red-300',
    warning: 'border-amber-600 dark:border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300',
    sky: 'border-sky-600 dark:border-sky-400 bg-sky-500/10 text-sky-800 dark:text-sky-300',
    emerald: 'border-emerald-600 dark:border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-none border px-2 py-0.5 text-xs font-medium tabular-nums transition-colors select-none',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};
