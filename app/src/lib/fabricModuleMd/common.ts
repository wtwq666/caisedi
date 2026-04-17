/** 按行首 ## 分节（不含 ## 前缀） */
export function splitByH2Sections(md: string): { title: string; body: string }[] {
  const trimmed = md.trim();
  if (!trimmed) return [];

  const lines = trimmed.split('\n');
  const sections: { title: string; body: string }[] = [];
  let curTitle = '';
  let curBody: string[] = [];

  const flush = () => {
    const body = curBody.join('\n').trim();
    if (curTitle || body) {
      sections.push({ title: curTitle || '内容', body });
    }
    curTitle = '';
    curBody = [];
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush();
      curTitle = line.slice(3).trim();
    } else {
      curBody.push(line);
    }
  }
  flush();
  return sections;
}

export function getSection(
  sections: { title: string; body: string }[],
  predicate: (t: string) => boolean
): string | undefined {
  const s = sections.find((x) => predicate(x.title));
  return s?.body;
}

export type ParseResult<T> =
  | { ok: true; model: T }
  | { ok: false; model: null };
