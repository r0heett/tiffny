import os
import random
from datetime import datetime
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
from bson import ObjectId

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# फोटो अपलोड फोल्डर
UPLOAD_FOLDER = '../client/public/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- MONGODB CONNECTION ---
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client['tiffny_db']
    users_collection = db['users']
    partners_collection = db['partners']
    print("✅ Connected to MongoDB Database!")
except Exception as e:
    print("❌ Error connecting to Database:", e)

# OTP साठवण्यासाठी
otp_storage = {}

@app.route('/', methods=['GET'])
def home():
    return "Hello! Tiffny Server is Running."

# --- 1. USER SIGNUP ---
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    if users_collection.find_one({"mobile": data['mobile']}):
        return jsonify({"status": "error", "message": "User already exists!"})
    
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    users_collection.insert_one({
        "name": data['name'], "mobile": data['mobile'], 
        "password": hashed_pw, "role": "user", "joined_at": datetime.now()
    })
    return jsonify({"status": "success", "message": "Registration Successful!"})

# --- 2. USER LOGIN ---
@app.route('/api/login_password', methods=['POST'])
def login_password():
    data = request.json
    user = users_collection.find_one({"mobile": data['mobile']})
    if user and bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({"status": "success", "message": "Login Success!", "name": user['name'], "role": user['role']})
    return jsonify({"status": "error", "message": "Invalid Details"})

# --- 3. PARTNER REGISTRATION ---
@app.route('/api/partner/signup', methods=['POST'])
def partner_signup():
    try:
        saved_files = {}
        file_keys = ['fssai', 'pan', 'cheque', 'kitchen']
        for key in file_keys:
            if key in request.files:
                file = request.files[key]
                if file.filename != '':
                    filename = secure_filename(f"{request.form.get('mobile')}_{key}_{file.filename}")
                    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                    saved_files[key] = f"/uploads/{filename}"

        db.partners.insert_one({
            "owner_name": request.form.get('name'),
            "mobile": request.form.get('mobile'),
            "email": request.form.get('email'),
            "mess_name": request.form.get('messName'),
            "address": request.form.get('address'),
            "price": request.form.get('price'),
            "documents": saved_files,
            "status": "Active",
            "joined_at": datetime.now()
        })
        return jsonify({"status": "success", "message": "Partner Registered!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

# --- 4. GET MESS LIST ---
@app.route('/api/messes', methods=['GET'])
def get_messes():
    messes = []
    for doc in db.partners.find():
        # फोटो नसेल तर डिफॉल्ट फोटो वापरा
        img = "https://cdn-icons-png.flaticon.com/512/3480/3480823.png"
        if 'documents' in doc and 'kitchen' in doc['documents']:
            img = doc['documents']['kitchen']

        messes.append({
            "id": str(doc['_id']),
            "name": doc.get('mess_name'),
            "type": "Veg/Non-Veg",
            "price": doc.get('price'),
            "owner": doc.get('owner_name'),
            "image": img
        })
    return jsonify(messes)

# --- 5. OWNER STATS ---
@app.route('/api/owner/stats', methods=['GET'])
def get_owner_stats():
    stats = { "earnings": 45000, "subscribers": 120, "guest_orders": 35, "total_orders": 155 }
    return jsonify({"status": "success", "data": stats})

if __name__ == '__main__':
    app.run(debug=True, port=5000)