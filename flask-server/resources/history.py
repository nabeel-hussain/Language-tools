from flask_restful import Resource
from flask import jsonify,session
from flask_jwt_extended import jwt_required
class History(Resource):
    @jwt_required()
    def get(self):
        return jsonify({'history': session.get('translation_history')})
    @jwt_required()
    def delete(self):
        session['translation_history'] = None
        return jsonify({'result': True})

    def add_translation_to_session(translation):
        if session.get('translation_history') != None:
            translation_list = session.get('translation_history')
            translation_list.insert(0, translation)
            session['translation_history'] = translation_list
        else:
            translation_list = []
            translation_list.append(translation)
            session['translation_history'] = translation_list
