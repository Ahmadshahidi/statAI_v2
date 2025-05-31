import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Calendar, Clock, Video, MessageSquare, AlertCircle, ChevronRight, X } from 'lucide-react';
import toast from 'react-hot-toast';

function Consultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const { data } = await api.get('/consultations/my-consultations');
        setConsultations(data.consultations || []);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        toast.error('Failed to load consultations');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  const handleCancelConsultation = async (id) => {
    try {
      await api.post(`/consultations/${id}/cancel`);
      setConsultations(consultations.filter(c => c.id !== id));
      toast.success('Consultation cancelled successfully');
    } catch (error) {
      console.error('Error cancelling consultation:', error);
      toast.error('Failed to cancel consultation');
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                My Consultations
              </h1>
              <p className="text-gray-600">
                Manage your scheduled consultations with our expert instructors
              </p>
            </div>
            <Link
              to="/book-consultation"
              className="btn-primary flex items-center"
            >
              Book New Consultation
              <ChevronRight size={16} className="ml-2" />
            </Link>
          </div>
        </motion.div>

        {/* Consultations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
          ) : consultations.length > 0 ? (
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <Video className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900">
                            {consultation.topic}
                          </h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar size={14} className="mr-1" />
                            <span>{formatDate(consultation.slot?.date)}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{consultation.slot?.time}</span>
                          </div>
                        </div>
                      </div>
                      {new Date(consultation.slot?.date) > new Date() && (
                        <button
                          onClick={() => handleCancelConsultation(consultation.id)}
                          className="btn-outline text-red-600 hover:bg-red-50 hover:border-red-600"
                        >
                          <X size={16} className="mr-2" />
                          Cancel
                        </button>
                      )}
                    </div>

                    {consultation.description && (
                      <div className="flex items-start mt-4 text-gray-600">
                        <MessageSquare size={16} className="mr-2 mt-1 flex-shrink-0" />
                        <p>{consultation.description}</p>
                      </div>
                    )}

                    {new Date(consultation.slot?.date) <= new Date() && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-500">
                          <AlertCircle size={16} className="mr-2" />
                          <span>This consultation has passed</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No consultations scheduled
              </h3>
              <p className="text-gray-500 mb-6">
                Book a consultation with our expert instructors to get personalized guidance
              </p>
              <Link to="/book-consultation" className="btn-primary">
                Book Your First Consultation
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Consultations;