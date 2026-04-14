import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFabricStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';

const moduleFields = [
  { id: 'productCognition', label: '产品认知' },
  { id: 'salesScript', label: '销售话术转化' },
  { id: 'competitorComparison', label: '竞品对比' },
  { id: 'objectionHandling', label: '异议处理Q&A' },
  { id: 'practicalExercise', label: '实操演练' },
  { id: 'afterSales', label: '售后知识' },
  { id: 'test', label: '课后测试' },
];

const categories = [
  '天然纤维',
  '再生纤维',
  '合成纤维',
  '混纺面料',
];

export default function FabricEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fabrics, addFabric, updateFabric } = useFabricStore();
  const isNew = id === 'new';

  const existingFabric = !isNew ? fabrics.find((f) => f.id === id) : null;

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    category: '天然纤维',
    order: fabrics.length + 1,
    modules: {
      productCognition: '',
      salesScript: '',
      competitorComparison: '',
      objectionHandling: '',
      practicalExercise: '',
      afterSales: '',
      test: '',
    },
  });

  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (existingFabric) {
      setFormData({
        name: existingFabric.name,
        subtitle: existingFabric.subtitle,
        description: existingFabric.description,
        category: existingFabric.category,
        order: existingFabric.order,
        modules: { ...existingFabric.modules },
      });
    }
  }, [existingFabric]);

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
      alert('请输入面料名称');
      return;
    }

    if (isNew) {
      addFabric(formData);
    } else if (id) {
      updateFabric(id, formData);
    }

    navigate('/fabric-training');
  };

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/fabric-training')}
          className="text-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Button>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          {isNew ? '创建面料' : '保存修改'}
        </Button>
      </div>

      {/* 页面标题 */}
      <h2 className="text-2xl font-bold text-gray-900">
        {isNew ? '新增面料' : '编辑面料'}
      </h2>

      {/* 编辑标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          {moduleFields.map((module) => (
            <TabsTrigger key={module.id} value={module.id}>
              {module.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 基本信息 */}
        <TabsContent value="basic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    面料名称 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleBasicChange('name', e.target.value)}
                    placeholder="请输入面料名称"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">分类</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleBasicChange('category', e.target.value)}
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
                  onChange={(e) => handleBasicChange('subtitle', e.target.value)}
                  placeholder="请输入副标题（一句话记忆）"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleBasicChange('description', e.target.value)}
                  placeholder="请输入面料描述"
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
                  placeholder="请输入排序序号"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 各模块编辑 */}
        {moduleFields.map((module) => (
          <TabsContent key={module.id} value={module.id} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{module.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.modules[module.id as keyof typeof formData.modules]}
                  onChange={(e) => handleModuleChange(module.id, e.target.value)}
                  placeholder={`请输入${module.label}内容，支持Markdown格式...`}
                  rows={20}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  提示：使用 ## 表示标题，| 表格 | 表格 | 创建表格，- 表示列表项
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
