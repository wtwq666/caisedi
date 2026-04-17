import * as XLSX from 'xlsx';
import type { TrainingTemplate } from '@/types/training';
import type { TrainingItem } from '@/types/training';
import { createDefaultFabricTemplate } from '@/data/defaultTemplates';

const DEFAULT_CATEGORY = '天然纤维';

/** 首列名称：兼容「名称」与「面料名称」 */
const NAME_HEADER_ALIASES = ['名称', '面料名称'] as const;

const BASE_HEADERS = ['副标题', '描述', '分类', '序号'] as const;

function normalizeCell(v: unknown): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return String(v);
  return String(v).trim();
}

function buildHeaderIndexMap(headerRow: unknown[]): Map<string, number> {
  const map = new Map<string, number>();
  headerRow.forEach((cell, index) => {
    const key = normalizeCell(cell);
    if (key) map.set(key, index);
  });
  return map;
}

export class TrainingExcelParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TrainingExcelParseError';
  }
}

/** 兼容旧代码 */
export { TrainingExcelParseError as FabricExcelParseError };

export function buildExcelHeaders(template: TrainingTemplate): string[] {
  const defs = [...template.moduleDefs]
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);
  const nameCol =
    template.slug === 'fabric-training' ? '面料名称' : '名称';
  return [nameCol, ...BASE_HEADERS, ...defs.map((d) => d.label)];
}

export function downloadTrainingTemplate(
  template: TrainingTemplate,
  filename?: string,
) {
  const row = buildExcelHeaders(template);
  const ws = XLSX.utils.aoa_to_sheet([row]);
  const wb = XLSX.utils.book_new();
  const sheetName = template.name.slice(0, 10) || '数据';
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, filename ?? `${template.name}导入模板.xlsx`);
}

export function downloadFabricTemplate(filename = '面料模板.xlsx') {
  downloadTrainingTemplate(createDefaultFabricTemplate(), filename);
}

function findNameColumn(headerMap: Map<string, number>): string | undefined {
  for (const h of NAME_HEADER_ALIASES) {
    if (headerMap.has(h)) return h;
  }
  return undefined;
}

export function parseTrainingWorkbookFromRows(
  rows: string[][],
  template: TrainingTemplate,
): Omit<TrainingItem, 'id'>[] {
  if (!rows.length) {
    throw new TrainingExcelParseError('表格为空或无法读取表头');
  }

  const headerMap = buildHeaderIndexMap(rows[0]);
  const nameHeader = findNameColumn(headerMap);
  if (nameHeader === undefined) {
    throw new TrainingExcelParseError(
      '缺少名称列，请使用模板：首行需包含「名称」或「面料名称」',
    );
  }

  const defs = [...template.moduleDefs]
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);

  const result: Omit<TrainingItem, 'id'>[] = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (!row || !row.length) continue;

    const get = (header: string) => {
      const idx = headerMap.get(header);
      if (idx === undefined) return '';
      return normalizeCell(row[idx]);
    };

    const name = get(nameHeader);
    if (!name) continue;

    let order = parseInt(get('序号'), 10);
    if (Number.isNaN(order) || order < 0) {
      order = r;
    }

    const category = get('分类') || DEFAULT_CATEGORY;

    const modules: Record<string, string> = {};
    for (const d of defs) {
      modules[d.id] = get(d.label);
    }

    result.push({
      templateId: template.id,
      name,
      subtitle: get('副标题'),
      description: get('描述'),
      category,
      order,
      modules,
    });
  }

  if (result.length === 0) {
    throw new TrainingExcelParseError(
      '未解析到有效数据行（至少需一行名称不为空）',
    );
  }

  return result;
}

export async function readFabricWorkbookRows(
  file: File,
): Promise<string[][]> {
  const buf = await file.arrayBuffer();
  const workbook = XLSX.read(buf, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new TrainingExcelParseError('工作簿中没有工作表');
  }
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    defval: '',
    raw: false,
  }) as string[][];
}

export async function parseTrainingWorkbook(
  file: File,
  template: TrainingTemplate,
): Promise<Omit<TrainingItem, 'id'>[]> {
  const rows = await readFabricWorkbookRows(file);
  return parseTrainingWorkbookFromRows(rows, template);
}

export function pickTrainingRowForName(
  items: Omit<TrainingItem, 'id'>[],
  name: string,
): Omit<TrainingItem, 'id'> | undefined {
  const n = name.trim();
  if (!n) return items[0];
  return items.find((x) => x.name.trim() === n);
}

/** @deprecated 使用 parseTrainingWorkbook + 默认面料模板 */
export async function parseFabricWorkbook(
  file: File,
): Promise<Omit<TrainingItem, 'id'>[]> {
  return parseTrainingWorkbook(file, createDefaultFabricTemplate());
}

export function parseFabricWorkbookFromRows(
  rows: string[][],
): Omit<TrainingItem, 'id'>[] {
  return parseTrainingWorkbookFromRows(rows, createDefaultFabricTemplate());
}

export function pickFabricRowForName(
  items: Omit<TrainingItem, 'id'>[],
  fabricName: string,
): Omit<TrainingItem, 'id'> | undefined {
  return pickTrainingRowForName(items, fabricName);
}

export const FABRIC_EXCEL_HEADERS = buildExcelHeaders(
  createDefaultFabricTemplate(),
);
