const fs = require('fs')
const p = 'src/pages/Products.tsx'
const lines = fs.readFileSync(p, 'utf8').split('\n')
const start = lines.findIndex((l) => l.includes('Product Detail Modal'))
const endIdx = 465 // line 466 is `      )}`

const replacement = `      {isMobile ? (
        <Drawer open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DrawerContent className="h-[92vh] max-h-[92vh] p-0 flex flex-col">
            {selectedProduct && (
              <>
                <DrawerTitle className="sr-only">{selectedProduct.name}</DrawerTitle>
                <motion className="flex-1 min-h-0 overflow-y-auto p-4">
                  <ProductDetailPanel product={selectedProduct} isMobile />
                </motion>
              </>
            )}
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
          <DialogContent className="max-w-[900px] max-h-[90vh] p-0 flex flex-col gap-0 overflow-hidden">
            {selectedProduct && (
              <>
                <DialogHeader className="px-6 py-4 border-b border-[#F0F0F0] shrink-0">
                  <DialogTitle>{selectedProduct.name}</DialogTitle>
                </DialogHeader>
                <motion className="flex-1 overflow-y-auto p-6">
                  <ProductDetailPanel product={selectedProduct} />
                </motion>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}`.split('\n')

const newLines = [...lines.slice(0, start), ...replacement, ...lines.slice(endIdx + 1)]
let out = newLines.join('\n')
out = out.replace(/<motion /g, '<div ').replace(/<\/motion>/g, '</div>')
fs.writeFileSync(p, out)
console.log('done', start, endIdx)
