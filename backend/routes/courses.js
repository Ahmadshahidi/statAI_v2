import express from 'express';
import supabase from '../config/supabase.js';
import { authenticateUser, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ courses: data });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        modules:course_modules(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json({ course: data });
  } catch (error) {
    console.error('Error fetching course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new course (admin only)
router.post('/', authenticateUser, isAdmin, async (req, res) => {
  const { title, description, difficulty, duration, price, image_url, category } = req.body;

  if (!title || !description || !difficulty || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .insert([
        { 
          title, 
          description, 
          difficulty, 
          duration, 
          price, 
          image_url, 
          category,
          created_by: req.user.id
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ 
      message: 'Course created successfully',
      course: data
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Update course (admin only)
router.put('/:id', authenticateUser, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, description, difficulty, duration, price, image_url, category, is_published } = req.body;

  try {
    const { data, error } = await supabase
      .from('courses')
      .update({ 
        title, 
        description, 
        difficulty, 
        duration, 
        price, 
        image_url, 
        category,
        is_published,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ 
      message: 'Course updated successfully',
      course: data
    });
  } catch (error) {
    console.error('Error updating course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete course (admin only)
router.delete('/:id', authenticateUser, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Enroll user in a course
router.post('/:id/enroll', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Check if already enrolled
    const { data: existingEnrollment, error: checkError } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', id)
      .single();

    if (existingEnrollment) {
      return res.status(400).json({ error: 'User already enrolled in this course' });
    }

    // Create enrollment
    const { data, error } = await supabase
      .from('enrollments')
      .insert([
        { 
          user_id: userId,
          course_id: id,
          status: 'active',
          progress: 0
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ 
      message: 'Enrolled successfully',
      enrollment: data
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Get course modules
router.get('/:id/modules', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('course_modules')
      .select('*')
      .eq('course_id', id)
      .order('order', { ascending: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ modules: data });
  } catch (error) {
    console.error('Error fetching course modules:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;