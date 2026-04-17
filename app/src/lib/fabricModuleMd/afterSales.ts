import { splitByH2Sections } from './common';
import type { ParseResult } from './common';

export interface AfterSalesSection {
  title: string;
  bullets: string[];
}

export function parseAfterSales(md: string): ParseResult<AfterSalesSection[]> {
  const t = md.trim();
  if (!t) return { ok: true, model: [] };

  const sections = splitByH2Sections(t);
  const out: AfterSalesSection[] = [];

  for (const sec of sections) {
    const bullets: string[] = [];
    for (const line of sec.body.split('\n')) {
      const m = line.match(/^\s*[-*]\s+(.+)$/);
      if (m) bullets.push(m[1].trim());
    }
    out.push({ title: sec.title, bullets });
  }

  if (out.length === 0) return { ok: false, model: null };
  return { ok: true, model: out };
}

export function serializeAfterSales(sections: AfterSalesSection[]): string {
  const parts: string[] = [];
  for (const sec of sections) {
    const title = sec.title.replace(/^##\s*/, '').trim();
    parts.push(`## ${title}`);
    parts.push('');
    for (const b of sec.bullets) {
      parts.push(`- ${b}`);
    }
    parts.push('');
  }
  return parts.join('\n').trim();
}
