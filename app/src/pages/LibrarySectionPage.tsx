import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getLibrarySectionBySlug } from '@/data/libraryManifest';

export default function LibrarySectionPage() {
  const { sectionSlug } = useParams<{ sectionSlug: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [kindFilter, setKindFilter] = useState<string>('all');

  const section = sectionSlug ? getLibrarySectionBySlug(sectionSlug) : undefined;
  if (!sectionSlug || !section) return <Navigate to="/" replace />;

  const kinds = useMemo(() => {
    return Array.from(new Set(section.files.map((f) => f.kind)));
  }, [section.files]);

  const normalized = query.trim().toLowerCase();
  const files = useMemo(() => {
    return section.files.filter((file) => {
      if (kindFilter !== 'all' && file.kind !== kindFilter) return false;
      if (!normalized) return true;
      return file.name.toLowerCase().includes(normalized);
    });
  }, [section.files, kindFilter, normalized]);

  const groupedFiles = useMemo(() => {
    const map = new Map<string, typeof files>();
    for (const file of files) {
      const key = file.kind.toUpperCase();
      const current = map.get(key);
      if (current) {
        current.push(file);
      } else {
        map.set(key, [file]);
      }
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [files]);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-brand-yellow-border/40 bg-brand-yellow px-5 py-5 sm:px-6 sm:py-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-brand-ink">{section.name}</h2>
        <p className="text-brand-ink-soft/90 mt-1.5 text-sm sm:text-base">
          共 {section.files.length} 份资料，支持在线预览与下载
        </p>
      </section>

      <section className="rounded-2xl border border-brand-gray-border/90 bg-card/95 px-4 py-4 sm:px-5 shadow-sm ring-1 ring-black/[0.04]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setKindFilter('all')}
            className={`rounded-full px-3.5 py-1.5 text-sm ${
              kindFilter === 'all' ? 'bg-brand-yellow text-brand-ink' : 'bg-muted'
            }`}
          >
            全部
          </button>
          {kinds.map((kind) => (
            <button
              key={kind}
              type="button"
              onClick={() => setKindFilter(kind)}
              className={`rounded-full px-3.5 py-1.5 text-sm uppercase ${
                kindFilter === kind ? 'bg-brand-yellow text-brand-ink' : 'bg-muted'
              }`}
            >
              {kind}
            </button>
          ))}
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-gray-muted w-5 h-5 pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="按文件名搜索"
            className="pl-10 h-11 bg-background/90 border-brand-gray-border focus-visible:ring-brand-yellow"
          />
        </div>
      </section>

      <div className="space-y-6">
        {groupedFiles.map(([group, groupItems]) => (
          <section key={group} className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="uppercase text-xs">
                {group}
              </Badge>
              <p className="text-sm text-muted-foreground">{groupItems.length} 个文件</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {groupItems.map((file) => (
                <Card
                  key={file.id}
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    navigate(`/library/${section.slug}/file/${encodeURIComponent(file.id)}`)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/library/${section.slug}/file/${encodeURIComponent(file.id)}`);
                    }
                  }}
                  className="group cursor-pointer rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm transition-all hover:border-brand-yellow-border/55 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="uppercase">
                        {file.kind}
                      </Badge>
                      <ArrowRight className="w-4 h-4 text-brand-gray-muted group-hover:text-brand-accent" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-base leading-relaxed line-clamp-2">
                      {file.name}
                    </CardTitle>
                    <p className="mt-2 text-xs text-muted-foreground">{file.path}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>

      {files.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <FileText className="w-8 h-8 mx-auto mb-2 opacity-60" />
          无匹配文件
        </div>
      )}
    </div>
  );
}
