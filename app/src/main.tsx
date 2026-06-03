import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'
import './index.css'
import './styles/native-app.css'
import App from './App.tsx'
import AppBootstrap from './components/AppBootstrap'
import AppErrorBoundary from './components/AppErrorBoundary'
import CatalogLoader from './components/CatalogLoader'
import { AuthProvider } from './context/AuthContext'
import { BackNavigationProvider } from './context/BackNavigationContext'
import { initNativeApp } from './lib/initNativeApp'

initNativeApp()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <AppBootstrap>
          <AuthProvider>
            <CatalogLoader>
              <BackNavigationProvider>
                <App />
                <Toaster position="top-center" richColors closeButton />
              </BackNavigationProvider>
            </CatalogLoader>
          </AuthProvider>
        </AppBootstrap>
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
)
