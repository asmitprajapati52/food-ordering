import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  MapPin, 
  Tag, 
  Plus, 
  Search, 
  ShieldCheck, 
  Heart, 
  Check 
} from 'lucide-react';
import api from '../services/api';
import FoodCard from '../components/FoodCard';
import { useCart } from '../context/CartContext';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [menuSearch, setMenuSearch] = useState('');

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/restaurants/${id}`);
      setRestaurant(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-3xl" />
        <div className="h-10 bg-neutral-200 dark:bg-neutral-800 rounded-xl w-1/3" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Restaurant not found</h2>
        <Link to="/restaurants" className="text-[#FF6B35] underline text-sm mt-3 inline-block">
          Back to all restaurants
        </Link>
      </div>
    );
  }

  // Filter foods by menu search and active category tab
  const foods = restaurant.foods || [];
  const menuCategories = ['All', ...new Set(foods.map(f => f.category))];

  const filteredFoods = foods.filter(food => {
    const matchesCategory = activeTab === 'All' || food.category === activeTab;
    const matchesSearch = food.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                          food.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Restaurant Header Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-neutral-100 dark:border-neutral-800 aspect-[21/9] sm:aspect-[21/7] w-full">
        <img
          src={restaurant.bannerImage || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[11px] font-black uppercase">
                {restaurant.isOpen ? 'Open Now' : 'Closed'}
              </span>
              <span className="text-xs text-neutral-300 font-medium">{restaurant.cuisine?.join(' • ')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">{restaurant.name}</h1>
            <p className="text-xs text-neutral-300 max-w-xl">{restaurant.description}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-white flex items-center gap-1.5 font-bold shadow-md">
              <Star className="w-4 h-4 fill-current text-amber-500" />
              <span>{restaurant.rating}</span>
              <span className="text-[10px] text-neutral-400">({restaurant.totalRatings}+)</span>
            </div>
            <div className="px-3.5 py-2 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md text-neutral-900 dark:text-white flex items-center gap-1.5 font-bold shadow-md">
              <Clock className="w-4 h-4 text-[#FF6B35]" />
              <span>{restaurant.deliveryTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#FF6B35]" />
          <span>{restaurant.address?.street}, {restaurant.address?.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#FFC857]" />
          <span>{restaurant.offerBadge}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>FSSAI Hygiene Standard Certified Partner</span>
        </div>
      </div>

      {/* Menu Navigation & Search */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          {/* Categories Tab */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === cat
                    ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search inside menu */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="Search in menu..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#FF6B35]"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>

      </div>

    </div>
  );
};

export default RestaurantDetails;

