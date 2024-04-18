from datetime import datetime, timezone
from random import randint, choice
from faker import Faker
from app import *

fake = Faker()

def get_random_image():
    image_folder = "images"
    images = [f for f in os.listdir(image_folder) if os.path.isfile(os.path.join(image_folder, f))]
    return os.path.join(image_folder, choice(images))



if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        UserDetail.query.delete()
        Comment.query.delete()
        Recipe.query.delete()
        SavedRecipe.query.delete()

        # Create users
        users = []
        for _ in range(5):
            username = fake.user_name()
            email = fake.email()
            password = fake.password(length=12)
            user = User(username=username, email=email, password=password)
            users.append(user)
            db.session.add(user)

        db.session.commit()

        # Create user details
        for user in users:
            profile_picture = fake.image_url()
            bio = fake.text(max_nb_chars=200)
            interests = ", ".join(fake.words(nb=5))
            followers = randint(0, 1000)
            user_detail = UserDetail(profile_picture=profile_picture, bio=bio, interests=interests, followers=followers, username_id=user.id)
            db.session.add(user_detail)

        db.session.commit()

        # Create recipes and comments
        for _ in range(20):
            name = fake.sentence(nb_words=3)
            ingredients = "\n".join(fake.sentences(nb=3))
            instructions = "\n".join(fake.sentences(nb=5))
            rating = randint(1, 5) + randint(0, 9) * 0.1  # Random rating between 1.0 and 5.9
            image = get_random_image()
            recipe = Recipe(name=name, ingredients=ingredients, instructions=instructions, rating=rating, images=image)
            db.session.add(recipe)

            for _ in range(randint(0, 10)):  # Random number of comments for each recipe
                user = fake.random_element(users)
                comment_text = fake.text(max_nb_chars=200)
                comment = Comment(user_id=user.id, recipe_id=recipe.id, comment=comment_text)
                db.session.add(comment)

            db.session.commit()

        # Create saved recipes
        for user in users:
            for _ in range(randint(0, 10)):  # Random number of saved recipes for each user
                recipe = fake.random_element(Recipe.query.all())
                saved_recipe = SavedRecipe(user_id=user.id, recipe_id=recipe.id, date_time=datetime.now(timezone.utc))
                db.session.add(saved_recipe)
        
        db.session.commit()