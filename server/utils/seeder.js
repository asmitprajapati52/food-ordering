import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Category from '../models/Category.js';
import Food from '../models/Food.js';
import Coupon from '../models/Coupon.js';

export const seedData = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data. Skipping seed.');
      return;
    }

    console.log('Seeding fresh Hunger Rush database...');

    // 1. Create Users
    const adminUser = await User.create({
      name: 'Hunger Rush Admin',
      email: 'admin@hungerrush.com',
      password: 'password123',
      role: 'admin',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      addresses: [
        {
          street: '404 Innovation Way, Tech Park',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560100',
          landmark: 'Opposite Cyber Gate 3',
          tag: 'Work',
          isDefault: true,
        }
      ]
    });

    const demoUser = await User.create({
      name: 'Aarav Sharma',
      email: 'user@hungerrush.com',
      password: 'password123',
      role: 'user',
      phone: '+91 91234 56789',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80',
      addresses: [
        {
          street: 'Flat 302, Palm Meadows, Indiranagar 100ft Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560038',
          landmark: 'Near Metro Station',
          tag: 'Home',
          isDefault: true,
        },
        {
          street: 'WeWork Galaxy, Residency Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          zipCode: '560025',
          landmark: 'Floor 4',
          tag: 'Work',
          isDefault: false,
        }
      ]
    });

    // 2. Create Categories
    const categoriesData = [
      {
        name: 'Pizza',
        slug: 'pizza',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
        description: 'Authentic stone-baked pizzas with gooey cheese',
      },
      {
        name: 'Burgers',
        slug: 'burgers',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
        description: 'Juicy gourmet burgers loaded with fresh patties',
      },
      {
        name: 'Biryani',
        slug: 'biryani',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
        description: 'Fragrant dum biryanis cooked to perfection',
      },
      {
        name: 'North Indian',
        slug: 'north-indian',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80',
        description: 'Rich curries, buttery naans, and tandoori specials',
      },
      {
        name: 'Chinese',
        slug: 'chinese',
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=500&q=80',
        description: 'Wok-tossed noodles, spicy momos, and manchurian',
      },
      {
        name: 'South Indian',
        slug: 'south-indian',
        image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80',
        description: 'Crispy dosas, fluffy idlis, and filtered coffee',
      },
      {
        name: 'Desserts',
        slug: 'desserts',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
        description: 'Decadent cakes, warm brownies, and sweet treats',
      },
      {
        name: 'Fast Food',
        slug: 'fast-food',
        image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=500&q=80',
        description: 'Loaded fries, crispy wings, wraps, and quick bites',
      },
      {
        name: 'Healthy Food',
        slug: 'healthy-food',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
        description: 'Fresh salad bowls, keto wraps, and protein boxes',
      },
      {
        name: 'Beverages',
        slug: 'beverages',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=500&q=80',
        description: 'Chilled shakes, boba teas, coolers, and mocktails',
      },
    ];

    const createdCategories = await Category.insertMany(categoriesData);

    // 3. Create Restaurants
    const restaurantsData = [
      {
        name: 'The Pizza Chronicle',
        tagline: 'Artisanal Wood-Fired Slices',
        description: 'Handcrafted Neapolitan pizzas made with imported San Marzano sauce and buffalo mozzarella.',
        cuisine: ['Pizza', 'Italian', 'Fast Food'],
        rating: 4.8,
        totalRatings: 420,
        deliveryTime: '25-30 mins',
        deliveryFee: 35,
        minOrder: 199,
        image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        address: { street: '12 Brigade Road', city: 'Bengaluru', area: 'Central District' },
        isOpen: true,
        isFeatured: true,
        offerBadge: '60% OFF up to ₹120',
      },
      {
        name: 'Royal Nawabi Dastarkhwan',
        tagline: 'Hyderabadi Dum Perfection',
        description: 'Authentic slow-cooked royal dum biryanis spiced with pure saffron and secret royal aromatics.',
        cuisine: ['Biryani', 'North Indian', 'Mughlai'],
        rating: 4.9,
        totalRatings: 850,
        deliveryTime: '30-40 mins',
        deliveryFee: 40,
        minOrder: 250,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
        address: { street: '45 Koramangala 5th Block', city: 'Bengaluru', area: 'Koramangala' },
        isOpen: true,
        isFeatured: true,
        offerBadge: 'FLAT ₹100 OFF',
      },
      {
        name: 'Burger Foundry',
        tagline: 'Smash Patties & Brioche Buns',
        description: 'Juicy double-smashed craft burgers, crispy seasoned waffle fries, and thick malt shakes.',
        cuisine: ['Burgers', 'Fast Food', 'Beverages'],
        rating: 4.7,
        totalRatings: 610,
        deliveryTime: '20-30 mins',
        deliveryFee: 30,
        minOrder: 150,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
        address: { street: '88 Church Street', city: 'Bengaluru', area: 'Church Street' },
        isOpen: true,
        isFeatured: true,
        offerBadge: '50% OFF up to ₹100',
      },
      {
        name: 'Wok & Roll Asian House',
        tagline: 'Sizzling Woks & Dimsums',
        description: 'Crispy chili dumplings, Hakka noodles, fiery Schezwan gravies, and Thai curries.',
        cuisine: ['Chinese', 'Asian', 'Fast Food'],
        rating: 4.6,
        totalRatings: 340,
        deliveryTime: '25-35 mins',
        deliveryFee: 40,
        minOrder: 180,
        image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80',
        address: { street: '14 100ft Road, Indiranagar', city: 'Bengaluru', area: 'Indiranagar' },
        isOpen: true,
        isFeatured: false,
        offerBadge: 'Free Dimsum on ₹399',
      },
      {
        name: 'Punjab Heritage Dhaba',
        tagline: 'Desi Ghee & Tandoori Soul',
        description: 'Creamy Dal Makhani, tender Butter Chicken, garlic butter naans, and rich lassi.',
        cuisine: ['North Indian', 'Punjabi'],
        rating: 4.7,
        totalRatings: 520,
        deliveryTime: '30-40 mins',
        deliveryFee: 35,
        minOrder: 200,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        address: { street: '77 HSR Layout Sector 4', city: 'Bengaluru', area: 'HSR Layout' },
        isOpen: true,
        isFeatured: false,
        offerBadge: '40% OFF',
      },
      {
        name: 'Green Leaf Bowls & Salads',
        tagline: 'Clean, Fresh, Wholesome',
        description: 'Macro-balanced quinoa bowls, fresh avocado sourdough toasts, and cold-pressed elixirs.',
        cuisine: ['Healthy Food', 'Salads', 'Beverages'],
        rating: 4.8,
        totalRatings: 290,
        deliveryTime: '20-25 mins',
        deliveryFee: 30,
        minOrder: 180,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
        bannerImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        address: { street: '22 Lavelle Road', city: 'Bengaluru', area: 'Lavelle Road' },
        isOpen: true,
        isFeatured: true,
        offerBadge: '20% OFF on Salads',
      },
    ];

    const createdRestaurants = await Restaurant.insertMany(restaurantsData);

    const rPizza = createdRestaurants[0];
    const rBiryani = createdRestaurants[1];
    const rBurger = createdRestaurants[2];
    const rWok = createdRestaurants[3];
    const rNorth = createdRestaurants[4];
    const rHealthy = createdRestaurants[5];

    // 4. Create Foods
    const foodsData = [
      // Pizza
      {
        name: 'Truffle Mushroom & Mozzarella Pizza',
        description: 'Wood-fired crust, wild portobello mushrooms, black truffle oil drizzle, fresh buffalo mozzarella, and thyme.',
        price: 499,
        originalPrice: 599,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
        category: 'Pizza',
        restaurant: rPizza._id,
        restaurantName: rPizza.name,
        isVeg: true,
        rating: 4.9,
        numReviews: 124,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Wild Mushrooms', 'Truffle Oil', 'Fior di Latte Mozzarella', 'San Marzano Tomatoes', 'Fresh Basil'],
        customizations: [
          {
            title: 'Choose Crust',
            options: [
              { name: 'Neapolitan Sourdough', price: 0 },
              { name: 'Cheese Burst Crust', price: 80 },
              { name: 'Thin Crisp Crust', price: 0 }
            ]
          },
          {
            title: 'Extra Toppings',
            options: [
              { name: 'Extra Mozzarella', price: 60 },
              { name: 'Roasted Garlic & Jalapeños', price: 40 }
            ]
          }
        ]
      },
      {
        name: 'Smoked Pepperoni Feast',
        description: 'Loaded with premium crispy pork pepperoni slices, crushed red pepper flakes, and rich four-cheese blend.',
        price: 549,
        originalPrice: 649,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80',
        category: 'Pizza',
        restaurant: rPizza._id,
        restaurantName: rPizza.name,
        isVeg: false,
        rating: 4.8,
        numReviews: 95,
        isBestSeller: true,
        isRecommended: false,
        ingredients: ['Smoked Pepperoni', 'Aged Mozzarella', 'Parmesan', 'San Marzano Sauce'],
        customizations: [
          {
            title: 'Crust Style',
            options: [
              { name: 'Hand Tossed', price: 0 },
              { name: 'Stuffed Garlic Crust', price: 70 }
            ]
          }
        ]
      },
      {
        name: 'Classic Margherita Supreme',
        description: 'The golden Italian classic with hand-crushed tomatoes, melted bocconcini, extra virgin olive oil, and fresh basil leaves.',
        price: 389,
        originalPrice: 449,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=80',
        category: 'Pizza',
        restaurant: rPizza._id,
        restaurantName: rPizza.name,
        isVeg: true,
        rating: 4.7,
        numReviews: 88,
        isBestSeller: false,
        isRecommended: true,
        ingredients: ['Italian Basil', 'Bocconcini', 'San Marzano Tomatoes', 'EVOO']
      },

      // Biryani
      {
        name: 'Special Royal Mutton Dum Biryani',
        description: 'Succulent tender mutton pieces slow-cooked with aged long-grain Basmati rice, enriched with saffron, brown onions, and aromatic spices.',
        price: 489,
        originalPrice: 580,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
        category: 'Biryani',
        restaurant: rBiryani._id,
        restaurantName: rBiryani.name,
        isVeg: false,
        rating: 4.9,
        numReviews: 320,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Aged Basmati Rice', 'Prime Cut Mutton', 'Kashmiri Saffron', 'Fried Onions', 'Mint & Ghee'],
        customizations: [
          {
            title: 'Portion Size',
            options: [
              { name: 'Regular (Serves 1-2)', price: 0 },
              { name: 'Jumbo Handi (Serves 3)', price: 350 }
            ]
          },
          {
            title: 'Accompaniments',
            options: [
              { name: 'Extra Mirchi Ka Salan', price: 30 },
              { name: 'Boiled Egg (2 pcs)', price: 35 }
            ]
          }
        ]
      },
      {
        name: 'Hyderabadi Chicken Dum Biryani',
        description: 'Marinated tender chicken cuts layered with fragrant saffron rice, slow cooked in sealed clay handis with pure cow ghee.',
        price: 379,
        originalPrice: 429,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=80',
        category: 'Biryani',
        restaurant: rBiryani._id,
        restaurantName: rBiryani.name,
        isVeg: false,
        rating: 4.8,
        numReviews: 210,
        isBestSeller: true,
        isRecommended: false,
        ingredients: ['Tender Chicken', 'Basmati Rice', 'Desi Ghee', 'Saffron', 'Brown Onion']
      },
      {
        name: 'Paneer Tikka Dum Biryani',
        description: 'Clay-oven charred paneer cubes layered with spiced aromatic rice, fresh mint, cashews, and rich saffron essence.',
        price: 329,
        originalPrice: 380,
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=700&q=80',
        category: 'Biryani',
        restaurant: rBiryani._id,
        restaurantName: rBiryani.name,
        isVeg: true,
        rating: 4.6,
        numReviews: 76,
        isBestSeller: false,
        isRecommended: true,
        ingredients: ['Malai Paneer', 'Basmati Rice', 'Cashews', 'Biryani Spices', 'Raita']
      },

      // Burgers
      {
        name: 'The Boss Double Smash Burger',
        description: 'Two smashed prime patties seared crisp, double molten cheddar, caramelized onions, house truffle relish on a toasted brioche bun.',
        price: 369,
        originalPrice: 429,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
        category: 'Burgers',
        restaurant: rBurger._id,
        restaurantName: rBurger.name,
        isVeg: false,
        rating: 4.9,
        numReviews: 180,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Double Smash Patties', 'Melted Cheddar', 'Brioche Bun', 'Secret Sauce', 'Pickles'],
        customizations: [
          {
            title: 'Add Crispy Sides',
            options: [
              { name: 'Peri Peri Fries', price: 99 },
              { name: 'Cheesy Onion Rings', price: 119 },
              { name: 'No Extra Side', price: 0 }
            ]
          }
        ]
      },
      {
        name: 'Crispy Korean Fried Chicken Burger',
        description: 'Crispy panko chicken breast coated with fiery sweet Gochujang glaze, crunchy purple cabbage slaw, and spicy mayo.',
        price: 339,
        originalPrice: 399,
        image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=700&q=80',
        category: 'Burgers',
        restaurant: rBurger._id,
        restaurantName: rBurger.name,
        isVeg: false,
        rating: 4.8,
        numReviews: 145,
        isBestSeller: true,
        isRecommended: false,
        ingredients: ['Crispy Chicken', 'Gochujang Glaze', 'Kimchi Slaw', 'Sesame Mayo']
      },
      {
        name: 'Loaded Truffle Paneer Burger',
        description: 'Crispy herb-crusted cottage cheese patty with jalapeno cheddar melt, garlic aioli, and crispy lettuce.',
        price: 289,
        originalPrice: 329,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
        category: 'Burgers',
        restaurant: rBurger._id,
        restaurantName: rBurger.name,
        isVeg: true,
        rating: 4.7,
        numReviews: 92,
        isBestSeller: false,
        isRecommended: true,
        ingredients: ['Cottage Cheese Patty', 'Jalapeño Melt', 'Toasted Brioche', 'Garlic Mayo']
      },

      // North Indian
      {
        name: 'Signature Murgh Makhani (Butter Chicken)',
        description: 'Tender tandoori chicken cooked in velvety, slow-simmered tomato, cashew, and farm-fresh butter gravy, scented with kasoori methi.',
        price: 429,
        originalPrice: 489,
        image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=700&q=80',
        category: 'North Indian',
        restaurant: rNorth._id,
        restaurantName: rNorth.name,
        isVeg: false,
        rating: 4.9,
        numReviews: 240,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Tandoori Boneless Chicken', 'Cashew Paste', 'Amul Butter', 'Kasoori Methi', 'Fresh Cream']
      },
      {
        name: 'Dal Makhani Bukhara Style',
        description: 'Whole black lentils and kidney beans slow-simmered overnight over charcoal embers with butter and mild spices.',
        price: 319,
        originalPrice: 369,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
        category: 'North Indian',
        restaurant: rNorth._id,
        restaurantName: rNorth.name,
        isVeg: true,
        rating: 4.8,
        numReviews: 180,
        isBestSeller: true,
        isRecommended: false,
        ingredients: ['Black Urad Dal', 'Butter', 'Cream', 'Tomato Puree', 'Fenugreek']
      },

      // Chinese / Asian
      {
        name: 'Pan-Fried Chicken Dim Sums (6 pcs)',
        description: 'Handcrafted dumplings packed with minced chicken, spring onions, ginger, and sesame oil, served with fiery chili crunch oil.',
        price: 269,
        originalPrice: 319,
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=700&q=80',
        category: 'Chinese',
        restaurant: rWok._id,
        restaurantName: rWok.name,
        isVeg: false,
        rating: 4.8,
        numReviews: 110,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Chicken Mince', 'Scallions', 'Ginger', 'Chili Crunch Dip']
      },
      {
        name: 'Chili Garlic Hakka Noodles',
        description: 'Wok-tossed noodles with bell peppers, shredded cabbage, scallions, burned garlic, and spicy red pepper paste.',
        price: 239,
        originalPrice: 280,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80',
        category: 'Chinese',
        restaurant: rWok._id,
        restaurantName: rWok.name,
        isVeg: true,
        rating: 4.6,
        numReviews: 85,
        isBestSeller: false,
        isRecommended: false,
        ingredients: ['Wheat Noodles', 'Bell Peppers', 'Burned Garlic', 'Dark Soy', 'Chili Sauce']
      },

      // Healthy Food
      {
        name: 'Mediterranean Avocado & Quinoa Bowl',
        description: 'Organic red quinoa, sliced ripe Haas avocados, cherry tomatoes, cucumbers, kalamata olives, crumbled feta, and lemon tahini vinaigrette.',
        price: 359,
        originalPrice: 410,
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80',
        category: 'Healthy Food',
        restaurant: rHealthy._id,
        restaurantName: rHealthy.name,
        isVeg: true,
        rating: 4.9,
        numReviews: 95,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Haas Avocado', 'Organic Quinoa', 'Feta Cheese', 'Kalamata Olives', 'Lemon Tahini Dressing']
      },
      {
        name: 'Grilled Herb Chicken Protein Plate',
        description: 'Sous-vide lemon herb grilled chicken breast served with steamed broccoli, roasted sweet potato wedges, and roasted garlic dip.',
        price: 399,
        originalPrice: 460,
        image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80',
        category: 'Healthy Food',
        restaurant: rHealthy._id,
        restaurantName: rHealthy.name,
        isVeg: false,
        rating: 4.8,
        numReviews: 82,
        isBestSeller: false,
        isRecommended: true,
        ingredients: ['Lean Chicken Breast', 'Steamed Broccoli', 'Sweet Potato', 'Rosemary Oil']
      },

      // Desserts
      {
        name: 'Molten Belgian Chocolate Lava Cake',
        description: 'Decadent dark Belgian chocolate cake with a rich, oozing liquid chocolate center, dusted with icing sugar.',
        price: 199,
        originalPrice: 249,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80',
        category: 'Desserts',
        restaurant: rPizza._id,
        restaurantName: rPizza.name,
        isVeg: true,
        rating: 4.9,
        numReviews: 160,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Belgian Dark Chocolate', 'Cocoa', 'Vanilla Essence', 'Butter']
      },

      // Beverages
      {
        name: 'Chilled Alphonso Mango Thick Shake',
        description: 'Prepared with 100% pure Ratnagiri Alphonso mango pulp, thick vanilla dairy cream, and topped with mango chunks.',
        price: 189,
        originalPrice: 220,
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80',
        category: 'Beverages',
        restaurant: rBurger._id,
        restaurantName: rBurger.name,
        isVeg: true,
        rating: 4.8,
        numReviews: 140,
        isBestSeller: true,
        isRecommended: true,
        ingredients: ['Alphonso Mango Pulp', 'Pure Whole Milk', 'Vanilla Ice Cream']
      }
    ];

    await Food.insertMany(foodsData);

    // Update Category Item Counts
    for (const cat of createdCategories) {
      const count = await Food.countDocuments({ category: cat.name });
      cat.itemCount = count;
      await cat.save();
    }

    // 5. Create Promotional Coupons
    const couponsData = [
      {
        code: 'RUSH50',
        discountPercentage: 50,
        maxDiscount: 150,
        minOrderAmount: 249,
        description: '50% off up to ₹150 on your hunger cravings',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: 'WELCOME100',
        discountPercentage: 30,
        maxDiscount: 100,
        minOrderAmount: 199,
        description: 'Flat ₹100 discount for your first order',
        expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isActive: true,
      },
      {
        code: 'FEAST75',
        discountPercentage: 25,
        maxDiscount: 200,
        minOrderAmount: 499,
        description: 'Mega feast: 25% off up to ₹200 on orders above ₹499',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
      }
    ];

    await Coupon.insertMany(couponsData);

    console.log('Hunger Rush Database successfully seeded with rich mock data!');
  } catch (error) {
    console.error('Seed Data Error:', error);
  }
};

