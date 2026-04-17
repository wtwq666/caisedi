import { useMemo, useState, useEffect } from 'react';
import {
  parsePracticalExercise,
  serializePracticalExercise,
  type PracticalExperiment,
} from '@/lib/fabricModuleMd/practicalExercise';
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

export function PracticalExercisePanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parsePracticalExercise(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const experiments: PracticalExperiment[] =
    parsed.ok && parsed.model.length > 0
      ? parsed.model
      : [
          {
            title: '实验一：',
            props: '',
            steps: '',
            phenomenon: '',
            script: '',
          },
        ];

  const update = (next: PracticalExperiment[]) =>
    onChange(serializePracticalExercise(next));

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
        {experiments.map((ex, i) => (
          <div key={i} className="rounded-lg border p-4 space-y-3">
            <div className="flex justify-between gap-2">
              <div className="flex-1 space-y-2">
                <Label>实验标题</Label>
                <Input
                  value={ex.title}
                  onChange={(e) => {
                    const n = [...experiments];
                    n[i] = { ...n[i], title: e.target.value };
                    update(n);
                  }}
                  placeholder="实验一：吸水性对比实验"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-6"
                onClick={() => update(experiments.filter((_, j) => j !== i))}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>道具</Label>
                <Input
                  value={ex.props}
                  onChange={(e) => {
                    const n = [...experiments];
                    n[i] = { ...n[i], props: e.target.value };
                    update(n);
                  }}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>步骤（支持多行编号）</Label>
                <Textarea
                  value={ex.steps}
                  onChange={(e) => {
                    const n = [...experiments];
                    n[i] = { ...n[i], steps: e.target.value };
                    update(n);
                  }}
                  rows={5}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>现象</Label>
                <Textarea
                  value={ex.phenomenon}
                  onChange={(e) => {
                    const n = [...experiments];
                    n[i] = { ...n[i], phenomenon: e.target.value };
                    update(n);
                  }}
                  rows={3}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>话术</Label>
                <Textarea
                  value={ex.script}
                  onChange={(e) => {
                    const n = [...experiments];
                    n[i] = { ...n[i], script: e.target.value };
                    update(n);
                  }}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            update([
              ...experiments,
              {
                title: `实验${experiments.length + 1}：`,
                props: '',
                steps: '',
                phenomenon: '',
                script: '',
              },
            ])
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          添加实验
        </Button>
      </div>
    </ModulePanelShell>
  );
}
