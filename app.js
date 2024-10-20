  document.getElementById('detection-form').addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent the form from reloading the page
    
      // Extract the text input from the form
      const textToCheck = document.getElementById('textToCheck').value;
    
      // Send the data to your Python backend (API) via Fetch
      try {
        const response = await fetch('http://localhost:5000/fact-check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text: textToCheck })
        });
    
        // Parse the response from the backend
        const result = await response.json();
    
        // Display the result on the frontend
        document.getElementById('result-text').innerText = result.summary || "No results found.";
      } catch (error) {
        document.getElementById('result-text').innerText = "Error contacting the backend: " + error.message;
      }
    });
