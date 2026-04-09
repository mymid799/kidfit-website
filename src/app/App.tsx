import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../modules/landing/pages/LandingPage';
import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import ForgotPasswordPage from '../modules/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '../modules/auth/pages/ResetPasswordPage';
import VerifyEmailPage from '../modules/auth/pages/VerifyEmailPage';
import TeacherDashboard from '../modules/teacher/pages/TeacherDashboard';
import ParentDashboard from '../modules/parent/pages/ParentDashboard';
import GalleryPage from '../modules/gallery/pages/GalleryPage';
import AdminDashboard from '../modules/super-admin/pages/AdminDashboard';
import ARViewer from '../modules/ar/pages/ARViewer';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />

        {/* Dashboards */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/parent" element={<ParentDashboard />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        
        {/* AR Features */}
        <Route path="/ar-scanner" element={<ARViewer />} />
        <Route path="/ar-scanner/:productId" element={<ARViewer />} />
      </Routes>
    </Router>
  );
}
