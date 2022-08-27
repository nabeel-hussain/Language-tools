from flask_restful import Resource
from flask import jsonify,session,request
from textblob import TextBlob
from resources.history import History
from flask_jwt_extended import jwt_required

class Translation(Resource):
    @jwt_required()
    def post(self):
        text = request.get_json()
        blob = TextBlob(text['text'])
        from_lang = text['from']
        to_lang = text['to']
        result = blob.translate(from_lang=from_lang, to=to_lang)
        History.add_translation_to_session({
            'from': from_lang,
            'to': to_lang,
            'text': text['text'],
            'response': result.split('\n'),
            })
        return jsonify(result.split('\n'))