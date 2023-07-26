import json
import pickle
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1


    return round(__model.predict([x])[0], 2)





def get_location_names():
    load_saved_artifacts()
    return __locations

def load_saved_artifacts():
    print("Loading saved artifacts.. start")
    global __data_columns
    global __locations
    global __model
    columns_file_path = "/Users/student/Documents/Predictor/server/artifacts/columns.json"
    pickle_file_path = "/Users/student/Documents/Predictor/server/artifacts/home_prices_model.pickle"
    

    with open("server/artifacts/columns.json", "r") as f:
       # /Users/student/Documents/Predictor/server/artifacts/columns.json
        

        __data_columns = json.load(f)['data_columns'] #It will load up the dictionary so just using the key to store
        __locations = __data_columns[3:]

    with open("server/artifacts/home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)

    print('Loading Artifacts is done')




if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('1st phase JP Nagar', 1000, 3, 2))
    print(get_estimated_price('1st phase JP Nagar', 200, 3, 2))
    

    



