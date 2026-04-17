import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useTrainingStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import FabricModuleContent from '@/components/FabricModuleContent';
import { ArrowLeft, Edit } from 'lucide-react';
import { getEditorKindIcon } from '@/lib/trainingIcons';

export default function TrainingDetailPage() {
  const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
  const navigate = useNavigate();
  const getTemplateBySlug = useTrainingStore((s) => s.getTemplateBySlug);
  const items = useTrainingStore((s) => s.items);
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const template = slug ? getTemplateBySlug(slug) : undefined;
  const item = itemId ? items.find((i) => i.id === itemId) : undefined;

  const moduleDefs = useMemo(() => {
    if (!template) return [];
    return [...template.moduleDefs]
      .filter((m) => m.enabled)
      .sort((a, b) => a.order - b.order);
  }, [template]);

  const [activeTab, setActiveTab] = useState(moduleDefs[0]?.id ?? '');

  useEffect(() => {
    if (moduleDefs[0]?.id) setActiveTab(moduleDefs[0].id);
  }, [template?.id, moduleDefs]);

  if (!slug || !template) {
    return <Navigate to="/" replace />;
  }

  if (!item) {
    return <Navigate to={`/t/${slug}`} replace />;
  }

  const base = `/t/${slug}`;
  const editLabel =
    template.slug === 'fabric-training' ? '编辑面料' : '编辑';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(base)}
          className="text-brand-gray-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Button>
        {isAdmin && (
          <Button
            onClick={() => navigate(`${base}/${item.id}/edit`)}
            variant="outline"
          >
            <Edit className="w-4 h-4 mr-2" />
            {editLabel}
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary">{item.category}</Badge>
            <span className="text-sm text-brand-gray-muted">
              序号 {item.order}
            </span>
          </div>
          <CardTitle className="text-2xl">{item.name}</CardTitle>
          <p className="text-brand-gray mt-2">{item.subtitle}</p>
        </CardHeader>
        <CardContent>
          <p className="text-brand-gray leading-relaxed">{item.description}</p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex w-full h-auto flex-wrap gap-1 justify-start p-1 min-h-[3.5rem]">
          {moduleDefs.map((def) => {
            const Icon = getEditorKindIcon(def.editorKind);
            return (
              <TabsTrigger
                key={def.id}
                value={def.id}
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-brand-yellow-soft data-[state=active]:text-brand-accent min-w-[4.5rem] flex-1 md:flex-none"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="text-xs text-center leading-tight">
                  {def.label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {moduleDefs.map((def) => {
          const Icon = getEditorKindIcon(def.editorKind);
          const content = item.modules[def.id] ?? '';
          return (
            <TabsContent key={def.id} value={def.id} className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-accent shrink-0" />
                    <CardTitle className="text-lg">{def.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <FabricModuleContent
                    content={content}
                    editorKind={def.editorKind}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
