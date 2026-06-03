import { getProducts } from '../lib/catalogStore'
import type { ProductData } from '../types/product'

export const productService = {
  list(): ProductData[] {
    return getProducts()
  },

  getById(id: number): ProductData | undefined {
    return getProducts().find((p) => p.id === id)
  },

  getByCode(code: string): ProductData | undefined {
    const normalized = code.trim().toLowerCase()
    return getProducts().find((p) => p.productCode.toLowerCase() === normalized)
  },
}
