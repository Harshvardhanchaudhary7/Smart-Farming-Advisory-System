#  Smart Farming Advisory System

An **AI-Powered Smart Farming Advisory System** built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. The system helps farmers make better agricultural decisions by providing **AI crop recommendations**, **real-time weather forecasts**, **weather alerts**, **crop history**, **PDF reports**, and **multilingual support (English & Hindi)**.

---

##  Features

###  Farmer Authentication
- Secure User Registration
- Login with JWT Authentication
- Remember Me
- Forgot Password
- Change Password

###  Weather Module
- Real-time Weather Information
- 5-Day Weather Forecast
- Hourly Forecast
- Weather Alerts
- Search Weather by City

###  AI Crop Advisory
- AI-powered Crop Recommendations
- Soil-based Suggestions
- Season-based Recommendations
- Fertilizer Suggestions
- Expected Yield Prediction
- Recommended Farming Actions

###  Reports
- Download AI Crop Recommendation Report
- Download Weather Report
- Download Crop History PDF
- English PDF Support
- Hindi PDF Support

###  Crop History
- Save AI Recommendations
- Search Crop History
- Delete Crop History
- Filter Crop History

###  Profile Management
- Edit Profile
- Upload Profile Picture
- Upload Banner Image
- Farmer Information
- Farm Information

###  Settings
- Notification Preferences
- Language Selection
- Logout
- Download Reports

###  Multilanguage Support
- 🇬🇧 English
- 🇮🇳 Hindi

###  User Interface
- Responsive Design
- Modern Dashboard
- Beautiful Cards
- Toast Notifications
- Confirm Modal
- Framer Motion Animations

---

#  Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Framer Motion
- React i18next

## Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- bcryptjs

## Database
- MongoDB
- Mongoose

## APIs
- OpenWeather API
- Google Gemini AI API

---

#  Project Structure

```
Smart-Farming-Advisory-System
│
├── Server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   ├── package.json
│   └── server.js
│
├── User
│   ├── src
│   │   ├── Components
│   │   ├── Pages
│   │   ├── assets
│   │   ├── context
│   │   ├── locales
│   │   ├── utils
│   │   └── App.jsx
│   │
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

#  Installation

## Clone Repository

```bash
git clone https://github.com/Harshvardhanchaudhary7/Smart-Farming-Advisory-System.git
```

---

## Backend Setup

```bash
cd Server
npm install
```

Create a `.env` file inside the **Server** folder.

Example:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
OPENWEATHER_API_KEY=YOUR_API_KEY
GEMINI_API_KEY=YOUR_API_KEY
```

Run Backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd User
npm install
npm run dev
```

---

#  Screenshots

##  Home Page

> Add screenshot here

---

## Login Page

> Add screenshot here

---

##  Dashboard

> Add screenshot here

---

##  Weather Page

> Add screenshot here

---

##  AI Crop Advisory

> Add screenshot here

---

##  Crop History

> Add screenshot here

---

##  Profile

> Add screenshot here

---

#  Multi-language Support

- English
- Hindi

Users can change the language from the application settings, and the selected language is applied across the entire application.

---

#  Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Secure API Access

---

#  PDF Reports

The application supports downloading:

- AI Crop Recommendation Report
- Weather Report
- Crop History Report

Available in:

- English
- Hindi

---

#  Future Enhancements

- Mobile Application
- AI Disease Detection
- SMS Weather Alerts
- Voice Assistant
- Farmer Community Forum
- IoT Sensor Integration

---

#  Author

**Harsh Vardhan Chaudhary**

GitHub:
https://github.com/Harshvardhanchaudhary7

---

#  If you like this project

Please consider giving this repository a  on GitHub.
