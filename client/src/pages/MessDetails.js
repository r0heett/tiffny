import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function MessDetails() {
  const { id } = useParams(); // URL मधून id घेणे (उदा. 1)
  const [mess, setMess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Python कडून माहिती मागवणे
    fetch(`http://127.0.0.1:5000/api/mess/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setMess(data.data);
        }
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!mess) return <h2>Loading Menu...</h2>;

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial" }}>
      <button onClick={() => navigate('/')} style={{ float: "left", cursor: "pointer" }}>⬅ Back</button>
      
      <img src={mess.image} alt="mess" style={{ width: "100px", marginTop: "20px" }} />
      <h1>{mess.name}</h1>
      <p style={{ color: "gray" }}>Owner: {mess.owner} | 📞 {mess.phone}</p>
      
      <div style={{ backgroundColor: "#fff3cd", padding: "20px", margin: "20px auto", width: "80%", borderRadius: "10px" }}>
        <h2>🍽 Today's Menu</h2>
        <ul style={{ listStyleType: "none", padding: 0, fontSize: "18px" }}>
            {mess.menu.map((item, index) => (
                <li key={index} style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>✅ {item}</li>
            ))}
        </ul>
      </div>

      <h3>Monthly Price: ₹{mess.price}</h3>
      
      <button style={{ padding: "15px 30px", fontSize: "18px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Subscribe Now
      </button>
    </div>
  );
}

export default MessDetails;