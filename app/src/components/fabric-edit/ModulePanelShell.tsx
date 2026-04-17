import { useId } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface ModulePanelShellProps {
  parseOk: boolean;
  value: string;
  onChange: (v: string) => void;
  rawMode: boolean;
  onRawModeChange: (raw: boolean) => void;
  /** 是否显示「高级选项 / 全文编辑」入口（编辑页可为管理员开启） */
  enableAdvancedRaw?: boolean;
  children: React.ReactNode;
}

export function ModulePanelShell({
  parseOk,
  value,
  onChange,
  rawMode,
  onRawModeChange,
  enableAdvancedRaw = true,
  children,
}: ModulePanelShellProps) {
  const id = useId();

  return (
    <div className="space-y-4">
      {parseOk && enableAdvancedRaw && (
        <Collapsible className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2">
          <CollapsibleTrigger className="flex w-full items-center gap-2 text-sm text-muted-foreground hover:text-foreground [&[data-state=open]>svg]:rotate-180">
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
            <span>高级选项（全文编辑，一般无需展开）</span>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id={`raw-${id}`}
                checked={rawMode}
                onCheckedChange={(c) => onRawModeChange(c === true)}
              />
              <Label
                htmlFor={`raw-${id}`}
                className="text-sm font-normal cursor-pointer leading-snug"
              >
                改用全文编辑模式（适合需要批量粘贴或技术同事排查时使用；关闭后仍可使用上方表单）
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {!parseOk && (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          当前内容与表单结构不一致，请在下方直接编辑全文；保存后仍可正常浏览。
        </p>
      )}

      {rawMode || !parseOk ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={22}
          className="font-mono text-sm"
        />
      ) : (
        children
      )}
    </div>
  );
}
