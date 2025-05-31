import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  Clock,
  BookOpen,
  Star,
  Users,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

function CourseDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/courses/${id}`);
        setCourse(data.course);
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please log in to enroll in this course');
      return;
    }

    setEnrolling(true);
    try {
      await api.post(`/courses/${id}/enroll`);
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast.error(error.response?.data?.error || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="max-w-3xl">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center text-sm mb-4">
              <Link to="/courses" className="text-gray-300 hover:text-white">
                Courses
              </Link>
              <ChevronRight size={16} className="mx-2" />
              <span>{course.category}</span>
            </div>

            <h1 className="text-4xl font-bold mb-6">{course.title}</h1>

            <p className="text-xl text-gray-300 mb-8">{course.description}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center">
                <BookOpen size={16} className="mr-2" />
                <span>{course.modules?.length || 0} modules</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-2 text-yellow-400" />
                <span>{course.rating || '4.5'} rating</span>
              </div>
              <div className="flex items-center">
                <Users size={16} className="mr-2" />
                <span>500+ students</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium
                ${course.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'}`}
              >
                {course.difficulty}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* What You'll Learn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  What You'll Learn
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Understanding fundamental statistical concepts',
                    'Applying statistical methods to real-world data',
                    'Mastering data visualization techniques',
                    'Conducting hypothesis testing',
                    'Performing regression analysis',
                    'Interpreting statistical results'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle size={20} className="text-secondary-500 mr-2 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6 mb-8"
              >
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Course Content
                </h2>
                <div className="space-y-4">
                  {course.modules?.map((module, index) => (
                    <div key={index} className="border rounded-lg">
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center">
                          <PlayCircle size={20} className="text-secondary-500 mr-3" />
                          <div>
                            <h3 className="font-medium">{module.title}</h3>
                            <p className="text-sm text-gray-500">
                              {module.duration} • {module.lessons?.length || 0} lessons
                            </p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Requirements
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Basic mathematics knowledge</li>
                  <li>Understanding of algebra concepts</li>
                  <li>Access to a computer with internet connection</li>
                  <li>Willingness to learn and practice</li>
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              >
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img
                    src={course.image_url || "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary-900 mb-2">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="btn-primary w-full mb-4"
                >
                  {enrolling ? 'Enrolling...' : 'Enroll Now'}
                </button>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-gray-600">Lectures</span>
                    <span className="font-medium">{course.modules?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium capitalize">{course.difficulty}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">English</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <span className="text-gray-600">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;