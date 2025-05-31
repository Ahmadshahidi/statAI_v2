import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  BookOpen,
  Clock,
  Calendar,
  BarChart2,
  ChevronRight,
  Award,
  PlayCircle,
  MessageSquare
} from 'lucide-react';

function Dashboard() {
  const { user, profile } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [enrollmentsRes, consultationsRes] = await Promise.all([
          api.get('/users/my-courses'),
          api.get('/consultations/my-consultations')
        ]);

        setEnrollments(enrollmentsRes.data.enrollments || []);
        setConsultations(consultationsRes.data.consultations || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-900 mb-2">
                Welcome back, {profile?.first_name || 'Student'}!
              </h1>
              <p className="text-gray-600">
                Track your progress and continue your learning journey.
              </p>
            </div>
            <Link
              to="/profile"
              className="btn-outline flex items-center"
            >
              View Profile
              <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Courses</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {enrollments.length}
            </div>
            <p className="text-sm text-gray-600">Enrolled courses</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Hours</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">24</div>
            <p className="text-sm text-gray-600">Learning hours</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Certificates</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">2</div>
            <p className="text-sm text-gray-600">Earned certificates</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Consultations</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {consultations.length}
            </div>
            <p className="text-sm text-gray-600">Booked sessions</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary-900">My Courses</h2>
                <Link
                  to="/my-courses"
                  className="text-secondary-600 hover:text-secondary-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.slice(0, 3).map((enrollment) => (
                    <Link
                      key={enrollment.id}
                      to={`/my-courses/${enrollment.course_id}/learn`}
                      className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-primary-100 rounded flex items-center justify-center mr-4">
                          <PlayCircle className="h-8 w-8 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-primary-900 mb-1">
                            {enrollment.course?.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <BarChart2 size={14} className="mr-1" />
                            <span>{enrollment.progress}% completed</span>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No courses yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start your learning journey by enrolling in a course
                  </p>
                  <Link to="/courses" className="btn-primary">
                    Browse Courses
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Upcoming Consultations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-primary-900">
                  Upcoming Consultations
                </h2>
                <Link
                  to="/consultations"
                  className="text-secondary-600 hover:text-secondary-700 text-sm font-medium flex items-center"
                >
                  View all
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-24 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : consultations.length > 0 ? (
                <div className="space-y-4">
                  {consultations.slice(0, 3).map((consultation) => (
                    <div
                      key={consultation.id}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-center mb-2">
                        <Calendar size={16} className="text-secondary-500 mr-2" />
                        <span className="text-sm font-medium">
                          {new Date(consultation.slot?.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-medium text-primary-900 mb-1">
                        {consultation.topic}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{consultation.slot?.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No consultations scheduled
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Book a consultation with our experts
                  </p>
                  <Link to="/book-consultation" className="btn-primary">
                    Book Consultation
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;