# 📱 Online Marketplace Mobile App

A production-ready mobile application client built with **React Native** and **Expo**. This application serves as the frontend interface for the Online Marketplace system, featuring secure authentication, real-time product browsing, and a dynamic user interface.

Designed to fulfill the requirements for **Mobile App Development (Soal 3)**, ensuring industry-standard architecture, usability, and seamless API integration.

## 🚀 Features

- **JWT Authentication** - Secure login mechanism with persistent token storage (`AsyncStorage`).
- **Dynamic Product Catalog** - Real-time data fetching from the backend API.
- **Smart Category Icons** - Auto-detects product types (e.g., Laptop, Phone, Coffee) to display relevant icons.
- **Product Detail View** - Comprehensive product information with clean navigation.
- **Error Handling** - robust handling for network errors and missing images.
- **Responsive UI** - Modern "Clean UI" design using Cards, Shadows, and standard mobile gestures.

## 🛠 Technology Stack

- **Framework**: React Native (via Expo SDK 52)
- **Language**: TypeScript / JavaScript
- **Networking**: Axios (REST API Integration)
- **Storage**: AsyncStorage (Local Data Persistence)
- **Navigation**: Expo Router (File-based routing)
- **UI Components**: Ionicons (@expo/vector-icons)

## 📁 Project Structure

```bash
ecommerce-mobile/
├── app/                    # Pages & Routing (Expo Router)
│   ├── (tabs)/             # Main Tab Screens (Home, Explore)
│   │   ├── _layout.tsx     # Tab configuration (Hidden style)
│   │   └── index.tsx       # Product List Screen
│   ├── product/            # Dynamic Routes
│   │   └── [id].tsx        # Product Detail Screen
│   ├── index.tsx           # Login Screen
│   └── _layout.tsx         # Layout Utama Aplikasi
├── src/
│   ├── api/                # API Configuration
│   │   └── api.js          # Axios setup & Base URL (IP Config)
│   └── constants/          # Design System
│       └── theme.ts        # Color Palette & Typography
└── assets/                 # Static Assets (Images/Fonts)
```
## 2. Configure IP Address (important part)
To allow your physical phone to communicate with the Backend running on your Laptop/PC, they must be on the SAME Wi-Fi Network, and you must configure the IP address correctly.

Check your Laptop's IP Address:

Windows: Open CMD -> type ipconfig -> Look for IPv4 Address on your active Wi-Fi adapter.

Mac/Linux: Open Terminal -> type ifconfig.

Edit Configuration:

Open the file src/api/api.js.

Update the LAPTOP_IP variable with the IP you found.
```
// src/api/api.js

// CHANGE THIS to your Laptop's IPv4 Address
// Example: "192.168.1.5" or "10.36.2.5" (if using Hotspot)
const LAPTOP_IP = "192.168.X.X"; 

// Ensure this matches your Backend Port
const API_PORT = "5001"; 

const BASE_URL = `http://${LAPTOP_IP}:${API_PORT}/api`;
```

## 3. Run the Application
Start the Expo development server. It is recommended to use the -c flag to clear the cache and ensure your new IP configuration is loaded.

```
npx expo start -c
```

## 4. Connect Device
1. A QR Code will appear in your terminal.
2. Open the Expo Go app on your phone.
3. Scan the QR Code.
4. The app will bundle and launch on your device.

## 🧪 How to Use
## Login
Use a registered email and password (ensure the user exists in the backend database).

Upon success, a JWT Token is saved securely, and you are redirected to the Home screen.

## Browsing Products
The Home Screen lists all available products fetched from the server.

Smart Icons: Notice how the icon changes based on the product name (e.g., a Laptop icon for laptops, a Phone icon for smartphones).

## Product Details
Tap any product card to view details (Price, Description, Category).
If a product image is missing or broken, a generic placeholder icon will be shown automatically.

## 🤝 Troubleshooting
1. Issue: App stuck on Login Loading / Network Error
2. Solution 1: Verify LAPTOP_IP in src/api/api.js is correct.
3. Solution 2: Ensure Laptop and Phone are on the exact same Wi-Fi.
4. Solution 3: Turn off Windows Firewall temporarily (Public/Private networks) as it often blocks incoming connections.

## 👤 Author
Created by Rafif as part of the Specialized Platform Development course.
