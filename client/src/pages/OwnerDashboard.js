import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css'; // CSS फाइल कनेक्ट करा

function OwnerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); // टॅब बदलण्यासाठी
  const [stats, setStats] = useState({ earnings: 0, subscribers: 0, guest_orders: 0, total_orders: 0 });
  
  // मेनू अपडेटसाठी स्टेट्स
  const [menu, setMenu] = useState({ description: '', price: '', image: null });
  const [mealType, setMealType] = useState('Lunch');

  useEffect(() => {
    // वेळ चेक करा
    const hour = new Date().getHours();
    if (hour < 8) setMealType('Lunch (Morning)');
    else if (hour >= 8 && hour < 20) setMealType('Dinner (Evening)');
    else setMealType('Next Day Lunch');

    // Stats आणणे
    fetch('http://127.0.0.1:5000/api/owner/stats')
        .then(res => res.json())
        .then(data => setStats(data.data));
  }, []);

  const handleImageChange = (e) => setMenu({ ...menu, image: e.target.files[0] });

  const handleUpload = async () => {
    alert("Menu Uploaded Successfully!"); // सध्या डेमो अलर्ट
  };

  return (
    <div className="dashboard-container">
      
      {/* --- SIDEBAR --- */}
      <div className="sidebar">
        <h2>Tiffny Partner</h2>
        
        <div className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
        </div>
        <div className={`menu-item ${activeTab === 'menu' ? 'active' : ''}`} onClick={() => setActiveTab('menu')}>
            🍱 Menu Management
        </div>
        <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            📦 Orders
        </div>
        <div className={`menu-item ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>
            🎫 Subscriptions
        </div>
        <div className={`menu-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            📈 Revenue Reports
        </div>

        <button className="logout-btn" onClick={() => { localStorage.clear(); navigate('/login'); }}>
            Logout
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="main-content">
        
        {/* Header */}
        <div className="header-bar">
            <div className="welcome-text">
                <h1>Hello, Mess Owner 👋</h1>
                <p>Here is what's happening with your mess today.</p>
            </div>
            <div style={{background: "#ffeedb", padding: "5px 15px", borderRadius: "20px", color: "#ff9900", fontWeight: "bold"}}>
                🟢 Status: Online
            </div>
        </div>

        {/* --- VIEW 1: DASHBOARD (STATS) --- */}
        {activeTab === 'dashboard' && (
            <>
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-info"><h3>₹{stats.earnings}</h3><p>Total Revenue</p></div>
                        <div className="stat-icon">💰</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info"><h3>{stats.subscribers}</h3><p>Active Subscribers</p></div>
                        <div className="stat-icon">👥</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info"><h3>{stats.guest_orders}</h3><p>Today's Orders</p></div>
                        <div className="stat-icon">🛵</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-info"><h3>4.5 ★</h3><p>Avg Rating</p></div>
                        <div className="stat-icon">⭐</div>
                    </div>
                </div>

                <div className="content-box">
                    <h3 className="section-title">Recent Activity</h3>
                    <p style={{color: "#777"}}>No recent orders yet.</p>
                </div>
            </>
        )}

        {/* --- VIEW 2: MENU MANAGEMENT --- */}
        {activeTab === 'menu' && (
            <div className="content-box">
                <h2 className="section-title" style={{color: "#ff9900"}}>Update {mealType} Menu</h2>
                
                <div className="form-group">
                    <label>Today's Special Items:</label>
                    <textarea className="form-input" rows="4" placeholder="Ex. Paneer Masala, 3 Chapati, Rice..." onChange={(e) => setMenu({...menu, description: e.target.value})}></textarea>
                </div>

                <div className="form-group">
                    <label>Price per Plate (₹):</label>
                    <input type="number" className="form-input" placeholder="Ex. 80" onChange={(e) => setMenu({...menu, price: e.target.value})}/>
                </div>

                <div className="form-group">
                    <label>Upload Photo:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>

                <button className="primary-btn" onClick={handleUpload}>Publish Menu</button>
            </div>
        )}

        {/* --- VIEW 3: ORDERS (Placeholder) --- */}
        {activeTab === 'orders' && (
            <div className="content-box">
                <h2 className="section-title">Live Orders</h2>
                <p>Order management module coming soon...</p>
            </div>
        )}

      </div>
    </div>
  );
}

export default OwnerDashboard;