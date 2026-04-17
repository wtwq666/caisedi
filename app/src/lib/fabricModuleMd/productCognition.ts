import { splitByH2Sections } from './common';
import type { ParseResult } from './common';
import { parseMarkdownTableBlock, serializeMarkdownTable } from './tableMd';

export interface ProductCognitionModel {
  oneLineMemory: string;
  technicalBackground: string;
  traitsRows: string[][];
  techSupplementBullets: string[];
}

export function parseProductCognition(md: string): ParseResult<ProductCognitionModel> {
  const t = md.trim();
  if (!t) {
    return { ok: true, model: { oneLineMemory: '', technicalBackground: '', traitsRows: [], techSupplementBullets: [] } };
  }

  const sections = splitByH2Sections(t);
  const memBody =
    getSectionBody(sections, (title) => title.includes('一句话记忆')) ?? '';
  let oneLineMemory = '';
  const firstLine = memBody.split('\n').find((l) => l.trim())?.trim() ?? '';
  if (firstLine.startsWith('"') && firstLine.endsWith('"')) {
    oneLineMemory = firstLine.slice(1, -1);
  } else if (firstLine.startsWith('"')) {
    oneLineMemory = firstLine.slice(1);
  } else {
    oneLineMemory = firstLine.replace(/^["']|["']$/g, '');
  }

  const techBody =
    getSectionBody(sections, (title) => title.includes('技术背景')) ?? '';

  const traitsSection =
    getSectionBody(sections, (title) => title.includes('五大核心特性')) ?? '';
  let traitsRows = parseMarkdownTableBlock(traitsSection);
  if (traitsRows.length === 0 && traitsSection.includes('|')) {
    traitsRows = parseMarkdownTableBlock(t);
  }

  const supBody =
    getSectionBody(sections, (title) => title.includes('技术补充')) ?? '';
  const techSupplementBullets: string[] = [];
  for (const line of supBody.split('\n')) {
    const m = line.match(/^\s*[-*]\s+(.+)$/);
    if (m) techSupplementBullets.push(m[1].trim());
  }

  const hasTable = traitsRows.length > 0;
  const ok = !t || hasTable;

  if (!ok) {
    return { ok: false, model: null };
  }

  return {
    ok: true,
    model: {
      oneLineMemory,
      technicalBackground: techBody.trim(),
      traitsRows,
      techSupplementBullets,
    },
  };
}

function getSectionBody(
  sections: { title: string; body: string }[],
  match: (title: string) => boolean
): string | undefined {
  const s = sections.find((x) => match(x.title));
  return s?.body;
}

export function serializeProductCognition(m: ProductCognitionModel): string {
  const parts: string[] = [];

  parts.push('## 一句话记忆');
  parts.push(`"${m.oneLineMemory.replace(/^"|"$/g, '')}"`);
  parts.push('');
  parts.push('## 技术背景');
  parts.push(m.technicalBackground.trim());
  parts.push('');
  parts.push('## 五大核心特性表');
  parts.push('');
  if (m.traitsRows.length > 0) {
    parts.push(serializeMarkdownTable(m.traitsRows));
  }
  parts.push('');

  if (m.techSupplementBullets.length > 0) {
    parts.push('## 技术补充');
    for (const b of m.techSupplementBullets) {
      parts.push(`- ${b}`);
    }
  }

  return parts.join('\n').trim();
}
