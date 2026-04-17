/**
 * 读取「凯施迪（26春）商品资料_整理版.xlsx」，生成 src/data/productCatalog.generated.ts
 * 用法：npm run import-products
 */
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');

const EXCEL_NAME = '凯施迪（26春）商品资料_整理版.xlsx';
const OUT_FILE = path.join(appRoot, 'src', 'data', 'productCatalog.generated.ts');

const HEADER_ALIASES = {
  articleNo: ['货号', '款号', 'SKU'],
  image: ['图片'],
  fabricComposition: ['面料成份', '面料成分'],
  fabricTraits: ['面料特征'],
  sellingPoints: ['工艺卖点'],
  precautions: ['注意事项'],
  scenarios: ['适合场景'],
  salesScript: ['销售话术'],
  stylingTips: ['搭配推荐'],
};

function norm(s) {
  if (s === null || s === undefined) return '';
  if (typeof s === 'number') return String(s);
  return String(s).trim();
}

function buildHeaderMap(headerRow) {
  const map = new Map();
  headerRow.forEach((cell, i) => {
    const k = norm(cell);
    if (k) map.set(k, i);
  });
  return map;
}

function colIndex(headerMap, aliases) {
  for (const a of aliases) {
    if (headerMap.has(a)) return headerMap.get(a);
  }
  return undefined;
}

function slugifyId(articleNo, rowIndex, used) {
  let base = norm(articleNo).replace(/\s+/g, '') || `row-${rowIndex}`;
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

function main() {
  const xlsxPath = path.join(appRoot, EXCEL_NAME);
  if (!fs.existsSync(xlsxPath)) {
    console.error('找不到文件:', xlsxPath);
    process.exit(1);
  }

  const wb = XLSX.readFile(xlsxPath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
  if (!rows.length) {
    console.error('表格为空');
    process.exit(1);
  }

  const headerMap = buildHeaderMap(rows[0]);
  const idx = {};
  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    const i = colIndex(headerMap, aliases);
    if (i === undefined) {
      console.error('缺少列:', aliases.join(' / '));
      process.exit(1);
    }
    idx[key] = i;
  }

  const usedIds = new Set();
  const objects = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const articleNo = norm(row[idx.articleNo]);
    if (!articleNo) continue;

    const rec = {
      id: slugifyId(articleNo, r, usedIds),
      articleNo,
      image: norm(row[idx.image]),
      fabricComposition: norm(row[idx.fabricComposition]),
      fabricTraits: norm(row[idx.fabricTraits]),
      sellingPoints: norm(row[idx.sellingPoints]),
      precautions: norm(row[idx.precautions]),
      scenarios: norm(row[idx.scenarios]),
      salesScript: norm(row[idx.salesScript]),
      stylingTips: norm(row[idx.stylingTips]),
    };
    objects.push(rec);
  }

  const columnDefs = [
    { key: 'articleNo', label: '货号' },
    { key: 'image', label: '图片' },
    { key: 'fabricComposition', label: '面料成份' },
    { key: 'fabricTraits', label: '面料特征' },
    { key: 'sellingPoints', label: '工艺卖点' },
    { key: 'precautions', label: '注意事项' },
    { key: 'scenarios', label: '适合场景' },
    { key: 'salesScript', label: '销售话术' },
    { key: 'stylingTips', label: '搭配推荐' },
  ];

  const body = `// 本文件由 npm run import-products 自动生成，请勿手改。
import type { ProductCatalogColumnDef, ProductCatalogRow } from '@/types/productCatalog';

export const PRODUCT_CATALOG_COLUMN_DEFS: ProductCatalogColumnDef[] = ${JSON.stringify(columnDefs, null, 2)};

export const PRODUCT_CATALOG_ROWS: ProductCatalogRow[] = ${JSON.stringify(objects, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, body, 'utf8');
  console.log('已生成', OUT_FILE, '共', objects.length, '条');
}

main();
