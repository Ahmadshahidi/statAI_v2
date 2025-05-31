import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function About() {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Statistics Instructor',
      bio: 'Ph.D. in Statistics with 10+ years of teaching experience',
      image: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg'
    },
    {
      name: 'Prof. Michael Roberts',
      role: 'Data Science Expert',
      bio: 'Former lead data scientist at Tech Corp with 15+ years experience',
      image: 'https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg'
    },
    {
      name: 'Dr. Emily Thompson',
      role: 'Research Methods Specialist',
      bio: 'Research methodology expert with focus on practical applications',
      image: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              About StatisticsMaster
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Empowering students and professionals with expert-led statistics education
              since 2020.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-primary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-6">
                At StatisticsMaster, we believe that understanding statistics is crucial
                in today's data-driven world. Our mission is to make statistical
                education accessible, engaging, and practical for everyone.
              </p>
              <p className="text-gray-600 mb-6">
                We combine academic rigor with real-world applications, ensuring our
                students not only understand statistical concepts but can apply them
                effectively in their careers.
              </p>
              <Link
                to="/courses"
                className="inline-flex items-center text-secondary-600 font-medium hover:text-secondary-700"
              >
                Explore our courses
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg"
                alt="Students learning statistics"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary-500 rounded-lg opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our instructors bring years of academic and industry experience to provide
              you with the highest quality statistics education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-secondary-500" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">8,500+</h3>
              <p className="text-gray-600">Students Taught</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-secondary-500" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">50+</h3>
              <p className="text-gray-600">Specialized Courses</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-secondary-500" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">15+</h3>
              <p className="text-gray-600">Expert Instructors</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of learners and take the first step towards mastering
              statistics.
            </p>
            <Link
              to="/courses"
              className="btn-secondary px-8 py-3 text-base font-medium"
            >
              Browse Courses
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;