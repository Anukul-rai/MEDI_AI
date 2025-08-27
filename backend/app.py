from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Temporary in-memory user storage
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')

    if email in users:
        return jsonify({'success': False, 'message': 'User already exists'}), 400

    users[email] = {
        'first_name': data.get('first_name'),
        'last_name': data.get('last_name'),
        'phone_number': data.get('phone_number'),
        'password': data.get('password'),
        'age': data.get('age'),
        'gender': data.get('gender'),
        'city': data.get('city'),
    }

    return jsonify({'success': True, 'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)

    if not user or user['password'] != password:
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    return jsonify({'success': True, 'message': 'Login successful'}), 200

if __name__ == '__main__':
    app.run(debug=True)
