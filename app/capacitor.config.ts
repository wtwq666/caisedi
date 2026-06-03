import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.caisedi.portal',
  appName: '凯施迪',
  webDir: 'dist',
  // 生产构建前在 .env.production 设置 VITE_API_BASE_URL / VITE_ASSETS_BASE_URL 指向线上 API
};

export default config;
