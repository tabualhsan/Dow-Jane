
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



women_lead_stocks = ['GM', 'BBY', 'ANTM','HSY','VTR','ORCL','TPR','ULTA','NDAQ', 'DUK','PGR','OXY','BEN','SYF', 'VRTX','CDW', 'CUS','OTIS','REG', 'ZTS', 'CLX', 'ROST','CE','AMD','ACN','GPS','UPS','ANET','NOC']

# save_stocks(all_stocks)
# all_stocks = get_all_stocks()
# db.session.add(stocks)
# db.session.commit()

# new_user = User(email='admin@website.com', password='admin')

# db.session.add(new_user)
# db.session.commit()