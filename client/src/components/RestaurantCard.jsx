import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Tag } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Link
      to={`/restaurant/${restaurant._id}`}
      className="group bg-white dark:bg-neutral-800 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Restaurant Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Offer badge */}
        {restaurant.offerBadge && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-600/90 backdrop-blur-sm text-white text-xs font-bold shadow-md">
            <Tag className="w-3 h-3 text-[#FFC857]" />
            <span>{restaurant.offerBadge}</span>
          </div>
        )}

        {/* Delivery Time Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm text-neutral-800 dark:text-neutral-100 text-xs font-bold shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>{restaurant.deliveryTime}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-extrabold text-lg text-neutral-900 dark:text-white group-hover:text-[#FF6B35] transition-colors truncate">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 font-bold text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-lg shadow-sm">
              <Star className="w-3 h-3 fill-current" />
              <span>{restaurant.rating}</span>
            </div>
          </div>

          {/* Cuisines */}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate">
            {restaurant.cuisine?.join(', ')}
          </p>

          <p className="text-xs text-neutral-400 mt-2 line-clamp-1">
            {restaurant.tagline || restaurant.description}
          </p>
        </div>

        {/* Bottom meta */}
        <div className="pt-4 mt-3 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>{restaurant.address?.area || 'Indiranagar'}</span>
          </div>
          <span className="font-bold text-neutral-700 dark:text-neutral-300">
            ₹{restaurant.deliveryFee} delivery fee
          </span>
        </div>

      </div>
    </Link>
  );
};

export default RestaurantCard;

