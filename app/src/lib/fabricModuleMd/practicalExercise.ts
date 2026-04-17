import { splitByH2Sections } from './common';
import type { ParseResult } from './common';

export interface PracticalExperiment {
  title: string;
  props: string;
  steps: string;
  phenomenon: string;
  script: string;
}

export function parsePracticalExercise(md: string): ParseResult<PracticalExperiment[]> {
  const t = md.trim();
  if (!t) return { ok: true, model: [] };

  const sections = splitByH2Sections(t);
  const experiments: PracticalExperiment[] = [];

  for (const sec of sections) {
    if (!sec.title.includes('实验')) continue;
    const props = extractField(sec.body, '道具');
    const steps = extractField(sec.body, '步骤');
    const phenomenon = extractField(sec.body, '现象');
    const script = extractField(sec.body, '话术');
    experiments.push({
      title: sec.title,
      props,
      steps,
      phenomenon,
      script,
    });
  }

  if (experiments.length === 0) return { ok: false, model: null };
  return { ok: true, model: experiments };
}

function extractField(body: string, label: string): string {
  const re = new RegExp(
    `\\*\\*${label}[：:]\\*\\*\\s*([\\s\\S]*?)(?=\\*\\*[^*]+[：:]\\*\\*|##\\s|$)`,
    'm'
  );
  const m = body.match(re);
  return m ? m[1].trim() : '';
}

export function serializePracticalExercise(exps: PracticalExperiment[]): string {
  const parts: string[] = [];
  for (const e of exps) {
    const title = e.title.replace(/^##\s*/, '').trim();
    parts.push(`## ${title}`);
    parts.push('');
    parts.push(`**道具**：${e.props}`);
    parts.push('');
    parts.push(`**步骤**：`);
    parts.push(e.steps);
    parts.push('');
    parts.push(`**现象**：${e.phenomenon}`);
    parts.push('');
    parts.push(`**话术**：${e.script}`);
    parts.push('');
  }
  return parts.join('\n').trim();
}
