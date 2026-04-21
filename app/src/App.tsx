import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';
import Layout from '@/components/Layout';
import LoginPage from '@/pages/LoginPage';
import TrainingListPage from '@/pages/TrainingListPage';
import TrainingDetailPage from '@/pages/TrainingDetailPage';
import TrainingEditPage from '@/pages/TrainingEditPage';
import TemplateAdminPage from '@/pages/TemplateAdminPage';
import HomePage from '@/pages/HomePage';
import ProductCatalogListPage from '@/pages/ProductCatalogListPage';
import ProductCatalogDetailPage from '@/pages/ProductCatalogDetailPage';
import LibrarySectionPage from '@/pages/LibrarySectionPage';
import LibraryFileViewerPage from '@/pages/LibraryFileViewerPage';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (user?.role !== 'admin') return <Navigate to="/" />;
  return <>{children}</>;
}

function LegacyFabricRedirect() {
  const location = useLocation();
  const suffix =
    location.pathname.replace(/^\/fabric-training/, '') || '';
  return <Navigate to={`/t/fabric-training${suffix}`} replace />;
}

function App() {
  return (
    <Router>
      <Toaster richColors position="top-center" />
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
          <Route index element={<HomePage />} />

          <Route path="products" element={<ProductCatalogListPage />} />
          <Route path="products/:productId" element={<ProductCatalogDetailPage />} />
          <Route path="library/:sectionSlug" element={<LibrarySectionPage />} />
          <Route
            path="library/:sectionSlug/file/:fileId"
            element={<LibraryFileViewerPage />}
          />

          <Route
            path="t/:slug/new"
            element={
              <AdminRoute>
                <TrainingEditPage />
              </AdminRoute>
            }
          />
          <Route
            path="t/:slug/:itemId/edit"
            element={
              <AdminRoute>
                <TrainingEditPage />
              </AdminRoute>
            }
          />
          <Route path="t/:slug/:itemId" element={<TrainingDetailPage />} />
          <Route path="t/:slug" element={<TrainingListPage />} />

          <Route
            path="admin/templates"
            element={
              <AdminRoute>
                <TemplateAdminPage />
              </AdminRoute>
            }
          />

          <Route path="fabric-training/*" element={<LegacyFabricRedirect />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
