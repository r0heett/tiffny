import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [activeTab, setActiveTab] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // फॉर्म डेटा (डीफॉल्ट रोल 'user' ठेवला आहे)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    role: 'user' // फिक्स केले (फक्त User)
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, mobile, password, role } = formData;

    // --- 1. SIGN UP LOGIC ---
    if (activeTab === 'signup') {
        if (!name || !mobile || !password) {
            alert("Please fill all details!"); return;
        }
        
        try {
            const res = await fetch('http://127.0.0.1:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if(data.status === "success") {
                alert("Account Created! Please Login.");
                setActiveTab('login'); 
            } else {
                alert(data.message);
            }
        } catch(err) { console.error(err); alert("Server Error"); }
    } 
    
    // --- 2. LOGIN LOGIC ---
    else {
        if (!mobile || !password) {
            alert("Enter Mobile and Password!"); return;
        }

        try {
            const res = await fetch('http://127.0.0.1:5000/api/login_password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, password })
            });
            const data = await res.json();
            
            if(data.status === "success") {
                localStorage.setItem("userMobile", mobile);
                localStorage.setItem("userRole", data.role);
                localStorage.setItem("userName", data.name);
                
                alert("Login Successful! Welcome " + data.name);
                
                // बदला: आता थेट होम पेजवर पाठवले (Home Page)
                navigate('/'); 
            } else {
                alert(data.message);
            }
        } catch(err) { console.error(err); alert("Server Error"); }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      
      <div className="auth-box">
        <h1 className="brand-title">Tiffny</h1>

        <div className="auth-tabs">
            <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</div>
            <div className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign Up</div>
        </div>

        <div className="auth-form">
            {activeTab === 'signup' && (
                <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <input type="text" name="name" className="auth-input" placeholder="Enter full name" onChange={handleChange} />
                </div>
            )}

            <div className="input-group">
                <label className="input-label">Phone Number</label>
                <input type="text" name="mobile" className="auth-input" placeholder="Enter 10-digit number" onChange={handleChange} />
            </div>

            <div className="input-group">
                <label className="input-label">Password</label>
                <div className="password-wrapper">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        className="auth-input" 
                        placeholder="Enter password" 
                        onChange={handleChange} 
                    />
                    <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "🙈" : "👁️"} 
                    </span>
                </div>
            </div>

            {/* रोल सिलेक्शन काढून टाकले आहे */}

            <button className="auth-btn" onClick={handleSubmit}>
                {activeTab === 'login' ? 'Login' : 'Create Account'}
            </button>

            <p className="footer-text">
                Welcome to Tiffny - Nashik's Best Food Network! 🍇
            </p>
        </div>
      </div>
    </div>
  );
}

export default Login;