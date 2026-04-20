/** 商品资料（由 scripts/import-product-catalog.mjs 从 Excel 生成） */
export interface ProductCatalogRow {
  id: string;
  /** 货号 */
  articleNo: string;
  /** 图片（URL、data URL 或站内路径如 /product-catalog/xxx.png） */
  image: string;
  /** 系列主题 */
  seriesTheme: string;
  /** 季节 */
  season: string;
  /** 商品名称 */
  productName: string;
  /** 颜色 */
  color: string;
  /** 系列（与系列主题区分） */
  productSeries: string;
  /** 版型 */
  fitType: string;
  /** 领型 */
  collarType: string;
  /** 肩型 */
  shoulderType: string;
  /** 廓形 */
  silhouette: string;
  fabricComposition: string;
  fabricTraits: string;
  sellingPoints: string;
  precautions: string;
  scenarios: string;
  salesScript: string;
  stylingTips: string;
}

export interface ProductCatalogColumnDef {
  key: keyof ProductCatalogRow;
  label: string;
}
