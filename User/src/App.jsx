import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Weather from './Pages/Weather';
import Alerts from './Pages/Alerts';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import CropAdvisory from "./Pages/CropAdvisory";
import Settings from "./Pages/Settings";
import ProtectedRoute from "./Components/ProtectedRoute";
import EditProfile from "./Pages/EditProfile";
import ChangePassword from "./Pages/ChangePassword";
import { setNavigator } from "./utils/navigation";
import { useNavigate } from "react-router-dom";
import CropHistory from "./Pages/CropHistory";
import ForgotPassword from "./Pages/ForgotPassword";



function App() {

 const navigate = useNavigate();

useEffect(() => {
  setNavigator(navigate);
}, [navigate]);

  return (
    <>
      
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/forgot-password" element={<ForgotPassword />}/>
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
    <Route path="/weather" element={<ProtectedRoute> <Weather /> </ProtectedRoute>} />
    <Route path="/alerts" element={<ProtectedRoute> <Alerts /> </ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
    <Route path="/crop-advisory" element={<ProtectedRoute> <CropAdvisory /> </ProtectedRoute>} />
    <Route path="/settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />
    <Route path="/profile/edit" element={ <ProtectedRoute> <EditProfile /> </ProtectedRoute>}/>
    <Route path="/change-password" element={ <ProtectedRoute> <ChangePassword /> </ProtectedRoute> }/>
    <Route path="/crop-history" element={ <ProtectedRoute> <CropHistory /> </ProtectedRoute> }/>
    
   </Routes>
        
    </>
  )
}

export default App;
