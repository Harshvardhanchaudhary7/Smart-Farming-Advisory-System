import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { WeatherProvider } from "./context/WeatherContext";
import "./i18n";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
    <WeatherProvider>
      <App />
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#ffffff",
      color: "#1f2937",
      border: "1px solid #22c55e",
      borderRadius: "12px",
      padding: "14px",
      fontSize: "14px",
    },
    success: {
      iconTheme: {
        primary: "#16a34a",
        secondary: "#ffffff",
      },
    },
    error: {
      iconTheme: {
        primary: "#dc2626",
        secondary: "#ffffff",
      },
    },
  }}/>
    </WeatherProvider>
  </BrowserRouter>
)
