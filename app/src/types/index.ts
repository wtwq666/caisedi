// 面料模块类型
export interface FabricModule {
  id: string;
  title: string;
  content: string;
}

// 面料数据结构
export interface Fabric {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  order: number;
  modules: {
    productCognition: string;      // 模块一：产品认知
    salesScript: string;           // 模块二：销售话术转化
    competitorComparison: string;  // 模块三：竞品对比
    objectionHandling: string;     // 模块四：异议处理Q&A
    practicalExercise: string;     // 模块五：实操演练
    afterSales: string;            // 模块六：售后知识
    test: string;                  // 课后测试
  };
}

// 用户类型
export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  name: string;
}

// 导航项
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

// 系统模块
export type SystemModule = 
  | 'fabric-training'
  | 'store-manual'
  | 'sales-training'
  | 'manager-manual'
  | 'mentor-manual'
  | 'store-image';
