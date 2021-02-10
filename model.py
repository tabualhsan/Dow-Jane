from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    """User """

    __tablename__ ='users'

    user_id = db.Column(db.Integer, autoincrement= True, primary_key= True)
    email = db.Column(db.String, unique = True)
    password= db.Column(db.String)
    dob = db.Column(db.Date)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)



    def __repr__(self):
        return f'<User user_id={self.user_id} email={self.email}>'

class Stock(db.Model):
    """All Stocks Info"""

    __tablename__ = 'stocks'


    stock_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    symbol = db.Column(db.String, nullable = False)
    stock_name = db.Column(db.String, nullable = False)
    description = db.Column(db.Text, nullable = False)
    ceo = db.Column(db.String, nullable = False)
    headquarters = db.Column(db.String, nullable = False)
    founded = db.Column(db.String, nullable = False)
    employees = db.Column(db.Integer, nullable = False)
    address = db.Column(db.String, nullable = False)
    sector = db.Column(db.String, nullable = False)
    exchange = db.Column(db.String, nullable = False)
    asset_type = db.Column(db.String, nullable = False)
    women_lead = db.Column(db.Boolean, default = True )


    
    def __repr__(self):
        return f'<Stock stock_id={self.stock_id} symbol={self.symbol}>'



class CompanyStat(db.Model):
    """All Stocks stats"""

    __tablename__ = 'company_stats'

    stat_id = db.Column(db.Integer, autoincrement= True, primary_key=True)
    gross_profit = db.Column(db.Integer, nullable = False)
    peratio = db.Column(db.Integer, nullable = False)
    pegratio = db.Column(db.Integer, nullable = False)
    dividend_share = db.Column(db.Integer,nullable = False)
    dividend_yield = db.Column(db.Integer, nullable = False)
    week52high = db.Column(db.Integer, nullable = False)
    week52low = db.Column(db.Integer, nullable = False)
    eps = db.Column(db.Integer, nullable = False)
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.stock_id'),nullable = False,)
    stock = db.relationship('Stock', backref = 'company_stats')


    def __repr__(self):
        return f'<Company_stats stat_id={self.stat_id} peratio={self.symbol}>'

class UserFavorite(db.Model):
    """users favorites """

    __tablename__ = 'userFavorites'

    favorite_id = db.Column(db.Integer, autoincrement= True, primary_key=True)
    is_favorite = db.Column(db.Boolean, default = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    stock_id = db.Column(db.Integer, db.ForeignKey('stocks.stock_id'))
   

    stock = db.relationship('Stock', backref = 'userFavorites')
    user = db.relationship('User', backref = 'userFavorites')



    def __repr__(self):
        return f'<userFavorites favorite_id={self.favorite_id} is_favorite={self.is_favorite}>'



def connect_to_db(flask_app, db_uri='postgresql:///stocks' ):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)
   

if __name__ == '__main__':
    from server import app
    connect_to_db(app)