import type { ReactNode } from 'react';
import type { EditorKind } from '@/types/training';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Block =
  | { type: 'h4'; text: string }
  | { type: 'p'; text: string }
  | { type: 'boldLine'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; rows: string[][] };

function splitMarkdownSections(content: string): { title: string; body: string }[] {
  const trimmed = content.trim();
  if (!trimmed) return [];

  const lines = trimmed.split('\n');
  const sections: { title: string; body: string }[] = [];
  let currentTitle = '';
  let currentBody: string[] = [];

  const flush = () => {
    const bodyStr = currentBody.join('\n').trim();
    if (currentTitle || bodyStr) {
      sections.push({
        title: currentTitle || '内容',
        body: bodyStr,
      });
    }
    currentTitle = '';
    currentBody = [];
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flush();
      currentTitle = line.slice(3).trim();
    } else {
      currentBody.push(line);
    }
  }
  flush();
  return sections;
}

export function renderInline(text: string): ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function parseTableLine(
  line: string
): { kind: 'data'; cells: string[] } | { kind: 'sep' } | { kind: 'not-table' } {
  const trimmedLine = line.trim();
  if (!trimmedLine.startsWith('|') || !trimmedLine.endsWith('|')) {
    return { kind: 'not-table' };
  }
  const rawCells = trimmedLine
    .slice(1, -1)
    .split('|')
    .map((c) => c.trim());
  const isSep = rawCells.every((c) => !c || /^:?-+:?$/.test(c));
  if (isSep) return { kind: 'sep' };
  const cells = rawCells
    .map((c) => c.trim())
    .filter((c) => c.length > 0 && !/^:?-+:?$/.test(c));
  return cells.length ? { kind: 'data', cells } : { kind: 'sep' };
}

function lineToBlocks(body: string): Block[] {
  const lines = body.split('\n');
  const blocks: Block[] = [];
  let tableRows: string[][] = [];
  let inTable = false;
  let listItems: string[] = [];
  let inList = false;

  const flushTable = () => {
    if (tableRows.length > 0) {
      blocks.push({ type: 'table', rows: tableRows });
      tableRows = [];
      inTable = false;
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: 'list', items: [...listItems] });
      listItems = [];
      inList = false;
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const tableLine = parseTableLine(line);

    if (tableLine.kind === 'data') {
      flushList();
      inTable = true;
      tableRows.push(tableLine.cells);
      return;
    }
    if (tableLine.kind === 'sep') {
      return;
    }

    if (inTable) {
      flushTable();
    }

    if (trimmedLine.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'h4', text: trimmedLine.replace(/^###\s+/, '') });
      return;
    }

    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      inList = true;
      listItems.push(trimmedLine.replace(/^[-*]\s+/, ''));
      return;
    }

    if (inList && trimmedLine) {
      listItems[listItems.length - 1] += ' ' + trimmedLine;
      return;
    }

    if (inList && !trimmedLine) {
      flushList();
      return;
    }

    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.length > 4) {
      flushList();
      blocks.push({
        type: 'boldLine',
        text: trimmedLine.replace(/^\*\*|\*\*$/g, ''),
      });
      return;
    }

    if (trimmedLine) {
      flushList();
      blocks.push({ type: 'p', text: trimmedLine });
    }
  });

  flushTable();
  flushList();
  return blocks;
}

function MemoryQuote({ body }: { body: string }) {
  const lines = body.split('\n');
  const first = lines[0]?.trim() ?? '';
  let quote: string | null = null;
  let restLines = lines;

  if (first.startsWith('"') && first.endsWith('"') && first.length >= 2) {
    quote = first.slice(1, -1);
    restLines = lines.slice(1);
  } else if (first.startsWith('"') && !first.endsWith('"')) {
    quote = first.slice(1);
    restLines = lines.slice(1);
  }

  const rest = restLines.join('\n').trim();

  if (quote === null) {
    return <BodyBlocks body={body} proseClass="text-gray-700" />;
  }

  return (
    <div className="space-y-4">
      <blockquote className="border-l-4 border-brand-yellow bg-brand-yellow-soft/80 pl-4 py-3 pr-3 rounded-r-lg text-base italic text-brand-ink leading-relaxed">
        {quote}
      </blockquote>
      {rest ? <BodyBlocks body={rest} proseClass="text-gray-700" /> : null}
    </div>
  );
}

function BodyBlocks({
  body,
  proseClass,
}: {
  body: string;
  proseClass?: string;
}) {
  const blocks = lineToBlocks(body);
  const pClass =
    proseClass ??
    'text-gray-700 my-2 leading-relaxed [text-wrap:pretty]';

  return (
    <>
      {blocks.map((block, idx) => {
        const key = `b-${idx}`;
        switch (block.type) {
          case 'h4':
            return (
              <h4
                key={key}
                className="text-base font-medium text-gray-800 mt-4 mb-2 first:mt-0"
              >
                {renderInline(block.text)}
              </h4>
            );
          case 'p':
            return (
              <p key={key} className={pClass}>
                {renderInline(block.text)}
              </p>
            );
          case 'boldLine':
            return (
              <p key={key} className="font-semibold text-gray-800 my-2">
                {renderInline(`**${block.text}**`)}
              </p>
            );
          case 'list':
            return (
              <ul
                key={key}
                className="list-disc pl-5 space-y-1.5 my-3 marker:text-brand-accent"
              >
                {block.items.map((item, i) => (
                  <li key={i} className="text-gray-700 leading-relaxed">
                    {renderInline(item)}
                  </li>
                ))}
              </ul>
            );
          case 'table': {
            const header = block.rows[0];
            const dataRows = block.rows.slice(1);
            return (
              <div key={key} className="my-4 overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-muted/30">
                      {header.map((cell, i) => (
                        <TableHead
                          key={i}
                          className="whitespace-normal min-w-[96px] max-w-[min(28rem,40vw)] align-top"
                        >
                          {renderInline(cell)}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataRows.map((row, ri) => (
                      <TableRow key={ri} className={ri % 2 === 0 ? 'bg-muted/20' : ''}>
                        {row.map((cell, ci) => (
                          <TableCell
                            key={ci}
                            className="whitespace-normal align-top min-w-[96px] max-w-[min(28rem,40vw)] text-muted-foreground"
                          >
                            {renderInline(cell)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}

interface FabricModuleContentProps {
  content: string;
  editorKind?: EditorKind;
}

export default function FabricModuleContent({
  content,
  editorKind,
}: FabricModuleContentProps) {
  if (!content.trim()) {
    return <p className="text-muted-foreground">暂无内容</p>;
  }

  if (editorKind === 'markdown') {
    return (
      <div className="whitespace-pre-wrap text-brand-gray leading-relaxed text-base">
        {content}
      </div>
    );
  }

  const sections = splitMarkdownSections(content);

  if (sections.length === 0) {
    return <p className="text-muted-foreground">暂无内容</p>;
  }

  return (
    <div className="space-y-6">
      {sections.map((section, si) => {
        const isMemory = section.title.includes('一句话记忆');
        const isTech = section.title.includes('技术背景');

        return (
          <section
            key={`sec-${si}-${section.title}`}
            className="rounded-xl border border-border bg-card/80 p-4 sm:p-5 shadow-sm space-y-3"
          >
            <h3 className="text-lg font-semibold text-brand-ink tracking-tight border-b border-border/80 pb-2">
              {section.title}
            </h3>

            {isMemory ? (
              <MemoryQuote body={section.body} />
            ) : (
              <div
                className={
                  isTech
                    ? 'text-base leading-7 text-muted-foreground'
                    : undefined
                }
              >
                <BodyBlocks
                  body={section.body}
                  proseClass={
                    isTech
                      ? 'text-base leading-7 text-muted-foreground my-2 [text-wrap:pretty]'
                      : 'text-gray-700 my-2 leading-relaxed [text-wrap:pretty]'
                  }
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
