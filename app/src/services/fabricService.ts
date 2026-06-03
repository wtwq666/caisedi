import { getFabrics } from '../lib/catalogStore'
import type { FabricData } from '../types/fabric'

export const fabricService = {
  list(): FabricData[] {
    return getFabrics()
  },

  getById(id: number): FabricData | undefined {
    return getFabrics().find((f) => f.id === id)
  },
}
