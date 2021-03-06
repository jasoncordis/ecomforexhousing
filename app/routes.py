from flask import render_template
from app import app
from app import db


@app.route('/')
@app.route('/index')
def index():
    heroku_db = db.HerokuPg('ecomforexhousing')

    query = '''
    SELECT * FROM Listings;
    '''
    heroku_db.execute_query(query)

    context = {
        'heading': 'Postgres results:',
        'data': heroku_db.fetch_results()
    }
    return render_template('index.htm', context=context)
