"""Server for stock app."""

from flask import Flask, render_template, request, flash, session, redirect, jsonify

from model import connect_to_db, Stock, db, UserFavorite
import crud
import requests
import json



from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

API_KEY = '3LOOI2SBODXLNS10'



# Homepage================================================================================
@app.route('/')
def homepage():
    """view homepage"""
    return render_template("homepage.html")
# Users info ================================================================================    

@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    email = request.form.get('email')
    password = request.form.get('password')
    # dob = request.form.get('dob')
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')

    print(request.form)



    user_email = crud.get_user_by_email(email)
    if user_email == None:
        crud.create_user(email, password,first_name, last_name)
        flash('Account created! Please log in.')
    else:
        flash('An account has already been used with this email, please login.')

    return redirect('/')

@app.route("/users/<user_id>")
def display_user_profile(user_id):
    """Show user's profile containing user's email"""

    user_profile = crud.get_user_by_id(user_id)

    return render_template("user_profile.html", user_profile=user_profile)
    
@app.route('/users')
def all_users():
    """View all users."""

    users = crud.get_users()

    return render_template('all_users.html', users=users)


@app.route("/login", methods=['POST'])
def check_login():
    """Return or redirect to homepage"""

    email = request.form.get("email")
    password = request.form.get("password")

    print(request.args)

    password_verification = crud.check_password(email, password)

    user_details = crud.get_user_by_email(email)

    if password_verification == True:
        session["user"] = user_details.user_id
        session["user_name"] = user_details.first_name

        return redirect("/stocks")
    else:
        flash("Email or password do not match. Try again!")
        return redirect("/")

# stock info================================================================================    

@app.route('/stocks')
def stocks():
    user = session["user"]
    stock_list = Stock.query.all()
    # favs = UserFavorite.query.filter_by(user_id=user).all()
    favs = db.session.query(UserFavorite.stock_id,Stock.stock_name, Stock.symbol).filter_by(user_id = user).join(Stock).all()
    print(favs)

    return render_template('all_stocks.html', stock_list=stock_list, favs=favs)




@app.route('/api/stock')
def get_stock():
    """Json information about symbol"""

    symbol = request.args.get('symbol')
   
    url = f'https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={API_KEY}'
    res = requests.get(url)

    stock= Stock.query.filter_by(symbol= symbol).first()
    # print(stock.stock_id)

    json_response = res.json()

    json_response.update({"StockID": stock.stock_id, "WomenLead": stock.women_lead})
    
    
    if symbol:
        return json_response
    else:
        return jsonify({"status": 'error','message': 'No information found about this stock' })

    
# favorite info================================================================================    

@app.route('/favorites')
def all_favorites(favorite_id):
    """View all favorites"""
    user = session["user"]
    userFavorites = crud.create_favorites(favorite_id)

    return render_template('favorite_stock.html', userFavorites=userFavorites, user_id=user)

@app.route('/api/favorite', methods=['POST'] )
def set_favorites():


    stock_id = request.values['stock_id']
    print(session)
    user_id= session["user"]
   
    check = UserFavorite.query.filter_by(user_id=user_id, stock_id=stock_id).first() 
    if not check:
        user_favorite = UserFavorite(user_id= user_id, stock_id =stock_id)
        db.session.add(user_favorite)
        db.session.commit()
   
    
    print(stock_id, user_id)
   
    return render_template('favorite_stock.html', user_id=user_id, user_favorite=user_favorite)

@app.route('/api/userfavorite',methods = ['GET'])
def get_user_favorite():

    user_id= session["user"]

    favs = db.session.query(UserFavorite.stock_id,Stock.stock_name).filter_by(user_id = user_id).join(Stock).all()
   
    print(json.dumps(favs))

    # return json.dumps(favs)
    return jsonify(favs)

@app.route("/api/delete_favorite", methods=['POST'])
def delete_stock_json():
    if "user" in session: 
        user_id = session['user']
        stock_id= request.form.get("stock_id")
        print(stock_id)
        crud.delete_stock_user(user_id, stock_id)

    return redirect('/stocks')

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
