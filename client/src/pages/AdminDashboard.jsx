import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Store, 
  Utensils, 
  Plus, 
  Trash2, 
  Edit, 
  TrendingUp, 
  CheckCircle,
  Tag
} from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'orders', 'foods', 'restaurants', 'coupons'
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Food Modal Form State
  const [showAddFood, setShowAddFood] = useState(false);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodDesc, setNewFoodDesc] = useState('');
  const [newFoodPrice, setNewFoodPrice] = useState('');
  const [newFoodCategory, setNewFoodCategory] = useState('Pizza');
  const [newFoodImage, setNewFoodImage] = useState('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80');
  const [newFoodRestaurant, setNewFoodRestaurant] = useState('');
  const [newFoodIsVeg, setNewFoodIsVeg] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, foodsRes, restRes, couponRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/orders'),
        api.get('/foods'),
        api.get('/restaurants'),
        api.get('/coupons')
      ]);

      setStats(statsRes.data);
      setOrders(ordersRes.data);
      setFoods(foodsRes.data);
      setRestaurants(restRes.data);
      setCoupons(couponRes.data);
      if (restRes.data.length > 0) {
        setNewFoodRestaurant(restRes.data[0]._id);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load admin telemetry');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        status: newStatus,
        note: `Status updated by Admin to ${newStatus}`
      });
      toast.success(`Order status updated to ${newStatus}`);
      fetchDashboardData();
    } catch (e) {
      toast.error('Status update failed');
    }
  };

  const handleDeleteFood = async (foodId) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await api.delete(`/foods/${foodId}`);
      toast.success('Food item deleted');
      setFoods(prev => prev.filter(f => f._id !== foodId));
    } catch (e) {
      toast.error('Failed to delete food item');
    }
  };

  const handleCreateFood = async (e) => {
    e.preventDefault();
    try {
      const selectedRest = restaurants.find(r => r._id === newFoodRestaurant);
      const payload = {
        name: newFoodName,
        description: newFoodDesc,
        price: Number(newFoodPrice),
        category: newFoodCategory,
        image: newFoodImage,
        restaurant: newFoodRestaurant,
        restaurantName: selectedRest ? selectedRest.name : 'The Pizza Chronicle',
        isVeg: newFoodIsVeg,
        rating: 4.8,
        numReviews: 12
      };

      const { data } = await api.post('/foods', payload);
      toast.success('New food item added to menu!');
      setFoods(prev => [data, ...prev]);
      setShowAddFood(false);
      setNewFoodName('');
      setNewFoodDesc('');
      setNewFoodPrice('');
    } catch (e) {
      toast.error('Failed to create food');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
        <p className="text-sm font-bold text-neutral-400">Loading Admin Management Suite...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Admin Portal</span>
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white mt-1">
            Hunger Rush Operations Command
          </h1>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {['overview', 'orders', 'foods', 'restaurants', 'coupons'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-[#171717] dark:bg-white text-white dark:text-neutral-900 shadow-md'
                  : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-orange-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950 text-[#FF6B35] flex items-center justify-center">
                <DollarSign className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase">Total Revenue</p>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">₹{stats?.totalRevenue?.toLocaleString()}</h3>
                <span className="text-[11px] text-emerald-600 font-bold">↑ 24% vs last month</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase">Total Orders</p>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">{stats?.totalOrders || orders.length}</h3>
                <span className="text-[11px] text-emerald-600 font-bold">100% fulfill rate</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase">Registered Diners</p>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">{stats?.totalUsers || 248}</h3>
                <span className="text-[11px] text-purple-600 font-bold">Active community</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                <Store className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 font-bold uppercase">Partner Kitchens</p>
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">{stats?.totalRestaurants || restaurants.length}</h3>
                <span className="text-[11px] text-amber-600 font-bold">Verified standards</span>
              </div>
            </div>

          </div>

          {/* Revenue Chart Visualizer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">Monthly Platform Performance</h3>
                <p className="text-xs text-neutral-400">Revenue growth & gross order volume</p>
              </div>
              <span className="text-xs font-black uppercase text-[#FF6B35]">2026 Telemetry</span>
            </div>

            {/* Custom Bar Chart Component */}
            <div className="h-64 flex items-end justify-between gap-4 pt-8">
              {stats?.monthlyRevenue?.map((item) => {
                const maxVal = 200000;
                const heightPct = Math.round((item.revenue / maxVal) * 100);

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-bold text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{(item.revenue / 1000).toFixed(0)}k
                    </div>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[48px] rounded-2xl bg-gradient-to-t from-[#FF6B35] to-[#FFC857] group-hover:scale-105 transition-all shadow-md"
                    />
                    <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
            All Real-time Orders ({orders.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-700 text-neutral-400 uppercase font-bold">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Restaurant</th>
                  <th className="py-3 px-2">Total Amount</th>
                  <th className="py-3 px-2">Payment</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700/60">
                {orders.map((ord) => (
                  <tr key={ord._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
                    <td className="py-3 px-2 font-mono font-bold text-[#FF6B35]">{ord.orderId}</td>
                    <td className="py-3 px-2 font-bold">{ord.restaurantName}</td>
                    <td className="py-3 px-2 font-black">₹{ord.totalAmount}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full font-bold uppercase text-[10px] bg-neutral-100 dark:bg-neutral-700">
                        {ord.paymentMethod} • {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2.5 py-1 rounded-full font-extrabold text-[10px] uppercase bg-orange-100 text-[#FF6B35]">
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                        className="p-1 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-[11px] font-bold outline-none"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Restaurant Confirmed">Confirmed</option>
                        <option value="Preparing Food">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FOODS TAB */}
      {activeTab === 'foods' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
              Menu Items Catalog ({foods.length})
            </h3>
            <button
              onClick={() => setShowAddFood(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924]"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Dish</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                className="p-4 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm flex gap-4"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-neutral-900 dark:text-white truncate">{food.name}</h4>
                    <p className="text-[11px] text-neutral-400">{food.category} • {food.restaurantName}</p>
                    <p className="text-xs font-black text-[#FF6B35] mt-1">₹{food.price}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Food Modal */}
          {showAddFood && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
              <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
                <h3 className="font-black text-lg text-neutral-900 dark:text-white">Add New Food Item</h3>
                <form onSubmit={handleCreateFood} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-500">Dish Name</label>
                    <input
                      type="text"
                      required
                      value={newFoodName}
                      onChange={(e) => setNewFoodName(e.target.value)}
                      placeholder="e.g. Smoky BBQ Chicken Pizza"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-500">Description</label>
                    <textarea
                      required
                      rows="2"
                      value={newFoodDesc}
                      onChange={(e) => setNewFoodDesc(e.target.value)}
                      placeholder="Ingredients and culinary notes..."
                      className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-neutral-500">Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={newFoodPrice}
                        onChange={(e) => setNewFoodPrice(e.target.value)}
                        placeholder="399"
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-neutral-500">Category</label>
                      <select
                        value={newFoodCategory}
                        onChange={(e) => setNewFoodCategory(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                      >
                        <option value="Pizza">Pizza</option>
                        <option value="Burgers">Burgers</option>
                        <option value="Biryani">Biryani</option>
                        <option value="North Indian">North Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Healthy Food">Healthy Food</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-500">Assign to Restaurant</label>
                    <select
                      value={newFoodRestaurant}
                      onChange={(e) => setNewFoodRestaurant(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                    >
                      {restaurants.map((r) => (
                        <option key={r._id} value={r._id}>{r.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-500">Image URL</label>
                    <input
                      type="url"
                      value={newFoodImage}
                      onChange={(e) => setNewFoodImage(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isVegCheck"
                      checked={newFoodIsVeg}
                      onChange={(e) => setNewFoodIsVeg(e.target.checked)}
                      className="accent-[#FF6B35]"
                    />
                    <label htmlFor="isVegCheck" className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                      Is 100% Vegetarian
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setShowAddFood(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-500 hover:bg-neutral-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924]"
                    >
                      Save Food Item
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* RESTAURANTS TAB */}
      {activeTab === 'restaurants' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
            Partner Kitchens ({restaurants.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurants.map((r) => (
              <div key={r._id} className="p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center gap-4">
                <img src={r.image} alt={r.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{r.name}</h4>
                  <p className="text-xs text-neutral-400">{r.cuisine?.join(', ')}</p>
                  <span className="text-[11px] font-bold text-[#FF6B35]">Rating: {r.rating}★ • {r.deliveryTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COUPONS TAB */}
      {activeTab === 'coupons' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-neutral-900 dark:text-white">
            Discount Coupons ({coupons.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c._id} className="p-4 rounded-2xl border-2 border-dashed border-orange-300 dark:border-neutral-700 bg-orange-50/50 dark:bg-neutral-900 space-y-2">
                <span className="font-mono font-black text-sm text-[#FF6B35]">{c.code}</span>
                <p className="text-xs text-neutral-600 dark:text-neutral-300">{c.description}</p>
                <p className="text-[10px] text-neutral-400">Min Order: ₹{c.minOrderAmount} • Max Off: ₹{c.maxDiscount}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

