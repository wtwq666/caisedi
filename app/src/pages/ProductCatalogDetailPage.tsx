import { useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import {
  PRODUCT_CATALOG_COLUMN_DEFS,
  PRODUCT_CATALOG_ROWS,
} from '@/data/productCatalog.generated';
import { isLikelyImageUrl } from '@/lib/productCatalogUtils';
import type { ProductCatalogRow } from '@/types/productCatalog';

export default function ProductCatalogDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const item = useMemo(
    () => PRODUCT_CATALOG_ROWS.find((r) => r.id === productId),
    [productId],
  );

  if (!productId || !item) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="text-brand-gray-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Button>
      </div>

      <Card className="border-brand-gray-border/90 shadow-sm">
        <CardHeader className="border-b border-brand-gray-border/60 bg-muted/50">
          <CardTitle className="text-2xl text-brand-ink">{item.articleNo}</CardTitle>
          <p className="text-sm text-brand-gray-muted mt-1">商品资料 · 只读参考</p>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {PRODUCT_CATALOG_COLUMN_DEFS.map((col) => {
            const value = item[col.key as keyof ProductCatalogRow] as string;
            if (col.key === 'articleNo') return null;

            if (col.key === 'image') {
              if (!value?.trim()) {
                return (
                  <section key={col.key}>
                    <h3 className="text-sm font-semibold text-brand-ink mb-2">
                      {col.label}
                    </h3>
                    <p className="text-sm text-brand-gray-muted">—</p>
                  </section>
                );
              }
              if (isLikelyImageUrl(value)) {
                return (
                  <section key={col.key}>
                    <h3 className="text-sm font-semibold text-brand-ink mb-2">
                      {col.label}
                    </h3>
                    <img
                      src={value}
                      alt={item.articleNo}
                      className="max-w-full rounded-lg border border-brand-gray-border/80 max-h-96 object-contain bg-muted"
                    />
                  </section>
                );
              }
            }

            return (
              <section key={col.key}>
                <h3 className="text-sm font-semibold text-brand-ink mb-2">
                  {col.label}
                </h3>
                <p className="text-sm text-brand-gray leading-relaxed whitespace-pre-wrap">
                  {value?.trim() ? value : '—'}
                </p>
              </section>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
