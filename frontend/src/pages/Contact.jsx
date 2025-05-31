import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, MessageSquare, Send, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form data:', data);
      toast.success('Message sent successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      city: 'San Francisco',
      address: '123 Statistics Avenue, San Francisco, CA 94107',
      phone: '+1 (555) 123-4567',
      email: 'sf@statisticsmaster.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM PST'
    },
    {
      city: 'New York',
      address: '456 Data Street, New York, NY 10013',
      phone: '+1 (555) 987-6543',
      email: 'ny@statisticsmaster.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM EST'
    }
  ];

  return (
    <div className="bg-gray-50">
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300">
              Have questions? We'd love to hear from you. Send us a message
              and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-primary-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              {locations.map((location, index) => (
                <div
                  key={location.city}
                  className="bg-gray-100 p-6 rounded-lg space-y-4"
                >
                  <h3 className="text-xl font-semibold text-primary-900">
                    {location.city} Office
                  </h3>
                  
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-secondary-500 mt-1" />
                    <span>{location.address}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="w-5 h-5 text-secondary-500" />
                    <span>{location.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="w-5 h-5 text-secondary-500" />
                    <span>{location.email}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 text-secondary-500" />
                    <span>{location.hours}</span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className={`form-input ${errors.firstName ? 'border-red-500' : ''}`}
                      {...register('firstName', { required: 'First name is required' })}
                    />
                    {errors.firstName && (
                      <p className="form-error">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className={`form-input ${errors.lastName ? 'border-red-500' : ''}`}
                      {...register('lastName', { required: 'Last name is required' })}
                    />
                    {errors.lastName && (
                      <p className="form-error">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className={`form-input ${errors.subject ? 'border-red-500' : ''}`}
                    {...register('subject', { required: 'Subject is required' })}
                  />
                  {errors.subject && (
                    <p className="form-error">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="form-error">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center py-2.5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Reach out to our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                How quickly can I expect a response?
              </h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days.
                For urgent matters, please call our office directly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Do you offer consultations?
              </h3>
              <p className="text-gray-600">
                Yes, we offer both in-person and virtual consultations. You can book
                a consultation through our booking system or contact us directly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                Can I visit your office?
              </h3>
              <p className="text-gray-600">
                Yes, you're welcome to visit our offices during business hours. We
                recommend scheduling an appointment for the best experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers. For
                corporate training, we can also arrange invoice-based payments.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;