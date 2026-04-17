import { useMemo, useState, useEffect } from 'react';
import {
  parseCompetitorComparison,
  serializeCompetitorComparison,
  type CompetitorModel,
} from '@/lib/fabricModuleMd/competitorComparison';
import { ModulePanelShell } from './ModulePanelShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  enableAdvancedRaw?: boolean;
}

export function CompetitorPanel({
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const parsed = useMemo(() => parseCompetitorComparison(value), [value]);
  const [rawMode, setRawMode] = useState(!parsed.ok);
  useEffect(() => setRawMode(!parsed.ok), [parsed.ok, value]);

  const model: CompetitorModel = parsed.ok
    ? parsed.model
    : { sectionTitle: '竞品对比表', tableRows: [['对比维度', '', '', '']] };

  const update = (m: CompetitorModel) => onChange(serializeCompetitorComparison(m));

  const rows = model.tableRows.length > 0 ? model.tableRows : [['维度', 'A', 'B', 'C']];
  const colCount = Math.max(4, ...rows.map((r) => r.length));

  const setCell = (ri: number, ci: number, v: string) => {
    const next = rows.map((r) => [...r]);
    while (next[ri].length < colCount) next[ri].push('');
    next[ri][ci] = v;
    update({ ...model, tableRows: next });
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
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>小节标题</Label>
          <Input
            value={model.sectionTitle}
            onChange={(e) => update({ ...model, sectionTitle: e.target.value })}
          />
        </div>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: colCount }, (_, ci) => (
                  <TableHead key={ci} className="min-w-[100px] p-1">
                    <Input
                      className="h-8"
                      value={rows[0]?.[ci] ?? ''}
                      onChange={(e) => setCell(0, ci, e.target.value)}
                    />
                  </TableHead>
                ))}
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.slice(1).map((row, ri) => (
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
                  <TableCell className="w-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        update({
                          ...model,
                          tableRows: rows.filter((_, i) => i !== ri + 1),
                        })
                      }
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            update({
              ...model,
              tableRows: [...rows, Array.from({ length: colCount }, () => '')],
            })
          }
        >
          <Plus className="w-4 h-4 mr-1" />
          添加行
        </Button>
      </div>
    </ModulePanelShell>
  );
}
