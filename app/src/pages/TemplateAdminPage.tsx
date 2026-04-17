import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrainingStore } from '@/store';
import type { EditorKind, TemplateModuleDef } from '@/types/training';
import { DEFAULT_FABRIC_TEMPLATE_ID } from '@/data/defaultTemplates';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Trash2, ChevronUp, ChevronDown, ArrowLeft } from 'lucide-react';

const EDITOR_OPTIONS: { value: EditorKind; label: string }[] = [
  { value: 'productCognition', label: '产品认知（表格+段落）' },
  { value: 'salesScript', label: '销售话术（场景）' },
  { value: 'competitorComparison', label: '竞品对比（表格）' },
  { value: 'objectionHandling', label: '异议处理（问答）' },
  { value: 'practicalExercise', label: '实操演练' },
  { value: 'afterSales', label: '售后知识' },
  { value: 'test', label: '课后测试' },
  { value: 'markdown', label: '纯文本（通用）' },
];

export default function TemplateAdminPage() {
  const navigate = useNavigate();
  const templates = useTrainingStore((s) => s.templates);
  const items = useTrainingStore((s) => s.items);
  const addTemplate = useTrainingStore((s) => s.addTemplate);
  const updateTemplate = useTrainingStore((s) => s.updateTemplate);
  const deleteTemplate = useTrainingStore((s) => s.deleteTemplate);

  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreate = () => {
    const slug = newSlug.trim().toLowerCase().replace(/\s+/g, '-');
    if (!newName.trim() || !slug) {
      toast.error('请填写模板名称与路径标识');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      toast.error('路径标识仅允许小写字母、数字、连字符');
      return;
    }
    if (templates.some((t) => t.slug === slug)) {
      toast.error('该路径已被占用');
      return;
    }
    addTemplate({
      name: newName.trim(),
      slug,
      description: newDesc.trim() || ' ',
      moduleDefs: [
        {
          id: 'content',
          label: '主要内容',
          editorKind: 'markdown',
          order: 0,
          enabled: true,
        },
      ],
    });
    toast.success('已创建模板');
    setCreateOpen(false);
    setNewName('');
    setNewSlug('');
    setNewDesc('');
  };

  const moveDef = (
    templateId: string,
    defs: TemplateModuleDef[],
    index: number,
    dir: -1 | 1,
  ) => {
    const j = index + dir;
    if (j < 0 || j >= defs.length) return;
    const next = [...defs];
    [next[index], next[j]] = [next[j], next[index]];
    next.forEach((d, i) => {
      d.order = i;
    });
    updateTemplate(templateId, { moduleDefs: next });
  };

  const updateDef = (
    templateId: string,
    defs: TemplateModuleDef[],
    i: number,
    patch: Partial<TemplateModuleDef>,
  ) => {
    const next = defs.map((d, di) =>
      di === i ? { ...d, ...patch, id: d.id } : d,
    );
    updateTemplate(templateId, { moduleDefs: next });
  };

  const removeDef = (
    templateId: string,
    defs: TemplateModuleDef[],
    i: number,
  ) => {
    const next = defs.filter((_, di) => di !== i);
    next.forEach((d, ord) => {
      d.order = ord;
    });
    updateTemplate(templateId, { moduleDefs: next });
  };

  const addDef = (templateId: string, defs: TemplateModuleDef[]) => {
    const id = `mod-${Date.now()}`;
    updateTemplate(templateId, {
      moduleDefs: [
        ...defs,
        {
          id,
          label: '新模块',
          editorKind: 'markdown',
          order: defs.length,
          enabled: true,
        },
      ],
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回首页
        </Button>
        <h1 className="text-2xl font-bold text-brand-ink">培训模板管理</h1>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogTrigger asChild>
          <Button className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-ink w-fit">
            <Plus className="w-4 h-4 mr-2" />
            新建模板
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建培训模板</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>显示名称</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="例如：新店开业培训"
              />
            </div>
            <div className="space-y-2">
              <Label>路径标识（英文）</Label>
              <Input
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="例如：new-store（将对应 /t/new-store）"
              />
            </div>
            <div className="space-y-2">
              <Label>简介</Label>
              <Textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              取消
            </Button>
            <Button onClick={handleCreate}>创建</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {templates.map((t) => {
          const defs = [...t.moduleDefs].sort((a, b) => a.order - b.order);
          const count = items.filter((i) => i.templateId === t.id).length;
          const isFabric = t.id === DEFAULT_FABRIC_TEMPLATE_ID;
          const open = editingId === t.id;

          return (
            <Card key={t.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle>{t.name}</CardTitle>
                  <CardDescription>
                    /t/{t.slug} · {count} 条内容
                  </CardDescription>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingId(open ? null : t.id)}
                  >
                    {open ? '收起' : '编辑子模块'}
                  </Button>
                  {!isFabric && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => {
                        if (
                          !window.confirm(
                            `确定删除模板「${t.name}」？仅当无内容时可删。`,
                          )
                        )
                          return;
                        const ok = deleteTemplate(t.id);
                        if (!ok) {
                          toast.error(
                            '无法删除：请先在列表中删除该模板下所有条目，或保留系统内置模板',
                          );
                        } else toast.success('已删除');
                      }}
                    >
                      删除模板
                    </Button>
                  )}
                </div>
              </CardHeader>
              {open && (
                <CardContent className="space-y-4 border-t pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>显示名称</Label>
                      <Input
                        value={t.name}
                        onChange={(e) =>
                          updateTemplate(t.id, { name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>路径标识</Label>
                      <Input
                        value={t.slug}
                        disabled={isFabric}
                        onChange={(e) =>
                          updateTemplate(t.id, {
                            slug: e.target.value
                              .trim()
                              .toLowerCase()
                              .replace(/\s+/g, '-'),
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>简介（首页卡片）</Label>
                    <Textarea
                      value={t.description}
                      onChange={(e) =>
                        updateTemplate(t.id, { description: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>子模块（决定表单类型与 Excel 列名）</Label>
                    <div className="rounded-lg border divide-y">
                      {defs.map((def, i) => (
                        <div
                          key={def.id}
                          className="flex flex-col sm:flex-row gap-3 p-3 bg-muted/20"
                        >
                          <div className="flex-1 grid gap-2 sm:grid-cols-2">
                            <Input
                              placeholder="列名 / 标签"
                              value={def.label}
                              onChange={(e) =>
                                updateDef(t.id, defs, i, {
                                  label: e.target.value,
                                })
                              }
                            />
                            <Select
                              value={def.editorKind}
                              onValueChange={(v) =>
                                updateDef(t.id, defs, i, {
                                  editorKind: v as EditorKind,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {EDITOR_OPTIONS.map((o) => (
                                  <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveDef(t.id, defs, i, -1)}
                              disabled={i === 0}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => moveDef(t.id, defs, i, 1)}
                              disabled={i === defs.length - 1}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-red-600"
                              onClick={() => removeDef(t.id, defs, i)}
                              disabled={isFabric && defs.length <= 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addDef(t.id, defs)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      添加子模块
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
