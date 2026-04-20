import type { ProductCatalogRow } from '@/types/productCatalog';

/** 货号前三位数字，用于系列筛选（无则返回 null） */
export function articleSeriesPrefix(articleNo: string): string | null {
  const s = articleNo.trim();
  if (s.length < 3) return null;
  const pre = s.slice(0, 3);
  return /^\d{3}$/.test(pre) ? pre : null;
}

export function productRowSearchText(row: ProductCatalogRow): string {
  return [
    row.articleNo,
    row.image,
    row.seriesTheme,
    row.season,
    row.productName,
    row.color,
    row.productSeries,
    row.fitType,
    row.collarType,
    row.shoulderType,
    row.silhouette,
    row.fabricComposition,
    row.fabricTraits,
    row.sellingPoints,
    row.precautions,
    row.scenarios,
    row.salesScript,
    row.stylingTips,
  ]
    .join(' ')
    .toLowerCase();
}

export function isLikelyImageUrl(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (/^https?:\/\//i.test(v) || v.startsWith('data:image')) return true;
  if (v.startsWith('/product-catalog/')) return true;
  return false;
}
