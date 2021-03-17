
# Dow-Jane

![image logo](static/img/logo.webp)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#over-view">Overview</a></li> 
    <li><a href="#built-with">Tech Stack</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#about-the-developer">About the Developer</a></li>
  </ol>
</details>




## <a name="overview"></a>Overview

 The Dow Jane is inspired to educate and empower women to be informed about stocks, and to be able to make better informed investing decisions. Growing up as a woman I have always been told to save my money and to not invest it into the stock market because it's risky. I found I could take my financials farther than a savings account, as I quit my job and decided to shift my career as a software engineering student, I did not have a way that could generate an income, but having some knowledge about the stock market I felt I was not burning through my savings account. In general making financial decisions is hard and knowing how to is even harder. I hope Dow Jane helps answer any questions for a new or current investors in the stock market. I also hope it provides inspiration for all women to become leaders in business, and their lives. 
        
I devleoped Dow Jane as my solo capstone project for [Hackbright Academy](http://www.hackbrightacademy.com/) which is a full-stack software engineering fellowship for women. I began this journey with no experince in computer science and was excited to create my first coding project with the hopes to help others learn more about the stock market.




## Tech Stack
__Backend:__ Flask, Python3, SQLAlchemy, bycrypt, Alpha Vantage API\
__Frontend:__  JavaScript, HTML5, CSS3, chart.js, jQuery, Ajax\
__Database:__ PostgreSQL\
__API:__ Alpha Vantage


## <a name="Installation"></a>Installation
```shell
Requirements:
PostgreSQL
Python 3.7.3
```

To have Dow Jane running on your local computer, please follow the below steps:\

1. __Clone repository:__
```shell

$ git clone https://github.com/tabualhsan/Dow-Jane.git
```
2. __Create and activate a virtual environment:__
```shell
$ pip3 install virtualenv
$ virtualenv env

Always be sure that you are inside your virtual environment (.env should be prepended to your terminal prompt)

In order to reactivate it:

$ source env/bin/activate
```

3. __Install dependencies:__
```shell

(env) $ pip3 install -r requirements.txt

```

4. __Create database stocks:__
```shell

(env) $ createdb stocks
Create database tables:

(env) $ python3 seed_database.py

(env) $ python3 server.py
```

## <a name="features"></a>Features

<!-- + Create an account -->
### Login/Logout

<iframe src="https://giphy.com/embed/d6WsMhmDG5s3UAxgFk" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/d6WsMhmDG5s3UAxgFk">via GIPHY</a></p>

* Users can sign-up and log-in
* Users can search over 10,000 stocks that are S&P 500 by stock name/symbol or browse through all the stocks
* Users can see daily stock prices that are update by the minute
* Users can can add and remove stocks from their favorites list
* User can view live current data about each company
* User can click on an educational modal to view the terms that are used in the stock market
* Users can see Stock price fluctuation through an interactive chart that shows 24 months of monthly price data
* Users can view what stocks currently have a women lead CEO in the S&P 500
* Users can learn more about individual women lead CEO categorized by their company

## <a name="developer"></a>About the Developer

Clinical Researcher turned Software Engineer wanting to make a difference and change by creating applications where science, healthcare and technology intersect. 

Learn more about Tamara on her <a href="https://www.linkedin.com/in/tamara-abualhsan/" target="_blank">LinkedIn.</a>
