"""Server for stock app."""

from flask import Flask, render_template, request, flash, session, redirect

from model import connect_to_db
import crud


from jinja2 import StrictUndefined


app = Flask(__name__)
app.secret_key = "dev"
app.jinja_env.undefined = StrictUndefined

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
    dob = request.form.get('dob')
    first_name = request.form.get('fname')
    last_name = request.form.get('lname')


    user_email = crud.get_user_by_email(email)
    if user_email == None:
        crud.create_user(email, password, dob, first_name, last_name)
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


@app.route("/login")
def check_login():
    """Return or redirect to homepage"""

    email = request.args.get("login_email")
    password = request.args.get("login_password")

    password_verification = crud.check_password(email, password)

    user_details = crud.get_user_by_email(email)

    if password_verification == True:
        session["user"] = user_details.user_id
        session["user_name"] = user_details.first_name

        return redirect("/user-page")
    else:
        flash("Email or password do not match. Try again!")
        return redirect("/")

# stock info================================================================================    


@app.route('/stocks')
def all_stocks():
    """View all stocks"""

    stocks = crud.get_stocks_info()

    return render_template('all_stocks.html', stocks=stocks)
# favorite info================================================================================    

@app.route('/favorites')
def all_favorites(favorite_id):
    """View all favorites"""
    sesssion['user_id'] = user
    userFavorites = crud.create_favorites(favorite_id)

    return render_template('favorite_stock.html', userFavorites=userFavorites, user_id=user)



# ================================================================================    
if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)
