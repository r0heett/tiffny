from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime # तारीख सेव्ह करण्यासाठी

app = Flask(__name__)
CORS(app)

# 1. MongoDB ला कनेक्ट करणे
# जर तुमच्याकडे MongoDB इन्स्टॉल नसेल, तर हे काम करणार नाही.
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client['tiffny_db'] # डेटाबेसचे नाव
    users_collection = db['users'] # टेबलचे नाव (Collection)
    print("✅ Connected to MongoDB Database!")
except Exception as e:
    print("❌ Error connecting to Database:", e)

@app.route('/', methods=['GET'])
def home():
    return "Hello! Tiffny Server is Running Successfully."
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    mobile = data.get('mobile')
    role = data.get('role', 'student') # जर रोल आला नाही तर 'student' समज
    
    if not mobile:
        return jsonify({"status": "error", "message": "No mobile number provided"})

    print(f"Login Request received for: {mobile} as {role}")

    try:
        # चेक करा युजर आहे का?
        existing_user = users_collection.find_one({"mobile": mobile})

        if existing_user:
            # जर युजर आधीच असेल, आणि त्याने रोल बदलला असेल तर अपडेट करा
            if existing_user.get('role') != role:
                users_collection.update_one({"mobile": mobile}, {"$set": {"role": role}})
            print("👤 User found and Role verified.")
        else:
            # नवीन युजर सेव्ह करा (रोल सहित)
            new_user = {
                "mobile": mobile,
                "role": role,  # <-- हे महत्वाचे
                "joined_at": datetime.now()
            }
            users_collection.insert_one(new_user)
            print(f"🆕 New {role} Saved to MongoDB!")
            
    except Exception as e:
        print("Database Error:", e)

    return jsonify({"message": "OTP sent successfully!", "status": "success"})
@app.route('/api/user/<mobile>', methods=['GET'])
def get_user_profile(mobile):
    user = users_collection.find_one({"mobile": mobile}, {"_id": 0}) # id नको फक्त माहिती हवी
    if user:
        return jsonify({"status": "success", "data": user})
    else:
        return jsonify({"status": "error", "message": "User not found"})
    # --- नवीन API: एका मेसचा डिटेल मेनू देण्यासाठी ---
@app.route('/api/mess/<int:id>', methods=['GET'])
def get_mess_details(id):
    # उदाहरणासाठी आपण इथेच डेटा तयार करत आहोत
    # (खऱ्या प्रोजेक्टमध्ये हा डेटाबेस मधून येईल)
    
    mess_details = {
        1: {
            "id": 1, "name": "Annapurna Mess", "price": 2500,
            "owner": "Raju Kaka", "phone": "9890989098",
            "menu": ["Chapati (3)", "Paneer Masala", "Jeera Rice", "Dal Fry", "Salad"],
            "image": "https://cdn-icons-png.flaticon.com/512/3480/3480823.png"
        },
        2: {
            "id": 2, "name": "Kolhapuri Zatka", "price": 3200,
            "owner": "Surekha Mavshi", "phone": "9988776655",
            "menu": ["Bhakri (2)", "Chicken Thali", "Tambda Pandhra Rassa", "Rice"],
            "image": "https://cdn-icons-png.flaticon.com/512/706/706164.png"
        },
        3: {
            "id": 3, "name": "Gharchi Chav", "price": 2200,
            "owner": "Pooja Tai", "phone": "8888888888",
            "menu": ["Chapati (3)", "Methi Bhaji", "Varan Bhat", "Pickle"],
            "image": "https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
        }
    }

    mess = mess_details.get(id)
    if mess:
        return jsonify({"status": "success", "data": mess})
    else:
        return jsonify({"status": "error", "message": "Mess not found"})
if __name__ == '__main__':
    app.run(debug=True, port=5000)