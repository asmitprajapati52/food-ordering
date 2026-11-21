import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hunger_rush_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('hunger_rush_user', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}!`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Invalid email or password';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone, role = 'user') => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password, phone, role });
      setUser(data);
      localStorage.setItem('hunger_rush_user', JSON.stringify(data));
      toast.success('Registration successful! Welcome to Hunger Rush.');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hunger_rush_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (updates) => {
    try {
      const { data } = await api.put('/auth/profile', updates);
      setUser(data);
      localStorage.setItem('hunger_rush_user', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      return { success: false };
    }
  };

  const addAddress = async (address) => {
    try {
      const { data } = await api.post('/auth/address', address);
      setUser(prev => {
        const updated = { ...prev, addresses: data };
        localStorage.setItem('hunger_rush_user', JSON.stringify(updated));
        return updated;
      });
      toast.success('Address saved successfully');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save address');
      return { success: false };
    }
  };

  const deleteAddress = async (addressId) => {
    try {
      const { data } = await api.delete(`/auth/address/${addressId}`);
      setUser(prev => {
        const updated = { ...prev, addresses: data };
        localStorage.setItem('hunger_rush_user', JSON.stringify(updated));
        return updated;
      });
      toast.success('Address removed');
    } catch (error) {
      toast.error('Failed to remove address');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        deleteAddress,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

