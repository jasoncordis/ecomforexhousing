from flask import render_template
from app import app
from app import db


@app.route('/')
@app.route('/index')
def index():
    cs340_db = db.MariaDb(
        host='classmysql.engr.oregonstate.edu',
        database='cs340_huangal',
        user='cs340_huangal',
        password='0753',
    )
    query = '''
    DROP TABLE IF EXISTS diagnostic;
    '''
    cs340_db.execute_query(query)

    query = '''
    CREATE TABLE IF NOT EXISTS diagnostic (
        id SERIAL PRIMARY KEY,
        text VARCHAR(25) NOT NULL
    );
    '''
    cs340_db.execute_query(query)

    query = '''
    INSERT INTO diagnostic (text)
    VALUES ('MySQL is working!');
    '''
    cs340_db.execute_query(query)

    query = '''
    SELECT * FROM diagnostic;
    '''
    cs340_db.execute_query(query)

    context = {
        'heading': 'MySQL results:',
        'data': cs340_db.fetch_results()
    }
    return render_template('index.htm', context=context)


@app.route('/drop-table')
def drop_table():
    cs340_db = db.MariaDb(
        host='classmysql.engr.oregonstate.edu',
        database='cs340_huangal',
        user='cs340_huangal',
        password='0753',
    )
    query = '''
    DROP TABLE IF EXISTS diagnostic;
    '''
    cs340_db.execute_query(query)
    cs340_db.commit()
    return 'Dropped table.'


@app.route('/create-table')
def create_table():
    cs340_db = db.MariaDb(
        host='classmysql.engr.oregonstate.edu',
        database='cs340_huangal',
        user='cs340_huangal',
        password='0753',
    )
    query = '''
    CREATE TABLE IF NOT EXISTS diagnostic (
        id SERIAL PRIMARY KEY,
        text VARCHAR(25) NOT NULL
    );
    '''
    cs340_db.execute_query(query)
    cs340_db.commit()
    return 'Created table.'


@app.route('/insert')
def insert():
    cs340_db = db.MariaDb(
        host='classmysql.engr.oregonstate.edu',
        database='cs340_huangal',
        user='cs340_huangal',
        password='0753',
    )
    query = '''
    INSERT INTO diagnostic (text)
    VALUES ('MySQL is working!!');
    '''
    cs340_db.execute_query(query)
    cs340_db.commit()
    return 'Inserted row.'


@app.route('/select')
def select():
    cs340_db = db.MariaDb(
        host='classmysql.engr.oregonstate.edu',
        database='cs340_huangal',
        user='cs340_huangal',
        password='0753',
    )
    query = '''
    SELECT * FROM diagnostic;
    '''
    cs340_db.execute_query(query)
    context = {
        'heading': 'MySQL results:',
        'data': cs340_db.fetch_results()
    }
    return render_template('index.htm', context=context)
