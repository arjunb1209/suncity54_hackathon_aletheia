// DetectionForm.js
async function checkFacts(event) {
  event.preventDefault();  // Prevent the form from submitting normally

  const textToCheck = document.getElementById('textToCheck').value;

  try {
      const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: textToCheck }),  // Send user input
      });

      const data = await response.json();

      if (response.ok) {
          document.getElementById('result-text').innerText = `Prediction: ${data.prediction}`;
      } else {
          document.getElementById('result-text').innerText = `Error: ${data.error}`;
      }
  } catch (error) {
      console.error('Error:', error);
      document.getElementById('result-text').innerText = 'An error occurred while checking facts.';
  }
}
