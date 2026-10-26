import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary font-medium transition-colors',
      outline: 'bg-background text-foreground hover:bg-muted border border-border font-medium transition-colors',
      ghost: 'hover:bg-muted text-foreground font-medium transition-colors',
      destructive: 'bg-red-600 text-white hover:bg-red-700 border border-red-600 font-medium transition-colors',
    };

    const sizeClasses = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-11 px-6 text-sm sm:text-base font-semibold',
      icon: 'h-9 w-9 p-0 inline-flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-none font-sans select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
