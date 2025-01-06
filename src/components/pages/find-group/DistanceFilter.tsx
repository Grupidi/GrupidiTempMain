import { Switch } from "../../ui/switch";
import { Slider } from "../../ui/slider";

interface DistanceFilterProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  value: number;
  onChange: (value: number) => void;
}

export function DistanceFilter({ isEnabled, onToggle, value, onChange }: DistanceFilterProps) {
  return (
    <div className="p-4 border-b border-pink-200 bg-pink-100">
      <div className="flex items-center justify-between mb-4">
        <label className="text-sm font-medium text-pink-800">
          Distance Filter
        </label>
        <Switch
          checked={isEnabled}
          onCheckedChange={onToggle}
        />
      </div>

      {isEnabled && (
        <>
          <div className="flex items-center justify-between mb-2 text-pink-800">
            <span className="text-sm font-medium">0 mi</span>
            <span className="text-sm font-medium">{value} mi</span>
            <span className="text-sm font-medium">50 mi</span>
          </div>
          <Slider
            value={[value]}
            onValueChange={(values) => onChange(values[0])}
            max={50}
            step={1}
            className="w-full"
          />
        </>
      )}
    </div>
  );
}