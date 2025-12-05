import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* 1. Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">Tiffny</span>
            <span className="logo-sub">your meal, your style</span>
        </div>
        <div className="nav-center">
            <span className="nav-link" style={{color: "#4aa02c"}}>Home</span>
            <span className="nav-link" onClick={() => navigate('/menu')}>Menu</span> {/* Link Added */}
            <span className="nav-link">About Us</span>
            <span className="nav-link">Concept</span>
            <span className="nav-link">Contact Us</span>
            <span className="nav-link" style={{color: "#ff5500", fontWeight: "bold"}} onClick={() => navigate('/partner-signup')}>Partner with Us</span>
            
        </div>
        <div className="nav-right">
            <button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="hero-section-tiffit">
        <div className="hero-content">
            <h1>Order <span style={{color: "#4aa02c"}}>Homemade</span> Food <br/> That You Will Love ❤️</h1>
            <p>Healthy, Hygienic & Delicious tiffins delivered to your doorstep in Nashik.</p>
            
            <div className="search-bar-tiffit">
                <input type="text" placeholder="Enter your delivery location..." />
                <button onClick={() => navigate('/menu')}>Find Food</button>
            </div>
            
            <div className="stats-row">
                <div className="stat"><h3>10k+</h3><p>Happy Users</p></div>
                <div className="stat"><h3>500+</h3><p>Home Chefs</p></div>
                <div className="stat"><h3>1M+</h3><p>Meals Served</p></div>
            </div>
        </div>
        <div className="hero-image">
            <img src="https://5.imimg.com/data5/VB/HH/MY-40639660/best-tiffin-service-in-pune-at-just-rs-60.jpg" alt="Tiffin Service" style={{ width: "90%", borderRadius: "20px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }} />
        </div>
      </div>

      {/* 3. How It Works */}
      <div className="steps-section">
        <h2 className="section-title">How It Works?</h2>
        <div className="steps-grid">
            <div className="step-card"><div className="step-number">1</div><h3>Select Location</h3><p>Enter your area to find nearby home chefs.</p></div>
            <div className="step-card"><div className="step-number">2</div><h3>Choose Meal</h3><p>Browse menus and select your favorite thali.</p></div>
            <div className="step-card"><div className="step-number">3</div><h3>Place Order</h3><p>Pay online or COD and confirm your tiffin.</p></div>
            <div className="step-card"><div className="step-number">4</div><h3>Fast Delivery</h3><p>Enjoy hot homemade food at your door.</p></div>
        </div>
      </div>

      {/* 4. App Banner */}
      <div className="app-banner">
        <div className="app-text">
            <h2>Get the Tiffny Experience on Mobile</h2>
            <p>Download our app for live tracking and faster ordering.</p>
            <div className="store-buttons">
                <button>Google Play</button>
                <button>App Store</button>
            </div>
        </div>
        <div className="app-img">
            <img src="https://cdn-icons-png.flaticon.com/512/300/300231.png" alt="Mobile App" style={{width: "200px"}}/>
        </div>
      </div>

      {/* 5. Footer */}
      <div className="footer">
        <h3>Tiffny - Nashik</h3>
        <p>© 2025 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;