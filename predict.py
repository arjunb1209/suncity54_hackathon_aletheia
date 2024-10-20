# predict.py
import torch
from transformers import BertTokenizer, BertForSequenceClassification

# Lazy load the model and tokenizer
model = None
tokenizer = None

def load_model():
    global model, tokenizer
    if model is None or tokenizer is None:
        print("Loading model...")
        model = BertForSequenceClassification.from_pretrained('./saved_model')
        tokenizer = BertTokenizer.from_pretrained('./saved_model')
        print("Model loaded successfully.")

def predict_news(news_text):
    # Load model lazily if not already loaded
    load_model()

    # Preprocess the input
    inputs = tokenizer(news_text, return_tensors="pt", padding=True, truncation=True, max_length=512)
    
    # Perform prediction
    outputs = model(**inputs)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=-1).item()

    # Define class mapping
    class_mapping = {1: "True", 0: "False"}
    
    return class_mapping[predicted_class]

