import { useMemo, useState, useEffect } from 'react';
import {
  parseAfterSales,
  serializeAfterSales,
  type AfterSalesSection,
} from '@/lib/fabricModuleMd/afterSales';
import { ModulePanelShell } from './ModulePanelShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  enableAdvancedRaw?: boolean;
}

export function AfterSalesPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseAfterSales(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const sections: AfterSalesSection[] =
    parsed.ok && parsed.model.length > 0
      ? parsed.model
      : [{ title: '洗涤指南', bullets: [''] }];

  const update = (next: AfterSalesSection[]) => onChange(serializeAfterSales(next));

  return (
    <ModulePanelShell
      parseOk={parsed.ok}
      value={value}
      onChange={onChange}
      rawMode={rawMode}
      onRawModeChange={setRawMode}
      enableAdvancedRaw={enableAdvancedRaw}
    >
      <div className="space-y-6">
        {sections.map((sec, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Label>小节标题</Label>
                <Input
                  value={sec.title}
                  onChange={(e) => {
                    const n = [...sections];
                    n[i] = { ...n[i], title: e.target.value };
                    update(n);
                  }}
                  placeholder="洗涤指南"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => update(sections.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>列表项（每行一条，保存为 - 开头）</Label>
              <Textarea
                value={sec.bullets.join('\n')}
                onChange={(e) => {
                  const n = [...sections];
                  n[i] = {
                    ...n[i],
                    bullets: e.target.value.split('\n').map((l) => l.trim()),
                  };
                  update(n);
                }}
                rows={8}
                placeholder="- **水温**：冷水或30℃以下"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            update([...sections, { title: '新小节', bullets: [''] }])
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          添加小节
        </Button>
      </div>
    </ModulePanelShell>
  );
}
