import type { ComponentType } from 'react';
import type { EditorKind } from '@/types/training';
import {
  BookOpen,
  MessageSquare,
  BarChart3,
  HelpCircle,
  FlaskConical,
  Wrench,
  ClipboardCheck,
  FileText,
} from 'lucide-react';

const editorKindIcons: Record<
  EditorKind,
  ComponentType<{ className?: string }>
> = {
  productCognition: BookOpen,
  salesScript: MessageSquare,
  competitorComparison: BarChart3,
  objectionHandling: HelpCircle,
  practicalExercise: FlaskConical,
  afterSales: Wrench,
  test: ClipboardCheck,
  markdown: FileText,
};

export function getEditorKindIcon(
  kind: EditorKind,
): ComponentType<{ className?: string }> {
  return editorKindIcons[kind] ?? FileText;
}
