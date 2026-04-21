import { useEffect, useMemo, useState } from 'react';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { Loader2 } from 'lucide-react';
import type { LibraryFileItem } from '@/types/library';

function LoadingState({ text }: { text: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{text}</span>
    </div>
  );
}

function ErrorState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
      {text}
    </div>
  );
}

function ReaderShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border bg-slate-100 overflow-hidden">
      <div className="h-10 px-3 flex items-center justify-between border-b bg-white/90">
        <div className="text-xs font-medium text-slate-600">{label}</div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
          <span className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>
      <div className="max-h-[78vh] overflow-auto p-6 md:p-8">{children}</div>
    </div>
  );
}

function PdfPreview({ file }: { file: LibraryFileItem }) {
  const src = file.previewUrl || file.url;
  return (
    <ReaderShell label="PDF 预览">
      <iframe
        src={src}
        title={file.name}
        className="w-full min-h-[72vh] rounded-lg border bg-white"
      />
    </ReaderShell>
  );
}

function DocxPreview({ file }: { file: LibraryFileItem }) {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(file.url);
        const arr = await res.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: arr });
        const generatedHtml = result.value || '<p>文档无可预览内容</p>';
        if (!cancelled) {
          setHtml(generatedHtml);
        }
      } catch {
        if (!cancelled) setError('DOCX 在线预览失败，请下载查看原文件。');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file.url]);

  if (loading) return <LoadingState text="正在解析 DOCX..." />;
  if (error) return <ErrorState text={error} />;

  return (
    <ReaderShell label="DOCX 富文本预览">
      <div className="flex justify-center">
        <article
          className="prose prose-sm sm:prose-base max-w-none w-full md:w-[820px] min-h-[980px] rounded-md border bg-white p-8 md:p-12 shadow-sm leading-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </ReaderShell>
  );
}

type ExcelPreviewData = {
  sheetNames: string[];
  sheetRows: Record<string, string[][]>;
};

function ExcelPreview({ file }: { file: LibraryFileItem }) {
  const [data, setData] = useState<ExcelPreviewData | null>(null);
  const [activeSheet, setActiveSheet] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(file.url);
        const arr = await res.arrayBuffer();
        const wb = XLSX.read(arr, { type: 'array' });
        const sheetRows: Record<string, string[][]> = {};
        for (const name of wb.SheetNames) {
          const ws = wb.Sheets[name];
          sheetRows[name] = XLSX.utils.sheet_to_json<string[]>(ws, {
            header: 1,
            defval: '',
            raw: false,
          }) as string[][];
        }
        if (!cancelled) {
          setData({ sheetNames: wb.SheetNames, sheetRows });
          setActiveSheet(wb.SheetNames[0] ?? '');
        }
      } catch {
        if (!cancelled) setError('Excel 在线预览失败，请下载查看原文件。');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file.url]);

  const rows = useMemo(() => {
    if (!data || !activeSheet) return [];
    return data.sheetRows[activeSheet] ?? [];
  }, [data, activeSheet]);

  if (loading) return <LoadingState text="正在解析 Excel..." />;
  if (error) return <ErrorState text={error} />;
  if (!data) return <ErrorState text="未读取到工作表内容。" />;

  return (
    <ReaderShell label="XLSX 表格预览">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {data.sheetNames.map((sheet) => (
            <button
              key={sheet}
              type="button"
              onClick={() => setActiveSheet(sheet)}
              className={`rounded-full border px-3.5 py-1.5 text-xs ${
                sheet === activeSheet
                  ? 'bg-brand-yellow-soft text-brand-accent border-brand-yellow-border'
                  : 'bg-white text-muted-foreground'
              }`}
            >
              {sheet}
            </button>
          ))}
        </div>
        <div className="overflow-auto rounded-md border bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr
                  key={`${activeSheet}-${rowIndex}`}
                  className={`border-b last:border-b-0 ${rowIndex === 0 ? 'bg-slate-100 sticky top-0 z-10' : ''}`}
                >
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-2.5 align-top whitespace-pre-wrap ${
                        rowIndex === 0 ? 'font-semibold text-slate-800' : 'text-slate-700'
                      }`}
                    >
                      {cell || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ReaderShell>
  );
}

function decodeXmlText(raw: string): string {
  return raw
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function PptxPreview({ file }: { file: LibraryFileItem }) {
  const [slides, setSlides] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(file.url);
        const arr = await res.arrayBuffer();
        const zip = await JSZip.loadAsync(arr);
        const names = Object.keys(zip.files)
          .filter((name) => /^ppt\/slides\/slide\d+\.xml$/i.test(name))
          .sort((a, b) => a.localeCompare(b, 'en'));
        const parsed: string[] = [];
        for (const slideName of names) {
          const xml = await zip.files[slideName].async('text');
          const matches = xml.matchAll(/<a:t[^>]*>(.*?)<\/a:t>/g);
          const lines = Array.from(matches, (m) => decodeXmlText(m[1] ?? '').trim()).filter(Boolean);
          parsed.push(lines.join('\n'));
        }
        if (!cancelled) setSlides(parsed);
      } catch {
        if (!cancelled) setError('PPTX 在线解析失败，请下载查看原文件。');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [file.url]);

  if (loading) return <LoadingState text="正在解析 PPTX..." />;
  if (error) return <ErrorState text={error} />;
  if (slides.length === 0) return <ErrorState text="未提取到幻灯片文本，可下载原文件查看完整内容。" />;

  return (
    <ReaderShell label="PPTX 富文本预览">
      <div className="space-y-5 flex flex-col items-center">
        {slides.map((text, index) => (
          <section
            key={index}
            className="w-full md:w-[960px] min-h-[540px] rounded-md border bg-white shadow-sm overflow-hidden"
          >
            <div className="px-4 py-2 bg-slate-100 border-b text-xs font-semibold text-slate-600">
              第 {index + 1} 页
            </div>
            <pre className="p-8 text-[15px] whitespace-pre-wrap font-sans leading-8 text-slate-700">
              {text || '（此页无文本）'}
            </pre>
          </section>
        ))}
      </div>
    </ReaderShell>
  );
}

export default function FilePreview({ file }: { file: LibraryFileItem }) {
  if (file.previewKind === 'pdf' && file.previewUrl) {
    return <PdfPreview file={file} />;
  }
  if (file.kind === 'pdf') return <PdfPreview file={file} />;
  if (file.kind === 'docx') return <DocxPreview file={file} />;
  if (file.kind === 'xlsx' || file.kind === 'xls') return <ExcelPreview file={file} />;
  if (file.kind === 'pptx') return <PptxPreview file={file} />;
  return <ErrorState text="该文件类型暂不支持在线预览，请下载查看。" />;
}
