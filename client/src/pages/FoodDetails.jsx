import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Clock, 
  UtensilsCrossed, 
  ArrowLeft 
} from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import FoodCard from '../components/FoodCard';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState([]);
  const [specialNote, setSpecialNote] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    fetchFoodDetails();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/foods/${id}`);
      setFood(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomizationToggle = (optionName) => {
    setSelectedCustomizations(prev => 
      prev.includes(optionName)
        ? prev.filter(item => item !== optionName)
        : [...prev, optionName]
    );
  };

  const handleAddToCart = () => {
    if (food) {
      addToCart(food, quantity, selectedCustomizations, specialNote);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-96 bg-neutral-200 dark:bg-neutral-800 rounded-3xl" />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold">Food item not found</h2>
        <Link to="/explore" className="text-[#FF6B35] underline text-sm mt-3 inline-block">
          Back to exploration
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(food._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Back button */}
      <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-[#FF6B35] transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Menu</span>
      </Link>

      {/* Main Food Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Food Image */}
        <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-neutral-100 shadow-xl border border-neutral-100 dark:border-neutral-800 aspect-square">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />

          {/* Veg badge */}
          <div className="absolute top-4 left-4 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md p-2 rounded-xl shadow-md">
            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${
              food.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`} />
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(food)}
            className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
              wishlisted
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 hover:text-red-500'
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Right Details & Configuration */}
        <div className="lg:col-span-6 space-y-6">
          
          <div>
            <Link 
              to={`/restaurant/${food.restaurant?._id || food.restaurant}`}
              className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] hover:underline"
            >
              {food.restaurantName}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1">
              {food.name}
            </h1>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1 font-bold text-xs bg-amber-500 text-white px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{food.rating || 4.8}</span>
              </div>
              <span className="text-xs text-neutral-400">({food.numReviews || 120} reviews)</span>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1 text-xs text-neutral-500">
                <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>Prep: {food.prepTime || '20-25 mins'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-neutral-900 dark:text-white">
              ₹{food.price}
            </span>
            {food.originalPrice && (
              <span className="text-base text-neutral-400 line-through">
                ₹{food.originalPrice}
              </span>
            )}
            {food.originalPrice && (
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                {Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {food.description}
          </p>

          {/* Ingredients */}
          {food.ingredients && food.ingredients.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                Key Ingredients
              </h4>
              <div className="flex flex-wrap gap-2">
                {food.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization Options */}
          {food.customizations && food.customizations.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              {food.customizations.map((custom, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
                    {custom.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {custom.options?.map((opt, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleCustomizationToggle(opt.name)}
                        className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                          selectedCustomizations.includes(opt.name)
                            ? 'border-[#FF6B35] bg-orange-50 dark:bg-orange-950/30 text-[#FF6B35]'
                            : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span>{opt.name}</span>
                        {opt.price > 0 && <span className="text-[11px] text-neutral-400">+₹{opt.price}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions Note */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
              Special Instructions
            </label>
            <textarea
              rows="2"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Less spicy, dressing on side, no onions..."
              className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white outline-none focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>

          {/* Quantity Selector & Add To Cart Button */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center rounded-2xl border border-neutral-200 dark:border-neutral-700 p-1 bg-neutral-50 dark:bg-neutral-800">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-black text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-black text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart • ₹{food.price * quantity}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Related Food Recommendations */}
      {food.relatedFoods && food.relatedFoods.length > 0 && (
        <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#FF6B35]">More from this category</span>
            <h3 className="text-2xl font-black text-neutral-900 dark:text-white mt-0.5">
              You Might Also Like
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {food.relatedFoods.map((relFood) => (
              <FoodCard key={relFood._id} food={relFood} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default FoodDetails;

