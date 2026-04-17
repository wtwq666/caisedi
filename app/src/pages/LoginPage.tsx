import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BrandMark } from '@/components/BrandMark';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/');
      } else {
        setError('用户名或密码错误');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-yellow via-brand-yellow-surface to-brand-gray-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <BrandMark size="lg" vertical />
        </div>

        <Card className="shadow-xl border-0 border-brand-gray-border/40">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-brand-ink">
              知识平台登录
            </CardTitle>
            <CardDescription className="text-brand-gray-muted">
              请输入您的账号和密码
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary text-primary-foreground hover:bg-brand-yellow-hover"
                disabled={isLoading}
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-brand-gray-surface/90 rounded-lg text-sm text-brand-gray-muted border border-brand-gray-border/60">
              <p className="font-medium mb-2 text-brand-gray">测试账号：</p>
              <div className="space-y-1">
                <p>管理员：admin / admin123</p>
                <p>普通用户：user / user123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-brand-gray-muted mt-6">
          © 2026 中山 CAISEDI 服装有限公司
        </p>
      </div>
    </div>
  );
}
