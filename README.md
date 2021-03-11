
# Dow-Jane
For my capstone project for Hackbright Academy I create Dow Jane. Dow Jane is a single-page web application that is an educational platform to empower women to be informed about stock investments, and to make better informed investing decisions.




## Tech Stack
__Backend:__ Flask, Python3, SQLAlchemy, bycrypt, Alpha Vantage API\
__Frontend:__  JavaScript, HTML5, CSS3, chart.js, jQuery, Ajax\
__Database:__ PostgreSQL\
__API:__ Alpha Vantage



![image](https://user-images.githubusercontent.com/75860043/110556568-a9da5b00-80f3-11eb-8592-50183409d91f.png)

**Installation**


Requirements:
PostgreSQL
Python 3.7.3
To have this app running on your local computer, please follow the below steps:

Clone repository:

`$ git clone https://github.com/tabualhsan/Dow-Jane.git
Create and activate a virtual environment:`

$ pip3 install virtualenv
$ virtualenv env
$ source env/bin/activate
Install dependencies:

(env) $ pip3 install -r requirements.txt
Create database stocks:

(env) $ createdb stocks
Create database tables:

(env) $ python3 seed_database.py
db.create_all()


(env) $ python3 server.py

