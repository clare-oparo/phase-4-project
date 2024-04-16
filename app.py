from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from flask_httpauth import HTTPBasicAuth
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SECRET_KEY'] = 'nomnomnom'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
auth = HTTPBasicAuth()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    email = db.Column(db.String(64), unique=True, index=True)
    bio = db.Column(db.String(500), default='')
    favorite_food = db.Column(db.String(200), default='')
    profile_picture = db.Column(db.String(255), default='')

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

@app.route('/api/users', methods=['POST'])
def new_user():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if username is None or password is None or email is None:
        return jsonify({'message': 'missing arguments'}), 400
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({'message': 'user already exists'}), 400
    user = User(username=username, email=email)
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'username': user.username}), 201, {'Location': f'/api/users/{user.id}'}


@auth.verify_password
def verify_password(username_or_token, password):
    user = User.query.filter_by(username=username_or_token).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True

@app.route('/api/users/<int:id>/profile', methods=['PUT'])
@auth.login_required
def update_profile(id):
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if g.user.id != id:
        return jsonify({'message': 'Unauthorized'}), 403
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

@app.route('/api/login', methods=['POST'])
@auth.login_required
def login():
    return jsonify({'message': 'Logged in successfully'})

@app.route('/')
def home():
    return "Welcome to the Nom API"

if __name__ == '__main__':
    app.run(debug=True)
