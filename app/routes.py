from flask import render_template
from flask import request
from flask import Flask, redirect
from app import app
import app.config.db as db_config
import psycopg2
from pathlib import Path


@app.route('/')
@app.route('/signup')
def index():
    return render_template('signup.html')


@app.route('/main')
def main():
    context = {}
    context['args'] = request.args

    conn = psycopg2.connect(
            dbname=db_config.dbname,
            user=db_config.user,
            password=db_config.password,
            host=db_config.host,
            port=db_config.port,
        )
    cursor = conn.cursor()

    query = '''
    SELECT * FROM Listings;
    '''
    cursor.execute(query)
    conn.commit()
    results = cursor.fetchall()
    context['listings_short_list'] = results[:2]
    context['listings'] = results
    context['some_house'] = None

    # quick and sloppy way to get a single image
    for listing in context['listings'][::-1]:
        context['some_house'] = listing
        break

    conn.close()

    print(context)
    return render_template('main.html', context=context)

@app.route('/signup', methods=['POST'])
def signup():
    date = request.form['date']
    needPlace = request.form['needPlace']
    return redirect('/sign-up-step-2-1')

@app.route('/sign-up-step-2-1')
def sign_up_step_2_1():
    return render_template('sign-up-step-2-1.html')

@app.route('/sign-up-step-2-1', methods=['POST'])
def postStep2():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form['email']
    password = request.form['password']
    return name

@app.route('/sign-up-step-2-2')
def sign_up_step_2_2():
    return render_template('sign-up-step-2-2.html')

@app.route('/sign-up-step-2-2', methods=['POST'])
def postStep2p2():
    description = request.form['description']
    return redirect('/sign-up-step-3')

@app.route('/sign-up-step-3')
def sign_up_step_3():
    return render_template('sign-up-step-3.html')

@app.route('/sign-up-step-3', methods=['POST'])
def postStep3():
    address = request.form['address']
    return address

@app.route('/listing')
def listing():
    return render_template('listing.html')

# For testing purposes
@app.route('/create-tables')
def createTables():
    try:
        conn = psycopg2.connect(
            dbname=db_config.dbname,
            user=db_config.user,
            password=db_config.password,
            host=db_config.host,
            port=db_config.port,
        )
        cursor = conn.cursor()
        with open(Path('app/sql/createTables.sql')) as wholeQuery:
            query = ''
            for line in wholeQuery:
                query += line
                if line.rstrip().endswith(';'):
                    cursor.execute(query)
                    query = ''
    finally:
        conn.close()
    return 'created tables'


@app.route('/insert-fake-data')
def insertFakeData():
    try:
        conn = psycopg2.connect(
            dbname=db_config.dbname,
            user=db_config.user,
            password=db_config.password,
            host=db_config.host,
            port=db_config.port,
        )
        cursor = conn.cursor()
        with open(Path('app/sql/insertFakeData.sql')) as wholeQuery:
            query = ''
            for line in wholeQuery:
                query += line
                if line.rstrip().endswith(';'):
                    cursor.execute(query)
                    query = ''
    finally:
        conn.close()
    return 'inserted fake data'


@app.route('/reset')
def reset():
    try:
        conn = psycopg2.connect(
            dbname=db_config.dbname,
            user=db_config.user,
            password=db_config.password,
            host=db_config.host,
            port=db_config.port,
        )
        cursor = conn.cursor()
        with open(Path('app/sql/createTables.sql')) as wholeQuery:
            query = ''
            for line in wholeQuery:
                query += line
                if line.rstrip().endswith(';'):
                    cursor.execute(query)
                    query = ''
        with open(Path('app/sql/insertFakeData.sql')) as wholeQuery:
            query = ''
            for line in wholeQuery:
                query += line
                if line.rstrip().endswith(';'):
                    cursor.execute(query)
                    query = ''
    finally:
        conn.close()
    return 'data reset'

