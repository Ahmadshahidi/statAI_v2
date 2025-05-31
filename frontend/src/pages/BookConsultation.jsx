import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { Calendar, Clock, MessageSquare, ChevronLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function BookConsultation() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const { data } = await api.get('/consultations/slots');
        setAvailableSlots(data.slots || []);
      } catch (error) {
        console.error('Error fetching slots:', error);
        toast.error('Failed to load available slots');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableSlots();
  }, []);

  const onSubmit = async (data) => {
    if (!selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/consultations/book', {
        slot_id: selectedSlot.id,
        topic: data.topic,
        description: data.description
      });

      toast.success('Consultation booked successfully');
      navigate('/consultations');
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error(error.response?.data?.error || 'Failed to book consultation');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Group slots by date
  const groupedSlots = availableSlots.reduce((groups, slot) => {
    const date = slot.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(slot);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                Book a Consultation
              </h1>
              <p className="text-gray-600">
                Schedule a one-on-one session with our statistics experts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Time Slots */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-6">
                  Available Time Slots
                </h2>

                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-24 bg-gray-200 rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                ) : Object.keys(groupedSlots).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedSlots).map(([date, slots]) => (
                      <div key={date}>
                        <h3 className="text-lg font-medium text-primary-900 mb-3 flex items-center">
                          <Calendar size={18} className="mr-2 text-secondary-500" />
                          {formatDate(date)}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {slots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-3 rounded-lg border text-left transition-colors ${
                                selectedSlot?.id === slot.id
                                  ? 'border-secondary-500 bg-secondary-50 text-secondary-700'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center">
                                <Clock size={14} className="mr-2" />
                                <span>{slot.time}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No available slots
                    </h3>
                    <p className="text-gray-500">
                      Please check back later for new consultation slots
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Consultation Details Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-primary-900 mb-6">
                  Consultation Details
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="topic" className="form-label">
                      Topic
                    </label>
                    <input
                      type="text"
                      id="topic"
                      className={`form-input ${errors.topic ? 'border-red-500' : ''}`}
                      placeholder="e.g., Regression Analysis"
                      {...register('topic', { required: 'Topic is required' })}
                    />
                    {errors.topic && (
                      <p className="form-error">{errors.topic.message}</p>
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
                      placeholder="Describe what you'd like to discuss..."
                      {...register('description', {
                        required: 'Description is required',
                        minLength: {
                          value: 20,
                          message: 'Description must be at least 20 characters'
                        }
                      })}
                    />
                    {errors.description && (
                      <p className="form-error">{errors.description.message}</p>
                    )}
                  </div>

                  {selectedSlot && (
                    <div className="p-4 bg-secondary-50 rounded-lg">
                      <h3 className="font-medium text-secondary-900 mb-2">
                        Selected Time Slot
                      </h3>
                      <div className="text-sm text-secondary-700">
                        <div className="flex items-center mb-1">
                          <Calendar size={14} className="mr-2" />
                          <span>{formatDate(selectedSlot.date)}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-2" />
                          <span>{selectedSlot.time}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={submitting || !selectedSlot}
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Booking...
                      </div>
                    ) : (
                      'Book Consultation'
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BookConsultation;