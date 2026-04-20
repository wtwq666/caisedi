/**
 * 读取仓库根目录「凯施迪（26夏）商品资料（店铺收）.xlsx」，
 * 导出内嵌图到 public/product-catalog/，生成 src/data/productCatalog.generated.ts
 *
 * 用法：npm run import-products
 */
import ExcelJS from 'exceljs';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');

const EXCEL_NAME = '凯施迪（26夏）商品资料（店铺收）.xlsx';
const OUT_FILE = path.join(appRoot, 'src', 'data', 'productCatalog.generated.ts');
const PUBLIC_IMG_DIR = path.join(appRoot, 'public', 'product-catalog');

/** 列别名：首个匹配的表头即绑定该字段 */
const HEADER_ALIASES = {
  articleNo: ['货号', '款号', 'SKU'],
  image: ['图片'],
  seriesTheme: ['系列主题'],
  season: ['季节'],
  productName: ['商品名称'],
  color: ['颜色'],
  productSeries: ['系列'],
  fitType: ['版型'],
  collarType: ['领型'],
  shoulderType: ['肩型'],
  silhouette: ['廓形'],
  fabricComposition: ['面料成份', '面料成分'],
  fabricTraits: ['面料特征'],
  sellingPoints: ['工艺卖点'],
  precautions: ['注意事项'],
  scenarios: ['适合场景'],
  salesScript: ['销售话术'],
  stylingTips: ['搭配推荐'],
  /** 合并长文案列：内含「面料 / 工艺卖点 / 注意事项 / 适合场景」等小节 */
  craftBlock: [
    '款式工艺与卖点',
    '款式工艺和设计点',
    '款式工艺',
  ],
};

const REQUIRED_FIELD = 'articleNo';

const COLUMN_DEFS = [
  { key: 'articleNo', label: '货号' },
  { key: 'image', label: '图片' },
  { key: 'seriesTheme', label: '系列主题' },
  { key: 'season', label: '季节' },
  { key: 'productName', label: '商品名称' },
  { key: 'color', label: '颜色' },
  { key: 'productSeries', label: '系列' },
  { key: 'fitType', label: '版型' },
  { key: 'collarType', label: '领型' },
  { key: 'shoulderType', label: '肩型' },
  { key: 'silhouette', label: '廓形' },
  { key: 'fabricComposition', label: '面料成份' },
  { key: 'fabricTraits', label: '面料特征' },
  { key: 'sellingPoints', label: '工艺卖点' },
  { key: 'precautions', label: '注意事项' },
  { key: 'scenarios', label: '适合场景' },
  { key: 'salesScript', label: '销售话术' },
  { key: 'stylingTips', label: '搭配推荐' },
];

function norm(s) {
  if (s === null || s === undefined) return '';
  if (typeof s === 'number') return String(s);
  return String(s).trim().replace(/\s+/g, ' ');
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
  let base =
    norm(articleNo)
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fff_-]/g, '-') || `row-${rowIndex}`;
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

function safeFileBase(id) {
  return id.replace(/[/\\?%*:|"<>]/g, '-');
}

/** 用 xlsx 解析表，定位表头行（首行含「货号」） */
function readSheetMatrix(xlsxPath) {
  const wb = XLSX.readFile(xlsxPath);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
  if (!rows.length) {
    throw new Error('表格为空');
  }
  let headerRowIndex = rows.findIndex((r) =>
    Array.isArray(r) && r.some((c) => norm(c) === '货号'),
  );
  if (headerRowIndex === -1) {
    headerRowIndex = 0;
  }
  const headerRow = rows[headerRowIndex];
  const headerMap = buildHeaderMap(headerRow);
  const idx = {};
  const missingRequired = [];
  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    const i = colIndex(headerMap, aliases);
    if (i === undefined) {
      if (key === REQUIRED_FIELD) missingRequired.push(aliases.join(' / '));
      idx[key] = undefined;
    } else {
      idx[key] = i;
    }
  }
  if (missingRequired.length) {
    throw new Error(`缺少必填列: ${missingRequired.join(', ')}`);
  }
  return { rows, headerRowIndex, idx, sheetName };
}

function cellTextFromMatrixRow(row, colIndex) {
  if (colIndex === undefined || !Array.isArray(row)) return '';
  const v = row[colIndex];
  return norm(v);
}

function isLikelyUrl(s) {
  const t = norm(s);
  return /^https?:\/\//i.test(t) || t.startsWith('data:image');
}

/**
 * 从「款式工艺与卖点」类合并列解析面料特征、工艺卖点、注意事项、适合场景。
 * 支持行首或同一行内联的小节标题（如「…） 工艺卖点：xxx 面料注意事项：…」）。
 */
function parseCraftBlock(raw) {
  const empty = {
    fabricTraits: '',
    sellingPoints: '',
    precautions: '',
    scenarios: '',
  };
  const t = norm(raw).replace(/\r\n/g, '\n').trim();
  if (!t) return { ...empty };

  /** 行首或空白后的「标签：」 */
  const headerRe =
    /(?:^|[\n\s])(面料|工艺卖点|面料注意事项|注意事项|适合场景)\s*[:：]/g;
  const headers = [];
  let m;
  while ((m = headerRe.exec(t)) !== null) {
    headers.push({
      label: m[1],
      keyStart: m.index,
      contentStart: m.index + m[0].length,
    });
  }

  if (!headers.length) {
    return { ...empty, sellingPoints: t };
  }

  const out = { ...empty };

  const push = (field, text) => {
    const s = text.trim();
    if (!s) return;
    out[field] = out[field] ? `${out[field]}\n${s}` : s;
  };

  const fieldFor = (label) => {
    switch (label) {
      case '面料':
        return 'fabricTraits';
      case '工艺卖点':
        return 'sellingPoints';
      case '面料注意事项':
      case '注意事项':
        return 'precautions';
      case '适合场景':
        return 'scenarios';
      default:
        return null;
    }
  };

  const preamble = t.slice(0, headers[0].keyStart).trim();
  if (preamble && headers[0].label !== '面料') {
    push('fabricTraits', preamble);
  }

  for (let i = 0; i < headers.length; i++) {
    const end = i + 1 < headers.length ? headers[i + 1].keyStart : t.length;
    const body = t.slice(headers[i].contentStart, end);
    const field = fieldFor(headers[i].label);
    if (field) push(field, body);
  }

  if (
    !out.fabricTraits &&
    !out.sellingPoints &&
    !out.precautions &&
    !out.scenarios
  ) {
    return { ...empty, sellingPoints: t };
  }

  return out;
}

function mergePreferCell(cellVal, parsedVal) {
  const c = norm(cellVal);
  if (c) return c;
  return norm(parsedVal);
}

/**
 * 从 ExcelJS 建立「Excel 行号(1-based) -> 内嵌图 buffer」
 * 仅保留锚点落在「图片」列附近的图（列偏差≤2）
 */
function buildEmbeddedImageByRow(workbook, worksheet, imageCol0Based) {
  const map = new Map();
  const images = worksheet.getImages().filter((m) => m.type === 'image');
  for (const img of images) {
    const tl = img.range?.tl;
    if (!tl) continue;
    const excelRow = tl.nativeRow + 1;
    const col0 = tl.nativeCol;
    if (imageCol0Based !== undefined && Math.abs(col0 - imageCol0Based) > 2) {
      continue;
    }
    const medium = workbook.getImage(img.imageId);
    if (!medium?.buffer?.length) continue;
    const ext = (medium.extension || 'png').replace(/^\./, '');
    map.set(excelRow, { buffer: medium.buffer, extension: ext });
  }
  return map;
}

async function main() {
  const xlsxPath = path.join(repoRoot, EXCEL_NAME);
  if (!fs.existsSync(xlsxPath)) {
    console.error('找不到文件:', xlsxPath);
    process.exit(1);
  }

  const { rows, headerRowIndex, idx } = readSheetMatrix(xlsxPath);
  const imageCol0Based = idx.image ?? 0;

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(xlsxPath);
  const worksheet = workbook.worksheets[0];
  const embeddedByRow = buildEmbeddedImageByRow(
    workbook,
    worksheet,
    idx.image === undefined ? undefined : imageCol0Based,
  );

  if (fs.existsSync(PUBLIC_IMG_DIR)) {
    fs.rmSync(PUBLIC_IMG_DIR, { recursive: true });
  }
  fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });

  const usedIds = new Set();
  const articleToId = new Map();
  /** 货号 -> 记录，后者覆盖前者（保留最后一次） */
  const byArticle = new Map();

  for (let r = headerRowIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    const excelRowNum = r + 1;
    const articleNo = cellTextFromMatrixRow(row, idx.articleNo);
    if (!articleNo) continue;

    let id = articleToId.get(articleNo);
    if (!id) {
      id = slugifyId(articleNo, r, usedIds);
      articleToId.set(articleNo, id);
    }
    const safeBase = safeFileBase(id);

    let imageVal = cellTextFromMatrixRow(row, idx.image);
    const embedded = embeddedByRow.get(excelRowNum);
    if (embedded) {
      const fn = `${safeBase}.${embedded.extension}`;
      const outPath = path.join(PUBLIC_IMG_DIR, fn);
      try {
        fs.writeFileSync(outPath, embedded.buffer);
        imageVal = `/product-catalog/${fn}`;
      } catch (e) {
        console.warn('写出图片失败 行', excelRowNum, id, e.message);
      }
    } else if (imageVal && !isLikelyUrl(imageVal)) {
      imageVal = '';
    }

    const craftRaw = cellTextFromMatrixRow(row, idx.craftBlock);
    const parsed = parseCraftBlock(craftRaw);

    const rec = {
      id,
      articleNo,
      image: imageVal,
      seriesTheme: cellTextFromMatrixRow(row, idx.seriesTheme),
      season: cellTextFromMatrixRow(row, idx.season),
      productName: cellTextFromMatrixRow(row, idx.productName),
      color: cellTextFromMatrixRow(row, idx.color),
      productSeries: cellTextFromMatrixRow(row, idx.productSeries),
      fitType: cellTextFromMatrixRow(row, idx.fitType),
      collarType: cellTextFromMatrixRow(row, idx.collarType),
      shoulderType: cellTextFromMatrixRow(row, idx.shoulderType),
      silhouette: cellTextFromMatrixRow(row, idx.silhouette),
      fabricComposition: cellTextFromMatrixRow(row, idx.fabricComposition),
      fabricTraits: mergePreferCell(
        cellTextFromMatrixRow(row, idx.fabricTraits),
        parsed.fabricTraits,
      ),
      sellingPoints: mergePreferCell(
        cellTextFromMatrixRow(row, idx.sellingPoints),
        parsed.sellingPoints,
      ),
      precautions: mergePreferCell(
        cellTextFromMatrixRow(row, idx.precautions),
        parsed.precautions,
      ),
      scenarios: mergePreferCell(
        cellTextFromMatrixRow(row, idx.scenarios),
        parsed.scenarios,
      ),
      salesScript: cellTextFromMatrixRow(row, idx.salesScript),
      stylingTips: cellTextFromMatrixRow(row, idx.stylingTips),
    };

    if (byArticle.has(articleNo)) {
      console.warn('重复货号，保留末行:', articleNo, '行', excelRowNum);
    }
    byArticle.set(articleNo, rec);
  }

  const objects = Array.from(byArticle.values());

  const body = `// 本文件由 npm run import-products 自动生成，请勿手改。
import type { ProductCatalogColumnDef, ProductCatalogRow } from '@/types/productCatalog';

export const PRODUCT_CATALOG_COLUMN_DEFS: ProductCatalogColumnDef[] = ${JSON.stringify(COLUMN_DEFS, null, 2)};

export const PRODUCT_CATALOG_ROWS: ProductCatalogRow[] = ${JSON.stringify(objects, null, 2)};
`;

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, body, 'utf8');
  console.log('已生成', OUT_FILE, '共', objects.length, '条');
  console.log('图片目录:', PUBLIC_IMG_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
