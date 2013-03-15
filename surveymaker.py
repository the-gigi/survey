import os
import json
from jinja2 import Template
from BeautifulSoup import BeautifulSoup


root_dir = os.path.dirname(__file__)
templates = {}

def load_templates():
    templates_dir = os.path.join(root_dir, 'templates')
    for name in ['answer_input', 'answer_radio', 'answer_select', 'question', 'survey']:
        templates[name] = Template(open(os.path.join(templates_dir, name + '.html')).read())

def prepare_answer(id, answer):
    answer_type = answer['type']
    if answer_type == 'input':
        config = dict(id=id)
    elif answer_type == 'radio':
        config = dict(id=id, name=id, options=answer[u'options'])
    elif answer_type == 'select':
        config = dict(id=id, name=id, options=answer.get('options', []))
    else:
        raise Exception('Unknown answer type: ' + answer_type)

    t = templates['answer_' + answer_type]
    result = t.render(**config)
    return result

def prepare_question(id, question):
    answer = prepare_answer(id, question[u'answer'])
    return dict(id=id, text=question[u'text'], answer=answer)

def prepare_question_group(group_id, question_group):
    result = []
    for internal_id, question in enumerate(question_group):
        question_id = str(group_id) if internal_id == 0 else '%d_%d' % (group_id, internal_id)
        question = prepare_question(question_id, question)
        result.append(question)

    return result

def prepare_survey(filename):
    load_templates()
    survey_data = json.load(open(os.path.join(root_dir, filename)))
    question_groups = []
    for id, group in enumerate(survey_data['survey']):
        question_group = group[u'questions']
        question_groups.append(prepare_question_group(id, question_group))

    #t = templates['question_container']
    #result = t.render(question_group=question_groups[0])

    t = templates['survey']
    html = t.render(question_groups=question_groups)
    soup = BeautifulSoup(html)
    return soup.prettify()

def test():
    print os.getcwd()
    s = prepare_survey('static\survey.json')
    print s