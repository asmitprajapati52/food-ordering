import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(food._id);

  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Link to={`/food/${food._id}`}>
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
          <div className={`w-3.5 h-3.5 rounded-sm border-2 flex items-center justify-center ${
            food.isVeg ? 'border-emerald-600' : 'border-rose-600'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${
              food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
            }`} />
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(food);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            wishlisted
              ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
              : 'bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-300 hover:text-red-500'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Best Seller / Recommended Ribbon */}
        {food.isBestSeller && (
          <span className="absolute bottom-3 left-3 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-[#FF6B35] text-white shadow-md">
            Best Seller
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Restaurant & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300 truncate max-w-[150px]">
              {food.restaurantName}
            </span>
            <div className="flex items-center gap-1 font-bold text-neutral-800 dark:text-neutral-100 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-md text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>{food.rating || 4.5}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/food/${food._id}`} className="block group-hover:text-[#FF6B35] transition-colors">
            <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1">
              {food.name}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {food.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-neutral-900 dark:text-white">
                ₹{food.price}
              </span>
              {food.originalPrice && food.originalPrice > food.price && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{food.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(food)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white font-bold text-xs transition-all duration-200 transform active:scale-95 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default FoodCard;

