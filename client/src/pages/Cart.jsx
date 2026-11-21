import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Tag, 
  Check, 
  Percent, 
  ShieldCheck, 
  Utensils 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    deliveryFee, 
    tax, 
    discount, 
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    restaurantName,
    deliveryInstructions,
    setDeliveryInstructions
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponInput.trim().toUpperCase());
    setIsApplyingCoupon(false);
  };

  const handleCheckoutClick = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-orange-100 dark:bg-orange-950 text-[#FF6B35] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
          🛒
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
          Your Cart is Empty!
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mt-2 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore top dishes from popular kitchens near you.
        </p>
        <Link
          to="/explore"
          className="mt-6 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF6B35] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-[#E85924] transition-all shadow-lg shadow-orange-500/25 active:scale-95"
        >
          <span>Find Delicious Food</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-8">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
            Review Your Order
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Ordering from <span className="font-bold text-[#FF6B35]">{restaurantName}</span>
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-sm border flex items-center justify-center ${
                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`} />
                    </div>
                    <h3 className="font-extrabold text-sm text-neutral-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-xs font-black text-neutral-800 dark:text-neutral-200">
                    ₹{item.price}
                  </p>

                  {item.customizations && item.customizations.length > 0 && (
                    <p className="text-[11px] text-neutral-400">
                      {item.customizations.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity Changer */}
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 p-1">
                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}

          {/* Delivery Instructions note */}
          <div className="p-5 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-400">
              Delivery Instructions for Rider
            </label>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Ring bell and leave at front door, call on arrival..."
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-medium outline-none focus:ring-1 focus:ring-[#FF6B35]"
            />
          </div>

        </div>

        {/* Right Checkout & Price Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Coupon Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-neutral-400">
              <Tag className="w-4 h-4 text-[#FF6B35]" />
              <span>Apply Promo Coupon</span>
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">{appliedCoupon.code} applied! Saved ₹{discount}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Try: RUSH50, WELCOME100"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-xs font-mono font-bold uppercase outline-none focus:ring-1 focus:ring-[#FF6B35]"
                />
                <button
                  type="submit"
                  disabled={isApplyingCoupon}
                  className="px-5 py-2.5 rounded-xl bg-[#171717] dark:bg-white text-white dark:text-neutral-900 text-xs font-black uppercase hover:bg-[#FF6B35] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-neutral-400">
              Tip: Use code <span className="font-bold text-neutral-700 dark:text-neutral-200">RUSH50</span> for 50% discount up to ₹150.
            </div>
          </div>

          {/* Bill Details */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-700">
              Bill Summary
            </h3>

            <div className="space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span className="font-bold text-neutral-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee {subtotal > 499 && <span className="text-emerald-500 font-bold">(FREE)</span>}</span>
                <span className="font-bold text-neutral-900 dark:text-white">
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant GST & Service Tax (5%)</span>
                <span className="font-bold text-neutral-900 dark:text-white">₹{tax}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 flex justify-between text-base font-black text-neutral-900 dark:text-white">
                <span>To Pay</span>
                <span className="text-[#FF6B35]">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handleCheckoutClick}
              className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-black text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Cart;

