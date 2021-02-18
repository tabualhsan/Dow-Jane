
import os
import json
from random import choice, randint
from datetime import datetime




import crud
import model
import server




os.system('dropdb stocks')
os.system('createdb stocks')


model.connect_to_db(server.app)
model.db.create_all()




all_stocks = crud.get_all_stocks()
crud.save_stocks(all_stocks)

# Create 10 users
for n in range(10):
    email = f'user{n}@test.com'  
    password = 'test'

    user = crud.create_user(email, password)