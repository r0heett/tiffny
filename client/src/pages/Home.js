import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(""); // 1. हे नवीन स्टेट आहे

  // 2. सर्च बटण दाबल्यावर काय करायचे?
  const handleSearch = () => {
    navigate('/menu', { state: { search: searchInput } }); // हे सर्च शब्द Menu Page ला पाठवेल
  };

  return (
    <div>
      {/* 1. Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">Tiffny</span>
            <span className="logo-sub">your meal, your style</span>
        </div>
        <div className="nav-center">
            <span className="nav-link active-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link" onClick={() => navigate('/menu')}>Menu</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About Us</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" style={{color: "#ff5500", fontWeight: "bold"}} onClick={() => navigate('/partner-signup')}>Partner with Us</span>
            <span className="nav-link">Contact Us</span>
        </div>
        <div className="nav-right">
            <button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>

      {/* 2. Hero Section (Video) */}
      <div className="hero-section-tiffit">
        <video autoPlay loop muted playsInline className="video-bg">
            <source src="/food.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up" style={{textAlign: "center", width: "100%"}}>
            <h1 style={{color: "white", textShadow: "0 5px 15px rgba(0,0,0,0.5)"}}>
                Ghar ka Khana, <br/> Delivered with <span style={{color: "#ff9900"}}>Love ❤️</span>
            </h1>
            <p style={{color: "#f0f0f0", fontSize: "1.5rem", fontWeight: "300"}}>
                Fresh, Hygienic & Affordable Tiffins in Nashik.
            </p>
            
            {/* 3. सर्च बार (बदललेला) */}
            <div className="search-bar-tiffit" style={{margin: "40px auto"}}>
                <input 
                    type="text" 
                    placeholder="Search for 'Veg Thali' or 'Puran Poli'..." 
                    onChange={(e) => setSearchInput(e.target.value)} // टाईप केलेले अक्षर पकडणे
                />
                <button onClick={handleSearch}>Find Food</button> {/* क्लिक केल्यावर Menu कडे जाणे */}
            </div>

            <div className="stats-row" style={{justifyContent: "center", color: "white"}}>
                <div className="stat"><h3 style={{color: "white"}}>10k+</h3><p style={{color: "#ddd"}}>Users</p></div>
                <div className="stat"><h3 style={{color: "white"}}>500+</h3><p style={{color: "#ddd"}}>Chefs</p></div>
                <div className="stat"><h3 style={{color: "white"}}>1M+</h3><p style={{color: "#ddd"}}>Meals</p></div>
            </div>
        </div>
      </div>

      {/* 3. Steps Section */}
      <div className="steps-section">
        <h2 className="section-title">How It Works?</h2>
        <div className="steps-grid animate-up">
            <div className="step-card"><div className="step-number">1</div><h3>Select Location</h3><p>Enter your area to find nearby home chefs.</p></div>
            <div className="step-card"><div className="step-number">2</div><h3>Choose Meal</h3><p>Browse menus and select your favorite thali.</p></div>
            <div className="step-card"><div className="step-number">3</div><h3>Place Order</h3><p>Pay online or COD and confirm your tiffin.</p></div>
            <div className="step-card"><div className="step-number">4</div><h3>Fast Delivery</h3><p>Enjoy hot homemade food at your door.</p></div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <h3>Tiffny - Nashik</h3>
        <p>© 2025 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Home;