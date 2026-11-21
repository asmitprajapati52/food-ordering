import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, min: 0 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    restaurantName: { type: String, required: true },
    isVeg: { type: Boolean, required: true, default: true },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    numReviews: { type: Number, default: 45 },
    ingredients: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    isBestSeller: { type: Boolean, default: false },
    isRecommended: { type: Boolean, default: false },
    customizations: [
      {
        title: { type: String }, // e.g. "Choose Crust", "Spice Level"
        options: [
          {
            name: { type: String },
            price: { type: Number, default: 0 }
          }
        ]
      }
    ],
    prepTime: { type: String, default: '20-25 mins' }
  },
  { timestamps: true }
);

const Food = mongoose.model('Food', foodSchema);
export default Food;

