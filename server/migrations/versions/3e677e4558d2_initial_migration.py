"""initial migration

Revision ID: 3e677e4558d2
Revises: 
Create Date: 2024-04-16 05:42:51.155602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e677e4558d2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('ingredients', sa.Text(), nullable=False),
    sa.Column('images', sa.String(length=255), nullable=True),
    sa.Column('instructions', sa.Text(), nullable=False),
    sa.Column('rating', sa.Float(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.Text(), nullable=False),
    sa.Column('replies', sa.Text(), nullable=True),
    sa.Column('date_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_comments_recipe_id_recipes')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_comments_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saved_recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('date_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name=op.f('fk_saved_recipes_recipe_id_recipes')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_saved_recipes_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_details',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('profile_picture', sa.String(length=100), nullable=True),
    sa.Column('bio', sa.Text(), nullable=True),
    sa.Column('interests', sa.String(length=255), nullable=True),
    sa.Column('followers', sa.Integer(), nullable=True),
    sa.Column('username_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['username_id'], ['users.id'], name=op.f('fk_user_details_username_id_users')),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_details')
    op.drop_table('saved_recipes')
    op.drop_table('comments')
    op.drop_table('users')
    op.drop_table('recipes')
    # ### end Alembic commands ###
