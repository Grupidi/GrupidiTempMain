import { useState } from 'react';
import { Input } from "./input";
import { Button } from "./button";
import { X } from 'lucide-react';

interface MultiSelectInputProps {
  value: string[];
  onChange: (values: string[]) => void;
  suggestions: string[];
  placeholder?: string;
  className?: string;
  chipClassName?: string;
}

export function MultiSelectInput({
  value,
  onChange,
  suggestions,
  placeholder = "Add new item...",
  className = "",
  chipClassName = ""
}: MultiSelectInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleAddItem = (item: string) => {
    if (item.trim() && !value.includes(item.trim())) {
      onChange([...value, item.trim()]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    onChange(value.filter((_, index) => index !== indexToRemove));
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      !value.includes(suggestion) && 
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="border-pink-300 focus:ring-[#ff80df] focus:border-[#ff80df]"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddItem(inputValue);
            }
          }}
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto border border-gray-200">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                onClick={() => handleAddItem(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((item, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded-full flex items-center gap-2 ${chipClassName}`}
          >
            <span>{item}</span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="hover:opacity-75"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}