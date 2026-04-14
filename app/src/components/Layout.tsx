import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Store,
  TrendingUp,
  Users,
  GraduationCap,
  Image,
  LogOut,
  User
} from 'lucide-react';

const navItems = [
  { id: 'fabric-training', label: '面料知识培训', icon: BookOpen, path: '/fabric-training' },
  { id: 'store-manual', label: '店铺运营手册', icon: Store, path: '/store-manual' },
  { id: 'sales-training', label: '销售能力培训', icon: TrendingUp, path: '/sales-training' },
  { id: 'manager-manual', label: '店长管理手册', icon: Users, path: '/manager-manual' },
  { id: 'mentor-manual', label: '带教手册', icon: GraduationCap, path: '/mentor-manual' },
  { id: 'store-image', label: '店铺形象', icon: Image, path: '/store-image' },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-900">企业信息管理系统</h1>
            </div>

            {/* 导航菜单 */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* 用户信息 */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
                {user?.role === 'admin' && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                    管理员
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4 mr-1" />
                退出
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
