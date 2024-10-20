# app.py
from flask import Flask, request, jsonify
import subprocess  # To call the predict.py script

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict_misinformation():
    data = request.json
    text = data['news_text']  # Get the user's input from the JSON request

    # Call the predict.py script and pass the user's input as an argument
    try:
        # Use subprocess to call the predict.py with the user input
        result = subprocess.run(
            ['python', 'predict.py', text],
            capture_output=True,
            text=True,
            check=True
        )
        
        # Get the prediction from the output
        prediction_output = result.stdout.strip()  # Output from predict.py
        prediction = prediction_output.split(": ")[1]  # Extract prediction from the output
        
        return jsonify({'prediction': prediction})  # Return prediction in JSON format
    except subprocess.CalledProcessError as e:
        return jsonify({'error': 'Error occurred during prediction.'}), 500

if __name__ == '__main__':
    app.run(port=5000)  # Adjust the port as necessary
