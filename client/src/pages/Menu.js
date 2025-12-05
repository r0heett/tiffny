import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. useLocation इंपोर्ट केले
import './Home.css';

function Menu() {
  const [messes, setMesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  
  const navigate = useNavigate();
  const location = useLocation(); // 2. डेटा घेण्यासाठी हे वापरले

  useEffect(() => {
    // 3. जर होम पेजवरून सर्च आला असेल, तर तो इथे सेट करा
    if (location.state && location.state.search) {
        setSearchTerm(location.state.search);
    }

    fetch('http://127.0.0.1:5000/api/messes')
      .then(res => res.json())
      .then(data => setMesses(data))
      .catch(err => console.error("Error:", err));
  }, [location]); // location बदलल्यावर हे पुन्हा चालेल

  const filteredMesses = messes.filter((mess) => {
    const matchesSearch = mess.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || mess.type.includes(filterType);
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-text">Tiffny</span>
            <span className="logo-sub">your meal, your style</span>
        </div>
        <div className="nav-center">
            <span className={`nav-link ${location.pathname === '/' ? 'active-link' : ''}`} onClick={() => navigate('/')}>Home</span>
            <span className={`nav-link ${location.pathname === '/menu' ? 'active-link' : ''}`} onClick={() => navigate('/menu')}>Menu</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About Us</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" style={{color: "#ff5500", fontWeight: "bold"}} onClick={() => navigate('/partner-signup')}>Partner with Us</span>
            <span className="nav-link">Contact Us</span>
        </div>
        <div className="nav-right">
            <button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button>
        </div>
      </div>

      {/* --- MENU HERO SECTION --- */}
      <div className="menu-hero">
        <div className="menu-title">
            <h1>Discover Great Food 🍱</h1>
            <p>From homemade thalis to spicy delights, find it all here.</p>
        </div>
      </div>

      {/* --- FLOATING CONTROLS --- */}
      <div className="menu-controls">
        <div className="search-wrapper">
            {/* 4. सर्च बारमध्ये आलेला शब्द दिसेल */}
            <input 
                type="text" 
                placeholder="Search mess name..." 
                value={searchTerm} // व्हॅल्यू सेट केली
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button className="search-btn-icon">🔍</button>
        </div>

        <div className="category-tabs">
            <div className={`cat-tab ${filterType === 'All' ? 'active' : ''}`} onClick={() => setFilterType("All")}>All</div>
            <div className={`cat-tab ${filterType === 'Pure Veg' ? 'active' : ''}`} onClick={() => setFilterType("Pure Veg")}>🟢 Pure Veg</div>
            <div className={`cat-tab ${filterType === 'Veg / Non-Veg' ? 'active' : ''}`} onClick={() => setFilterType("Veg / Non-Veg")}>🍗 Non-Veg</div>
        </div>
      </div>

      {/* --- MENU CARDS GRID --- */}
      <div className="menu-grid-container">
        <div className="card-grid">
          {filteredMesses.length > 0 ? (
            filteredMesses.map((mess) => (
                <div key={mess.id} className="tiffit-card fade-in-card" onClick={() => navigate(`/mess/${mess.id}`)}>
                    <div className="tiffit-img-box">
                        <img src={mess.image} alt={mess.name} />
                        <span className="veg-badge">{mess.type.includes('Non') ? '🍗 Non-Veg' : '🟢 Pure Veg'}</span>
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
            ))
          ) : (
              <div style={{textAlign: "center", color: "#888", width: "100%", marginTop: "50px"}}>
                  <h3>😢 No mess found.</h3>
              </div>
          )}
        </div>
      </div>

      <div className="footer">
        <h3>Tiffny - Nashik</h3>
        <p>© 2025 All rights reserved.</p>
      </div>
    </div>
  );
}

export default Menu;