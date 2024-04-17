from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, timezone

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    details = db.relationship('UserDetail', backref='users', uselist=False, cascade='all, delete-orphan')
    saved_recipes = db.relationship('SavedRecipe', backref='users', lazy=True, cascade='all, delete-orphan')
    comments = db.relationship('Comment', backref='users', lazy=True, cascade='all, delete-orphan')

    # Add serialization
    serialize_rules = ('-details', '-saved_recipes', '-comments',)

    def __repr__(self):
        return f"<User {self.username}>"

class UserDetail(db.Model, SerializerMixin):
    __tablename__ = 'user_details'

    id = db.Column(db.Integer, primary_key=True)
    profile_picture = db.Column(db.String(100), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    interests = db.Column(db.String(255), nullable=True)
    followers = db.Column(db.Integer, default=0)
    username_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)

    # Add serialization
    serialize_rules = ('-user',)   

    def __repr__(self):
        return f"<UserDetail {self.id}>"

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.Text, nullable=False)
    images = db.Column(db.String(255), nullable=True)
    instructions = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    comments = db.relationship('Comment', backref='recipes', lazy=True, cascade='all, delete-orphan')

    # Add serialization

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ingredients": self.ingredients,
            "instructions": self.instructions  
    }

    serialize_rules = ('-user', '-comments',)    

    def __repr__(self):
        return f"<Recipe {self.id}>"

class SavedRecipe(db.Model, SerializerMixin):
    __tablename__ = 'saved_recipes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    date_time = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Add serialization
    serialize_rules = ('-user', '-recipe',)    

    def __repr__(self):
        return f"<SavedRecipe( {self.id}>"

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    replies = db.Column(db.Text, nullable=True)
    date_time = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    # Add serialization
    serialize_rules = ('-user', '-recipe',)   

    def __repr__(self):
        return f"<Comment {self.id}>"
    


