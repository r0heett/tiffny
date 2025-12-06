import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Menu from './pages/Menu'; // Menu Page
import MessDetails from './pages/MessDetails';
import OwnerDashboard from './pages/OwnerDashboard';
import Partner from './pages/Partner'; // Partner Page
import About from './pages/About'; // <-- About Page (हे महत्वाचे आहे)

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Login & Sign Up */}
        <Route path="/login" element={<Login />} />
        
        {/* User Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Menu Page (List of Messes) */}
        <Route path="/menu" element={<Menu />} />
        
        {/* Single Mess Details */}
        <Route path="/mess/:id" element={<MessDetails />} />

        {/* Owner Dashboard */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        
        {/* Partner Registration */}
        <Route path="/partner-signup" element={<Partner />} />

        {/* About Us Page (हे ॲड केले) */}
        <Route path="/about" element={<About />} />
        
      </Routes>
    </Router>
  );
}

export default App;