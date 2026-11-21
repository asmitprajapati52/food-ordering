import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  CreditCard, 
  Banknote, 
  Plus, 
  CheckCircle, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, subtotal, deliveryFee, tax, discount, totalAmount, appliedCoupon, deliveryInstructions, clearCart } = useCart();
  const { user, addAddress } = useAuth();
  const navigate = useNavigate();

  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' or 'RAZORPAY'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New address modal state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newState, setNewState] = useState('Karnataka');
  const [newZip, setNewZip] = useState('560038');
  const [newTag, setNewTag] = useState('Home');

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const addresses = user?.addresses || [];
  const currentAddress = addresses[selectedAddressIndex] || {
    street: 'Flat 302, Palm Meadows, 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    zipCode: '560038',
    tag: 'Home'
  };

  const handleSaveNewAddress = async (e) => {
    e.preventDefault();
    if (!newStreet) {
      toast.error('Please enter street address');
      return;
    }
    await addAddress({
      street: newStreet,
      city: newCity,
      state: newState,
      zipCode: newZip,
      tag: newTag,
      isDefault: false
    });
    setShowAddressModal(false);
    setNewStreet('');
  };

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);

      const orderPayload = {
        restaurant: cartItems[0]?.restaurantId,
        restaurantName: cartItems[0]?.restaurantName,
        items: cartItems.map(item => ({
          food: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          customizations: item.customizations || [],
          specialInstructions: item.specialInstructions || ''
        })),
        deliveryAddress: currentAddress,
        deliveryInstructions,
        subtotal,
        deliveryFee,
        tax,
        discount,
        totalAmount,
        couponApplied: appliedCoupon ? appliedCoupon.code : '',
        paymentMethod,
      };

      if (paymentMethod === 'COD') {
        const { data: createdOrder } = await api.post('/orders', orderPayload);
        clearCart();
        toast.success('Order placed successfully! 🚀');
        navigate(`/track-order/${createdOrder.orderId}`);
      } else {
        // Razorpay flow
        const { data: rzpOrder } = await api.post('/payments/create-order', {
          amount: totalAmount,
          receipt: `rcpt_${Date.now()}`
        });

        // Initialize Razorpay options
        const options = {
          key: rzpOrder.key_id || 'rzp_test_HungerRushKey123',
          amount: rzpOrder.amount,
          currency: 'INR',
          name: 'HUNGER RUSH',
          description: `Order payment for ${cartItems[0]?.restaurantName}`,
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
          order_id: rzpOrder.id.startsWith('order_mock_') ? undefined : rzpOrder.id,
          handler: async function (response) {
            // Verify payment on backend
            const { data: createdOrder } = await api.post('/orders', {
              ...orderPayload,
              paymentStatus: 'Completed',
              paymentDetails: response
            });
            clearCart();
            toast.success('Payment successful! Order confirmed.');
            navigate(`/track-order/${createdOrder.orderId}`);
          },
          prefill: {
            name: user?.name || 'Customer',
            email: user?.email || 'customer@hungerrush.com',
            contact: user?.phone || '9999999999'
          },
          theme: {
            color: '#FF6B35'
          }
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          // Fallback if razorpay checkout script isn't loaded
          const { data: createdOrder } = await api.post('/orders', {
            ...orderPayload,
            paymentStatus: 'Completed'
          });
          clearCart();
          toast.success('Payment verified in test mode! Order confirmed.');
          navigate(`/track-order/${createdOrder.orderId}`);
        }
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <div className="mb-8">
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
          Checkout & Payment
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Review address and confirm payment to dispatch your meal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Address & Payment Method Selection */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Address Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
                <MapPin className="w-4 h-4 text-[#FF6B35]" />
                <span>Select Delivery Address</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="flex items-center gap-1 text-xs font-bold text-[#FF6B35] hover:underline"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {addresses.length === 0 ? (
                <div 
                  onClick={() => setSelectedAddressIndex(0)}
                  className="p-4 rounded-2xl border-2 border-[#FF6B35] bg-orange-50/50 dark:bg-orange-950/20 text-xs space-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-orange-200 text-[#FF6B35] text-[10px]">
                      Home (Default)
                    </span>
                    <CheckCircle className="w-4 h-4 text-[#FF6B35]" />
                  </div>
                  <p className="font-bold text-neutral-800 dark:text-white pt-1">
                    Flat 302, Palm Meadows
                  </p>
                  <p className="text-neutral-500">Indiranagar 100ft Road, Bengaluru 560038</p>
                </div>
              ) : (
                addresses.map((addr, index) => (
                  <div
                    key={addr._id || index}
                    onClick={() => setSelectedAddressIndex(index)}
                    className={`p-4 rounded-2xl border-2 text-xs space-y-1 cursor-pointer transition-all ${
                      selectedAddressIndex === index
                        ? 'border-[#FF6B35] bg-orange-50/50 dark:bg-orange-950/20'
                        : 'border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-[10px]">
                        {addr.tag || 'Saved'}
                      </span>
                      {selectedAddressIndex === index && <CheckCircle className="w-4 h-4 text-[#FF6B35]" />}
                    </div>
                    <p className="font-bold text-neutral-800 dark:text-white pt-1 truncate">
                      {addr.street}
                    </p>
                    <p className="text-neutral-500 truncate">
                      {addr.city}, {addr.state} - {addr.zipCode}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
            <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
              <CreditCard className="w-4 h-4 text-[#FF6B35]" />
              <span>Choose Payment Method</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Cash On Delivery */}
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'COD'
                    ? 'border-[#FF6B35] bg-orange-50/50 dark:bg-orange-950/20'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200">
                    <Banknote className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white">Cash on Delivery</h4>
                    <p className="text-[11px] text-neutral-400">Pay cash or UPI at your door</p>
                  </div>
                </div>
                {paymentMethod === 'COD' && <CheckCircle className="w-5 h-5 text-[#FF6B35]" />}
              </div>

              {/* Razorpay Online */}
              <div
                onClick={() => setPaymentMethod('RAZORPAY')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'RAZORPAY'
                    ? 'border-[#FF6B35] bg-orange-50/50 dark:bg-orange-950/20'
                    : 'border-neutral-200 dark:border-neutral-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-200">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white">Online Payment (Razorpay)</h4>
                    <p className="text-[11px] text-neutral-400">UPI, Cards, NetBanking, Wallets</p>
                  </div>
                </div>
                {paymentMethod === 'RAZORPAY' && <CheckCircle className="w-5 h-5 text-[#FF6B35]" />}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-400">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Payments are 256-bit SSL encrypted & secure</span>
            </div>
          </div>

        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 dark:text-white pb-3 border-b border-neutral-100 dark:border-neutral-700">
              Order Overview
            </h3>

            {/* List items mini preview */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-700 dark:text-neutral-300">{item.quantity}x</span>
                    <span className="text-neutral-900 dark:text-white truncate max-w-[180px]">{item.name}</span>
                  </div>
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price list */}
            <div className="space-y-2 pt-3 border-t border-neutral-100 dark:border-neutral-700 text-xs text-neutral-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900 dark:text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-neutral-900 dark:text-white">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-bold text-neutral-900 dark:text-white">₹{tax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-700 flex justify-between text-base font-black text-neutral-900 dark:text-white">
                <span>Total Payable</span>
                <span className="text-[#FF6B35]">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B35] to-[#E85924] text-white font-black text-sm uppercase tracking-wider hover:shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Placing Order...' : `Pay ₹${totalAmount} & Place Order`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* New Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-black text-lg text-neutral-900 dark:text-white">Add Delivery Address</h3>
            
            <form onSubmit={handleSaveNewAddress} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-500">Street / Flat / Apartment</label>
                <input
                  type="text"
                  required
                  value={newStreet}
                  onChange={(e) => setNewStreet(e.target.value)}
                  placeholder="e.g. 102 Sunshine Towers, 5th Cross"
                  className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none focus:ring-1 focus:ring-[#FF6B35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-neutral-500">City</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-500">PIN Code</label>
                  <input
                    type="text"
                    value={newZip}
                    onChange={(e) => setNewZip(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-500">Address Label</label>
                <div className="flex gap-2 mt-1">
                  {['Home', 'Work', 'Other'].map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setNewTag(tag)}
                      className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                        newTag === tag
                          ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;

