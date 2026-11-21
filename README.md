# HUNGER RUSH ⚡ — Cravings Delivered at Lightning Speed

HUNGER RUSH is a modern, responsive, and full-stack food delivery web application inspired by Swiggy, Zomato, and Uber Eats. Built with a production-grade architecture combining **React (Vite)** on the frontend with **Node.js, Express, MongoDB/Mongoose**, and **JWT Authentication** on the backend.

---

## 🚀 Key Features

### 1. High-Conversion Homepage & UX
- **Hero Showcase**: Prominent branding, real-time search, value props, floating delivery metrics.
- **Visual Food Categories**: Pizza, Burgers, Biryani, North Indian, Chinese, Healthy Food, Desserts, Beverages.
- **Popular Restaurants**: Kitchen cards with delivery time, ratings, discounts, and culinary tags.
- **Hunger Rush Best Sellers**: Dish cards with Veg/Non-Veg indicators, pricing, ratings, and instant Add to Cart.
- **Promotional Offers**: Banner with instant coupon codes (e.g., `RUSH50`, `WELCOME100`).
- **Customer Testimonials & Modern Footer**: Social links, trust badges, contact info.

### 2. Food Exploration & Filtering
- Search dishes by keyword, ingredients, or kitchen name.
- Filter by category, dietary preference (Veg / Non-Veg / All), maximum price slider, and minimum rating (4.0★, 4.5★, etc.).
- Sort by popularity, price (Low to High), price (High to Low), or rating.

### 3. Restaurant & Food Details
- **Restaurant Page**: Banner, address, ratings, cuisine tabs, and dedicated menu search.
- **Food Page**: High-resolution image, ingredients list, crust/toppings customizations, special rider instructions, and related recommendations.

### 4. Interactive Cart System
- Quantity adjustments, dynamic calculation of subtotal, 5% GST, and delivery charges.
- Coupon engine supporting percentage discounts with order minimums and maximum caps.
- Cross-restaurant cart safety prompt and state persistence via local storage.

### 5. Seamless Checkout & Multi-Payment
- Select from saved addresses or add a new delivery address with pin code and labels (Home/Work/Other).
- Cash on Delivery (COD) and Razorpay test payment integration.

### 6. Simulated Live Order Tracking
- Multi-step visual progress tracker:
  1. *Order Placed*
  2. *Restaurant Confirmed*
  3. *Preparing Food*
  4. *Out for Delivery*
  5. *Delivered*
- Live interactive status simulation button for instant demonstration.

### 7. Authentication & Role-Based Access Control
- JWT token authentication with bcrypt password hashing.
- Profile management with multi-address book.
- Order history and active status tracking.
- Interactive user Wishlist with one-click Add to Cart.

### 8. Admin Dashboard Operations Suite
- **Analytics KPI Cards**: Gross Revenue, Total Orders, Registered Diners, Partner Kitchens.
- **Interactive Revenue Chart**: Monthly platform telemetry visualization.
- **Real-Time Order Manager**: Live status dropdown updates.
- **Catalog Management**: Add new dishes, assign to restaurants, delete outdated menu items.
- **Coupons & Restaurant Viewer**: Manage platform discounts and kitchen partnerships.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router DOM v6, Axios, Lucide React Icons, React Hot Toast.
- **Backend**: Node.js, Express.js, MongoDB / Mongoose, JWT (jsonwebtoken), bcryptjs, Razorpay SDK.
- **Database**: MongoDB (Supports local MongoDB, cloud Atlas, with built-in zero-config MongoMemoryServer fallback).

---

## 🏃 Quick Start Guide

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### 1. Server Setup
```bash
cd server
npm install
node server.js
```
The server will start on `http://localhost:5000` and automatically seed initial restaurants, foods, categories, coupons, and demo users.

### 2. Client Setup
```bash
cd client
npm install
npm run dev
# or for production preview:
npm run build
npm run preview
```
Open your browser at `http://localhost:3000` to experience **HUNGER RUSH**.

---

## 🔐 Demo Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Customer** | `user@hungerrush.com` | `password123` | Ordering, Cart, Checkout, Wishlist, Tracking |
| **Admin** | `admin@hungerrush.com` | `password123` | Operations Dashboard, Analytics, Menu & Order Control |

*(Quick 1-click login buttons are also available on the Login page!)*

