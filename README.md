# suncity54_hackathon_aletheia

Aletheia - AI-powered Misinformation Detection Browser Extension
Aletheia is an AI-driven browser extension designed to detect misinformation and predict the authenticity of news articles in real-time. Powered by a custom machine learning model, Aletheia brings seamless prediction capabilities into your browser with an intuitive, easy-to-use interface.

Features
Real-time Predictions: Quickly checks if input news is true or false using a pre-trained model.
Simple User Interface: Clean and responsive design for easy user interaction.
Fast Backend Integration: Powered by Flask for fast prediction requests and responses.
Why Aletheia?
Optimized for Speed: The model is trained separately and loaded lazily during predictions, ensuring quick responses.
Modular Architecture: The code is split into modular components for easy maintenance and extensibility.
Seamless Integration: Works directly within the browser, providing an uninterrupted experience for fact-checking.
Setup Guide
Prerequisites
Python 3.x
Flask (pip install Flask)
Transformers library (pip install transformers)
Datasets library (pip install datasets)
PyTorch (pip install torch)
Browser (Chrome/Firefox) for extension
Steps
Backend Setup:

Clone the repository and navigate to the project folder.
Run app.py to start the Flask API backend:
python app.py
Extension Setup:

Navigate to your browser's extensions page (e.g., chrome://extensions/).
Enable "Developer Mode."
Click "Load unpacked" and select the folder containing manifest.json.
Run the Extension:

Open the browser extension (Aletheia) from the toolbar.
Input any news text and click "Predict" to get real-time predictions from the backend.
How It Works
Aletheia uses a custom-trained BERT model that processes the news text and classifies it as either "True" or "False." The model is pre-trained and loaded on demand, ensuring efficiency in prediction. This project leverages Flask for serving the model and JavaScript for frontend interaction.
