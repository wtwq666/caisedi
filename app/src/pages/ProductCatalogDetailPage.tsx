import { useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ImageIcon, Layers, MessageCircle } from 'lucide-react';
import { PRODUCT_CATALOG_ROWS } from '@/data/productCatalog.generated';
import { isLikelyImageUrl } from '@/lib/productCatalogUtils';
import type { ProductCatalogRow } from '@/types/productCatalog';

const BASIC_FIELDS: { key: keyof ProductCatalogRow; label: string }[] = [
  { key: 'seriesTheme', label: '系列主题' },
  { key: 'season', label: '季节' },
  { key: 'color', label: '颜色' },
  { key: 'productSeries', label: '系列' },
  { key: 'fitType', label: '版型' },
  { key: 'collarType', label: '领型' },
  { key: 'shoulderType', label: '肩型' },
  { key: 'silhouette', label: '廓形' },
];

const FABRIC_FIELDS: { key: keyof ProductCatalogRow; label: string }[] = [
  { key: 'fabricComposition', label: '面料成份' },
  { key: 'fabricTraits', label: '面料特征' },
  { key: 'sellingPoints', label: '工艺卖点' },
  { key: 'precautions', label: '注意事项' },
];

const SALES_FIELDS: { key: keyof ProductCatalogRow; label: string }[] = [
  { key: 'scenarios', label: '适合场景' },
  { key: 'salesScript', label: '销售话术' },
  { key: 'stylingTips', label: '搭配推荐' },
];

function badgeItems(item: ProductCatalogRow) {
  return [
    item.season,
    item.color,
    item.productSeries,
    item.fitType,
    item.collarType,
    item.shoulderType,
    item.silhouette,
  ].filter((x) => x?.trim());
}

function FieldBlock({
  label,
  value,
  bordered,
}: {
  label: string;
  value: string;
  bordered?: boolean;
}) {
  const t = value?.trim();
  return (
    <section
      className={
        bordered
          ? 'border-b border-border/70 pb-6 last:border-0 last:pb-0'
          : undefined
      }
    >
      <h3 className="text-sm font-semibold text-brand-ink mb-2">{label}</h3>
      <p className="text-sm text-brand-gray leading-relaxed whitespace-pre-wrap">
        {t ? t : '—'}
      </p>
    </section>
  );
}

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

  const badges = badgeItems(item);
  const displayName = item.productName?.trim() || item.articleNo;
  const subtitle = [item.seriesTheme].filter(Boolean).join(' · ');

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
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {badges.map((b) => (
              <Badge
                key={b}
                variant="secondary"
                className="font-normal bg-brand-yellow-soft text-brand-accent border-0"
              >
                {b}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-brand-ink leading-tight">
            {displayName}
          </CardTitle>
          <p className="text-sm text-muted-foreground font-mono mt-2">
            货号 {item.articleNo}
          </p>
          {subtitle ? (
            <p className="text-brand-gray mt-1.5 text-sm sm:text-base">
              {subtitle}
            </p>
          ) : null}
          <p className="text-sm text-brand-gray-muted mt-2">
            商品资料 · 只读参考
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="flex w-full h-auto flex-wrap gap-1 justify-start p-1 min-h-[3.5rem]">
          <TabsTrigger
            value="basic"
            className="flex flex-col items-center gap-1 py-3 px-3 data-[state=active]:bg-brand-yellow-soft data-[state=active]:text-brand-accent min-w-[5.5rem] flex-1 sm:flex-none"
          >
            <ImageIcon className="w-4 h-4 shrink-0" />
            <span className="text-xs text-center leading-tight">基础档案</span>
          </TabsTrigger>
          <TabsTrigger
            value="fabric"
            className="flex flex-col items-center gap-1 py-3 px-3 data-[state=active]:bg-brand-yellow-soft data-[state=active]:text-brand-accent min-w-[5.5rem] flex-1 sm:flex-none"
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span className="text-xs text-center leading-tight">面料与工艺</span>
          </TabsTrigger>
          <TabsTrigger
            value="sales"
            className="flex flex-col items-center gap-1 py-3 px-3 data-[state=active]:bg-brand-yellow-soft data-[state=active]:text-brand-accent min-w-[5.5rem] flex-1 sm:flex-none"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="text-xs text-center leading-tight">场景与话术</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">基础档案</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-sm font-semibold text-brand-ink mb-2">图片</h3>
                {!item.image?.trim() ? (
                  <p className="text-sm text-brand-gray-muted">—</p>
                ) : isLikelyImageUrl(item.image) ? (
                  <img
                    src={item.image}
                    alt={displayName}
                    className="max-w-full rounded-lg border border-brand-gray-border/80 max-h-96 object-contain bg-muted"
                  />
                ) : (
                  <p className="text-sm text-brand-gray whitespace-pre-wrap">
                    {item.image}
                  </p>
                )}
              </section>
              {BASIC_FIELDS.map(({ key, label }) => (
                <FieldBlock
                  key={key}
                  label={label}
                  value={item[key] as string}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fabric" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-brand-accent shrink-0" />
                <CardTitle className="text-lg">面料与工艺</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {FABRIC_FIELDS.map(({ key, label }) => (
                <FieldBlock
                  key={key}
                  label={label}
                  value={item[key] as string}
                  bordered
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-brand-accent shrink-0" />
                <CardTitle className="text-lg">场景与话术</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {SALES_FIELDS.map(({ key, label }) => (
                <FieldBlock
                  key={key}
                  label={label}
                  value={item[key] as string}
                />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
