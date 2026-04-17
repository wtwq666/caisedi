import type { EditorKind } from '@/types/training';
import { ProductCognitionPanel } from './ProductCognitionPanel';
import { SalesScriptPanel } from './SalesScriptPanel';
import { CompetitorPanel } from './CompetitorPanel';
import { ObjectionPanel } from './ObjectionPanel';
import { PracticalExercisePanel } from './PracticalExercisePanel';
import { AfterSalesPanel } from './AfterSalesPanel';
import { TestPanel } from './TestPanel';
import { MarkdownModulePanel } from './MarkdownModulePanel';

interface Props {
  editorKind: EditorKind;
  value: string;
  onChange: (v: string) => void;
  enableAdvancedRaw?: boolean;
}

export function FabricModuleEditor({
  editorKind,
  value,
  onChange,
  enableAdvancedRaw = true,
}: Props) {
  const shell = { enableAdvancedRaw };

  switch (editorKind) {
    case 'productCognition':
      return (
        <ProductCognitionPanel
          value={value}
          onChange={onChange}
          {...shell}
        />
      );
    case 'salesScript':
      return (
        <SalesScriptPanel value={value} onChange={onChange} {...shell} />
      );
    case 'competitorComparison':
      return (
        <CompetitorPanel value={value} onChange={onChange} {...shell} />
      );
    case 'objectionHandling':
      return (
        <ObjectionPanel value={value} onChange={onChange} {...shell} />
      );
    case 'practicalExercise':
      return (
        <PracticalExercisePanel
          value={value}
          onChange={onChange}
          {...shell}
        />
      );
    case 'afterSales':
      return (
        <AfterSalesPanel value={value} onChange={onChange} {...shell} />
      );
    case 'test':
      return <TestPanel value={value} onChange={onChange} {...shell} />;
    case 'markdown':
      return <MarkdownModulePanel value={value} onChange={onChange} />;
    default:
      return <MarkdownModulePanel value={value} onChange={onChange} />;
  }
}
