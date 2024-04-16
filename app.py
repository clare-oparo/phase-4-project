from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from passlib.apps import custom_app_context as pwd_context
from flask_httpauth import HTTPBasicAuth
from flask_migrate import Migrate
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Handles preflight requests
@app.route('/register', methods=['OPTIONS'])
def options():
    response = jsonify({'message': 'OK'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

app.config['SECRET_KEY'] = 'nomnomnom'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nomnom.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

auth = HTTPBasicAuth()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), unique=True)
    password_hash = db.Column(db.String(128))
    email = db.Column(db.String(64), unique=True)
    bio = db.Column(db.String(500), default='')
    favorite_food = db.Column(db.String(200), default='')
    profile_picture = db.Column(db.String(255), default='')
    recipes = db.relationship('Recipe', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='commenter', lazy='dynamic')
    replies = db.relationship('Reply', backref='replier', lazy='dynamic')

    def hash_password(self, password):
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        return pwd_context.verify(password, self.password_hash)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comments = db.relationship('Comment', backref='recipe', lazy='dynamic')

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'))
    replies = db.relationship('Reply', backref='comment', lazy='dynamic')

class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    comment_id = db.Column(db.Integer, db.ForeignKey('comment.id'))

@app.route('/register', methods=['POST'])
def create_user():
    data = request.json
    user = User(username=data['username'], email=data['email'])
    user.hash_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'id': user.id, 'username': user.username}), 201

@app.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@auth.login_required
def handle_user(id):
    user = User.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({
            'username': user.username,
            'email': user.email,
            'bio': user.bio,
            'favorite_food': user.favorite_food,
            'profile_picture': user.profile_picture
        })
    elif request.method == 'PUT':
        data = request.json
        user.bio = data.get('bio', user.bio)
        user.favorite_food = data.get('favorite_food', user.favorite_food)
        user.profile_picture = data.get('profile_picture', user.profile_picture)
        db.session.commit()
        return jsonify({'message': 'User updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})

@app.route('/recipes', methods=['POST'])
@auth.login_required
def create_recipe():
    data = request.json
    recipe = Recipe(title=data['title'], description=data['description'], user_id=g.user.id)
    db.session.add(recipe)
    db.session.commit()
    return jsonify({'id': recipe.id, 'title': recipe.title}), 201

@app.route('/recipes/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@auth.login_required
def handle_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({
            'title': recipe.title,
            'description': recipe.description,
            'author': recipe.author.username
        })
    elif request.method == 'PUT':
        data = request.json
        recipe.title = data.get('title', recipe.title)
        recipe.description = data.get('description', recipe.description)
        db.session.commit()
        return jsonify({'message': 'Recipe updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({'message': 'Recipe deleted successfully'})

@app.route('/comments', methods=['POST'])
@auth.login_required
def create_comment():
    data = request.json
    comment = Comment(text=data['text'], user_id=g.user.id, recipe_id=data['recipe_id'])
    db.session.add(comment)
    db.session.commit()
    return jsonify({'id': comment.id, 'text': comment.text}), 201

@app.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@auth.login_required
def handle_comment(id):
    comment = Comment.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({
            'text': comment.text,
            'commenter': comment.commenter.username,
            'recipe': comment.recipe.title
        })
    elif request.method == 'PUT':
        data = request.json
        comment.text = data.get('text', comment.text)
        db.session.commit()
        return jsonify({'message': 'Comment updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'})

@app.route('/replies', methods=['POST'])
@auth.login_required
def create_reply():
    data = request.json
    reply = Reply(text=data['text'], user_id=g.user.id, comment_id=data['comment_id'])
    db.session.add(reply)
    db.session.commit()
    return jsonify({'id': reply.id, 'text': reply.text}), 201

@app.route('/replies/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@auth.login_required
def handle_reply(id):
    reply = Reply.query.get_or_404(id)
    if request.method == 'GET':
        return jsonify({
            'text': reply.text,
            'replier': reply.replier.username,
            'comment': reply.comment.text
        })
    elif request.method == 'PUT':
        data = request.json
        reply.text = data.get('text', reply.text)
        db.session.commit()
        return jsonify({'message': 'Reply updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(reply)
        db.session.commit()
        return jsonify({'message': 'Reply deleted successfully'})

@app.route('/')
def home():
    return "Welcome to the Nom API"

if __name__ == '__main__':
    app.run(debug=True)
