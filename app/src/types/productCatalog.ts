/** 商品资料（与 Excel 列一致，由 scripts/import-product-catalog.mjs 生成数据） */
export interface ProductCatalogRow {
  id: string;
  /** 货号 */
  articleNo: string;
  /** 图片（可为 URL 或空） */
  image: string;
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
