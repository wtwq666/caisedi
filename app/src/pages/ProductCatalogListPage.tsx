import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, ChevronRight, Package, FileText } from 'lucide-react';
import { PRODUCT_CATALOG_ROWS } from '@/data/productCatalog.generated';
import {
  articleSeriesPrefix,
  productRowSearchText,
} from '@/lib/productCatalogUtils';

const ITEMS_PER_PAGE = 10;

export default function ProductCatalogListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [seriesFilter, setSeriesFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const seriesOptions = useMemo(() => {
    const set = new Set<string>();
    for (const row of PRODUCT_CATALOG_ROWS) {
      const p = articleSeriesPrefix(row.articleNo);
      if (p) set.add(p);
    }
    return Array.from(set).sort();
  }, []);

  const q = searchQuery.toLowerCase().trim();

  const filtered = useMemo(() => {
    return PRODUCT_CATALOG_ROWS.filter((row) => {
      if (seriesFilter) {
        const p = articleSeriesPrefix(row.articleNo);
        if (p !== seriesFilter) return false;
      }
      if (!q) return true;
      return productRowSearchText(row).includes(q);
    });
  }, [q, seriesFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const showSeriesFilter = seriesOptions.length > 1;

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-brand-yellow-border/40 bg-brand-yellow px-5 py-5 sm:px-6 sm:py-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-[1.65rem]">
              商品资料参考
            </h2>
            <p className="text-brand-ink-soft/90 mt-1.5 text-sm sm:text-base">
              共 {PRODUCT_CATALOG_ROWS.length} 条 · 支持按货号与全文搜索
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-brand-gray-border/90 bg-card px-4 py-4 sm:px-5 shadow-sm ring-1 ring-black/[0.04]">
        {showSeriesFilter && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-brand-gray mr-1">
              系列码
            </span>
            <button
              type="button"
              onClick={() => {
                setSeriesFilter(null);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                seriesFilter === null
                  ? 'bg-brand-yellow text-brand-ink shadow-sm ring-1 ring-brand-yellow-border/40'
                  : 'bg-muted text-brand-gray border border-transparent hover:border-brand-gray-border'
              }`}
            >
              全部
            </button>
            {seriesOptions.map((pre) => (
              <button
                key={pre}
                type="button"
                onClick={() => {
                  setSeriesFilter(pre);
                  setCurrentPage(1);
                }}
                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  seriesFilter === pre
                    ? 'bg-brand-yellow text-brand-ink shadow-sm ring-1 ring-brand-yellow-border/40'
                    : 'bg-muted text-brand-gray border border-transparent hover:border-brand-gray-border'
                }`}
              >
                {pre}
              </button>
            ))}
          </div>
        )}
        <div
          className={`relative ${showSeriesFilter ? 'mt-4' : ''}`}
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-muted w-5 h-5 pointer-events-none" />
          <Input
            placeholder="搜索货号、面料、卖点、场景、话术…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-11 bg-background border-brand-gray-border focus-visible:ring-brand-yellow"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginated.map((row) => (
          <Card
            key={row.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm ring-1 ring-black/[0.035] transition-all hover:border-brand-yellow-border/55 hover:shadow-md hover:ring-brand-yellow/15"
            onClick={() => navigate(`/products/${row.id}`)}
          >
            <CardHeader className="pb-3 border-b border-brand-gray-border/50 bg-muted/80">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-brand-yellow/90 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-brand-yellow-border/30">
                  <FileText className="w-5 h-5 text-brand-ink/85" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-brand-accent shrink-0" />
                <CardTitle className="text-base font-semibold text-brand-ink line-clamp-1">
                  {row.articleNo}
                </CardTitle>
              </div>
              <p className="text-sm text-brand-gray leading-relaxed line-clamp-3 mb-3">
                {row.fabricTraits || row.sellingPoints || '—'}
              </p>
              <div className="flex items-center justify-end gap-2">
                <ChevronRight className="w-4 h-4 shrink-0 text-brand-gray-muted group-hover:text-brand-accent transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paginated.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无匹配商品</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={
                  currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : ''
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-center text-sm text-brand-gray-muted">
        第 {currentPage} / {totalPages} 页，共 {filtered.length} 条
      </div>
    </div>
  );
}
