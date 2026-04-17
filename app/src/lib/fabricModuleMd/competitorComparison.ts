import { splitByH2Sections } from './common';
import type { ParseResult } from './common';
import { parseMarkdownTableBlock, serializeMarkdownTable } from './tableMd';

export interface CompetitorModel {
  sectionTitle: string;
  tableRows: string[][];
}

export function parseCompetitorComparison(md: string): ParseResult<CompetitorModel> {
  const t = md.trim();
  if (!t) {
    return { ok: true, model: { sectionTitle: '竞品对比表', tableRows: [] } };
  }

  const sections = splitByH2Sections(t);
  const comp = sections.find((s) => s.title.includes('竞品')) ?? sections[0];
  if (!comp) return { ok: false, model: null };

  let tableRows = parseMarkdownTableBlock(comp.body);
  if (tableRows.length === 0) {
    tableRows = parseMarkdownTableBlock(t);
  }

  if (tableRows.length === 0) {
    return { ok: false, model: null };
  }

  return {
    ok: true,
    model: { sectionTitle: comp.title || '竞品对比表', tableRows },
  };
}

export function serializeCompetitorComparison(m: CompetitorModel): string {
  const title = m.sectionTitle || '竞品对比表';
  const parts = [`## ${title}`, ''];
  if (m.tableRows.length > 0) {
    parts.push(serializeMarkdownTable(m.tableRows));
  }
  return parts.join('\n').trim();
}
