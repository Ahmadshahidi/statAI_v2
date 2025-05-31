import express from 'express';
import supabase from '../config/supabase.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ profile: data });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { first_name, last_name, bio, avatar_url } = req.body;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        bio,
        avatar_url,
        updated_at: new Date()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: data
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's enrolled courses
router.get('/my-courses', authenticateUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('user_id', userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ enrollments: data });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update course progress
router.put('/my-courses/:courseId/progress', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;
  const { progress, completed_modules } = req.body;

  if (progress === undefined) {
    return res.status(400).json({ error: 'Progress value is required' });
  }

  try {
    const { data, error } = await supabase
      .from('enrollments')
      .update({
        progress,
        completed_modules,
        updated_at: new Date()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: 'Progress updated successfully',
      enrollment: data
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Admin only: Get all users
router.get('/', authenticateUser, isAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ users: data });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;