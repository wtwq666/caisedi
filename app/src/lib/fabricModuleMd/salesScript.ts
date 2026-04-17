import { splitByH2Sections } from './common';
import type { ParseResult } from './common';

export interface SalesScene {
  title: string;
  wrong: string;
  right: string;
}

export function parseSalesScript(md: string): ParseResult<SalesScene[]> {
  const t = md.trim();
  if (!t) return { ok: true, model: [] };

  const sections = splitByH2Sections(t);
  const scenes: SalesScene[] = [];

  for (const sec of sections) {
    if (!sec.title.includes('场景')) continue;
    const { wrong, right } = extractWrongRight(sec.body);
    scenes.push({
      title: sec.title,
      wrong,
      right,
    });
  }

  if (scenes.length === 0) {
    return { ok: false, model: null };
  }
  return { ok: true, model: scenes };
}

function extractWrongRight(body: string): { wrong: string; right: string } {
  const wrongM = body.match(
    /\*\*错误示范[：:]\*\*\s*([\s\S]*?)(?=\*\*正确话术[：:]\*\*|$)/
  );
  const rightM = body.match(/\*\*正确话术[：:]\*\*\s*([\s\S]*)$/);
  const wrong = wrongM ? stripQuotes(wrongM[1].trim()) : '';
  const right = rightM ? stripQuotes(rightM[1].trim()) : '';
  return { wrong, right };
}

function stripQuotes(s: string): string {
  return s.replace(/^["'\s]+|["'\s]+$/g, '').trim();
}

export function serializeSalesScript(scenes: SalesScene[]): string {
  const parts: string[] = [];
  for (const s of scenes) {
    const title = s.title.replace(/^##\s*/, '').trim();
    parts.push(`## ${title}`);
    parts.push('');
    parts.push(`**错误示范：** "${s.wrong}"`);
    parts.push('');
    parts.push(`**正确话术：** "${s.right}"`);
    parts.push('');
  }
  return parts.join('\n').trim();
}
