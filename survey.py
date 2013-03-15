import os
from flask import ( Flask,
                    request,
                    url_for,
                    render_template,
                    jsonify)

from data import cars

from surveymaker import prepare_survey

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Yeah, it works!!!'

@app.route('/survey')
def survey():
    survey = prepare_survey('static\survey.json')
    return survey

    #return render_template('survey.html')

@app.route('/submitSurvey', methods = ['POST'])
def process_survey():
    return str(request.form)

@app.route('/survey/car/makes')
def carMakes():
    return jsonify(makes=cars.keys())

@app.route('/survey/car/models/<make>')
def carModels(make):
    return jsonify(models=cars[make])

if __name__ == '__main__':
    port = int(os.environ.get('PORT', -1))
    if port == -1:
        app.run(debug=True, port=5000)
    else:
        app.run(debug=True, host='0.0.0.0', port=port)

