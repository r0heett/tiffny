import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserAuth.css';

function UserAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false); 
  
  // --- दोन वेगळे स्टेट्स (States) ---
  const [showPassword, setShowPassword] = useState(false);        // मुख्य पासवर्डसाठी
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // कन्फर्म पासवर्डसाठी

  const [formData, setFormData] = useState({
    mobile: '', name: '', email: '', password: '', confirmPass: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) newErrors.mobile = "Enter valid 10-digit number";
    if (!formData.password) newErrors.password = "Password is required";

    if (!isLogin) {
        if (!formData.name.trim()) newErrors.name = "Full Name is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid Email format";
        if (formData.password.length < 6) newErrors.password = "Password must be 6+ chars";
        if (formData.password !== formData.confirmPass) newErrors.confirmPass = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const url = isLogin 
        ? 'http://127.0.0.1:5000/api/login_password' 
        : 'http://127.0.0.1:5000/api/signup';

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();

        if (data.status === "success") {
            alert(data.message);
            if (isLogin || data.status === "success") {
                localStorage.setItem("userMobile", formData.mobile);
                localStorage.setItem("userName", isLogin ? data.name : formData.name);
                navigate('/'); 
            } else {
                setIsLogin(true);
            }
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server Error!");
    }
  };

  return (
    <div className="user-auth-container">
      <div className="auth-card-student">
        
        <div className="auth-header">
            <h1>{isLogin ? "Welcome Back" : "Create Your Student Account"}</h1>
            <p>{isLogin ? "Log in to continue." : "Sign up to explore messes and home-style tiffins."}</p>
        </div>

        <div className="input-wrapper">
            <input type="text" name="mobile" className="student-input" placeholder=" " maxLength="10" onChange={handleChange} />
            <label className="floating-lbl">Mobile Number (+91)</label>
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
        </div>

        {!isLogin && (
            <>
                <div className="input-wrapper">
                    <input type="text" name="name" className="student-input" placeholder=" " onChange={handleChange} />
                    <label className="floating-lbl">Full Name</label>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                </div>
                <div className="input-wrapper">
                    <input type="email" name="email" className="student-input" placeholder=" " onChange={handleChange} />
                    <label className="floating-lbl">Email Address</label>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
            </>
        )}

        {/* --- Password Field 1 --- */}
        <div className="input-wrapper">
            <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="student-input" 
                placeholder=" " 
                onChange={handleChange} 
            />
            <label className="floating-lbl">Password</label>
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
            </span>
            {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {/* --- Confirm Password Field (New Eye Icon) --- */}
        {!isLogin && (
            <div className="input-wrapper">
                <input 
                    type={showConfirmPassword ? "text" : "password"} // इथे वेगळे स्टेट वापरले
                    name="confirmPass" 
                    className="student-input" 
                    placeholder=" " 
                    onChange={handleChange} 
                />
                <label className="floating-lbl">Confirm Password</label>
                
                {/* दुसरे डोळ्याचे बटण */}
                <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? "🙈" : "👁️"}
                </span>

                {errors.confirmPass && <span className="error-text">{errors.confirmPass}</span>}
            </div>
        )}

        {isLogin && <span className="forgot-link" onClick={() => alert("Reset Link Sent!")}>Forgot password?</span>}

        <button className="btn-student" onClick={handleSubmit}>
            {isLogin ? "Log in" : "Continue"}
        </button>

        <div className="toggle-area">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign Up" : "Log in instead"}
            </span>
        </div>

      </div>
    </div>
  );
}

export default UserAuth;