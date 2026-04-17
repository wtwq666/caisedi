import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

/** 无结构化解析时的纯正文编辑 */
export function MarkdownModulePanel({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <Label htmlFor="md-module-body">正文内容</Label>
      <Textarea
        id="md-module-body"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={22}
        placeholder="在此填写本模块正文，支持分段与列表等常用格式。"
        className="min-h-[280px] text-sm leading-relaxed"
      />
      <p className="text-xs text-muted-foreground">
        提示：可直接分段书写；需要强调处可用编辑器加粗（如有）。
      </p>
    </div>
  );
}
