# train.py
from datasets import load_dataset
import torch
import evaluate
import numpy as np
from transformers import BertTokenizer, BertForSequenceClassification, TrainingArguments, Trainer

# Load dataset
csv_file_path = 'dataset.csv'
dataset = load_dataset('csv', data_files={'train': csv_file_path}, split='train')

# Load tokenizer and model (Binary classification: num_labels=2)
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)

# Preprocess the dataset
def preprocess_function(examples):
    return tokenizer(examples['title'], padding='max_length', truncation=True)

tokenized_dataset = dataset.map(preprocess_function, batched=True)

# Load accuracy metric
accuracy_metric = evaluate.load("accuracy")

# Function to compute accuracy
def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return accuracy_metric.compute(predictions=predictions, references=labels)

# Set up training arguments
training_args = TrainingArguments(
    output_dir='./results',
    eval_strategy="epoch",
    learning_rate=2e-5,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    num_train_epochs=2,
    weight_decay=0.01,
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    eval_dataset=tokenized_dataset,
    compute_metrics=compute_metrics,
)

# Train the model
trainer.train()

# Save the model to disk
model.save_pretrained("./saved_model")
tokenizer.save_pretrained("./saved_model")

print("Model saved successfully.")
