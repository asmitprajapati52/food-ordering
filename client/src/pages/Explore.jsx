import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Star, 
  Check, 
  X,
  ArrowUpDown,
  Utensils
} from 'lucide-react';
import api from '../services/api';
import FoodCard from '../components/FoodCard';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [dietary, setDietary] = useState(searchParams.get('isVeg') || 'all'); // 'all', 'veg', 'nonveg'
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Sync URL search params with state
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSearch = searchParams.get('search');
    
    setSelectedCategory(urlCategory || 'All');
    setSearch(urlSearch || '');
  }, [searchParams]);

  // Query whenever any filter or search changes
  useEffect(() => {
    fetchFilteredFoods(search);
  }, [searchParams, selectedCategory, dietary, sortBy, priceRange, minRating]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFilteredFoods = async (currentSearch = search) => {
    try {
      setLoading(true);
      let query = [];

      if (currentSearch && currentSearch.trim()) {
        query.push(`search=${encodeURIComponent(currentSearch.trim())}`);
      }
      if (selectedCategory && selectedCategory !== 'All') {
        query.push(`category=${encodeURIComponent(selectedCategory)}`);
      }
      if (dietary === 'veg') query.push('isVeg=true');
      if (dietary === 'nonveg') query.push('isVeg=false');
      if (priceRange < 1000) query.push(`maxPrice=${priceRange}`);
      if (minRating > 0) query.push(`minRating=${minRating}`);

      if (sortBy === 'price_asc') query.push('sort=price_asc');
      else if (sortBy === 'price_desc') query.push('sort=price_desc');
      else if (sortBy === 'rating') query.push('sort=rating');

      const url = `/foods${query.length ? `?${query.join('&')}` : ''}`;
      const { data } = await api.get(url);
      setFoods(data);
    } catch (err) {
      console.error('Error fetching foods:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search.trim()) {
      newParams.set('search', search.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
    fetchFilteredFoods(search);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
  };

  const handleClearSearch = () => {
    setSearch('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
    fetchFilteredFoods('');
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setDietary('all');
    setSortBy('popular');
    setPriceRange(1000);
    setMinRating(0);
    setSearch('');
    setSearchParams({});
    fetchFilteredFoods('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Explore All Delicacies
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Browse through hundreds of freshly cooked recipes tailored for your cravings
          </p>
        </div>

        {/* Global Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search dish, ingredient or kitchen..."
            className="w-full pl-11 pr-20 py-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-medium focus:ring-2 focus:ring-[#FF6B35]/40 outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
          
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-14 top-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924] transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Active Search / Category Indicator */}
      {(search || selectedCategory !== 'All') && (
        <div className="flex items-center gap-2 mb-6 text-xs flex-wrap">
          <span className="text-neutral-500 font-medium">Active filters:</span>
          {search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-[#FF6B35] font-bold">
              <span>"{search}"</span>
              <button onClick={handleClearSearch}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
              <span>{selectedCategory}</span>
              <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button 
            onClick={resetFilters}
            className="text-[#FF6B35] font-bold hover:underline ml-2"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Categories Horizontal Carousel Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          onClick={() => {
            setSelectedCategory('All');
            const newParams = new URLSearchParams(searchParams);
            newParams.delete('category');
            setSearchParams(newParams);
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-500/20'
              : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300'
          }`}
        >
          All Cuisines
        </button>
        {categories.map((c) => (
          <button
            key={c._id || c.name}
            onClick={() => {
              setSelectedCategory(c.name);
              const newParams = new URLSearchParams(searchParams);
              newParams.set('category', c.name);
              setSearchParams(newParams);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === c.name
                ? 'bg-[#FF6B35] text-white shadow-md shadow-orange-500/20'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300'
            }`}
          >
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Main Content Layout: Sidebar Filters + Foods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Controls Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-6 sticky top-28">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center gap-2 font-bold text-sm text-neutral-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-[#FF6B35]" />
                <span>Filters & Sorting</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-[#FF6B35] hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 outline-none focus:ring-1 focus:ring-[#FF6B35]"
              >
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Dietary Preference (Veg / Non-veg) */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                Dietary Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setDietary('all')}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    dietary === 'all'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 border-transparent shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDietary('veg')}
                  className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    dietary === 'veg'
                      ? 'bg-emerald-600 text-white border-transparent shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-700 text-emerald-600'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span>Veg</span>
                </button>
                <button
                  onClick={() => setDietary('nonveg')}
                  className={`py-2 text-xs font-bold rounded-xl border flex items-center justify-center gap-1 transition-all ${
                    dietary === 'nonveg'
                      ? 'bg-rose-600 text-white border-transparent shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-700 text-rose-600'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-current" />
                  <span>Non-Veg</span>
                </button>
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold uppercase tracking-wider text-neutral-400">Max Price</span>
                <span className="font-black text-neutral-900 dark:text-white">₹{priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#FF6B35] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>₹100</span>
                <span>₹500</span>
                <span>₹1000+</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                Minimum Rating
              </label>
              <div className="flex items-center gap-2">
                {[0, 4.0, 4.5, 4.8].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      minRating === rating
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★`}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Right Foods Grid Area */}
        <main className="lg:col-span-3">
          
          {/* Header count info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-neutral-500">
              Showing <span className="text-neutral-900 dark:text-white font-extrabold">{foods.length}</span> delicious items
              {search && <span> for "<span className="text-[#FF6B35]">{search}</span>"</span>}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-3xl h-72" />
              ))}
            </div>
          ) : foods.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-neutral-800 rounded-3xl border border-neutral-100 dark:border-neutral-700 p-8">
              <div className="w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-950 text-[#FF6B35] flex items-center justify-center mx-auto mb-4 text-2xl">
                🍲
              </div>
              <h3 className="text-lg font-black text-neutral-900 dark:text-white">No dishes found</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                We couldn't find any food items matching "{search || selectedCategory}". Try searching for popular items like "pizza", "biryani", or "burger".
              </p>
              <button
                onClick={resetFilters}
                className="mt-5 px-6 py-2.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924] transition-colors"
              >
                Reset Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {foods.map((food) => (
                <FoodCard key={food._id} food={food} />
              ))}
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

export default Explore;
