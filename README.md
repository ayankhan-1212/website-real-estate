# 🏠 EstateHub — Luxury & Verified Real Estate Platform (MERN)

> A modern, full-stack MERN (MongoDB, Express, React, Node.js) web application packed with 15 stylish features for discovering, inspecting, calculating, comparing, and scheduling visits for verified luxury real estate.

---

## ✨ 15 Stylish Features Implemented

1. **✨ Modern Home Page**
   - High-impact luxury hero section with dynamic video/photo backdrop and ambient glow.
   - Quick statistics counter (₹500+ Cr listed, 100% verified, 4.9★ rating).
   - Handpicked signature properties showcase, architectural typologies categories, and verification guarantees.

2. **🔍 Smart Property Search**
   - Multi-attribute search bar filtering by Location/City, Property Type, Bedrooms (BHK), Budget Range, and Listing Intent (Buy vs Rent).

3. **🎯 Advanced Filters**
   - Collapsible filter sidebar and mobile drawer with real-time price sliders, amenities checkboxes, furnishing filters, and bedroom/bathroom selectors.

4. **🏡 Premium Property Listings**
   - High-definition property cards with multi-image previews, verified badges, for sale/rent status pills, formatted pricing, and 1-click wishlist & comparison toggles.

5. **📍 Interactive Property Map**
   - OpenStreetMap & Leaflet geospatial integration with custom emerald pins.
   - Interactive popups featuring property photos, pricing, specs, and direct navigation links.

6. **📸 HD Photo & Video Gallery**
   - Lightbox modal with high-resolution photo switcher, thumbnail carousel, embedded HD video walkthroughs, and 360° virtual tour perspective.

7. **❤️ Saved Wishlist**
   - Personal saved properties dashboard with persistent local storage and database sync for logged-in users.

8. **⚖️ Property Comparison**
   - Side-by-side comparison matrix for up to 4 properties with sticky floating bottom bar.
   - Compares Price, Price/SqFt, BHK, Bathrooms, Area, Furnishing, Age, and a full Amenities checklist.

9. **👤 Verified Agent Profiles**
   - Comprehensive agent directory highlighting RERA licenses, years of experience, ratings, bio, active property portfolios, direct call, and instant WhatsApp click-to-chat.

10. **📅 Online Site Visit Booking**
    - Seamless scheduling modal for in-person site visits or virtual 3D video tours.
    - Integrated with user "My Site Visits" dashboard and instant admin alerts.

11. **💬 Live Chat & Quick Enquiry**
    - Floating AI concierge chat bubble with instant intelligent responses and suggestion chips.
    - Direct enquiry lead forms on property detail pages.

12. **💰 Smart Home Loan EMI Calculator**
    - Interactive sliders for Property Price, Down Payment %, Interest Rate %, and Loan Tenure.
    - Real-time calculation of Monthly EMI, Total Interest, and visual payment breakdown progress bar.

13. **🛡️ 100% Verified Properties System**
    - Triple-layer verification badges with transparent modal breakdowns for RERA registration ID, legal title clearances, and physical site audits.

14. **🔔 Smart Real-Time Notifications**
    - Notification bell with unread badge count and dropdown feed of booking confirmations, price drops, and new listings.

15. **⚙️ Powerful Admin & Control Center**
    - Real-time KPI overview cards, property management table with Add/Delete modal, booking status manager (Pending/Confirmed/Completed/Cancelled), and leads manager.

---

## 🚀 Quick Start Guide

### 1. Backend Setup
```bash
cd c:\AYAN\real-estate\backend

# Install dependencies
npm install

# Seed sample luxury properties, verified agents, demo users, and bookings
npm run seed

# Start Express REST API server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup
```bash
cd c:\AYAN\real-estate\frontend

# Install dependencies
npm install

# Start Vite React development server (runs on http://localhost:5173)
npm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@realestate.com` | `admin123` |
| **Buyer / User** | `user@realestate.com` | `user123` |

*(You can also use the 1-Click quick login buttons on the Sign In page!)*

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Leaflet, React-Leaflet, Lucide Icons, Axios, React Router v6, React Hot Toast.
- **Backend:** Node.js, Express.js (ES Modules), Mongoose, JWT Authentication, Bcrypt.js, Morgan logger.
- **Database:** MongoDB Atlas (Cloud Cluster pre-configured with seamless connectivity).
