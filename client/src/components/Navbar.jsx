import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Heart, 
  User as UserIcon, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Compass, 
  Store, 
  Tag, 
  ShieldAlert,
  Moon,
  Sun,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../services/api';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItemCount } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Indiranagar, Bengaluru');
  const [locationDropdown, setLocationDropdown] = useState(false);

  // Live suggestions state
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef(null);

  const locations = [
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'HSR Layout, Bengaluru',
    'Whitefield, Bengaluru',
    'Church Street, Bengaluru'
  ];

  // Fetch quick live suggestions as user types
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const { data } = await api.get(`/foods?search=${encodeURIComponent(searchQuery.trim())}`);
        setSuggestions(data.slice(0, 5));
      } catch (err) {
        console.error('Search suggestion error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close suggestions if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleSelectSuggestion = (food) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/food/${food._id}`);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-orange-100/60 dark:border-neutral-800 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FFC857] flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white text-2xl font-black">⚡</span>
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-[#171717] dark:text-white flex items-center">
                HUNGER<span className="text-[#FF6B35] ml-1">RUSH</span>
              </span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B35] -mt-1 hidden sm:block">
                Express Cravings
              </p>
            </div>
          </Link>

          {/* Location Selector */}
          <div className="relative hidden lg:block">
            <button 
              onClick={() => setLocationDropdown(!locationDropdown)}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl bg-orange-50/70 dark:bg-neutral-800 text-[#171717] dark:text-neutral-200 hover:bg-orange-100/80 transition-colors"
            >
              <MapPin className="w-4 h-4 text-[#FF6B35]" />
              <span className="truncate max-w-[150px]">{selectedLocation}</span>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {locationDropdown && (
              <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                  Deliver to
                </div>
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-orange-50 dark:hover:bg-neutral-800 transition-colors ${
                      selectedLocation === loc ? 'text-[#FF6B35] font-bold bg-orange-50/40' : 'text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar with Live Suggestions Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-md hidden md:block relative">
            <form 
              onSubmit={handleSearchSubmit}
              className="flex items-center relative"
            >
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                placeholder="Search pizza, biryani, burgers, pasta..."
                className="w-full pl-11 pr-20 py-2.5 rounded-full bg-neutral-100/90 dark:bg-neutral-800 border border-transparent focus:border-[#FF6B35]/40 text-sm text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/30 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
              
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSuggestions([]);
                  }}
                  className="absolute right-16 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1 rounded-full bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924] transition-colors"
              >
                Search
              </button>
            </form>

            {/* Live Autocomplete Suggestions Box */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-100 dark:border-neutral-800 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1">
                <div className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800 flex justify-between">
                  <span>Suggested Dishes</span>
                  <span>Press Enter to view all</span>
                </div>
                {suggestions.map((food) => (
                  <div
                    key={food._id}
                    onClick={() => handleSelectSuggestion(food)}
                    className="flex items-center justify-between px-3.5 py-2.5 hover:bg-orange-50/60 dark:hover:bg-neutral-800 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-10 h-10 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-[#FF6B35] transition-colors line-clamp-1">
                          {food.name}
                        </h4>
                        <p className="text-[11px] text-neutral-400">
                          {food.restaurantName} • <span className="font-semibold text-neutral-700 dark:text-neutral-300">₹{food.price}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#FF6B35] group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
                <div 
                  onClick={handleSearchSubmit}
                  className="px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800/50 hover:bg-orange-100/50 text-center text-xs font-bold text-[#FF6B35] cursor-pointer transition-colors border-t border-neutral-100 dark:border-neutral-800"
                >
                  See all results for "{searchQuery}"
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#FF6B35] transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#FF6B35] transition-colors flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#FF6B35]" />
              Explore Food
            </Link>
            <Link to="/restaurants" className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#FF6B35] transition-colors flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#FF6B35]" />
              Restaurants
            </Link>
            <Link to="/offers" className="text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:text-[#FF6B35] transition-colors flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#FFC857]" />
              Offers
              <span className="text-[10px] bg-red-500 text-white font-extrabold px-1.5 py-0.5 rounded-full">HOT</span>
            </Link>
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-neutral-700 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF6B35] text-white hover:bg-[#E85924] shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              <span className="w-5 h-5 rounded-full bg-white text-[#FF6B35] text-xs font-black flex items-center justify-center">
                {totalItemCount}
              </span>
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-xl bg-orange-50 dark:bg-neutral-800 border border-orange-200/50 dark:border-neutral-700 hover:bg-orange-100/60 transition-colors"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-lg object-cover ring-2 ring-[#FF6B35]/40"
                  />
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-100 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl border border-neutral-100 dark:border-neutral-800 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                      <p className="text-xs text-neutral-400">Signed in as</p>
                      <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B35]">
                        {user.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-800 hover:text-[#FF6B35] transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      My Profile & Addresses
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-800 hover:text-[#FF6B35] transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Order History & Tracking
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-neutral-100 dark:border-neutral-800 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold hover:bg-[#171717]/80 transition-colors shadow-sm"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl xl:hidden bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3">
            <form onSubmit={handleSearchSubmit} className="flex items-center relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food or restaurant..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm focus:outline-none"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3" />
            </form>

            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              Explore Food
            </Link>
            <Link
              to="/restaurants"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              Restaurants
            </Link>
            <Link
              to="/offers"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              Offers & Coupons
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-orange-50 dark:hover:bg-neutral-800"
            >
              About Us
            </Link>
          </div>
        )}

      </div>
    </header>
  );
};

export default Navbar;
