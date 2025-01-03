import { LucideIcon } from 'lucide-react';

export interface PlaceFilter {
  id: string;
  name: string;
  type: string[];
  icon: LucideIcon;
}