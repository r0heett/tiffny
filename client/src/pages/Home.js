import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName"); // युजरचे नाव चेक करणे
  
  // --- 1. Carousel Logic ---
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
        if (direction === 'left') current.scrollLeft -= 300;
        else current.scrollLeft += 300;
    }
  };

  const plans = [
    { title: "Student Saver Lunch", price: "₹79/day", desc: "Simple, filling veg lunch for hostellers.", tag: "Veg", color: "green" },
    { title: "Student Combo", price: "₹129/day", desc: "Lunch + Dinner budget friendly pack.", tag: "Best Seller", color: "orange" },
    { title: "Working Pro Lunch", price: "₹149/day", desc: "Light, balanced corporate lunch.", tag: "Veg", color: "green" },
    { title: "Office 5-Day Plan", price: "₹699/week", desc: "Monday to Friday, no weekend waste.", tag: "Weekly", color: "blue" },
    { title: "Family Dinner", price: "₹179/day", desc: "Dal, sabzi, roti, rice for 2-3 people.", tag: "Family", color: "purple" },
    { title: "High-Protein Fit", price: "₹199/day", desc: "Extra protein, low oil, balanced macros.", tag: "Non-Veg", color: "red" }
  ];

  // --- 2. FAQ Logic ---
  const [activeFaq, setActiveFaq] = useState(null);
  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  const faqs = [
    { q: "How do I subscribe to a monthly tiffin?", a: "Simply choose a mess, select a plan (Monthly/Weekly), and pay online." },
    { q: "Can I skip meals if I am travelling?", a: "Yes! You can pause your subscription for specific days." },
    { q: "Do you deliver to hostels?", a: "Absolutely! We deliver to almost all college hostels in Nashik." },
    { q: "Is the food hygienic?", a: "Yes, all our partners are FSSAI registered." }
  ];

  return (
    <div>
      {/* 1. Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Tiffny</div>
        
        <div className="nav-center">
            <span className="nav-link active-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link" onClick={() => navigate('/menu')}>Menu</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" onClick={() => navigate('/')}>Contact</span>
        </div>

        <div className="nav-right">
            {/* 1. मेस पार्टनर लिंक (नेहमी दिसेल) */}
            <button className="btn-partner" onClick={() => navigate('/partner-signup')}>Partner with Us</button>
            
            {/* 2. जर युजर लॉगिन असेल तर नाव दाखवा, नाहीतर बटन्स */}
            {userName ? (
                <div style={{display:"flex", alignItems:"center", gap:"10px", marginLeft:"20px"}}>
                    <span style={{fontWeight:"bold", color:"#4aa02c"}}>
                        👤 {userName}
                    </span>
                    <button 
                        onClick={() => {localStorage.clear(); window.location.reload();}}
                        style={{border:"none", background:"none", color:"red", cursor:"pointer", fontSize:"12px"}}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                /* 3. जर लॉगिन नसेल तर Continue as User दाखवा */
                <>
                    <button 
                        className="btn-partner" /* Same style as Partner button */
                        style={{marginLeft:"15px"}} 
                        onClick={() => navigate('/user-auth')}
                    >
                        Continue as User
                    </button>
                    
                    <span className="link-signin" onClick={() => navigate('/user-auth')}>Sign In</span>
                </>
            )}
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="hero-section-tiffit">
        <video autoPlay loop muted playsInline className="video-bg">
            <source src="/food.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up">
            <h1>Ghar Ka Khana, <br/> Delivered Right to You.</h1>
            <p>Fresh, hygienic and affordable home-style tiffins for students & professionals in Nashik.</p>
            <button className="cta-btn" onClick={() => navigate('/menu')}>Find Tiffin Near Me</button>
            <div className="partner-link-small" onClick={() => navigate('/partner-signup')}>Are you a Mess Owner? Partner with us.</div>
        </div>
      </div>

      {/* 3. How It Works */}
      <div className="section-white">
        <h2 className="section-heading">How Tiffny Works</h2>
        <div className="steps-grid">
            <div className="step-item"><span className="step-icon">📍</span><h3>Tell us your location</h3><p>Enter your area or hostel to find nearby providers.</p></div>
            <div className="step-item"><span className="step-icon">🍱</span><h3>Choose your tiffin</h3><p>Compare mess plans, home cooks and prices easily.</p></div>
            <div className="step-item"><span className="step-icon">🛵</span><h3>Get Ghar-ka-Khana</h3><p>Daily deliveries with consistent quality and taste.</p></div>
        </div>
      </div>

      {/* 4. Popular Plans */}
      <div className="section-grey">
        <h2 className="section-heading">Popular Tiffin Plans</h2>
        <div className="carousel-wrapper">
            <button className="scroll-btn left" onClick={() => scroll('left')}>❮</button>
            <div className="plan-carousel" ref={scrollRef}>
                {plans.map((plan, index) => (
                    <div key={index} className="plan-card-premium">
                        <div className={`plan-tag tag-${plan.color}`}>{plan.tag}</div>
                        <h3>{plan.title}</h3>
                        <p className="plan-desc">{plan.desc}</p>
                        <div className="price-box"><span className="plan-price">{plan.price}</span></div>
                        <button className="plan-btn-full" onClick={() => navigate('/menu')}>View Details</button>
                    </div>
                ))}
            </div>
            <button className="scroll-btn right" onClick={() => scroll('right')}>❯</button>
        </div>
      </div>

      {/* 5. Partner Block */}
      <div className="partner-block-large">
        <div className="partner-content-left">
            <h2>Grow Your Mess or Kitchen</h2>
            <p>Reach thousands of hungry users in Nashik.</p>
            <button className="btn-register-large" onClick={() => navigate('/partner-signup')}>Register Your Mess</button>
        </div>
      </div>

      {/* 6. FAQ */}
      <div className="section-white">
        <h2 className="section-heading">FAQ</h2>
        <div className="faq-container">
            {faqs.map((item, index) => (
                <div key={index} className="faq-item" onClick={() => toggleFaq(index)}>
                    <div className="faq-question">{item.q}<span>{activeFaq === index ? '-' : '+'}</span></div>
                    {activeFaq === index && <div className="faq-answer">{item.a}</div>}
                </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer-large">
        <p className="copyright">© 2025 Tiffny Foods Pvt Ltd.</p>
      </div>

    </div>
  );
}

export default Home;