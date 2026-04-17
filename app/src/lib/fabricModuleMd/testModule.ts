import { splitByH2Sections } from './common';
import type { ParseResult } from './common';

export interface TestQuestion {
  stem: string;
  options: string[];
  explanation: string;
}

export interface TestModel {
  sectionTitle: string;
  questions: TestQuestion[];
}

export function parseTestModule(md: string): ParseResult<TestModel> {
  const t = md.trim();
  if (!t) {
    return { ok: true, model: { sectionTitle: '单选题', questions: [] } };
  }

  const sections = splitByH2Sections(t);
  const main = sections.find((s) => s.title.includes('单选') || s.title.includes('测试')) ?? sections[0];
  if (!main) return { ok: false, model: null };

  const body = main.body.trim();
  const chunks = body.split(/\n(?=\s*\d+\.\s)/).map((c) => c.trim()).filter(Boolean);
  const questions: TestQuestion[] = [];

  for (const chunk of chunks) {
    if (!/^\d+\./.test(chunk)) continue;
    const lines = chunk.split('\n');
    const first = lines[0] ?? '';
    const stem = first.replace(/^\d+\.\s*/, '').trim();

    const options: string[] = [];
    for (const line of lines.slice(1)) {
      const m = line.match(/^\s*[-*]\s*([A-Da-d])[\.、]\s*(.+)$/);
      if (m) options.push(m[2].trim());
    }

    let explanation = '';
    const exIdx = chunk.indexOf('**解析**');
    if (exIdx >= 0) {
      const rest = chunk.slice(exIdx);
      const em = rest.match(/\*\*解析\*\*[：:]\s*([\s\S]*)$/m);
      if (em) explanation = em[1].trim();
    }

    if (stem || options.length > 0) {
      questions.push({ stem, options, explanation });
    }
  }

  if (questions.length === 0) {
    return { ok: false, model: null };
  }

  return {
    ok: true,
    model: { sectionTitle: main.title || '单选题', questions },
  };
}

export function serializeTestModule(m: TestModel): string {
  const parts: string[] = [];
  parts.push(`## ${m.sectionTitle || '单选题'}`);
  parts.push('');

  const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
  m.questions.forEach((q, qi) => {
    parts.push(`${qi + 1}. ${q.stem}`);
    parts.push('');
    q.options.forEach((op, i) => {
      parts.push(`   - ${labels[i] ?? String(i)}. ${op}`);
    });
    parts.push('');
    if (q.explanation) {
      parts.push(`   **解析**：${q.explanation}`);
      parts.push('');
    }
  });

  return parts.join('\n').trim();
}
