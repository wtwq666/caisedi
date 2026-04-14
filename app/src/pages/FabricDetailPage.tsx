import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFabricStore, useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  BookOpen,
  MessageSquare,
  BarChart3,
  HelpCircle,
  FlaskConical,
  Wrench,
  ClipboardCheck
} from 'lucide-react';

const moduleTabs = [
  { id: 'productCognition', label: '产品认知', icon: BookOpen },
  { id: 'salesScript', label: '销售话术', icon: MessageSquare },
  { id: 'competitorComparison', label: '竞品对比', icon: BarChart3 },
  { id: 'objectionHandling', label: '异议处理', icon: HelpCircle },
  { id: 'practicalExercise', label: '实操演练', icon: FlaskConical },
  { id: 'afterSales', label: '售后知识', icon: Wrench },
  { id: 'test', label: '课后测试', icon: ClipboardCheck },
];

export default function FabricDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fabrics } = useFabricStore();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  const fabric = fabrics.find((f) => f.id === id);
  const [activeTab, setActiveTab] = useState('productCognition');

  useEffect(() => {
    if (!fabric) {
      navigate('/fabric-training');
    }
  }, [fabric, navigate]);

  if (!fabric) return null;

  // 渲染Markdown内容（简化版）
  const renderContent = (content: string) => {
    if (!content) return <p className="text-gray-500">暂无内容</p>;

    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let tableRows: string[][] = [];
    let inTable = false;
    let listItems: string[] = [];
    let inList = false;

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse border border-gray-200">
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={
                      rowIndex === 0
                        ? 'bg-gray-50 font-medium'
                        : rowIndex % 2 === 0
                        ? 'bg-gray-50'
                        : 'bg-white'
                    }
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-200 px-3 py-2 text-sm"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1 my-3">
            {listItems.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // 表格行
      if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
        flushList();
        inTable = true;
        const cells = trimmedLine
          .slice(1, -1)
          .split('|')
          .map((cell) => cell.trim())
          .filter((cell) => cell && !cell.match(/^[-:]+$/));
        if (cells.length > 0) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
      }

      // 标题
      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h3
            key={`h3-${index}`}
            className="text-lg font-semibold text-gray-900 mt-6 mb-3"
          >
            {trimmedLine.replace('## ', '')}
          </h3>
        );
        return;
      }

      if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h4
            key={`h4-${index}`}
            className="text-base font-medium text-gray-800 mt-4 mb-2"
          >
            {trimmedLine.replace('### ', '')}
          </h4>
        );
        return;
      }

      // 列表项
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        inList = true;
        listItems.push(trimmedLine.replace(/^[-*] /, ''));
        return;
      } else if (inList && trimmedLine) {
        // 继续列表项的内容
        listItems[listItems.length - 1] += ' ' + trimmedLine;
        return;
      } else if (inList && !trimmedLine) {
        flushList();
        return;
      }

      // 粗体
      if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        elements.push(
          <p key={`p-${index}`} className="font-semibold text-gray-800 my-2">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
        return;
      }

      // 普通段落
      if (trimmedLine) {
        elements.push(
          <p key={`p-${index}`} className="text-gray-700 my-2 leading-relaxed">
            {trimmedLine.replace(/\*\*/g, '')}
          </p>
        );
      }
    });

    flushTable();
    flushList();

    return <div className="prose prose-sm max-w-none">{elements}</div>;
  };

  return (
    <div className="space-y-6">
      {/* 返回按钮和操作 */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate('/fabric-training')}
          className="text-gray-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回列表
        </Button>
        {isAdmin && (
          <Button
            onClick={() => navigate(`/fabric-training/${fabric.id}/edit`)}
            variant="outline"
          >
            <Edit className="w-4 h-4 mr-2" />
            编辑面料
          </Button>
        )}
      </div>

      {/* 面料基本信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary">{fabric.category}</Badge>
            <span className="text-sm text-gray-500">序号 {fabric.order}</span>
          </div>
          <CardTitle className="text-2xl">{fabric.name}</CardTitle>
          <p className="text-gray-600 mt-2">{fabric.subtitle}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{fabric.description}</p>
        </CardContent>
      </Card>

      {/* 模块标签页 */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 w-full h-auto">
          {moduleTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col items-center gap-1 py-3 px-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600"
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {moduleTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <tab.icon className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{tab.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {renderContent(fabric.modules[tab.id as keyof typeof fabric.modules])}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
