from collections import Counter
from datetime import datetime
import os
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
import sys
from flask_pymongo import PyMongo
from utils import detect_most_common_text, process_parking_image, entry, exit_car
import pytz


indian_tz = pytz.timezone('Asia/Kolkata')


app = Flask(__name__)
CORS(app=app, resources={r"*": {"origins": "*"}})
app.config["MONGO_URI"] = "mongodb+srv://shreedharjoshi03:PoRpNF2MV8Jb7tYL@cluster0.1oyo7jx.mongodb.net/CarParking"
db = PyMongo(app).db
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_PATH = os.path.join(os.path.dirname(os.path.dirname(SCRIPT_DIR)), 'data', 'parkinglot', 'result.png')

@app.route('/enter_car', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type','Authorization'])
def enter_car():
    most_common_text = detect_most_common_text()
    if not most_common_text:
        return jsonify({'error': 'No text detected'})

    details = db.cars.find_one({"carNumberPlate": most_common_text})
    if details:
        parked_car = details.get("isParked")
        if parked_car:
            return jsonify({'error': 'Car is already parked'})
        else:
            car_id = details['_id']
            parking_data = db.parking.find_one(sort=[("_id", -1)])
            parked_slots = parking_data['parkedSlots'] if parking_data else 0
            image_path = f'data/parkinglot/result.png'
            result = process_parking_image(IMAGE_PATH)
            empty_spots = result[0]
            parked_slots = 14 - len(result[0])
            takenSpot = empty_spots[0]
            entry(takenSpot)
            if takenSpot != -1:
                db.parking.insert_one({'car': car_id, "time": datetime.now(indian_tz), "emptySpots": empty_spots, "parkedSlots": parked_slots, "takenSpot": takenSpot})
                db.logs.insert_one({'car': car_id, "time": datetime.now(indian_tz), "emptySpots": empty_spots, "parkedSlots": parked_slots, "takenSpot": takenSpot, "isEntering": True})
                db.cars.update_one({"carNumberPlate": most_common_text}, {"$set": {"isParked": True}})
                print(jsonify({
                    'message': "Car entered"
                }))
                return jsonify({
                    'message': "Car entered"
                })
            else:
                return jsonify({'error': 'No spots left'})
    else:
        return jsonify({'error': 'Car not found'})

@app.route('/exit_car', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def exit_car_endpoint():
    most_common_text = detect_most_common_text()
    if not most_common_text:
        return jsonify({'error': 'No text detected'})

    details = db.cars.find_one({"carNumberPlate": most_common_text})
    if details:
        car_id = details['_id']
        parked_car = details.get("isParked")
        if parked_car:
            details['_id'] = str(details['_id'])

            parking_data = db.parking.find_one(sort=[("_id", -1)])
            if parking_data:
                parked_slots = parking_data['parkedSlots']
            else:
                parked_slots = 0

            car = db.parking.find_one_and_delete({"car": car_id})
            if car:
                image_path = f'data/parkinglot/result.png'
                result = process_parking_image(IMAGE_PATH)
                empty_spots = result[0]
                parked_slots = 14 - len(result[0])
                takenSpot = car['takenSpot']
                exit_car(takenSpot)

                db.logs.insert_one({
                    'car': car_id, 
                    "time": datetime.now(indian_tz), 
                    "emptySpots": empty_spots, 
                    "parkedSlots": parked_slots, 
                    "takenSpot": takenSpot, 
                    "isEntering": False
                })
                db.cars.update_one(
                    {"carNumberPlate": most_common_text}, 
                    {"$set": {"isParked": False}}
                )
                return jsonify({
                    'message': "Car exited"
                })
            else:
                return jsonify({'error': 'Car is not parked in the lot'})
        else:
            return jsonify({'error': 'Car is not parked'})
    else:
        return jsonify({'error': 'Car not found'})
    
if __name__ == "__main__":
    app.run(debug=True)
