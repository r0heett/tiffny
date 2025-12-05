import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // तीच CSS वापरू

function Menu() {
  const [messes, setMesses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/messes')
      .then(res => res.json())
      .then(data => setMesses(data))
      .catch(err => console.error("Error:", err));
  }, []);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">Tiffny</span>
            <span className="logo-sub">your meal, your style</span>
        </div>
        <div className="nav-center">
            <span className="nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link" style={{color: "#4aa02c"}}>Menu</span> {/* Active Color */}
            <span className="nav-link">About Us</span>
            <span className="nav-link">Concept</span>
            <span className="nav-link" style={{color: "#ff5500", fontWeight: "bold"}} onClick={() => navigate('/partner-signup')}>Partner with Us</span>
            <span className="nav-link">Contact Us</span>
        </div>
        <div className="nav-right">
            <button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>

      {/* --- Mess List Section (Moved Here) --- */}
      <div className="container" style={{backgroundColor: "#f9f9f9", minHeight: "80vh", paddingTop: "40px"}}>
        <h2 className="section-title">Explore Best Messes in Nashik</h2>
        
        <div className="card-grid">
          {messes.map((mess) => (
            <div key={mess.id} className="tiffit-card" onClick={() => navigate(`/mess/${mess.id}`)}>
              <div className="tiffit-img-box">
                 <img src={mess.image} alt={mess.name} />
                 <span className="veg-badge">🟢 Pure Veg</span>
              </div>
              <div className="tiffit-info">
                 <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3>{mess.name}</h3>
                    <span className="rating">4.5 ★</span>
                 </div>
                 <p className="chef-name">By {mess.owner || "Home Chef"}</p>
                 <hr style={{border: "0", borderTop: "1px dashed #ddd", margin: "10px 0"}}/>
                 <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span className="price">₹{mess.price} / mo</span>
                    <button className="view-btn">View Menu</button>
                 </div>
              </div>
            </div>
          ))}
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

export default Menu;