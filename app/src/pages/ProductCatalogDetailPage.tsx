import { useMemo, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Layers,
  MessageCircle,
  MessageSquareWarning,
  Package,
  Plus,
  Sparkles,
  Swords,
  ClipboardList,
} from 'lucide-react';
import { PRODUCT_CATALOG_ROWS } from '@/data/productCatalog.generated';
import { isLikelyImageUrl } from '@/lib/productCatalogUtils';
import { cn } from '@/lib/utils';
import type { ProductCatalogRow } from '@/types/productCatalog';

// --- 类型：在商品资料行之上扩展可选「知识库」区块（无数据则整块不渲染） ---
export interface ProductKnowledgeExtended {
  /** 竞品对比（Markdown 或纯文本），空则隐藏该 Accordion 项 */
  competitorComparison?: string;
  /** 异议处理，空则隐藏 */
  objectionHandling?: string;
}

export type ProductKnowledgeDetail = ProductCatalogRow & ProductKnowledgeExtended;

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

/** 供 Story / 单测：全空字段，验证占位图、UGC 按钮与区块隐藏逻辑 */
export const MOCK_PRODUCT_KNOWLEDGE_EMPTY: ProductKnowledgeDetail = {
  id: 'mock-empty',
  articleNo: 'MOCK-000',
  image: '',
  seriesTheme: '',
  season: '',
  productName: '',
  color: '',
  productSeries: '',
  fitType: '',
  collarType: '',
  shoulderType: '',
  silhouette: '',
  fabricComposition: '',
  fabricTraits: '',
  sellingPoints: '',
  precautions: '',
  scenarios: '',
  salesScript: '',
  stylingTips: '',
  competitorComparison: '',
  objectionHandling: '',
};

/** 供对比：有图有文时的典型结构 */
export const MOCK_PRODUCT_KNOWLEDGE_FULL: ProductKnowledgeDetail = {
  id: 'mock-full',
  articleNo: '618001',
  image: '',
  seriesTheme: '都市轻户外',
  season: '26 夏',
  productName: '凉感防晒针织外套',
  color: '冰川蓝',
  productSeries: '轻机能',
  fitType: '微宽松',
  collarType: '立领',
  shoulderType: '正肩',
  silhouette: 'H 型',
  fabricComposition: '锦纶 78% · 氨纶 22%',
  fabricTraits: '接触凉感、UPF50+、四面弹',
  sellingPoints: '凉感纱线 + 轻量化织造，夏季外搭不闷热。\n易打包，出差一件搞定。',
  precautions: '避免与粗糙表面长时间摩擦；建议套袋机洗。',
  scenarios: '通勤空调房、周末轻徒步、接送孩子等「短户外」场景。',
  salesScript: '这件是凉感纱，贴肤是凉的，您可以摸一下袖口。',
  stylingTips: '内搭白 T + 浅色休闲裤，鞋子选德训或小白鞋。',
  competitorComparison: '竞品多为涂层防晒，我们是纱线级凉感，透气更好。',
  objectionHandling: '「太贵」：强调单季穿着频次与防晒伤省下的隐性成本。',
};

function trim(s: string | undefined): string {
  return (s ?? '').trim();
}

function firstLine(s: string): string {
  const t = trim(s);
  if (!t) return '';
  return t.split(/\r?\n/)[0]?.trim() ?? '';
}

function hasText(s: string | undefined): boolean {
  return trim(s).length > 0;
}

/** 精简衣架图标：占位用，避免依赖外链 */
function HangerGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 24c0-6.5 5.5-12 12.5-12S45 17.5 45 24v6l17 10a3 3 0 0 1 0 5.2l-26 15a3 3 0 0 1-3 0L7 45.2a3 3 0 0 1 0-5.2L20 30v-6Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path
        d="M20 24c0-6.5 5.5-12 12.5-12S45 17.5 45 24v6l17 10a3 3 0 0 1 0 5.2l-26 15a3 3 0 0 1-3 0L7 45.2a3 3 0 0 1 0-5.2L20 30v-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32.5 12a6 6 0 0 1 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LabelText({ children }: { children: React.ReactNode }) {
  /* 标签弱化：小字号 + muted，形成「说明 vs 数据」层级 */
  return (
    <p className="text-muted-foreground text-sm leading-snug">{children}</p>
  );
}

function CoreValue({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground font-medium leading-relaxed whitespace-pre-wrap">
      {children}
    </p>
  );
}

function UgcEmptyCta({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      className="h-auto w-full justify-start gap-2 px-3 py-3 text-primary hover:bg-primary/5"
      onClick={onClick}
    >
      <Plus className="size-4 shrink-0" aria-hidden />
      <span className="text-sm font-medium">{label}</span>
      <ChevronRight className="ml-auto size-4 opacity-50" aria-hidden />
    </Button>
  );
}

export default function ProductCatalogDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const item = useMemo(
    () => PRODUCT_CATALOG_ROWS.find((r) => r.id === productId),
    [productId],
  );

  const detail: ProductKnowledgeDetail | undefined = item;

  const [quizOpen, setQuizOpen] = useState(false);
  const [correctionOpen, setCorrectionOpen] = useState(false);
  const [correctionNote, setCorrectionNote] = useState('');

  if (!productId || !detail) {
    return <Navigate to="/products" replace />;
  }

  const displayName = trim(detail.productName) || detail.articleNo;
  const subtitle = [trim(detail.seriesTheme)].filter(Boolean).join(' · ');
  const tagline = firstLine(detail.sellingPoints);
  const showImage = hasText(detail.image) && isLikelyImageUrl(detail.image);

  const basicRows = BASIC_FIELDS.map(({ key, label }) => ({
    label,
    value: trim(detail[key] as string),
  })).filter((r) => r.value);

  const showBasicAccordion = basicRows.length > 0;

  const fabricExtraBlocks: { title: string; body: string }[] = [];
  if (hasText(detail.fabricTraits)) {
    fabricExtraBlocks.push({ title: '面料特征', body: detail.fabricTraits });
  }
  const fullSelling = trim(detail.sellingPoints);
  if (fullSelling && fullSelling !== tagline) {
    fabricExtraBlocks.push({ title: '工艺卖点（全文）', body: fullSelling });
  }
  if (hasText(detail.precautions)) {
    fabricExtraBlocks.push({ title: '注意事项', body: detail.precautions });
  }
  const showFabricAccordion = fabricExtraBlocks.length > 0;

  const showCompetitor = hasText(detail.competitorComparison);
  const showObjection = hasText(detail.objectionHandling);

  return (
    /* Web 优先：宽版容器 + 大屏双栏，阅读动线从左图右文到自上而下自然过渡 */
    <div className="min-h-screen bg-slate-50 text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground -ml-2"
            onClick={() => navigate('/products')}
          >
            <ArrowLeft className="mr-2 size-4" aria-hidden />
            返回列表
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shadow-sm"
              onClick={() => {
                /* 预留：接入相机 / 相册上传 */
              }}
            >
              <Camera className="mr-1.5 size-4" aria-hidden />
              补充主图
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* 左栏：主图，大屏固定比例与 sticky 便于对照右侧文字 */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-6">
              <AspectRatio ratio={4 / 5}>
                <div
                  className={cn(
                    'relative size-full overflow-hidden rounded-2xl bg-white shadow-sm',
                    !showImage && 'bg-slate-100',
                  )}
                >
                  {showImage ? (
                    <img
                      src={detail.image.trim()}
                      alt={displayName}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
                      <HangerGlyph className="size-24 text-slate-400" />
                      <p className="text-muted-foreground text-sm">主图补充中</p>
                    </div>
                  )}
                </div>
              </AspectRatio>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-7">
            {/* 核心卡片：Web 下略增内边距与标题字号，主信息区更舒展 */}
            <section className="rounded-2xl bg-white p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <LabelText>货号</LabelText>
                  <p className="font-mono text-sm font-medium tracking-wide text-foreground">
                    {detail.articleNo}
                  </p>
                  <h1 className="text-2xl font-semibold leading-snug text-foreground lg:text-3xl">
                    {displayName}
                  </h1>
                {subtitle ? (
                  <p className="text-muted-foreground text-sm">{subtitle}</p>
                ) : null}
              </div>
            </div>

            {hasText(detail.fabricComposition) ? (
              <div className="relative mt-5 rounded-xl bg-slate-50/80 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-1">
                    <LabelText>面料成分</LabelText>
                    <CoreValue>{trim(detail.fabricComposition)}</CoreValue>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="size-9 shrink-0 text-muted-foreground hover:text-primary"
                    aria-label="一键纠错：面料成分"
                    onClick={() => {
                      setCorrectionNote('');
                      setCorrectionOpen(true);
                    }}
                  >
                    <MessageSquareWarning className="size-5" />
                  </Button>
                </div>
              </div>
            ) : null}

            {tagline ? (
              <div className="mt-4 space-y-1">
                <LabelText>一句话卖点</LabelText>
                <CoreValue>{tagline}</CoreValue>
              </div>
            ) : null}
          </section>

          {/* 扩展区：Accordion 收纳，默认展开「场景与话术」；项与项之间用留白而非边框 */}
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <Accordion
              type="multiple"
              defaultValue={['sales']}
              className="flex flex-col gap-0"
            >
              {showBasicAccordion ? (
                <AccordionItem value="basic" className="border-0 px-1">
                  <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Package className="size-5 text-muted-foreground" />
                      基础档案
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {basicRows.map((row) => (
                        <div key={row.label} className="space-y-1">
                          <LabelText>{row.label}</LabelText>
                          <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                            {row.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null}

              {showFabricAccordion ? (
                <AccordionItem value="fabric" className="border-0 px-1">
                  <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Layers className="size-5 text-muted-foreground" />
                      面料与工艺
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      {fabricExtraBlocks.map((b) => (
                        <div key={b.title} className="relative rounded-xl bg-slate-50/80 p-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1 space-y-1">
                              <LabelText>{b.title}</LabelText>
                              <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                                {b.body}
                              </p>
                            </div>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="size-9 shrink-0 text-muted-foreground hover:text-primary"
                              aria-label={`一键纠错：${b.title}`}
                              onClick={() => {
                                setCorrectionNote('');
                                setCorrectionOpen(true);
                              }}
                            >
                              <MessageSquareWarning className="size-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null}

              <AccordionItem value="sales" className="border-0 px-1">
                <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="size-5 text-muted-foreground" />
                    场景与话术
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-4">
                    {hasText(detail.scenarios) ? (
                      <div className="space-y-1">
                        <LabelText>适合场景</LabelText>
                        <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {trim(detail.scenarios)}
                        </p>
                      </div>
                    ) : null}

                    <div className="space-y-1">
                      <LabelText>销售话术</LabelText>
                      {hasText(detail.salesScript) ? (
                        <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {trim(detail.salesScript)}
                        </p>
                      ) : (
                        <UgcEmptyCta
                          label="添加首条实战话术"
                          onClick={() => {
                            /* 预留：跳转编辑或弹层录入 */
                          }}
                        />
                      )}
                    </div>

                    <div className="space-y-1">
                      <LabelText>搭配推荐</LabelText>
                      {hasText(detail.stylingTips) ? (
                        <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                          {trim(detail.stylingTips)}
                        </p>
                      ) : (
                        <UgcEmptyCta
                          label="添加首条实战话术"
                          onClick={() => {
                            /* 预留：与话术共用贡献入口 */
                          }}
                        />
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {showCompetitor ? (
                <AccordionItem value="competitor" className="border-0 px-1">
                  <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Swords className="size-5 text-muted-foreground" />
                      竞品对比
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {trim(detail.competitorComparison)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ) : null}

              {showObjection ? (
                <AccordionItem value="objection" className="border-0 px-1">
                  <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                    <span className="flex items-center gap-2">
                      <Sparkles className="size-5 text-muted-foreground" />
                      异议处理
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="text-foreground text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {trim(detail.objectionHandling)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ) : null}

              {/* 与其它模块同级：默认折叠，outline 按钮打开弹窗，避免抢主内容视觉 */}
              <AccordionItem value="quiz" className="border-0 px-1">
                <AccordionTrigger className="px-4 py-4 text-base font-semibold hover:no-underline">
                  <span className="flex items-center gap-2">
                    <ClipboardList className="size-5 text-muted-foreground" />
                    知识测验
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <p className="text-muted-foreground mb-4 max-w-xl text-sm leading-relaxed">
                    巩固本款面料与卖点记忆。题目与成绩可在后端接入后展示于此。
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shadow-sm"
                    onClick={() => setQuizOpen(true)}
                  >
                    开始测验
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <p className="text-muted-foreground px-1 pb-2 text-center text-xs lg:text-left">
            商品资料 · 门店速查
          </p>
        </div>
        </div>
      </div>

      <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
        <DialogContent className="gap-4 rounded-2xl border-0 shadow-xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>知识测验</DialogTitle>
            <DialogDescription>
              题目加载与判分逻辑可在此接入。
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-xl bg-muted/50 px-4 py-12 text-center">
            <p className="text-muted-foreground text-sm">答题卡区域占位</p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              className="rounded-xl"
              onClick={() => setQuizOpen(false)}
            >
              关闭
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={correctionOpen} onOpenChange={setCorrectionOpen}>
        <DialogContent className="gap-4 rounded-2xl border-0 shadow-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>数据纠错</DialogTitle>
            <DialogDescription>
              请简要描述问题（如成分标注与吊牌不符），便于后台核对。
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={correctionNote}
            onChange={(e) => setCorrectionNote(e.target.value)}
            placeholder="例：吊牌成分为棉 60%，页面显示错误…"
            className="min-h-[120px] resize-none rounded-xl"
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="secondary"
              className="rounded-xl"
              onClick={() => setCorrectionOpen(false)}
            >
              取消
            </Button>
            <Button
              type="button"
              className="rounded-xl"
              onClick={() => {
                setCorrectionOpen(false);
                setCorrectionNote('');
                /* 预留：提交纠错 API */
              }}
            >
              提交反馈
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
