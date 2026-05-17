# 🌾 Kishan E-Kart

### Buy | Sell | Rent — Everything for Farmers
Kishan E-Kart is a premium, fully responsive multi-page e-commerce and marketplace web application designed specifically for farmers. It provides an intuitive, easy-to-use platform where users can buy agricultural products (like seeds, fertilizers), sell their yields, and rent heavy machinery or equipment.

🔗 **Live Demo:** [https://vajar-krish.github.io/Kishan-E-Kart/](https://vajar-krish.github.io/Kishan-E-Kart/)

---

## ✨ Key Features

- **🔒 Premium Authentication Engine:** Modern UI with Glassmorphism floating cards, icon-integrated input fields, and custom validation. Powered entirely by browser `LocalStorage` for secure signup, login, session management, and URL-override protection.
- **🌾 Cinematic Home Experience:** A clean, wide-angle full-screen agricultural hero banner with optimized text readability and sharp, solid layout cards for core workflows.
- **🛒 Persistent Add to Cart System:** Fully functional cart implementation where users can add items dynamically from listings or product detail pages with specified quantities, preserving state using `LocalStorage`.
- **💰 Live Seller Dashboard:** Dynamic dashboard including a structured "My Listings" table with real-time views, active status tags, and dynamic deletion capability, alongside a streamlined "Add New Listing" vertical-stack form.
- **🚜 Rental Marketplace:** Dedicated equipment listing grid for heavy farming machinery with solid custom action elements.
- **⚡ Custom SVG Pre-loader:** Elegant plant sprout animation with a clean gold progress bar handling smooth visual transitions during page load.
- **📱 100% Responsive Design:** Complete responsiveness crafted with semantic CSS media queries, specifically optimized for smooth viewing on Desktop, Tablet, and Mobile devices.

---

## 🛠️ Tech Stack Used

- **Frontend Structure:** HTML5 (Semantic elements)
- **Styling & Responsive Core:** CSS3 (Custom Variables, CSS Grids, Flexbox, Glassmorphism Effects, Media Queries)
- **Data Management & Logic:** JavaScript (ES6+, DOM Manipulation, LocalStorage API for lightweight database persistence)

---

## 📂 Folder Structure

```text
Kishan-E-Kart/
│
├── index.html            # Login Page (App Root)
├── register.html         # Signup / Register Page
├── home.html             # Main Dashboard / Home Page
├── categories.html       # Product Category Selector
├── products.html         # Crop/Product Listings Grid
├── product-details.html  # Granular Product & Order Specs
├── my-listings.html      # Seller Inventory Dashboard
├── add-listing.html      # Product Creation Form
├── rent.html             # Heavy Machinery Rental Grid
│
├── style.css             # Universal Master Stylesheet (Responsive & Variables)
├── auth.js               # LocalStorage Auth Engine & Security Filters
├── script.js             # Cart Actions & Dynamic Dashboard CRUD Logic
└── images/               # High-Resolution Optimized Web Assets
