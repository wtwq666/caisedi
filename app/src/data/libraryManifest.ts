import type { FileKind, LibraryFileItem, LibrarySection } from '@/types/library';
import { LIBRARY_PREVIEW_PDF_MAP } from './libraryPreviewMap.generated';

const RAW_FILES = import.meta.glob('../../2026/**/*.{pdf,docx,pptx,xlsx,xls}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const EXCLUDED_SECTIONS = new Set(['品牌简介']);
const NAV_EXCLUDED_SECTIONS = new Set(['品牌简介', '面料知识']);

function toSectionSlug(name: string): string {
  return name;
}

function getKind(ext: string): FileKind {
  const normalized = ext.toLowerCase();
  if (normalized === 'pdf') return 'pdf';
  if (normalized === 'docx') return 'docx';
  if (normalized === 'pptx') return 'pptx';
  if (normalized === 'xlsx') return 'xlsx';
  if (normalized === 'xls') return 'xls';
  return 'unknown';
}

function parseFilePath(filePath: string, url: string): LibraryFileItem | null {
  const normalized = filePath.replace(/\\/g, '/');
  const match = normalized.match(/\/2026\/([^/]+)\/(.+)$/);
  if (!match) return null;

  const sectionName = match[1];
  if (EXCLUDED_SECTIONS.has(sectionName)) return null;

  const fileName = match[2];
  const ext = fileName.includes('.') ? fileName.split('.').pop() ?? '' : '';
  const sectionSlug = toSectionSlug(sectionName);
  const id = `${sectionName}/${fileName}`;
  const sourcePath = `2026/${sectionName}/${fileName}`;
  const previewUrl = LIBRARY_PREVIEW_PDF_MAP[sourcePath];

  return {
    id,
    name: fileName,
    path: sourcePath,
    url,
    ext,
    kind: getKind(ext),
    previewUrl,
    previewKind: previewUrl ? 'pdf' : undefined,
    sectionName,
    sectionSlug,
  };
}

function buildSections(files: LibraryFileItem[]): LibrarySection[] {
  const bySection = new Map<string, LibrarySection>();
  for (const file of files) {
    const key = file.sectionName;
    const current = bySection.get(key);
    if (current) {
      current.files.push(file);
      continue;
    }
    bySection.set(key, {
      name: file.sectionName,
      slug: file.sectionSlug,
      files: [file],
    });
  }

  return Array.from(bySection.values())
    .map((section) => ({
      ...section,
      files: [...section.files].sort((a, b) => a.name.localeCompare(b.name, 'zh-CN')),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

const allFiles = Object.entries(RAW_FILES)
  .map(([filePath, url]) => parseFilePath(filePath, url))
  .filter((item): item is LibraryFileItem => item !== null)
  .sort((a, b) => a.path.localeCompare(b.path, 'zh-CN'));

export const allLibrarySections = buildSections(allFiles);

export const navLibrarySections = allLibrarySections.filter(
  (section) => !NAV_EXCLUDED_SECTIONS.has(section.name),
);

export const fabricKnowledgeFiles = allFiles.filter(
  (file) => file.sectionName === '面料知识',
);

export function getLibrarySectionBySlug(slug: string): LibrarySection | undefined {
  return allLibrarySections.find((section) => section.slug === slug);
}

export function getLibraryFileById(fileId: string): LibraryFileItem | undefined {
  return allFiles.find((file) => file.id === fileId);
}
