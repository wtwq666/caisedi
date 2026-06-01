import { productList } from '../data/productData'
import type { ProductData } from '../types/product'

export const productService = {
  list(): ProductData[] {
    return productList
  },

  getById(id: number): ProductData | undefined {
    return productList.find((p) => p.id === id)
  },

  getByCode(code: string): ProductData | undefined {
    const normalized = code.trim().toLowerCase()
    return productList.find((p) => p.productCode.toLowerCase() === normalized)
  },
}
