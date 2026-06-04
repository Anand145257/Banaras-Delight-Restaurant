# Banaras Delight Restaurant 🍛✨

Welcome to the **Banaras Delight Restaurant** repository! This is a full-stack, premium web application for a modern restaurant experience, featuring interactive food ordering, reservation booking, payment integration, and a comprehensive admin management panel.

The application is built with a modern frontend (HTML5, Vanilla CSS, and JavaScript) and a robust backend API (Node.js, Express, MongoDB).

---

## 🚀 Key Features

*   **User Authentication & Security:** Sign up, log in, and secure route access using JSON Web Tokens (JWT) and passwords encrypted via `bcryptjs`.
*   **Interactive Menu:** Browse dishes dynamically by categories, search, and view detailed descriptions.
*   **Shopping Cart & Ordering:** Add items to cart, manage quantities, and place orders.
*   **Payment Gateway Integration:** Secure payment processing integrated with **Razorpay**.
*   **Table Reservations:** Convenient booking system for users to reserve tables in advance.
*   **Order History & Tracking:** Users can view their past orders, reservation history, and order status.
*   **Admin Dashboard:** Dedicated panel for restaurant staff to manage the menu items, review reservations, and track order fulfillment.
*   **Smart Database Fallback:** Automatic fallback to an **in-memory MongoDB database (`mongodb-memory-server`)** if a local MongoDB connection is unavailable.

---

## 🛠️ Tech Stack

### Frontend
*   **Core:** HTML5, Modern Vanilla CSS, ES6+ JavaScript
*   **Styling:** Custom premium styling, responsive layouts, glassmorphism UI elements, and modern typography.

### Backend
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB & Mongoose ORM
*   **Auth:** JWT (`jsonwebtoken`), `bcryptjs`
*   **File Uploads:** `multer` (for upload of dish images)
*   **Payments:** `razorpay` SDK
*   **Emails:** `nodemailer` (for booking and order confirmation emails)
*   **Development Tools:** `nodemon`, `morgan` (logging)

---

## ⚙️ Project Structure

```text
├── backend/
│   ├── config/          # Database configuration and connection scripts
│   ├── controllers/     # Controller logic for auth, menu, orders, reservations, etc.
│   ├── middleware/      # Authentication & file upload middlewares
│   ├── models/          # Mongoose schemas (User, Order, FoodItem, Reservation, etc.)
│   ├── routes/          # API endpoints
│   ├── seed/            # Seeding scripts for initial menu items & download scripts
│   ├── utils/           # Error handling & emailing utility functions
│   └── server.js        # Main entry point of the API server
│
├── frontend/
│   ├── index.html       # Landing page
│   ├── menu.html        # Menu listing page
│   ├── cart.html        # Cart view
│   ├── checkout.html    # Checkout and payment gateway
│   ├── reservation.html # Table booking page
│   ├── admin.html       # Admin Panel
│   ├── js/              # Frontend script controllers
│   └── css/             # Stylesheets (custom layouts and responsive design)
│
├── package.json         # Workspace scripts and devDependencies
└── README.md            # Project documentation
```

---

## 🏁 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16 or higher recommended)
*   [MongoDB](https://www.mongodb.com/) (Optional: if not installed, the server automatically starts a temporary in-memory MongoDB database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Anand145257/Banaras-Delight-Restaurant.git
   cd Banaras-Delight-Restaurant
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install root-level developer dependencies:
   ```bash
   cd ..
   npm install
   ```

### Configuration

Create a `.env` file inside the `backend` directory and add your credentials:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/banaras_delight
JWT_SECRET=your_jwt_secret_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
FROM_EMAIL=noreply@banarasdelight.com
FROM_NAME="Banaras Delight"
```

### Running the Application

1. **Seed the Database:**
   Populate the database with default menu items:
   ```bash
   npm run seed:menu
   ```

2. **Start the Backend API Server:**
   Run the backend in development mode (using Nodemon):
   ```bash
   npm run dev
   ```

3. **Serve the Frontend:**
   You can serve the frontend files using a static server:
   ```bash
   npm run serve:frontend
   ```
   Open `http://localhost:3000` in your web browser.

---

## 📄 License
This project is licensed under the MIT License.
