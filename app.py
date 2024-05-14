from flask import Flask, render_template, request, jsonify
import joblib

app = Flask(__name__, static_url_path='/static')

# Load the sentiment analysis model
model = joblib.load('sentiment_analysis_model.pkl')

# Define route to serve the home page
@app.route('/')
def home():
    return render_template('index.html')

# Define route to handle the sentiment analysis request
@app.route('/api/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    if request.method == 'POST':
        # Get text data from request
        data = request.json
        text = data.get('text')
        
        # Print out the text for debugging
        print("Received text:", text)

        # Check if text is empty or None
        if text is None or text.strip() == '':
            return jsonify({'error': 'Text data is empty'}), 400

        try:
            # Perform sentiment analysis
            sentiment = model.predict([text])[0]

            # Return sentiment analysis result
            return jsonify({'sentiment': sentiment})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        # Handle GET requests, if needed
        return jsonify({'error': 'GET requests are not supported for this endpoint'}), 405

if __name__ == '__main__':
    app.run(debug=True)
