from flask import Flask, request, send_from_directory
from flask_cors import CORS  # Import CORS
import redis

app = Flask(__name__, static_folder='static')
CORS(app)  # Enable CORS on the app

redis_client = redis.Redis(host='redis-10611.c252.ap-southeast-1-1.ec2.cloud.redislabs.com', port=10611, password='W021xhqgxEvNilfXsr5HMeZnvNRW4nNK')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/vote', methods=['POST'])
def handle_vote():
    vote_type = request.json.get('vote')
    row_id = request.json.get('id')
    
    if vote_type and row_id:
        key = f"row:{row_id}:{vote_type}"
        redis_client.incr(key)
        return {"success": True}, 200
    
    return {"error": "Invalid request"}, 400

@app.route('/votes/<row_id>', methods=['GET'])
def get_votes(row_id):
    up_votes_key = f"row:{row_id}:up"
    down_votes_key = f"row:{row_id}:down"
    
    up_votes = redis_client.get(up_votes_key) or 0
    down_votes = redis_client.get(down_votes_key) or 0
    
    return {"up": int(up_votes), "down": int(down_votes)}, 200

if __name__ == "__main__":
    app.run(debug=True)
