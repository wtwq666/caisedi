import { useMemo, useState, useEffect } from 'react';
import {
  parseObjectionHandling,
  serializeObjectionHandling,
  type ObjectionItem,
} from '@/lib/fabricModuleMd/objectionHandling';
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

export function ObjectionPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseObjectionHandling(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const items: ObjectionItem[] =
    parsed.ok && parsed.model.length > 0
      ? parsed.model
      : [{ title: 'Q1：', answer: '' }];

  const update = (next: ObjectionItem[]) => onChange(serializeObjectionHandling(next));

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
        {items.map((it, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Label>问题标题</Label>
                <Input
                  value={it.title}
                  onChange={(e) => {
                    const n = [...items];
                    n[i] = { ...n[i], title: e.target.value };
                    update(n);
                  }}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => update(items.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>详细回答</Label>
              <Textarea
                value={it.answer}
                onChange={(e) => {
                  const n = [...items];
                  n[i] = { ...n[i], answer: e.target.value };
                  update(n);
                }}
                rows={8}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            update([...items, { title: `Q${items.length + 1}：`, answer: '' }])
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          添加 Q&amp;A
        </Button>
      </div>
    </ModulePanelShell>
  );
}
