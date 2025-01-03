import { type ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  className?: string;
}

export function Alert({ children, className = '' }: AlertProps) {
  return (
    <div className={`rounded-lg border p-4 ${className}`} role="alert">
      {children}
    </div>
  );
}

export function AlertDescription({ children, className = '' }: AlertProps) {
  return <div className={`text-sm ${className}`}>{children}</div>;
}