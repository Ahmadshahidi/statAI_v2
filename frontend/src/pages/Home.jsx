import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';
import { Sparkles, Users, BookOpen, Award, ArrowRight, ChevronRight } from 'lucide-react';

function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const { data } = await api.get('/courses?limit=3');
        setFeaturedCourses(data.courses || []);
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  // Placeholder data for statistics
  const stats = [
    { id: 1, value: '15+', label: 'Expert Instructors', icon: <Users className="h-6 w-6 text-secondary-500" /> },
    { id: 2, value: '50+', label: 'Specialized Courses', icon: <BookOpen className="h-6 w-6 text-secondary-500" /> },
    { id: 3, value: '8,500+', label: 'Happy Students', icon: <Award className="h-6 w-6 text-secondary-500" /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-10 z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-500 text-white mb-6">
                <Sparkles size={16} className="mr-1" />
                Master Statistics with Expert Guidance
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white"
            >
              Transform Your Data Analysis Skills with Our Statistics Courses
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-8"
            >
              From beginners to advanced practitioners, our courses provide the tools, 
              techniques, and knowledge to excel in statistics and data analysis.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/courses"
                className="btn-secondary px-8 py-3 text-base font-medium"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 text-base font-medium"
              >
                Get a Consultation
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-primary-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Featured Courses</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular statistics courses designed to help you master data analysis and interpretation.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 h-96 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-24 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <CourseCard course={course} />
                  </motion.div>
                ))
              ) : (
                // Placeholder courses if no data
                [
                  {
                    id: 1,
                    title: "Introduction to Statistics",
                    description: "Master fundamental statistical concepts, probability theory, and data analysis techniques.",
                    difficulty: "Beginner",
                    duration: "8 weeks",
                    price: 49.99,
                    category: "Fundamentals",
                    rating: 4.8,
                  },
                  {
                    id: 2,
                    title: "Regression Analysis Masterclass",
                    description: "Learn how to perform and interpret various regression models for data analysis.",
                    difficulty: "Intermediate",
                    duration: "6 weeks",
                    price: 79.99,
                    category: "Data Analysis",
                    rating: 4.9,
                  },
                  {
                    id: 3,
                    title: "Bayesian Statistics",
                    description: "Explore Bayesian statistical methods and their applications in real-world scenarios.",
                    difficulty: "Advanced",
                    duration: "10 weeks",
                    price: 99.99,
                    category: "Advanced Methods",
                    rating: 4.7,
                  }
                ].map((course) => (
                  <motion.div key={course.id} variants={itemVariants}>
                    <CourseCard course={course} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700"
            >
              View all courses
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Why Choose Our Statistics Courses?</h2>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">Expert Instructors</h3>
                    <p className="text-gray-600">
                      Learn from statisticians and data scientists with years of experience in academia and industry.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">Practical Applications</h3>
                    <p className="text-gray-600">
                      Apply statistical concepts to real-world problems with hands-on exercises and case studies.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">Flexible Learning</h3>
                    <p className="text-gray-600">
                      Study at your own pace with lifetime access to course materials and regular updates.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary-100 text-secondary-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-primary-900 mb-2">Community Support</h3>
                    <p className="text-gray-600">
                      Join a community of learners and get support from instructors and fellow students.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700"
                >
                  Learn more about our approach
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750"
                  alt="Statistics learning"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent-500 rounded-lg opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-secondary-500 rounded-lg opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Master Statistics?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of students who have transformed their careers through our statistics courses.
              Start your journey today!
            </p>
            <Link
              to="/register"
              className="btn-secondary px-8 py-3 text-base font-medium"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;