
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




#load stock data from JSON file from API
# with open('https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=3LOOI2SBODXLNS10') as f:
#     stock_data = json.loads(f.read())
#     print(stock_data)

# stock_in_db =[]

# for stock in stock_data:
#     symbol, name, description, ceo, headquarters, founded, employees, address, sector, exchange, asset_type = (symbol['symbol'], 
#                                                                                                                 name['name'],
#                                                                                                                 description['description'], 
#                                                                                                                 founded['founded'],
#                                                                                                                 employees['employees'],
#                                                                                                                 exchange['exchange'], 
#                                                                                                                 asset_type['asset_type'] )
#     db_stock = crud.create_stock_info((symbol,
#                 name,
#                 description, 
#                 founded,
#                 employees,
#                 exchange, 
#                 asset_type)
#     # stock_in_db.append(db_stock)


#     )
