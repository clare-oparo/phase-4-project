from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from flask_httpauth import HTTPBasicAuth
from flask_migrate import Migrate
from flask_cors import CORS 
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'nomnomnom'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, resources={r"/*": {"origins": "*"}})
auth = HTTPBasicAuth()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True, index=True)
    password_hash = db.Column(db.String(128))
    email = db.Column(db.String(64), unique=True)
    bio = db.Column(db.String(500), default='')
    favorite_food = db.Column(db.String(200), default='')
    profile_picture = db.Column(db.String(255), default='')
    recipes = db.relationship('Recipe', backref='author', lazy=True)

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comments = db.relationship('Comment', backref='recipe', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)
    replies = db.relationship('Reply', backref='comment', lazy=True)

class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'), nullable=False)

@app.route('/register', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if not all([username, password, email]):
        return jsonify({'message': 'missing arguments', 'success': False}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'user already exists', 'success': False}), 400
    user = User(username=username, email=email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'username': user.username, 'success': True, 'userId': user.id}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.verify_password(password):
        return jsonify({'message': 'Logged in successfully', 'success': True, 'userId': user.id})
    return jsonify({'message': 'Invalid username or password', 'success': False}), 401

@app.route('/users/<int:id>/profile', methods=['PUT', 'GET'])
@auth.login_required
def handle_profile(id):
    user = User.query.get_or_404(id)
    if request.method == 'PUT':
        user.bio = request.json.get('bio', user.bio)
        user.favorite_food = request.json.get('favorite_food', user.favorite_food)
        user.profile_picture = request.json.get('profile_picture', user.profile_picture)
        db.session.commit()
        return jsonify({
            'username': user.username,
            'bio': user.bio,
            'favorite_food': user.favorite_food,
            'profile_picture': user.profile_picture
        })
    elif request.method == 'GET':
        return jsonify({
            'username': user.username,
            'bio': user.bio,
            'favorite_food': user.favorite_food,
            'profile_picture': user.profile_picture
        })

@app.route('/')
def home():
    return "Welcome to the Nom API"

if __name__ == '__main__':
    app.run(debug=True)
