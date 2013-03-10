import json
from flask import jsonify

def prepareSurvey(filename):
    try:
        data = json.load(open(filename))
        return jsonify(data)
    except BaseException, e:
        return str(e)