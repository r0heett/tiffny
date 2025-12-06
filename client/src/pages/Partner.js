import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Partner.css';

function Partner() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '',
    messName: '', type: 'Single', address: '', pincode: '',
    menuItems: '', price: 150,
    plan: 'Pro'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- DATA SUBMIT FUNCTION (NEW) ---
  const submitApplication = async () => {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/partner/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        
        if (data.status === "success") {
            setStep(7); // Success Screen दाखवा
        } else {
            alert("Error: " + data.message);
        }
    } catch (err) {
        console.error(err);
        alert("Server Error! Make sure Python is running.");
    }
  };

  const handleNext = () => {
    // Validation
    if(step === 2 && (!formData.mobile || !formData.name)) {
        setError("shake"); setTimeout(() => setError(""), 500); return;
    }
    if(step === 2 && !showOtp) { setShowOtp(true); return; } 

    // शेवटची स्टेप असेल तर सबमिट करा
    if(step === 6) {
        submitApplication();
    } else {
        setStep(step + 1);
        window.scrollTo(0,0);
    }
  };

  const handleBack = () => setStep(step - 1);

  return (
    <>
      {/* --- STEP 1: HERO SCREEN --- */}
      {step === 1 ? (
        <div className="hero-step-modern">
            <h1>Join <span style={{color: "#FF6B35"}}>Tiffny</span> Today!</h1>
            <p style={{fontSize: "22px", fontWeight: "300"}}>Register your Mess or Cloud Kitchen in 5 minutes</p>
            <div className="hero-features">
                <div className="feat-box">🏷️ 0% Commission<br/><small>For 30 Days</small></div>
                <div className="feat-box">👥 10k+ Users<br/><small>Waiting for you</small></div>
                <div className="feat-box">📱 Free App<br/><small>Manage Orders</small></div>
            </div>
            <button className="btn-primary" style={{padding: "20px 60px", fontSize: "20px"}} onClick={() => setStep(2)}>
                Start Registration ➜
            </button>
        </div>
      ) : (
        /* --- WIZARD FORM --- */
        <div className="wizard-container">
            <div className="wizard-header-strip"></div>
            
            <div className="progress-area">
                <div className="progress-steps">
                    <div className="progress-fill" style={{width: `${((step-2)/5)*100}%`}}></div>
                    {[2,3,4,5,6,7].map(s => (
                        <div key={s} className={`step-dot ${step >= s ? 'active' : ''}`}>
                            {step > s ? '✔' : s-1}
                        </div>
                    ))}
                </div>
                <div className="step-labels">
                    {step === 2 && "Contact"} {step === 3 && "Business"} {step === 4 && "Menu"} 
                    {step === 5 && "Docs"} {step === 6 && "Plan"} {step === 7 && "Done"}
                </div>
            </div>

            <div className="step-content">
                {step === 2 && (
                    <>
                        <h2>Let's start with basics</h2>
                        <div className="floating-group"><input type="text" name="mobile" className={`floating-input ${error}`} placeholder=" " onChange={handleChange} /><label className="floating-label">Mobile (+91)</label></div>
                        <div className="floating-group"><input type="text" name="name" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Full Name</label></div>
                        <div className="floating-group"><input type="email" name="email" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Email</label></div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2>Tell us about your Mess</h2>
                        <div className="floating-group"><input type="text" name="messName" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Mess Name</label></div>
                        <div className="floating-group"><input type="text" name="address" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Address</label></div>
                        <div className="floating-group"><input type="text" name="pincode" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Pincode</label></div>
                    </>
                )}

                {step === 4 && (
                    <>
                        <h2>Menu & Pricing</h2>
                        <div className="floating-group"><input type="text" name="menuItems" className="floating-input" placeholder=" " onChange={handleChange} /><label className="floating-label">Sample Thali Items</label></div>
                        <label style={{display:"block", marginBottom:"10px"}}>Avg Price for 2: ₹{formData.price}</label>
                        <input type="range" min="50" max="800" name="price" value={formData.price} onChange={handleChange} style={{width:"100%", accentColor:"#FF6B35"}} />
                    </>
                )}

                {step === 5 && (
                    <>
                        <h2>Compliance Documents</h2>
                        <p style={{color:"red"}}>* FSSAI License is Mandatory</p>
                        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px"}}>
                            <div className="upload-zone">📄 Upload FSSAI</div>
                            <div className="upload-zone">🆔 Upload PAN</div>
                        </div>
                    </>
                )}

                {step === 6 && (
                    <>
                        <h2>Select Plan</h2>
                        <div style={{display:"flex", gap:"20px", marginTop:"20px"}}>
                            <div style={{flex:1, border:"2px solid #eee", padding:"20px", borderRadius:"10px"}}><h3>Basic</h3><p>18% Comm.</p><input type="radio" name="plan" value="Basic" onChange={handleChange} /></div>
                            <div style={{flex:1, border:"2px solid #FF6B35", background:"#fff5f0", padding:"20px", borderRadius:"10px"}}><h3>Pro</h3><p>15% Comm.</p><input type="radio" name="plan" value="Pro" defaultChecked onChange={handleChange} /></div>
                        </div>
                    </>
                )}

                {step === 7 && (
                    <div style={{textAlign:"center", padding:"40px"}}>
                        <h1 style={{fontSize:"60px"}}>🎉</h1>
                        <h2 style={{color:"#4aa02c"}}>Application Submitted!</h2>
                        <p>We will contact you shortly.</p>
                        <button className="btn-primary" onClick={() => navigate('/owner-dashboard')}>Go to Dashboard</button>
                    </div>
                )}
            </div>

            {step < 7 && (
                <div className="nav-footer">
                    <button className="btn-secondary" onClick={handleBack}>Back</button>
                    <button className="btn-primary" onClick={handleNext}>{step === 6 ? 'Submit Application' : 'Next Step ➜'}</button>
                </div>
            )}
        </div>
      )}

      {/* OTP Modal */}
      {showOtp && (
        <div className="otp-modal-overlay">
            <div className="otp-card">
                <h3>Verify Number</h3>
                <p>OTP sent to {formData.mobile}</p>
                <input type="text" className="otp-field" placeholder="123456" />
                <button className="btn-primary" style={{width:"100%", marginTop:"30px"}} onClick={() => {setShowOtp(false); setStep(3);}}>Verify</button>
            </div>
        </div>
      )}
    </>
  );
}

export default Partner;