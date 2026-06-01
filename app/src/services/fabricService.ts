import { fabricList } from '../data/fabricData'
import type { FabricData } from '../types/fabric'

export const fabricService = {
  list(): FabricData[] {
    return fabricList
  },

  getById(id: number): FabricData | undefined {
    return fabricList.find((f) => f.id === id)
  },
}
