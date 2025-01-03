import * as React from 'react';

interface TabsProps {
  value?: string;
  className?: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}

interface TabsContextType {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType>({});

export function Tabs({ value, className = '', children, onValueChange }: TabsProps) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`flex ${className}`}>
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = '' }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  const isSelected = context.value === value;

  return (
    <button
      className={`flex-1 px-3 py-2 text-sm font-medium transition-colors
        ${isSelected ? 'text-gray-900 bg-white' : 'text-gray-500 hover:text-gray-700'}
        ${className}`}
      onClick={() => context.onValueChange?.(value)}
      role="tab"
      aria-selected={isSelected}
      data-state={isSelected ? 'active' : 'inactive'}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = '' }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (context.value !== value) return null;
  
  return (
    <div 
      className={className}
      role="tabpanel"
      data-state={context.value === value ? 'active' : 'inactive'}
    >
      {children}
    </div>
  );
}