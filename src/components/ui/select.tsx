import { type SelectHTMLAttributes, forwardRef } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  onChange?: (value: string) => void;
}

interface SelectTriggerProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', children, onChange, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ${className}`}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export function SelectTrigger({ id, className = '', children }: SelectTriggerProps) {
  return (
    <button type="button" className={`relative flex items-center ${className}`}>
      {children}
    </button>
  );
}

export function SelectContent({ children }: SelectContentProps) {
  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50">
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  return <span className="text-gray-500">{placeholder}</span>;
}

export function SelectItem({ value, children }: SelectItemProps) {
  return (
    <option value={value} className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
      {children}
    </option>
  );
}