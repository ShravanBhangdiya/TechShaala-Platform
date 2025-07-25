# TechShaala - MERN LMS Platform

A modern, full-featured Learning Management System (LMS) built with the MERN stack. TechShaala empowers students and instructors with a beautiful, responsive interface, robust course management, secure authentication, and seamless payment integration.

---


## 📝 About the Project

**TechShaala** is a Learning Management System (LMS) designed for modern web learners and educators. It features:
- Student and instructor roles
- Course browsing, filtering, and purchase
- Cart and wishlist functionality
- Secure authentication
- PayPal integration (INR currency)
- Dark mode, responsive design, and rich UI animations

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: UI library for building interactive interfaces
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Radix UI**: Accessible, unstyled UI primitives
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Context API**: State management (auth, cart, theme)

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for APIs
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **bcryptjs**: Password hashing
- **jsonwebtoken (JWT)**: Authentication
- **Multer**: File uploads
- **Cloudinary**: Media storage
- **PayPal REST SDK**: Payment processing

---

## ✨ Features

- **Authentication**: Sign up/login for students and instructors
- **Course Management**: Instructors can add, update, and manage courses
- **Course Catalog**: Students can browse, filter, and view detailed course info
- **Cart & Wishlist**: Add/remove courses, view totals, and manage purchases
- **Payments**: PayPal integration (INR, mock for dev)
- **Media Uploads**: Cloudinary for course images/videos
- **Dark Mode**: Toggle between light and dark themes
- **Responsive UI**: Works on all devices
- **Animations**: Smooth transitions and feedback
- **Category Filtering**: Browse by course category
- **Loading Skeletons**: Enhanced UX during data fetch

---

## 🗂️ Project Structure

```
MERN-LMS-2024-master/
  client/      # React frontend
    src/
      api/            # Axios instance
      components/     # UI components
      context/        # Context providers (auth, cart, theme, etc.)
      hooks/          # Custom hooks
      lib/            # Utilities
      pages/          # Route pages (auth, student, instructor, etc.)
      services/       # API service functions
      assets/         # Images, icons
      App.jsx         # Main app
      main.jsx        # Entry point
  server/      # Express backend
    controllers/     # Route controllers
    helpers/         # Utility modules (Cloudinary, PayPal)
    middleware/      # Express middleware
    models/          # Mongoose schemas
    routes/          # API route definitions
    server.js        # Main backend entry
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [npm](https://www.npmjs.com/)

### Environment Variables

Create a `.env` file inside the `server/` directory with the following:

```env
MONGO_URI=mongodb://localhost:27017/mern-lms
PORT=5001
CLIENT_URL=http://localhost:5173

# Cloudinary (for media uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal (for payments, use sandbox keys or leave as mock for dev)
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_SECRET_ID=your_paypal_secret_id
```

> For development/testing, you can use dummy values for PayPal and Cloudinary, but real uploads/payments require valid credentials.

### Installation

Open two terminals (one for backend, one for frontend):

#### 1. Backend

```bash
cd server
npm install
```

#### 2. Frontend

```bash
cd client
npm install
```

### Running Locally

#### 1. Start MongoDB

Make sure MongoDB is running locally (or update `MONGO_URI` for Atlas).

#### 2. Start Backend

```bash
cd server
npm run dev
```

The backend will run on [http://localhost:5001](http://localhost:5001).

#### 3. Start Frontend

```bash
cd client
npm run dev
```

The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## 🧑‍💻 Usage Guide

### Registration & Login
- Visit [http://localhost:5173](http://localhost:5173)
- Register as a **student** or **instructor**
- Login to access your dashboard

### Student Features
- Browse courses by category or search
- View detailed course info (curriculum, instructor, price)
- Add courses to cart or wishlist
- Purchase courses via PayPal (mocked for dev)
- View purchased courses and track progress

### Instructor Features
- Add new courses with images, curriculum, and settings
- Manage your courses (edit, update, view students)
- Upload course media (images/videos via Cloudinary)

### Cart & Wishlist
- Access cart/wishlist from the header
- Remove items, view totals, and proceed to checkout

### Dark Mode
- Toggle dark/light mode from the navigation bar

---

## 🛠️ Development Notes

- **API Base URL:** The frontend (`client/src/api/axiosInstance.js`) is configured to use `http://localhost:5001` for API requests.
- **Port Conflicts:** If port 5001 is in use, change the `PORT` in your `.env` and update the frontend base URL accordingly.
- **Database Seeding:** You can add courses manually via the instructor dashboard or by writing a script (see deleted scripts for reference).
- **Category Mapping:** Ensure course categories in the database match frontend IDs (e.g., `web-development`).
- **Mock PayPal:** For development, payments are simulated; use real credentials for production.

---

## 🩹 Troubleshooting

- **Cannot GET /auth:** The backend is an API server; use POST requests to `/auth/register` and `/auth/login`.
- **Registration/Login Fails:** Ensure all required fields are filled and the backend is running. Check the browser console and backend logs for errors.
- **MongoDB Connection Error:** Make sure MongoDB is running and `MONGO_URI` is correct.
- **CORS Issues:** Ensure `CLIENT_URL` in `.env` matches your frontend URL.
- **Images Not Uploading:** Check Cloudinary credentials in `.env`.
- **Payments Not Working:** For real payments, set valid PayPal sandbox credentials in `.env`.
- **Category Filtering Not Working:** Ensure category IDs in the database match those used in the frontend.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


## 👨‍💻 Author

**Shravan Bhangdiya**

- [GitHub](https://github.com/ShravanBhangdiya) 

---

**Made with ❤️ for learning and teaching!**
