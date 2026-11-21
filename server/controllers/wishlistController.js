import Wishlist from '../models/Wishlist.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('foods');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, foods: [] });
    }
    res.json(wishlist.foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle item in wishlist
// @route   POST /api/wishlist/toggle/:foodId
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const { foodId } = req.params;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, foods: [foodId] });
      return res.json({ added: true, wishlist: wishlist.foods });
    }

    const index = wishlist.foods.indexOf(foodId);
    let added = false;
    if (index > -1) {
      wishlist.foods.splice(index, 1);
    } else {
      wishlist.foods.push(foodId);
      added = true;
    }

    await wishlist.save();
    res.json({ added, wishlist: wishlist.foods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

