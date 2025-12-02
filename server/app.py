import os # फोटो सेव्ह करण्यासाठी
from werkzeug.utils import secure_filename # फाईलच्या नावासाठी
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt # पासवर्डसाठी
from datetime import datetime

app = Flask(__name__)
# फोटो सेव्ह करण्यासाठी फोल्डर (Client च्या public फोल्डरमध्ये टाकू म्हणजे दिसेल)
UPLOAD_FOLDER = '../client/public/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True) # फोल्डर नसेल तर बनव
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
# --- 1. Owner Stats API (कमाई आणि ऑर्डर्स दाखवण्यासाठी) ---
@app.route('/api/owner/stats', methods=['GET'])
def get_owner_stats():
    # सध्या आपण डमी डेटा पाठवू (नंतर हे डेटाबेस मधून येईल)
    stats = {
        "earnings": 45000,
        "subscribers": 120,
        "guest_orders": 35,
        "total_orders": 155
    }
    return jsonify({"status": "success", "data": stats})

# --- 2. Menu Update API (फोटो आणि माहिती सेव्ह करण्यासाठी) ---
@app.route('/api/owner/update_menu', methods=['POST'])
def update_menu():
    try:
        mess_name = request.form.get('mess_name')
        description = request.form.get('description')
        price = request.form.get('price')
        meal_type = request.form.get('meal_type') # Lunch or Dinner
        
        # फोटो आला आहे का?
        image_filename = ""
        if 'image' in request.files:
            file = request.files['image']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                image_filename = f"/uploads/{filename}" # हा पाथ आपण सेव्ह करू

        # इथे तुम्ही डेटाबेस मध्ये सेव्ह करू शकता (सध्या आपण प्रिंट करू)
        print(f"🍱 Menu Updated: {meal_type} | Price: {price} | Img: {image_filename}")

        return jsonify({"status": "success", "message": f"{meal_type} Menu Updated Successfully!"})
    except Exception as e:
        print(e)
        return jsonify({"status": "error", "message": "Upload Failed"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)