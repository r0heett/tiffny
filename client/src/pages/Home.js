import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  
  // --- 1. Carousel Logic (Plans) ---
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
        if (direction === 'left') {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
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
    { q: "How do I subscribe to a monthly tiffin?", a: "Simply choose a mess, select a plan (Monthly/Weekly), and pay online. Your subscription starts immediately." },
    { q: "Can I skip meals if I am travelling?", a: "Yes! You can pause your subscription for specific days, and those credits will be carried forward." },
    { q: "Do you deliver to hostels?", a: "Absolutely! We deliver to almost all college hostels and PG areas in Nashik." },
    { q: "Is the food hygienic?", a: "Yes, all our partners are FSSAI registered and undergo strict hygiene checks." }
  ];

  return (
    <div>
      {/* 1. Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Tiffny</div>
        
        <div className="nav-center">
            <span className="nav-link active-link" onClick={() => navigate('/')}>Home</span>
            <span className="nav-link" onClick={() => navigate('/menu')}>Mess</span>
            <span className="nav-link" onClick={() => navigate('/about')}>About</span>
            <span className="nav-link" onClick={() => navigate('/about')}>Concept</span>
            <span className="nav-link" onClick={() => navigate('/')}>Contact</span>
        </div>

        <div className="nav-right">
            {/* मेस मालकांसाठी */}
            <button className="btn-partner" onClick={() => navigate('/partner-signup')}>Partner with Us</button>
            
            {/* --- हे नवीन ऑप्शन (ग्राहकांसाठी) --- */}
            <button className="btn-user-cont" onClick={() => navigate('/menu')}>Continue as User</button>
            
            <span className="link-signin" onClick={() => navigate('/login')}>Sign In</span>
        </div>
      </div>
      

      {/* 2. Hero Section (Video) */}
      <div className="hero-section-tiffit">
        <video autoPlay loop muted playsInline className="video-bg">
            <source src="/food.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content animate-up">
            <h1>Ghar Ka Khana, <br/> Delivered Right to You.</h1>
            <p>Fresh, hygienic and affordable home-style tiffins for students & professionals in Nashik.</p>
            <button className="cta-btn" onClick={() => navigate('/menu')}>Find Tiffin Near Me</button>
            <div className="partner-link-small" onClick={() => navigate('/partner-signup')}>
                Are you a Mess Owner? Partner with us.
            </div>
        </div>
      </div>

      {/* 3. Section: How It Works */}
      <div className="section-white">
        <h2 className="section-heading">How Tiffny Works</h2>
        <div className="steps-grid">
            <div className="step-item"><span className="step-icon">📍</span><h3>Tell us your location</h3><p>Enter your area or hostel to find nearby providers.</p></div>
            <div className="step-item"><span className="step-icon">🍱</span><h3>Choose your tiffin</h3><p>Compare mess plans, home cooks and prices easily.</p></div>
            <div className="step-item"><span className="step-icon">🛵</span><h3>Get Ghar-ka-Khana</h3><p>Daily deliveries with consistent quality and taste.</p></div>
        </div>
      </div>

      {/* 4. Section: Popular Plans (Carousel) */}
      <div className="section-grey">
        <h2 className="section-heading">Popular Tiffin Plans in Nashik</h2>
        <p style={{textAlign: "center", marginBottom: "40px", color: "#666"}}>Handpicked plans for students, professionals and families.</p>
        
        <div className="carousel-wrapper">
            <button className="scroll-btn left" onClick={() => scroll('left')}>❮</button>
            
            <div className="plan-carousel" ref={scrollRef}>
                {plans.map((plan, index) => (
                    <div key={index} className="plan-card-premium">
                        <div className={`plan-tag tag-${plan.color}`}>{plan.tag}</div>
                        <h3>{plan.title}</h3>
                        <p className="plan-desc">{plan.desc}</p>
                        <div className="price-box">
                            <span className="starting-at">Starting at</span>
                            <span className="plan-price">{plan.price}</span>
                        </div>
                        <button className="plan-btn-full" onClick={() => navigate('/menu')}>View Details</button>
                    </div>
                ))}
            </div>

            <button className="scroll-btn right" onClick={() => scroll('right')}>❯</button>
        </div>
      </div>

      {/* 5. Section: Why Choose Us */}
      <div className="section-white">
        <h2 className="section-heading">Why People Love Tiffny</h2>
        <div className="features-row">
            <div className="feature-block"><span className="feat-icon">🏠</span><h4>Home-Style Taste</h4><p>No heavy hotel oil/masala. Just pure homemade taste.</p></div>
            <div className="feature-block"><span className="feat-icon">✅</span><h4>Verified Hygiene</h4><p>Every kitchen is FSSAI verified and hygiene checked.</p></div>
            <div className="feature-block"><span className="feat-icon">⏸️</span><h4>Flexible Plans</h4><p>Pause or skip days easily when you are travelling.</p></div>
        </div>
      </div>

      {/* 6. Section: For Partners */}
      <div className="partner-block-large">
        <div className="partner-content-left">
            <h2>Grow Your Mess or Kitchen with Tiffny</h2>
            <p>Reach thousands of hungry users in Nashik with zero hassle onboarding.</p>
            <ul className="partner-list">
                <li>✔ Simple online registration and KYC</li>
                <li>✔ Dashboard for orders and payments</li>
                <li>✔ Support in menu/pricing optimisation</li>
            </ul>
            <button className="btn-register-large" onClick={() => navigate('/partner-signup')}>Register Your Mess / Cloud Kitchen</button>
        </div>
        <div className="partner-image-right"><img src="https://cdn-icons-png.flaticon.com/512/2082/2082156.png" alt="Chef" /></div>
      </div>

      {/* 7. Testimonials */}
      <div className="section-grey">
        <h2 className="section-heading">What Our Customers Say</h2>
        <div className="reviews-grid">
            <div className="review-card"><div className="stars">★★★★★</div><p>"Feels exactly like food from home. Delivery is always on time."</p><span>- Rohan, MCA Student</span></div>
            <div className="review-card"><div className="stars">★★★★☆</div><p>"Best option for office lunch. The bhakri and pithla is amazing!"</p><span>- Sneha, IT Professional</span></div>
            <div className="review-card"><div className="stars">★★★★★</div><p>"Very easy to pause subscription when I go to my hometown."</p><span>- Amit, Engineering Student</span></div>
        </div>
      </div>

      {/* 8. FAQ Section */}
      <div className="section-white">
        <h2 className="section-heading">Frequently Asked Questions</h2>
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
        <div className="footer-cols">
            <div className="f-col"><h3>Tiffny</h3><p>Serving hot & fresh tiffins across Nashik.</p></div>
            <div className="f-col"><h4>Company</h4><span>About Us</span><span>Team</span><span>Careers</span></div>
            <div className="f-col"><h4>Contact</h4><span>Help & Support</span><span>Partner with us</span><span>Nashik, MH</span></div>
            <div className="f-col"><h4>Legal</h4><span>Terms & Conditions</span><span>Privacy Policy</span></div>
        </div>
        <hr className="footer-line"/>
        <p className="copyright">© 2025 Tiffny Foods Pvt Ltd. All rights reserved.</p>
      </div>

    </div>
  );
}

export default Home;