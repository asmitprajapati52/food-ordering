import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import RestaurantDetails from './pages/RestaurantDetails';
import FoodDetails from './pages/FoodDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import { Login, Register } from './pages/AuthPages';
import { Profile } from './pages/Profile';
import { OrdersList } from './pages/OrdersList';
import { Wishlist } from './pages/Wishlist';
import { AdminDashboard } from './pages/AdminDashboard';
import { Offers, About } from './pages/OffersAndAbout';
import { RestaurantsList } from './pages/RestaurantsList';
import { useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  return user && isAdmin ? children : <Navigate to="/" replace />;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('hunger_rush_theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hunger_rush_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hunger_rush_theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF8] dark:bg-[#0F0F0F] text-[#171717] dark:text-[#F3F4F6] transition-colors duration-200">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/restaurants" element={<RestaurantsList />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Protected Routes */}
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/track-order/:id" 
            element={
              <ProtectedRoute>
                <OrderTracking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrdersList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            } 
          />

          {/* Admin Protected Route */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* 404 Fallback */}
          <Route 
            path="*" 
            element={
              <div className="text-center py-24 space-y-4">
                <h1 className="text-6xl font-black text-[#FF6B35]">404</h1>
                <p className="text-lg font-bold">Oops! Page not found.</p>
                <a href="/" className="inline-block px-6 py-2.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">
                  Go Home
                </a>
              </div>
            } 
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

