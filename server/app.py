from flask import Flask, jsonify, request, send_file
from flask_login import login_required, LoginManager, login_user, current_user
from flask_migrate import Migrate
from models import *
import bcrypt
import os
from flask_cors import CORS 
from models import Recipe


BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    # Return the user object or None if not found
    return User.query.get(user_id)

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
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/<string:username>/details', methods=['GET', 'POST', 'PATCH'])
@login_required
def user_details(username):
    user = User.query.filter_by(username=username).first()
    if not user or current_user != user:
        return jsonify({'message': 'User not found'}), 404

    if request.method == 'GET':
        user_details = UserDetail.query.filter_by(username_id=user.id).first()
        if not user_details:
            return jsonify({'message': 'User details not found'}), 404
        return jsonify({'user_details': user_details.to_dict()})

    elif request.method == 'POST':
        # Get the request data
        profile_picture = request.json.get('profile_picture')
        bio = request.json.get('bio')
        interests = request.json.get('interests')

        # Create user details
        user_detail = UserDetail(profile_picture=profile_picture, bio=bio, interests=interests, username_id=user.id)
        db.session.add(user_detail)
        db.session.commit()

        return jsonify({'message': 'User details created successfully'})

    elif request.method == 'PATCH':
        user_details = UserDetail.query.filter_by(username_id=user.id).first()
        if not user_details:
            return jsonify({'message': 'User details not found'}), 404

        # Get the request data
        profile_picture = request.json.get('profile_picture')
        bio = request.json.get('bio')
        interests = request.json.get('interests')

        # Update user details
        if profile_picture:
            user_details.profile_picture = profile_picture
        if bio:
            user_details.bio = bio
        if interests:
            user_details.interests = interests
        db.session.commit()

        return jsonify({'message': 'User details updated successfully'})
    
@app.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    return jsonify({'recipes': [recipe.to_dict() for recipe in recipes]})

@app.route('/<username>/recipes', methods=['GET'])
@login_required
def get_user_recipes(username):
    user = User.query.filter_by(username=username).first()
    if not user or current_user != user:
        return jsonify({'message': 'User not found'}), 404
    recipes = Recipe.query.filter_by(user_id=user.id).all()
    return jsonify({'recipes': [recipe.to_dict() for recipe in recipes]})

@app.route('/<username>/recipes/<int:recipe_id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def manage_user_recipe(username, recipe_id):
    user = User.query.filter_by(username=username).first()
    if not user or current_user != user:
        return jsonify({'message': 'User not found'}), 404
    recipe = Recipe.query.filter_by(id=recipe_id, user_id=user.id).first()
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404
    
    if request.method == 'GET':
        return jsonify({'recipe': recipe.to_dict()})
    
    elif request.method == 'PUT':
        # Update recipe details
        recipe.name = request.json.get('name', recipe.name)
        recipe.ingredients = request.json.get('ingredients', recipe.ingredients)
        recipe.images = request.json.get('images', recipe.images)
        recipe.instructions = request.json.get('instructions', recipe.instructions)
        recipe.rating = request.json.get('rating', recipe.rating)
        db.session.commit()
        return jsonify({'message': 'Recipe updated successfully'})
    
    elif request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({'message': 'Recipe deleted successfully'})

@app.route('/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe_by_id(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404
    return jsonify({'recipe': recipe.to_dict()})


@app.route('/<username>/comments', methods=['GET', 'POST'])
@login_required
def manage_user_comments(username):
    user = User.query.filter_by(username=username).first()
    if not user or current_user != user:
        return jsonify({'message': 'User not found'}), 404
    
    if request.method == 'GET':
        comments = Comment.query.filter_by(user_id=user.id).all()
        return jsonify({'comments': [comment.to_dict() for comment in comments]})
    
    elif request.method == 'POST':
        # Create a new comment
        comment_text = request.json.get('comment')
        recipe_id = request.json.get('recipe_id')
        new_comment = Comment(user_id=user.id, recipe_id=recipe_id, comment=comment_text)
        db.session.add(new_comment)
        db.session.commit()
        return jsonify({'message': 'Comment added successfully'})

@app.route('/comments', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()
    return jsonify({'comments': [comment.to_dict() for comment in comments]})

@app.route('/<username>/saved_recipes', methods=['GET'])
@login_required
def get_user_saved_recipes(username):
    user = User.query.filter_by(username=username).first()
    if not user  or current_user != user:
        return jsonify({'message': 'User not found'}), 404
    saved_recipes = SavedRecipe.query.filter_by(user_id=user.id).all()
    return jsonify({'saved_recipes': [saved_recipe.to_dict() for saved_recipe in saved_recipes]})

@app.route('/images/<path:image_name>')
def get_image(image_name):
    # Construct the path to the image file
    image_path = f'images/{image_name}'
    # Send the image file as a response
    return send_file(image_path)

@app.route('/search')
def search():
    query = request.args.get('query', '')
    if query:
        
        recipes = Recipe.query.filter(
            (Recipe.name.ilike(f'%{query}%')) | (Recipe.ingredients.ilike(f'%{query}%'))
        ).all()
        return jsonify([recipe.to_dict() for recipe in recipes])
    else:
        return jsonify([])



if __name__ == '__main__':
    app.run(debug=True)

