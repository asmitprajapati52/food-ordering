import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: true
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  customizations: [{ type: String }],
  specialInstructions: { type: String, default: '' }
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    restaurantName: { type: String, required: true },
    items: [orderItemSchema],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      tag: { type: String, default: 'Home' }
    },
    deliveryInstructions: { type: String, default: '' },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 40 },
    tax: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    couponApplied: { type: String, default: '' },
    paymentMethod: {
      type: String,
      enum: ['COD', 'RAZORPAY'],
      required: true,
      default: 'COD'
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    },
    paymentDetails: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String
    },
    orderStatus: {
      type: String,
      enum: [
        'Order Placed',
        'Restaurant Confirmed',
        'Preparing Food',
        'Out for Delivery',
        'Delivered',
        'Cancelled'
      ],
      default: 'Order Placed'
    },
    statusHistory: [
      {
        status: { type: String },
        time: { type: Date, default: Date.now },
        note: { type: String }
      }
    ],
    estimatedDeliveryTime: { type: String, default: '30-40 mins' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;

