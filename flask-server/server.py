
from flask import Flask
from flask_session import Session
from flask_restful import  Api
from flask_jwt_extended import JWTManager
from resources.history import History
from resources.translation import Translation
from resources.user import User

app = Flask(__name__)
api = Api(app)
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['JWT_SECRET_KEY'] = 'nabeelhussain'
Session(app)

jwt = JWTManager(app)

api.add_resource(History, '/history')  # http://localhost:5000/history
api.add_resource(Translation, '/translate')  # http://localhost:5000/translate
api.add_resource(User,'/token') #http://localhost:5000/token
if __name__ == '__main__':
    app.run(debug=True)
