import { useMemo, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useTrainingStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Search,
  Plus,
  FileText,
  Edit,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ITEMS_PER_PAGE = 10;

export default function TrainingListPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const getTemplateBySlug = useTrainingStore((s) => s.getTemplateBySlug);
  const items = useTrainingStore((s) => s.items);
  const deleteItem = useTrainingStore((s) => s.deleteItem);
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const template = slug ? getTemplateBySlug(slug) : undefined;

  const listItems = useMemo(() => {
    if (!template) return [];
    return items.filter((i) => i.templateId === template.id);
  }, [items, template]);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = useMemo(() => {
    const set = new Set(listItems.map((f) => f.category).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'zh-CN'));
  }, [listItems]);

  const q = searchQuery.toLowerCase().trim();

  const filtered = listItems.filter((row) => {
    if (categoryFilter && row.category !== categoryFilter) return false;
    if (!q) return true;
    return (
      row.name.toLowerCase().includes(q) ||
      row.subtitle.toLowerCase().includes(q) ||
      row.category.toLowerCase().includes(q) ||
      row.description.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const base = `/t/${slug}`;

  if (!slug || !template) {
    return <Navigate to="/" replace />;
  }

  const itemNoun = template.slug === 'fabric-training' ? '面料' : '条目';

  return (
    <div className="space-y-5">
      {/* 芬迪黄主视觉区：标题与操作 */}
      <section className="rounded-2xl border border-brand-yellow-border/40 bg-brand-yellow px-5 py-5 sm:px-6 sm:py-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-brand-ink sm:text-[1.65rem]">
              {template.name}
            </h2>
            <p className="text-brand-ink-soft/90 mt-1.5 text-sm sm:text-base">
              共 {listItems.length}{' '}
              {template.slug === 'fabric-training' ? '种面料' : '条'}
            </p>
          </div>
          {isAdmin && (
            <Button
              onClick={() => navigate(`${base}/new`)}
              className="shrink-0 bg-brand-ink/90 text-brand-yellow hover:bg-brand-ink hover:text-brand-yellow-soft shadow-md"
            >
              <Plus className="w-4 h-4 mr-2" />
              新增{itemNoun}
            </Button>
          )}
        </div>
      </section>

      {/* 精致灰工具区：筛选 + 搜索，与黄底分离、阅读更轻松 */}
      <section className="rounded-2xl border border-brand-gray-border/90 bg-card/95 px-4 py-4 sm:px-5 shadow-sm ring-1 ring-black/[0.04]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-brand-gray mr-1">分类</span>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter(null);
              setCurrentPage(1);
            }}
            className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              categoryFilter === null
                ? 'bg-brand-yellow text-brand-ink shadow-sm ring-1 ring-brand-yellow-border/40'
                : 'bg-background/80 text-brand-gray border border-transparent hover:border-brand-gray-border'
            }`}
          >
            全部
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentPage(1);
              }}
              className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-brand-yellow text-brand-ink shadow-sm ring-1 ring-brand-yellow-border/40'
                  : 'bg-background/80 text-brand-gray border border-transparent hover:border-brand-gray-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-muted w-5 h-5 pointer-events-none" />
          <Input
            placeholder={`搜索${itemNoun}名称、描述或分类...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 h-11 bg-background/90 border-brand-gray-border focus-visible:ring-brand-yellow"
          />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginated.map((row) => (
          <Card
            key={row.id}
            className="group cursor-pointer overflow-hidden rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm ring-1 ring-black/[0.035] transition-all hover:border-brand-yellow-border/55 hover:shadow-md hover:ring-brand-yellow/15"
            onClick={() => navigate(`${base}/${row.id}`)}
          >
            <CardHeader className="pb-3 border-b border-brand-gray-border/50 bg-muted/80">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-brand-yellow/90 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-brand-yellow-border/30">
                  <FileText className="w-5 h-5 text-brand-ink/85" />
                </div>
                {isAdmin && (
                  <div
                    className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => navigate(`${base}/${row.id}/edit`)}
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>确认删除</AlertDialogTitle>
                          <AlertDialogDescription>
                            您确定要删除「{row.name}」吗？此操作无法撤销。
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>取消</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteItem(row.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            删除
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-4 pb-4">
              <CardTitle className="text-base font-semibold text-brand-ink line-clamp-1 mb-1">
                {row.name}
              </CardTitle>
              <p className="text-xs text-brand-gray-muted mb-2">序号 {row.order}</p>
              <p className="text-sm text-brand-gray leading-relaxed line-clamp-2 mb-3">
                {row.subtitle}
              </p>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-brand-gray border border-brand-gray-border/40">
                  {row.category}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0 text-brand-gray-muted group-hover:text-brand-accent transition-colors" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {paginated.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">暂无数据或没有匹配的{itemNoun}</p>
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
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
        第 {currentPage} / {totalPages || 1} 页，共 {filtered.length} 条
      </div>
    </div>
  );
}
