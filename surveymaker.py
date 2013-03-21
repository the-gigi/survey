import os
import json
from jinja2 import Template
from BeautifulSoup import BeautifulSoup


root_dir = os.path.dirname(__file__)
templates = {}


def load_templates():
    templates_dir = os.path.join(root_dir, 'templates')
    for name in ['answer_input', 'answer_radio', 'answer_select', 'answer_checkbox', 'survey', 'survey2']:
        templates[name] = Template(open(os.path.join(templates_dir, name + '.html')).read())


def prepare_answer(id, answer):
    answer_type = answer['type']
    if answer_type == 'input':
        config = dict(id=id)
    elif answer_type == 'radio':
        options = []
        for o in answer.get('options', []):
            if type(o) in (str, unicode):
                o = {u'value': o}
                options.append(o)
            else:
                if not o.has_key(u'value'):
                    assert False

        config = dict(id=id, name=id, options=options)
    elif answer_type in ('checkbox', 'select'):
        config = dict(id=id, name=id, options=answer.get('options', []))
    elif answer_type == 'custom':
        return '[Answer Placeholder]'
    else:
        raise Exception('Unknown answer type: ' + answer_type)

    t = templates['answer_' + answer_type]
    result = t.render(**config)
    return result


def prepare_question(id, question):
    hidden = question.get(u'hidden', False)
    answer = prepare_answer(id, question[u'answer'])
    text = question[u'text']
    if not type(text) in (str, unicode):
        text = ' '.join(text)

    return dict(id=id, text=text, answer=answer, hidden=hidden)


def prepare_question_group(group_id, question_group):
    def id2letter(id):
        return chr(97 + id)

    result = {u'id': group_id, u'questions': []}
    for id, question in enumerate(question_group[u'questions']):
        question_id = str(group_id+1) if id == 0 else '%d%s' % (group_id+1, id2letter(id))
        question = prepare_question(question_id, question)
        result[u'questions'].append(question)

    return result


def prepare_page(page_id, page, initial_group_id):
    result = {u'id': page_id, u'question_groups' : [], u'hidden': page.get(u'hidden', False)}
    for group_id, group in enumerate(page[u'question_groups']):
        question_group = prepare_question_group(initial_group_id + group_id, group)
        result[u'question_groups'].append(question_group)
    return result

def prepare_survey(filename):
    load_templates()
    survey = json.load(open(os.path.join(root_dir, filename)))
    pages = []
    last_group_id = 0
    for id, page in enumerate(survey['pages']):
        pages.append(prepare_page(id, page[u'page'], last_group_id))
        last_group_id = pages[-1][u'question_groups'][-1][u'id'] + 1

    t = templates['survey2']
    html = t.render(pages=pages)
    soup = BeautifulSoup(html)
    return soup.prettify()


def test():
    print os.getcwd()
    s = prepare_survey('static\survey.json')
    print s