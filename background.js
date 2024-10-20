chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyze") {
      fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: request.data })
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response from BERT (e.g., show results in popup)
        chrome.storage.local.set({ result: data }, () => {
          chrome.action.setBadgeText({ text: 'Done' });
        });
      })
      .catch(err => console.error('Error:', err));
    }
  });
  