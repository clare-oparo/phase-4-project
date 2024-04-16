from app import db, User, app  

def insert_sample_data():
    """Add sample data to the database."""
   
    sample_users = [
        User(username='alice', email='alice@example.com', bio='Loves to cook Italian food', favorite_food='Pasta', profile_picture='https://example.com/images/alice.jpg'),
        User(username='bob', email='bob@example.com', bio='Grill master, loves a good BBQ', favorite_food='BBQ Ribs', profile_picture='https://example.com/images/bob.jpg'),
        User(username='carol', email='carol@example.com', bio='Vegan recipes creator', favorite_food='Salad', profile_picture='https://example.com/images/carol.jpg'),
        User(username='dave', email='dave@example.com', bio='Enjoys spicy food and curries', favorite_food='Curry', profile_picture='https://example.com/images/dave.jpg'),
        User(username='eve', email='eve@example.com', bio='Baker extraordinaire', favorite_food='Cake', profile_picture='https://example.com/images/eve.jpg'),
        User(username='frank', email='frank@example.com', bio='French cuisine aficionado', favorite_food='Croissant', profile_picture='https://example.com/images/frank.jpg'),
        User(username='grace', email='grace@example.com', bio='Sushi chef', favorite_food='Sushi', profile_picture='https://example.com/images/grace.jpg'),
        User(username='heidi', email='heidi@example.com', bio='Explorer of exotic fruits', favorite_food='Mango', profile_picture='https://example.com/images/heidi.jpg'),
        User(username='ivan', email='ivan@example.com', bio='Barista and coffee lover', favorite_food='Coffee', profile_picture='https://example.com/images/ivan.jpg'),
        User(username='judy', email='judy@example.com', bio='Gourmet chef and wine taster', favorite_food='Wine', profile_picture='https://example.com/images/judy.jpg')
    ]
    
    
    db.session.bulk_save_objects(sample_users)
    db.session.commit()

def main():
    """Main function for running the script."""
    with app.app_context(): 
        if not User.query.first():  
            insert_sample_data()  

if __name__ == '__main__':
    main()  
