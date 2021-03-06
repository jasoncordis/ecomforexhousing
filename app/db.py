import os
import psycopg2
import subprocess
import urllib.parse


class HerokuPg:
    """Convenience class to deal with Heroku's Postgres database."""
    def __init__(self, heroku_app_name: str):
        self.app_name: str = heroku_app_name
        self.connection: object = self.get_db_conn()
        self.cursor: object = self.connection.cursor()

    def __del__(self):
        self.cursor.close()
        self.connection.close()

    def get_db_url(self) -> str:
        """Returns the URL of the Heroku app's attached database."""
        # Return DATABASE_URL if already set in the environment variables.
        if 'DATABASE_URL' in os.environ and os.environ['DATABASE_URL'] != '':
            return os.environ['DATABASE_URL']
        # Else, run Heroku CLI to get the DATABASE_URL.
        process: object = subprocess.Popen(
            f'heroku config:get DATABASE_URL -a {self.app_name}',
            stdout=subprocess.PIPE,
            shell=True,
        )
        return process.stdout.read().decode('utf-8').strip()

    def get_db_conn(self) -> object:
        """Returns a connection to the Heroku app's attached database."""
        db_url: str = self.get_db_url()
        # Break the url string into usable pieces for psycopg2.
        parsed_url: object = urllib.parse.urlparse(db_url)
        return psycopg2.connect(
            dbname=parsed_url.path[1:],
            user=parsed_url.username,
            password=parsed_url.password,
            host=parsed_url.hostname,
            port=parsed_url.port,
        )

    def execute_query(self, query: str) -> None:
        """Runs the specified query."""
        self.cursor.execute(query)

    def fetch_results(self) -> list:
        """Fetches all the results from the last query."""
        return self.cursor.fetchall()

    def commit(self) -> None:
        """Commits all the changes so far to the database."""
        self.connection.commit()
