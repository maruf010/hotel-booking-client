# 🏨 HOTEL Silk City – Hotel Booking Platform

A modern, full-featured Hotel Booking web application built with React and Express.js. This platform enables users to browse, filter, book, and review hotel rooms with ease. It combines sleek design, secure authentication, and intuitive features to provide a seamless user experience.

---

## 🌐 Live Site

🔗 [Live Demo URL](https://my-hotel-8c748.web.app)

---

## 🎯 Project Purpose

This project is developed as part of **Assignment 11** to demonstrate my frontend and backend development skills, including:

- Firebase Authentication
- JWT Authorization
- MongoDB Data Management
- Booking and Review Systems
- Filtering, Modals, and Animations
- Responsive and Professional UI/UX

---

## 🧩 Key Features

### ✅ General

- Fully responsive (Mobile, Tablet, Desktop)
- Clean and recruiter-friendly UI
- Environment variables used to protect credentials

### 🏡 Home Page (HOTEL Silk City)

- Image slider banner with CTA
- Leaflet map showing the location of **HOTEL Silk City**
- Featured rooms section (Top 6 rooms)
- Authentic user reviews (sorted by time)
- Special Offers popup modal
- 2 additional promotional sections

### 🔐 Authentication

- Firebase email/password login and registration
- Google OAuth login
- Password validation (uppercase, lowercase, min 6 characters)
- SweetAlert/toast notifications on auth actions

### 🧭 Navigation

- Navbar with conditional links based on login status
- Private routes (My Bookings page)

### 🛌 Rooms Page

- Display all rooms from MongoDB
- Clickable cards redirect to Room Details
- Filter by price range (server-side filtering)

### 🏷️ Room Details Page

- Full room information
- All user reviews for that room
- Booking modal with date picker and summary
- Prevent double booking
- If booked, disables the "Book Now" button

### 📆 My Bookings Page

- Table view of all user’s bookings
- Cancel bookings (only 1 day before check-in)
- Update booking date with toast feedback
- Give review modal for each booking

### 📝 Review System

- Only booked users can submit reviews
- Review includes rating (1–5), comment, and timestamp
- Displayed on Room Details & Home page (latest first)

### 🚫 404 Page

- Custom 404 page with image and back-to-home button

---

## 🧪 Challenges Implemented

- ✅ Display reviews sorted by latest (descending timestamp)
- ✅ Booking cancellation is restricted to 1 day before check-in using Moment.js
- ✅ Server-side filtering for rooms by price range
- ✅ Special offers popup on home page load
- ✅ JWT authentication for protected routes and APIs

---

## 🔐 Security

- Firebase API key and MongoDB URI are stored in `.env` files
- JWT token issued and stored after login, used for protected routes

---

## 🧰 Packages Used

### 🔧 Core

- `react`, `react-dom`, `react-router`, `axios`, `express`, `mongodb`

### 🔒 Auth

- `firebase`, `jsonwebtoken`

### 🎨 Styling & UI

- `tailwindcss`, `@tailwindcss/vite`, `aos`, `swiper`, `react-icons`, `@lottiefiles/lottie-player`, `motion`

### 📍 Maps & Date

- `react-leaflet`, `leaflet`, `react-datepicker`, `moment`

### 📋 Others

- `sweetalert2`, `react-hot-toast`, `react-helmet-async`, `react-multi-carousel`, `react-spinners`

---
