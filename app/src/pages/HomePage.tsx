import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingStore } from '@/store';
import { ChevronRight, Package, FolderOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getIconForTemplateSlug } from '@/lib/templateSlugIcons';
import { defaultTrainingTemplates } from '@/data/defaultTemplates';
import { navLibrarySections } from '@/data/libraryManifest';

const slugOrder = defaultTrainingTemplates.map((t) => t.slug);

export default function HomePage() {
  const navigate = useNavigate();
  const templates = useTrainingStore((s) => s.templates);

  const sorted = useMemo(() => {
    return [...templates].sort((a, b) => {
      const ia = slugOrder.indexOf(a.slug);
      const ib = slugOrder.indexOf(b.slug);
      if (ia === -1 && ib === -1) return a.name.localeCompare(b.name, 'zh-CN');
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [templates]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-brand-yellow-border/40 bg-brand-yellow px-5 py-5 sm:px-6 sm:py-6 shadow-sm">
        <h2 className="text-2xl font-bold tracking-tight text-brand-ink">欢迎使用</h2>
        <p className="text-brand-ink-soft/90 mt-2 text-sm sm:text-base">
          请选择要进入的业务模块
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          role="button"
          tabIndex={0}
          onClick={() => navigate('/products')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/products');
            }
          }}
          className="group cursor-pointer overflow-hidden rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm ring-1 ring-black/[0.035] transition-all hover:border-brand-yellow-border/55 hover:shadow-md hover:ring-brand-yellow/15"
        >
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-yellow/85 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-brand-yellow-border/25 group-hover:bg-brand-yellow transition-colors">
                <Package className="w-6 h-6 text-brand-ink/80" />
              </div>
              <ChevronRight className="w-5 h-5 text-brand-gray-muted group-hover:text-brand-accent transition-colors flex-shrink-0" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-brand-ink group-hover:text-brand-accent transition-colors">
                商品资料参考
              </h3>
              <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                凯施迪 26 夏商品货号、面料与卖点等资料速查
              </p>
            </div>
          </CardContent>
        </Card>
        {sorted
          .filter((item) => item.slug === 'fabric-training')
          .map((item) => {
            const Icon = getIconForTemplateSlug(item.slug);
            return (
              <Card
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/t/${item.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/t/${item.slug}`);
                  }
                }}
                className="group cursor-pointer overflow-hidden rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm ring-1 ring-black/[0.035] transition-all hover:border-brand-yellow-border/55 hover:shadow-md hover:ring-brand-yellow/15"
              >
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-yellow/85 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-brand-yellow-border/25 group-hover:bg-brand-yellow transition-colors">
                      <Icon className="w-6 h-6 text-brand-ink/80" />
                    </div>
                    <ChevronRight className="w-5 h-5 text-brand-gray-muted group-hover:text-brand-accent transition-colors flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brand-ink group-hover:text-brand-accent transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                      {item.description?.trim() || '—'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        {navLibrarySections.map((section) => (
          <Card
            key={section.slug}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/library/${section.slug}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/library/${section.slug}`);
              }
            }}
            className="group cursor-pointer overflow-hidden rounded-xl border border-brand-gray-border/95 bg-card text-card-foreground shadow-sm ring-1 ring-black/[0.035] transition-all hover:border-brand-yellow-border/55 hover:shadow-md hover:ring-brand-yellow/15"
          >
            <CardContent className="p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-yellow/85 flex items-center justify-center flex-shrink-0 shadow-sm ring-1 ring-brand-yellow-border/25 group-hover:bg-brand-yellow transition-colors">
                  <FolderOpen className="w-6 h-6 text-brand-ink/80" />
                </div>
                <ChevronRight className="w-5 h-5 text-brand-gray-muted group-hover:text-brand-accent transition-colors flex-shrink-0" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-ink group-hover:text-brand-accent transition-colors">
                  {section.name}
                </h3>
                <p className="text-sm text-brand-gray mt-2 leading-relaxed">
                  共 {section.files.length} 份资料，支持在线预览
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
