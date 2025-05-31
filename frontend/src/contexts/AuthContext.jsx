import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from '../services/supabase';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check session from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setUser(session.user);
          
          // Store access token
          localStorage.setItem('access_token', session.access_token);
          
          // Fetch user profile
          const { data: profile } = await api.get('/auth/me');
          if (profile) {
            setProfile(profile.user.profile);
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          localStorage.setItem('access_token', session.access_token);
          
          // Fetch user profile
          try {
            const { data: profile } = await api.get('/auth/me');
            if (profile) {
              setProfile(profile.user.profile);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          localStorage.removeItem('access_token');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Sign up function
  const signUp = async (email, password, firstName, lastName) => {
    try {
      const { data, error } = await api.post('/auth/signup', {
        email,
        password,
        first_name: firstName,
        last_name: lastName
      });
      
      if (error) throw new Error(error.message);
      
      toast.success('Account created! Please check your email to verify your account.');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error creating account');
      throw error;
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await api.post('/auth/login', {
        email,
        password
      });
      
      if (error) throw new Error(error.message);
      
      // Save auth data locally
      localStorage.setItem('access_token', data.session.access_token);
      setUser(data.user);
      
      // Fetch user profile
      const { data: profileData } = await api.get('/auth/me');
      if (profileData) {
        setProfile(profileData.user.profile);
      }
      
      toast.success('Welcome back!');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid email or password');
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await api.post('/auth/logout');
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      localStorage.removeItem('access_token');
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await api.put('/users/profile', profileData);
      
      if (error) throw new Error(error.message);
      
      setProfile(data.profile);
      toast.success('Profile updated successfully');
      return data.profile;
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error updating profile');
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    isAdmin: profile?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}