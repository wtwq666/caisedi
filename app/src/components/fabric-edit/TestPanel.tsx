import { useMemo, useState, useEffect } from 'react';
import {
  parseTestModule,
  serializeTestModule,
  type TestModel,
  type TestQuestion,
} from '@/lib/fabricModuleMd/testModule';
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

const OPT = ['A', 'B', 'C', 'D'];

export function TestPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseTestModule(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const base: TestModel = parsed.ok
    ? parsed.model
    : { sectionTitle: '单选题', questions: [] };

  const questions: TestQuestion[] =
    base.questions.length > 0
      ? base.questions
      : [{ stem: '', options: ['', '', '', ''], explanation: '' }];

  const model: TestModel = { ...base, questions };

  const update = (m: TestModel) => onChange(serializeTestModule(m));

  const setQ = (qi: number, patch: Partial<TestQuestion>) => {
    const qs = [...model.questions];
    qs[qi] = { ...qs[qi], ...patch };
    update({ ...model, questions: qs });
  };

  const setOption = (qi: number, oi: number, v: string) => {
    const qs = [...model.questions];
    const opts = [...(qs[qi].options || [])];
    while (opts.length < 4) opts.push('');
    opts[oi] = v;
    qs[qi] = { ...qs[qi], options: opts };
    update({ ...model, questions: qs });
  };

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
        <div className="space-y-2">
          <Label>大标题</Label>
          <Input
            value={model.sectionTitle}
            onChange={(e) => update({ ...model, sectionTitle: e.target.value })}
          />
        </div>
        {model.questions.map((q, qi) => (
          <div key={qi} className="rounded-lg border p-4 space-y-3">
            <div className="flex justify-between">
              <Label>第 {qi + 1} 题</Label>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  update({
                    ...model,
                    questions: model.questions.filter((_, j) => j !== qi),
                  })
                }
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
            <Textarea
              placeholder="题干"
              value={q.stem}
              onChange={(e) => setQ(qi, { stem: e.target.value })}
              rows={2}
            />
            <div className="grid gap-2 sm:grid-cols-2">
              {OPT.map((label, oi) => (
                <div key={oi} className="space-y-1">
                  <Label className="text-xs">选项 {label}</Label>
                  <Input
                    value={q.options[oi] ?? ''}
                    onChange={(e) => setOption(qi, oi, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <Label className="text-xs">解析</Label>
              <Textarea
                value={q.explanation}
                onChange={(e) => setQ(qi, { explanation: e.target.value })}
                rows={2}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            update({
              ...model,
              questions: [
                ...model.questions,
                { stem: '', options: ['', '', '', ''], explanation: '' },
              ],
            })
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          添加题目
        </Button>
      </div>
    </ModulePanelShell>
  );
}
