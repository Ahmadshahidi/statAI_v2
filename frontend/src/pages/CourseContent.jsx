import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Lock,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

function CourseContent() {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentModule, setCurrentModule] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const [courseRes, enrollmentRes] = await Promise.all([
          api.get(`/courses/${id}`),
          api.get('/users/my-courses')
        ]);

        const courseData = courseRes.data.course;
        const enrollmentData = enrollmentRes.data.enrollments.find(
          e => e.course_id === id
        );

        setCourse(courseData);
        setEnrollment(enrollmentData);

        // Set initial module and lesson
        if (courseData.modules?.length > 0) {
          const firstModule = courseData.modules[0];
          setCurrentModule(firstModule);
          if (firstModule.lessons?.length > 0) {
            setCurrentLesson(firstModule.lessons[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast.error('Failed to load course content');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  const updateProgress = async (moduleId, lessonId) => {
    try {
      const completedModules = enrollment.completed_modules || [];
      const updatedModules = [...completedModules, moduleId];
      
      const progress = Math.round(
        (updatedModules.length / course.modules.length) * 100
      );

      await api.put(`/users/my-courses/${id}/progress`, {
        progress,
        completed_modules: updatedModules
      });

      setEnrollment(prev => ({
        ...prev,
        progress,
        completed_modules: updatedModules
      }));

      toast.success('Progress updated');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
    }
  };

  const handleModuleClick = (module) => {
    setCurrentModule(module);
    if (module.lessons?.length > 0) {
      setCurrentLesson(module.lessons[0]);
    }
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="h-96 bg-gray-200 rounded mb-4"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course || !enrollment) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Course Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist or you don't have access.
          </p>
          <Link to="/my-courses" className="btn-primary">
            Back to My Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link
                to="/my-courses"
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                <ChevronLeft size={20} />
              </Link>
              <h1 className="text-xl font-bold text-primary-900">
                {course.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: {enrollment.progress}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrollment.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {currentLesson ? (
              <div className="bg-white rounded-lg shadow-sm">
                <div className="aspect-video bg-gray-900 rounded-t-lg flex items-center justify-center">
                  <PlayCircle size={64} className="text-white opacity-75" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-primary-900 mb-4">
                    {currentLesson.title}
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-600">
                      {currentLesson.description}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      onClick={() => updateProgress(currentModule.id, currentLesson.id)}
                      className="btn-secondary"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Mark as Complete
                    </button>
                    
                    <div className="flex space-x-4">
                      <button className="btn-outline">
                        <ChevronLeft size={18} className="mr-2" />
                        Previous
                      </button>
                      <button className="btn-outline">
                        Next
                        <ChevronRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Select a Lesson
                </h2>
                <p className="text-gray-600">
                  Choose a lesson from the course outline to begin learning
                </p>
              </div>
            )}
          </motion.div>

          {/* Course Outline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="text-lg font-semibold text-primary-900 mb-4">
              Course Outline
            </h3>
            
            <div className="space-y-4">
              {course.modules?.map((module, moduleIndex) => (
                <div key={module.id} className="border rounded-lg">
                  <button
                    onClick={() => handleModuleClick(module)}
                    className={`w-full flex items-center justify-between p-4 text-left ${
                      currentModule?.id === module.id
                        ? 'bg-primary-50 text-primary-900'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm mr-3">
                        {moduleIndex + 1}
                      </span>
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-gray-500">
                          {module.lessons?.length || 0} lessons
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`transform transition-transform ${
                        currentModule?.id === module.id ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {currentModule?.id === module.id && (
                    <div className="border-t">
                      {module.lessons?.map((lesson, lessonIndex) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson)}
                          className={`w-full flex items-center p-3 pl-12 text-left hover:bg-gray-50 ${
                            currentLesson?.id === lesson.id
                              ? 'bg-secondary-50 text-secondary-900'
                              : ''
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs mr-3">
                            {lessonIndex + 1}
                          </span>
                          <span className="flex-1">{lesson.title}</span>
                          {enrollment.completed_modules?.includes(module.id) ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <Lock size={16} className="text-gray-400" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default CourseContent;