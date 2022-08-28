from flask import request,jsonify
from flask_restful import Resource,request
from spellchecker import SpellChecker as SpellChk

class SpellChecker(Resource):
    def post(self):

        text = request.get_json();
        words = text['text'].split();
        words_lower = [word.lower() for word in words]
        spell = SpellChk(language= text['lang'])
        print(spell.candidates);
        misspelled = spell.unknown(words)
        result = [];
        for word in misspelled:
            correctword = spell.correction(word);
            candidates = spell.candidates(word);
            actualWordIndex = words_lower.index(word);
            result.append({"word":words[actualWordIndex],"correctword":correctword,"candidates":list(candidates)})
        return jsonify({'result':result})

    

