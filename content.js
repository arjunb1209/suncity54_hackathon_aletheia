// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'displayPrediction') {
        console.log("Received message:", request);  // Log the request

        // Create a div to display the prediction
        const resultDiv = document.createElement('div');
        resultDiv.style.position = 'fixed';
        resultDiv.style.bottom = '20px';
        resultDiv.style.right = '20px';
        resultDiv.style.padding = '10px';
        resultDiv.style.backgroundColor = '#e7f3fe';
        resultDiv.style.border = '1px solid #b8daff';
        resultDiv.style.borderRadius = '4px';
        resultDiv.style.zIndex = '9999';
        
        // Set the prediction text
        resultDiv.textContent = `Prediction: ${request.prediction}`;
        
        // Append the result div to the body
        document.body.appendChild(resultDiv);
        
        // Optionally, remove the result after a few seconds
        setTimeout(() => {
            resultDiv.remove();
        }, 5000);
        
        sendResponse({ status: 'success' });
    }
});
