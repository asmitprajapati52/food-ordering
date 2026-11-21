import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Plus, Trash2, Shield, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export const Profile = () => {
  const { user, updateProfile, addAddress, deleteAddress } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');

  // Address inputs
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [zipCode, setZipCode] = useState('560038');
  const [tag, setTag] = useState('Home');

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProfile({ name, phone, avatar });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!street) return;
    await addAddress({ street, city, state, zipCode, tag });
    setStreet('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-neutral-900 dark:text-white">User Profile</h1>
        <p className="text-xs text-neutral-500 mt-1">Manage personal info and delivery destinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Personal Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
            Personal Information
          </h3>

          <form onSubmit={handleUpdate} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-neutral-500">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500">Email Address (Read-only)</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed opacity-75"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-500">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs font-medium mt-1 outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-3 px-5 py-2.5 rounded-xl bg-[#FF6B35] text-white text-xs font-bold hover:bg-[#E85924] transition-colors"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Saved Addresses */}
        <div className="p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700/60 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-neutral-900 dark:text-white">
            Saved Delivery Addresses
          </h3>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {user?.addresses?.length === 0 ? (
              <p className="text-xs text-neutral-400 italic">No saved addresses found.</p>
            ) : (
              user?.addresses?.map((addr) => (
                <div key={addr._id} className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold uppercase text-[10px] px-2 py-0.5 rounded bg-orange-100 text-[#FF6B35] inline-block mb-1">
                      {addr.tag}
                    </span>
                    <p className="font-bold text-neutral-800 dark:text-white">{addr.street}</p>
                    <p className="text-neutral-500">{addr.city}, {addr.state} - {addr.zipCode}</p>
                  </div>
                  <button
                    onClick={() => deleteAddress(addr._id)}
                    className="p-1 text-neutral-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddAddress} className="pt-4 border-t border-neutral-100 dark:border-neutral-700 space-y-2">
            <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Add New Address</h4>
            <input
              type="text"
              required
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Flat / Street name"
              className="w-full p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-1/2 p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs"
              />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="PIN"
                className="w-1/2 p-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold"
            >
              Add Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

