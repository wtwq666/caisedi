/** 与结构化表单编辑器一一对应；markdown 为纯文本兜底 */
export type EditorKind =
  | 'productCognition'
  | 'salesScript'
  | 'competitorComparison'
  | 'objectionHandling'
  | 'practicalExercise'
  | 'afterSales'
  | 'test'
  | 'markdown';

export interface TemplateModuleDef {
  id: string;
  label: string;
  editorKind: EditorKind;
  order: number;
  enabled: boolean;
}

export interface TrainingTemplate {
  id: string;
  name: string;
  slug: string;
  description: string;
  moduleDefs: TemplateModuleDef[];
}

export interface TrainingItem {
  id: string;
  templateId: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  order: number;
  modules: Record<string, string>;
}
