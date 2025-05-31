import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { 
  BookOpen, 
  Clock, 
  BarChart2, 
  PlayCircle,
  CheckCircle,
  AlertCircle,
  ChevronRight 
} from 'lucide-react';

function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, in-progress, completed

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const { data } = await api.get('/users/my-courses');
        setEnrollments(data.enrollments || []);
      } catch (error) {
        console.error('Error fetching enrollments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const filteredEnrollments = enrollments.filter(enrollment => {
    switch (filter) {
      case 'in-progress':
        return enrollment.progress > 0 && enrollment.progress < 100;
      case 'completed':
        return enrollment.progress === 100;
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <h1 className="text-3xl font-bold text-primary-900 mb-4">
            My Learning Journey
          </h1>
          <p className="text-gray-600">
            Track your progress and continue learning from where you left off.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Total Courses</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {enrollments.length}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <BarChart2 className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">In Progress</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {enrollments.filter(e => e.progress > 0 && e.progress < 100).length}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-8 w-8 text-secondary-500" />
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <div className="text-2xl font-bold text-primary-900">
              {enrollments.filter(e => e.progress === 100).length}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-white rounded-lg shadow-sm p-4 flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${
                filter === 'all'
                  ? 'bg-secondary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Courses
            </button>
            <button
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-md ${
                filter === 'in-progress'
                  ? 'bg-secondary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md ${
                filter === 'completed'
                  ? 'bg-secondary-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
          </div>
        </motion.div>

        {/* Course List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredEnrollments.length > 0 ? (
            <div className="space-y-4">
              {filteredEnrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 bg-primary-100 rounded flex items-center justify-center mr-4">
                          <PlayCircle className="h-8 w-8 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900 mb-1">
                            {enrollment.course?.title}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock size={14} className="mr-1" />
                            <span>{enrollment.course?.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        to={`/my-courses/${enrollment.course_id}/learn`}
                        className="btn-secondary"
                      >
                        {enrollment.progress === 0 ? 'Start Learning' : 'Continue Learning'}
                        <ChevronRight size={16} className="ml-2" />
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-primary-900">
                          {enrollment.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {enrollment.progress === 100 && (
                      <div className="mt-4 flex items-center text-green-600">
                        <CheckCircle size={16} className="mr-2" />
                        <span className="text-sm font-medium">Course Completed</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 mb-6">
                {filter === 'all'
                  ? "You haven't enrolled in any courses yet"
                  : filter === 'in-progress'
                  ? "You don't have any courses in progress"
                  : "You haven't completed any courses yet"}
              </p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MyCourses;