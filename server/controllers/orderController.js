import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const {
      restaurant,
      restaurantName,
      items,
      deliveryAddress,
      deliveryInstructions,
      subtotal,
      deliveryFee,
      tax,
      discount,
      totalAmount,
      couponApplied,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items specified' });
    }

    // Generate unique modern Order ID e.g. HR-849204
    const orderId = `HR-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = new Order({
      orderId,
      user: req.user._id,
      restaurant,
      restaurantName,
      items,
      deliveryAddress,
      deliveryInstructions: deliveryInstructions || '',
      subtotal,
      deliveryFee: deliveryFee || 40,
      tax: tax || 0,
      discount: discount || 0,
      totalAmount,
      couponApplied: couponApplied || '',
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Completed',
      orderStatus: 'Order Placed',
      statusHistory: [
        {
          status: 'Order Placed',
          time: new Date(),
          note: 'Your order has been received by Hunger Rush'
        }
      ],
      estimatedDeliveryTime: '30-40 mins'
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID (or custom orderId)
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const param = req.params.id;
    let order;

    if (param.startsWith('HR-')) {
      order = await Order.findOne({ orderId: param }).populate('user', 'name email phone');
    } else {
      order = await Order.findById(param).populate('user', 'name email phone');
    }

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure authorized user or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin or simulated live tracking)
// @route   PUT /api/orders/:id/status
// @access  Private
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      time: new Date(),
      note: note || `Order status updated to ${status}`
    });

    if (status === 'Delivered') {
      order.paymentStatus = 'Completed';
    }

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

