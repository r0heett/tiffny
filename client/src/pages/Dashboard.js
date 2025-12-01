import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  
  const mobile = localStorage.getItem("userMobile"); 

  useEffect(() => {
    if (!mobile) {
      navigate('/login'); // जर नंबर नसेल तर लॉगिनला पाठवा
      return;
    }

    // Python कडून माहिती मागवणे
    fetch(`http://127.0.0.1:5000/api/user/${mobile}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setUser(data.data);
        }
      })
      .catch(err => console.error(err));
  }, [mobile, navigate]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {user ? (
        <div>
            {/* हेडर */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <h2>👤 My Dashboard</h2>
                <button onClick={() => {
                    localStorage.removeItem("userMobile");
                    navigate('/login');
                }} style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>
                    Logout
                </button>
            </div>

            {/* युजरची माहिती */}
            <div style={{ marginTop: "20px", backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "10px" }}>
                <h3>Welcome, Student!</h3>
                <p><strong>Mobile:</strong> {user.mobile}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Joined Date:</strong> {new Date(user.joined_at).toLocaleDateString()}</p>
            </div>

            {/* सध्याचे प्लॅन */}
            <div style={{ marginTop: "30px" }}>
                <h3>🍛 My Active Subscription</h3>
                <div style={{ border: "1px dashed orange", padding: "20px", borderRadius: "10px", backgroundColor: "#fff7e6" }}>
                    <p>You don't have any active mess subscription yet.</p>
                    <button style={{ backgroundColor: "orange", color: "white", border: "none", padding: "10px", cursor: "pointer" }}>
                        Find a Mess
                    </button>
                </div>
            </div>

        </div>
      ) : (
        <p>Loading Profile...</p>
      )}
    </div>
  );
}

export default Dashboard;