"""Setup at app startup"""
from flask import Flask
import psycopg2


app = Flask(__name__)
postgres = psycopg2.connect(
        host="dpg-chi7qhm4dadc9vm05ec0-a.oregon-postgres.render.com",
        database="todo_kju7",
        user="root",
        password="uy6QyQ6DWnk7Wdvh0rHwRJicsfcBOBgS")
# To prevent from using a blueprint, we use a cyclic import
# This also means that we need to place this import here
# pylint: disable=cyclic-import, wrong-import-position
from app import routes
