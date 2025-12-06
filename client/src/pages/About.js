import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './About.css';
import './Home.css'; // Navbar साठी

function About() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="about-page">
      
      {/* 1. Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Tiffny</div>
        <div className="nav-center">
            <span className="nav-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link" onClick={() => navigate('/menu')}>Menu</span>
            <span className={`nav-link ${location.pathname === '/about' ? 'active-link' : ''}`} onClick={() => navigate('/about')}>About</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" style={{color: "#FF6B35", fontWeight: "bold"}} onClick={() => navigate('/partner-signup')}>Partner with Us</span>
            <span className="nav-link">Contact</span>
        </div>
        <div className="nav-right"><button className="btn-signin" onClick={() => navigate('/login')}>Sign In</button></div>
      </div>

      {/* 2. Hero Section */}
      <div className="about-hero">
        <div className="hero-box">
            <h1>About Tiffny</h1>
            <h3>“Connecting Nashik with fresh, home-style tiffins”</h3>
            <p>Tiffny is an online mess and cloud-kitchen platform that helps students, working professionals and families discover trusted tiffin providers and enjoy ghar ka khana without compromise.</p>
        </div>
      </div>

      {/* 3. Our Story */}
      <div className="section-pad">
        <div className="story-container">
            <div className="story-text">
                <h2 className="section-title" style={{textAlign:"left"}}>Our Story</h2>
                <p>Tiffny started with a simple problem: it’s hard to find reliable, healthy tiffin when you move away from home. Hostels and PGs are crowded, office canteens get boring, and most restaurants feel too oily for daily food.</p>
                <p>As students and working professionals in Nashik, we experienced this struggle every day. So we decided to build a platform that brings together the city’s best messes, home chefs and cloud kitchens – and makes it easy for anyone to subscribe to fresh, consistent, home-style meals.</p>
            </div>
            <div className="story-img">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Healthy Food" />
            </div>
        </div>
      </div>

      {/* 4. What We Do */}
      <div className="section-pad what-we-do">
        <h2 className="section-title">What Tiffny Does</h2>
        <div className="cards-grid-3">
            <div className="info-card">
                <span className="card-icon">🍱</span>
                <h3>For Tiffin Users</h3>
                <ul>
                    <li>Discover verified messes & home cooks.</li>
                    <li>Compare plans, cuisines and prices.</li>
                    <li>Subscribe daily/monthly in clicks.</li>
                </ul>
            </div>
            <div className="info-card">
                <span className="card-icon">👨‍🍳</span>
                <h3>For Messes & Kitchens</h3>
                <ul>
                    <li>Get online visibility instantly.</li>
                    <li>Manage orders from one dashboard.</li>
                    <li>Build long-term customer relations.</li>
                </ul>
            </div>
            <div className="info-card">
                <span className="card-icon">🏠</span>
                <h3>For Home Chefs</h3>
                <ul>
                    <li>Turn cooking passion into income.</li>
                    <li>Reach students who value home food.</li>
                    <li>Support with menu & pricing.</li>
                </ul>
            </div>
        </div>
      </div>

      {/* 5. Our Values */}
      <div className="section-pad">
        <h2 className="section-title">Our Values</h2>
        <div className="values-grid">
            <div className="value-item">
                <span className="val-icon">❤️</span>
                <h4>Ghar Ka Swad First</h4>
                <p>Food should feel like it’s cooked with care, not like a random takeaway.</p>
            </div>
            <div className="value-item">
                <span className="val-icon">🤝</span>
                <h4>Trust & Transparency</h4>
                <p>Verified partners, clear pricing, honest ratings and reviews.</p>
            </div>
            <div className="value-item">
                <span className="val-icon">🛡️</span>
                <h4>Hygiene & Safety</h4>
                <p>We onboard partners only after checking basic hygiene practices.</p>
            </div>
            <div className="value-item">
                <span className="val-icon">🌱</span>
                <h4>Local Growth</h4>
                <p>We want Nashik’s local mess owners & chefs to grow with us.</p>
            </div>
        </div>
      </div>

      {/* 6. Why Nashik Chooses Us (Stats) */}
      <div className="section-pad stats-section">
        <h2 className="section-title" style={{color:"white"}}>Why Nashik Chooses Us</h2>
        <div className="big-stats">
            <div className="bst"><h2>10k+</h2><p>Daily Users</p></div>
            <div className="bst"><h2>500+</h2><p>Verified Partners</p></div>
            <div className="bst"><h2>1M+</h2><p>Meals Delivered</p></div>
        </div>
        <p className="team-text">“Tiffny is built by a small team of tech, food and operations enthusiasts from Nashik who understand both code and kadhai.”</p>
      </div>

      {/* 7. Dual CTA Footer */}
      <div className="cta-split">
        <div className="cta-box user-side">
            <h2>Hungry for ghar ka khana?</h2>
            <button className="btn-user" onClick={() => navigate('/menu')}>Browse Messes</button>
        </div>
        <div className="cta-box partner-side">
            <h2>Run a mess or cloud kitchen?</h2>
            <button className="btn-partner" onClick={() => navigate('/partner-signup')}>Partner with Tiffny</button>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 Tiffny Foods Pvt Ltd. All rights reserved.</p>
      </div>

    </div>
  );
}

export default About;