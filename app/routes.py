from flask import render_template
from app import app
import app.config.db as db_config
import psycopg2


@app.route('/')
@app.route('/index')
def index():
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
    data = cursor.fetchall()

    print(data)

    # conn.close()

    # data = []

    return render_template('index.htm', data=data)
