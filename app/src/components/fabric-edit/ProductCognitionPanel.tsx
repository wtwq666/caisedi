import { useMemo, useState, useEffect } from 'react';
import {
  parseProductCognition,
  serializeProductCognition,
  type ProductCognitionModel,
} from '@/lib/fabricModuleMd/productCognition';
import { ModulePanelShell } from './ModulePanelShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  enableAdvancedRaw?: boolean;
}

const DEFAULT_COLS = 4;

export function ProductCognitionPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseProductCognition(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);

  useEffect(() => {
    setRawMode(!parsed.ok);
  }, [parsed.ok, value]);

  const model: ProductCognitionModel = parsed.ok
    ? parsed.model
    : {
        oneLineMemory: '',
        technicalBackground: '',
        traitsRows: [],
        techSupplementBullets: [],
      };

  const update = (next: ProductCognitionModel) => {
    onChange(serializeProductCognition(next));
  };

  const traitsRows =
    model.traitsRows.length > 0
      ? model.traitsRows
      : [['特性维度', '具体表现', '技术参数/原理', '客户价值']];

  const colCount = Math.max(DEFAULT_COLS, ...traitsRows.map((r) => r.length));

  const setCell = (ri: number, ci: number, v: string) => {
    const rows = traitsRows.map((r) => [...r]);
    while (rows[ri].length < colCount) rows[ri].push('');
    rows[ri][ci] = v;
    update({ ...model, traitsRows: rows });
  };

  const addRow = () => {
    update({
      ...model,
      traitsRows: [...traitsRows, Array.from({ length: colCount }, () => '')],
    });
  };

  const removeRow = (ri: number) => {
    if (traitsRows.length <= 1) return;
    update({
      ...model,
      traitsRows: traitsRows.filter((_, i) => i !== ri),
    });
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
          <Label>一句话记忆（引号内文案）</Label>
          <Input
            value={model.oneLineMemory}
            onChange={(e) => update({ ...model, oneLineMemory: e.target.value })}
            placeholder="天然亲肤的呼吸面料…"
          />
        </div>
        <div className="space-y-2">
          <Label>技术背景</Label>
          <Textarea
            value={model.technicalBackground}
            onChange={(e) => update({ ...model, technicalBackground: e.target.value })}
            rows={6}
            className="resize-y"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>五大核心特性表</Label>
            <Button type="button" variant="outline" size="sm" onClick={addRow}>
              <Plus className="w-4 h-4 mr-1" />
              添加行
            </Button>
          </div>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Array.from({ length: colCount }, (_, ci) => (
                    <TableHead key={ci} className="min-w-[120px] whitespace-normal">
                      <Input
                        className="h-8 font-medium"
                        value={traitsRows[0]?.[ci] ?? ''}
                        onChange={(e) => setCell(0, ci, e.target.value)}
                        placeholder={ci === 0 ? '表头' : ''}
                      />
                    </TableHead>
                  ))}
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {traitsRows.slice(1).map((row, ri) => (
                  <TableRow key={ri}>
                    {Array.from({ length: colCount }, (_, ci) => (
                      <TableCell key={ci} className="p-1">
                        <Input
                          className="h-9"
                          value={row[ci] ?? ''}
                          onChange={(e) => setCell(ri + 1, ci, e.target.value)}
                        />
                      </TableCell>
                    ))}
                    <TableCell className="w-10 p-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeRow(ri + 1)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="space-y-2">
          <Label>技术补充（每条一行，保存为列表项）</Label>
          <Textarea
            value={model.techSupplementBullets.join('\n')}
            onChange={(e) =>
              update({
                ...model,
                techSupplementBullets: e.target.value
                  .split('\n')
                  .map((l) => l.trim())
                  .filter(Boolean),
              })
            }
            rows={5}
            placeholder="每行一条，例如：棉纤维长度：25-45mm"
          />
        </div>
      </div>
    </ModulePanelShell>
  );
}
