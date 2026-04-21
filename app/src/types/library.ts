export type FileKind = 'pdf' | 'docx' | 'pptx' | 'xlsx' | 'xls' | 'unknown';

export interface LibraryFileItem {
  id: string;
  name: string;
  path: string;
  url: string;
  ext: string;
  kind: FileKind;
  previewUrl?: string;
  previewKind?: 'pdf';
  sectionName: string;
  sectionSlug: string;
}

export interface LibrarySection {
  name: string;
  slug: string;
  files: LibraryFileItem[];
}
