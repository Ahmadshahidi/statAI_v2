import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import {
  Calendar,
  Clock,
  Plus,
  Users,
  Search,
  Filter,
  AlertCircle,
  X,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import toast from 'react-hot-toast';

function AdminConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    duration: 60
  });

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      // In a real app, this would fetch all consultations
      const { data } = await api.get('/consultations/all');
      setConsultations(data.consultations || []);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      toast.error('Failed to load consultations');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      await api.post('/consultations/slots', newSlot);
      setShowAddSlotModal(false);
      fetchConsultations();
      toast.success('Consultation slot added successfully');
    } catch (error) {
      console.error('Error adding slot:', error);
      toast.error('Failed to add consultation slot');
    }
  };

  const handleCancelConsultation = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this consultation?')) {
      return;
    }

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

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.user?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.user?.last_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || consultation.status === filters.status;
    const matchesDate = !filters.date || consultation.date === filters.date;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">
                Manage Consultations
              </h1>
              <p className="text-gray-600">
                Manage consultation slots and bookings
              </p>
            </div>
            <button
              onClick={() => setShowAddSlotModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Time Slot
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Filter size={20} className="text-gray-500 mr-2" />
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="form-input py-2"
                >
                  <option value="">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="form-input py-2"
              />
            </div>
          </div>
        </motion.div>

        {/* Consultations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredConsultations.length > 0 ? (
            <div className="space-y-4">
              {filteredConsultations.map((consultation) => (
                <div
                  key={consultation.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          <Users className="h-6 w-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary-900">
                            {consultation.user?.first_name} {consultation.user?.last_name}
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
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          consultation.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : consultation.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {consultation.status === 'completed' && <CheckCircle size={12} className="mr-1" />}
                          {consultation.status === 'cancelled' && <X size={12} className="mr-1" />}
                          {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                        </span>
                        {consultation.status === 'scheduled' && (
                          <button
                            onClick={() => handleCancelConsultation(consultation.id)}
                            className="btn-outline text-red-600 hover:bg-red-50 hover:border-red-600"
                          >
                            <X size={16} className="mr-2" />
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start mt-4 text-gray-600">
                      <MessageSquare size={16} className="mr-2 mt-1 flex-shrink-0" />
                      <p>{consultation.topic}</p>
                    </div>

                    {consultation.description && (
                      <p className="mt-2 text-sm text-gray-500 ml-6">
                        {consultation.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No consultations found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Time Slot Modal */}
      {showAddSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-primary-900">
                  Add Consultation Slot
                </h2>
                <button
                  onClick={() => setShowAddSlotModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSlot} className="space-y-4">
                <div>
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="form-input"
                    value={newSlot.date}
                    onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    className="form-input"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="duration" className="form-label">
                    Duration (minutes)
                  </label>
                  <select
                    id="duration"
                    className="form-input"
                    value={newSlot.duration}
                    onChange={(e) => setNewSlot({ ...newSlot, duration: Number(e.target.value) })}
                    required
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddSlotModal(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Slot
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminConsultations;