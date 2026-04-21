import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getLibraryFileById, getLibrarySectionBySlug } from '@/data/libraryManifest';
import FilePreview from '@/components/library/FilePreview';

export default function LibraryFileViewerPage() {
  const { sectionSlug, fileId } = useParams<{ sectionSlug: string; fileId: string }>();
  const navigate = useNavigate();

  const section = sectionSlug ? getLibrarySectionBySlug(sectionSlug) : undefined;
  const decodedId = fileId ? decodeURIComponent(fileId) : '';
  const file = decodedId ? getLibraryFileById(decodedId) : undefined;

  if (!section || !file || file.sectionSlug !== section.slug) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => navigate(`/library/${section.slug}`)}
          className="text-brand-gray-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回 {section.name}
        </Button>
        <Button asChild className="bg-brand-yellow hover:bg-brand-yellow-hover text-brand-ink">
          <a href={file.url} download={file.name}>
            <Download className="w-4 h-4 mr-2" />
            下载原文件
          </a>
        </Button>
      </div>
      {file.previewUrl && (
        <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          当前使用本地高保真 PDF 预览通道（由 Office 文件离线转换）。
        </p>
      )}

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xl break-all">{file.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{file.path}</p>
            </div>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase text-muted-foreground">
              {file.kind}
            </span>
          </div>
        </CardHeader>
        <CardContent className="bg-slate-50/40 rounded-b-2xl">
          <FilePreview file={file} />
        </CardContent>
      </Card>
    </div>
  );
}
