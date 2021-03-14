from server import db


class User(db.Model):
    
    """User """

    __tablename__ ='users'

    user_id = db.Column(db.Integer, autoincrement= True, primary_key= True)
    email = db.Column(db.String, unique = True)
    password= db.Column(db.String)
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
    exchange = db.Column(db.String, nullable = False)
    asset_type = db.Column(db.String, nullable = False)
    status = db.Column(db.String, nullable = False)
    ipo_date = db.Column(db.String, nullable = False)
    delisting_date = db.Column(db.String, nullable = False)
    women_lead = db.Column(db.Boolean, default = False )


    
    def __repr__(self):
        return f'<Stock stock_id={self.stock_id} symbol={self.symbol}>'


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
