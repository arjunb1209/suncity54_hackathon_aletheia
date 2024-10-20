document.getElementById('predict-button').addEventListener('click', async () => {
    const newsText = document.getElementById('newsInput').value;

    if (!newsText) {
        document.getElementById('prediction-result').innerText = 'Please enter news text';
        return;
    }

    console.log("Fetching prediction for:", newsText);  // Log the news text

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ news_text: newsText })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log("Response received:", data);  // Log the response

        document.getElementById('prediction-result').innerText = data.prediction || 'Error';

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'displayPrediction',
                prediction: data.prediction || 'No prediction'
            });
        });
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('prediction-result').innerText = 'Error: ' + error.message;
    }
});
