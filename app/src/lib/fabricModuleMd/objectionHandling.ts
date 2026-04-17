import { splitByH2Sections } from './common';
import type { ParseResult } from './common';

export interface ObjectionItem {
  title: string;
  answer: string;
}

export function parseObjectionHandling(md: string): ParseResult<ObjectionItem[]> {
  const t = md.trim();
  if (!t) return { ok: true, model: [] };

  const sections = splitByH2Sections(t);
  const items: ObjectionItem[] = [];

  for (const sec of sections) {
    const body = sec.body.trim();
    if (!body) continue;
    const am = body.match(/\*\*A[：:]\*\*\s*([\s\S]*)/);
    const answer = am ? am[1].trim() : body;
    items.push({ title: sec.title, answer });
  }

  if (items.length === 0) return { ok: false, model: null };
  return { ok: true, model: items };
}

export function serializeObjectionHandling(items: ObjectionItem[]): string {
  const parts: string[] = [];
  for (const it of items) {
    const title = it.title.replace(/^##\s*/, '').trim();
    parts.push(`## ${title}`);
    parts.push('');
    parts.push(`**A：** ${it.answer.trim()}`);
    parts.push('');
  }
  return parts.join('\n').trim();
}
