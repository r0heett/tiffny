import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';

function Menu() {
  const [messes, setMesses] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/messes')
      .then(res => res.json())
      .then(data => setMesses(data))
      .catch(err => console.error("Error:", err));
  }, []);

  // Compare Function
  const toggleCompare = (mess) => {
    if (compareList.find(m => m.id === mess.id)) {
        setCompareList(compareList.filter(m => m.id !== mess.id));
    } else {
        if(compareList.length < 3) setCompareList([...compareList, mess]);
        else alert("You can compare max 3 messes");
    }
  };

  return (
    <div style={{background: "#f8f9fa", minHeight: "100vh"}}>
      
      {/* Navbar (Same) */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Tiffny</div>
        <div className="nav-center">
            <span className="nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link active-link">Menu</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About</span>
            <span className="nav-link" onClick={() => navigate('/partner-signup')}>Partner</span>
        </div>
        <div className="nav-right"><button className="btn-signin">Sign In</button></div>
      </div>

      {/* Page Header */}
      <div className="menu-page-header">
        <h1>Discover Mess & Home Chefs 🍱</h1>
        <p>Browse verified messes in Nashik by location, cuisine, and budget.</p>
        
        {/* Search Strip */}
        <div className="search-bar-tiffit" style={{width: "100%", margin: "20px 0 0 0", boxShadow: "none", border: "1px solid #ddd"}}>
            <input type="text" placeholder="Search by area, mess name, dish..." />
            <button>Search</button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="menu-layout">
        
        {/* Left: Filters */}
        <aside className="filter-sidebar">
            <div className="filter-group">
                <span className="filter-title">Filters</span>
                <span style={{fontSize:"12px", color:"blue", cursor:"pointer"}}>Clear All</span>
            </div>

            <div className="filter-group">
                <span className="filter-title">Type</span>
                <label className="checkbox-row"><input type="checkbox" /> Pure Veg</label>
                <label className="checkbox-row"><input type="checkbox" /> Non-Veg Allowed</label>
                <label className="checkbox-row"><input type="checkbox" /> Jain Available</label>
            </div>

            <div className="filter-group">
                <span className="filter-title">Price per Meal</span>
                <input type="range" min="50" max="300" style={{width: "100%", accentColor: "#ff5500"}} />
                <div className="price-range-labels"><span>₹50</span><span>₹300+</span></div>
            </div>

            <div className="filter-group">
                <span className="filter-title">Location</span>
                <label className="checkbox-row"><input type="checkbox" /> College Road</label>
                <label className="checkbox-row"><input type="checkbox" /> Gangapur Road</label>
                <label className="checkbox-row"><input type="checkbox" /> Indirangagar</label>
            </div>
        </aside>

        {/* Right: Content */}
        <main>
            {/* Featured Slider */}
            <div className="featured-section">
                <div className="featured-title">🏆 Featured Partners <span className="gold-badge">Sponsored</span></div>
                <div className="featured-grid">
                    {[1,2,3].map(i => (
                        <div key={i} className="featured-card">
                            <span className="featured-tag">Promoted</span>
                            <img src="https://b.zmtcdn.com/data/pictures/chains/8/18412898/6704153e7a03006579308075f9226500.jpg" style={{width:"100%", borderRadius:"8px", height:"120px", objectFit:"cover"}} alt=""/>
                            <h4 style={{margin:"10px 0 5px"}}>Royal Cloud Kitchen</h4>
                            <span style={{fontSize:"12px", color:"#666"}}>North Indian • ₹120/meal</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sort Bar */}
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"20px", alignItems:"center"}}>
                <h3 style={{margin:0}}>{messes.length} Messes found</h3>
                <select style={{padding:"8px", borderRadius:"6px", border:"1px solid #ddd"}}>
                    <option>Sort by: Best Match</option>
                    <option>Price: Low to High</option>
                    <option>Rating: High to Low</option>
                </select>
            </div>

            {/* Premium Mess Grid */}
            <div className="premium-grid">
                {messes.map((mess) => (
                    <div key={mess.id} className="premium-card">
                        
                        {/* Image & Badge */}
                        <div style={{position:"relative"}}>
                            <img src={mess.image} alt={mess.name} className="p-card-img" />
                            <span className="p-badge">{mess.type.includes('Veg') ? '🟢 Pure Veg' : '🍗 Non-Veg'}</span>
                            <div className="heart-icon" onClick={() => toggleCompare(mess)}>
                                {compareList.find(m=>m.id===mess.id) ? '❤️' : '🤍'}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-content">
                            <div className="p-header">
                                <h3 className="p-title">{mess.name || "Home Mess"}</h3>
                                <span className="p-rating">4.6 ★</span>
                            </div>
                            <p className="p-desc">Authentic homemade taste. Specializing in Maharashtrian thalis.</p>
                            
                            <div className="p-info-row">
                                <span className="p-info-item">📍 College Road</span>
                                <span className="p-info-item">🛵 Free Delivery</span>
                                <span className="p-info-item">🍱 Tiffin Box Included</span>
                            </div>

                            <div className="p-tags">
                                <span className="p-chip">Monthly Plan</span>
                                <span className="p-chip">Weekly</span>
                                <span className="p-chip">Hygiene Verified</span>
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-actions">
                            <div className="p-price">₹{mess.price} <small>/ month</small></div>
                            <button className="btn-view-plans" onClick={() => navigate(`/mess/${mess.id}`)}>View Plans</button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
      </div>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && (
        <div className="compare-bar">
            <span>{compareList.length} Messes selected</span>
            <button className="compare-btn">Compare Now</button>
            <span style={{cursor:"pointer"}} onClick={() => setCompareList([])}>✖</span>
        </div>
      )}

      {/* Mobile Sticky Bar */}
      <div className="mobile-filter-bar">
        <span className="mf-btn">Filters (3)</span>
        <span className="mf-btn mf-map">🗺️ Map View</span>
      </div>

      {/* FAQ */}
      <div className="section-white" style={{padding:"60px 100px", textAlign:"left"}}>
        <h2 style={{marginBottom:"30px"}}>Frequently Asked Questions</h2>
        <p><strong>Q: How do I subscribe?</strong> <br/> Simply click 'View Plans', select a package and pay.</p>
        <p><strong>Q: Can I change mess later?</strong> <br/> Yes, after your current plan expires.</p>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 Tiffny Foods.</p>
      </div>

    </div>
  );
}

export default Menu;