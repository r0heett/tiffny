from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt # पासवर्डसाठी
from datetime import datetime

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app) # Bcrypt चालू केले

# MongoDB कनेक्शन
# (जर तुमच्याकडे पासवर्ड असेल तर लिंक बदला, सध्या लोकलहोस्ट आहे)
client = MongoClient("mongodb://localhost:27017/")
db = client['tiffny_db']
users_collection = db['users']

@app.route('/', methods=['GET'])
def home():
    return "Hello! Tiffny Server is Running Successfully."

# --- 1. SIGN UP API (नवीन युजर बनवणे) ---
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    mobile = data.get('mobile')
    password = data.get('password')
    role = data.get('role')

    if not all([name, mobile, password, role]):
        return jsonify({"status": "error", "message": "All fields are required"})

    # चेक करा नंबर आधीच आहे का?
    if users_collection.find_one({"mobile": mobile}):
        return jsonify({"status": "error", "message": "User already exists!"})

    # पासवर्ड हॅश करा (सुरक्षित करा)
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = {
        "name": name,
        "mobile": mobile,
        "password": hashed_password,
        "role": role,
        "joined_at": datetime.now()
    }
    
    users_collection.insert_one(new_user)
    print(f"✅ New {role} Registered: {name}")
    return jsonify({"status": "success", "message": "Registration Successful!"})

# --- 2. LOGIN API (पासवर्ड चेक करणे) ---
@app.route('/api/login_password', methods=['POST'])
def login_password():
    data = request.json
    mobile = data.get('mobile')
    password = data.get('password')

    if not mobile or not password:
        return jsonify({"status": "error", "message": "Enter mobile and password"})

    user = users_collection.find_one({"mobile": mobile})
    
    if user:
        # पासवर्ड बरोबर आहे का?
        if bcrypt.check_password_hash(user['password'], password):
            return jsonify({
                "status": "success", 
                "message": "Login Successful!",
                "role": user.get('role', 'user'),
                "name": user.get('name')
            })
        else:
            return jsonify({"status": "error", "message": "Wrong Password!"})
    else:
        return jsonify({"status": "error", "message": "User not found. Please Sign Up."})

# --- 3. MESS LIST API ---
@app.route('/api/messes', methods=['GET'])
def get_messes():
    # हार्डकोड डेटा (तुम्ही हे नंतर डेटाबेस मधून आणू शकता)
    messes = [
        {
            "id": 1, "name": "Annapurna Mess", "type": "Pure Veg", "price": "2500",
            "image": "https://cdn-icons-png.flaticon.com/512/3480/3480823.png"
        },
        {
            "id": 2, "name": "Kolhapuri Zatka", "type": "Veg / Non-Veg", "price": "3200",
            "image": "https://cdn-icons-png.flaticon.com/512/706/706164.png"
        },
        {
            "id": 3, "name": "Gharchi Chav", "type": "Pure Veg", "price": "2200",
            "image": "https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
        }
    ]
    return jsonify(messes)

# --- 4. MESS DETAILS API ---
@app.route('/api/mess/<int:id>', methods=['GET'])
def get_mess_details(id):
    mess_details = {
        1: { "id": 1, "name": "Annapurna Mess", "price": 2500, "owner": "Raju Kaka", "phone": "9890989098", "menu": ["Chapati", "Paneer", "Rice"], "image": "https://cdn-icons-png.flaticon.com/512/3480/3480823.png" },
        2: { "id": 2, "name": "Kolhapuri Zatka", "price": 3200, "owner": "Surekha Mavshi", "phone": "9988776655", "menu": ["Bhakri", "Chicken", "Rassa"], "image": "https://cdn-icons-png.flaticon.com/512/706/706164.png" },
        3: { "id": 3, "name": "Gharchi Chav", "price": 2200, "owner": "Pooja Tai", "phone": "8888888888", "menu": ["Chapati", "Bhaji", "Varan"], "image": "https://cdn-icons-png.flaticon.com/512/2921/2921822.png" }
    }
    mess = mess_details.get(id)
    if mess:
        return jsonify({"status": "success", "data": mess})
    else:
        return jsonify({"status": "error", "message": "Mess not found"})

# --- 5. User Update API ---
@app.route('/api/user/update', methods=['POST'])
def update_user_profile():
    data = request.json
    mobile = data.get('mobile')
    name = data.get('name')
    email = data.get('email')

    users_collection.update_one(
        {"mobile": mobile},
        {"$set": {"name": name, "email": email}}
    )
    return jsonify({"status": "success", "message": "Updated"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)