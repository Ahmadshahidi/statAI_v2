import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../../services/api';
import {
  Users,
  BookOpen,
  Calendar,
  TrendingUp,
  ChevronRight,
  UserPlus,
  GraduationCap,
  Clock
} from 'lucide-react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalConsultations: 0,
    recentEnrollments: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated data - replace with actual API calls
        setStats({
          totalUsers: 856,
          totalCourses: 24,
          totalConsultations: 142,
          recentEnrollments: [
            {
              id: 1,
              user: { first_name: 'John', last_name: 'Doe' },
              course: { title: 'Introduction to Statistics' },
              enrolled_at: new Date().toISOString()
            },
            {
              id: 2,
              user: { first_name: 'Jane', last_name: 'Smith' },
              course: { title: 'Advanced Regression Analysis' },
              enrolled_at: new Date().toISOString()
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your platform's performance and recent activities
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Total Users</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {loading ? '...' : stats.totalUsers}
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Total Courses</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {loading ? '...' : stats.totalCourses}
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>3 new this month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Consultations</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {loading ? '...' : stats.totalConsultations}
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>8% increase</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Course Completion</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">78%</div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>5% increase</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-4">
                <Link
                  to="/admin/courses/new"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <BookOpen className="h-6 w-6 text-secondary-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-900">Add Course</h3>
                    <p className="text-sm text-gray-600">Create a new course</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </Link>

                <Link
                  to="/admin/users"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <UserPlus className="h-6 w-6 text-secondary-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-900">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage users</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </Link>

                <Link
                  to="/admin/consultations"
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="h-6 w-6 text-secondary-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-primary-900">Consultations</h3>
                    <p className="text-sm text-gray-600">Manage consultation slots</p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-900">
                  Recent Enrollments
                </h2>
                <Link
                  to="/admin/courses"
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
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {stats.recentEnrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-primary-900">
                            {enrollment.user.first_name} {enrollment.user.last_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {enrollment.course.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{formatDate(enrollment.enrolled_at)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;