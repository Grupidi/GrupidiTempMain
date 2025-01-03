import { type ReactNode } from 'react';

interface SheetProps {
  children: ReactNode;
}

export function Sheet({ children }: SheetProps) {
  return <div>{children}</div>;
}

export function SheetTrigger({ asChild, children }: { asChild?: boolean; children: ReactNode }) {
  return <div>{children}</div>;
}

export function SheetContent({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl p-6">
      {children}
    </div>
  );
}

export function SheetHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function SheetTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}