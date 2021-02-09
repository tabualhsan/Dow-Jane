"""Server for stock app."""

from flask import Flask, render_template, request, flash, session, redirect

from model import connect_to_db
import crud


from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def homepage():
    """view homepage"""
    return render_template('homepage.html')


@app.route('/users')
def all_users():
    """View all users."""

    users = crud.get_users()

    return render_template('all_users.html', users=users)


@app.route('/users', methods=['POST'])
def register_user():
    """Create a new user."""

    email = request.form.get('email')
    password = request.form.get('password')
    dob = 
    

    user = crud.get_user_by_email(email)
    if user:
        flash('Cannot create an account with that email. Try again.')
    else:
        crud.create_user(email, password)
        flash('Account created! Please log in.')

    return redirect('/')

@app.route('/stocks')
def all_stocks():
    """View all stocks"""

    stocks = crud.get_stocks_info()

    return render_template('all_stocks.html', stocks=stocks)

@app.route('/favorites')
def all_favorites():
    """View all favorites"""

    userFavorites = crud.create_favorites()

    return render_template('favorite_stock.html', userFavorites=userFavorites)

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
