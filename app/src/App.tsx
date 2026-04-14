import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store';
import Layout from '@/components/Layout';
import LoginPage from '@/pages/LoginPage';
import FabricListPage from '@/pages/FabricListPage';
import FabricDetailPage from '@/pages/FabricDetailPage';
import FabricEditPage from '@/pages/FabricEditPage';
import PlaceholderPage from '@/pages/PlaceholderPage';
import './App.css';

// 受保护路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

// 管理员路由组件
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* 面料知识培训 */}
          <Route index element={<Navigate to="/fabric-training" />} />
          <Route path="fabric-training" element={<FabricListPage />} />
          <Route path="fabric-training/:id" element={<FabricDetailPage />} />
          <Route
            path="fabric-training/:id/edit"
            element={
              <AdminRoute>
                <FabricEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="fabric-training/new"
            element={
              <AdminRoute>
                <FabricEditPage />
              </AdminRoute>
            }
          />

          {/* 其他模块 */}
          <Route path="store-manual" element={<PlaceholderPage title="店铺运营手册" />} />
          <Route path="sales-training" element={<PlaceholderPage title="销售能力培训" />} />
          <Route path="manager-manual" element={<PlaceholderPage title="店长管理手册" />} />
          <Route path="mentor-manual" element={<PlaceholderPage title="带教手册" />} />
          <Route path="store-image" element={<PlaceholderPage title="店铺形象" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
