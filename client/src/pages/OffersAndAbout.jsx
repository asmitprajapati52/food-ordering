import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const Offers = () => {
  const [coupons, setCoupons] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data } = await api.get('/coupons');
      setCoupons(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#FF6B35]">
          <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Exclusive Promotions</span>
        </div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white mt-1">
          Deals, Offers & Discount Codes
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Apply these coupon codes during checkout to unlock mouthwatering discounts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border-2 border-dashed border-orange-200 dark:border-neutral-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#FF6B35] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-black px-3 py-1 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-[#FF6B35]">
                  {coupon.code}
                </span>
                <span className="text-xs font-black text-emerald-600">
                  {coupon.discountPercentage}% OFF
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">
                {coupon.description}
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between">
              <div className="text-[11px] text-neutral-400">
                <span>Min: ₹{coupon.minOrderAmount}</span> • <span>Max: ₹{coupon.maxDiscount}</span>
              </div>

              <button
                onClick={() => handleCopy(coupon.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:bg-[#FF6B35] transition-colors"
              >
                {copiedCode === coupon.code ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode === coupon.code ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Our Mission</span>
        <h1 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
          Cravings Delivered at Lightning Speed.
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          HUNGER RUSH was founded on a simple belief: nobody should have to compromise between food quality and delivery speed. We connect the top gourmet culinary artisans with hungry food lovers across the city.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto text-2xl">
            ⚡
          </div>
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">Sub-30 Min Dispatch</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Our smart dispatch algorithms ensure meals leave the kitchen when hot and arrive crisp at your table.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto text-2xl">
            🌟
          </div>
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">Curated Kitchens</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Only top 4.5+ rated restaurants with stellar hygiene certifications make it to the Hunger Rush roster.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
            🌱
          </div>
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">Eco Packaging</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            100% bio-degradable, spill-proof thermal containers that lock in heat without harming the planet.
          </p>
        </div>
      </div>
    </div>
  );
};

