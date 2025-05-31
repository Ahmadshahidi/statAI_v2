import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import LoadingScreen from './components/ui/LoadingScreen';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetails = lazy(() => import('./pages/CourseDetails'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const CourseContent = lazy(() => import('./pages/CourseContent'));
const Consultations = lazy(() => import('./pages/Consultations'));
const BookConsultation = lazy(() => import('./pages/BookConsultation'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCourses = lazy(() => import('./pages/admin/AdminCourses'));
const AdminCourseEdit = lazy(() => import('./pages/admin/AdminCourseEdit'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminConsultations = lazy(() => import('./pages/admin/AdminConsultations'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="my-courses/:id/learn" element={<CourseContent />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="book-consultation" element={<BookConsultation />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/courses" element={<AdminCourses />} />
            <Route path="admin/courses/new" element={<AdminCourseEdit />} />
            <Route path="admin/courses/:id/edit" element={<AdminCourseEdit />} />
            <Route path="admin/users" element={<AdminUsers />} />
            <Route path="admin/consultations" element={<AdminConsultations />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
