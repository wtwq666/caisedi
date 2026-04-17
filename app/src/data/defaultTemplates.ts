import type { TrainingTemplate } from '@/types/training';

export const DEFAULT_FABRIC_TEMPLATE_ID = 'tpl-fabric';

/** 面料培训：与历史 Fabric 模块 id 一致，便于迁移 */
export function createDefaultFabricTemplate(): TrainingTemplate {
  return {
    id: DEFAULT_FABRIC_TEMPLATE_ID,
    name: '面料知识培训',
    slug: 'fabric-training',
    description:
      '天然与混纺面料产品认知、话术与实操培训资料',
    moduleDefs: [
      {
        id: 'productCognition',
        label: '产品认知',
        editorKind: 'productCognition',
        order: 0,
        enabled: true,
      },
      {
        id: 'salesScript',
        label: '销售话术转化',
        editorKind: 'salesScript',
        order: 1,
        enabled: true,
      },
      {
        id: 'competitorComparison',
        label: '竞品对比',
        editorKind: 'competitorComparison',
        order: 2,
        enabled: true,
      },
      {
        id: 'objectionHandling',
        label: '异议处理Q&A',
        editorKind: 'objectionHandling',
        order: 3,
        enabled: true,
      },
      {
        id: 'practicalExercise',
        label: '实操演练',
        editorKind: 'practicalExercise',
        order: 4,
        enabled: true,
      },
      {
        id: 'afterSales',
        label: '售后知识',
        editorKind: 'afterSales',
        order: 5,
        enabled: true,
      },
      {
        id: 'test',
        label: '课后测试',
        editorKind: 'test',
        order: 6,
        enabled: true,
      },
    ],
  };
}

function singleMarkdownModule(
  id: string,
  label: string,
): TrainingTemplate['moduleDefs'] {
  return [
    {
      id,
      label,
      editorKind: 'markdown',
      order: 0,
      enabled: true,
    },
  ];
}

/** 其余首页入口：单正文模块，可后续在后台增删子模块 */
export const stubTrainingTemplates: TrainingTemplate[] = [
  {
    id: 'tpl-store-manual',
    name: '店铺运营手册',
    slug: 'store-manual',
    description: '门店日常运营规范与流程说明',
    moduleDefs: singleMarkdownModule('content', '主要内容'),
  },
  {
    id: 'tpl-sales',
    name: '销售能力培训',
    slug: 'sales-training',
    description: '销售技巧与客户服务能力提升',
    moduleDefs: singleMarkdownModule('content', '主要内容'),
  },
  {
    id: 'tpl-manager',
    name: '店长管理手册',
    slug: 'manager-manual',
    description: '店长团队管理与目标达成指引',
    moduleDefs: singleMarkdownModule('content', '主要内容'),
  },
  {
    id: 'tpl-mentor',
    name: '带教手册',
    slug: 'mentor-manual',
    description: '新人带教标准与辅导要点',
    moduleDefs: singleMarkdownModule('content', '主要内容'),
  },
  {
    id: 'tpl-store-image',
    name: '店铺形象',
    slug: 'store-image',
    description: '陈列规范与品牌形象标准',
    moduleDefs: singleMarkdownModule('content', '主要内容'),
  },
];

export const defaultTrainingTemplates: TrainingTemplate[] = [
  createDefaultFabricTemplate(),
  ...stubTrainingTemplates,
];
