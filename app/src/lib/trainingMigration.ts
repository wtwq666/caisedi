import type { Fabric } from '@/types';
import type { TrainingItem } from '@/types/training';
import { DEFAULT_FABRIC_TEMPLATE_ID } from '@/data/defaultTemplates';

export function fabricToTrainingItem(f: Fabric): TrainingItem {
  return {
    id: f.id,
    templateId: DEFAULT_FABRIC_TEMPLATE_ID,
    name: f.name,
    subtitle: f.subtitle,
    description: f.description,
    category: f.category,
    order: f.order,
    modules: { ...f.modules },
  };
}

/** 从旧版 persist 结构中取出 fabrics 数组 */
export function extractLegacyFabrics(parsed: unknown): Fabric[] | null {
  if (!parsed || typeof parsed !== 'object') return null;
  const state = (parsed as { state?: unknown }).state;
  if (!state || typeof state !== 'object') return null;
  const fabrics = (state as { fabrics?: Fabric[] }).fabrics;
  if (!Array.isArray(fabrics)) return null;
  return fabrics;
}
