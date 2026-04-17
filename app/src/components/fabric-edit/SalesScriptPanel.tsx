import { useMemo, useState, useEffect } from 'react';
import {
  parseSalesScript,
  serializeSalesScript,
  type SalesScene,
} from '@/lib/fabricModuleMd/salesScript';
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

export function SalesScriptPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseSalesScript(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const scenes: SalesScene[] = parsed.ok && parsed.model.length > 0
    ? parsed.model
    : [{ title: '场景一：', wrong: '', right: '' }];

  const update = (next: SalesScene[]) => onChange(serializeSalesScript(next));

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
        {scenes.map((s, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-3 bg-card">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 space-y-2">
                <Label>场景标题</Label>
                <Input
                  value={s.title}
                  onChange={(e) => {
                    const n = [...scenes];
                    n[i] = { ...n[i], title: e.target.value };
                    update(n);
                  }}
                  placeholder="场景一：客户触摸面料时"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => update(scenes.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>错误示范</Label>
              <Textarea
                value={s.wrong}
                onChange={(e) => {
                  const n = [...scenes];
                  n[i] = { ...n[i], wrong: e.target.value };
                  update(n);
                }}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>正确话术</Label>
              <Textarea
                value={s.right}
                onChange={(e) => {
                  const n = [...scenes];
                  n[i] = { ...n[i], right: e.target.value };
                  update(n);
                }}
                rows={4}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => update([...scenes, { title: `场景${scenes.length + 1}：`, wrong: '', right: '' }])}
        >
          <Plus className="w-4 h-4 mr-1" />
          添加场景
        </Button>
      </div>
    </ModulePanelShell>
  );
}
