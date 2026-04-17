import { create } from 'zustand';
import { persist, createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { TrainingTemplate, TrainingItem } from '@/types/training';
import type { Fabric } from '@/types';
import { initialFabrics } from '@/data/fabrics';
import syntheticFabrics from '@/data/fabrics-extended';
import blendedFabricsPart1 from '@/data/fabrics-blended';
import blendedFabricsPart2 from '@/data/fabrics-blended-part2';
import {
  defaultTrainingTemplates,
  DEFAULT_FABRIC_TEMPLATE_ID,
  createDefaultFabricTemplate,
} from '@/data/defaultTemplates';
import { fabricToTrainingItem, extractLegacyFabrics } from '@/lib/trainingMigration';

const STORAGE_KEY = 'training-storage';
const LEGACY_FABRIC_KEY = 'fabric-storage';

const allFabrics: Fabric[] = [
  ...initialFabrics,
  ...syntheticFabrics,
  ...blendedFabricsPart1,
  ...blendedFabricsPart2,
];

const seedItems: TrainingItem[] = allFabrics.map((f) =>
  fabricToTrainingItem(f),
);

function emptyModulesFromTemplate(t: TrainingTemplate): Record<string, string> {
  const o: Record<string, string> = {};
  for (const m of t.moduleDefs.filter((x) => x.enabled)) {
    o[m.id] = '';
  }
  return o;
}

function tryMigrateLegacyStorage(): string | null {
  try {
    const legacy = localStorage.getItem(LEGACY_FABRIC_KEY);
    if (!legacy) return null;
    const parsed = JSON.parse(legacy) as unknown;
    const fabrics = extractLegacyFabrics(parsed);
    if (!fabrics?.length) return null;
    const state = {
      templates: defaultTrainingTemplates,
      items: fabrics.map((f) => fabricToTrainingItem(f)),
    };
    localStorage.removeItem(LEGACY_FABRIC_KEY);
    return JSON.stringify({ state, version: 0 });
  } catch {
    return null;
  }
}

const storage: StateStorage = {
  getItem: (name) => {
    const v = localStorage.getItem(name);
    if (v) return v;
    if (name === STORAGE_KEY) {
      return tryMigrateLegacyStorage();
    }
    return null;
  },
  setItem: (name, value) => localStorage.setItem(name, value),
  removeItem: (name) => localStorage.removeItem(name),
};

interface TrainingState {
  templates: TrainingTemplate[];
  items: TrainingItem[];
  getTemplateBySlug: (slug: string) => TrainingTemplate | undefined;
  getTemplateById: (id: string) => TrainingTemplate | undefined;
  getItemsByTemplateId: (templateId: string) => TrainingItem[];
  addItem: (item: Omit<TrainingItem, 'id'>) => void;
  addItems: (items: Omit<TrainingItem, 'id'>[]) => void;
  updateItem: (id: string, partial: Partial<TrainingItem>) => void;
  deleteItem: (id: string) => void;
  setTemplates: (templates: TrainingTemplate[]) => void;
  addTemplate: (t: Omit<TrainingTemplate, 'id'>) => string;
  updateTemplate: (id: string, partial: Partial<TrainingTemplate>) => void;
  deleteTemplate: (id: string) => boolean;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set, get) => ({
      templates: defaultTrainingTemplates,
      items: seedItems,

      getTemplateBySlug: (slug) =>
        get().templates.find((t) => t.slug === slug),

      getTemplateById: (id) => get().templates.find((t) => t.id === id),

      getItemsByTemplateId: (templateId) =>
        get().items.filter((i) => i.templateId === templateId),

      addItem: (item) => {
        const newItem: TrainingItem = {
          ...item,
          id: `${Date.now()}`,
        };
        set((s) => ({ items: [...s.items, newItem] }));
      },

      addItems: (items) => {
        const base = Date.now();
        const newItems: TrainingItem[] = items.map((it, i) => ({
          ...it,
          id: `${base}-${i}`,
        }));
        set((s) => ({ items: [...s.items, ...newItems] }));
      },

      updateItem: (id, partial) => {
        set((s) => ({
          items: s.items.map((it) =>
            it.id === id ? { ...it, ...partial } : it,
          ),
        }));
      },

      deleteItem: (id) => {
        set((s) => ({ items: s.items.filter((it) => it.id !== id) }));
      },

      setTemplates: (templates) => set({ templates }),

      addTemplate: (t) => {
        const id = `tpl-${Date.now()}`;
        const template: TrainingTemplate = {
          ...t,
          id,
          moduleDefs: t.moduleDefs.length
            ? t.moduleDefs
            : [
                {
                  id: 'content',
                  label: '主要内容',
                  editorKind: 'markdown',
                  order: 0,
                  enabled: true,
                },
              ],
        };
        set((s) => ({ templates: [...s.templates, template] }));
        return id;
      },

      updateTemplate: (id, partial) => {
        set((s) => ({
          templates: s.templates.map((t) =>
            t.id === id ? { ...t, ...partial } : t,
          ),
        }));
      },

      deleteTemplate: (id) => {
        if (id === DEFAULT_FABRIC_TEMPLATE_ID) return false;
        const hasItems = get().items.some((i) => i.templateId === id);
        if (hasItems) return false;
        set((s) => ({
          templates: s.templates.filter((t) => t.id !== id),
        }));
        return true;
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => storage),
      partialize: (s) => ({
        templates: s.templates,
        items: s.items,
      }),
      merge: (persisted, current) => {
        const p = persisted as Partial<
          Pick<TrainingState, 'templates' | 'items'>
        > | null;
        if (!p || typeof p !== 'object') return current;
        return {
          ...current,
          templates:
            Array.isArray(p.templates) && p.templates.length > 0
              ? mergeTemplatesWithDefaults(p.templates)
              : current.templates,
          items: Array.isArray(p.items) ? p.items : current.items,
        };
      },
    },
  ),
);

/** 合并持久化模板与默认种子（按 slug 补缺、面料模块补齐） */
function mergeTemplatesWithDefaults(
  persisted: TrainingTemplate[],
): TrainingTemplate[] {
  const bySlug = new Map(persisted.map((t) => [t.slug, t]));
  for (const def of defaultTrainingTemplates) {
    const cur = bySlug.get(def.slug);
    if (!cur) {
      bySlug.set(def.slug, def);
      continue;
    }
    if (def.slug === 'fabric-training') {
      const fabricDef = createDefaultFabricTemplate();
      bySlug.set(def.slug, {
        ...fabricDef,
        ...cur,
        id: cur.id,
        moduleDefs: fabricDef.moduleDefs.map((m) => {
          const old = cur.moduleDefs.find((x) => x.id === m.id);
          return old ? { ...m, ...old } : m;
        }),
      });
    }
  }
  return Array.from(bySlug.values());
}

export { emptyModulesFromTemplate, seedItems, allFabrics };
