import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('hunger_rush_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  useEffect(() => {
    localStorage.setItem('hunger_rush_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food, quantity = 1, customizations = [], instructions = '') => {
    // Check if cart contains items from another restaurant
    if (cartItems.length > 0 && cartItems[0].restaurantId !== food.restaurant) {
      const proceed = window.confirm(
        'Your cart contains items from another restaurant. Would you like to clear your cart and add this item?'
      );
      if (!proceed) return;
      setCartItems([]);
    }

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item._id === food._id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        toast.success(`Increased ${food.name} quantity in cart!`);
        return updated;
      } else {
        toast.success(`${food.name} added to cart!`);
        return [
          ...prev,
          {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            isVeg: food.isVeg,
            restaurantId: food.restaurant?._id || food.restaurant,
            restaurantName: food.restaurantName,
            quantity,
            customizations,
            specialInstructions: instructions
          }
        ];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item._id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
    toast.success('Item removed from cart');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = async (code) => {
    try {
      const { data } = await api.post('/coupons/validate', {
        code,
        orderAmount: subtotal
      });
      setAppliedCoupon(data);
      toast.success(data.message);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to apply coupon';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast('Coupon removed', { icon: 'ℹ️' });
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = cartItems.length > 0 ? (subtotal > 499 ? 0 : 40) : 0;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const tax = Math.round(subtotal * 0.05); // 5% GST on restaurant food
  const totalAmount = Math.max(0, subtotal + deliveryFee + tax - discount);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        deliveryFee,
        tax,
        discount,
        totalAmount,
        totalItemCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        deliveryInstructions,
        setDeliveryInstructions,
        restaurantName: cartItems[0]?.restaurantName || ''
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

