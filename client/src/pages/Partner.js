import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Partner.css';

function Partner() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false); // फॉर्म दाखवण्यासाठी

  // फॉर्म डेटा
  const [formData, setFormData] = useState({
    messName: '',
    ownerName: '',
    mobile: '',
    city: 'Nashik'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // इथे API कॉल करू शकतो
    if(formData.messName && formData.mobile) {
        // डेमो साठी थेट डॅशबोर्डवर नेऊ
        alert("Registration Successful!");
        navigate('/owner-dashboard');
    } else {
        alert("Please fill details");
    }
  };

  return (
    <div className="partner-container">
      
      {/* 1. Hero Section */}
      <div className="partner-hero">
        <div className="hero-content">
            <h1>
                <span className="highlight-green">Partner with Tiffny</span> <br/> 
                and grow your business
            </h1>
            <p>Join 500+ home chefs in Nashik.</p>
            
            {/* बटण दाबल्यावर फॉर्म उघडेल */}
            <button className="register-btn" onClick={() => setShowForm(true)}>
                Register your Mess
            </button>
        </div>
      </div>

      {/* 2. Get Started List (Overlap) */}
      <div className="get-started-section">
        <div className="get-started-card">
            <h2>Get started: It only takes 10 minutes</h2>
            <p>Please keep these documents and details ready for a smooth sign-up</p>
            <div className="docs-grid">
                <div className="doc-item"><span className="check-icon">✔</span> PAN card</div>
                <div className="doc-item"><span className="check-icon">✔</span> GST number, if applicable</div>
                <div className="doc-item"><span className="check-icon">✔</span> FSSAI license</div>
                <div className="doc-item"><span className="check-icon">✔</span> Menu & Food Images</div>
                <div className="doc-item"><span className="check-icon">✔</span> Bank Account Details</div>
                <div className="doc-item"><span className="check-icon">✔</span> Owner Aadhar Card</div>
            </div>
        </div>
      </div>

      {/* --- 3. REGISTRATION POPUP FORM (Modal) --- */}
      {showForm && (
        <div className="modal-overlay">
            <div className="modal-box">
                <button className="close-btn" onClick={() => setShowForm(false)}>×</button>
                
                <h2 style={{textAlign: "center", marginBottom: "10px"}}>Get Started</h2>
                <p style={{textAlign: "center", color: "gray", fontSize: "14px", marginBottom: "20px"}}>Create your partner account in 5 minutes.</p>

                <label>Mess / Kitchen Name</label>
                <input type="text" name="messName" className="modal-input" placeholder="Ex. Annapurna Mess" onChange={handleChange} />

                <label>Owner Name</label>
                <input type="text" name="ownerName" className="modal-input" placeholder="Your Full Name" onChange={handleChange} />

                <label>Mobile Number</label>
                <input type="text" name="mobile" className="modal-input" placeholder="10-digit Number" onChange={handleChange} />

                <label>City</label>
                <input type="text" name="city" className="modal-input" value="Nashik" disabled />

                <button className="submit-btn" onClick={handleSubmit}>Proceed to Dashboard ➡️</button>
            </div>
        </div>
      )}

    </div>
  );
}

export default Partner;