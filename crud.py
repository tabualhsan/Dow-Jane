"""CRUD"""


from model import db, User, Stock, UserFavorite, connect_to_db
import requests
import csv

# user info================================================================
def get_user():
    """Return list of user objects"""

    return User.query.all()


def get_user_by_id(user_id):
    """Return a user by primary with user email"""
    user_id_identification = User.query.get(user_id)

    return user_id_identification

def get_user_by_email(email):
    """Return a user by email."""

    return User.query.filter(User.email == email).first()


def create_user(email, password, first_name, last_name):
    """create a new user"""

    user = User(email=email,
                password=password, 
                first_name=first_name, 
                last_name=last_name)

    db.session.add(user)
    db.session.commit()

    return user

def check_password(email, password):
    """ Check password and email for logging in"""

    user= get_user_by_email(email)

    if user == None:
        return False
    elif user.password == password:
        return True
    else:
        return False
# stock info ================================================================

API_KEY = '3LOOI2SBODXLNS10'

def create_stock_info(symbol, name, description, ceo, headquarters, founded, employees, address, sector, exchange, asset_type):
    """create a stocks profile"""
    stock = Stock(symbol=symbol, 
                name=name,
                description=description, 
                founded=founded,
                employees=employees,
                exchange=exchange, 
                asset_type=asset_type)

    db.session.add(stock)
    db.session.commit()

    return stock




def get_all_stocks():
        
    url = 'https://www.alphavantage.co/query?function=LISTING_STATUS&apikey='+ API_KEY
    res = requests.get(url)
    params = dict(key=API_KEY, text='stocks', lang='en-es')
    res = requests.get(url, params=params)
    decoded = res.content.decode('utf-8')

    csv_read = csv.reader(decoded.splitlines(), delimiter=',')
    all_stocks = list(csv_read)

    return all_stocks



def save_stocks(all_stocks):
    women_lead = ['GM', 'BBY', 'ANTM','HSY','VTR','ORCL','TPR','ULTA','NDAQ', 'DUK','PGR','OXY','BEN','SYF', 'VRTX','CDW', 'CUS','OTIS','REG', 'ZTS', 'CLX', 'ROST','CE','AMD','ACN','GPS','UPS','ANET','NOC']

    count = 0
    for stock in all_stocks:
        if count != 0:
            if stock[0] in women_lead:
                stockInfo = Stock(symbol = stock[0], stock_name=stock[1], exchange=stock[2],asset_type=stock[3],status=[4], ipo_date=stock[5], delisting_date=stock[6], women_lead = True)
            else:
                stockInfo = Stock(symbol = stock[0], stock_name=stock[1], exchange=stock[2],asset_type=stock[3],status=[4], ipo_date=stock[5], delisting_date=stock[6])
       
            db.session.add(stockInfo)
            db.session.commit()
        count += 1

    return "Finished"
def get_stock():

    return StockInfo.query.all()




# favorite info ================================================================
def create_favorites(user_id, stock_id):
    """create a and returns user favorites from stocks list """

    userFavorites = UserFavorites(
                    user_id = user_id,
                    stock_id = stock_id)

    
    db.session.add(userFavorites)
    db.session.commit()

    return userFavorites

def delete_stock_user(user_id, stock_id):

    
        db.session.query(UserFavorite).filter(UserFavorite.user_id == user_id).filter(UserFavorite.stock_id == stock_id).delete()
        db.session.commit()

def user_favorites(user_id):
    """returns all user favorites"""
    favs = UserFavorite.query.filter(user_id=user_id).all()
    # [<favObj=APPL>, <favObj=BBB>]
    # stock_id = favs[0].stock_id -> 'AAPL'
    # favs.stock -> all stocks associated with this user_id
    # favs.user -> all users associated with this user_id
    

    db.session.add(favs)
    db.session.commit()
    return favs


if __name__ == '__main__':
    from server import app
    connect_to_db(app)





