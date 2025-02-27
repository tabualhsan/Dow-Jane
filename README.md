
# Dow-Jane

<img src="static/img/logo.webp" width="100" height="100">

![show-case-gif](https://media.giphy.com/media/g4O7IGPPy0WPbJfu36/giphy.gif)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#over-view">Overview</a></li> 
    <li><a href="#built-with">Tech Stack</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#Acknowledgments">Acknowledgments</a></li>
    <li><a href="#about-the-developer">About the Developer</a></li>
  </ol>
</details>




## <a name="overview"></a>Overview

 The Dow Jane is inspired to educate and empower women to be informed about stocks, and to be able to make better informed investing decisions. Growing up as a woman I have always been told to save my money and to not invest it into the stock market because it's risky. I found I could take my financials farther than a savings account, as I quit my job and decided to shift my career as a software engineering student, I did not have a way that could generate an income, but having some knowledge about the stock market I felt I was not burning through my savings account. In general making financial decisions is hard and knowing how to is even harder. I hope Dow Jane helps answer any questions for a new or current investors in the stock market. I also hope it provides inspiration for all women to become leaders in business, and their lives. 
        
I devleoped Dow Jane as my solo capstone project for [Hackbright Academy](http://www.hackbrightacademy.com/) which is a full-stack software engineering fellowship for women. I began this journey with no experince in computer science and was excited to create my first coding project with the hopes to help others learn more about the stock market.

## MVP 

Users can select or browse through over 10,000 stocks and learn more about these stocks in the market using the Alpha Vantage API. User can moniter stocks by adding them to their favorites. User can also see what stocks have a women-lead CEO and learn more about them. 



## Tech Stack
__Backend:__ Flask, Python3, SQLAlchemy, bycrypt, Alpha Vantage API, Flask\
__Frontend:__  JavaScript, HTML5, CSS3, chart.js, jQuery, Ajax, Bootstrap\
__Database:__ PostgreSQL\
__API:__ Alpha Vantage API\
__Tools:__ Postman, GIT, GITHub, Visual StudioCode


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

(env) export DATABASE_URL='postgresql:///stocks' 

(env) $ python3 server.py
```

## <a name="features"></a>Features


![login-signup](https://media.giphy.com/media/d6WsMhmDG5s3UAxgFk/giphy.gif)


![search-stocks](https://media.giphy.com/media/vTk92ReHfOpbkpQ1ED/giphy.gif)


![live_data](https://media.giphy.com/media/hxLtpe9pma61Ldnj8v/giphy.gif)


![duration](https://media.giphy.com/media/QdYADaaAwsVNyzQGli/giphy.gif)


![favorite](https://media.giphy.com/media/NJIA4PIGbrtd6huLdb/giphy.gif)


![educational-modals](https://media.giphy.com/media/8fudAAbSJ3YbJijiwd/giphy.gif)


![women-lead-info](https://media.giphy.com/media/MFFSRvRxvk2m7MQ1QD/giphy.gif)


* Users can sign-up and log-in
* Users can search over 10,000 stocks that are in the stock market by stock name/symbol or browse through all the stocks
* Users can see daily stock prices that are update by the minute
* Users can can add and remove stocks from their favorites list
* User can view live current data about each company
* User can click on an educational modal to view the terms that are used in the stock market
* Users can see Stock price fluctuation through an interactive chart that shows 24 months of monthly price data
* Users can view what stocks currently have a women lead CEO in the S&P 500
* Users can learn more about individual women lead CEO's categorized by their company


## <a name="Acknowledgments"></a>Acknowledgments

I want to thank my family, my husband and everyone at Hackbright Academy from my instructors, advisors, mentors and fellow hackbright classmates for being with my on this journey. I have learned so much since last August 2020 when I decided to make the switch in my career to tech. It has given me more than becoming a software engineer, I have found myself through this career and excited to build a better tomorrow with it. 


## <a name="developer"></a>About the Developer

Clinical Researcher turned Software Engineer wanting to make a difference and change by creating applications where science, healthcare and technology intersect. 

Learn more about Tamara on her <a href="https://www.linkedin.com/in/tamara-abualhsan/" target="_blank">LinkedIn.</a>
