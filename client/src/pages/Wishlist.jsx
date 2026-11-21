import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import FoodCard from '../components/FoodCard';

export const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4 text-3xl">
          ❤️
        </div>
        <h2 className="text-2xl font-black">Your Wishlist is Empty</h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
          Save your most craved burgers, pizzas, and biryanis to quickly order them anytime.
        </p>
        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FF6B35] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#E85924]"
        >
          <span>Browse Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Your Saved Favorites</h1>
        <p className="text-xs text-neutral-500 mt-1">Click ADD to quickly move any favorite dish straight to your cart</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

