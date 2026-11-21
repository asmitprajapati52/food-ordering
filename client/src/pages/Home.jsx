import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Flame, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Percent, 
  Star, 
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import api from '../services/api';
import FoodCard from '../components/FoodCard';
import RestaurantCard from '../components/RestaurantCard';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [offers, setOffers] = useState([]);
  const [searchHero, setSearchHero] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      const [catRes, restRes, foodRes, couponRes] = await Promise.all([
        api.get('/categories'),
        api.get('/restaurants?featured=true'),
        api.get('/foods?bestSeller=true'),
        api.get('/coupons')
      ]);

      setCategories(catRes.data);
      setRestaurants(restRes.data);
      setBestSellers(foodRes.data);
      setOffers(couponRes.data);
    } catch (err) {
      console.error('Error fetching home data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchHero.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchHero.trim())}`);
    }
  };

  return (
    <div className="min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden hero-gradient pt-8 pb-20 lg:pt-16 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/90 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#FF6B35] font-extrabold text-xs tracking-wider uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>The Premier Food Delivery Experience</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-[#171717] dark:text-white tracking-tight leading-[1.12]">
                Your Favorite Food, <br />
                <span className="text-gradient">Delivered Fast!</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed font-normal">
                Discover delicious meals from the best restaurants near you. Handcrafted burgers, authentic stone-baked pizzas, slow-dum biryanis and healthy salad bowls delivered in under 30 minutes.
              </p>

              {/* Search Bar */}
              <form 
                onSubmit={handleHeroSearch}
                className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-white dark:bg-neutral-800 shadow-xl border border-neutral-100 dark:border-neutral-700 flex flex-col sm:flex-row items-center gap-2 max-w-2xl"
              >
                <div className="flex items-center gap-3 w-full px-3 py-2">
                  <Search className="w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    value={searchHero}
                    onChange={(e) => setSearchHero(e.target.value)}
                    placeholder="Search for restaurants, burgers, pizzas..."
                    className="w-full bg-transparent border-none text-sm font-medium text-neutral-800 dark:text-white placeholder-neutral-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl sm:rounded-full bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-extrabold text-sm hover:shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-95"
                >
                  <span>Explore Food</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6B35]" />
                  <span>30 Mins Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Contactless Hygiene</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>4.8+ Top Rated Kitchens</span>
                </div>
              </div>

            </div>

            {/* Right Visual with Floating badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Glow behind image */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400/30 to-amber-300/30 blur-3xl -z-10" />

                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 aspect-[4/5] object-cover">
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                    alt="Delicious Gourmet Feast"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-300">Featured Gourmet</p>
                    <h3 className="text-xl font-black">Wood-Fired Neapolitan Pizza</h3>
                    <p className="text-xs text-neutral-200 mt-1">Starting from ₹389 with free garlic dip</p>
                  </div>
                </div>

                {/* Floating Badge 1 - Super Fast Delivery */}
                <div className="absolute -top-6 -left-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-neutral-100 dark:border-neutral-800 flex items-center gap-3 animate-pulse">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-neutral-400 uppercase">Speed</p>
                    <p className="text-sm font-black text-neutral-900 dark:text-white">Under 25 mins</p>
                  </div>
                </div>

                {/* Floating Badge 2 - Rating badge */}
                <div className="absolute -bottom-6 -right-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-neutral-100 dark:border-neutral-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-black text-neutral-900 dark:text-white">4.9 / 5</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-medium">50k+ Happy Foodies</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FOOD CATEGORIES SECTION */}
      <section className="py-14 bg-white dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
                <Flame className="w-4 h-4 fill-current" />
                <span>What's on your mind?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
                Explore Popular Categories
              </h2>
            </div>
            <Link
              to="/explore"
              className="hidden sm:flex items-center gap-1 text-xs font-bold text-[#FF6B35] hover:text-[#E85924] transition-colors"
            >
              <span>View All Menu</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id || cat.slug}
                to={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="group relative rounded-3xl p-4 bg-orange-50/40 dark:bg-neutral-800/60 border border-orange-100/50 dark:border-neutral-700/50 hover:bg-orange-100/60 dark:hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 shadow-md border-2 border-white dark:border-neutral-700 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white group-hover:text-[#FF6B35] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {cat.itemCount ? `${cat.itemCount} items` : 'Explore'}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PROMOTIONAL OFFERS BANNER */}
      {offers.length > 0 && (
        <section className="py-12 bg-neutral-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-orange-600 to-amber-600 shadow-2xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Percent className="w-5 h-5 text-[#FFC857]" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-amber-200">Exclusive Hunger Rush Pass</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Get 50% OFF up to ₹150 on your cravings!
                </h3>
                <p className="text-xs sm:text-sm text-orange-100 max-w-lg">
                  Use coupon code <span className="font-mono font-bold bg-white text-neutral-900 px-2 py-0.5 rounded-md">RUSH50</span> during checkout. Valid for Indiranagar & Koramangala kitchens.
                </p>
              </div>

              <Link
                to="/explore"
                className="px-6 py-3.5 rounded-full bg-white text-[#171717] font-black text-xs uppercase tracking-wider hover:bg-neutral-100 shadow-lg transition-transform active:scale-95 whitespace-nowrap"
              >
                Claim Discount Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4. POPULAR RESTAURANTS */}
      <section className="py-16 bg-[#FFFDF8] dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
                <TrendingUp className="w-4 h-4" />
                <span>Top Rated Culinary Spots</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
                Popular Restaurants Near You
              </h2>
            </div>
            <Link
              to="/restaurants"
              className="text-xs font-bold text-[#FF6B35] hover:text-[#E85924] transition-colors flex items-center gap-1"
            >
              <span>See All Restaurants</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {restaurants.slice(0, 6).map((rest) => (
              <RestaurantCard key={rest._id} restaurant={rest} />
            ))}
          </div>

        </div>
      </section>

      {/* 5. BEST SELLERS SECTION */}
      <section className="py-16 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF6B35]">
                <Flame className="w-4 h-4 fill-current" />
                <span>Most Loved Dishes</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
                Hunger Rush Best Sellers
              </h2>
            </div>
            <Link
              to="/explore"
              className="text-xs font-bold text-[#FF6B35] hover:text-[#E85924] transition-colors flex items-center gap-1"
            >
              <span>Explore All Dishes</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 8).map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>

        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS & TESTIMONIALS */}
      <section className="py-16 bg-orange-50/50 dark:bg-neutral-950 border-t border-orange-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Customer Praises</span>
            <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight mt-1">
              Loved by 50,000+ Foodies
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">
              See why our diners refuse to order from anywhere else.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700/60 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                "The wood-fired truffle pizza from The Pizza Chronicle arrived steaming hot in 22 minutes! The crust was crispy and airy. Hunger Rush is leaps ahead in packaging quality."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                  alt="Sneha Kapoor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-bold text-xs text-neutral-900 dark:text-white">Sneha Kapoor</h5>
                  <p className="text-[11px] text-neutral-400">Indiranagar, Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700/60 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                "Royal Nawabi Dastarkhwan mutton dum biryani was pure perfection. The saffron aroma was mind blowing! Ordering on Hunger Rush takes literally three taps."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Rohan Verma"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-bold text-xs text-neutral-900 dark:text-white">Rohan Verma</h5>
                  <p className="text-[11px] text-neutral-400">Koramangala, Bengaluru</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700/60 space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                "As someone tracking macros, the Green Leaf avocado quinoa bowl saved my diet. Fresh ingredients, zero grease, and razor-sharp delivery timeline. 10/10!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Ananya Roy"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h5 className="font-bold text-xs text-neutral-900 dark:text-white">Ananya Roy</h5>
                  <p className="text-[11px] text-neutral-400">Lavelle Road, Bengaluru</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;

