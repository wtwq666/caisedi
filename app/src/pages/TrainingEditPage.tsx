import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import type { TrainingTemplate } from '@/types/training';
import { toast } from 'sonner';
import { useTrainingStore, emptyModulesFromTemplate } from '@/store';
import {
  parseTrainingWorkbook,
  parseTrainingWorkbookFromRows,
  readFabricWorkbookRows,
  pickFabricRowForName,
  downloadTrainingTemplate,
  FabricExcelParseError,
} from '@/lib/excelTraining';
import { FabricModuleEditor } from '@/components/fabric-edit/FabricModuleEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Upload, Download } from 'lucide-react';
import type { TrainingItem } from '@/types/training';

const fabricCategories = ['天然纤维', '再生纤维', '合成纤维', '混纺面料'];
const genericCategories = ['通用', '默认'];

function ensureModules(
  template: TrainingTemplate,
  raw: Record<string, string>,
): Record<string, string> {
  const o = { ...raw };
  for (const m of template.moduleDefs.filter((x) => x.enabled)) {
    if (o[m.id] === undefined) o[m.id] = '';
  }
  return o;
}

export default function TrainingEditPage() {
  const { slug, itemId } = useParams<{ slug: string; itemId?: string }>();
  const navigate = useNavigate();
  const getTemplateBySlug = useTrainingStore((s) => s.getTemplateBySlug);
  const items = useTrainingStore((s) => s.items);
  const addItem = useTrainingStore((s) => s.addItem);
  const addItems = useTrainingStore((s) => s.addItems);
  const updateItem = useTrainingStore((s) => s.updateItem);

  const template = slug ? getTemplateBySlug(slug) : undefined;
  const isNew = itemId === undefined;
  const existing = !isNew && itemId ? items.find((i) => i.id === itemId) : null;

  const excelInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    name: string;
    subtitle: string;
    description: string;
    category: string;
    order: number;
    modules: Record<string, string>;
  }>({
    name: '',
    subtitle: '',
    description: '',
    category: '天然纤维',
    order: 1,
    modules: {},
  });

  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (!template) return;
    const count = items.filter((i) => i.templateId === template.id).length;
    if (existing) {
      setFormData({
        name: existing.name,
        subtitle: existing.subtitle,
        description: existing.description,
        category: existing.category,
        order: existing.order,
        modules: ensureModules(template, existing.modules),
      });
    } else {
      setFormData({
        name: '',
        subtitle: '',
        description: '',
        category:
          template.slug === 'fabric-training'
            ? '天然纤维'
            : genericCategories[0],
        order: count + 1,
        modules: emptyModulesFromTemplate(template),
      });
    }
  }, [existing, template, isNew, items]);

  if (!slug || !template) {
    return <Navigate to="/" replace />;
  }

  if (!isNew && itemId && !existing) {
    return <Navigate to={`/t/${slug}`} replace />;
  }

  const moduleDefs = [...template.moduleDefs]
    .filter((m) => m.enabled)
    .sort((a, b) => a.order - b.order);

  const categories =
    template.slug === 'fabric-training' ? fabricCategories : genericCategories;

  const nameLabel = template.slug === 'fabric-training' ? '面料名称' : '名称';
  const pageTitle = isNew
    ? `新增${template.slug === 'fabric-training' ? '面料' : '条目'}`
    : `编辑${template.slug === 'fabric-training' ? '面料' : ''}`;

  const handleBasicChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleModuleChange = (moduleId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      modules: { ...prev.modules, [moduleId]: value },
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert(`请输入${nameLabel}`);
      return;
    }

    const payload: Omit<TrainingItem, 'id'> = {
      templateId: template.id,
      name: formData.name,
      subtitle: formData.subtitle,
      description: formData.description,
      category: formData.category,
      order: formData.order,
      modules: ensureModules(template, formData.modules),
    };

    if (isNew) {
      addItem(payload);
    } else if (itemId) {
      updateItem(itemId, payload);
    }

    navigate(`/t/${slug}`);
  };

  const handleExcelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      if (isNew) {
        const imported = await parseTrainingWorkbook(file, template);
        addItems(imported);
        toast.success(`成功导入 ${imported.length} 条`);
        navigate(`/t/${slug}`);
        return;
      }
      const rows = await readFabricWorkbookRows(file);
      const parsed = parseTrainingWorkbookFromRows(rows, template);
      const row = pickFabricRowForName(parsed, formDataRef.current.name);
      if (!row) {
        toast.error(
          '未找到与当前「名称」一致的数据行，请检查 Excel 中的名称列',
        );
        return;
      }
      setFormData({
        name: row.name,
        subtitle: row.subtitle,
        description: row.description,
        category: row.category,
        order: row.order,
        modules: ensureModules(template, row.modules),
      });
      toast.success('已用 Excel 中的匹配行填充当前表单，请检查后保存');
    } catch (err) {
      if (err instanceof FabricExcelParseError) {
        toast.error(err.message);
      } else {
        toast.error('导入失败，请检查文件是否为有效的 Excel');
        console.error(err);
      }
    }
  };

  const base = `/t/${slug}`;

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
        <Button
          onClick={handleSubmit}
          className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-ink"
        >
          <Save className="w-4 h-4 mr-2" />
          {isNew ? '创建' : '保存修改'}
        </Button>
      </div>

      <h2 className="text-2xl font-bold text-brand-ink">{pageTitle}</h2>

      <Card className="border-brand-yellow-border/70 bg-brand-yellow-soft/90">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Excel 批量导入</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-brand-gray w-full mb-1">
            {isNew
              ? `下载「${template.name}」导入模板后按列填写；首行表头请勿改列名。上传后批量新增并返回列表。`
              : '下载模板给业务填写。上传时按「名称」匹配一行并填充下方表单（不会自动保存）。'}
          </p>
          <Button
            type="button"
            variant="outline"
            className="bg-brand-gray-surface border-brand-gray-border text-brand-ink"
            onClick={() =>
              downloadTrainingTemplate(template, `${template.name}导入模板.xlsx`)
            }
          >
            <Download className="w-4 h-4 mr-2" />
            下载导入模板
          </Button>
          <input
            ref={excelInputRef}
            type="file"
            accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
            className="hidden"
            onChange={handleExcelChange}
          />
          <Button
            type="button"
            className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-ink"
            onClick={() => excelInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {isNew ? '上传 Excel 批量导入' : '上传 Excel 填充表单'}
          </Button>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 justify-start">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          {moduleDefs.map((module) => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="basic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {nameLabel} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleBasicChange('name', e.target.value)}
                    placeholder={`请输入${nameLabel}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      handleBasicChange('category', e.target.value)
                    }
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">副标题</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    handleBasicChange('subtitle', e.target.value)
                  }
                  placeholder="一句话简介（可选）"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleBasicChange('description', e.target.value)
                  }
                  placeholder="请输入描述"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">排序序号</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    handleBasicChange('order', parseInt(e.target.value) || 0)
                  }
                  placeholder="排序序号"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {moduleDefs.map((module) => (
          <TabsContent key={module.id} value={module.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{module.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <FabricModuleEditor
                  editorKind={module.editorKind}
                  value={formData.modules[module.id] ?? ''}
                  onChange={(v) => handleModuleChange(module.id, v)}
                  enableAdvancedRaw
                />
                <p className="text-sm text-muted-foreground mt-4">
                  内容保存在本机浏览器；请优先使用上方表单填写。
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
