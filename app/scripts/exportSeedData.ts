/**
 * Export static frontend data to api/seed_data/*.json for database seeding.
 * Run: npx tsx scripts/exportSeedData.ts
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import { allEmployees } from '../src/data/employeeData'
import { authAccounts } from '../src/data/authAccounts'
import { productList } from '../src/data/productData'
import { fabricList } from '../src/data/fabricData'
import { newsItems } from '../src/data/newsData'
import { managementDocs } from '../src/data/managementData'
import { brandIntroDocs } from '../src/data/brandIntroData'
import { storeImageDocs } from '../src/data/storeImageData'
import { trainingDocs } from '../src/data/trainingData'
import { salesScriptDocs } from '../src/data/salesScriptData'
import { newStaffDocs } from '../src/data/newStaffData'
import { storeShowcaseAlbums } from '../src/data/storeShowcaseData'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../../api/seed_data')

mkdirSync(outDir, { recursive: true })

const write = (name: string, data: unknown) => {
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(data, null, 2), 'utf-8')
  console.log(`wrote ${name}.json`)
}

write('employees', allEmployees)
write('authAccounts', authAccounts)
write('products', productList)
write('fabrics', fabricList)
write('news', newsItems)

const documents = [
  ...managementDocs.map((d) => ({ ...d, tab: 'management' })),
  ...brandIntroDocs.map((d) => ({ ...d, tab: 'brand' })),
  ...storeImageDocs.map((d) => ({ ...d, tab: 'store-image' })),
  ...trainingDocs.map((d) => ({ ...d, tab: 'manager' })),
  ...salesScriptDocs.map((d) => ({ ...d, tab: 'sales' })),
  ...newStaffDocs.map((d) => ({ ...d, tab: 'new-staff' })),
]
write('documents', documents)
write('storeAlbums', storeShowcaseAlbums)

console.log('Done. Run: cd api && python -m scripts.seed')
