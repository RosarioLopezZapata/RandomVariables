from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


import numpy as np
from numpy import random
from scipy.stats import binom


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///api.db"

db=SQLAlchemy(app)

class User(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.Text, nullable=False)
    password= db.Column(db.Text, nullable=False)

    def __str__(self):
        return f'{self.id} {self.content}'


def user_serializer(user):
    return {
        'id':user.id,
        'name':user.name,
        'password':user.password
    }

class Data(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    variables= db.Column(db.Text, nullable=False)
    probabilities= db.Column(db.Text, nullable=False)
    sampling= db.Column(db.Integer, nullable=False)
    
    def __str__(self):
        return f'{self.id} {self.content}'

def data_serializer(data):
    return {
        'id':data.id,
        'variables':data.variables,
        'probabilities':data.probabilities,
        'sampling':data.sampling,
    }

@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(data_serializer,Data.query.all())])


@app.route('/authenticate', methods=['GET'])
def auth():
    return jsonify([*map(user_serializer,User.query.all())])


def distribution(probs,value):
    arr=[]
    size=value*1.5
    x = np.arange(0, size)
    for i in range(len(probs)):
        arr.append(binom.pmf(x, value, probs[i]).tolist())
    return arr
@app.route('/api/create', methods=['POST'])
def create():
    request_data = json.loads(request.data)
    data = Data(variables=request_data['content']['variables'],probabilities=request_data['content']['probabilities'],sampling=request_data['content']['sampling'])

    db.session.add(data)
    db.session.commit()


    val=request_data['content']['sampling']
    val= int(val)
    probabilities=json.loads(request_data['content']['probabilities'])
    valor=distribution(probabilities,val)
    
    var=request_data['content']['variables']
    
    info = {
        'variables': var,
        'sampling':request_data['content']['sampling'],
        'distributions': valor
        }

    return {'201':info}

    
if __name__ == '__main__':
    app.run(debug=True)
