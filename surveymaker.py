import json
from flask import (jsonify,
                   render_template)

# "survey" :
# [
#     {
#         "id": 0,
#         "questions" :
#             [
#                 {
#                     "question": "What's your name?",
#                     "answer":
#                         {
#                             "type" : "text"
#                         }
#                 }
#             ]
#     },
#     {

def prepareAnswer(id, answer):
    answer_type = answer['type']

    if answer_type == 'input':
        config = dict(id=id, name=answer['name'])
    elif answer_type == 'radio':
        config = dict(name=answer['name'], options=answer['options'])
    elif answer_type == 'select':
        config = dict(name=answer['name'], options=answer['options'])
    else:
        raise Exception('Unknown answer type: ' + answer_type)

    template = 'answer' + answer_type
    result = render_template(template, config)

    return result

def prepareQuestion(question, id):
    answer = prepareAnswer(question['answer'])
    result = render_template('question.html', dict(id=id,
                                                   text=question['text'],
                                                   answer=answer))
    return result

def prepareSurvey(filename):
    try:
        data = json.load(open(filename))
        survey = jsonify(data)
        for section in survey:
            id = section['id']
            questions = section['questions']
            for question in questions:
                question_html = prepareQuestion(question)
        return ""
    except BaseException, e:
        return str(e)
