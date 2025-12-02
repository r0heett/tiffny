import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' किंवा 'signup'
  const [showPassword, setShowPassword] = useState(false); // पासवर्ड दिसण्यासाठी स्टेट
  const navigate = useNavigate();

  // फॉर्मचा डेटा
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    role: 'user' // डीफॉल्ट 'User'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTION: बटण दाबल्यावर काय करायचे? ---
 // --- ACTION: बटण दाबल्यावर काय करायचे? ---
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
                alert("Registration Successful! Please Login.");
                // बदला: आता आपण त्याला Login टॅबवर पाठवत आहोत
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
                
                // बदला: लॉगिन झाल्यावर डॅशबोर्डवर पाठवणे
                if(data.role === 'mess_partner') navigate('/owner-dashboard');
                else navigate('/dashboard');
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

        {/* --- TABS --- */}
        <div className="auth-tabs">
            <div className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
                Login
            </div>
            <div className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>
                Sign Up
            </div>
        </div>

        {/* --- FORM FIELDS --- */}
        <div className="auth-form">
            
            {/* फक्त Sign Up ला नाव विचारा */}
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

            {/* --- PASSWORD FIELD WITH EYE ICON --- */}
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
                    <span 
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? "Hide Password" : "Show Password"}
                    >
                        {showPassword ? "🙈" : "👁️"} 
                    </span>
                </div>
            </div>

            {/* फक्त Sign Up ला रोल विचारा */}
            {activeTab === 'signup' && (
                <div className="input-group">
                    <label className="input-label">I am a...</label>
                    <div className="role-group">
                        <label className="role-option">
                            <input type="radio" name="role" value="user" checked={formData.role === 'user'} onChange={handleChange} />
                            User
                        </label>
                        <label className="role-option">
                            <input type="radio" name="role" value="mess_partner" checked={formData.role === 'mess_partner'} onChange={handleChange} />
                            Mess Partner
                        </label>
                    </div>
                </div>
            )}

            {/* Login / Sign Up Button */}
            <button className="auth-btn" onClick={handleSubmit}>
                {activeTab === 'login' ? 'Login' : 'Create Account'}
            </button>

            <p className="footer-text">
                By continuing, you agree to Tiffny's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </p>
        </div>
      </div>
    </div>
  );
}

export default Login;