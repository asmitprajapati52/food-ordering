import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ChefHat, 
  Bike, 
  Store, 
  PackageCheck,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const statusSteps = [
    { label: 'Order Placed', desc: 'Order received by Hunger Rush', icon: Store },
    { label: 'Restaurant Confirmed', desc: 'Kitchen acknowledged order', icon: CheckCircle2 },
    { label: 'Preparing Food', desc: 'Chef is crafting your meal with love', icon: ChefHat },
    { label: 'Out for Delivery', desc: 'Rider is zooming towards your location', icon: Bike },
    { label: 'Delivered', desc: 'Delivered & ready to feast', icon: PackageCheck },
  ];

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000); // 10s polling for live simulation
    return () => clearInterval(interval);
  }, [id]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Simulation button for user testing to simulate next status
  const handleSimulateNextStep = async () => {
    if (!order) return;
    const currentIndex = statusSteps.findIndex(s => s.label === order.orderStatus);
    if (currentIndex < statusSteps.length - 1) {
      const nextStatus = statusSteps[currentIndex + 1].label;
      try {
        setUpdating(true);
        const { data } = await api.put(`/orders/${order._id}/status`, {
          status: nextStatus,
          note: `Live tracking simulation moved status to ${nextStatus}`
        });
        setOrder(data);
        toast.success(`Order updated to: ${nextStatus}!`);
      } catch (err) {
        toast.error('Simulation update failed');
      } finally {
        setUpdating(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-pulse">
        <p className="text-sm font-bold text-neutral-400">Loading order tracking telemetry...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/orders" className="text-[#FF6B35] underline text-sm mt-3 inline-block">
          View all orders
        </Link>
      </div>
    );
  }

  const currentStepIndex = statusSteps.findIndex(s => s.label === order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#171717] to-neutral-900 text-white shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-black uppercase tracking-widest text-[#FFC857]">
              Live Order Tracker
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Order #{order.orderId}
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md flex items-center gap-3">
            <Clock className="w-8 h-8 text-[#FF6B35]" />
            <div>
              <p className="text-[10px] uppercase font-bold text-neutral-300">Estimated Delivery</p>
              <p className="text-lg font-black text-white">{order.estimatedDeliveryTime || '25-35 mins'}</p>
            </div>
          </div>
        </div>

        {/* Live Simulation Control Button */}
        {order.orderStatus !== 'Delivered' && (
          <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-neutral-400">
              Interactive Mode: Test simulated live delivery progression
            </p>
            <button
              onClick={handleSimulateNextStep}
              disabled={updating}
              className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E85924] text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${updating ? 'animate-spin' : ''}`} />
              <span>Simulate Next Delivery Status</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Timeline Stepper */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-8">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
          Delivery Progress
        </h3>

        <div className="relative">
          {/* Stepper items */}
          <div className="space-y-8 sm:space-y-0 sm:flex sm:items-start sm:justify-between relative">
            {statusSteps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 flex-1 relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                    isCompleted
                      ? 'bg-gradient-to-br from-[#FF6B35] to-[#E85924] text-white scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h4 className={`text-xs font-extrabold ${
                      isCompleted ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'
                    }`}>
                      {step.label}
                    </h4>
                    <p className="text-[11px] text-neutral-400 max-w-[120px] mx-auto mt-0.5 hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Restaurant & Destination */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400">
            Delivery Information
          </h4>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <Store className="w-4 h-4 text-[#FF6B35] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">{order.restaurantName}</p>
                <p className="text-neutral-500">Kitchen partner</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {order.deliveryAddress?.street}
                </p>
                <p className="text-neutral-500">
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.zipCode} ({order.deliveryAddress?.tag})
                </p>
              </div>
            </div>

            {order.deliveryInstructions && (
              <div className="p-3 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 text-neutral-600 dark:text-neutral-300">
                <span className="font-bold text-[#FF6B35]">Rider Note:</span> {order.deliveryInstructions}
              </div>
            )}
          </div>
        </div>

        {/* Items & Payment */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
          <h4 className="font-extrabold text-xs uppercase tracking-wider text-neutral-400">
            Payment & Items ({order.items?.length})
          </h4>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-xs">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span className="text-neutral-800 dark:text-neutral-200">
                  <span className="font-bold">{item.quantity}x</span> {item.name}
                </span>
                <span className="font-bold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 space-y-1 text-xs text-neutral-500">
            <div className="flex justify-between">
              <span>Payment Mode</span>
              <span className="font-bold text-neutral-800 dark:text-white uppercase">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status</span>
              <span className={`font-bold ${order.paymentStatus === 'Completed' ? 'text-emerald-600' : 'text-amber-500'}`}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between text-sm font-black text-neutral-900 dark:text-white pt-2">
              <span>Total Paid</span>
              <span className="text-[#FF6B35]">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default OrderTracking;

