import Restaurant from '../models/Restaurant.js';
import Food from '../models/Food.js';

// @desc    Fetch all restaurants with filtering & search
// @route   GET /api/restaurants
// @access  Public
export const getRestaurants = async (req, res) => {
  try {
    const { search, cuisine, featured } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (cuisine) {
      query.cuisine = { $in: [new RegExp(cuisine, 'i')] };
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    const restaurants = await Restaurant.find(query).sort({ rating: -1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single restaurant by ID with foods
// @route   GET /api/restaurants/:id
// @access  Public
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const foods = await Food.find({ restaurant: restaurant._id });
    res.json({ ...restaurant.toObject(), foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new restaurant (Admin)
// @route   POST /api/restaurants
// @access  Private/Admin
export const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    const created = await restaurant.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update restaurant (Admin)
// @route   PUT /api/restaurants/:id
// @access  Private/Admin
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete restaurant (Admin)
// @route   DELETE /api/restaurants/:id
// @access  Private/Admin
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    await Food.deleteMany({ restaurant: req.params.id });
    res.json({ message: 'Restaurant and related menu items removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

