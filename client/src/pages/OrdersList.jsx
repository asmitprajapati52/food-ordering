import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

export const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders/my-orders');
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-pulse">
        <p className="text-sm font-bold text-neutral-400">Loading order history...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-100 text-[#FF6B35] flex items-center justify-center mx-auto mb-4 text-3xl">
          📦
        </div>
        <h2 className="text-2xl font-black">No past orders yet</h2>
        <p className="text-xs text-neutral-500 mt-1">Start by discovering your favorite restaurant meals.</p>
        <Link
          to="/explore"
          className="mt-5 inline-block px-6 py-2.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold"
        >
          Explore Food
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Your Orders</h1>
        <p className="text-xs text-neutral-500 mt-1">Track live status and view past order receipts</p>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord._id}
            className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100 dark:border-neutral-700">
              <div>
                <span className="font-mono font-black text-sm text-neutral-900 dark:text-white">
                  Order #{ord.orderId}
                </span>
                <p className="text-xs text-neutral-400">
                  {new Date(ord.createdAt).toLocaleDateString()} at {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-orange-100 text-[#FF6B35]">
                  {ord.orderStatus}
                </span>
                <Link
                  to={`/track-order/${ord.orderId}`}
                  className="px-4 py-2 rounded-xl bg-[#171717] dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:bg-[#FF6B35] transition-colors flex items-center gap-1.5"
                >
                  <span>Track</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-3">
              <div>
                <p className="font-bold text-neutral-800 dark:text-white">{ord.restaurantName}</p>
                <p className="text-neutral-500">
                  {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-neutral-400">Total Paid ({ord.paymentMethod})</p>
                <p className="text-base font-black text-[#FF6B35]">₹{ord.totalAmount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

