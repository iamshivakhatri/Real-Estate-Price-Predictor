from flask import Flask, request, jsonify
import util

app = Flask(__name__)



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/get_location_names")
def get_location_names():
    locations = util.get_location_names()
    print(locations)
    response = jsonify({
        'locations': [util.get_location_names()],
        'name': 'shivadon'

    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response
    

@app.route("/predict_home_prices", methods = ['POST'])
def predict_home_prices():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['bhk']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(location,total_sqft,bhk,bath)
    })

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response



    



if __name__ == "__main__":
    print("starting the Flask server")
    print("hi")
    app.run()