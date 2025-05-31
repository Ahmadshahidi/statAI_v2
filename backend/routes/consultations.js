import express from 'express';
import supabase from '../config/supabase.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Get all consultation time slots
router.get('/slots', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('consultation_slots')
      .select('*')
      .eq('is_booked', false)
      .gte('date', new Date().toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ slots: data });
  } catch (error) {
    console.error('Error fetching consultation slots:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Book a consultation
router.post('/book', authenticateUser, async (req, res) => {
  const { slot_id, topic, description } = req.body;
  const userId = req.user.id;

  if (!slot_id || !topic) {
    return res.status(400).json({ error: 'Slot ID and topic are required' });
  }

  try {
    // Start a transaction
    const { data: bookingData, error: bookingError } = await supabase.rpc('book_consultation_slot', {
      slot_id,
      user_id: userId,
      topic_input: topic,
      description_input: description
    });

    if (bookingError) {
      return res.status(400).json({ error: bookingError.message });
    }

    return res.status(201).json({ 
      message: 'Consultation booked successfully',
      booking: bookingData
    });
  } catch (error) {
    console.error('Error booking consultation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's consultations
router.get('/my-consultations', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('consultations')
      .select(`
        *,
        slot:consultation_slots(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ consultations: data });
  } catch (error) {
    console.error('Error fetching user consultations:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel a consultation
router.post('/:id/cancel', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if consultation belongs to user
    const { data: consultation, error: fetchError } = await supabase
      .from('consultations')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !consultation) {
      return res.status(404).json({ error: 'Consultation not found or not authorized' });
    }

    // Start a transaction to cancel consultation
    const { error: cancelError } = await supabase.rpc('cancel_consultation', {
      consultation_id: id
    });

    if (cancelError) {
      return res.status(400).json({ error: cancelError.message });
    }

    return res.status(200).json({ message: 'Consultation cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling consultation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;