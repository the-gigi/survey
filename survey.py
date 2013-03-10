import os
from flask import Flask, request, url_for, render_template
from surveymaker import prepareSurvey

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Yeah, it works!!!'

@app.route('/survey')
def survey():
    print app.static_folder
    # json_file = url_for('static', filename='survey.json')
    # assert os.path.exists(json_file)
    # survey =  prepareSurvey(json_file)

    return render_template('survey.html')

@app.route('/submitSurvey', methods = ['POST'])
def process_survey():
    return str(request.form)

if __name__ == '__main__':
    app.run(debug=True)
