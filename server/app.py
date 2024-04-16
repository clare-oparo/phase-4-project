from flask import Flask, jsonify, request
from flask_login import login_required
from flask_migrate import Migrate
from models import *
import bcrypt
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def home():
    return "Welcome to the Nom API! Let's Eat!"
users = {}  # A dict to store users for demo purposes

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
     # Check if username or email already exists in the database
    if User.query.filter(db.or_(User.username == username, User.email == email)).first():
        return jsonify({'message': 'User already exists'}), 409

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create a new user and store in the database
    new_user = User(username=username, password=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Retrieve the user from the database
    user = User.query.filter_by(username=username).first()

    # Verify the user and password
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        return jsonify({'message': 'Login successful'}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/user/details', methods=['GET', 'POST', 'PATCH', 'DELETE'])
@login_required
def user_details():
    if request.method == 'GET':
        # Retrieve user details code here
        return jsonify({'message': 'User details retrieved successfully'})
    elif request.method == 'POST':
        # Create user details code here
        return jsonify({'message': 'User details created successfully'})
    elif request.method == 'PATCH':
        # Update user details code here
        return jsonify({'message': 'User details updated successfully'})
    elif request.method == 'DELETE':
        # Delete user details code here
        return jsonify({'message': 'User details deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)

