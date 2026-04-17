import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuthStore, useTrainingStore } from '@/store';
import { Button } from '@/components/ui/button';
import { BrandMark } from '@/components/BrandMark';
import { LogOut, User, Settings, Package } from 'lucide-react';
import { getIconForTemplateSlug } from '@/lib/templateSlugIcons';
import { defaultTrainingTemplates } from '@/data/defaultTemplates';

const slugOrder = defaultTrainingTemplates.map((t) => t.slug);

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const templates = useTrainingStore((s) => s.templates);

  const sorted = useMemo(() => {
    return [...templates].sort((a, b) => {
      const ia = slugOrder.indexOf(a.slug);
      const ib = slugOrder.indexOf(b.slug);
      if (ia === -1 && ib === -1) return a.name.localeCompare(b.name, 'zh-CN');
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }, [templates]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-brand-gray-surface">
      <header className="bg-brand-yellow border-b border-brand-yellow-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-16 min-h-[4rem]">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gray-surface shrink-0"
            >
              <BrandMark size="sm" />
            </button>

            <nav className="hidden lg:flex items-center flex-wrap justify-end gap-1 max-w-[min(56rem,70vw)]">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  location.pathname.startsWith('/products')
                    ? 'bg-brand-yellow-soft text-brand-accent'
                    : 'text-brand-ink-soft hover:bg-brand-yellow-soft/90 hover:text-brand-ink'
                }`}
                title="商品资料参考"
              >
                <Package className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[7rem] truncate">商品资料</span>
              </button>
              {sorted.map((item) => {
                const Icon = getIconForTemplateSlug(item.slug);
                const path = `/t/${item.slug}`;
                const isActive = location.pathname.startsWith(path);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(path)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-yellow-soft text-brand-accent'
                        : 'text-brand-ink-soft hover:bg-brand-yellow-soft/90 hover:text-brand-ink'
                    }`}
                    title={item.name}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="max-w-[7rem] truncate">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              {user?.role === 'admin' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-brand-ink-soft hover:text-brand-ink px-2"
                  onClick={() => navigate('/admin/templates')}
                  title="模板管理"
                >
                  <Settings className="w-4 h-4 sm:mr-1" />
                  <span className="hidden sm:inline">模板</span>
                </Button>
              )}
              <div className="flex items-center gap-2 text-sm text-brand-ink-soft">
                <User className="w-4 h-4 hidden sm:block" />
                <span className="hidden sm:inline max-w-[6rem] truncate">
                  {user?.name}
                </span>
                {user?.role === 'admin' && (
                  <span className="px-2 py-0.5 bg-brand-yellow-soft text-brand-accent rounded-full text-xs">
                    管理员
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-brand-ink-soft hover:text-brand-ink px-2"
              >
                <LogOut className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">退出</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}
