import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    description: { type: String, required: true },
    cuisine: [{ type: String, required: true }],
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    totalRatings: { type: Number, default: 120 },
    deliveryTime: { type: String, required: true, default: '25-35 mins' },
    deliveryFee: { type: Number, required: true, default: 40 },
    minOrder: { type: Number, default: 150 },
    image: { type: String, required: true },
    bannerImage: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
    },
    isOpen: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    offerBadge: { type: String, default: '50% OFF up to ₹100' },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;

