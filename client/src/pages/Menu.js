import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';

function Menu() {
  const [messes, setMesses] = useState([]);
  const [filteredMesses, setFilteredMesses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");

  // --- LOCATIONS ---
  const allLocations = [
    "College Road", "Gangapur Road", "Indira Nagar", "Panchvati", 
    "Nashik Road", "Satpur", "CIDCO", "Pathardi Phata", 
    "Mahatma Nagar", "Govind Nagar", "Dwarka", "Adgaon"
  ];

  // --- FILTERS STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [locSearch, setLocSearch] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVeg, setNonVeg] = useState(false);
  
  const [priceFilter, setPriceFilter] = useState("all"); 
  const [ratingFilter, setRatingFilter] = useState(0); 

  // --- 1. DATA FETCHING ---
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/messes')
      .then(res => res.json())
      .then(data => {
        const realData = data.map(item => ({
            ...item,
            rating: item.rating ? parseFloat(item.rating) : 0,
            price: item.price ? parseInt(item.price) : 0
        }));
        setMesses(realData);
        setFilteredMesses(realData);
      })
      .catch(err => console.error("Error fetching data:", err));

    if (location.state && location.state.search) {
        setSearchTerm(location.state.search);
    }
  }, [location]);

  // --- 2. FILTER LOGIC ---
  useEffect(() => {
    let result = messes;

    // Search
    if (searchTerm) {
        result = result.filter(m => m.name && m.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Veg / Non-Veg
    if (vegOnly && !nonVeg) {
        result = result.filter(m => m.type && m.type.includes("Veg") && !m.type.includes("Non"));
    } else if (!vegOnly && nonVeg) {
        result = result.filter(m => m.type && m.type.includes("Non"));
    }

    // Price Filter (Monthly Ranges)
    if (priceFilter === "1800-2000") {
        result = result.filter(m => m.price >= 1800 && m.price <= 2000);
    } else if (priceFilter === "2000-2500") {
        result = result.filter(m => m.price > 2000 && m.price <= 2500);
    } else if (priceFilter === "2500-3000") {
        result = result.filter(m => m.price > 2500 && m.price <= 3000);
    } else if (priceFilter === "3000-3500") {
        result = result.filter(m => m.price > 3000 && m.price <= 3500);
    } else if (priceFilter === "above-3500") {
        result = result.filter(m => m.price > 3500);
    }

    // Rating
    if (ratingFilter > 0) {
        result = result.filter(m => m.rating >= ratingFilter);
    }

    // Location
    if (selectedLocations.length > 0) {
        result = result.filter(m => 
            m.address && selectedLocations.some(loc => m.address.toLowerCase().includes(loc.toLowerCase()))
        );
    }

    setFilteredMesses(result);
  }, [searchTerm, vegOnly, nonVeg, priceFilter, ratingFilter, selectedLocations, messes]);

  const toggleLocation = (loc) => {
    if (selectedLocations.includes(loc)) {
        setSelectedLocations(selectedLocations.filter(l => l !== loc));
    } else {
        setSelectedLocations([...selectedLocations, loc]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceFilter("all");
    setSelectedLocations([]);
    setVegOnly(false);
    setNonVeg(false);
    setRatingFilter(0);
  };

  return (
    <div style={{background: "#f8f9fa", minHeight: "100vh"}}>
      
      {/* --- NAVBAR (SAME AS HOME) --- */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Tiffny</div>
        
        <div className="nav-center">
            <span className="nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link active-link">Menu</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" onClick={() => navigate('/')}>Contact</span>
        </div>

        <div className="nav-right">
            <button className="btn-partner" onClick={() => navigate('/partner-signup')}>Partner with Us</button>
            
            {userName ? (
                <div style={{display:"flex", alignItems:"center", gap:"10px", marginLeft:"20px"}}>
                    <span style={{fontWeight:"bold", color:"#4aa02c"}}>👤 {userName}</span>
                    <button onClick={() => {localStorage.clear(); window.location.reload();}} style={{border:"none", background:"none", color:"red", cursor:"pointer", fontSize:"12px"}}>Logout</button>
                </div>
            ) : (
                <>
                    <button className="btn-user-cont" onClick={() => navigate('/user-auth')}>Continue as User</button>
                    <span className="link-signin" onClick={() => navigate('/user-auth')}>Sign In</span>
                </>
            )}
        </div>
      </div>

      {/* --- HEADER --- */}
      <div className="menu-page-header">
        <h1>Discover Mess & Home Chefs 🍱</h1>
        <p>Browse verified messes in Nashik by location, cuisine, and budget.</p>
        <div className="search-bar-tiffit">
            <input 
                type="text" 
                placeholder="Search by mess name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
        </div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="menu-layout">
        
        {/* LEFT: FILTERS */}
        <aside className="filter-sidebar">
            <div className="filter-header">
                <span className="filter-title">Filters</span>
                <span className="clear-btn" onClick={clearFilters}>Clear All</span>
            </div>

            {/* Veg / Non-Veg */}
            <div className="filter-group">
                <span className="filter-title">Preference</span>
                <label className="checkbox-row"><input type="checkbox" checked={vegOnly} onChange={() => {setVegOnly(!vegOnly); setNonVeg(false);}} /> Pure Veg Only</label>
                <label className="checkbox-row"><input type="checkbox" checked={nonVeg} onChange={() => {setNonVeg(!nonVeg); setVegOnly(false);}} /> Non-Veg Allowed</label>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
                <span className="filter-title">Price (Monthly)</span>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "all"} onChange={() => setPriceFilter("all")} /> Any Price</label>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "1800-2000"} onChange={() => setPriceFilter("1800-2000")} /> ₹1800 - ₹2000</label>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "2000-2500"} onChange={() => setPriceFilter("2000-2500")} /> ₹2000 - ₹2500</label>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "2500-3000"} onChange={() => setPriceFilter("2500-3000")} /> ₹2500 - ₹3000</label>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "3000-3500"} onChange={() => setPriceFilter("3000-3500")} /> ₹3000 - ₹3500</label>
                <label className="checkbox-row"><input type="radio" name="price" checked={priceFilter === "above-3500"} onChange={() => setPriceFilter("above-3500")} /> Above ₹3500</label>
            </div>

            {/* Rating */}
            <div className="filter-group">
                <span className="filter-title">Rating</span>
                <label className="checkbox-row"><input type="radio" name="rating" checked={ratingFilter === 0} onChange={() => setRatingFilter(0)} /> Any</label>
                <label className="checkbox-row"><input type="radio" name="rating" checked={ratingFilter === 3.5} onChange={() => setRatingFilter(3.5)} /> 3.5+ Stars</label>
                <label className="checkbox-row"><input type="radio" name="rating" checked={ratingFilter === 4.0} onChange={() => setRatingFilter(4.0)} /> 4.0+ Stars</label>
                <label className="checkbox-row"><input type="radio" name="rating" checked={ratingFilter === 4.5} onChange={() => setRatingFilter(4.5)} /> 4.5+ Stars</label>
            </div>

            {/* Location */}
            <div className="filter-group">
                <span className="filter-title">Location</span>
                <input type="text" className="loc-search-box" placeholder="Search area..." onChange={(e) => setLocSearch(e.target.value)} />
                <div className="location-list">
                    {allLocations.filter(loc => loc.toLowerCase().includes(locSearch.toLowerCase())).map(loc => (
                        <label key={loc} className="checkbox-row">
                            <input type="checkbox" checked={selectedLocations.includes(loc)} onChange={() => toggleLocation(loc)} /> {loc}
                        </label>
                    ))}
                </div>
            </div>
        </aside>

        {/* RIGHT: MESS LIST */}
        <main>
            <h3 style={{marginBottom:"20px"}}>{filteredMesses.length} Messes found</h3>
            
            <div className="premium-grid">
                {filteredMesses.length > 0 ? (
                    filteredMesses.map((mess) => (
                        <div key={mess.id} className="premium-card">
                            <div style={{position:"relative"}}>
                                <img src={mess.image || "https://cdn-icons-png.flaticon.com/512/3480/3480823.png"} alt={mess.name} className="p-card-img" />
                                <span className="p-badge">{mess.type && mess.type.includes('Veg') && !mess.type.includes('Non') ? '🟢 Veg' : '🍗 Non-Veg'}</span>
                                <div className="heart-icon">🤍</div>
                            </div>
                            <div className="p-content">
                                <div className="p-header">
                                    <h3 className="p-title">{mess.name || "Unknown Mess"}</h3>
                                    <span className="p-rating">{mess.rating ? mess.rating : "New"} ★</span>
                                </div>
                                <p className="p-desc">Authentic homemade taste. Specializing in Maharashtrian thalis.</p>
                                <div className="p-info-row">
                                    <span className="p-info-item">📍 {mess.owner || "Nashik"}</span>
                                    <span className="p-info-item">🛵 Free Delivery</span>
                                </div>
                            </div>
                            <div className="p-actions">
                                <div className="p-price">₹{mess.price} <small>/ mo</small></div>
                                <button className="btn-view-plans" onClick={() => navigate(`/mess/${mess.id}`)}>View Plans</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">
                        <div style={{fontSize:"50px", marginBottom:"20px"}}>🔍</div>
                        <h3>No Mess Found</h3>
                        <p>Try changing filters or search for another area.</p>
                        <button className="btn-view-plans" onClick={clearFilters} style={{background:"#eee", color:"#333", border:"none"}}>Clear Filters</button>
                    </div>
                )}
            </div>
        </main>
      </div>

      <div className="footer"><p>© 2025 Tiffny Foods Pvt Ltd.</p></div>
    </div>
  );
}

export default Menu;