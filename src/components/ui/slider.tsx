import { type InputHTMLAttributes, forwardRef } from 'react';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className = '', value, onValueChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = [parseInt(e.target.value, 10)];
      onValueChange?.(newValue);
    };

    return (
      <input
        ref={ref}
        type="range"
        value={value?.[0]}
        onChange={handleChange}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${className}`}
        {...props}
      />
    );
  }
);

Slider.displayName = 'Slider';