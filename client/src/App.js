import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages Import
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MessDetails from './pages/MessDetails';
import OwnerDashboard from './pages/OwnerDashboard'; // <-- हे महत्वाचे आहे
import Menu from './pages/Menu'; // <-- Import
import Partner from './pages/Partner'; // <-- Import
import UserAuth from './pages/UserAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Login & Sign Up (दोन्ही एकाच पेजवर आहेत) */}
        <Route path="/login" element={<Login />} />
        
        {/* Student Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Owner Dashboard (मेस मालकांसाठी) */}
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        
        {/* Mess Details Page */}
        <Route path="/mess/:id" element={<MessDetails />} />

        {/* Menu path Page */}
        <Route path="/menu" element={<Menu />} />

        {/* partner us  Page */}
        <Route path="/partner-signup" element={<Partner />} />

        {/* partner UserAuth */}
        <Route path="/user-auth" element={<UserAuth />} />

      </Routes>
    </Router>
  );
}

export default App;