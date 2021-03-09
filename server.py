"""Server for stock app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify

from model import connect_to_db, Stock, db, UserFavorite
import crud
import requests
import json
import collections
import math
from hashing import make_pw_hash, check_pw_hash
		



from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

API_KEY = '3LOOI2SBODXLNS10'




# ===========================Homepage================================================================================
@app.route('/')
def homepage():
    """view homepage"""
    return render_template("homepage.html")
# ===========================Users info ================================================================================    

@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    email = request.form.get('email')
    password = request.form.get('password')
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')

    hash_pw = make_pw_hash(password) 

    user_email = crud.get_user_by_email(email)
    if not user_email:
        crud.create_user(email, hash_pw, first_name, last_name)
        flash('Account created! Please log in.')
    else:
        flash('An account has already been used with this email, please login.')

    return render_template('homepage.html',person=first_name )

@app.route("/users/<user_id>")
def display_user_profile(user_id):
    """Show user's profile containing user's email"""

    user_profile = crud.get_user_by_id(user_id)

    return render_template('homepage.html', user_profile=user_profile)
    
@app.route('/users')
def all_users():
    """View all users."""

    users = crud.get_user()

    return render_template('homepage.html', users=users)


@app.route("/login", methods=['POST'])
def check_login():
    """Return or redirect to homepage"""

    email = request.form.get("email")
    password = request.form.get("password")
    hash_pw = make_pw_hash(password) 
    print(request.args)

    password_verification = crud.check_password(email, hash_pw)

    user_details = crud.get_user_by_email(email)
    if password_verification == True:
        session["user"] = user_details.user_id
        session["user_name"] = user_details.first_name

        print(session)

        return redirect("/stocks")
    else:
        flash("Email or password do not match. Try again!")
        return redirect("/")
@app.route("/logout")
def logout():
    session.clear()
    print(session)

    return redirect("/")
@app.route("/OurMission")
def OurMission():

    user=session["user"]

    return render_template('women.html')

# ===============================stock info=================================

@app.route('/stocks')
def stocks():
    """userfavorite in db as favs"""
    user = session["user"]

    stock_list = Stock.query.all()
    # favs = UserFavorite.query.filter_by(user_id=user).all()
    favs = db.session.query(UserFavorite.stock_id,Stock.stock_name, Stock.symbol).filter_by(user_id = user).join(Stock).all()

    return render_template('all_stocks.html', stock_list=stock_list, favs=favs)




@app.route('/api/stock')
def get_stock():
    """Json information about symbol"""

    symbol = request.args.get('symbol')
   
    url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={API_KEY}'
    res = requests.get(url)

    stock= Stock.query.filter_by(symbol= symbol).first()

    faved= UserFavorite.query.filter_by(stock_id= stock.stock_id).first()

    if faved == None:
        faved = False
    else:
        faved = True 
    print(faved)
    json_response = res.json()

    json_response.update({"StockID": stock.stock_id, "WomenLead": stock.women_lead, "UserFaved":faved})

    if symbol:
        return json_response
    else:
        return jsonify({"status": 'error','message': 'No information found about this stock' })

    
@app.route('/api/price', methods=['GET'])
def get_price():

    symbol = request.args['symbol']
    print(symbol)
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=1min&outputsize=compact&apikey={API_KEY}'
    res = requests.get(url)
    json_response = res.json()

    if symbol:
        return json_response
    else:
        return jsonify({"status": 'error','message': 'No price found about this stock' })

@app.route('/api/monthly', methods=['GET'])
def get_monthly():

    symbol =request.args['symbol']

    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol={symbol}&apikey={API_KEY}'
    res = requests.get(url)
    json_response = res.json()
    
    if symbol:
        # print(json_response)
        return json_response
      
    
    else:
        return jsonify({"status": 'error','message': 'No monthly price found about this stock' })

# favorite info================================================================================    

@app.route('/favorites')
def all_favorites(favorite_id):
    """View all favorites"""
    user = session["user"]
    userFavorites = crud.create_favorites(favorite_id)

    return render_template('all_stocks.html', userFavorites=userFavorites, user_id=user)


@app.route('/api/userfavorite', methods = ['GET'])
def get_user_favorite():
    """get user favorite from db"""

    user_id= session["user"]

    favs = db.session.query(UserFavorite.stock_id,Stock.stock_name,Stock.symbol).filter_by(user_id = user_id).join(Stock).all()
    
    print(json.dumps(favs))

    # return json.dumps(favs)
    return jsonify(favs)

@app.route('/api/favorite/<stock_id>', methods=['GET','POST'] )
def set_favorites(stock_id):
    """saves user favorite and user id into the db and checks if stock has already been favorited"""

    user_id= session["user"]
    
    if request.method == 'GET':
        userfav = crud.get_user_fav(user_id,stock_id)

        print(stock_id, user_id, '###########line 202#########')

        return jsonify(result=True) if userfav else jsonify(result=False) 

    # # stock_id = request.values['stock_id']
    # print(session)
    # user_id= session["user"]
    else:
        check = UserFavorite.query.filter_by(user_id=user_id, stock_id=stock_id).first() 
        
        if not check:
            user_favorite = UserFavorite(user_id=user_id, stock_id=stock_id)
            db.session.add(user_favorite)
            db.session.commit()
        else:
            crud.delete_stock_user(user_id, stock_id)
        
        print(stock_id, user_id, '###########line 216#########')
    
        return redirect('/stocks?symbol=')

@app.route("/api/delete_favorite", methods=['POST'])
def delete_stock_json():
    """ Deletes user favorite from db if unfavortied"""
    if "user" in session: 
        user_id = session['user']
        stock_id= request.form.get("stock_id")
        print(stock_id)
        crud.delete_stock_user(user_id, stock_id)

    return redirect('/stocks?symbol=')



# @app.route('/stocks/<stock_id>', method=['POST'])
# def show_favorite_info():
#     if "user" in session: 
#         user_id = session['user']

#         stock_id=request.form.get("stock_id")


#     return redirect('/stocks')






# ================================================================================    
if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
