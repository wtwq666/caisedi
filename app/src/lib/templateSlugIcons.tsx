import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Store,
  TrendingUp,
  Users,
  GraduationCap,
  Image,
  FileText,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  'fabric-training': BookOpen,
  'store-manual': Store,
  'sales-training': TrendingUp,
  'manager-manual': Users,
  'mentor-manual': GraduationCap,
  'store-image': Image,
};

export function getIconForTemplateSlug(slug: string): LucideIcon {
  return map[slug] ?? FileText;
}
