import Food from '../models/Food.js';

// @desc    Fetch all foods with advanced filtering, sorting & search
// @route   GET /api/foods
// @access  Public
export const getFoods = async (req, res) => {
  try {
    const {
      search,
      category,
      isVeg,
      minPrice,
      maxPrice,
      minRating,
      sort,
      bestSeller,
      recommended,
      restaurantId,
    } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { restaurantName: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (isVeg !== undefined && isVeg !== '') {
      query.isVeg = isVeg === 'true';
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    if (bestSeller === 'true') {
      query.isBestSeller = true;
    }

    if (recommended === 'true') {
      query.isRecommended = true;
    }

    if (restaurantId) {
      query.restaurant = restaurantId;
    }

    let sortOptions = { rating: -1 }; // default: popularity
    if (sort === 'price_asc') sortOptions = { price: 1 };
    else if (sort === 'price_desc') sortOptions = { price: -1 };
    else if (sort === 'rating') sortOptions = { rating: -1 };
    else if (sort === 'newest') sortOptions = { createdAt: -1 };

    const foods = await Food.find(query).sort(sortOptions);
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single food by ID
// @route   GET /api/foods/:id
// @access  Public
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant');
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    // Get related foods from same category or same restaurant
    const relatedFoods = await Food.find({
      _id: { $ne: food._id },
      category: food.category
    }).limit(4);

    res.json({ ...food.toObject(), relatedFoods });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a food item (Admin)
// @route   POST /api/foods
// @access  Private/Admin
export const createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a food item (Admin)
// @route   PUT /api/foods/:id
// @access  Private/Admin
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a food item (Admin)
// @route   DELETE /api/foods/:id
// @access  Private/Admin
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food item not found' });
    res.json({ message: 'Food item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

