import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import Knowledge from './pages/Knowledge'
import Culture from './pages/Culture'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Changelog from './pages/Changelog'
import MyQuizRecords from './pages/MyQuizRecords'
import Profile from './pages/Profile'
import RecentUpdates from './pages/RecentUpdates'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/recent-updates" element={<RecentUpdates />} />
          <Route path="/quiz-records" element={<MyQuizRecords />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
