from security import authenticate,identity
from flask_restful import Resource
from flask import jsonify,session,request
from flask_jwt_extended import JWTManager,create_access_token

class User(Resource):
    def post(self):
        user = authenticate(request.json.get("username"),request.json.get("password"))
        if user is None:
           return {"msg": "Bad username or password"},401
        access_token = create_access_token(identity=user.id)
        return jsonify({ "token": access_token })