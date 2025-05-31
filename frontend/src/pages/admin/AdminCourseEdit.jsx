import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import {
  ChevronLeft,
  Save,
  Plus,
  X,
  AlertCircle,
  Image as ImageIcon,
  DragHandleDots2
} from 'lucide-react';
import toast from 'react-hot-toast';

function AdminCourseEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [modules, setModules] = useState([]);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  useEffect(() => {
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const { data } = await api.get(`/courses/${id}`);
      const course = data.course;
      
      // Set form values
      setValue('title', course.title);
      setValue('description', course.description);
      setValue('category', course.category);
      setValue('difficulty', course.difficulty);
      setValue('duration', course.duration);
      setValue('price', course.price);
      setValue('image_url', course.image_url);
      setValue('is_published', course.is_published);
      
      setModules(course.modules || []);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error('Failed to load course');
      navigate('/admin/courses');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      if (id) {
        await api.put(`/courses/${id}`, data);
        toast.success('Course updated successfully');
      } else {
        await api.post('/courses', data);
        toast.success('Course created successfully');
      }
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error(error.response?.data?.error || 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const addModule = () => {
    setModules([
      ...modules,
      {
        id: Date.now(),
        title: '',
        description: '',
        order: modules.length,
        lessons: []
      }
    ]);
  };

  const removeModule = (moduleIndex) => {
    setModules(modules.filter((_, index) => index !== moduleIndex));
  };

  const addLesson = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = [
      ...(updatedModules[moduleIndex].lessons || []),
      {
        id: Date.now(),
        title: '',
        description: '',
        order: updatedModules[moduleIndex].lessons?.length || 0
      }
    ];
    setModules(updatedModules);
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter(
      (_, index) => index !== lessonIndex
    );
    setModules(updatedModules);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/admin/courses')}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                {id ? 'Edit Course' : 'Create Course'}
              </h1>
              <p className="text-gray-600">
                {id ? 'Update course details and content' : 'Add a new course to your catalog'}
              </p>
            </div>
          </div>

          {/* Course Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-6">
                Course Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="form-label">
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && (
                    <p className="form-error">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && (
                    <p className="form-error">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      id="category"
                      className={`form-input ${errors.category ? 'border-red-500' : ''}`}
                      {...register('category', { required: 'Category is required' })}
                    >
                      <option value="">Select Category</option>
                      <option value="basics">Statistics Basics</option>
                      <option value="research">Research Methods</option>
                      <option value="data-analysis">Data Analysis</option>
                      <option value="probability">Probability Theory</option>
                      <option value="machine-learning">Machine Learning</option>
                    </select>
                    {errors.category && (
                      <p className="form-error">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="difficulty" className="form-label">
                      Difficulty Level
                    </label>
                    <select
                      id="difficulty"
                      className={`form-input ${errors.difficulty ? 'border-red-500' : ''}`}
                      {...register('difficulty', { required: 'Difficulty is required' })}
                    >
                      <option value="">Select Difficulty</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.difficulty && (
                      <p className="form-error">{errors.difficulty.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="duration" className="form-label">
                      Duration
                    </label>
                    <input
                      type="text"
                      id="duration"
                      className={`form-input ${errors.duration ? 'border-red-500' : ''}`}
                      placeholder="e.g., 8 weeks"
                      {...register('duration', { required: 'Duration is required' })}
                    />
                    {errors.duration && (
                      <p className="form-error">{errors.duration.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="price" className="form-label">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      step="0.01"
                      min="0"
                      className={`form-input ${errors.price ? 'border-red-500' : ''}`}
                      {...register('price', {
                        required: 'Price is required',
                        min: { value: 0, message: 'Price must be positive' }
                      })}
                    />
                    {errors.price && (
                      <p className="form-error">{errors.price.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="image_url" className="form-label">
                    Course Image URL
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        id="image_url"
                        className={`form-input ${errors.image_url ? 'border-red-500' : ''}`}
                        placeholder="https://example.com/image.jpg"
                        {...register('image_url')}
                      />
                      {errors.image_url && (
                        <p className="form-error">{errors.image_url.message}</p>
                      )}
                    </div>
                    {watch('image_url') && (
                      <div className="h-12 w-12 rounded overflow-hidden">
                        <img
                          src={watch('image_url')}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    className="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded"
                    {...register('is_published')}
                  />
                  <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
                    Publish course (make it visible to students)
                  </label>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-900">
                  Course Modules
                </h2>
                <button
                  type="button"
                  onClick={addModule}
                  className="btn-secondary"
                >
                  <Plus size={18} className="mr-2" />
                  Add Module
                </button>
              </div>

              {modules.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No modules yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Start building your course by adding modules and lessons
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {modules.map((module, moduleIndex) => (
                    <div
                      key={module.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Module Title"
                            className="form-input mb-2"
                            value={module.title}
                            onChange={(e) => {
                              const updatedModules = [...modules];
                              updatedModules[moduleIndex].title = e.target.value;
                              setModules(updatedModules);
                            }}
                          />
                          <textarea
                            placeholder="Module Description"
                            rows={2}
                            className="form-input"
                            value={module.description}
                            onChange={(e) => {
                              const updatedModules = [...modules];
                              updatedModules[moduleIndex].description = e.target.value;
                              setModules(updatedModules);
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeModule(moduleIndex)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      {/* Lessons */}
                      <div className="space-y-4 mt-4">
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-start bg-gray-50 rounded p-3"
                          >
                            <DragHandleDots2 className="text-gray-400 mt-2 mr-2" />
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Lesson Title"
                                className="form-input mb-2"
                                value={lesson.title}
                                onChange={(e) => {
                                  const updatedModules = [...modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].title = e.target.value;
                                  setModules(updatedModules);
                                }}
                              />
                              <textarea
                                placeholder="Lesson Description"
                                rows={2}
                                className="form-input"
                                value={lesson.description}
                                onChange={(e) => {
                                  const updatedModules = [...modules];
                                  updatedModules[moduleIndex].lessons[lessonIndex].description = e.target.value;
                                  setModules(updatedModules);
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeLesson(moduleIndex, lessonIndex)}
                              className="ml-2 text-red-600 hover:text-red-800"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addLesson(moduleIndex)}
                          className="btn-outline w-full"
                        >
                          <Plus size={18} className="mr-2" />
                          Add Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/admin/courses')}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    {id ? 'Update Course' : 'Create Course'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default AdminCourseEdit;