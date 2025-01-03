import * as React from 'react';

interface PopoverProps {
  children: React.ReactNode;
}

export function Popover({ children }: PopoverProps) {
  return <div className="relative">{children}</div>;
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

export function PopoverTrigger({ asChild, children }: PopoverTriggerProps) {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      'aria-haspopup': 'true',
      'onClick': (e: React.MouseEvent) => {
        e.stopPropagation();
        const content = e.currentTarget.nextElementSibling;
        if (content) {
          content.classList.toggle('hidden');
        }
      },
    });
  }
  return <div>{children}</div>;
}

interface PopoverContentProps {
  className?: string;
  children: React.ReactNode;
}

export function PopoverContent({ className = '', children }: PopoverContentProps) {
  return (
    <div className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-lg p-2 hidden ${className}`}>
      {children}
    </div>
  );
}