/** 从一段文本中提取 | 表格行（跳过分隔行） */
export function parseMarkdownTableBlock(text: string): string[][] {
  const lines = text.split('\n');
  const rows: string[][] = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('|') || !t.endsWith('|')) continue;
    const raw = t
      .slice(1, -1)
      .split('|')
      .map((c) => c.trim());
    if (raw.every((c) => !c || /^:?-+:?$/.test(c))) continue;
    rows.push(raw);
  }
  return rows;
}

export function serializeMarkdownTable(rows: string[][]): string {
  if (rows.length === 0) return '';
  const colCount = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => {
    const copy = [...r];
    while (copy.length < colCount) copy.push('');
    return copy;
  };
  const lines = rows.map((r) => {
    const cells = pad(r);
    return `| ${cells.join(' | ')} |`;
  });
  if (rows.length > 1) {
    const sep = Array.from({ length: colCount }, () => '---');
    lines.splice(1, 0, `| ${sep.join(' | ')} |`);
  }
  return lines.join('\n');
}
