import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/wishlist');
      setWishlist(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (food) => {
    if (!user) {
      toast.error('Please login to save items to your wishlist!');
      return;
    }

    try {
      const { data } = await api.post(`/wishlist/toggle/${food._id}`);
      if (data.added) {
        setWishlist(prev => [...prev, food]);
        toast.success(`Saved "${food.name}" to wishlist ❤️`);
      } else {
        setWishlist(prev => prev.filter(item => item._id !== food._id));
        toast('Removed from wishlist', { icon: '💔' });
      }
    } catch (error) {
      toast.error('Wishlist action failed');
    }
  };

  const isWishlisted = (foodId) => {
    return wishlist.some(item => (item._id || item) === foodId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

