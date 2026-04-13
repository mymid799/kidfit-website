import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentCommunity from './pages/ParentCommunity';
import KidsGallery from './pages/KidsGallery';
import AdminDashboard from './pages/AdminDashboard';
import DocumentEditorView from './pages/TeacherDashboard/DocumentEditorView';
import AIPage from './pages/AIPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/parent" element={<ParentCommunity />} />
        <Route path="/gallery" element={<KidsGallery />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/teacher/document-editor" element={<DocumentEditorView />} />
        <Route path="/teacher/document-editor/:id" element={<DocumentEditorView />} />
        <Route path="/ai" element={<AIPage />} />
      </Routes>
    </Router>
  );
}
